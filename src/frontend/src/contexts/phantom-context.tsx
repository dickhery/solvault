import type { AppConfig } from "@/backend";
import {
  type WalletSession,
  getBackendAuthServiceActor,
  setAuthenticatedBackendIdentity,
} from "@/lib/backend-client";
import { PhantomEd25519Identity } from "@/lib/phantom-identity";
import {
  type PhantomProvider,
  type PhantomPublicKey,
  getPhantomProvider,
} from "@/lib/phantom-provider";
import { publicKeyBytesToAddress } from "@/lib/solana";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

export type UserRole = "admin" | "user" | "guest";

interface PhantomContextValue {
  address: string | null;
  role: UserRole;
  isConnecting: boolean;
  isConnected: boolean;
  solDepositAddress: string | null;
  nftDepositAddress: string | null;
  sessionConfig: AppConfig | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const PhantomContext = createContext<PhantomContextValue | null>(null);

const STORAGE_KEY = "phantom_address";

function roleFromWalletSession(role: WalletSession["role"]): UserRole {
  if ("admin" in role) return "admin";
  if ("user" in role) return "user";
  return "guest";
}

export function PhantomContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>("guest");
  const [isConnecting, setIsConnecting] = useState(false);
  const [solDepositAddress, setSolDepositAddress] = useState<string | null>(
    null,
  );
  const [nftDepositAddress, setNftDepositAddress] = useState<string | null>(
    null,
  );
  const [sessionConfig, setSessionConfig] = useState<AppConfig | null>(null);
  const hasAutoConnected = useRef(false);

  const clearConnection = useCallback(() => {
    setAuthenticatedBackendIdentity(null);
    setAddress(null);
    setRole("guest");
    setSolDepositAddress(null);
    setNftDepositAddress(null);
    setSessionConfig(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const applyWalletSession = useCallback(
    (solanaAddress: string, session: WalletSession) => {
      setAddress(solanaAddress);
      setRole(roleFromWalletSession(session.role));
      setSolDepositAddress(
        publicKeyBytesToAddress(session.solDepositPublicKey),
      );
      setNftDepositAddress(
        publicKeyBytesToAddress(session.nftDepositPublicKey),
      );
      setSessionConfig(session.config as AppConfig);
      localStorage.setItem(STORAGE_KEY, solanaAddress);
    },
    [],
  );

  const authenticateWithBackend = useCallback(
    async (provider: PhantomProvider, solanaAddress: string) => {
      const identity = PhantomEd25519Identity.fromAddress(
        provider,
        solanaAddress,
      );
      setAuthenticatedBackendIdentity(identity);

      try {
        const actor = getBackendAuthServiceActor();
        const session = await actor.loginWithPhantom(solanaAddress);
        applyWalletSession(solanaAddress, session);
      } catch (error) {
        setAuthenticatedBackendIdentity(null);
        throw error;
      }
    },
    [applyWalletSession],
  );

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const provider = getPhantomProvider();
      if (!provider || !provider.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        throw new Error(
          "Phantom wallet not found. Please install the Phantom browser extension.",
        );
      }

      const response = await provider.connect();
      const solanaAddress = response.publicKey.toString();
      await authenticateWithBackend(provider, solanaAddress);
    } catch (err) {
      clearConnection();
      const message =
        err instanceof Error ? err.message : "Failed to connect Phantom";
      console.error("Phantom connect error:", err);
      toast.error(message);
    } finally {
      setIsConnecting(false);
    }
  }, [authenticateWithBackend, clearConnection]);

  const disconnect = useCallback(async () => {
    const provider = getPhantomProvider();
    try {
      await provider?.disconnect();
    } catch (err) {
      console.warn("Phantom disconnect error:", err);
    } finally {
      clearConnection();
    }
  }, [clearConnection]);

  useEffect(() => {
    if (hasAutoConnected.current) return;
    hasAutoConnected.current = true;

    const savedAddress = localStorage.getItem(STORAGE_KEY);
    if (!savedAddress) return;

    const provider = getPhantomProvider();
    if (!provider?.isPhantom) return;

    setIsConnecting(true);
    provider
      .connect({ onlyIfTrusted: true })
      .then(async (resp) => {
        await authenticateWithBackend(provider, resp.publicKey.toString());
      })
      .catch(() => {
        clearConnection();
      })
      .finally(() => {
        setIsConnecting(false);
      });
  }, [authenticateWithBackend, clearConnection]);

  useEffect(() => {
    const provider = getPhantomProvider();
    if (!provider?.on || !provider?.off) return;

    const handleDisconnect = () => {
      clearConnection();
    };

    const handleAccountChanged = (nextPublicKey?: PhantomPublicKey | null) => {
      if (!nextPublicKey) {
        void disconnect();
        return;
      }

      const nextAddress = nextPublicKey.toString();
      void authenticateWithBackend(provider, nextAddress).catch((error) => {
        console.error("Failed to re-authenticate after account change:", error);
        toast.error("Failed to switch Phantom account");
        clearConnection();
      });
    };

    provider.on("disconnect", handleDisconnect);
    provider.on("accountChanged", handleAccountChanged);

    return () => {
      provider.off?.("disconnect", handleDisconnect);
      provider.off?.("accountChanged", handleAccountChanged);
    };
  }, [authenticateWithBackend, clearConnection, disconnect]);

  return (
    <PhantomContext.Provider
      value={{
        address,
        role,
        isConnecting,
        isConnected: !!address,
        solDepositAddress,
        nftDepositAddress,
        sessionConfig,
        connect,
        disconnect,
      }}
    >
      {children}
    </PhantomContext.Provider>
  );
}

export function usePhantom(): PhantomContextValue {
  const ctx = useContext(PhantomContext);
  if (!ctx)
    throw new Error("usePhantom must be used within PhantomContextProvider");
  return ctx;
}
