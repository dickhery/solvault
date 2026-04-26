import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Role = { #admin; #user; #guest };

  public type Result<T> = { #ok : T; #err : Text };

  public type UserId = Text; // Solana wallet address (base58)

  public type Timestamp = Int; // nanoseconds since epoch (Time.now())

  public type CollectionId = Text;

  public type AuctionId = Text;

  public type ListingId = Text;

  public type ImageBlob = Storage.ExternalBlob;
};
