export const SOLANA_NETWORK = "devnet" as const;
export const DEVNET_RPC_URL = "https://api.devnet.solana.com";
export const MAINNET_RPC_URL = "https://api.mainnet-beta.solana.com";

// ---------------------------------------------------------------------------
// Active RPC URL — module-level mutable ref so all callers share one value.
// Call setActiveRpcUrl() once at app startup (after config loads) to switch
// from the devnet fallback to the admin-configured mainnet endpoint.
// ---------------------------------------------------------------------------

let _activeRpcUrl: string = DEVNET_RPC_URL;

export function getActiveRpcUrl(): string {
  return _activeRpcUrl;
}

export function setActiveRpcUrl(url: string): void {
  if (url && url !== _activeRpcUrl) {
    _activeRpcUrl = url;
  }
}

// ---------------------------------------------------------------------------
// Network label helpers
// ---------------------------------------------------------------------------

export function getNetworkLabel(network: string): string {
  if (network === "mainnet-beta") return "Mainnet Beta";
  if (network === "mainnet") return "Mainnet";
  if (network === "devnet") return "Devnet";
  if (network === "testnet") return "Testnet";
  return network;
}

export function isMainnet(network: string): boolean {
  return network === "mainnet-beta" || network === "mainnet";
}

// ---------------------------------------------------------------------------
// Core utilities
// ---------------------------------------------------------------------------

export function lamportsToSol(lamports: number): number {
  return lamports / 1e9;
}

export function solToLamports(sol: number): number {
  return Math.round(sol * 1e9);
}

export function truncateAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function formatSol(sol: number, decimals = 4): string {
  return sol.toFixed(decimals);
}
