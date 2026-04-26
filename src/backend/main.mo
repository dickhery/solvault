import Map "mo:core/Map";
import Text "mo:core/Text";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import OutCall "mo:caffeineai-http-outcalls/outcall";

import UserTypes "types/users";
import CollectionTypes "types/collections";
import NftTypes "types/nfts";
import MarketTypes "types/marketplace";
import ConfigTypes "types/config";

import MixinUsers "mixins/users-api";
import MixinCollections "mixins/collections-api";
import MixinNfts "mixins/nfts-api";
import MixinMarketplace "mixins/marketplace-api";
import MixinConfig "mixins/config-api";

actor {
  // ── Extension infrastructure ─────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  // ── HTTP outcalls transform (required by caffeineai-http-outcalls) ─
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Shared state ─────────────────────────────────────────────
  let users = Map.empty<Text, UserTypes.UserProfile>();

  let collections = Map.empty<Text, CollectionTypes.Collection>();
  let userCollections = Map.empty<Text, CollectionTypes.UserCollection>();
  let collectionIdCounter = { var next : Nat = 0 };
  let userCollectionIdCounter = { var next : Nat = 0 };

  let nfts = Map.empty<Text, NftTypes.NftRecord>();

  let listings = Map.empty<Text, MarketTypes.Listing>();
  let auctions = Map.empty<Text, MarketTypes.Auction>();
  let listingIdCounter = { var next : Nat = 0 };
  let auctionIdCounter = { var next : Nat = 0 };

  let appConfig = {
    var value : ConfigTypes.AppConfig = {
      collectionCreationFeeSOL = 0.5;
      platformFeePercent = 2.5;
      escrowWalletAddress = "";
      solanaRpcUrl = "https://api.devnet.solana.com";
      network = "devnet";
    };
  };

  // ── Domain mixins ─────────────────────────────────────────────
  include MixinUsers(accessControlState, users);

  include MixinCollections(
    accessControlState,
    collections,
    userCollections,
    users,
    collectionIdCounter,
    userCollectionIdCounter,
  );

  include MixinNfts(
    accessControlState,
    nfts,
    userCollections,
  );

  include MixinMarketplace(
    accessControlState,
    listings,
    auctions,
    nfts,
    listingIdCounter,
    auctionIdCounter,
  );

  include MixinConfig(accessControlState, appConfig);

  // ── Solana RPC HTTP Outcalls ──────────────────────────────────

  /// Extract the lamports value from a Solana RPC getBalance JSON response.
  /// Expected format: {"jsonrpc":"2.0","result":{"context":{"slot":N},"value":LAMPORTS},"id":1}
  func parseLamports(json : Text) : Text {
    // Split on `"value":` — take the part after the first occurrence
    let parts = json.split(#text "\"value\":").toArray();
    if (parts.size() < 2) return "0";
    let after = parts[1];
    // Collect consecutive digit characters from the start of `after`
    var digits = "";
    for (ch in after.chars()) {
      if (ch >= '0' and ch <= '9') {
        digits := digits # Text.fromChar(ch);
      } else if (digits != "") {
        // Stop at first non-digit after collecting digits
        return digits;
      };
    };
    if (digits == "") "0" else digits;
  };

  /// Query Solana balance for a given address; returns lamports as Text.
  public func getSolanaBalance(address : Text) : async Text {
    let rpcUrl = appConfig.value.solanaRpcUrl;
    let body = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"getBalance\",\"params\":[\"" # address # "\"]}";
    let raw = await OutCall.httpPostRequest(rpcUrl, [], body, transform);
    parseLamports(raw);
  };

  /// Verify a Solana transaction is finalized; returns raw JSON response as Text.
  public func verifyTransaction(txSignature : Text) : async Text {
    let rpcUrl = appConfig.value.solanaRpcUrl;
    let body = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"getTransaction\",\"params\":[\"" # txSignature # "\",{\"encoding\":\"json\",\"commitment\":\"finalized\"}]}";
    await OutCall.httpPostRequest(rpcUrl, [], body, transform);
  };
};
