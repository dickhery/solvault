export interface PhantomPublicKey {
  toString(): string;
  toBytes(): Uint8Array;
}

export interface PhantomProvider {
  connect(options?: { onlyIfTrusted?: boolean }): Promise<{
    publicKey: PhantomPublicKey;
  }>;
  disconnect(): Promise<void> | void;
  signMessage(message: Uint8Array): Promise<{
    signature: Uint8Array;
    publicKey?: string;
  }>;
  signAndSendTransaction(transaction: unknown): Promise<{ signature: string }>;
  publicKey?: PhantomPublicKey | null;
  isConnected?: boolean;
  isPhantom?: boolean;
  on?(
    event: "accountChanged" | "connect" | "disconnect",
    listener: (publicKey?: PhantomPublicKey | null) => void,
  ): void;
  off?(
    event: "accountChanged" | "connect" | "disconnect",
    listener: (publicKey?: PhantomPublicKey | null) => void,
  ): void;
}

export function getPhantomProvider(): PhantomProvider | null {
  if (typeof window === "undefined") return null;
  return (window as Window & { solana?: PhantomProvider }).solana ?? null;
}
