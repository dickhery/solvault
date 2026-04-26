import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Collection = {
    id : Text;
    name : Text;
    imageBlob : Storage.ExternalBlob;
    mintAddress : Text;
    metadataProgramAddress : Text;
    description : Text;
    createdAt : Common.Timestamp;
    createdBy : Text;
  };

  public type CollectionInput = {
    name : Text;
    imageBlob : Storage.ExternalBlob;
    mintAddress : Text;
    metadataProgramAddress : Text;
    description : Text;
  };

  public type UserCollection = {
    id : Text;
    name : Text;
    symbol : Text;
    description : Text;
    imageBlob : Storage.ExternalBlob;
    mintAuthority : Text;
    collectionMintAddress : Text;
    metadataUri : Text;
    ownerAddress : Text;
    mintCount : Nat;
    collectionFeeSOL : Float;
    createdAt : Common.Timestamp;
  };

  public type UserCollectionInput = {
    name : Text;
    symbol : Text;
    description : Text;
    imageBlob : Storage.ExternalBlob;
    mintAuthority : Text;
    collectionMintAddress : Text;
    metadataUri : Text;
  };
};
