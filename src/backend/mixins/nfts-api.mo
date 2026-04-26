import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import NftTypes "../types/nfts";
import CollectionTypes "../types/collections";
import CommonTypes "../types/common";
import NftLib "../lib/nfts";

mixin (
  accessControlState : AccessControl.AccessControlState,
  nfts : Map.Map<Text, NftTypes.NftRecord>,
  userCollections : Map.Map<Text, CollectionTypes.UserCollection>,
) {
  /// Add an NFT to a user-owned collection.
  public shared ({ caller }) func addNftToUserCollection(collectionId : Text, nft : NftTypes.NftInput) : async CommonTypes.Result<NftTypes.NftRecord> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user to mint NFTs");
    };
    // Resolve ownerAddress from the collection itself
    let ownerAddress : Text = switch (userCollections.get(collectionId)) {
      case null { return #err("Collection not found: " # collectionId) };
      case (?uc) { uc.ownerAddress };
    };
    NftLib.addNftToUserCollection(nfts, userCollections, collectionId, nft, ownerAddress);
  };

  /// List all NFTs owned by a Solana address.
  public query func getUserNfts(ownerAddress : Text) : async [NftTypes.NftRecord] {
    NftLib.getUserNfts(nfts, ownerAddress);
  };

  /// Fetch a single NFT record by mint address.
  public query func getNft(mintAddress : Text) : async ?NftTypes.NftRecord {
    NftLib.getNft(nfts, mintAddress);
  };
};
