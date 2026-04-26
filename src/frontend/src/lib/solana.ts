export const SOLANA_NETWORK = "devnet" as const;
export const DEVNET_RPC_URL = "https://api.devnet.solana.com";

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
