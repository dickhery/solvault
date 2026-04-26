import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AppConfig {
  'thresholdKeyName' : string,
  'collectionCreationFeeSOL' : number,
  'solanaRpcUrl' : string,
  'network' : string,
  'escrowWalletAddress' : string,
  'collectionPaymentAddress' : string,
  'platformFeePercent' : number,
}
export interface Auction {
  'id' : string,
  'status' : AuctionStatus,
  'bids' : Array<Bid>,
  'startsAt' : Timestamp,
  'currentHighestBid' : [] | [number],
  'reservePriceSOL' : number,
  'currentHighestBidder' : [] | [string],
  'mintAddress' : string,
  'startPriceSOL' : number,
  'sellerAddress' : string,
  'endsAt' : Timestamp,
}
export interface AuctionFilter {
  'status' : [] | [AuctionStatus],
  'mintAddress' : [] | [string],
  'sellerAddress' : [] | [string],
}
export type AuctionId = string;
export type AuctionStatus = { 'active' : null } |
  { 'cancelled' : null } |
  { 'settled' : null } |
  { 'pending' : null } |
  { 'ended' : null };
export interface Bid {
  'txSignature' : string,
  'placedAt' : Timestamp,
  'amount' : number,
  'bidder' : string,
}
export interface Collection {
  'id' : string,
  'metadataProgramAddress' : string,
  'imageBlob' : ExternalBlob,
  'name' : string,
  'createdAt' : Timestamp,
  'createdBy' : string,
  'description' : string,
  'mintAddress' : string,
}
export interface CollectionInput {
  'metadataProgramAddress' : string,
  'imageBlob' : ExternalBlob,
  'name' : string,
  'description' : string,
  'mintAddress' : string,
}
export type ExternalBlob = Uint8Array | number[];
export interface Listing {
  'id' : string,
  'status' : ListingStatus__1,
  'expiresAt' : Timestamp,
  'listedAt' : Timestamp,
  'mintAddress' : string,
  'priceSOL' : number,
  'sellerAddress' : string,
}
export interface ListingFilter {
  'status' : [] | [ListingStatus__1],
  'mintAddress' : [] | [string],
  'sellerAddress' : [] | [string],
}
export type ListingStatus = { 'fixedPrice' : bigint } |
  { 'auction' : AuctionId } |
  { 'unlisted' : null };
export type ListingStatus__1 = { 'active' : null } |
  { 'cancelled' : null } |
  { 'expired' : null } |
  { 'sold' : null };
export interface NftInput {
  'imageBlob' : ExternalBlob,
  'collectionId' : string,
  'name' : string,
  'description' : string,
  'attributes' : Array<[string, string]>,
  'mintAddress' : string,
}
export interface NftRecord {
  'imageBlob' : ExternalBlob,
  'ownerAddress' : string,
  'collectionId' : string,
  'name' : string,
  'description' : string,
  'mintedAt' : Timestamp,
  'listingStatus' : ListingStatus,
  'attributes' : Array<[string, string]>,
  'mintAddress' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Bid } |
  { 'err' : string };
export type Result_2 = { 'ok' : UserCollection } |
  { 'err' : string };
export type Result_3 = { 'ok' : Listing } |
  { 'err' : string };
export type Result_4 = { 'ok' : Auction } |
  { 'err' : string };
export type Result_5 = { 'ok' : NftRecord } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export type Timestamp = bigint;
export interface TransformationInput {
  'context' : Uint8Array | number[],
  'response' : http_request_result,
}
export interface TransformationOutput {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface UserCollection {
  'id' : string,
  'metadataUri' : string,
  'imageBlob' : ExternalBlob,
  'ownerAddress' : string,
  'name' : string,
  'createdAt' : Timestamp,
  'description' : string,
  'mintCount' : bigint,
  'mintAuthority' : string,
  'collectionMintAddress' : string,
  'collectionFeeSOL' : number,
  'symbol' : string,
}
export interface UserCollectionInput {
  'metadataUri' : string,
  'imageBlob' : ExternalBlob,
  'name' : string,
  'description' : string,
  'mintAuthority' : string,
  'collectionMintAddress' : string,
  'symbol' : string,
}
export interface UserProfile {
  'createdCollections' : Array<string>,
  'joinedAt' : Timestamp,
  'role' : Role,
  'solanaAddress' : string,
}
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export type VaultKind = { 'nft' : null } |
  { 'sol' : null };
export interface WalletSession {
  'role' : Role,
  'nftDepositPublicKey' : Uint8Array | number[],
  'config' : AppConfig,
  'solanaAddress' : string,
  'solDepositPublicKey' : Uint8Array | number[],
}
export interface _ImmutableObjectStorageCreateCertificateResult {
  'method' : string,
  'blob_hash' : string,
}
export interface _ImmutableObjectStorageRefillInformation {
  'proposed_top_up_amount' : [] | [bigint],
}
export interface _ImmutableObjectStorageRefillResult {
  'success' : [] | [boolean],
  'topped_up_amount' : [] | [bigint],
}
export interface http_header { 'value' : string, 'name' : string }
export interface http_request_result {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<http_header>,
}
export interface _SERVICE {
  '_immutableObjectStorageBlobsAreLive' : ActorMethod<
    [Array<Uint8Array | number[]>],
    Array<boolean>
  >,
  '_immutableObjectStorageBlobsToDelete' : ActorMethod<
    [],
    Array<Uint8Array | number[]>
  >,
  '_immutableObjectStorageConfirmBlobDeletion' : ActorMethod<
    [Array<Uint8Array | number[]>],
    undefined
  >,
  '_immutableObjectStorageCreateCertificate' : ActorMethod<
    [string],
    _ImmutableObjectStorageCreateCertificateResult
  >,
  '_immutableObjectStorageRefillCashier' : ActorMethod<
    [[] | [_ImmutableObjectStorageRefillInformation]],
    _ImmutableObjectStorageRefillResult
  >,
  '_immutableObjectStorageUpdateGatewayPrincipals' : ActorMethod<[], undefined>,
  '_initializeAccessControl' : ActorMethod<[], undefined>,
  'addNftToUserCollection' : ActorMethod<[string, NftInput], Result_5>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'cancelAuction' : ActorMethod<[string], Result>,
  'cancelListing' : ActorMethod<[string], Result>,
  'completeSale' : ActorMethod<[string, string, string], Result>,
  'createAuction' : ActorMethod<[string, number, number, bigint], Result_4>,
  'createListing' : ActorMethod<[string, number, bigint], Result_3>,
  'createUserCollection' : ActorMethod<[UserCollectionInput, string], Result_2>,
  'deleteCollection' : ActorMethod<[string], Result>,
  'getAuction' : ActorMethod<[string], [] | [Auction]>,
  'getAuctions' : ActorMethod<[[] | [AuctionFilter]], Array<Auction>>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getCollections' : ActorMethod<[], Array<Collection>>,
  'getConfig' : ActorMethod<[], AppConfig>,
  'getListings' : ActorMethod<[[] | [ListingFilter]], Array<Listing>>,
  'getMyRole' : ActorMethod<[], Role>,
  'getNft' : ActorMethod<[string], [] | [NftRecord]>,
  /**
   * / Query Solana balance for a given address; returns lamports as Text.
   */
  'getSolanaBalance' : ActorMethod<[string], string>,
  'getUser' : ActorMethod<[string], [] | [UserProfile]>,
  'getUserCollections' : ActorMethod<[string], Array<UserCollection>>,
  'getUserNfts' : ActorMethod<[string], Array<NftRecord>>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  /**
   * / Register the connected Phantom wallet if needed and return the current
   * / app session details, including the app-controlled deposit public keys.
   */
  'loginWithPhantom' : ActorMethod<[string], WalletSession>,
  'placeBid' : ActorMethod<[string, number, string, string], Result_1>,
  'registerCollection' : ActorMethod<[CollectionInput], string>,
  'registerUser' : ActorMethod<[string], Role>,
  'settleAuction' : ActorMethod<[string, string, string], Result>,
  /**
   * / Sign an arbitrary message with the caller's derived vault key. This is the
   * / foundation needed for Solana withdrawals from app-controlled vaults.
   */
  'signWithVault' : ActorMethod<
    [VaultKind, Uint8Array | number[]],
    Uint8Array | number[]
  >,
  'transform' : ActorMethod<[TransformationInput], TransformationOutput>,
  'updateCollection' : ActorMethod<[string, CollectionInput], Result>,
  'updateConfig' : ActorMethod<[AppConfig], Result>,
  /**
   * / Verify a Solana transaction is finalized; returns raw JSON response as Text.
   */
  'verifyTransaction' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
