import { j as jsxRuntimeExports, B as Button, b as cn } from "./index-BagE81i5.js";
function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  onCta,
  className,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center",
        "rounded-xl border border-dashed border-border bg-card/30",
        className
      ),
      "data-ocid": ocid ?? "empty_state",
      children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-primary/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: description }),
        ctaLabel && onCta && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onCta,
            className: "bg-primary hover:bg-primary/90 text-primary-foreground",
            "data-ocid": `${ocid ?? "empty_state"}.cta_button`,
            children: ctaLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
