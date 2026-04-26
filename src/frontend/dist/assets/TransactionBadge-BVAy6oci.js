import { z as LoaderCircle, j as jsxRuntimeExports, b as cn } from "./index-BIcych2j.js";
import { C as CircleX } from "./circle-x-BfZKY0Xj.js";
import { C as CircleCheck } from "./circle-check-CKy8H2B1.js";
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Icon: LoaderCircle
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-accent/10 text-accent border-accent/20",
    Icon: CircleCheck
  },
  failed: {
    label: "Failed",
    classes: "bg-destructive/10 text-destructive border-destructive/20",
    Icon: CircleX
  }
};
function TransactionBadge({
  status,
  className,
  showIcon = true,
  "data-ocid": ocid
}) {
  const config = STATUS_CONFIG[status];
  const { Icon } = config;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold font-mono",
        config.classes,
        className
      ),
      "data-ocid": ocid ?? `transaction_badge.${status}`,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            className: cn("w-3.5 h-3.5", status === "pending" && "animate-spin")
          }
        ),
        config.label
      ]
    }
  );
}
export {
  TransactionBadge as T
};
