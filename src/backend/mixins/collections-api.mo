import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CollectionTypes "../types/collections";
import CommonTypes "../types/common";
import ConfigTypes "../types/config";
import UserTypes "../types/users";
import CollectionLib "../lib/collections";

mixin (
  accessControlState : AccessControl.AccessControlState,
  collections : Map.Map<Text, CollectionTypes.Collection>,
  userCollections : Map.Map<Text, CollectionTypes.UserCollection>,
  users : Map.Map<Text, UserTypes.UserProfile>,
  collectionIdCounter : { var next : Nat },
  userCollectionIdCounter : { var next : Nat },
  appConfig : { var value : ConfigTypes.AppConfig },
) {
  /// Admin: register an NFT collection (curated).
  public shared ({ caller }) func registerCollection(data : CollectionTypes.CollectionInput) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can register collections");
    };
    CollectionLib.registerCollection(collections, collectionIdCounter, data, caller.toText());
  };

  /// List all admin-registered collections.
  public query func getCollections() : async [CollectionTypes.Collection] {
    CollectionLib.getCollections(collections);
  };

  /// Admin: update collection metadata.
  public shared ({ caller }) func updateCollection(id : Text, data : CollectionTypes.CollectionInput) : async CommonTypes.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update collections");
    };
    CollectionLib.updateCollection(collections, id, data);
  };

  /// Admin: delete a registered collection.
  public shared ({ caller }) func deleteCollection(id : Text) : async CommonTypes.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete collections");
    };
    CollectionLib.deleteCollection(collections, id);
  };

  /// User: create own NFT collection (requires SOL fee tx).
  /// The ownerAddress is taken from data.mintAuthority (the Solana key the user controls).
  public shared ({ caller }) func createUserCollection(data : CollectionTypes.UserCollectionInput, txSignature : Text) : async CommonTypes.Result<CollectionTypes.UserCollection> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user to create a collection");
    };
    if (appConfig.value.collectionPaymentAddress.size() == 0) {
      Runtime.trap("Collection payment address is not configured");
    };
    let feeSOL = appConfig.value.collectionCreationFeeSOL;
    let ownerAddress = data.mintAuthority;
    CollectionLib.createUserCollection(userCollections, userCollectionIdCounter, data, ownerAddress, txSignature, feeSOL);
  };

  /// List all user-created collections by owner Solana address.
  public query func getUserCollections(ownerAddress : Text) : async [CollectionTypes.UserCollection] {
    CollectionLib.getUserCollections(userCollections, ownerAddress);
  };
};
