import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import NftTypes "../types/nfts";
import CollectionTypes "../types/collections";
import CommonTypes "../types/common";

module {
  public type NftRecord = NftTypes.NftRecord;
  public type NftInput = NftTypes.NftInput;
  public type Result<T> = CommonTypes.Result<T>;

  public func addNftToUserCollection(
    nfts : Map.Map<Text, NftRecord>,
    userCollections : Map.Map<Text, CollectionTypes.UserCollection>,
    collectionId : Text,
    nft : NftInput,
    ownerAddress : Text,
  ) : Result<NftRecord> {
    switch (userCollections.get(collectionId)) {
      case null { return #err("User collection not found: " # collectionId) };
      case (?uc) {
        if (uc.ownerAddress != ownerAddress) {
          return #err("Only the collection owner can mint NFTs into this collection");
        };
        // Bump mintCount
        userCollections.add(collectionId, { uc with mintCount = uc.mintCount + 1 });
      };
    };

    let record : NftRecord = {
      mintAddress = nft.mintAddress;
      name = nft.name;
      description = nft.description;
      imageBlob = nft.imageBlob;
      collectionId = nft.collectionId;
      ownerAddress;
      attributes = nft.attributes;
      mintedAt = Time.now();
      listingStatus = #unlisted;
    };
    nfts.add(nft.mintAddress, record);
    #ok(record);
  };

  public func getUserNfts(
    nfts : Map.Map<Text, NftRecord>,
    ownerAddress : Text,
  ) : [NftRecord] {
    let all = Iter.toArray(nfts.values());
    all.filter(func(n : NftRecord) : Bool {
      n.ownerAddress == ownerAddress
    });
  };

  public func getNft(
    nfts : Map.Map<Text, NftRecord>,
    mintAddress : Text,
  ) : ?NftRecord {
    nfts.get(mintAddress);
  };

  public func updateListingStatus(
    nfts : Map.Map<Text, NftRecord>,
    mintAddress : Text,
    status : NftTypes.ListingStatus,
  ) {
    switch (nfts.get(mintAddress)) {
      case (?nft) {
        nfts.add(mintAddress, { nft with listingStatus = status });
      };
      case null {};
    };
  };
};
