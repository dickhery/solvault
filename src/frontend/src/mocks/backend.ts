import {
  AuctionStatus,
  ListingStatus__1,
  type _ImmutableObjectStorageCreateCertificateResult,
  type _ImmutableObjectStorageRefillInformation,
  type _ImmutableObjectStorageRefillResult,
  type backendInterface,
  type Role,
} from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  addNftToUserCollection: async () => ({ __kind__: "ok", ok: {
    imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/nft1/400/400", withUploadProgress: () => ({} as never) } as never,
    ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
    collectionId: "col-001",
    name: "Mock NFT",
    description: "A mock NFT",
    mintedAt: now,
    listingStatus: { __kind__: "unlisted", unlisted: null },
    attributes: [["rarity", "rare"]],
    mintAddress: "mint001",
  }}),

  assignCallerUserRole: async (_user: Principal, _role: unknown) => undefined,

  cancelAuction: async () => ({ __kind__: "ok", ok: null }),

  cancelListing: async () => ({ __kind__: "ok", ok: null }),

  completeSale: async () => ({ __kind__: "ok", ok: null }),

  createAuction: async () => ({ __kind__: "ok", ok: {
    id: "auction-001",
    status: AuctionStatus.active,
    bids: [],
    startsAt: now,
    endsAt: now + BigInt(86400) * BigInt(1_000_000_000),
    reservePriceSOL: 2.0,
    mintAddress: "mint001",
    startPriceSOL: 1.0,
    sellerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
  }}),

  createListing: async () => ({ __kind__: "ok", ok: {
    id: "listing-001",
    status: ListingStatus__1.active,
    expiresAt: now + BigInt(86400) * BigInt(1_000_000_000),
    listedAt: now,
    mintAddress: "mint001",
    priceSOL: 1.5,
    sellerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
  }}),

  createUserCollection: async () => ({ __kind__: "ok", ok: {
    id: "uc-001",
    metadataUri: "https://arweave.net/sample",
    imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/col1/400/400", withUploadProgress: () => ({} as never) } as never,
    ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
    name: "Cosmic Apes",
    createdAt: now,
    description: "A collection of cosmic apes",
    mintCount: BigInt(12),
    mintAuthority: "authAddr",
    collectionMintAddress: "colMintAddr",
    collectionFeeSOL: 0.5,
    symbol: "CAPE",
  }}),

  deleteCollection: async () => ({ __kind__: "ok", ok: null }),

  getAuction: async () => ({
    id: "auction-001",
    status: AuctionStatus.active,
    bids: [
      { txSignature: "txSig1", placedAt: now, amount: 1.2, bidder: "bidder1" },
    ],
    startsAt: now,
    endsAt: now + BigInt(86400) * BigInt(1_000_000_000),
    reservePriceSOL: 2.0,
    currentHighestBid: 1.2,
    currentHighestBidder: "bidder1",
    mintAddress: "mint001",
    startPriceSOL: 1.0,
    sellerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
  }),

  getAuctions: async () => [
    {
      id: "auction-001",
      status: AuctionStatus.active,
      bids: [],
      startsAt: now,
      endsAt: now + BigInt(86400) * BigInt(1_000_000_000),
      reservePriceSOL: 2.0,
      currentHighestBid: 1.2,
      currentHighestBidder: "bidder1",
      mintAddress: "mint-auction-1",
      startPriceSOL: 1.0,
      sellerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
    },
    {
      id: "auction-002",
      status: AuctionStatus.active,
      bids: [],
      startsAt: now,
      endsAt: now + BigInt(3600) * BigInt(1_000_000_000),
      reservePriceSOL: 5.0,
      mintAddress: "mint-auction-2",
      startPriceSOL: 3.0,
      sellerAddress: "8yAk2WjXhYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWj",
    },
  ],

  getCallerUserRole: async () => ({ admin: null }) as unknown as never,

  getCollections: async () => [
    {
      id: "col-001",
      metadataProgramAddress: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/collection1/400/400", withUploadProgress: () => ({} as never) } as never,
      name: "Solana Monkeys",
      createdAt: now,
      createdBy: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      description: "The original Solana Monkeys collection — 10,000 unique NFTs",
      mintAddress: "SMNKzDdvQxqY1SPUHrZsJ5mHDr3KAzYMgHGGLvUXC8h",
    },
    {
      id: "col-002",
      metadataProgramAddress: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/collection2/400/400", withUploadProgress: () => ({} as never) } as never,
      name: "DeGods",
      createdAt: now,
      createdBy: "8yAk2WjXhYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWj",
      description: "DeGods — a deflationary collection of degenerates, punks, and misfits",
      mintAddress: "DEGodsZdvQxqY1SPUHrZsJ5mHDr3KAzYMgHGGLvUXC9i",
    },
    {
      id: "col-003",
      metadataProgramAddress: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/collection3/400/400", withUploadProgress: () => ({} as never) } as never,
      name: "Okay Bears",
      createdAt: now,
      createdBy: "7zCl3VkWgXZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWk",
      description: "Okay Bears — 10,000 bears pushing culture forward on Solana",
      mintAddress: "OKBRZdvQxqY1SPUHrZsJ5mHDr3KAzYMgHGGLvUXC0j",
    },
  ],

  getConfig: async () => ({
    collectionCreationFeeSOL: 0.5,
    solanaRpcUrl: "https://api.devnet.solana.com",
    network: "devnet",
    escrowWalletAddress: "EscrowXdvQxqY1SPUHrZsJ5mHDr3KAzYMgHGGLvUXC8h",
    platformFeePercent: 2.5,
  }),

  getListings: async () => [
    {
      id: "listing-001",
      status: ListingStatus__1.active,
      expiresAt: now + BigInt(7 * 86400) * BigInt(1_000_000_000),
      listedAt: now,
      mintAddress: "mint-list-1",
      priceSOL: 1.5,
      sellerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
    },
    {
      id: "listing-002",
      status: ListingStatus__1.active,
      expiresAt: now + BigInt(3 * 86400) * BigInt(1_000_000_000),
      listedAt: now,
      mintAddress: "mint-list-2",
      priceSOL: 4.2,
      sellerAddress: "8yAk2WjXhYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWj",
    },
    {
      id: "listing-003",
      status: ListingStatus__1.active,
      expiresAt: now + BigInt(5 * 86400) * BigInt(1_000_000_000),
      listedAt: now,
      mintAddress: "mint-list-3",
      priceSOL: 7.8,
      sellerAddress: "7zCl3VkWgXZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWk",
    },
  ],

  getMyRole: async () => "admin" as Role,

  getNft: async () => ({
    imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/nft1/400/400", withUploadProgress: () => ({} as never) } as never,
    ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
    collectionId: "col-001",
    name: "Solana Monkey #1337",
    description: "A rare Solana Monkey from the genesis collection",
    mintedAt: now,
    listingStatus: { __kind__: "unlisted", unlisted: null },
    attributes: [["background", "galaxy"], ["rarity", "legendary"], ["eyes", "laser"]],
    mintAddress: "mint001",
  }),

  getSolanaBalance: async () => '{"jsonrpc":"2.0","result":{"context":{"slot":100},"value":5280000000},"id":1}',

  getUser: async () => ({
    createdCollections: ["col-001"],
    joinedAt: now,
    role: "admin" as Role,
    solanaAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
  }),

  getUserCollections: async () => [
    {
      id: "uc-001",
      metadataUri: "https://arweave.net/sample1",
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/uc1/400/400", withUploadProgress: () => ({} as never) } as never,
      ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      name: "Cosmic Apes",
      createdAt: now,
      description: "A collection of cosmic apes exploring the Solana universe",
      mintCount: BigInt(12),
      mintAuthority: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      collectionMintAddress: "CAAPEzDdvQxqY1SPUHrZsJ5mHDr3KAzYMgHGGLvUXC8h",
      collectionFeeSOL: 0.5,
      symbol: "CAPE",
    },
  ],

  getUserNfts: async () => [
    {
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/nft1/400/400", withUploadProgress: () => ({} as never) } as never,
      ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      collectionId: "col-001",
      name: "Solana Monkey #1337",
      description: "A rare Solana Monkey",
      mintedAt: now,
      listingStatus: { __kind__: "unlisted", unlisted: null },
      attributes: [["rarity", "legendary"]],
      mintAddress: "mint-nft-1",
    },
    {
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/nft2/400/400", withUploadProgress: () => ({} as never) } as never,
      ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      collectionId: "col-002",
      name: "DeGod #420",
      description: "A DeGod NFT",
      mintedAt: now,
      listingStatus: { __kind__: "fixedPrice", fixedPrice: BigInt(4200000000) },
      attributes: [["rarity", "rare"]],
      mintAddress: "mint-nft-2",
    },
    {
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/nft3/400/400", withUploadProgress: () => ({} as never) } as never,
      ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      collectionId: "col-003",
      name: "Okay Bear #888",
      description: "An Okay Bear NFT",
      mintedAt: now,
      listingStatus: { __kind__: "unlisted", unlisted: null },
      attributes: [["rarity", "uncommon"]],
      mintAddress: "mint-nft-3",
    },
    {
      imageBlob: { getBytes: async () => new Uint8Array(), getDirectURL: () => "https://picsum.photos/seed/nft4/400/400", withUploadProgress: () => ({} as never) } as never,
      ownerAddress: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
      collectionId: "col-001",
      name: "Solana Monkey #2048",
      description: "Another Solana Monkey",
      mintedAt: now,
      listingStatus: { __kind__: "unlisted", unlisted: null },
      attributes: [["rarity", "common"]],
      mintAddress: "mint-nft-4",
    },
  ],

  isCallerAdmin: async () => true,

  placeBid: async () => ({ __kind__: "ok", ok: {
    txSignature: "txSig123",
    placedAt: now,
    amount: 1.5,
    bidder: "9xBj3YkXgYZLqLF8wQ3KtHmP2zVnRCxMaD5NsE4pUoWi",
  }}),

  registerCollection: async () => "col-new-001",

  registerUser: async () => "admin" as Role,

  settleAuction: async () => ({ __kind__: "ok", ok: null }),

  transform: async (input) => ({
    status: input.response.status,
    body: input.response.body,
    headers: input.response.headers,
  }),

  updateCollection: async () => ({ __kind__: "ok", ok: null }),

  updateConfig: async () => ({ __kind__: "ok", ok: null }),

  verifyTransaction: async () => '{"jsonrpc":"2.0","result":{"slot":100,"transaction":{}},"id":1}',

  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>) => [],

  _immutableObjectStorageBlobsToDelete: async () => [],

  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>) => undefined,

  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> =>
    ({ __kind__: "ok", ok: new Uint8Array() }) as unknown as _ImmutableObjectStorageCreateCertificateResult,

  _immutableObjectStorageRefillCashier: async (_refillInformation: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> =>
    ({}) as unknown as _ImmutableObjectStorageRefillResult,

  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,

  _initializeAccessControl: async () => undefined,
};
