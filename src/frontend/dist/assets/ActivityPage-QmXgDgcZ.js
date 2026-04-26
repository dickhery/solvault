import { c as createLucideIcon, e as usePhantom, j as jsxRuntimeExports, a0 as Activity, Z as Zap } from "./index-BIcych2j.js";
import { E as EmptyState } from "./EmptyState-DklMelPP.js";
import { S as SolAmount } from "./SolAmount-C3sUAlqD.js";
import { T as TransactionBadge } from "./TransactionBadge-BVAy6oci.js";
import "./circle-x-BfZKY0Xj.js";
import "./circle-check-CKy8H2B1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
];
const ArrowDownLeft = createLucideIcon("arrow-down-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode);
const DEMO_ACTIVITY = [
  {
    id: "a1",
    type: "buy",
    nftName: "Cosmic Ape #001",
    collection: "Cosmic Apes",
    price: 12.5,
    from: "7xKXtg2CW87d9",
    to: "3rGNJbKCc4hfB",
    txHash: "5Kn3q8z",
    timestamp: "2m ago",
    status: "confirmed"
  },
  {
    id: "a2",
    type: "list",
    nftName: "Void Entity #333",
    collection: "Void Entities",
    price: 8.75,
    from: "3rGNJbKCc4hfB",
    to: "marketplace",
    txHash: "7mPw4r2",
    timestamp: "1h ago",
    status: "confirmed"
  },
  {
    id: "a3",
    type: "mint",
    nftName: "Neon Skull #099",
    collection: "Neon Skulls",
    price: 0.1,
    from: "system",
    to: "3rGNJbKCc4hfB",
    txHash: "2xQv9m1",
    timestamp: "3h ago",
    status: "confirmed"
  },
  {
    id: "a4",
    type: "sell",
    nftName: "Solar Fox #044",
    collection: "Solar Foxes",
    price: 19,
    from: "3rGNJbKCc4hfB",
    to: "9kLmNp7aXYZ",
    txHash: "4rTs8n3",
    timestamp: "1d ago",
    status: "confirmed"
  },
  {
    id: "a5",
    type: "buy",
    nftName: "Pixel Punk #007",
    collection: "Pixel Punks",
    price: 30,
    from: "2cVwQr5",
    to: "3rGNJbKCc4hfB",
    txHash: "6yUv1s9",
    timestamp: "2d ago",
    status: "failed"
  }
];
const TYPE_CONFIG = {
  buy: { label: "Bought", icon: ArrowDownLeft, color: "text-accent" },
  sell: { label: "Sold", icon: ArrowUpRight, color: "text-primary" },
  mint: { label: "Minted", icon: Zap, color: "text-yellow-400" },
  list: { label: "Listed", icon: Activity, color: "text-muted-foreground" }
};
function ActivityPage() {
  const { isConnected, connect } = usePhantom();
  if (!isConnected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Activity,
        title: "Connect your wallet",
        description: "Connect to view your transaction history.",
        ctaLabel: "Connect Wallet",
        onCta: connect,
        "data-ocid": "activity.empty_state"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "activity.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Activity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Your recent transactions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-glass overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-medium text-muted-foreground", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell", children: "NFT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-medium text-muted-foreground", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 text-xs font-medium text-muted-foreground", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: DEMO_ACTIVITY.map((item, i) => {
        const config = TYPE_CONFIG[item.type];
        const { icon: Icon } = config;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
            "data-ocid": `activity.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${config.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${config.color}`, children: config.label })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 hidden sm:table-cell", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: item.nftName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.collection })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SolAmount, { sol: item.price, size: "sm" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.timestamp }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionBadge, { status: item.status }) })
            ]
          },
          item.id
        );
      }) })
    ] }) }) })
  ] });
}
export {
  ActivityPage as default
};
