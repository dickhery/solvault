import { AddressChip } from "@/components/ui/AddressChip";
import { SolAmount } from "@/components/ui/SolAmount";
import { TransactionBadge } from "@/components/ui/TransactionBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Tag } from "lucide-react";

export default function NftDetailPage() {
  const { mintAddress } = useParams({ from: "/nft/$mintAddress" });
  const navigate = useNavigate();

  // Demo data — in production, fetch from backend by mintAddress
  const nft = {
    mintAddress,
    name: "Cosmic Ape #001",
    collectionName: "Cosmic Apes",
    imageUrl: `https://picsum.photos/seed/${mintAddress}/800/800`,
    price: 12.5,
    status: "listed" as const,
    owner: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    creator: "3rGNJbKCc4hfBxkHUzMQwqeBPnhBVFp7N5xdqfkxJCaQ",
    royalty: 5,
    attributes: [
      { trait: "Background", value: "Cosmic Void" },
      { trait: "Eyes", value: "Laser" },
      { trait: "Fur", value: "Golden" },
      { trait: "Hat", value: "Astronaut" },
      { trait: "Mouth", value: "Smirk" },
    ],
  };

  return (
    <div className="max-w-5xl space-y-6" data-ocid="nft_detail.page">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="nft_detail.back_button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="card-glass overflow-hidden rounded-xl aspect-square">
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">
              {nft.collectionName}
            </p>
            <h1 className="text-3xl font-display font-bold text-foreground mt-1">
              {nft.name}
            </h1>
          </div>

          {/* Price */}
          <div className="card-glass p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Current Price
              </span>
              <TransactionBadge status="confirmed" />
            </div>
            <SolAmount sol={nft.price} size="xl" />
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                data-ocid="nft_detail.buy_button"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2 border-border hover:border-accent/30"
                data-ocid="nft_detail.offer_button"
              >
                <Tag className="w-4 h-4" />
                Make Offer
              </Button>
            </div>
          </div>

          {/* Metadata */}
          <div className="card-glass p-5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Mint Address</span>
                <AddressChip
                  address={
                    nft.mintAddress.length > 10
                      ? nft.mintAddress
                      : "7Gsm9vGFyHikQasNwTfLzqmRSJAkEf6F9eDN2a1VH8Jo"
                  }
                  data-ocid="nft_detail.mint_address_chip"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Owner</span>
                <AddressChip
                  address={nft.owner}
                  data-ocid="nft_detail.owner_address_chip"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Royalty</span>
                <span className="font-mono text-foreground">
                  {nft.royalty}%
                </span>
              </div>
            </div>
          </div>

          {/* Traits */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Attributes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {nft.attributes.map((attr) => (
                <div key={attr.trait} className="card-glass p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {attr.trait}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <a
            href={`https://explorer.solana.com/address/${nft.mintAddress}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
            data-ocid="nft_detail.explorer_link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View on Solana Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
