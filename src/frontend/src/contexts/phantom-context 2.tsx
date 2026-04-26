import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type UserRole = "admin" | "user" | "guest";

interface PhantomContextValue {
  address: string | null;
  role: UserRole;
  isConnecting: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const PhantomContext = createContext<PhantomContextValue | null>(null);

const STORAGE_KEY = "phantom_address";

export function PhantomContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>("guest");
  const [isConnecting, setIsConnecting] = useState(false);
  const hasAutoConnected = useRef(false);

  const applyConnection = useCallback((addr: string, userRole: UserRole) => {
    setAddress(addr);
    setRole(userRole);
    localStorage.setItem(STORAGE_KEY, addr);
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Check for injected Phantom provider (browser extension)
      const solana = (
        window as Window & {
          solana?: {
            connect: () => Promise<{ publicKey: { toString: () => string } }>;
            isPhantom?: boolean;
          };
        }
      ).solana;
      if (!solana || !solana.isPhantom) {
        window.open("https://phantom.app/", "_blank");
        throw new Error(
          "Phantom wallet not found. Please install the Phantom browser extension.",
        );
      }

      const response = await solana.connect();
      const solanaAddress = response.publicKey.toString();

      // Determine role: first ever registered user becomes admin
      const existingAdmin = localStorage.getItem("phantom_admin_address");
      let userRole: UserRole;
      if (!existingAdmin) {
        localStorage.setItem("phantom_admin_address", solanaAddress);
        userRole = "admin";
      } else if (existingAdmin === solanaAddress) {
        userRole = "admin";
      } else {
        userRole = "user";
      }

      applyConnection(solanaAddress, userRole);
    } catch (err) {
      console.error("Phantom connect error:", err);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, [applyConnection]);

  const disconnect = useCallback(() => {
    const solana = (window as Window & { solana?: { disconnect: () => void } })
      .solana;
    solana?.disconnect();
    setAddress(null);
    setRole("guest");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Auto-reconnect on load
  useEffect(() => {
    if (hasAutoConnected.current) return;
    hasAutoConnected.current = true;

    const savedAddress = localStorage.getItem(STORAGE_KEY);
    if (!savedAddress) return;

    const solana = (
      window as Window & {
        solana?: {
          connect: (opts: { onlyIfTrusted: boolean }) => Promise<{
            publicKey: { toString: () => string };
          }>;
          isPhantom?: boolean;
        };
      }
    ).solana;
    if (!solana?.isPhantom) return;

    solana
      .connect({ onlyIfTrusted: true })
      .then((resp) => {
        const addr = resp.publicKey.toString();
        const existingAdmin = localStorage.getItem("phantom_admin_address");
        const userRole: UserRole = existingAdmin === addr ? "admin" : "user";
        applyConnection(addr, userRole);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
      });
  }, [applyConnection]);

  return (
    <PhantomContext.Provider
      value={{
        address,
        role,
        isConnecting,
        isConnected: !!address,
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
