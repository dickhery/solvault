import type { UserCollection } from "@/backend.d";
import { CreateCollectionModal } from "@/components/collections/CreateCollectionModal";
import { MintNftModal } from "@/components/collections/MintNftModal";
import { AddressChip } from "@/components/ui/AddressChip";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePhantom } from "@/contexts/phantom-context";
import { useConfig, useUserCollections } from "@/hooks/use-collections";
import { CalendarDays, Layers, Plus, Wallet } from "lucide-react";
import { useState } from "react";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CollectionCard({
  collection,
  index,
  onMint,
}: {
  collection: UserCollection;
  index: number;
  onMint: (col: UserCollection) => void;
}) {
  const imageUrl = collection.imageBlob.getDirectURL();

  return (
    <div
      className="card-glass overflow-hidden group flex flex-col"
      data-ocid={`collections.item.${index}`}
    >
      {/* Artwork */}
      <div className="h-40 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <Badge className="absolute top-3 right-3 badge-primary">
          {collection.symbol}
        </Badge>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-foreground leading-tight">
            {collection.name}
          </h3>
          <Badge
            variant="outline"
            className="text-xs border-primary/20 text-primary bg-primary/5 flex-shrink-0"
          >
            {Number(collection.mintCount)} NFTs
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {collection.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="w-3 h-3" />
          <span>Created {formatDate(collection.createdAt)}</span>
        </div>

        {/* Identifiers */}
        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Collection Identifiers
          </p>
          <IdentifierRow
            label="Mint Authority"
            value={collection.mintAuthority}
            index={index}
            field="mint_authority"
          />
          <IdentifierRow
            label="Collection Mint"
            value={collection.collectionMintAddress}
            index={index}
            field="collection_mint"
          />
          {collection.metadataUri && (
            <IdentifierRow
              label="Metadata URI"
              value={collection.metadataUri}
              index={index}
              field="metadata_uri"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Button
            size="sm"
            onClick={() => onMint(collection)}
            className="flex-1 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
            data-ocid={`collections.mint_button.${index}`}
          >
            <Plus className="w-3 h-3" /> Mint NFT
          </Button>
        </div>
      </div>
    </div>
  );
}

function IdentifierRow({
  label,
  value,
  index,
  field,
}: { label: string; value: string; index: number; field: string }) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-0">
      <span className="text-xs text-muted-foreground flex-shrink-0">
        {label}
      </span>
      <AddressChip
        address={value}
        data-ocid={`collections.${field}.${index}`}
      />
    </div>
  );
}

export default function MyCollectionsPage() {
  const { address, isConnected, connect } = usePhantom();
  const { data: collections, isLoading } = useUserCollections(address);
  const { data: config } = useConfig();

  const [createOpen, setCreateOpen] = useState(false);
  const [mintTarget, setMintTarget] = useState<UserCollection | null>(null);

  const feeSOL = config?.collectionCreationFeeSOL ?? 0.5;
  const escrow = config?.escrowWalletAddress ?? "";

  if (!isConnected) {
    return (
      <div data-ocid="collections.page">
        <EmptyState
          icon={Wallet}
          title="Connect your Phantom wallet"
          description="Connect to view and manage your NFT collections."
          ctaLabel="Connect Wallet"
          onCta={connect}
          data-ocid="collections.wallet_empty_state"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ocid="collections.page">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            My Collections
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create and manage your NFT collections
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          data-ocid="collections.create_collection_button"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonGrid count={3} data-ocid="collections.loading_state" />
      ) : !collections || collections.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No collections yet"
          description="You haven't created any collections yet. Create your first collection and start minting NFTs."
          ctaLabel="Create Collection"
          onCta={() => setCreateOpen(true)}
          data-ocid="collections.empty_state"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((col, i) => (
            <CollectionCard
              key={col.id}
              collection={col}
              index={i + 1}
              onMint={setMintTarget}
            />
          ))}
        </div>
      )}

      {/* Create Collection Modal */}
      <CreateCollectionModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        collectionCreationFeeSOL={feeSOL}
        escrowWalletAddress={escrow}
      />

      {/* Mint NFT Modal */}
      {mintTarget && (
        <MintNftModal
          open={!!mintTarget}
          onOpenChange={(v) => {
            if (!v) setMintTarget(null);
          }}
          collectionId={mintTarget.id}
          collectionName={mintTarget.name}
        />
      )}
    </div>
  );
}
