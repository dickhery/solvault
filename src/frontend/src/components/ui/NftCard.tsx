import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Tag } from "lucide-react";

export type NftStatus = "listed" | "auction" | "unlisted" | "sold";

export interface NftCardData {
  mintAddress: string;
  name: string;
  collectionName: string;
  imageUrl: string;
  price?: number;
  status: NftStatus;
}

interface NftCardProps {
  nft: NftCardData;
  index?: number;
  onView?: (mintAddress: string) => void;
  onList?: (mintAddress: string) => void;
  className?: string;
}

const STATUS_STYLES: Record<NftStatus, string> = {
  listed: "bg-accent/10 text-accent border-accent/20",
  auction: "bg-primary/10 text-primary border-primary/20",
  unlisted: "bg-muted text-muted-foreground border-border",
  sold: "bg-muted text-muted-foreground border-border line-through",
};

const STATUS_LABELS: Record<NftStatus, string> = {
  listed: "Listed",
  auction: "Auction",
  unlisted: "Unlisted",
  sold: "Sold",
};

export function NftCard({
  nft,
  index,
  onView,
  onList,
  className,
}: NftCardProps) {
  const ocidIndex = index !== undefined ? `.${index + 1}` : "";

  return (
    <div
      className={cn(
        "nft-card group relative flex flex-col cursor-pointer",
        className,
      )}
      data-ocid={`nft_card${ocidIndex}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <img
          src={nft.imageUrl}
          alt={nft.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          {onView && (
            <Button
              size="sm"
              variant="secondary"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onView(nft.mintAddress);
              }}
              data-ocid={`nft_card.view_button${ocidIndex}`}
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </Button>
          )}
          {onList && nft.status === "unlisted" && (
            <Button
              size="sm"
              className="gap-1.5 bg-primary hover:bg-primary/90"
              onClick={(e) => {
                e.stopPropagation();
                onList(nft.mintAddress);
              }}
              data-ocid={`nft_card.list_button${ocidIndex}`}
            >
              <Tag className="w-3.5 h-3.5" />
              List
            </Button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {nft.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {nft.collectionName}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs shrink-0 font-mono",
              STATUS_STYLES[nft.status],
            )}
          >
            {STATUS_LABELS[nft.status]}
          </Badge>
        </div>

        {nft.price !== undefined && (
          <p className="text-sm font-mono font-semibold text-accent">
            ◎ {nft.price.toFixed(2)} SOL
          </p>
        )}
      </div>
    </div>
  );
}
