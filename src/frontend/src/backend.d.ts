import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Result_2 = {
    __kind__: "ok";
    ok: UserCollection;
} | {
    __kind__: "err";
    err: string;
};
export interface NftRecord {
    imageBlob: ExternalBlob;
    ownerAddress: string;
    collectionId: string;
    name: string;
    description: string;
    mintedAt: Timestamp;
    listingStatus: ListingStatus;
    attributes: Array<[string, string]>;
    mintAddress: string;
}
export type ListingStatus = {
    __kind__: "fixedPrice";
    fixedPrice: bigint;
} | {
    __kind__: "auction";
    auction: AuctionId;
} | {
    __kind__: "unlisted";
    unlisted: null;
};
export interface Bid {
    txSignature: string;
    placedAt: Timestamp;
    amount: number;
    bidder: string;
}
export interface AppConfig {
    collectionCreationFeeSOL: number;
    solanaRpcUrl: string;
    network: string;
    escrowWalletAddress: string;
    platformFeePercent: number;
}
export type Result_5 = {
    __kind__: "ok";
    ok: NftRecord;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: Bid;
} | {
    __kind__: "err";
    err: string;
};
export interface UserCollectionInput {
    metadataUri: string;
    imageBlob: ExternalBlob;
    name: string;
    description: string;
    mintAuthority: string;
    collectionMintAddress: string;
    symbol: string;
}
export interface UserCollection {
    id: string;
    metadataUri: string;
    imageBlob: ExternalBlob;
    ownerAddress: string;
    name: string;
    createdAt: Timestamp;
    description: string;
    mintCount: bigint;
    mintAuthority: string;
    collectionMintAddress: string;
    collectionFeeSOL: number;
    symbol: string;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Auction;
} | {
    __kind__: "err";
    err: string;
};
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type AuctionId = string;
export interface NftInput {
    imageBlob: ExternalBlob;
    collectionId: string;
    name: string;
    description: string;
    attributes: Array<[string, string]>;
    mintAddress: string;
}
export interface Listing {
    id: string;
    status: ListingStatus__1;
    expiresAt: Timestamp;
    listedAt: Timestamp;
    mintAddress: string;
    priceSOL: number;
    sellerAddress: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Listing;
} | {
    __kind__: "err";
    err: string;
};
export interface ListingFilter {
    status?: ListingStatus__1;
    mintAddress?: string;
    sellerAddress?: string;
}
export interface Collection {
    id: string;
    metadataProgramAddress: string;
    imageBlob: ExternalBlob;
    name: string;
    createdAt: Timestamp;
    createdBy: string;
    description: string;
    mintAddress: string;
}
export interface AuctionFilter {
    status?: AuctionStatus;
    mintAddress?: string;
    sellerAddress?: string;
}
export interface Auction {
    id: string;
    status: AuctionStatus;
    bids: Array<Bid>;
    startsAt: Timestamp;
    currentHighestBid?: number;
    reservePriceSOL: number;
    currentHighestBidder?: string;
    mintAddress: string;
    startPriceSOL: number;
    sellerAddress: string;
    endsAt: Timestamp;
}
export interface UserProfile {
    createdCollections: Array<string>;
    joinedAt: Timestamp;
    role: Role;
    solanaAddress: string;
}
export interface CollectionInput {
    metadataProgramAddress: string;
    imageBlob: ExternalBlob;
    name: string;
    description: string;
    mintAddress: string;
}
export enum AuctionStatus {
    active = "active",
    cancelled = "cancelled",
    settled = "settled",
    pending = "pending",
    ended = "ended"
}
export enum ListingStatus__1 {
    active = "active",
    cancelled = "cancelled",
    expired = "expired",
    sold = "sold"
}
export enum Role {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addNftToUserCollection(collectionId: string, nft: NftInput): Promise<Result_5>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelAuction(auctionId: string): Promise<Result>;
    cancelListing(listingId: string): Promise<Result>;
    completeSale(listingId: string, buyerAddress: string, txSignature: string): Promise<Result>;
    createAuction(mintAddress: string, startPriceSOL: number, reservePriceSOL: number, durationHours: bigint): Promise<Result_4>;
    createListing(mintAddress: string, priceSOL: number, durationDays: bigint): Promise<Result_3>;
    createUserCollection(data: UserCollectionInput, txSignature: string): Promise<Result_2>;
    deleteCollection(id: string): Promise<Result>;
    getAuction(auctionId: string): Promise<Auction | null>;
    getAuctions(filter: AuctionFilter | null): Promise<Array<Auction>>;
    getCallerUserRole(): Promise<UserRole>;
    getCollections(): Promise<Array<Collection>>;
    getConfig(): Promise<AppConfig>;
    getListings(filter: ListingFilter | null): Promise<Array<Listing>>;
    getMyRole(): Promise<Role>;
    getNft(mintAddress: string): Promise<NftRecord | null>;
    /**
     * / Query Solana Devnet balance for a given address; returns lamports as Text.
     */
    getSolanaBalance(address: string): Promise<string>;
    getUser(solanaAddress: string): Promise<UserProfile | null>;
    getUserCollections(ownerAddress: string): Promise<Array<UserCollection>>;
    getUserNfts(ownerAddress: string): Promise<Array<NftRecord>>;
    isCallerAdmin(): Promise<boolean>;
    placeBid(auctionId: string, bidAmountSOL: number, bidderAddress: string, txSignature: string): Promise<Result_1>;
    registerCollection(data: CollectionInput): Promise<string>;
    registerUser(solanaAddress: string): Promise<Role>;
    settleAuction(auctionId: string, winnerAddress: string, paymentTxSignature: string): Promise<Result>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCollection(id: string, data: CollectionInput): Promise<Result>;
    updateConfig(config: AppConfig): Promise<Result>;
    /**
     * / Verify a Solana transaction is finalized; returns raw JSON response as Text.
     */
    verifyTransaction(txSignature: string): Promise<string>;
}
