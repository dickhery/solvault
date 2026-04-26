import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, a as Badge, b as cn, u as useQuery, g as getBackendQueryActor, l as lamportsToSol, d as usePhantom, e as useNavigate, f as useAppConfig, r as reactExports, s as setActiveRpcUrl, h as Briefcase, L as LayoutGrid, S as Skeleton, i as SkeletonGrid } from "./index-BagE81i5.js";
import { A as AddressChip } from "./AddressChip-C2b4tevE.js";
import { E as EmptyState } from "./EmptyState-DQo6QAh7.js";
import { T as Tag } from "./tag-eNOuhGrc.js";
import { S as SolAmount } from "./SolAmount-DXr36y1z.js";
import { W as Wallet } from "./wallet-BT8EkmIy.js";
import { T as TrendingUp } from "./trending-up-CE6Zfqr_.js";
import { S as Sparkles } from "./sparkles-Bv4dprYt.js";
import "./check-CsfXS3YC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
const STATUS_STYLES = {
  listed: "bg-accent/10 text-accent border-accent/20",
  auction: "bg-primary/10 text-primary border-primary/20",
  unlisted: "bg-muted text-muted-foreground border-border",
  sold: "bg-muted text-muted-foreground border-border line-through"
};
const STATUS_LABELS = {
  listed: "Listed",
  auction: "Auction",
  unlisted: "Unlisted",
  sold: "Sold"
};
function NftCard({
  nft,
  index,
  onView,
  onList,
  className
}) {
  const ocidIndex = index !== void 0 ? `.${index + 1}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "nft-card group relative flex flex-col cursor-pointer",
        className
      ),
      "data-ocid": `nft_card${ocidIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-t-lg bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: nft.imageUrl,
              alt: nft.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2", children: [
            onView && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "secondary",
                className: "gap-1.5",
                onClick: (e) => {
                  e.stopPropagation();
                  onView(nft.mintAddress);
                },
                "data-ocid": `nft_card.view_button${ocidIndex}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                  "View"
                ]
              }
            ),
            onList && nft.status === "unlisted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "gap-1.5 bg-primary hover:bg-primary/90",
                onClick: (e) => {
                  e.stopPropagation();
                  onList(nft.mintAddress);
                },
                "data-ocid": `nft_card.list_button${ocidIndex}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" }),
                  "List"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: nft.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: nft.collectionName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: cn(
                  "text-xs shrink-0 font-mono",
                  STATUS_STYLES[nft.status]
                ),
                children: STATUS_LABELS[nft.status]
              }
            )
          ] }),
          nft.price !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono font-semibold text-accent", children: [
            "◎ ",
            nft.price.toFixed(2),
            " SOL"
          ] })
        ] })
      ]
    }
  );
}
function listingStatusToNftStatus(status) {
  if (status.__kind__ === "fixedPrice") return "listed";
  if (status.__kind__ === "auction") return "auction";
  return "unlisted";
}
function listingStatusToPrice(status) {
  if (status.__kind__ === "fixedPrice") {
    return lamportsToSol(Number(status.fixedPrice));
  }
  return void 0;
}
function nftRecordToCardData(nft) {
  var _a, _b;
  return {
    mintAddress: nft.mintAddress,
    name: nft.name,
    collectionName: nft.collectionId,
    imageUrl: ((_b = (_a = nft.imageBlob) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) || "/assets/images/placeholder.svg",
    status: listingStatusToNftStatus(nft.listingStatus),
    price: listingStatusToPrice(nft.listingStatus)
  };
}
function useUserNfts(ownerAddress) {
  return useQuery({
    queryKey: ["user-nfts", ownerAddress],
    queryFn: async () => {
      if (!ownerAddress) return [];
      const actor = getBackendQueryActor();
      if (!actor) return [];
      const records = await actor.getUserNfts(ownerAddress);
      return records.map(nftRecordToCardData);
    },
    enabled: !!ownerAddress,
    staleTime: 3e4
  });
}
function useSolanaBalance(address) {
  return useQuery({
    queryKey: ["solana-balance", address],
    queryFn: async () => {
      if (!address) return 0;
      const actor = getBackendQueryActor();
      if (!actor) return 0;
      const lamportsStr = await actor.getSolanaBalance(address);
      const lamports = Number(lamportsStr);
      return Number.isNaN(lamports) ? 0 : lamportsToSol(lamports);
    },
    enabled: !!address,
    staleTime: 6e4,
    refetchInterval: 6e4
  });
}
function useUserCollections(ownerAddress) {
  return useQuery({
    queryKey: ["user-collections", ownerAddress],
    queryFn: async () => {
      if (!ownerAddress) return [];
      const actor = getBackendQueryActor();
      if (!actor) return [];
      return actor.getUserCollections(ownerAddress);
    },
    enabled: !!ownerAddress,
    staleTime: 3e4
  });
}
function StatCard({
  icon: Icon,
  label,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-5 flex items-center gap-4", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
      children
    ] })
  ] });
}
function StatValue({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-mono font-semibold text-foreground", children });
}
function ConnectPrompt({ onConnect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center px-4",
      "data-ocid": "portfolio.connect_prompt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-150" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-10 h-10 text-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Connect your wallet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "View your NFT portfolio, track SOL balance, and manage your collections — all in one place." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: onConnect,
              className: "bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-8 shadow-lg hover:opacity-90 transition-opacity",
              "data-ocid": "portfolio.connect_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 mr-2" }),
                "Connect Phantom"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              onClick: () => window.open("https://phantom.app/", "_blank"),
              className: "border-primary/20 text-muted-foreground hover:text-foreground",
              "data-ocid": "portfolio.get_phantom_button",
              children: "Get Phantom"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-6 text-xs text-muted-foreground", children: ["Non-custodial", "Solana Ready", "Secure"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-accent" }),
          f
        ] }, f)) })
      ]
    }
  );
}
function PortfolioPage() {
  const {
    isConnected,
    address,
    connect,
    role,
    solDepositAddress,
    nftDepositAddress
  } = usePhantom();
  const navigate = useNavigate();
  const { data: appConfig } = useAppConfig();
  reactExports.useEffect(() => {
    if (appConfig == null ? void 0 : appConfig.solanaRpcUrl) {
      setActiveRpcUrl(appConfig.solanaRpcUrl);
    }
  }, [appConfig == null ? void 0 : appConfig.solanaRpcUrl]);
  const {
    data: nfts = [],
    isLoading: nftsLoading,
    error: nftsError
  } = useUserNfts(address);
  const { data: solBalance = 0, isLoading: balanceLoading } = useSolanaBalance(solDepositAddress);
  const { data: collections = [], isLoading: collectionsLoading } = useUserCollections(address);
  if (!isConnected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectPrompt, { onConnect: connect });
  }
  const estimatedValue = nfts.reduce((sum, n) => sum + (n.price ?? 0), 0);
  const mintedCount = nfts.filter((n) => n.status !== "unlisted").length;
  const uniqueCollections = new Set(nfts.map((n) => n.collectionName)).size;
  const totalCollectionMints = collections.reduce(
    (s, c) => s + Number(c.mintCount),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", "data-ocid": "portfolio.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "My Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Your wallet:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddressChip,
            {
              address,
              "data-ocid": "portfolio.address_chip"
            }
          ),
          role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs border-primary/20 text-primary bg-primary/5",
              children: "Admin"
            }
          ),
          role === "user" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-xs border-accent/20 text-accent bg-accent/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3 h-3 mr-1" }),
                "Collector"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => navigate({ to: "/admin" }),
            variant: "outline",
            className: "border-accent/20 text-accent hover:bg-accent/10",
            "data-ocid": "portfolio.admin_dashboard_button",
            children: "Admin Dashboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate({ to: "/my-collections" }),
            variant: "outline",
            className: "border-primary/20 text-primary hover:bg-primary/10",
            "data-ocid": "portfolio.view_collections_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 mr-1.5" }),
              "My Collections"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate({ to: "/marketplace" }),
            variant: "outline",
            className: "border-border text-muted-foreground hover:text-foreground",
            "data-ocid": "portfolio.browse_marketplace_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4 mr-1.5" }),
              "Marketplace"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-glass p-5 space-y-3",
          "data-ocid": "portfolio.sol_vault_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Send SOL To Your App Vault" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Deposits to this address fund your in-app SOL balance" })
              ] })
            ] }),
            solDepositAddress ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              AddressChip,
              {
                address: solDepositAddress,
                full: true,
                className: "w-full justify-between",
                "data-ocid": "portfolio.sol_vault_chip"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Connect Phantom to derive your SOL vault address." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-glass p-5 space-y-3",
          "data-ocid": "portfolio.nft_vault_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Send NFTs To Your App Vault" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Use this address for supported Solana NFT deposits" })
              ] })
            ] }),
            nftDepositAddress ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              AddressChip,
              {
                address: nftDepositAddress,
                full: true,
                className: "w-full justify-between",
                "data-ocid": "portfolio.nft_vault_chip"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Connect Phantom to derive your NFT vault address." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Wallet,
          label: "App Vault Balance (SOL)",
          ocid: "portfolio.balance_card",
          children: balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28" }) : !solDepositAddress ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground italic", children: "Not ready" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SolAmount, { sol: solBalance, size: "xl" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: TrendingUp,
          label: "Est. Portfolio Value",
          ocid: "portfolio.value_card",
          children: nftsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SolAmount, { sol: estimatedValue, size: "xl" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Image,
          label: "NFTs Owned",
          ocid: "portfolio.nfts_count_card",
          children: nftsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatValue, { children: nfts.length })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: FolderOpen,
          label: "Collections Held",
          ocid: "portfolio.collections_count_card",
          children: nftsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatValue, { children: uniqueCollections })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "portfolio.nfts_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground", children: "My NFTs" }),
        !nftsLoading && nfts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          nfts.length,
          " item",
          nfts.length !== 1 ? "s" : ""
        ] })
      ] }),
      nftsError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
          "data-ocid": "portfolio.nfts_error_state",
          children: [
            "Failed to load NFTs:",
            " ",
            nftsError instanceof Error ? nftsError.message : "Unknown error"
          ]
        }
      ),
      nftsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "portfolio.nfts_loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 8 }) }) : !nftsError && nfts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: Image,
          title: "No NFTs yet",
          description: "Browse the marketplace to discover NFTs, or mint your own from your collections.",
          ctaLabel: "Browse Marketplace",
          onCta: () => navigate({ to: "/marketplace" }),
          "data-ocid": "portfolio.nfts_empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: nfts.map((nft, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        NftCard,
        {
          nft,
          index: i,
          onView: (addr) => navigate({
            to: "/nft/$mintAddress",
            params: { mintAddress: addr }
          }),
          "data-ocid": `portfolio.nft_card.item.${i + 1}`
        },
        nft.mintAddress
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-glass p-6 rounded-xl",
        "data-ocid": "portfolio.collections_summary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground", children: "My Collections" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Collections you've created and minted" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => navigate({ to: "/my-collections" }),
                className: "border-primary/20 text-primary hover:bg-primary/10",
                "data-ocid": "portfolio.manage_collections_button",
                children: "Manage"
              }
            )
          ] }),
          collectionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-4",
              "data-ocid": "portfolio.collections_loading_state",
              children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, n))
            }
          ) : collections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: FolderOpen,
              title: "No collections yet",
              description: "Create your first NFT collection and start minting.",
              ctaLabel: "Create Collection",
              onCta: () => navigate({ to: "/my-collections" }),
              className: "py-10",
              "data-ocid": "portfolio.collections_empty_state"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Collections" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-mono font-bold text-foreground", children: collections.length })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Mints" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-mono font-bold text-foreground", children: totalCollectionMints })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Listed by You" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-mono font-bold text-foreground", children: mintedCount })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  PortfolioPage as default
};
