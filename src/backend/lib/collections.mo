import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import CollectionTypes "../types/collections";
import CommonTypes "../types/common";

module {
  public type Collection = CollectionTypes.Collection;
  public type CollectionInput = CollectionTypes.CollectionInput;
  public type UserCollection = CollectionTypes.UserCollection;
  public type UserCollectionInput = CollectionTypes.UserCollectionInput;
  public type Result<T> = CommonTypes.Result<T>;

  public func registerCollection(
    collections : Map.Map<Text, Collection>,
    idCounter : { var next : Nat },
    data : CollectionInput,
    createdBy : Text,
  ) : Text {
    let id = debug_show (idCounter.next);
    idCounter.next += 1;
    let collection : Collection = {
      id;
      name = data.name;
      imageBlob = data.imageBlob;
      mintAddress = data.mintAddress;
      metadataProgramAddress = data.metadataProgramAddress;
      description = data.description;
      createdAt = Time.now();
      createdBy;
    };
    collections.add(id, collection);
    id;
  };

  public func getCollections(
    collections : Map.Map<Text, Collection>,
  ) : [Collection] {
    collections.values().toArray();
  };

  public func updateCollection(
    collections : Map.Map<Text, Collection>,
    id : Text,
    data : CollectionInput,
  ) : Result<()> {
    switch (collections.get(id)) {
      case (?existing) {
        let updated : Collection = {
          existing with
          name = data.name;
          imageBlob = data.imageBlob;
          mintAddress = data.mintAddress;
          metadataProgramAddress = data.metadataProgramAddress;
          description = data.description;
        };
        collections.add(id, updated);
        #ok(());
      };
      case null { #err("Collection not found: " # id) };
    };
  };

  public func deleteCollection(
    collections : Map.Map<Text, Collection>,
    id : Text,
  ) : Result<()> {
    if (collections.containsKey(id)) {
      collections.remove(id);
      #ok(());
    } else {
      #err("Collection not found: " # id);
    };
  };

  public func createUserCollection(
    userCollections : Map.Map<Text, UserCollection>,
    idCounter : { var next : Nat },
    data : UserCollectionInput,
    ownerAddress : Text,
    txSignature : Text,
    feeSOL : Float,
  ) : Result<UserCollection> {
    if (txSignature.size() == 0) {
      return #err("txSignature must not be empty — SOL fee payment is required");
    };
    let id = debug_show (idCounter.next);
    idCounter.next += 1;
    let uc : UserCollection = {
      id;
      name = data.name;
      symbol = data.symbol;
      description = data.description;
      imageBlob = data.imageBlob;
      mintAuthority = data.mintAuthority;
      collectionMintAddress = data.collectionMintAddress;
      metadataUri = data.metadataUri;
      ownerAddress;
      mintCount = 0;
      collectionFeeSOL = feeSOL;
      createdAt = Time.now();
    };
    userCollections.add(id, uc);
    #ok(uc);
  };

  public func getUserCollections(
    userCollections : Map.Map<Text, UserCollection>,
    ownerAddress : Text,
  ) : [UserCollection] {
    let all = userCollections.values().toArray();
    all.filter(func(uc : UserCollection) : Bool {
      uc.ownerAddress == ownerAddress
    });
  };
};
