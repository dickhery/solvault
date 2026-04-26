import {
  ExternalBlob,
  type NftRecord,
  type UserCollection,
  createActor,
} from "@/backend";
import type { NftCardData, NftStatus } from "@/components/ui/NftCard";
import { lamportsToSol } from "@/lib/solana";
import { useQuery } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Actor singleton (anonymous — Phantom wallet handles Solana auth separately)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

function listingStatusToNftStatus(
  status: NftRecord["listingStatus"],
): NftStatus {
  if (status.__kind__ === "fixedPrice") return "listed";
  if (status.__kind__ === "auction") return "auction";
  return "unlisted";
}

function listingStatusToPrice(
  status: NftRecord["listingStatus"],
): number | undefined {
  if (status.__kind__ === "fixedPrice") {
    return lamportsToSol(Number(status.fixedPrice));
  }
  return undefined;
}

export function nftRecordToCardData(nft: NftRecord): NftCardData {
  return {
    mintAddress: nft.mintAddress,
    name: nft.name,
    collectionName: nft.collectionId,
    imageUrl:
      nft.imageBlob?.getDirectURL?.() || "/assets/images/placeholder.svg",
    status: listingStatusToNftStatus(nft.listingStatus),
    price: listingStatusToPrice(nft.listingStatus),
  };
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useUserNfts(ownerAddress: string | null) {
  return useQuery<NftCardData[]>({
    queryKey: ["user-nfts", ownerAddress],
    queryFn: async () => {
      if (!ownerAddress) return [];
      const actor = getActor();
      if (!actor) return [];
      const records = await actor.getUserNfts(ownerAddress);
      return records.map(nftRecordToCardData);
    },
    enabled: !!ownerAddress,
    staleTime: 30_000,
  });
}

export function useSolanaBalance(address: string | null) {
  return useQuery<number>({
    queryKey: ["solana-balance", address],
    queryFn: async () => {
      if (!address) return 0;
      const actor = getActor();
      if (!actor) return 0;
      // Backend returns lamports as a string
      const lamportsStr = await actor.getSolanaBalance(address);
      const lamports = Number(lamportsStr);
      return Number.isNaN(lamports) ? 0 : lamportsToSol(lamports);
    },
    enabled: !!address,
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}

export function useUserCollections(ownerAddress: string | null) {
  return useQuery<UserCollection[]>({
    queryKey: ["user-collections", ownerAddress],
    queryFn: async () => {
      if (!ownerAddress) return [];
      const actor = getActor();
      if (!actor) return [];
      return actor.getUserCollections(ownerAddress);
    },
    enabled: !!ownerAddress,
    staleTime: 30_000,
  });
}
