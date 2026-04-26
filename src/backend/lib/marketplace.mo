import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Text "mo:core/Text";
import MarketTypes "../types/marketplace";
import CommonTypes "../types/common";

module {
  public type Listing = MarketTypes.Listing;
  public type ListingFilter = MarketTypes.ListingFilter;
  public type Auction = MarketTypes.Auction;
  public type AuctionFilter = MarketTypes.AuctionFilter;
  public type Bid = MarketTypes.Bid;
  public type Result<T> = CommonTypes.Result<T>;

  public func createListing(
    listings : Map.Map<Text, Listing>,
    idCounter : { var next : Nat },
    mintAddress : Text,
    priceSOL : Float,
    durationDays : Nat,
    sellerAddress : Text,
  ) : Result<Listing> {
    let id = debug_show (idCounter.next);
    idCounter.next += 1;
    let now = Time.now();
    // durationDays * 86_400 seconds * 1_000_000_000 ns
    let durationNs : Int = durationDays * 86_400 * 1_000_000_000;
    let listing : Listing = {
      id;
      mintAddress;
      sellerAddress;
      priceSOL;
      listedAt = now;
      expiresAt = now + durationNs;
      status = #active;
    };
    listings.add(id, listing);
    #ok(listing);
  };

  public func cancelListing(
    listings : Map.Map<Text, Listing>,
    listingId : Text,
    callerAddress : Text,
  ) : Result<()> {
    switch (listings.get(listingId)) {
      case null { #err("Listing not found: " # listingId) };
      case (?listing) {
        if (listing.sellerAddress != callerAddress) {
          return #err("Only the seller can cancel this listing");
        };
        if (listing.status != #active) {
          return #err("Listing is not active");
        };
        listings.add(listingId, { listing with status = #cancelled });
        #ok(());
      };
    };
  };

  public func completeSale(
    listings : Map.Map<Text, Listing>,
    listingId : Text,
    _buyerAddress : Text,
    txSignature : Text,
  ) : Result<()> {
    if (txSignature.size() == 0) {
      return #err("txSignature must not be empty");
    };
    switch (listings.get(listingId)) {
      case null { #err("Listing not found: " # listingId) };
      case (?listing) {
        if (listing.status != #active) {
          return #err("Listing is not active");
        };
        listings.add(listingId, { listing with status = #sold });
        #ok(());
      };
    };
  };

  public func getListings(
    listings : Map.Map<Text, Listing>,
    filter : ?ListingFilter,
  ) : [Listing] {
    let all = Iter.toArray(listings.values());
    switch (filter) {
      case null { all };
      case (?f) {
        all.filter(func(l : Listing) : Bool {
          let statusMatch = switch (f.status) {
            case null { true };
            case (?s) { l.status == s };
          };
          let sellerMatch = switch (f.sellerAddress) {
            case null { true };
            case (?addr) { l.sellerAddress == addr };
          };
          let mintMatch = switch (f.mintAddress) {
            case null { true };
            case (?addr) { l.mintAddress == addr };
          };
          statusMatch and sellerMatch and mintMatch;
        });
      };
    };
  };

  public func createAuction(
    auctions : Map.Map<Text, Auction>,
    idCounter : { var next : Nat },
    mintAddress : Text,
    startPriceSOL : Float,
    reservePriceSOL : Float,
    durationHours : Nat,
    sellerAddress : Text,
  ) : Result<Auction> {
    let id = debug_show (idCounter.next);
    idCounter.next += 1;
    let now = Time.now();
    // durationHours * 3_600 seconds * 1_000_000_000 ns
    let durationNs : Int = durationHours * 3_600 * 1_000_000_000;
    let auction : Auction = {
      id;
      mintAddress;
      sellerAddress;
      startPriceSOL;
      reservePriceSOL;
      currentHighestBid = null;
      currentHighestBidder = null;
      startsAt = now;
      endsAt = now + durationNs;
      status = #active;
      bids = [];
    };
    auctions.add(id, auction);
    #ok(auction);
  };

  public func placeBid(
    auctions : Map.Map<Text, Auction>,
    auctionId : Text,
    bidAmountSOL : Float,
    bidderAddress : Text,
    txSignature : Text,
  ) : Result<Bid> {
    switch (auctions.get(auctionId)) {
      case null { #err("Auction not found: " # auctionId) };
      case (?auction) {
        if (auction.status != #active) {
          return #err("Auction is not active");
        };
        if (Time.now() >= auction.endsAt) {
          return #err("Auction has ended");
        };
        // Validate bid > currentHighestBid
        let minBid = switch (auction.currentHighestBid) {
          case null { auction.startPriceSOL };
          case (?highest) { highest };
        };
        if (bidAmountSOL <= minBid) {
          return #err("Bid must exceed current highest bid of " # debug_show(minBid) # " SOL");
        };
        let bid : Bid = {
          bidder = bidderAddress;
          amount = bidAmountSOL;
          txSignature;
          placedAt = Time.now();
        };
        let updatedBids = auction.bids.concat([bid]);
        let updated : Auction = {
          auction with
          currentHighestBid = ?bidAmountSOL;
          currentHighestBidder = ?bidderAddress;
          bids = updatedBids;
        };
        auctions.add(auctionId, updated);
        #ok(bid);
      };
    };
  };

  public func settleAuction(
    auctions : Map.Map<Text, Auction>,
    auctionId : Text,
    _winnerAddress : Text,
    paymentTxSignature : Text,
  ) : Result<()> {
    if (paymentTxSignature.size() == 0) {
      return #err("paymentTxSignature must not be empty");
    };
    switch (auctions.get(auctionId)) {
      case null { #err("Auction not found: " # auctionId) };
      case (?auction) {
        if (auction.status != #active and auction.status != #ended) {
          return #err("Auction cannot be settled in its current state");
        };
        auctions.add(auctionId, { auction with status = #settled });
        #ok(());
      };
    };
  };

  public func cancelAuction(
    auctions : Map.Map<Text, Auction>,
    auctionId : Text,
    callerAddress : Text,
  ) : Result<()> {
    switch (auctions.get(auctionId)) {
      case null { #err("Auction not found: " # auctionId) };
      case (?auction) {
        if (auction.sellerAddress != callerAddress) {
          return #err("Only the seller can cancel this auction");
        };
        if (auction.status != #active and auction.status != #pending) {
          return #err("Auction cannot be cancelled in its current state");
        };
        if (auction.bids.size() > 0) {
          return #err("Cannot cancel an auction that already has bids");
        };
        auctions.add(auctionId, { auction with status = #cancelled });
        #ok(());
      };
    };
  };

  public func getAuctions(
    auctions : Map.Map<Text, Auction>,
    filter : ?AuctionFilter,
  ) : [Auction] {
    let all = Iter.toArray(auctions.values());
    switch (filter) {
      case null { all };
      case (?f) {
        all.filter(func(a : Auction) : Bool {
          let statusMatch = switch (f.status) {
            case null { true };
            case (?s) { a.status == s };
          };
          let sellerMatch = switch (f.sellerAddress) {
            case null { true };
            case (?addr) { a.sellerAddress == addr };
          };
          let mintMatch = switch (f.mintAddress) {
            case null { true };
            case (?addr) { a.mintAddress == addr };
          };
          statusMatch and sellerMatch and mintMatch;
        });
      };
    };
  };

  public func getAuction(
    auctions : Map.Map<Text, Auction>,
    auctionId : Text,
  ) : ?Auction {
    auctions.get(auctionId);
  };
};
