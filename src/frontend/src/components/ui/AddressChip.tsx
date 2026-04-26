import { truncateAddress } from "@/lib/solana";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddressChipProps {
  address: string;
  full?: boolean;
  className?: string;
  "data-ocid"?: string;
}

export function AddressChip({
  address,
  full = false,
  className,
  "data-ocid": ocid,
}: AddressChipProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md",
        "bg-muted/50 border border-border hover:border-accent/40",
        "text-xs font-mono text-muted-foreground hover:text-foreground",
        "transition-smooth group",
        className,
      )}
      title={address}
      data-ocid={ocid ?? "address_chip"}
    >
      <span>{full ? address : truncateAddress(address)}</span>
      {copied ? (
        <Check className="w-3 h-3 text-accent" />
      ) : (
        <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}
