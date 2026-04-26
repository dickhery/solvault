import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ListingStatus = {
    #unlisted;
    #fixedPrice : Nat;
    #auction : Common.AuctionId;
  };

  public type NftRecord = {
    mintAddress : Text;
    name : Text;
    description : Text;
    imageBlob : Storage.ExternalBlob;
    collectionId : Text;
    ownerAddress : Text;
    attributes : [(Text, Text)];
    mintedAt : Common.Timestamp;
    listingStatus : ListingStatus;
  };

  public type NftInput = {
    mintAddress : Text;
    name : Text;
    description : Text;
    imageBlob : Storage.ExternalBlob;
    collectionId : Text;
    attributes : [(Text, Text)];
  };
};
