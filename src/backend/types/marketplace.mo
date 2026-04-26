import Common "common";

module {
  public type ListingStatus = { #active; #sold; #cancelled; #expired };

  public type Listing = {
    id : Text;
    mintAddress : Text;
    sellerAddress : Text;
    priceSOL : Float;
    listedAt : Common.Timestamp;
    expiresAt : Common.Timestamp;
    status : ListingStatus;
  };

  public type ListingFilter = {
    status : ?ListingStatus;
    sellerAddress : ?Text;
    mintAddress : ?Text;
  };

  public type Bid = {
    bidder : Text;
    amount : Float;
    txSignature : Text;
    placedAt : Common.Timestamp;
  };

  public type AuctionStatus = {
    #pending;
    #active;
    #ended;
    #settled;
    #cancelled;
  };

  public type Auction = {
    id : Text;
    mintAddress : Text;
    sellerAddress : Text;
    startPriceSOL : Float;
    reservePriceSOL : Float;
    currentHighestBid : ?Float;
    currentHighestBidder : ?Text;
    startsAt : Common.Timestamp;
    endsAt : Common.Timestamp;
    status : AuctionStatus;
    bids : [Bid];
  };

  public type AuctionFilter = {
    status : ?AuctionStatus;
    sellerAddress : ?Text;
    mintAddress : ?Text;
  };
};
