import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MarketTypes "../types/marketplace";
import NftTypes "../types/nfts";
import CommonTypes "../types/common";
import MarketLib "../lib/marketplace";
import NftLib "../lib/nfts";

mixin (
  accessControlState : AccessControl.AccessControlState,
  listings : Map.Map<Text, MarketTypes.Listing>,
  auctions : Map.Map<Text, MarketTypes.Auction>,
  nfts : Map.Map<Text, NftTypes.NftRecord>,
  listingIdCounter : { var next : Nat },
  auctionIdCounter : { var next : Nat },
) {
  // ── Fixed-Price Listings ──────────────────────────────────────

  /// Create a fixed-price listing for an NFT.
  public shared ({ caller }) func createListing(mintAddress : Text, priceSOL : Float, durationDays : Nat) : async CommonTypes.Result<MarketTypes.Listing> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user to create listings");
    };
    // Verify NFT ownership
    let nft = switch (NftLib.getNft(nfts, mintAddress)) {
      case null { return #err("NFT not found: " # mintAddress) };
      case (?n) { n };
    };
    let sellerAddress = nft.ownerAddress;
    // Mark NFT as listed
    NftLib.updateListingStatus(nfts, mintAddress, #fixedPrice(listingIdCounter.next));
    let result = MarketLib.createListing(listings, listingIdCounter, mintAddress, priceSOL, durationDays, sellerAddress);
    result;
  };

  /// Cancel an active listing (seller only).
  public shared ({ caller }) func cancelListing(listingId : Text) : async CommonTypes.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    let listing = switch (listings.get(listingId)) {
      case null { return #err("Listing not found: " # listingId) };
      case (?l) { l };
    };
    let result = MarketLib.cancelListing(listings, listingId, listing.sellerAddress);
    switch (result) {
      case (#ok(())) {
        // Return NFT to unlisted
        NftLib.updateListingStatus(nfts, listing.mintAddress, #unlisted);
      };
      case _ {};
    };
    result;
  };

  /// Complete a sale (records buyer and tx).
  public shared ({ caller }) func completeSale(listingId : Text, buyerAddress : Text, txSignature : Text) : async CommonTypes.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    let listing = switch (listings.get(listingId)) {
      case null { return #err("Listing not found: " # listingId) };
      case (?l) { l };
    };
    let result = MarketLib.completeSale(listings, listingId, buyerAddress, txSignature);
    switch (result) {
      case (#ok(())) {
        // Transfer NFT ownership to buyer
        switch (NftLib.getNft(nfts, listing.mintAddress)) {
          case (?nft) {
            nfts.add(listing.mintAddress, { nft with ownerAddress = buyerAddress; listingStatus = #unlisted });
          };
          case null {};
        };
      };
      case _ {};
    };
    result;
  };

  /// List all listings with optional filter.
  public query func getListings(filter : ?MarketTypes.ListingFilter) : async [MarketTypes.Listing] {
    MarketLib.getListings(listings, filter);
  };

  // ── Auctions ─────────────────────────────────────────────────

  /// Create a timed auction for an NFT.
  public shared ({ caller }) func createAuction(mintAddress : Text, startPriceSOL : Float, reservePriceSOL : Float, durationHours : Nat) : async CommonTypes.Result<MarketTypes.Auction> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user to create auctions");
    };
    let nft = switch (NftLib.getNft(nfts, mintAddress)) {
      case null { return #err("NFT not found: " # mintAddress) };
      case (?n) { n };
    };
    let sellerAddress = nft.ownerAddress;
    let result = MarketLib.createAuction(auctions, auctionIdCounter, mintAddress, startPriceSOL, reservePriceSOL, durationHours, sellerAddress);
    switch (result) {
      case (#ok(auction)) {
        NftLib.updateListingStatus(nfts, mintAddress, #auction(auction.id));
      };
      case _ {};
    };
    result;
  };

  /// Place a bid on an active auction.
  public shared ({ caller }) func placeBid(auctionId : Text, bidAmountSOL : Float, bidderAddress : Text, txSignature : Text) : async CommonTypes.Result<MarketTypes.Bid> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user to place bids");
    };
    MarketLib.placeBid(auctions, auctionId, bidAmountSOL, bidderAddress, txSignature);
  };

  /// Settle an ended auction with the winner's payment tx.
  public shared ({ caller }) func settleAuction(auctionId : Text, winnerAddress : Text, paymentTxSignature : Text) : async CommonTypes.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    let auction = switch (auctions.get(auctionId)) {
      case null { return #err("Auction not found: " # auctionId) };
      case (?a) { a };
    };
    let result = MarketLib.settleAuction(auctions, auctionId, winnerAddress, paymentTxSignature);
    switch (result) {
      case (#ok(())) {
        // Transfer NFT to winner
        switch (NftLib.getNft(nfts, auction.mintAddress)) {
          case (?nft) {
            nfts.add(auction.mintAddress, { nft with ownerAddress = winnerAddress; listingStatus = #unlisted });
          };
          case null {};
        };
      };
      case _ {};
    };
    result;
  };

  /// Cancel an auction (seller only, no bids placed).
  public shared ({ caller }) func cancelAuction(auctionId : Text) : async CommonTypes.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    let auction = switch (auctions.get(auctionId)) {
      case null { return #err("Auction not found: " # auctionId) };
      case (?a) { a };
    };
    let result = MarketLib.cancelAuction(auctions, auctionId, auction.sellerAddress);
    switch (result) {
      case (#ok(())) {
        NftLib.updateListingStatus(nfts, auction.mintAddress, #unlisted);
      };
      case _ {};
    };
    result;
  };

  /// List auctions with optional filter.
  public query func getAuctions(filter : ?MarketTypes.AuctionFilter) : async [MarketTypes.Auction] {
    MarketLib.getAuctions(auctions, filter);
  };

  /// Fetch a single auction by ID.
  public query func getAuction(auctionId : Text) : async ?MarketTypes.Auction {
    MarketLib.getAuction(auctions, auctionId);
  };
};
