import type {
  AppConfig,
  NftInput,
  UserCollection,
  UserCollectionInput,
} from "@/backend";
import {
  getBackendMutationActor,
  getBackendQueryActor,
} from "@/lib/backend-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Config ────────────────────────────────────────────────────────────────────

export function useConfig() {
  return useQuery<AppConfig>({
    queryKey: ["appConfig"],
    queryFn: async () => {
      const actor = getBackendQueryActor();
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
      const actor = getBackendQueryActor();
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
      const actor = getBackendMutationActor();
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
      const actor = getBackendMutationActor();
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
