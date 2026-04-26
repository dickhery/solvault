import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
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
import WalletTypes "types/wallets";

import MixinUsers "mixins/users-api";
import MixinCollections "mixins/collections-api";
import MixinNfts "mixins/nfts-api";
import MixinMarketplace "mixins/marketplace-api";
import MixinConfig "mixins/config-api";
import UserLib "lib/users";
import { migration } "Migration";

(with migration)
persistent actor {
  type SchnorrAlgorithm = { #bip340secp256k1; #ed25519 };
  type SchnorrKeyId = { algorithm : SchnorrAlgorithm; name : Text };
  type SchnorrAux = { #bip341 : { merkle_root_hash : Blob } };

  let management = actor ("aaaaa-aa") : actor {
    schnorr_public_key : shared {
      canister_id : ?Principal;
      derivation_path : [Blob];
      key_id : SchnorrKeyId;
    } -> async {
      public_key : Blob;
      chain_code : Blob;
    };
    sign_with_schnorr : shared {
      message : Blob;
      derivation_path : [Blob];
      key_id : SchnorrKeyId;
      aux : ?SchnorrAux;
    } -> async { signature : Blob };
  };

  let schnorrCallCycles : Nat = 25_000_000_000;

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
      collectionPaymentAddress = "";
      solanaRpcUrl = "https://api.devnet.solana.com";
      network = "devnet";
      thresholdKeyName = "dfx_test_key";
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
    appConfig,
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

  func requireAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous callers are not allowed");
    };
  };

  func schnorrKeyId() : SchnorrKeyId {
    {
      algorithm = #ed25519;
      name = appConfig.value.thresholdKeyName;
    };
  };

  func vaultDerivationPath(caller : Principal, vaultKind : WalletTypes.VaultKind) : [Blob] {
    let vaultSegment = switch (vaultKind) {
      case (#sol) { "sol".encodeUtf8() };
      case (#nft) { "nft".encodeUtf8() };
    };
    [
      "solvault".encodeUtf8(),
      caller.toBlob(),
      vaultSegment,
    ];
  };

  func getVaultPublicKey(caller : Principal, vaultKind : WalletTypes.VaultKind) : async Blob {
    let { public_key } = await (with cycles = schnorrCallCycles) management.schnorr_public_key({
      canister_id = null;
      derivation_path = vaultDerivationPath(caller, vaultKind);
      key_id = schnorrKeyId();
    });
    public_key;
  };

  /// Register the connected Phantom wallet if needed and return the current
  /// app session details, including the app-controlled deposit public keys.
  public shared ({ caller }) func loginWithPhantom(solanaAddress : Text) : async WalletTypes.WalletSession {
    requireAuthenticated(caller);
    if (solanaAddress.size() == 0) {
      Runtime.trap("solanaAddress must not be empty");
    };

    let role = switch (users.get(solanaAddress)) {
      case (?existing) { existing.role };
      case null { UserLib.registerUser(users, accessControlState, solanaAddress, caller) };
    };

    let solDepositPublicKey = await getVaultPublicKey(caller, #sol);
    let nftDepositPublicKey = await getVaultPublicKey(caller, #nft);

    {
      solanaAddress;
      role;
      solDepositPublicKey;
      nftDepositPublicKey;
      config = appConfig.value;
    };
  };

  /// Sign an arbitrary message with the caller's derived vault key. This is the
  /// foundation needed for Solana withdrawals from app-controlled vaults.
  public shared ({ caller }) func signWithVault(vaultKind : WalletTypes.VaultKind, message : Blob) : async Blob {
    requireAuthenticated(caller);
    let { signature } = await (with cycles = schnorrCallCycles) management.sign_with_schnorr({
      message;
      derivation_path = vaultDerivationPath(caller, vaultKind);
      key_id = schnorrKeyId();
      aux = null;
    });
    signature;
  };

  // ── Solana RPC HTTP Outcalls ──────────────────────────────────

  /// Extract the lamports value from a Solana RPC getBalance JSON response.
  /// Expected format: {"jsonrpc":"2.0","result":{"context":{"slot":N},"value":LAMPORTS},"id":1}
  func parseLamports(json : Text) : Text {
    // Split on `"value":` — take the part after the first occurrence
    let parts = Iter.toArray(json.split(#text "\"value\":"));
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
