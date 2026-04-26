import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  ctaHref?: string;
  className?: string;
  "data-ocid"?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  onCta,
  className,
  "data-ocid": ocid,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center",
        "rounded-xl border border-dashed border-border bg-card/30",
        className,
      )}
      data-ocid={ocid ?? "empty_state"}
    >
      {Icon && (
        <div className="mb-4 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary/60" />
        </div>
      )}
      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs mb-6">
          {description}
        </p>
      )}
      {ctaLabel && onCta && (
        <Button
          onClick={onCta}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          data-ocid={`${ocid ?? "empty_state"}.cta_button`}
        >
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
