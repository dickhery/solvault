import { lamportsToSol } from "@/lib/solana";
import { cn } from "@/lib/utils";

interface SolAmountProps {
  /** Amount in SOL */
  sol?: number;
  /** Amount in lamports (alternative to sol) */
  lamports?: number;
  decimals?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showSymbol?: boolean;
}

const SIZE_CLASSES: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-2xl",
};

export function SolAmount({
  sol,
  lamports,
  decimals = 4,
  size = "md",
  className,
  showSymbol = true,
}: SolAmountProps) {
  const amount =
    sol !== undefined
      ? sol
      : lamports !== undefined
        ? lamportsToSol(lamports)
        : 0;

  return (
    <span
      className={cn(
        "font-mono font-semibold text-accent inline-flex items-baseline gap-0.5",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {showSymbol && <span className="opacity-80">◎</span>}
      <span>{amount.toFixed(decimals)}</span>
      <span className="text-muted-foreground text-[0.75em] ml-0.5">SOL</span>
    </span>
  );
}
