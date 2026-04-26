import {
  type AppConfig,
  ExternalBlob,
  type NftInput,
  type UserCollection,
  type UserCollectionInput,
  createActor,
} from "@/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Actor singleton ───────────────────────────────────────────────────────────

declare const process: { env: Record<string, string | undefined> };

function getActor() {
  const canisterId =
    (typeof process !== "undefined" && process.env.CANISTER_ID_BACKEND) || "";
  if (!canisterId) return null;

  const storageGatewayUrl =
    (typeof process !== "undefined" && process.env.STORAGE_GATEWAY_URL) ||
    "https://blob.caffeine.ai";

  const uploadFile = async (blob: ExternalBlob): Promise<Uint8Array> => {
    const bytes = await blob.getBytes();
    const res = await fetch(`${storageGatewayUrl}/upload`, {
      method: "POST",
      body: bytes,
    });
    if (!res.ok) throw new Error("Upload failed");
    return new Uint8Array(await res.arrayBuffer());
  };

  const downloadFile = async (hash: Uint8Array): Promise<ExternalBlob> => {
    const hexHash = Array.from(hash)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return ExternalBlob.fromURL(`${storageGatewayUrl}/blob/${hexHash}`);
  };

  return createActor(canisterId, uploadFile, downloadFile);
}

// ── Config ────────────────────────────────────────────────────────────────────

export function useConfig() {
  return useQuery<AppConfig>({
    queryKey: ["config"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) throw new Error("Actor not ready");
      return actor.getConfig();
    },
    staleTime: 60_000,
  });
}

// ── User Collections ──────────────────────────────────────────────────────────

export function useUserCollections(ownerAddress: string | null) {
  return useQuery<UserCollection[]>({
    queryKey: ["userCollections", ownerAddress],
    queryFn: async () => {
      if (!ownerAddress) return [];
      const actor = getActor();
      if (!actor) return [];
      return actor.getUserCollections(ownerAddress);
    },
    enabled: !!ownerAddress,
    staleTime: 15_000,
  });
}

export function useCreateUserCollection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      txSignature,
    }: {
      data: UserCollectionInput;
      txSignature: string;
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createUserCollection(data, txSignature);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userCollections"] });
    },
  });
}

// ── NFT Minting ───────────────────────────────────────────────────────────────

export function useAddNftToUserCollection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      collectionId,
      nft,
    }: {
      collectionId: string;
      nft: NftInput;
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addNftToUserCollection(collectionId, nft);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["userCollections"] });
      qc.invalidateQueries({ queryKey: ["user-nfts"] });
      qc.invalidateQueries({
        queryKey: ["collectionNfts", variables.collectionId],
      });
    },
  });
}
