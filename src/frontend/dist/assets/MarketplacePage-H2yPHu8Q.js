import { c as createLucideIcon, u as useQuery, k as useQueryClient, m as useMutation, n as getBackendMutationActor, g as getBackendQueryActor, d as usePhantom, r as reactExports, j as jsxRuntimeExports, B as Button, Z as Zap, i as SkeletonGrid, a as Badge, t as truncateAddress, o as formatSol, p as LoaderCircle, A as AuctionStatus, T as Transaction, q as SystemProgram, v as solToLamports, P as PublicKey, w as ue, C as Connection, D as DEVNET_RPC_URL } from "./index-BagE81i5.js";
import { E as EmptyState } from "./EmptyState-DQo6QAh7.js";
import { P as Plus, M as Modal } from "./Modal-Da6I10ss.js";
import { I as Input, L as Label } from "./label-EU6hexfy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DIBEVs0m.js";
import { T as Tag } from "./tag-eNOuhGrc.js";
import { S as Search } from "./search-DdIbbjWb.js";
import { T as TrendingUp } from "./trending-up-CE6Zfqr_.js";
import "./index-B-nK2-Oc.js";
import "./check-CsfXS3YC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8", key: "15492f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m9 7 8 8", key: "5jnvq1" }],
  ["path", { d: "m21 11-8-8", key: "z4y7zo" }]
];
const Gavel = createLucideIcon("gavel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function useListings(filter) {
  return useQuery({
    queryKey: ["listings", filter],
    queryFn: async () => {
      const actor = getBackendQueryActor();
      if (!actor) return [];
      return actor.getListings(filter ?? null);
    },
    staleTime: 1e4
  });
}
function useActiveListings() {
  return useListings({
    status: { active: null }
  });
}
function useCreateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      mintAddress,
      priceSOL,
      durationDays
    }) => {
      const actor = getBackendMutationActor();
      const result = await actor.createListing(
        mintAddress,
        priceSOL,
        BigInt(durationDays)
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
    }
  });
}
function useCompleteSale() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      listingId,
      buyerAddress,
      txSignature
    }) => {
      const actor = getBackendMutationActor();
      const result = await actor.completeSale(
        listingId,
        buyerAddress,
        txSignature
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
    }
  });
}
function useAuctions(filter) {
  return useQuery({
    queryKey: ["auctions", filter],
    queryFn: async () => {
      const actor = getBackendQueryActor();
      if (!actor) return [];
      return actor.getAuctions(filter ?? null);
    },
    staleTime: 5e3,
    refetchInterval: 5e3
  });
}
function useActiveAuctions() {
  return useAuctions({ status: { active: null } });
}
function usePlaceBid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      auctionId,
      bidAmountSOL,
      bidderAddress,
      txSignature
    }) => {
      const actor = getBackendMutationActor();
      const result = await actor.placeBid(
        auctionId,
        bidAmountSOL,
        bidderAddress,
        txSignature
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, { auctionId }) => {
      qc.invalidateQueries({ queryKey: ["auctions"] });
      qc.invalidateQueries({ queryKey: ["auction", auctionId] });
    }
  });
}
function useSettleAuction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      auctionId,
      winnerAddress,
      paymentTxSignature
    }) => {
      const actor = getBackendMutationActor();
      const result = await actor.settleAuction(
        auctionId,
        winnerAddress,
        paymentTxSignature
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auctions"] });
    }
  });
}
function useCreateAuction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      mintAddress,
      startPriceSOL,
      reservePriceSOL,
      durationHours
    }) => {
      const actor = getBackendMutationActor();
      const result = await actor.createAuction(
        mintAddress,
        startPriceSOL,
        reservePriceSOL,
        BigInt(durationHours)
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auctions"] });
    }
  });
}
function useAppConfig() {
  return useQuery({
    queryKey: ["appConfig"],
    queryFn: async () => {
      const actor = getBackendQueryActor();
      if (!actor) return null;
      return actor.getConfig();
    },
    staleTime: 6e4
  });
}
function useCountdown(endsAtNs) {
  const [remaining, setRemaining] = reactExports.useState("");
  reactExports.useEffect(() => {
    function update() {
      const endsAtMs = Number(endsAtNs) / 1e6;
      const diffMs = endsAtMs - Date.now();
      if (diffMs <= 0) {
        setRemaining("Ended");
        return;
      }
      const h = Math.floor(diffMs / 36e5);
      const m = Math.floor(diffMs % 36e5 / 6e4);
      const s = Math.floor(diffMs % 6e4 / 1e3);
      setRemaining(`${h}h ${m}m ${s}s`);
    }
    update();
    const id = setInterval(update, 1e3);
    return () => clearInterval(id);
  }, [endsAtNs]);
  return remaining;
}
async function phantomSignAndSend(tx, address) {
  const connection = new Connection(DEVNET_RPC_URL, "confirmed");
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = new PublicKey(address);
  const phantom = window.solana;
  if (!phantom) throw new Error("Phantom not found");
  const { signature } = await phantom.signAndSendTransaction(tx);
  await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  );
  return signature;
}
function TxStatusBadge({ status }) {
  if (status === "idle") return null;
  const map = {
    idle: { label: "", cls: "" },
    signing: {
      label: "Waiting for signature…",
      cls: "bg-primary/10 text-primary border-primary/20"
    },
    pending: {
      label: "Broadcasting tx…",
      cls: "bg-accent/10 text-accent border-accent/20"
    },
    confirmed: {
      label: "Transaction confirmed ✓",
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    failed: {
      label: "Transaction failed",
      cls: "bg-destructive/10 text-destructive border-destructive/20"
    }
  };
  const { label, cls } = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: `text-xs font-mono ${cls}`,
      "data-ocid": "marketplace.tx_status",
      children: [
        status === "signing" || status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 mr-1 animate-spin inline" }) : null,
        label
      ]
    }
  );
}
function BuyModal({
  listing,
  open,
  onOpenChange
}) {
  const { address } = usePhantom();
  const [txStatus, setTxStatus] = reactExports.useState("idle");
  const completeSale = useCompleteSale();
  async function handleBuy() {
    if (!listing || !address) return;
    try {
      setTxStatus("signing");
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(listing.sellerAddress),
          lamports: solToLamports(listing.priceSOL)
        })
      );
      const sig = await phantomSignAndSend(tx, address);
      setTxStatus("pending");
      await completeSale.mutateAsync({
        listingId: listing.id,
        buyerAddress: address,
        txSignature: sig
      });
      setTxStatus("confirmed");
      ue.success(`Purchased! TX: ${sig.slice(0, 8)}…`);
      setTimeout(() => {
        onOpenChange(false);
        setTxStatus("idle");
      }, 2e3);
    } catch (err) {
      setTxStatus("failed");
      ue.error(err.message ?? "Purchase failed");
    }
  }
  if (!listing) return null;
  const busy = txStatus === "signing" || txStatus === "pending";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onOpenChange,
      title: "Confirm Purchase",
      description: "Review and confirm your purchase on Solana Devnet",
      "data-ocid": "marketplace.buy_dialog",
      size: "md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `https://picsum.photos/seed/${listing.mintAddress}/80/80`,
              alt: "NFT",
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: listing.mintAddress }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Seller: ",
              truncateAddress(listing.sellerAddress)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-mono font-bold text-accent mt-2", children: [
              "◎ ",
              formatSol(listing.priceSOL, 4),
              " SOL"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-3 space-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "NFT price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              "◎ ",
              formatSol(listing.priceSOL, 4)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Network fee (est.)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: "~0.000005 SOL" })
          ] })
        ] }),
        txStatus !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TxStatusBadge, { status: txStatus }) }),
        !address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive text-center", children: "Connect your Phantom wallet to purchase." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => onOpenChange(false),
              disabled: busy,
              "data-ocid": "marketplace.buy_dialog.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground",
              onClick: handleBuy,
              disabled: busy || !address,
              "data-ocid": "marketplace.buy_dialog.confirm_button",
              children: [
                busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                busy ? "Processing…" : "Confirm Purchase"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ListNftModal({
  open,
  onOpenChange
}) {
  const [mintAddress, setMintAddress] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("7");
  const createListing = useCreateListing();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createListing.mutateAsync({
        mintAddress,
        priceSOL: Number.parseFloat(price),
        durationDays: Number.parseInt(duration)
      });
      ue.success("NFT listed for sale!");
      onOpenChange(false);
      setMintAddress("");
      setPrice("");
      setDuration("7");
    } catch (err) {
      ue.error(err.message ?? "Failed to create listing");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onOpenChange,
      title: "List NFT for Sale",
      description: "Set a fixed price and duration for your listing",
      "data-ocid": "marketplace.list_modal",
      size: "md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "NFT Mint Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: mintAddress,
              onChange: (e) => setMintAddress(e.target.value),
              placeholder: "Enter mint address…",
              required: true,
              "data-ocid": "marketplace.list_modal.mint_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (SOL)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0.001",
              step: "0.001",
              value: price,
              onChange: (e) => setPrice(e.target.value),
              placeholder: "0.00",
              required: true,
              "data-ocid": "marketplace.list_modal.price_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: duration, onValueChange: setDuration, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "marketplace.list_modal.duration_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [1, 3, 7, 14, 30].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(d), children: [
              d,
              " day",
              d > 1 ? "s" : ""
            ] }, d)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: () => onOpenChange(false),
              "data-ocid": "marketplace.list_modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "flex-1 bg-primary hover:bg-primary/90",
              disabled: createListing.isPending,
              "data-ocid": "marketplace.list_modal.submit_button",
              children: [
                createListing.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                "Create Listing"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function BidModal({
  auction,
  open,
  onOpenChange
}) {
  const { address } = usePhantom();
  const { data: config } = useAppConfig();
  const [bidAmount, setBidAmount] = reactExports.useState("");
  const [txStatus, setTxStatus] = reactExports.useState("idle");
  const placeBid = usePlaceBid();
  const currentBid = (auction == null ? void 0 : auction.currentHighestBid) ?? (auction == null ? void 0 : auction.startPriceSOL) ?? 0;
  const minBid = currentBid + 1e-3;
  async function handleBid(e) {
    e.preventDefault();
    if (!auction || !address) return;
    const amount = Number.parseFloat(bidAmount);
    if (amount < minBid) {
      ue.error(`Bid must be at least ◎ ${formatSol(minBid, 3)} SOL`);
      return;
    }
    const escrow = (config == null ? void 0 : config.escrowWalletAddress) ?? "";
    if (!escrow) {
      ue.error("Escrow address not configured");
      return;
    }
    try {
      setTxStatus("signing");
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(escrow),
          lamports: solToLamports(amount)
        })
      );
      const sig = await phantomSignAndSend(tx, address);
      setTxStatus("pending");
      await placeBid.mutateAsync({
        auctionId: auction.id,
        bidAmountSOL: amount,
        bidderAddress: address,
        txSignature: sig
      });
      setTxStatus("confirmed");
      ue.success(`Bid placed! ◎ ${formatSol(amount, 3)} SOL`);
      setTimeout(() => {
        onOpenChange(false);
        setTxStatus("idle");
        setBidAmount("");
      }, 2e3);
    } catch (err) {
      setTxStatus("failed");
      ue.error(err.message ?? "Bid failed");
    }
  }
  if (!auction) return null;
  const busy = txStatus === "signing" || txStatus === "pending";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onOpenChange,
      title: "Place a Bid",
      description: "Your SOL will be sent to escrow until the auction ends",
      "data-ocid": "marketplace.bid_dialog",
      size: "md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleBid, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-3 space-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Current highest bid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-accent", children: [
              "◎ ",
              formatSol(currentBid, 3),
              " SOL"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Min. increment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: "0.001 SOL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Minimum bid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary", children: [
              "◎ ",
              formatSol(minBid, 3),
              " SOL"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Your Bid (SOL)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: minBid,
              step: "0.001",
              value: bidAmount,
              onChange: (e) => setBidAmount(e.target.value),
              placeholder: `Min ◎ ${formatSol(minBid, 3)}`,
              required: true,
              "data-ocid": "marketplace.bid_dialog.bid_input"
            }
          )
        ] }),
        txStatus !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TxStatusBadge, { status: txStatus }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: () => onOpenChange(false),
              disabled: busy,
              "data-ocid": "marketplace.bid_dialog.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "flex-1 bg-primary hover:bg-primary/90",
              disabled: busy || !address,
              "data-ocid": "marketplace.bid_dialog.confirm_button",
              children: [
                busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                busy ? "Processing…" : `Bid ◎ ${bidAmount || minBid.toFixed(3)}`
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function CreateAuctionModal({
  open,
  onOpenChange
}) {
  const [mintAddress, setMintAddress] = reactExports.useState("");
  const [startPrice, setStartPrice] = reactExports.useState("");
  const [reservePrice, setReservePrice] = reactExports.useState("");
  const [durationHours, setDurationHours] = reactExports.useState("24");
  const createAuction = useCreateAuction();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createAuction.mutateAsync({
        mintAddress,
        startPriceSOL: Number.parseFloat(startPrice),
        reservePriceSOL: Number.parseFloat(reservePrice),
        durationHours: Number.parseInt(durationHours)
      });
      ue.success("Auction created!");
      onOpenChange(false);
      setMintAddress("");
      setStartPrice("");
      setReservePrice("");
      setDurationHours("24");
    } catch (err) {
      ue.error(err.message ?? "Failed to create auction");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onOpenChange,
      title: "Create Auction",
      description: "Start a timed auction for your NFT",
      "data-ocid": "marketplace.create_auction_modal",
      size: "md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "NFT Mint Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: mintAddress,
              onChange: (e) => setMintAddress(e.target.value),
              placeholder: "Enter mint address…",
              required: true,
              "data-ocid": "marketplace.create_auction_modal.mint_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Price (SOL)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0.001",
                step: "0.001",
                value: startPrice,
                onChange: (e) => setStartPrice(e.target.value),
                placeholder: "0.00",
                required: true,
                "data-ocid": "marketplace.create_auction_modal.start_price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Reserve Price (SOL)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0.001",
                step: "0.001",
                value: reservePrice,
                onChange: (e) => setReservePrice(e.target.value),
                placeholder: "0.00",
                required: true,
                "data-ocid": "marketplace.create_auction_modal.reserve_price_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: durationHours, onValueChange: setDurationHours, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "marketplace.create_auction_modal.duration_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [6, 12, 24, 48, 72, 168].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(h), children: h < 24 ? `${h} hours` : `${h / 24} day${h / 24 > 1 ? "s" : ""}` }, h)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: () => onOpenChange(false),
              "data-ocid": "marketplace.create_auction_modal.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "flex-1 bg-primary hover:bg-primary/90",
              disabled: createAuction.isPending,
              "data-ocid": "marketplace.create_auction_modal.submit_button",
              children: [
                createAuction.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                "Start Auction"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function ListingCard({
  listing,
  index,
  onBuy
}) {
  const { address } = usePhantom();
  const isOwner = address === listing.sellerAddress;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "nft-card group flex flex-col",
      "data-ocid": `marketplace.listing.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-t-lg bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `https://picsum.photos/seed/${listing.mintAddress}/400/400`,
              alt: listing.mintAddress,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "bg-card/80 border-border text-xs font-mono",
              children: "Fixed"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate font-mono", children: truncateAddress(listing.mintAddress) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              "Seller: ",
              truncateAddress(listing.sellerAddress)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-mono font-bold text-accent", children: [
            "◎ ",
            formatSol(listing.priceSOL, 4)
          ] }),
          !isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground",
              onClick: () => onBuy(listing),
              "data-ocid": `marketplace.listing.buy_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Buy Now"
              ]
            }
          ),
          isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs text-center justify-center border-primary/20 text-primary",
              children: "Your listing"
            }
          )
        ] })
      ]
    }
  );
}
function AuctionCard({
  auction,
  index,
  onBid,
  onSettle
}) {
  const { address } = usePhantom();
  const countdown = useCountdown(auction.endsAt);
  const currentBid = auction.currentHighestBid ?? auction.startPriceSOL;
  const isEnded = auction.status === AuctionStatus.ended || countdown === "Ended";
  const isSeller = address === auction.sellerAddress;
  const isWinner = address === auction.currentHighestBidder;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "nft-card group flex flex-col",
      "data-ocid": `marketplace.auction.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-t-lg bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `https://picsum.photos/seed/${auction.mintAddress}/400/400`,
              alt: auction.mintAddress,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: `text-xs font-mono ${isEnded ? "bg-muted/80 text-muted-foreground border-border" : "bg-primary/20 text-primary border-primary/30"}`,
              children: isEnded ? "Ended" : "Live"
            }
          ) }),
          !isEnded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-mono text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-accent" }),
            countdown
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate font-mono", children: truncateAddress(auction.mintAddress) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              auction.bids.length,
              " bid",
              auction.bids.length !== 1 ? "s" : "",
              auction.currentHighestBidder && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
                "Top: ",
                truncateAddress(auction.currentHighestBidder)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Bid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-mono font-bold text-accent", children: [
              "◎ ",
              formatSol(currentBid, 4)
            ] })
          ] }),
          !isEnded && !isSeller && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground",
              onClick: () => onBid(auction),
              "data-ocid": `marketplace.auction.bid_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Place Bid"
              ]
            }
          ),
          isEnded && isSeller && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "w-full mt-auto border-accent/30 text-accent hover:bg-accent/10",
              onClick: () => onSettle(auction),
              "data-ocid": `marketplace.auction.settle_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Settle Auction"
              ]
            }
          ),
          isEnded && isWinner && !isSeller && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs text-center justify-center border-accent/30 text-accent",
              children: "🏆 You won!"
            }
          ),
          isSeller && !isEnded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs text-center justify-center border-primary/20 text-primary",
              children: "Your auction"
            }
          )
        ] })
      ]
    }
  );
}
function SettleAuctionModal({
  auction,
  open,
  onOpenChange
}) {
  const { address } = usePhantom();
  const [txStatus, setTxStatus] = reactExports.useState("idle");
  const settleAuction = useSettleAuction();
  async function handleSettle() {
    if (!auction || !address) return;
    const winner2 = auction.currentHighestBidder;
    if (!winner2) {
      ue.error("No bids to settle");
      return;
    }
    const winnerAmount2 = auction.currentHighestBid ?? 0;
    try {
      setTxStatus("signing");
      setTxStatus("pending");
      await settleAuction.mutateAsync({
        auctionId: auction.id,
        winnerAddress: winner2,
        paymentTxSignature: "escrow-settlement"
      });
      setTxStatus("confirmed");
      ue.success(`Auction settled! ◎ ${formatSol(winnerAmount2, 4)} SOL`);
      setTimeout(() => {
        onOpenChange(false);
        setTxStatus("idle");
      }, 2e3);
    } catch (err) {
      setTxStatus("failed");
      ue.error(err.message ?? "Settlement failed");
    }
  }
  if (!auction) return null;
  const busy = txStatus === "signing" || txStatus === "pending";
  const winner = auction.currentHighestBidder;
  const winnerAmount = auction.currentHighestBid ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onOpenChange,
      title: "Settle Auction",
      description: "Finalize the auction and transfer the NFT to the winner",
      "data-ocid": "marketplace.settle_dialog",
      size: "md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        winner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Winner" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: truncateAddress(winner) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Winning bid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-accent", children: [
              "◎ ",
              formatSol(winnerAmount, 4)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total bids" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: auction.bids.length })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No bids were placed on this auction." }),
        txStatus !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TxStatusBadge, { status: txStatus }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1",
              onClick: () => onOpenChange(false),
              disabled: busy,
              "data-ocid": "marketplace.settle_dialog.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 bg-primary hover:bg-primary/90",
              onClick: handleSettle,
              disabled: busy || !winner,
              "data-ocid": "marketplace.settle_dialog.confirm_button",
              children: [
                busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                busy ? "Settling…" : "Confirm Settlement"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function FixedPriceTab() {
  const { data: listings, isLoading } = useActiveListings();
  const { address } = usePhantom();
  const [search, setSearch] = reactExports.useState("");
  const [_collectionFilter, _setCollectionFilter] = reactExports.useState("all");
  const [minPrice, setMinPrice] = reactExports.useState("");
  const [maxPrice, setMaxPrice] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("newest");
  const [buyTarget, setBuyTarget] = reactExports.useState(null);
  const [showListModal, setShowListModal] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    let items = listings ?? [];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (l) => l.mintAddress.toLowerCase().includes(q) || l.sellerAddress.toLowerCase().includes(q)
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
        (a, b) => Number(b.listedAt) - Number(a.listedAt)
      );
    return items;
  }, [listings, search, minPrice, maxPrice, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "marketplace.fixed_price_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by mint or seller address…",
            className: "pl-9 bg-card border-border",
            "data-ocid": "marketplace.listings.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: minPrice,
            onChange: (e) => setMinPrice(e.target.value),
            placeholder: "Min SOL",
            className: "w-24 bg-card",
            "data-ocid": "marketplace.listings.min_price_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: maxPrice,
            onChange: (e) => setMaxPrice(e.target.value),
            placeholder: "Max SOL",
            className: "w-24 bg-card",
            "data-ocid": "marketplace.listings.max_price_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-36 bg-card",
              "data-ocid": "marketplace.listings.sort_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-asc", children: "Price: Low → High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-desc", children: "Price: High → Low" })
          ] })
        ] })
      ] }),
      address && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "border-primary/30 text-primary hover:bg-primary/10 shrink-0",
          onClick: () => setShowListModal(true),
          "data-ocid": "marketplace.list_nft_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
            "List NFT"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      filtered.length,
      " listing",
      filtered.length !== 1 ? "s" : ""
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 8 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Tag,
        title: "No listings found",
        description: (listings == null ? void 0 : listings.length) === 0 ? "Be the first to list an NFT for sale." : "Try adjusting your filters.",
        ctaLabel: address ? "List an NFT" : void 0,
        onCta: address ? () => setShowListModal(true) : void 0,
        "data-ocid": "marketplace.listings.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: filtered.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ListingCard,
      {
        listing,
        index: i,
        onBuy: setBuyTarget
      },
      listing.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BuyModal,
      {
        listing: buyTarget,
        open: !!buyTarget,
        onOpenChange: (v) => {
          if (!v) setBuyTarget(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListNftModal, { open: showListModal, onOpenChange: setShowListModal })
  ] });
}
function AuctionsTab() {
  const { data: auctions, isLoading } = useActiveAuctions();
  const { address } = usePhantom();
  const [search, setSearch] = reactExports.useState("");
  const [bidTarget, setBidTarget] = reactExports.useState(null);
  const [settleTarget, setSettleTarget] = reactExports.useState(null);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    if (!search) return auctions ?? [];
    const q = search.toLowerCase();
    return (auctions ?? []).filter(
      (a) => a.mintAddress.toLowerCase().includes(q) || a.sellerAddress.toLowerCase().includes(q)
    );
  }, [auctions, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "marketplace.auctions_tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search auctions…",
            className: "pl-9 bg-card border-border",
            "data-ocid": "marketplace.auctions.search_input"
          }
        )
      ] }),
      address && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "border-primary/30 text-primary hover:bg-primary/10 shrink-0",
          onClick: () => setShowCreateModal(true),
          "data-ocid": "marketplace.create_auction_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
            "Create Auction"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      filtered.length,
      " auction",
      filtered.length !== 1 ? "s" : ""
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 6 }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Gavel,
        title: "No active auctions",
        description: (auctions == null ? void 0 : auctions.length) === 0 ? "Start the first auction on the platform." : "Try adjusting your search.",
        ctaLabel: address ? "Create Auction" : void 0,
        onCta: address ? () => setShowCreateModal(true) : void 0,
        "data-ocid": "marketplace.auctions.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: filtered.map((auction, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AuctionCard,
      {
        auction,
        index: i,
        onBid: setBidTarget,
        onSettle: setSettleTarget
      },
      auction.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BidModal,
      {
        auction: bidTarget,
        open: !!bidTarget,
        onOpenChange: (v) => {
          if (!v) setBidTarget(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettleAuctionModal,
      {
        auction: settleTarget,
        open: !!settleTarget,
        onOpenChange: (v) => {
          if (!v) setSettleTarget(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateAuctionModal,
      {
        open: showCreateModal,
        onOpenChange: setShowCreateModal
      }
    )
  ] });
}
function MarketplacePage() {
  const { isConnected, connect } = usePhantom();
  const [activeTab, setActiveTab] = reactExports.useState("fixed");
  if (!isConnected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center",
        "data-ocid": "marketplace.unauthenticated_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Connect to browse the marketplace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Connect your Phantom wallet to buy, sell, and bid on Solana NFTs." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "bg-primary hover:bg-primary/90 text-primary-foreground px-6",
              onClick: connect,
              "data-ocid": "marketplace.connect_wallet_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 mr-2" }),
                "Connect Phantom Wallet"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "marketplace.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Marketplace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Buy, sell, and bid on Solana NFTs — on-chain, no intermediaries" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 p-1 rounded-lg bg-muted/50 border border-border w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("fixed"),
            className: `flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-smooth ${activeTab === "fixed" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": "marketplace.fixed_price.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
              "Fixed Price"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("auctions"),
            className: `flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-smooth ${activeTab === "auctions" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": "marketplace.auctions.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "w-3.5 h-3.5" }),
              "Auctions"
            ]
          }
        )
      ] })
    ] }),
    activeTab === "fixed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FixedPriceTab, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AuctionsTab, {})
  ] });
}
export {
  MarketplacePage as default
};
