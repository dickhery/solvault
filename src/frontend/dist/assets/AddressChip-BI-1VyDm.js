import { r as reactExports, j as jsxRuntimeExports, t as truncateAddress, a4 as Copy, b as cn, o as ue } from "./index-CiUudlGD.js";
import { C as Check } from "./check-BQkykO4m.js";
function AddressChip({
  address,
  full = false,
  className,
  "data-ocid": ocid
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    ue.success("Address copied");
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: copy,
      className: cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md",
        "bg-muted/50 border border-border hover:border-accent/40",
        "text-xs font-mono text-muted-foreground hover:text-foreground",
        "transition-smooth group",
        className
      ),
      title: address,
      "data-ocid": ocid ?? "address_chip",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: full ? address : truncateAddress(address) }),
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" })
      ]
    }
  );
}
export {
  AddressChip as A
};
