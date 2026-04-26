import {
  Ed25519PublicKey,
  type PublicKey as IcPublicKey,
  SignIdentity,
  type Signature,
} from "@icp-sdk/core/agent";
import { PublicKey } from "@solana/web3.js";
import type { PhantomProvider } from "./phantom-provider";

export class PhantomEd25519Identity extends SignIdentity {
  private readonly publicKey: Ed25519PublicKey;

  private constructor(
    private readonly provider: PhantomProvider,
    rawPublicKey: Uint8Array,
  ) {
    super();
    this.publicKey = Ed25519PublicKey.fromRaw(rawPublicKey);
  }

  static fromAddress(
    provider: PhantomProvider,
    address: string,
  ): PhantomEd25519Identity {
    const rawPublicKey =
      provider.publicKey && typeof provider.publicKey.toBytes === "function"
        ? provider.publicKey.toBytes()
        : new PublicKey(address).toBytes();

    return new PhantomEd25519Identity(provider, rawPublicKey);
  }

  getPublicKey(): IcPublicKey {
    return this.publicKey;
  }

  async sign(blob: Uint8Array): Promise<Signature> {
    const { signature } = await this.provider.signMessage(blob);
    return signature as Signature;
  }
}
