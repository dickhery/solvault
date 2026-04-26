import { j as jsxRuntimeExports, b as cn, l as lamportsToSol } from "./index-BIcych2j.js";
const SIZE_CLASSES = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-2xl"
};
function SolAmount({
  sol,
  lamports,
  decimals = 4,
  size = "md",
  className,
  showSymbol = true
}) {
  const amount = sol !== void 0 ? sol : lamports !== void 0 ? lamportsToSol(lamports) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "font-mono font-semibold text-accent inline-flex items-baseline gap-0.5",
        SIZE_CLASSES[size],
        className
      ),
      children: [
        showSymbol && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-80", children: "◎" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: amount.toFixed(decimals) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[0.75em] ml-0.5", children: "SOL" })
      ]
    }
  );
}
export {
  SolAmount as S
};
