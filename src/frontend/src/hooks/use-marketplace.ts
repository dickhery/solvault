import {
  type AppConfig,
  type Auction,
  type AuctionFilter,
  type AuctionStatus,
  type Bid,
  ExternalBlob,
  type Listing,
  type ListingFilter,
  type ListingStatus__1,
  createActor,
} from "@/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Actor singleton ───────────────────────────────────────────────────────────

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

// Re-export types for use in the page
export type {
  Auction,
  Bid,
  Listing,
  AuctionFilter,
  ListingFilter,
  AuctionStatus,
  ListingStatus__1,
  AppConfig,
};

// ─── Listings ─────────────────────────────────────────────────────────────────

export function useListings(filter?: ListingFilter | null) {
  return useQuery<Listing[]>({
    queryKey: ["listings", filter],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return [];
      return actor.getListings(filter ?? null);
    },
    staleTime: 10_000,
  });
}

export function useActiveListings() {
  return useListings({
    status: { active: null } as unknown as ListingStatus__1,
  });
}

export function useCreateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      mintAddress,
      priceSOL,
      durationDays,
    }: {
      mintAddress: string;
      priceSOL: number;
      durationDays: number;
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.createListing(
        mintAddress,
        priceSOL,
        BigInt(durationDays),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
  });
}

export function useCancelListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (listingId: string) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.cancelListing(listingId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
  });
}

export function useCompleteSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      listingId,
      buyerAddress,
      txSignature,
    }: {
      listingId: string;
      buyerAddress: string;
      txSignature: string;
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.completeSale(
        listingId,
        buyerAddress,
        txSignature,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
  });
}

// ─── Auctions ─────────────────────────────────────────────────────────────────

export function useAuctions(filter?: AuctionFilter | null) {
  return useQuery<Auction[]>({
    queryKey: ["auctions", filter],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return [];
      return actor.getAuctions(filter ?? null);
    },
    staleTime: 5_000,
    refetchInterval: 5_000,
  });
}

export function useActiveAuctions() {
  return useAuctions({ status: { active: null } as unknown as AuctionStatus });
}

export function useAuction(id: string) {
  return useQuery<Auction | null>({
    queryKey: ["auction", id],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return null;
      return actor.getAuction(id);
    },
    enabled: !!id,
    refetchInterval: 5_000,
  });
}

export function usePlaceBid() {
  const qc = useQueryClient();
  return useMutation<
    Bid,
    Error,
    {
      auctionId: string;
      bidAmountSOL: number;
      bidderAddress: string;
      txSignature: string;
    }
  >({
    mutationFn: async ({
      auctionId,
      bidAmountSOL,
      bidderAddress,
      txSignature,
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.placeBid(
        auctionId,
        bidAmountSOL,
        bidderAddress,
        txSignature,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, { auctionId }) => {
      qc.invalidateQueries({ queryKey: ["auctions"] });
      qc.invalidateQueries({ queryKey: ["auction", auctionId] });
    },
  });
}

export function useSettleAuction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      auctionId,
      winnerAddress,
      paymentTxSignature,
    }: {
      auctionId: string;
      winnerAddress: string;
      paymentTxSignature: string;
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.settleAuction(
        auctionId,
        winnerAddress,
        paymentTxSignature,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auctions"] });
    },
  });
}

export function useCreateAuction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      mintAddress,
      startPriceSOL,
      reservePriceSOL,
      durationHours,
    }: {
      mintAddress: string;
      startPriceSOL: number;
      reservePriceSOL: number;
      durationHours: number;
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.createAuction(
        mintAddress,
        startPriceSOL,
        reservePriceSOL,
        BigInt(durationHours),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auctions"] });
    },
  });
}

// ─── Config ────────────────────────────────────────────────────────────────────

export function useAppConfig() {
  return useQuery<AppConfig | null>({
    queryKey: ["appConfig"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return null;
      return actor.getConfig();
    },
    staleTime: 60_000,
  });
}
