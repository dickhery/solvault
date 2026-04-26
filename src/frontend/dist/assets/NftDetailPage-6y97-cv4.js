import { c as createLucideIcon, $ as useParams, f as useNavigate, j as jsxRuntimeExports, B as Button } from "./index-BIcych2j.js";
import { A as AddressChip } from "./AddressChip-BHgiOfyQ.js";
import { S as SolAmount } from "./SolAmount-C3sUAlqD.js";
import { T as TransactionBadge } from "./TransactionBadge-BVAy6oci.js";
import { T as Tag } from "./tag-BI5JadGw.js";
import "./check-szlSdK33.js";
import "./circle-x-BfZKY0Xj.js";
import "./circle-check-CKy8H2B1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
function NftDetailPage() {
  const { mintAddress } = useParams({ from: "/nft/$mintAddress" });
  const navigate = useNavigate();
  const nft = {
    mintAddress,
    name: "Cosmic Ape #001",
    collectionName: "Cosmic Apes",
    imageUrl: `https://picsum.photos/seed/${mintAddress}/800/800`,
    price: 12.5,
    owner: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    royalty: 5,
    attributes: [
      { trait: "Background", value: "Cosmic Void" },
      { trait: "Eyes", value: "Laser" },
      { trait: "Fur", value: "Golden" },
      { trait: "Hat", value: "Astronaut" },
      { trait: "Mouth", value: "Smirk" }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl space-y-6", "data-ocid": "nft_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/" }),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "nft_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Portfolio"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-glass overflow-hidden rounded-xl aspect-square", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: nft.imageUrl,
          alt: nft.name,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: nft.collectionName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mt-1", children: nft.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Current Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionBadge, { status: "confirmed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SolAmount, { sol: nft.price, size: "xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
                "data-ocid": "nft_detail.buy_button",
                children: "Buy Now"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 gap-2 border-border hover:border-accent/30",
                "data-ocid": "nft_detail.offer_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4" }),
                  "Make Offer"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Mint Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddressChip,
                {
                  address: nft.mintAddress.length > 10 ? nft.mintAddress : "7Gsm9vGFyHikQasNwTfLzqmRSJAkEf6F9eDN2a1VH8Jo",
                  "data-ocid": "nft_detail.mint_address_chip"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Owner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddressChip,
                {
                  address: nft.owner,
                  "data-ocid": "nft_detail.owner_address_chip"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Royalty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                nft.royalty,
                "%"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Attributes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: nft.attributes.map((attr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: attr.trait }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: attr.value })
          ] }, attr.trait)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors",
            "data-ocid": "nft_detail.explorer_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
              "View on Solana Explorer"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  NftDetailPage as default
};
