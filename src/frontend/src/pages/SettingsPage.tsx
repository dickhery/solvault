import type { Collection } from "@/backend";
import { AddressChip } from "@/components/ui/AddressChip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { usePhantom } from "@/contexts/phantom-context";
import { useAppConfig, useCollections } from "@/hooks/use-admin";
import {
  DEVNET_RPC_URL,
  getNetworkLabel,
  isMainnet,
  setActiveRpcUrl,
} from "@/lib/solana";
import {
  AlertTriangle,
  ArrowDownToLine,
  Bell,
  CheckCircle2,
  Globe,
  Search,
  Shield,
  Wallet,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Address Card ─────────────────────────────────────────────────────────────

interface AddressCardProps {
  label: string;
  subtitle: string;
  address: string | null | undefined;
  loading?: boolean;
  emptyMessage?: string;
  badgeLabel?: string;
  variant: "user" | "deposit";
  ocid: string;
}

function AddressCard({
  label,
  subtitle,
  address,
  loading,
  emptyMessage,
  badgeLabel,
  variant,
  ocid,
}: AddressCardProps) {
  const isDeposit = variant === "deposit";

  return (
    <div
      className={[
        "rounded-lg border p-4 space-y-3 transition-smooth",
        isDeposit
          ? "border-accent/40 bg-accent/5"
          : "border-primary/30 bg-primary/5",
      ].join(" ")}
      data-ocid={ocid}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "mt-0.5 rounded-md p-1.5",
            isDeposit
              ? "bg-accent/15 text-accent"
              : "bg-primary/15 text-primary",
          ].join(" ")}
        >
          {isDeposit ? (
            <ArrowDownToLine className="w-4 h-4" />
          ) : (
            <Wallet className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        {isDeposit && badgeLabel && (
          <Badge
            variant="outline"
            className="border-accent/30 text-accent bg-accent/5 text-xs shrink-0"
          >
            {badgeLabel}
          </Badge>
        )}
      </div>

      {loading ? (
        <Skeleton className="h-8 w-full rounded-md" />
      ) : address ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono text-muted-foreground break-all leading-relaxed">
            {address}
          </p>
          <AddressChip
            address={address}
            full={false}
            className={
              isDeposit
                ? "border-accent/30 hover:border-accent/60 self-start"
                : "border-primary/20 hover:border-primary/40 self-start"
            }
            data-ocid={`${ocid}_chip`}
          />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">
          {emptyMessage ?? "Address not available"}
        </p>
      )}
    </div>
  );
}

// ─── NFT Verifier ─────────────────────────────────────────────────────────────

type VerifyResult =
  | { status: "idle" }
  | { status: "found"; collection: Collection; depositAddress: string | null }
  | { status: "not_found" }
  | { status: "validation_error"; message: string };

function NftVerifier() {
  const { nftDepositAddress } = usePhantom();
  const { data: collections, isLoading: collectionsLoading } = useCollections();
  const [mintInput, setMintInput] = useState("");
  const [result, setResult] = useState<VerifyResult>({ status: "idle" });

  const isLoading = collectionsLoading;

  const handleCheck = () => {
    const trimmed = mintInput.trim();
    if (!trimmed) {
      setResult({
        status: "validation_error",
        message: "Please paste a collection mint address to check.",
      });
      return;
    }
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed)) {
      setResult({
        status: "validation_error",
        message:
          "That doesn't look like a valid Solana address. Please check and try again.",
      });
      return;
    }
    if (!collections || collections.length === 0) {
      setResult({ status: "not_found" });
      return;
    }
    const match = collections.find(
      (c) => c.mintAddress.toLowerCase() === trimmed.toLowerCase(),
    );
    if (match) {
      setResult({
        status: "found",
        collection: match,
        depositAddress: nftDepositAddress,
      });
    } else {
      setResult({ status: "not_found" });
    }
  };

  const handleClear = () => {
    setMintInput("");
    setResult({ status: "idle" });
  };

  return (
    <div className="card-glass p-6 space-y-5" data-ocid="nft_verify.section">
      <div className="flex items-center gap-3">
        <Search className="w-5 h-5 text-primary" />
        <div>
          <h2 className="font-display font-semibold text-foreground leading-none">
            Check Collection Before Sending
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Paste a supported collection mint address before sending NFTs into
            your SolVault NFT vault.
          </p>
        </div>
      </div>

      <Separator className="bg-border" />

      {isLoading ? (
        <div className="space-y-3" data-ocid="nft_verify.loading_state">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label className="text-sm text-foreground" htmlFor="nft-mint-input">
              Collection Mint Address
            </Label>
            <div className="flex gap-2">
              <Input
                id="nft-mint-input"
                value={mintInput}
                onChange={(e) => {
                  setMintInput(e.target.value);
                  if (result.status === "validation_error")
                    setResult({ status: "idle" });
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="e.g. So1vAu1tCollectionMintAddress..."
                className="font-mono text-sm flex-1"
                data-ocid="nft_verify.input"
                aria-describedby={
                  result.status === "validation_error"
                    ? "nft-verify-error"
                    : undefined
                }
              />
              <Button
                onClick={handleCheck}
                disabled={!mintInput.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                data-ocid="nft_verify.check_button"
              >
                Check
              </Button>
              {result.status !== "idle" && (
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="shrink-0"
                  data-ocid="nft_verify.clear_button"
                >
                  Clear
                </Button>
              )}
            </div>
            {result.status === "validation_error" && (
              <p
                id="nft-verify-error"
                className="text-xs text-destructive flex items-center gap-1.5 mt-1"
                data-ocid="nft_verify.error_state"
                role="alert"
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                {result.message}
              </p>
            )}
          </div>

          {result.status === "found" && (
            <output
              className="rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-4 block"
              data-ocid="nft_verify.success_state"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-none">
                    Supported Collection
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    NFTs from this collection can be deposited into your
                    SolVault NFT vault.
                  </p>
                </div>
              </div>
              <Separator className="bg-accent/20" />
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground shrink-0">
                    Collection
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate">
                    {result.collection.name}
                  </span>
                </div>
                {result.collection.description && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted-foreground shrink-0">
                      About
                    </span>
                    <span className="text-xs text-muted-foreground text-right line-clamp-2">
                      {result.collection.description}
                    </span>
                  </div>
                )}
                {result.depositAddress ? (
                  <div className="rounded-md bg-muted/60 border border-border p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <ArrowDownToLine className="w-3.5 h-3.5 text-primary" />
                      Send this NFT to:
                    </p>
                    <AddressChip
                      address={result.depositAddress}
                      full
                      className="w-full justify-between"
                      data-ocid="nft_verify.nft_vault_address_chip"
                    />
                    <p className="text-xs text-muted-foreground">
                      Copy this address and use it as the recipient in Phantom
                      to deposit the NFT into SolVault.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md bg-muted/60 border border-border p-3">
                    <p className="text-xs text-muted-foreground">
                      Connect Phantom to derive your personal NFT vault address
                      before depositing.
                    </p>
                  </div>
                )}
              </div>
            </output>
          )}

          {result.status === "not_found" && (
            <div
              className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3"
              data-ocid="nft_verify.not_found_state"
              role="alert"
            >
              <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Not a Supported Collection
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This collection mint is not registered. Only NFTs from
                  admin-approved collections can be deposited into SolVault.
                  Check the Collections page to see which collections are
                  supported.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const {
    address,
    role,
    isConnected,
    connect,
    disconnect,
    solDepositAddress,
    nftDepositAddress,
  } = usePhantom();
  const { data: appConfig, isLoading: configLoading } = useAppConfig();
  const [notifications, setNotifications] = useState(true);
  const [networkWarning, setNetworkWarning] = useState(true);

  const activeNetwork = appConfig?.network ?? "devnet";
  const activeRpcUrl = appConfig?.solanaRpcUrl ?? DEVNET_RPC_URL;
  const networkLabel = getNetworkLabel(activeNetwork);
  const networkIsMainnet = isMainnet(activeNetwork);

  // Apply admin-configured RPC URL whenever config loads
  useEffect(() => {
    if (appConfig?.solanaRpcUrl) {
      setActiveRpcUrl(appConfig.solanaRpcUrl);
    }
  }, [appConfig?.solanaRpcUrl]);

  return (
    <div className="max-w-2xl space-y-8" data-ocid="settings.page">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account and preferences
        </p>
      </div>

      {/* Wallet section */}
      <div className="card-glass p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">Wallet</h2>
        </div>
        <Separator className="bg-border" />

        {isConnected ? (
          <div className="space-y-5">
            {/* Role + Network row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Role</span>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary bg-primary/5 text-xs capitalize"
                >
                  {role}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Network</span>
                <Badge
                  variant="outline"
                  className={
                    networkIsMainnet
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs"
                      : "border-accent/20 text-accent bg-accent/5 text-xs"
                  }
                  data-ocid="settings.network_badge"
                >
                  {networkLabel}
                </Badge>
              </div>
            </div>

            {/* Address cards */}
            <div className="space-y-3">
              <AddressCard
                label="Your Phantom Wallet Address"
                subtitle="Your connected Phantom wallet for direct wallet-to-wallet transfers"
                address={address}
                variant="user"
                ocid="settings.user_wallet_address"
              />
              <AddressCard
                label="App SOL Vault Address"
                subtitle="Send SOL to this app-controlled address to fund your in-app balance"
                address={solDepositAddress}
                emptyMessage="Connect Phantom to derive your SOL vault address."
                badgeLabel="SOL Vault"
                variant="deposit"
                ocid="settings.sol_vault_address"
              />
              <AddressCard
                label="App NFT Vault Address"
                subtitle="Send supported NFTs to this app-controlled address to deposit them into SolVault"
                address={nftDepositAddress}
                emptyMessage="Connect Phantom to derive your NFT vault address."
                badgeLabel="NFT Vault"
                variant="deposit"
                ocid="settings.nft_vault_address"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={disconnect}
              data-ocid="settings.disconnect_button"
            >
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No wallet connected.
            </p>
            <Button
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={connect}
              data-ocid="settings.connect_wallet_button"
            >
              Connect Phantom
            </Button>
          </div>
        )}
      </div>

      {/* NFT Verification — below wallet addresses */}
      <NftVerifier />

      {/* Notifications */}
      <div className="card-glass p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">
            Notifications
          </h2>
        </div>
        <Separator className="bg-border" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">
                Sale notifications
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get notified when your NFTs sell
              </p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              data-ocid="settings.notifications_switch"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">Network warning</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Show network badge reminder
              </p>
            </div>
            <Switch
              checked={networkWarning}
              onCheckedChange={setNetworkWarning}
              data-ocid="settings.network_warning_switch"
            />
          </div>
        </div>
      </div>

      {/* Network */}
      <div className="card-glass p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground">
            Network
          </h2>
        </div>
        <Separator className="bg-border" />
        {configLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Solana {networkLabel}</p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5 break-all">
                {activeRpcUrl}
              </p>
            </div>
            <Badge
              variant="outline"
              className={
                networkIsMainnet
                  ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                  : "border-accent/20 text-accent bg-accent/5"
              }
              data-ocid="settings.network_active_badge"
            >
              Active
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
