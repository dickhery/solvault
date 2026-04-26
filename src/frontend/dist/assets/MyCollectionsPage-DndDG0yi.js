import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, u as useQuery, k as useQueryClient, m as useMutation, d as createActor, E as ExternalBlob, e as usePhantom, D as ue, B as Button, y as formatSol, z as LoaderCircle, _ as __vitePreload, i as SkeletonGrid, H as Layers, a as Badge } from "./index-BIcych2j.js";
import { M as Modal, P as Plus } from "./Modal-CuQJCFdV.js";
import { P as Primitive, L as Label, I as Input } from "./label-DMZhWftV.js";
import { T as Textarea, I as ImagePlus } from "./textarea-UKJ1GFTI.js";
import { C as CircleCheck } from "./circle-check-CKy8H2B1.js";
import { A as AddressChip } from "./AddressChip-BHgiOfyQ.js";
import { E as EmptyState } from "./EmptyState-DklMelPP.js";
import { W as Wallet } from "./wallet-DRZPAFJa.js";
import "./check-szlSdK33.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
var define_process_env_default = {};
function getActor() {
  const canisterId = typeof process !== "undefined" && define_process_env_default.CANISTER_ID_BACKEND || "";
  if (!canisterId) return null;
  const storageGatewayUrl = typeof process !== "undefined" && "https://blob.caffeine.ai" || "https://blob.caffeine.ai";
  const uploadFile = async (blob) => {
    const bytes = await blob.getBytes();
    const res = await fetch(`${storageGatewayUrl}/upload`, {
      method: "POST",
      body: bytes
    });
    if (!res.ok) throw new Error("Upload failed");
    return new Uint8Array(await res.arrayBuffer());
  };
  const downloadFile = async (hash) => {
    const hexHash = Array.from(hash).map((b) => b.toString(16).padStart(2, "0")).join("");
    return ExternalBlob.fromURL(`${storageGatewayUrl}/blob/${hexHash}`);
  };
  return createActor(canisterId, uploadFile, downloadFile);
}
function useConfig() {
  return useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) throw new Error("Actor not ready");
      return actor.getConfig();
    },
    staleTime: 6e4
  });
}
function useUserCollections(ownerAddress) {
  return useQuery({
    queryKey: ["userCollections", ownerAddress],
    queryFn: async () => {
      if (!ownerAddress) return [];
      const actor = getActor();
      if (!actor) return [];
      return actor.getUserCollections(ownerAddress);
    },
    enabled: !!ownerAddress,
    staleTime: 15e3
  });
}
function useCreateUserCollection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      txSignature
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createUserCollection(data, txSignature);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userCollections"] });
    }
  });
}
function useAddNftToUserCollection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      collectionId,
      nft
    }) => {
      const actor = getActor();
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.addNftToUserCollection(collectionId, nft);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["userCollections"] });
      qc.invalidateQueries({ queryKey: ["user-nfts"] });
      qc.invalidateQueries({
        queryKey: ["collectionNfts", variables.collectionId]
      });
    }
  });
}
function StepIndicator({ current }) {
  const steps = ["Details", "Artwork", "Pay & Create"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-6", children: steps.map((label, i) => {
    const num = i + 1;
    const active = current === num;
    const done = current > num;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 flex-1 last:flex-none",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold border transition-colors",
                done ? "bg-accent border-accent text-accent-foreground" : active ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
              ),
              children: done ? "✓" : num
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-xs hidden sm:block",
                active ? "text-foreground" : "text-muted-foreground"
              ),
              children: label
            }
          ),
          i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex-1 h-px mx-1",
                done ? "bg-accent/50" : "bg-border"
              )
            }
          )
        ]
      },
      label
    );
  }) });
}
function CreateCollectionModal({
  open,
  onOpenChange,
  collectionCreationFeeSOL,
  escrowWalletAddress
}) {
  const { address } = usePhantom();
  const createMutation = useCreateUserCollection();
  const [step, setStep] = reactExports.useState(1);
  const [form, setForm] = reactExports.useState({
    name: "",
    symbol: "",
    description: "",
    mintAuthority: address ?? "",
    collectionMintAddress: "",
    metadataUri: ""
  });
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [isPaying, setIsPaying] = reactExports.useState(false);
  const [receipt, setReceipt] = reactExports.useState(null);
  const resetModal = () => {
    setStep(1);
    setForm({
      name: "",
      symbol: "",
      description: "",
      mintAuthority: address ?? "",
      collectionMintAddress: "",
      metadataUri: ""
    });
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
    setReceipt(null);
  };
  const handleClose = (v) => {
    if (!v) resetModal();
    onOpenChange(v);
  };
  const handleField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const isStep1Valid = form.name.trim() && form.symbol.trim() && form.mintAuthority.trim() && form.collectionMintAddress.trim();
  const handleImageSelect = reactExports.useCallback((file) => {
    if (file.size > 10 * 1024 * 1024) {
      ue.error("Image must be under 10MB");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      return setImagePreview((_a = e.target) == null ? void 0 : _a.result);
    };
    reader.readAsDataURL(file);
  }, []);
  const handleFileDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleImageSelect(file);
    },
    [handleImageSelect]
  );
  const handlePayAndCreate = async () => {
    if (!imageFile || !address) return;
    setIsPaying(true);
    try {
      setIsUploading(true);
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setUploadProgress(pct)
      );
      setIsUploading(false);
      const solana = window.solana;
      if (!solana) throw new Error("Phantom not available");
      const lamports = Math.round(collectionCreationFeeSOL * 1e9);
      const web3Module = await __vitePreload(() => import(
        /* @vite-ignore */
        "https://esm.sh/@solana/web3.js@1.98.0"
      ), true ? [] : void 0);
      const { Connection, PublicKey, SystemProgram, Transaction } = web3Module;
      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );
      const fromPubkey = new PublicKey(address);
      const toPubkey = new PublicKey(escrowWalletAddress);
      const tx = new Transaction().add(
        SystemProgram.transfer({ fromPubkey, toPubkey, lamports })
      );
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      tx.feePayer = fromPubkey;
      const { signature } = await solana.signAndSendTransaction(tx);
      ue.success("Transaction sent! Waiting for confirmation…");
      await connection.confirmTransaction(signature, "confirmed");
      const collectionInput = {
        name: form.name,
        symbol: form.symbol,
        description: form.description,
        mintAuthority: form.mintAuthority,
        collectionMintAddress: form.collectionMintAddress,
        metadataUri: form.metadataUri,
        imageBlob: blob
      };
      const created = await createMutation.mutateAsync({
        data: collectionInput,
        txSignature: signature
      });
      setReceipt({
        id: created.id,
        mintAuthority: created.mintAuthority,
        collectionMintAddress: created.collectionMintAddress,
        metadataUri: created.metadataUri
      });
      setStep("receipt");
      ue.success("Collection created successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Transaction failed";
      ue.error(msg);
    } finally {
      setIsPaying(false);
      setIsUploading(false);
    }
  };
  const modalTitle = step === "receipt" ? "Collection Created!" : "Create Collection";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      onOpenChange: handleClose,
      title: modalTitle,
      size: "lg",
      "data-ocid": "create_collection.dialog",
      children: [
        step !== "receipt" && /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cc-name", children: "Collection Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cc-name",
                  value: form.name,
                  onChange: handleField("name"),
                  placeholder: "My Awesome Collection",
                  className: "mt-1.5",
                  "data-ocid": "create_collection.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cc-symbol", children: [
                "Symbol *",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(max 10)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cc-symbol",
                  value: form.symbol,
                  onChange: handleField("symbol"),
                  placeholder: "MYCOL",
                  maxLength: 10,
                  className: "mt-1.5 font-mono uppercase",
                  "data-ocid": "create_collection.symbol_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cc-meta", children: "Metadata URI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cc-meta",
                  value: form.metadataUri,
                  onChange: handleField("metadataUri"),
                  placeholder: "https://…/metadata.json",
                  className: "mt-1.5",
                  "data-ocid": "create_collection.metadata_uri_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cc-desc", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "cc-desc",
                  value: form.description,
                  onChange: handleField("description"),
                  placeholder: "Describe your collection…",
                  rows: 2,
                  className: "mt-1.5 resize-none",
                  "data-ocid": "create_collection.description_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cc-mint-auth", children: "Mint Authority *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cc-mint-auth",
                  value: form.mintAuthority,
                  onChange: handleField("mintAuthority"),
                  placeholder: "Solana address",
                  className: "mt-1.5 font-mono text-sm",
                  "data-ocid": "create_collection.mint_authority_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cc-col-mint", children: "Collection Mint Address *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cc-col-mint",
                  value: form.collectionMintAddress,
                  onChange: handleField("collectionMintAddress"),
                  placeholder: "Metaplex collection NFT mint address",
                  className: "mt-1.5 font-mono text-sm",
                  "data-ocid": "create_collection.collection_mint_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => setStep(2),
              disabled: !isStep1Valid,
              "data-ocid": "create_collection.step1_next_button",
              children: "Next: Upload Artwork →"
            }
          ) })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "cc-file-input",
              onDrop: handleFileDrop,
              onDragOver: (e) => e.preventDefault(),
              className: cn(
                "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors block",
                imagePreview ? "border-accent/40 bg-accent/5" : "border-border hover:border-primary/40 hover:bg-primary/5"
              ),
              "data-ocid": "create_collection.dropzone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cc-file-input",
                    type: "file",
                    accept: "image/jpeg,image/png,image/gif",
                    className: "hidden",
                    onChange: (e) => {
                      var _a;
                      const f = (_a = e.target.files) == null ? void 0 : _a[0];
                      if (f) handleImageSelect(f);
                    },
                    "data-ocid": "create_collection.upload_button"
                  }
                ),
                imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imagePreview,
                      alt: "Preview",
                      className: "w-32 h-32 object-cover rounded-lg mx-auto border border-border"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-accent", children: imageFile == null ? void 0 : imageFile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click or drag to replace" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop artwork here or click to upload" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, GIF · max 10MB" })
                  ] })
                ] })
              ]
            }
          ),
          isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: uploadProgress, className: "h-1.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
              "Uploading… ",
              uploadProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setStep(1),
                "data-ocid": "create_collection.step2_back_button",
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => setStep(3),
                disabled: !imageFile,
                "data-ocid": "create_collection.step2_next_button",
                children: "Next: Pay & Create →"
              }
            )
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Collection Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imagePreview,
                  alt: "",
                  className: "w-14 h-14 rounded-lg object-cover border border-border"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: form.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: form.symbol })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Collection creation fee" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-accent", children: [
                  "◎ ",
                  formatSol(collectionCreationFeeSOL, 2),
                  " SOL"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Network" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "Solana Devnet" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Recipient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  escrowWalletAddress.slice(0, 8),
                  "…",
                  escrowWalletAddress.slice(-6)
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            "Clicking the button below will prompt Phantom to sign a SOL transfer of",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
              formatSol(collectionCreationFeeSOL, 2),
              " SOL"
            ] }),
            " ",
            "to our escrow wallet. The collection will be created immediately after the transaction is confirmed."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setStep(2),
                disabled: isPaying,
                "data-ocid": "create_collection.step3_back_button",
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handlePayAndCreate,
                disabled: isPaying,
                className: "gap-2",
                "data-ocid": "create_collection.pay_create_button",
                children: isPaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  " Processing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  " Pay",
                  " ",
                  formatSol(collectionCreationFeeSOL, 2),
                  " SOL & Create"
                ] })
              }
            )
          ] })
        ] }),
        step === "receipt" && receipt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: "Collection Created!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your collection is live on the platform. Here are your identifiers:" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 space-y-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Collection ID", value: receipt.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Mint Authority", value: receipt.mintAuthority }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReceiptRow,
              {
                label: "Collection Mint",
                value: receipt.collectionMintAddress
              }
            ),
            receipt.metadataUri && /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptRow, { label: "Metadata URI", value: receipt.metadataUri })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => handleClose(false),
              className: "w-full",
              "data-ocid": "create_collection.done_button",
              children: "Done"
            }
          )
        ] })
      ]
    }
  );
}
function ReceiptRow({ label, value }) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
    ue.success(`${label} copied`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: copy,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") copy();
        },
        className: "w-full text-left font-mono text-xs bg-background border border-border rounded-md px-3 py-2 text-foreground hover:border-accent/40 transition-colors truncate",
        title: value,
        children: copied ? "✓ Copied" : value
      }
    )
  ] });
}
function MintNftModal({
  open,
  onOpenChange,
  collectionId,
  collectionName
}) {
  const mintMutation = useAddNftToUserCollection();
  const [form, setForm] = reactExports.useState({
    name: "",
    description: "",
    mintAddress: ""
  });
  const [attributes, setAttributes] = reactExports.useState([
    { id: 1, key: "", value: "" }
  ]);
  const attrIdRef = reactExports.useRef(2);
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [isMinting, setIsMinting] = reactExports.useState(false);
  const [mintedAddress, setMintedAddress] = reactExports.useState(null);
  const resetModal = () => {
    setForm({ name: "", description: "", mintAddress: "" });
    setAttributes([{ id: 1, key: "", value: "" }]);
    attrIdRef.current = 2;
    setImageFile(null);
    setImagePreview(null);
    setMintedAddress(null);
  };
  const handleClose = (v) => {
    if (!v) resetModal();
    onOpenChange(v);
  };
  const handleField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const handleImageSelect = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      ue.error("Image must be under 10MB");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      return setImagePreview((_a = e.target) == null ? void 0 : _a.result);
    };
    reader.readAsDataURL(file);
  };
  const addAttr = () => {
    setAttributes((prev) => [
      ...prev,
      { id: attrIdRef.current++, key: "", value: "" }
    ]);
  };
  const removeAttr = (i) => setAttributes((prev) => prev.filter((_, idx) => idx !== i));
  const updateAttr = (i, field, v) => {
    setAttributes(
      (prev) => prev.map((a, idx) => idx === i ? { ...a, [field]: v } : a)
    );
  };
  const isValid = form.name.trim() && form.mintAddress.trim() && imageFile;
  const handleMint = async () => {
    if (!isValid) return;
    setIsMinting(true);
    try {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const validAttrs = attributes.filter((a) => a.key.trim() && a.value.trim()).map((a) => [a.key.trim(), a.value.trim()]);
      const nftInput = {
        collectionId,
        name: form.name.trim(),
        description: form.description.trim(),
        mintAddress: form.mintAddress.trim(),
        attributes: validAttrs,
        imageBlob: blob
      };
      const result = await mintMutation.mutateAsync({
        collectionId,
        nft: nftInput
      });
      setMintedAddress(result.mintAddress);
      ue.success("NFT registered successfully!");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Minting failed");
    } finally {
      setIsMinting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onOpenChange: handleClose,
      title: mintedAddress ? "NFT Registered!" : `Mint NFT — ${collectionName}`,
      size: "lg",
      "data-ocid": "mint_nft.dialog",
      children: mintedAddress ? (
        // Success state
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: "NFT Registered!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your NFT is now part of the collection." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 text-left space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mint Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all", children: mintedAddress })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => handleClose(false),
              className: "w-full",
              "data-ocid": "mint_nft.done_button",
              children: "View Collection"
            }
          )
        ] })
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "How it works:" }),
          " Use your Solana wallet (e.g. Phantom) to mint this NFT on Metaplex, then enter the mint address below to register it here. The platform stores your NFT record — no on-chain minting happens through this form."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block", children: "NFT Image *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "mint-nft-file",
              onDrop: (e) => {
                e.preventDefault();
                const f = e.dataTransfer.files[0];
                if (f) handleImageSelect(f);
              },
              onDragOver: (e) => e.preventDefault(),
              className: cn(
                "flex items-center gap-4 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors",
                imagePreview ? "border-accent/40 bg-accent/5" : "border-border hover:border-primary/40 hover:bg-primary/5"
              ),
              "data-ocid": "mint_nft.dropzone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "mint-nft-file",
                    type: "file",
                    accept: "image/jpeg,image/png,image/gif",
                    className: "hidden",
                    onChange: (e) => {
                      var _a;
                      const f = (_a = e.target.files) == null ? void 0 : _a[0];
                      if (f) handleImageSelect(f);
                    },
                    "data-ocid": "mint_nft.upload_button"
                  }
                ),
                imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imagePreview,
                      alt: "Preview",
                      className: "w-16 h-16 rounded-lg object-cover border border-border flex-shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-accent truncate", children: imageFile == null ? void 0 : imageFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click to replace" })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-7 h-7 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: "Click or drag to upload" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "JPG, PNG, GIF · max 10MB" })
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mint-name", children: "NFT Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "mint-name",
              value: form.name,
              onChange: handleField("name"),
              placeholder: "My Awesome NFT #1",
              className: "mt-1.5",
              "data-ocid": "mint_nft.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mint-desc", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "mint-desc",
              value: form.description,
              onChange: handleField("description"),
              placeholder: "Describe this NFT…",
              rows: 2,
              className: "mt-1.5 resize-none",
              "data-ocid": "mint_nft.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mint-addr", children: [
            "Mint Address *",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(from Metaplex)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "mint-addr",
              value: form.mintAddress,
              onChange: handleField("mintAddress"),
              placeholder: "Solana NFT mint address",
              className: "mt-1.5 font-mono text-sm",
              "data-ocid": "mint_nft.mint_address_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Attributes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                onClick: addAttr,
                className: "h-7 px-2 text-xs gap-1",
                "data-ocid": "mint_nft.add_attribute_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                  " Add"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: attributes.map((attr, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-2 items-center",
              "data-ocid": `mint_nft.attribute.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: attr.key,
                    onChange: (e) => updateAttr(i, "key", e.target.value),
                    placeholder: "Trait",
                    className: "text-xs h-8",
                    "data-ocid": `mint_nft.attribute_key.${i + 1}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: attr.value,
                    onChange: (e) => updateAttr(i, "value", e.target.value),
                    placeholder: "Value",
                    className: "text-xs h-8",
                    "data-ocid": `mint_nft.attribute_value.${i + 1}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "icon",
                    variant: "ghost",
                    onClick: () => removeAttr(i),
                    className: "h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive",
                    disabled: attributes.length === 1,
                    "data-ocid": `mint_nft.remove_attribute.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            attr.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => handleClose(false),
              disabled: isMinting,
              className: "flex-1",
              "data-ocid": "mint_nft.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleMint,
              disabled: !isValid || isMinting,
              className: "flex-1 gap-2",
              "data-ocid": "mint_nft.submit_button",
              children: isMinting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                " Registering…"
              ] }) : "Register NFT"
            }
          )
        ] })
      ] })
    }
  );
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function CollectionCard({
  collection,
  index,
  onMint
}) {
  const imageUrl = collection.imageBlob.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-glass overflow-hidden group flex flex-col",
      "data-ocid": `collections.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-40 overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: collection.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 right-3 badge-primary", children: collection.symbol })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-tight", children: collection.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-primary/20 text-primary bg-primary/5 flex-shrink-0",
                children: [
                  Number(collection.mintCount),
                  " NFTs"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: collection.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Created ",
              formatDate(collection.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 p-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Collection Identifiers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IdentifierRow,
              {
                label: "Mint Authority",
                value: collection.mintAuthority,
                index,
                field: "mint_authority"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IdentifierRow,
              {
                label: "Collection Mint",
                value: collection.collectionMintAddress,
                index,
                field: "collection_mint"
              }
            ),
            collection.metadataUri && /* @__PURE__ */ jsxRuntimeExports.jsx(
              IdentifierRow,
              {
                label: "Metadata URI",
                value: collection.metadataUri,
                index,
                field: "metadata_uri"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-auto pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => onMint(collection),
              className: "flex-1 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground",
              "data-ocid": `collections.mint_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                " Mint NFT"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function IdentifierRow({
  label,
  value,
  index,
  field
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddressChip,
      {
        address: value,
        "data-ocid": `collections.${field}.${index}`
      }
    )
  ] });
}
function MyCollectionsPage() {
  const { address, isConnected, connect } = usePhantom();
  const { data: collections, isLoading } = useUserCollections(address);
  const { data: config } = useConfig();
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [mintTarget, setMintTarget] = reactExports.useState(null);
  const feeSOL = (config == null ? void 0 : config.collectionCreationFeeSOL) ?? 0.5;
  const escrow = (config == null ? void 0 : config.escrowWalletAddress) ?? "";
  if (!isConnected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "collections.page", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Wallet,
        title: "Connect your Phantom wallet",
        description: "Connect to view and manage your NFT collections.",
        ctaLabel: "Connect Wallet",
        onCta: connect,
        "data-ocid": "collections.wallet_empty_state"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "collections.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "My Collections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Create and manage your NFT collections" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setCreateOpen(true),
          className: "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
          "data-ocid": "collections.create_collection_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "New Collection"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 3, "data-ocid": "collections.loading_state" }) : !collections || collections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: Layers,
        title: "No collections yet",
        description: "You haven't created any collections yet. Create your first collection and start minting NFTs.",
        ctaLabel: "Create Collection",
        onCta: () => setCreateOpen(true),
        "data-ocid": "collections.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: collections.map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollectionCard,
      {
        collection: col,
        index: i + 1,
        onMint: setMintTarget
      },
      col.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateCollectionModal,
      {
        open: createOpen,
        onOpenChange: setCreateOpen,
        collectionCreationFeeSOL: feeSOL,
        escrowWalletAddress: escrow
      }
    ),
    mintTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MintNftModal,
      {
        open: !!mintTarget,
        onOpenChange: (v) => {
          if (!v) setMintTarget(null);
        },
        collectionId: mintTarget.id,
        collectionName: mintTarget.name
      }
    )
  ] });
}
export {
  MyCollectionsPage as default
};
