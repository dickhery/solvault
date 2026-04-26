import { AuctionStatus } from "@/backend";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePhantom } from "@/contexts/phantom-context";
import {
  type Auction,
  type Listing,
  useActiveAuctions,
  useActiveListings,
  useAppConfig,
  useCompleteSale,
  useCreateAuction,
  useCreateListing,
  usePlaceBid,
  useSettleAuction,
} from "@/hooks/use-marketplace";
import {
  DEVNET_RPC_URL,
  formatSol,
  solToLamports,
  truncateAddress,
} from "@/lib/solana";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  Clock,
  Gavel,
  Loader2,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOption = "newest" | "price-asc" | "price-desc";
type TxStatus = "idle" | "signing" | "pending" | "confirmed" | "failed";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useCountdown(endsAtNs: bigint): string {
  const [remaining, setRemaining] = useState("");
  useEffect(() => {
    function update() {
      const endsAtMs = Number(endsAtNs) / 1_000_000;
      const diffMs = endsAtMs - Date.now();
      if (diffMs <= 0) {
        setRemaining("Ended");
        return;
      }
      const h = Math.floor(diffMs / 3_600_000);
      const m = Math.floor((diffMs % 3_600_000) / 60_000);
      const s = Math.floor((diffMs % 60_000) / 1_000);
      setRemaining(`${h}h ${m}m ${s}s`);
    }
    update();
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, [endsAtNs]);
  return remaining;
}

async function phantomSignAndSend(
  tx: Transaction,
  address: string,
): Promise<string> {
  const connection = new Connection(DEVNET_RPC_URL, "confirmed");
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = new PublicKey(address);

  const phantom = (
    window as Window & {
      solana?: {
        signAndSendTransaction: (
          tx: Transaction,
        ) => Promise<{ signature: string }>;
      };
    }
  ).solana;
  if (!phantom) throw new Error("Phantom not found");
  const { signature } = await phantom.signAndSendTransaction(tx);
  await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed",
  );
  return signature;
}

// ─── Transaction Status Badge ─────────────────────────────────────────────────

function TxStatusBadge({ status }: { status: TxStatus }) {
  if (status === "idle") return null;
  const map: Record<TxStatus, { label: string; cls: string }> = {
    idle: { label: "", cls: "" },
    signing: {
      label: "Waiting for signature…",
      cls: "bg-primary/10 text-primary border-primary/20",
    },
    pending: {
      label: "Broadcasting tx…",
      cls: "bg-accent/10 text-accent border-accent/20",
    },
    confirmed: {
      label: "Transaction confirmed ✓",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    failed: {
      label: "Transaction failed",
      cls: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };
  const { label, cls } = map[status];
  return (
    <Badge
      variant="outline"
      className={`text-xs font-mono ${cls}`}
      data-ocid="marketplace.tx_status"
    >
      {status === "signing" || status === "pending" ? (
        <Loader2 className="w-3 h-3 mr-1 animate-spin inline" />
      ) : null}
      {label}
    </Badge>
  );
}

// ─── Buy Modal ─────────────────────────────────────────────────────────────────

function BuyModal({
  listing,
  open,
  onOpenChange,
}: {
  listing: Listing | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { address } = usePhantom();
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const completeSale = useCompleteSale();

  async function handleBuy() {
    if (!listing || !address) return;
    try {
      setTxStatus("signing");
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(listing.sellerAddress),
          lamports: solToLamports(listing.priceSOL),
        }),
      );
      const sig = await phantomSignAndSend(tx, address);
      setTxStatus("pending");
      await completeSale.mutateAsync({
        listingId: listing.id,
        buyerAddress: address,
        txSignature: sig,
      });
      setTxStatus("confirmed");
      toast.success(`Purchased! TX: ${sig.slice(0, 8)}…`);
      setTimeout(() => {
        onOpenChange(false);
        setTxStatus("idle");
      }, 2000);
    } catch (err) {
      setTxStatus("failed");
      toast.error((err as Error).message ?? "Purchase failed");
    }
  }

  if (!listing) return null;
  const busy = txStatus === "signing" || txStatus === "pending";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Purchase"
      description="Review and confirm your purchase on Solana Devnet"
      data-ocid="marketplace.buy_dialog"
      size="md"
    >
      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
            <img
              src={`https://picsum.photos/seed/${listing.mintAddress}/80/80`}
              alt="NFT"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">
              {listing.mintAddress}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Seller: {truncateAddress(listing.sellerAddress)}
            </p>
            <p className="text-xl font-mono font-bold text-accent mt-2">
              ◎ {formatSol(listing.priceSOL, 4)} SOL
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">NFT price</span>
            <span className="font-mono text-foreground">
              ◎ {formatSol(listing.priceSOL, 4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network fee (est.)</span>
            <span className="font-mono text-muted-foreground">
              ~0.000005 SOL
            </span>
          </div>
        </div>

        {txStatus !== "idle" && (
          <div className="flex justify-center">
            <TxStatusBadge status={txStatus} />
          </div>
        )}

        {!address && (
          <p className="text-xs text-destructive text-center">
            Connect your Phantom wallet to purchase.
          </p>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            data-ocid="marketplace.buy_dialog.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleBuy}
            disabled={busy || !address}
            data-ocid="marketplace.buy_dialog.confirm_button"
          >
            {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {busy ? "Processing…" : "Confirm Purchase"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── List NFT Modal ────────────────────────────────────────────────────────────

function ListNftModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [mintAddress, setMintAddress] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("7");
  const createListing = useCreateListing();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createListing.mutateAsync({
        mintAddress,
        priceSOL: Number.parseFloat(price),
        durationDays: Number.parseInt(duration),
      });
      toast.success("NFT listed for sale!");
      onOpenChange(false);
      setMintAddress("");
      setPrice("");
      setDuration("7");
    } catch (err) {
      toast.error((err as Error).message ?? "Failed to create listing");
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="List NFT for Sale"
      description="Set a fixed price and duration for your listing"
      data-ocid="marketplace.list_modal"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>NFT Mint Address</Label>
          <Input
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            placeholder="Enter mint address…"
            required
            data-ocid="marketplace.list_modal.mint_input"
          />
        </div>
        <div className="space-y-2">
          <Label>Price (SOL)</Label>
          <Input
            type="number"
            min="0.001"
            step="0.001"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
            data-ocid="marketplace.list_modal.price_input"
          />
        </div>
        <div className="space-y-2">
          <Label>Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger data-ocid="marketplace.list_modal.duration_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 3, 7, 14, 30].map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} day{d > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            data-ocid="marketplace.list_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={createListing.isPending}
            data-ocid="marketplace.list_modal.submit_button"
          >
            {createListing.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create Listing
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Bid Modal ─────────────────────────────────────────────────────────────────

function BidModal({
  auction,
  open,
  onOpenChange,
}: {
  auction: Auction | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { address } = usePhantom();
  const { data: config } = useAppConfig();
  const [bidAmount, setBidAmount] = useState("");
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const placeBid = usePlaceBid();

  const currentBid = auction?.currentHighestBid ?? auction?.startPriceSOL ?? 0;
  const minBid = currentBid + 0.001;

  async function handleBid(e: React.FormEvent) {
    e.preventDefault();
    if (!auction || !address) return;
    const amount = Number.parseFloat(bidAmount);
    if (amount < minBid) {
      toast.error(`Bid must be at least ◎ ${formatSol(minBid, 3)} SOL`);
      return;
    }
    const escrow = config?.escrowWalletAddress ?? "";
    if (!escrow) {
      toast.error("Escrow address not configured");
      return;
    }
    try {
      setTxStatus("signing");
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(escrow),
          lamports: solToLamports(amount),
        }),
      );
      const sig = await phantomSignAndSend(tx, address);
      setTxStatus("pending");
      await placeBid.mutateAsync({
        auctionId: auction.id,
        bidAmountSOL: amount,
        bidderAddress: address,
        txSignature: sig,
      });
      setTxStatus("confirmed");
      toast.success(`Bid placed! ◎ ${formatSol(amount, 3)} SOL`);
      setTimeout(() => {
        onOpenChange(false);
        setTxStatus("idle");
        setBidAmount("");
      }, 2000);
    } catch (err) {
      setTxStatus("failed");
      toast.error((err as Error).message ?? "Bid failed");
    }
  }

  if (!auction) return null;
  const busy = txStatus === "signing" || txStatus === "pending";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Place a Bid"
      description="Your SOL will be sent to escrow until the auction ends"
      data-ocid="marketplace.bid_dialog"
      size="md"
    >
      <form onSubmit={handleBid} className="space-y-5">
        <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current highest bid</span>
            <span className="font-mono font-semibold text-accent">
              ◎ {formatSol(currentBid, 3)} SOL
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Min. increment</span>
            <span className="font-mono text-muted-foreground">0.001 SOL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Minimum bid</span>
            <span className="font-mono text-primary">
              ◎ {formatSol(minBid, 3)} SOL
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Your Bid (SOL)</Label>
          <Input
            type="number"
            min={minBid}
            step="0.001"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder={`Min ◎ ${formatSol(minBid, 3)}`}
            required
            data-ocid="marketplace.bid_dialog.bid_input"
          />
        </div>

        {txStatus !== "idle" && (
          <div className="flex justify-center">
            <TxStatusBadge status={txStatus} />
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            data-ocid="marketplace.bid_dialog.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={busy || !address}
            data-ocid="marketplace.bid_dialog.confirm_button"
          >
            {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {busy ? "Processing…" : `Bid ◎ ${bidAmount || minBid.toFixed(3)}`}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Create Auction Modal ─────────────────────────────────────────────────────

function CreateAuctionModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [mintAddress, setMintAddress] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [durationHours, setDurationHours] = useState("24");
  const createAuction = useCreateAuction();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createAuction.mutateAsync({
        mintAddress,
        startPriceSOL: Number.parseFloat(startPrice),
        reservePriceSOL: Number.parseFloat(reservePrice),
        durationHours: Number.parseInt(durationHours),
      });
      toast.success("Auction created!");
      onOpenChange(false);
      setMintAddress("");
      setStartPrice("");
      setReservePrice("");
      setDurationHours("24");
    } catch (err) {
      toast.error((err as Error).message ?? "Failed to create auction");
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Create Auction"
      description="Start a timed auction for your NFT"
      data-ocid="marketplace.create_auction_modal"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>NFT Mint Address</Label>
          <Input
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            placeholder="Enter mint address…"
            required
            data-ocid="marketplace.create_auction_modal.mint_input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Start Price (SOL)</Label>
            <Input
              type="number"
              min="0.001"
              step="0.001"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
              placeholder="0.00"
              required
              data-ocid="marketplace.create_auction_modal.start_price_input"
            />
          </div>
          <div className="space-y-2">
            <Label>Reserve Price (SOL)</Label>
            <Input
              type="number"
              min="0.001"
              step="0.001"
              value={reservePrice}
              onChange={(e) => setReservePrice(e.target.value)}
              placeholder="0.00"
              required
              data-ocid="marketplace.create_auction_modal.reserve_price_input"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Duration</Label>
          <Select value={durationHours} onValueChange={setDurationHours}>
            <SelectTrigger data-ocid="marketplace.create_auction_modal.duration_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[6, 12, 24, 48, 72, 168].map((h) => (
                <SelectItem key={h} value={String(h)}>
                  {h < 24
                    ? `${h} hours`
                    : `${h / 24} day${h / 24 > 1 ? "s" : ""}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            data-ocid="marketplace.create_auction_modal.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={createAuction.isPending}
            data-ocid="marketplace.create_auction_modal.submit_button"
          >
            {createAuction.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Start Auction
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// ─── Listing Card ──────────────────────────────────────────────────────────────

function ListingCard({
  listing,
  index,
  onBuy,
}: {
  listing: Listing;
  index: number;
  onBuy: (listing: Listing) => void;
}) {
  const { address } = usePhantom();
  const isOwner = address === listing.sellerAddress;

  return (
    <div
      className="nft-card group flex flex-col"
      data-ocid={`marketplace.listing.item.${index + 1}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <img
          src={`https://picsum.photos/seed/${listing.mintAddress}/400/400`}
          alt={listing.mintAddress}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant="outline"
            className="bg-card/80 border-border text-xs font-mono"
          >
            Fixed
          </Badge>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate font-mono">
            {truncateAddress(listing.mintAddress)}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            Seller: {truncateAddress(listing.sellerAddress)}
          </p>
        </div>
        <p className="text-lg font-mono font-bold text-accent">
          ◎ {formatSol(listing.priceSOL, 4)}
        </p>
        {!isOwner && (
          <Button
            size="sm"
            className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => onBuy(listing)}
            data-ocid={`marketplace.listing.buy_button.${index + 1}`}
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
            Buy Now
          </Button>
        )}
        {isOwner && (
          <Badge
            variant="outline"
            className="text-xs text-center justify-center border-primary/20 text-primary"
          >
            Your listing
          </Badge>
        )}
      </div>
    </div>
  );
}

// ─── Auction Card ──────────────────────────────────────────────────────────────

function AuctionCard({
  auction,
  index,
  onBid,
  onSettle,
}: {
  auction: Auction;
  index: number;
  onBid: (auction: Auction) => void;
  onSettle: (auction: Auction) => void;
}) {
  const { address } = usePhantom();
  const countdown = useCountdown(auction.endsAt);
  const currentBid = auction.currentHighestBid ?? auction.startPriceSOL;
  const isEnded =
    auction.status === AuctionStatus.ended || countdown === "Ended";
  const isSeller = address === auction.sellerAddress;
  const isWinner = address === auction.currentHighestBidder;

  return (
    <div
      className="nft-card group flex flex-col"
      data-ocid={`marketplace.auction.item.${index + 1}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <img
          src={`https://picsum.photos/seed/${auction.mintAddress}/400/400`}
          alt={auction.mintAddress}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant="outline"
            className={`text-xs font-mono ${isEnded ? "bg-muted/80 text-muted-foreground border-border" : "bg-primary/20 text-primary border-primary/30"}`}
          >
            {isEnded ? "Ended" : "Live"}
          </Badge>
        </div>
        {!isEnded && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-mono text-foreground">
            <Clock className="w-3 h-3 text-accent" />
            {countdown}
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate font-mono">
            {truncateAddress(auction.mintAddress)}
          </p>
          <p className="text-xs text-muted-foreground">
            {auction.bids.length} bid{auction.bids.length !== 1 ? "s" : ""}
            {auction.currentHighestBidder && (
              <span className="ml-2">
                Top: {truncateAddress(auction.currentHighestBidder)}
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Current Bid</p>
          <p className="text-lg font-mono font-bold text-accent">
            ◎ {formatSol(currentBid, 4)}
          </p>
        </div>

        {!isEnded && !isSeller && (
          <Button
            size="sm"
            className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => onBid(auction)}
            data-ocid={`marketplace.auction.bid_button.${index + 1}`}
          >
            <Gavel className="w-3.5 h-3.5 mr-1.5" />
            Place Bid
          </Button>
        )}

        {isEnded && isSeller && (
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-auto border-accent/30 text-accent hover:bg-accent/10"
            onClick={() => onSettle(auction)}
            data-ocid={`marketplace.auction.settle_button.${index + 1}`}
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
            Settle Auction
          </Button>
        )}

        {isEnded && isWinner && !isSeller && (
          <Badge
            variant="outline"
            className="text-xs text-center justify-center border-accent/30 text-accent"
          >
            🏆 You won!
          </Badge>
        )}

        {isSeller && !isEnded && (
          <Badge
            variant="outline"
            className="text-xs text-center justify-center border-primary/20 text-primary"
          >
            Your auction
          </Badge>
        )}
      </div>
    </div>
  );
}

// ─── Settle Auction Modal ─────────────────────────────────────────────────────

function SettleAuctionModal({
  auction,
  open,
  onOpenChange,
}: {
  auction: Auction | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { address } = usePhantom();
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const settleAuction = useSettleAuction();

  async function handleSettle() {
    if (!auction || !address) return;
    const winner = auction.currentHighestBidder;
    if (!winner) {
      toast.error("No bids to settle");
      return;
    }
    const winnerAmount = auction.currentHighestBid ?? 0;
    try {
      setTxStatus("signing");
      // Transfer winning amount from escrow is off-chain; we record the settlement
      // with a placeholder signature since funds are already in escrow
      setTxStatus("pending");
      await settleAuction.mutateAsync({
        auctionId: auction.id,
        winnerAddress: winner,
        paymentTxSignature: "escrow-settlement",
      });
      setTxStatus("confirmed");
      toast.success(`Auction settled! ◎ ${formatSol(winnerAmount, 4)} SOL`);
      setTimeout(() => {
        onOpenChange(false);
        setTxStatus("idle");
      }, 2000);
    } catch (err) {
      setTxStatus("failed");
      toast.error((err as Error).message ?? "Settlement failed");
    }
  }

  if (!auction) return null;
  const busy = txStatus === "signing" || txStatus === "pending";
  const winner = auction.currentHighestBidder;
  const winnerAmount = auction.currentHighestBid ?? 0;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Settle Auction"
      description="Finalize the auction and transfer the NFT to the winner"
      data-ocid="marketplace.settle_dialog"
      size="md"
    >
      <div className="space-y-5">
        {winner ? (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Winner</span>
              <span className="font-mono text-foreground">
                {truncateAddress(winner)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Winning bid</span>
              <span className="font-mono font-bold text-accent">
                ◎ {formatSol(winnerAmount, 4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total bids</span>
              <span className="font-mono text-foreground">
                {auction.bids.length}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No bids were placed on this auction.
          </p>
        )}

        {txStatus !== "idle" && (
          <div className="flex justify-center">
            <TxStatusBadge status={txStatus} />
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            data-ocid="marketplace.settle_dialog.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={handleSettle}
            disabled={busy || !winner}
            data-ocid="marketplace.settle_dialog.confirm_button"
          >
            {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {busy ? "Settling…" : "Confirm Settlement"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Fixed Price Tab ───────────────────────────────────────────────────────────

function FixedPriceTab() {
  const { data: listings, isLoading } = useActiveListings();
  const { address } = usePhantom();
  const [search, setSearch] = useState("");
  const [_collectionFilter, _setCollectionFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [buyTarget, setBuyTarget] = useState<Listing | null>(null);
  const [showListModal, setShowListModal] = useState(false);

  const filtered = useMemo(() => {
    let items = listings ?? [];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (l) =>
          l.mintAddress.toLowerCase().includes(q) ||
          l.sellerAddress.toLowerCase().includes(q),
      );
    }
    if (minPrice)
      items = items.filter((l) => l.priceSOL >= Number.parseFloat(minPrice));
    if (maxPrice)
      items = items.filter((l) => l.priceSOL <= Number.parseFloat(maxPrice));
    if (sort === "price-asc")
      items = [...items].sort((a, b) => a.priceSOL - b.priceSOL);
    else if (sort === "price-desc")
      items = [...items].sort((a, b) => b.priceSOL - a.priceSOL);
    else
      items = [...items].sort(
        (a, b) => Number(b.listedAt) - Number(a.listedAt),
      );
    return items;
  }, [listings, search, minPrice, maxPrice, sort]);

  return (
    <div className="space-y-5" data-ocid="marketplace.fixed_price_tab">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by mint or seller address…"
            className="pl-9 bg-card border-border"
            data-ocid="marketplace.listings.search_input"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min SOL"
            className="w-24 bg-card"
            data-ocid="marketplace.listings.min_price_input"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max SOL"
            className="w-24 bg-card"
            data-ocid="marketplace.listings.max_price_input"
          />
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger
              className="w-36 bg-card"
              data-ocid="marketplace.listings.sort_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {address && (
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 shrink-0"
            onClick={() => setShowListModal(true)}
            data-ocid="marketplace.list_nft_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            List NFT
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
      </p>

      {isLoading ? (
        <SkeletonGrid count={8} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Tag}
          title="No listings found"
          description={
            listings?.length === 0
              ? "Be the first to list an NFT for sale."
              : "Try adjusting your filters."
          }
          ctaLabel={address ? "List an NFT" : undefined}
          onCta={address ? () => setShowListModal(true) : undefined}
          data-ocid="marketplace.listings.empty_state"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((listing, i) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              index={i}
              onBuy={setBuyTarget}
            />
          ))}
        </div>
      )}

      <BuyModal
        listing={buyTarget}
        open={!!buyTarget}
        onOpenChange={(v) => {
          if (!v) setBuyTarget(null);
        }}
      />
      <ListNftModal open={showListModal} onOpenChange={setShowListModal} />
    </div>
  );
}

// ─── Auctions Tab ──────────────────────────────────────────────────────────────

function AuctionsTab() {
  const { data: auctions, isLoading } = useActiveAuctions();
  const { address } = usePhantom();
  const [search, setSearch] = useState("");
  const [bidTarget, setBidTarget] = useState<Auction | null>(null);
  const [settleTarget, setSettleTarget] = useState<Auction | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return auctions ?? [];
    const q = search.toLowerCase();
    return (auctions ?? []).filter(
      (a) =>
        a.mintAddress.toLowerCase().includes(q) ||
        a.sellerAddress.toLowerCase().includes(q),
    );
  }, [auctions, search]);

  return (
    <div className="space-y-5" data-ocid="marketplace.auctions_tab">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search auctions…"
            className="pl-9 bg-card border-border"
            data-ocid="marketplace.auctions.search_input"
          />
        </div>
        {address && (
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 shrink-0"
            onClick={() => setShowCreateModal(true)}
            data-ocid="marketplace.create_auction_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Auction
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} auction{filtered.length !== 1 ? "s" : ""}
      </p>

      {isLoading ? (
        <SkeletonGrid count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Gavel}
          title="No active auctions"
          description={
            auctions?.length === 0
              ? "Start the first auction on the platform."
              : "Try adjusting your search."
          }
          ctaLabel={address ? "Create Auction" : undefined}
          onCta={address ? () => setShowCreateModal(true) : undefined}
          data-ocid="marketplace.auctions.empty_state"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((auction, i) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              index={i}
              onBid={setBidTarget}
              onSettle={setSettleTarget}
            />
          ))}
        </div>
      )}

      <BidModal
        auction={bidTarget}
        open={!!bidTarget}
        onOpenChange={(v) => {
          if (!v) setBidTarget(null);
        }}
      />
      <SettleAuctionModal
        auction={settleTarget}
        open={!!settleTarget}
        onOpenChange={(v) => {
          if (!v) setSettleTarget(null);
        }}
      />
      <CreateAuctionModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
}

// ─── Marketplace Page ──────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const { isConnected, connect } = usePhantom();
  const [activeTab, setActiveTab] = useState<"fixed" | "auctions">("fixed");

  if (!isConnected) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
        data-ocid="marketplace.unauthenticated_state"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-xl font-display font-bold text-foreground">
            Connect to browse the marketplace
          </h2>
          <p className="text-sm text-muted-foreground">
            Connect your Phantom wallet to buy, sell, and bid on Solana NFTs.
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
          onClick={connect}
          data-ocid="marketplace.connect_wallet_button"
        >
          <Zap className="w-4 h-4 mr-2" />
          Connect Phantom Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="marketplace.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Marketplace
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Buy, sell, and bid on Solana NFTs — on-chain, no intermediaries
          </p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-muted/50 border border-border w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("fixed")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-smooth ${
              activeTab === "fixed"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="marketplace.fixed_price.tab"
          >
            <Tag className="w-3.5 h-3.5" />
            Fixed Price
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("auctions")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-smooth ${
              activeTab === "auctions"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="marketplace.auctions.tab"
          >
            <Gavel className="w-3.5 h-3.5" />
            Auctions
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "fixed" ? <FixedPriceTab /> : <AuctionsTab />}
    </div>
  );
}
