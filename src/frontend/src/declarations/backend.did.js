export const idlFactory = ({ IDL }) => {
  const _ImmutableObjectStorageCreateCertificateResult = IDL.Record({
    'method' : IDL.Text,
    'blob_hash' : IDL.Text,
  });
  const _ImmutableObjectStorageRefillInformation = IDL.Record({
    'proposed_top_up_amount' : IDL.Opt(IDL.Nat),
  });
  const _ImmutableObjectStorageRefillResult = IDL.Record({
    'success' : IDL.Opt(IDL.Bool),
    'topped_up_amount' : IDL.Opt(IDL.Nat),
  });
  const ExternalBlob = IDL.Vec(IDL.Nat8);
  const NftInput = IDL.Record({
    'imageBlob' : ExternalBlob,
    'collectionId' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'attributes' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'mintAddress' : IDL.Text,
  });
  const Timestamp = IDL.Int;
  const AuctionId = IDL.Text;
  const ListingStatus = IDL.Variant({
    'fixedPrice' : IDL.Nat,
    'auction' : AuctionId,
    'unlisted' : IDL.Null,
  });
  const NftRecord = IDL.Record({
    'imageBlob' : ExternalBlob,
    'ownerAddress' : IDL.Text,
    'collectionId' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'mintedAt' : Timestamp,
    'listingStatus' : ListingStatus,
    'attributes' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'mintAddress' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok' : NftRecord, 'err' : IDL.Text });
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const AuctionStatus = IDL.Variant({
    'active' : IDL.Null,
    'cancelled' : IDL.Null,
    'settled' : IDL.Null,
    'pending' : IDL.Null,
    'ended' : IDL.Null,
  });
  const Bid = IDL.Record({
    'txSignature' : IDL.Text,
    'placedAt' : Timestamp,
    'amount' : IDL.Float64,
    'bidder' : IDL.Text,
  });
  const Auction = IDL.Record({
    'id' : IDL.Text,
    'status' : AuctionStatus,
    'bids' : IDL.Vec(Bid),
    'startsAt' : Timestamp,
    'currentHighestBid' : IDL.Opt(IDL.Float64),
    'reservePriceSOL' : IDL.Float64,
    'currentHighestBidder' : IDL.Opt(IDL.Text),
    'mintAddress' : IDL.Text,
    'startPriceSOL' : IDL.Float64,
    'sellerAddress' : IDL.Text,
    'endsAt' : Timestamp,
  });
  const Result_4 = IDL.Variant({ 'ok' : Auction, 'err' : IDL.Text });
  const ListingStatus__1 = IDL.Variant({
    'active' : IDL.Null,
    'cancelled' : IDL.Null,
    'expired' : IDL.Null,
    'sold' : IDL.Null,
  });
  const Listing = IDL.Record({
    'id' : IDL.Text,
    'status' : ListingStatus__1,
    'expiresAt' : Timestamp,
    'listedAt' : Timestamp,
    'mintAddress' : IDL.Text,
    'priceSOL' : IDL.Float64,
    'sellerAddress' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : Listing, 'err' : IDL.Text });
  const UserCollectionInput = IDL.Record({
    'metadataUri' : IDL.Text,
    'imageBlob' : ExternalBlob,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'mintAuthority' : IDL.Text,
    'collectionMintAddress' : IDL.Text,
    'symbol' : IDL.Text,
  });
  const UserCollection = IDL.Record({
    'id' : IDL.Text,
    'metadataUri' : IDL.Text,
    'imageBlob' : ExternalBlob,
    'ownerAddress' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'description' : IDL.Text,
    'mintCount' : IDL.Nat,
    'mintAuthority' : IDL.Text,
    'collectionMintAddress' : IDL.Text,
    'collectionFeeSOL' : IDL.Float64,
    'symbol' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : UserCollection, 'err' : IDL.Text });
  const AuctionFilter = IDL.Record({
    'status' : IDL.Opt(AuctionStatus),
    'mintAddress' : IDL.Opt(IDL.Text),
    'sellerAddress' : IDL.Opt(IDL.Text),
  });
  const Collection = IDL.Record({
    'id' : IDL.Text,
    'metadataProgramAddress' : IDL.Text,
    'imageBlob' : ExternalBlob,
    'name' : IDL.Text,
    'createdAt' : Timestamp,
    'createdBy' : IDL.Text,
    'description' : IDL.Text,
    'mintAddress' : IDL.Text,
  });
  const AppConfig = IDL.Record({
    'thresholdKeyName' : IDL.Text,
    'collectionCreationFeeSOL' : IDL.Float64,
    'solanaRpcUrl' : IDL.Text,
    'network' : IDL.Text,
    'escrowWalletAddress' : IDL.Text,
    'collectionPaymentAddress' : IDL.Text,
    'platformFeePercent' : IDL.Float64,
  });
  const ListingFilter = IDL.Record({
    'status' : IDL.Opt(ListingStatus__1),
    'mintAddress' : IDL.Opt(IDL.Text),
    'sellerAddress' : IDL.Opt(IDL.Text),
  });
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const UserProfile = IDL.Record({
    'createdCollections' : IDL.Vec(IDL.Text),
    'joinedAt' : Timestamp,
    'role' : Role,
    'solanaAddress' : IDL.Text,
  });
  const WalletSession = IDL.Record({
    'role' : Role,
    'nftDepositPublicKey' : IDL.Vec(IDL.Nat8),
    'config' : AppConfig,
    'solanaAddress' : IDL.Text,
    'solDepositPublicKey' : IDL.Vec(IDL.Nat8),
  });
  const Result_1 = IDL.Variant({ 'ok' : Bid, 'err' : IDL.Text });
  const CollectionInput = IDL.Record({
    'metadataProgramAddress' : IDL.Text,
    'imageBlob' : ExternalBlob,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'mintAddress' : IDL.Text,
  });
  const VaultKind = IDL.Variant({ 'nft' : IDL.Null, 'sol' : IDL.Null });
  const http_header = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const http_request_result = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  const TransformationInput = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : http_request_result,
  });
  const TransformationOutput = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(http_header),
  });
  return IDL.Service({
    '_immutableObjectStorageBlobsAreLive' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        [IDL.Vec(IDL.Bool)],
        ['query'],
      ),
    '_immutableObjectStorageBlobsToDelete' : IDL.Func(
        [],
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    '_immutableObjectStorageConfirmBlobDeletion' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        [],
        [],
      ),
    '_immutableObjectStorageCreateCertificate' : IDL.Func(
        [IDL.Text],
        [_ImmutableObjectStorageCreateCertificateResult],
        [],
      ),
    '_immutableObjectStorageRefillCashier' : IDL.Func(
        [IDL.Opt(_ImmutableObjectStorageRefillInformation)],
        [_ImmutableObjectStorageRefillResult],
        [],
      ),
    '_immutableObjectStorageUpdateGatewayPrincipals' : IDL.Func([], [], []),
    '_initializeAccessControl' : IDL.Func([], [], []),
    'addNftToUserCollection' : IDL.Func([IDL.Text, NftInput], [Result_5], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'cancelAuction' : IDL.Func([IDL.Text], [Result], []),
    'cancelListing' : IDL.Func([IDL.Text], [Result], []),
    'completeSale' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
    'createAuction' : IDL.Func(
        [IDL.Text, IDL.Float64, IDL.Float64, IDL.Nat],
        [Result_4],
        [],
      ),
    'createListing' : IDL.Func(
        [IDL.Text, IDL.Float64, IDL.Nat],
        [Result_3],
        [],
      ),
    'createUserCollection' : IDL.Func(
        [UserCollectionInput, IDL.Text],
        [Result_2],
        [],
      ),
    'deleteCollection' : IDL.Func([IDL.Text], [Result], []),
    'getAuction' : IDL.Func([IDL.Text], [IDL.Opt(Auction)], ['query']),
    'getAuctions' : IDL.Func(
        [IDL.Opt(AuctionFilter)],
        [IDL.Vec(Auction)],
        ['query'],
      ),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getCollections' : IDL.Func([], [IDL.Vec(Collection)], ['query']),
    'getConfig' : IDL.Func([], [AppConfig], ['query']),
    'getListings' : IDL.Func(
        [IDL.Opt(ListingFilter)],
        [IDL.Vec(Listing)],
        ['query'],
      ),
    'getMyRole' : IDL.Func([], [Role], ['query']),
    'getNft' : IDL.Func([IDL.Text], [IDL.Opt(NftRecord)], ['query']),
    'getSolanaBalance' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(UserProfile)], ['query']),
    'getUserCollections' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(UserCollection)],
        ['query'],
      ),
    'getUserNfts' : IDL.Func([IDL.Text], [IDL.Vec(NftRecord)], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'loginWithPhantom' : IDL.Func([IDL.Text], [WalletSession], []),
    'placeBid' : IDL.Func(
        [IDL.Text, IDL.Float64, IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'registerCollection' : IDL.Func([CollectionInput], [IDL.Text], []),
    'registerUser' : IDL.Func([IDL.Text], [Role], []),
    'settleAuction' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
    'signWithVault' : IDL.Func(
        [VaultKind, IDL.Vec(IDL.Nat8)],
        [IDL.Vec(IDL.Nat8)],
        [],
      ),
    'transform' : IDL.Func(
        [TransformationInput],
        [TransformationOutput],
        ['query'],
      ),
    'updateCollection' : IDL.Func([IDL.Text, CollectionInput], [Result], []),
    'updateConfig' : IDL.Func([AppConfig], [Result], []),
    'verifyTransaction' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
