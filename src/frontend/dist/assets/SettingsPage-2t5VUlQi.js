import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, H as useComposedRefs, d as usePhantom, f as useAppConfig, D as DEVNET_RPC_URL, s as setActiveRpcUrl, $ as Shield, a as Badge, B as Button, S as Skeleton, x as getNetworkLabel, a0 as isMainnet, K as useCollections } from "./index-BagE81i5.js";
import { A as AddressChip } from "./AddressChip-C2b4tevE.js";
import { P as Primitive, f as useControllableState, e as Primitive$1, c as composeEventHandlers, b as createContextScope, L as Label, I as Input } from "./label-EU6hexfy.js";
import { a as usePrevious, u as useSize } from "./index-B-nK2-Oc.js";
import { W as Wallet } from "./wallet-BT8EkmIy.js";
import { S as Search } from "./search-DdIbbjWb.js";
import { C as CircleCheck } from "./circle-check-O_hLFypI.js";
import { C as CircleX } from "./circle-x-QoMCwVyX.js";
import "./check-CsfXS3YC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
];
const ArrowDownToLine = createLucideIcon("arrow-down-to-line", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root$1 = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function AddressCard({
  label,
  subtitle,
  address,
  loading,
  emptyMessage,
  badgeLabel,
  variant,
  ocid
}) {
  const isDeposit = variant === "deposit";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "rounded-lg border p-4 space-y-3 transition-smooth",
        isDeposit ? "border-accent/40 bg-accent/5" : "border-primary/30 bg-primary/5"
      ].join(" "),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: [
                "mt-0.5 rounded-md p-1.5",
                isDeposit ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"
              ].join(" "),
              children: isDeposit ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
          ] }),
          isDeposit && badgeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "border-accent/30 text-accent bg-accent/5 text-xs shrink-0",
              children: badgeLabel
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-md" }) : address ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground break-all leading-relaxed", children: address }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddressChip,
            {
              address,
              full: false,
              className: isDeposit ? "border-accent/30 hover:border-accent/60 self-start" : "border-primary/20 hover:border-primary/40 self-start",
              "data-ocid": `${ocid}_chip`
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: emptyMessage ?? "Address not available" })
      ]
    }
  );
}
function NftVerifier() {
  const { nftDepositAddress } = usePhantom();
  const { data: collections, isLoading: collectionsLoading } = useCollections();
  const [mintInput, setMintInput] = reactExports.useState("");
  const [result, setResult] = reactExports.useState({ status: "idle" });
  const isLoading = collectionsLoading;
  const handleCheck = () => {
    const trimmed = mintInput.trim();
    if (!trimmed) {
      setResult({
        status: "validation_error",
        message: "Please paste a collection mint address to check."
      });
      return;
    }
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed)) {
      setResult({
        status: "validation_error",
        message: "That doesn't look like a valid Solana address. Please check and try again."
      });
      return;
    }
    if (!collections || collections.length === 0) {
      setResult({ status: "not_found" });
      return;
    }
    const match = collections.find(
      (c) => c.mintAddress.toLowerCase() === trimmed.toLowerCase()
    );
    if (match) {
      setResult({
        status: "found",
        collection: match,
        depositAddress: nftDepositAddress
      });
    } else {
      setResult({ status: "not_found" });
    }
  };
  const handleClear = () => {
    setMintInput("");
    setResult({ status: "idle" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6 space-y-5", "data-ocid": "nft_verify.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground leading-none", children: "Check Collection Before Sending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Paste a supported collection mint address before sending NFTs into your SolVault NFT vault." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "nft_verify.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-24 rounded-md" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", htmlFor: "nft-mint-input", children: "Collection Mint Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "nft-mint-input",
              value: mintInput,
              onChange: (e) => {
                setMintInput(e.target.value);
                if (result.status === "validation_error")
                  setResult({ status: "idle" });
              },
              onKeyDown: (e) => e.key === "Enter" && handleCheck(),
              placeholder: "e.g. So1vAu1tCollectionMintAddress...",
              className: "font-mono text-sm flex-1",
              "data-ocid": "nft_verify.input",
              "aria-describedby": result.status === "validation_error" ? "nft-verify-error" : void 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleCheck,
              disabled: !mintInput.trim(),
              className: "bg-primary hover:bg-primary/90 text-primary-foreground shrink-0",
              "data-ocid": "nft_verify.check_button",
              children: "Check"
            }
          ),
          result.status !== "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: handleClear,
              className: "shrink-0",
              "data-ocid": "nft_verify.clear_button",
              children: "Clear"
            }
          )
        ] }),
        result.status === "validation_error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            id: "nft-verify-error",
            className: "text-xs text-destructive flex items-center gap-1.5 mt-1",
            "data-ocid": "nft_verify.error_state",
            role: "alert",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
              result.message
            ]
          }
        )
      ] }),
      result.status === "found" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "output",
        {
          className: "rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-4 block",
          "data-ocid": "nft_verify.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-none", children: "Supported Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "NFTs from this collection can be deposited into your SolVault NFT vault." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-accent/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: "Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: result.collection.name })
              ] }),
              result.collection.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: "About" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-right line-clamp-2", children: result.collection.description })
              ] }),
              result.depositAddress ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-muted/60 border border-border p-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-3.5 h-3.5 text-primary" }),
                  "Send this NFT to:"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AddressChip,
                  {
                    address: result.depositAddress,
                    full: true,
                    className: "w-full justify-between",
                    "data-ocid": "nft_verify.nft_vault_address_chip"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Copy this address and use it as the recipient in Phantom to deposit the NFT into SolVault." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-muted/60 border border-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Connect Phantom to derive your personal NFT vault address before depositing." }) })
            ] })
          ]
        }
      ),
      result.status === "not_found" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3",
          "data-ocid": "nft_verify.not_found_state",
          role: "alert",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Not a Supported Collection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "This collection mint is not registered. Only NFTs from admin-approved collections can be deposited into SolVault. Check the Collections page to see which collections are supported." })
            ] })
          ]
        }
      )
    ] })
  ] });
}
function SettingsPage() {
  const {
    address,
    role,
    isConnected,
    connect,
    disconnect,
    solDepositAddress,
    nftDepositAddress
  } = usePhantom();
  const { data: appConfig, isLoading: configLoading } = useAppConfig();
  const [notifications, setNotifications] = reactExports.useState(true);
  const [networkWarning, setNetworkWarning] = reactExports.useState(true);
  const activeNetwork = (appConfig == null ? void 0 : appConfig.network) ?? "devnet";
  const activeRpcUrl = (appConfig == null ? void 0 : appConfig.solanaRpcUrl) ?? DEVNET_RPC_URL;
  const networkLabel = getNetworkLabel(activeNetwork);
  const networkIsMainnet = isMainnet(activeNetwork);
  reactExports.useEffect(() => {
    if (appConfig == null ? void 0 : appConfig.solanaRpcUrl) {
      setActiveRpcUrl(appConfig.solanaRpcUrl);
    }
  }, [appConfig == null ? void 0 : appConfig.solanaRpcUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-8", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage your account and preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Wallet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
      isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-primary/20 text-primary bg-primary/5 text-xs capitalize",
                children: role
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Network" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: networkIsMainnet ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs" : "border-accent/20 text-accent bg-accent/5 text-xs",
                "data-ocid": "settings.network_badge",
                children: networkLabel
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddressCard,
            {
              label: "Your Phantom Wallet Address",
              subtitle: "Your connected Phantom wallet for direct wallet-to-wallet transfers",
              address,
              variant: "user",
              ocid: "settings.user_wallet_address"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddressCard,
            {
              label: "App SOL Vault Address",
              subtitle: "Send SOL to this app-controlled address to fund your in-app balance",
              address: solDepositAddress,
              emptyMessage: "Connect Phantom to derive your SOL vault address.",
              badgeLabel: "SOL Vault",
              variant: "deposit",
              ocid: "settings.sol_vault_address"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddressCard,
            {
              label: "App NFT Vault Address",
              subtitle: "Send supported NFTs to this app-controlled address to deposit them into SolVault",
              address: nftDepositAddress,
              emptyMessage: "Connect Phantom to derive your NFT vault address.",
              badgeLabel: "NFT Vault",
              variant: "deposit",
              ocid: "settings.nft_vault_address"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "border-destructive/30 text-destructive hover:bg-destructive/10",
            onClick: disconnect,
            "data-ocid": "settings.disconnect_button",
            children: "Disconnect Wallet"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No wallet connected." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
            onClick: connect,
            "data-ocid": "settings.connect_wallet_button",
            children: "Connect Phantom"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NftVerifier, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Notifications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", children: "Sale notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Get notified when your NFTs sell" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: notifications,
              onCheckedChange: setNotifications,
              "data-ocid": "settings.notifications_switch"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground", children: "Network warning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Show network badge reminder" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: networkWarning,
              onCheckedChange: setNetworkWarning,
              "data-ocid": "settings.network_warning_switch"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Network" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
      configLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
            "Solana ",
            networkLabel
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground mt-0.5 break-all", children: activeRpcUrl })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: networkIsMainnet ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-accent/20 text-accent bg-accent/5",
            "data-ocid": "settings.network_active_badge",
            children: "Active"
          }
        )
      ] })
    ] })
  ] });
}
export {
  SettingsPage as default
};
