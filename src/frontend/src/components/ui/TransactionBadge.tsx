import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";

export type TransactionStatus = "pending" | "confirmed" | "failed";

interface TransactionBadgeProps {
  status: TransactionStatus;
  className?: string;
  showIcon?: boolean;
  "data-ocid"?: string;
}

const STATUS_CONFIG: Record<
  TransactionStatus,
  {
    label: string;
    classes: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  pending: {
    label: "Pending",
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Icon: Loader2,
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-accent/10 text-accent border-accent/20",
    Icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    classes: "bg-destructive/10 text-destructive border-destructive/20",
    Icon: XCircle,
  },
};

export function TransactionBadge({
  status,
  className,
  showIcon = true,
  "data-ocid": ocid,
}: TransactionBadgeProps) {
  const config = STATUS_CONFIG[status];
  const { Icon } = config;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold font-mono",
        config.classes,
        className,
      )}
      data-ocid={ocid ?? `transaction_badge.${status}`}
    >
      {showIcon && (
        <Icon
          className={cn("w-3.5 h-3.5", status === "pending" && "animate-spin")}
        />
      )}
      {config.label}
    </span>
  );
}

// Standalone status indicators
export function PendingBadge(props: Omit<TransactionBadgeProps, "status">) {
  return <TransactionBadge {...props} status="pending" />;
}
export function ConfirmedBadge(props: Omit<TransactionBadgeProps, "status">) {
  return <TransactionBadge {...props} status="confirmed" />;
}
export function FailedBadge(props: Omit<TransactionBadgeProps, "status">) {
  return <TransactionBadge {...props} status="failed" />;
}
