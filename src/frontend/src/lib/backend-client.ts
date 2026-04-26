import { ExternalBlob, type backendInterface, createActor } from "@/backend";
import { idlFactory } from "@/declarations/backend.did";
import type { _SERVICE } from "@/declarations/backend.did.d.ts";
import {
  Actor,
  type ActorSubclass,
  HttpAgent,
  type SignIdentity,
} from "@icp-sdk/core/agent";

declare const process: { env: Record<string, string | undefined> };

let queryActor: backendInterface | null = null;
let mutationActor: backendInterface | null = null;
let authServiceActor: ActorSubclass<_SERVICE> | null = null;
let authenticatedIdentity: SignIdentity | null = null;

function getCanisterId(): string {
  return (
    (typeof process !== "undefined" && process.env.CANISTER_ID_BACKEND) || ""
  );
}

function getStorageGatewayUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.STORAGE_GATEWAY_URL) ||
    "https://blob.caffeine.ai"
  );
}

async function uploadFile(blob: ExternalBlob): Promise<Uint8Array> {
  const bytes = await blob.getBytes();
  const res = await fetch(`${getStorageGatewayUrl()}/upload`, {
    method: "POST",
    body: bytes,
  });
  if (!res.ok) throw new Error("Upload failed");
  return new Uint8Array(await res.arrayBuffer());
}

async function downloadFile(hash: Uint8Array): Promise<ExternalBlob> {
  const hexHash = Array.from(hash)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return ExternalBlob.fromURL(`${getStorageGatewayUrl()}/blob/${hexHash}`);
}

function createWrappedActor(
  identity?: SignIdentity | null,
): backendInterface | null {
  const canisterId = getCanisterId();
  if (!canisterId) return null;

  return createActor(
    canisterId,
    uploadFile,
    downloadFile,
    identity ? { agentOptions: { identity } } : {},
  );
}

function createServiceActor(
  identity: SignIdentity,
): ActorSubclass<_SERVICE> | null {
  const canisterId = getCanisterId();
  if (!canisterId) return null;

  const agent = HttpAgent.createSync({ identity });
  return Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId,
  });
}

export function setAuthenticatedBackendIdentity(
  identity: SignIdentity | null,
): void {
  authenticatedIdentity = identity;
  mutationActor = null;
  authServiceActor = null;
}

export function getBackendQueryActor(): backendInterface | null {
  if (!queryActor) {
    queryActor = createWrappedActor();
  }
  return queryActor;
}

export function getBackendMutationActor(): backendInterface {
  if (!authenticatedIdentity) {
    throw new Error("Connect your Phantom wallet first");
  }
  if (!mutationActor) {
    mutationActor = createWrappedActor(authenticatedIdentity);
  }
  if (!mutationActor) {
    throw new Error("Backend not available");
  }
  return mutationActor;
}

export function getBackendAuthServiceActor(): ActorSubclass<_SERVICE> {
  if (!authenticatedIdentity) {
    throw new Error("Connect your Phantom wallet first");
  }
  if (!authServiceActor) {
    authServiceActor = createServiceActor(authenticatedIdentity);
  }
  if (!authServiceActor) {
    throw new Error("Backend not available");
  }
  return authServiceActor;
}

export type { WalletSession, VaultKind } from "@/declarations/backend.did.d.ts";
