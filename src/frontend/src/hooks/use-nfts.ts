import type { NftRecord, UserCollection } from "@/backend";
import type { NftCardData, NftStatus } from "@/components/ui/NftCard";
import { getBackendQueryActor } from "@/lib/backend-client";
import { lamportsToSol } from "@/lib/solana";
import { useQuery } from "@tanstack/react-query";

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

export function useUserNfts(ownerAddresses: Array<string | null | undefined>) {
  const normalizedOwnerAddresses = [
    ...new Set(
      ownerAddresses.filter(
        (ownerAddress): ownerAddress is string => Boolean(ownerAddress),
      ),
    ),
  ];
  normalizedOwnerAddresses.sort();

  return useQuery<NftCardData[]>({
    queryKey: ["user-nfts", normalizedOwnerAddresses],
    queryFn: async () => {
      if (normalizedOwnerAddresses.length === 0) return [];
      const actor = getBackendQueryActor();
      if (!actor) return [];

      const nftRecords = await Promise.all(
        normalizedOwnerAddresses.map((ownerAddress) =>
          actor.getUserNfts(ownerAddress),
        ),
      );

      const dedupedNfts = new Map<string, NftCardData>();
      for (const record of nftRecords.flat()) {
        dedupedNfts.set(record.mintAddress, nftRecordToCardData(record));
      }

      return [...dedupedNfts.values()];
    },
    enabled: normalizedOwnerAddresses.length > 0,
    staleTime: 30_000,
  });
}

export function useSolanaBalance(address: string | null) {
  return useQuery<number>({
    queryKey: ["solana-balance", address],
    queryFn: async () => {
      if (!address) return 0;
      const actor = getBackendQueryActor();
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
      const actor = getBackendQueryActor();
      if (!actor) return [];
      return actor.getUserCollections(ownerAddress);
    },
    enabled: !!ownerAddress,
    staleTime: 30_000,
  });
}
