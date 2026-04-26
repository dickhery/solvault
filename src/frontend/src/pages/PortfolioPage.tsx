import { AddressChip } from "@/components/ui/AddressChip";
import { EmptyState } from "@/components/ui/EmptyState";
import { NftCard } from "@/components/ui/NftCard";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { SolAmount } from "@/components/ui/SolAmount";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhantom } from "@/contexts/phantom-context";
import {
  useSolanaBalance,
  useUserCollections,
  useUserNfts,
} from "@/hooks/use-nfts";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  FolderOpen,
  Image,
  LayoutGrid,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  label,
  children,
  ocid,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <div className="card-glass p-5 flex items-center gap-4" data-ocid={ocid}>
      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}

function StatValue({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-2xl font-mono font-semibold text-foreground">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Connect prompt
// ---------------------------------------------------------------------------

function ConnectPrompt({ onConnect }: { onConnect: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center px-4"
      data-ocid="portfolio.connect_prompt"
    >
      {/* Glow orb */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-150" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 border border-primary/30 flex items-center justify-center">
          <Wallet className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="space-y-3 max-w-sm">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Connect your wallet
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          View your NFT portfolio, track SOL balance, and manage your
          collections — all in one place.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          onClick={onConnect}
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-8 shadow-lg hover:opacity-90 transition-opacity"
          data-ocid="portfolio.connect_button"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Phantom
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => window.open("https://phantom.app/", "_blank")}
          className="border-primary/20 text-muted-foreground hover:text-foreground"
          data-ocid="portfolio.get_phantom_button"
        >
          Get Phantom
        </Button>
      </div>

      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        {["Non-custodial", "Solana Devnet", "Secure"].map((f) => (
          <span key={f} className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-accent" />
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function PortfolioPage() {
  const { isConnected, address, connect, role } = usePhantom();
  const navigate = useNavigate();

  const {
    data: nfts = [],
    isLoading: nftsLoading,
    error: nftsError,
  } = useUserNfts(address);

  const { data: solBalance = 0, isLoading: balanceLoading } =
    useSolanaBalance(address);

  const { data: collections = [], isLoading: collectionsLoading } =
    useUserCollections(address);

  if (!isConnected) {
    return <ConnectPrompt onConnect={connect} />;
  }

  // Derived stats
  const estimatedValue = nfts.reduce((sum, n) => sum + (n.price ?? 0), 0);
  const mintedCount = nfts.filter((n) => n.status !== "unlisted").length;
  const uniqueCollections = new Set(nfts.map((n) => n.collectionName)).size;
  const totalCollectionMints = collections.reduce(
    (s, c) => s + Number(c.mintCount),
    0,
  );

  return (
    <div className="space-y-8" data-ocid="portfolio.page">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            My Portfolio
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <AddressChip
              address={address!}
              data-ocid="portfolio.address_chip"
            />
            {role === "admin" && (
              <Badge
                variant="outline"
                className="text-xs border-primary/20 text-primary bg-primary/5"
              >
                Admin
              </Badge>
            )}
            {role === "user" && (
              <Badge
                variant="outline"
                className="text-xs border-accent/20 text-accent bg-accent/5"
              >
                <Briefcase className="w-3 h-3 mr-1" />
                Collector
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate({ to: "/my-collections" })}
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary/10"
            data-ocid="portfolio.view_collections_button"
          >
            <FolderOpen className="w-4 h-4 mr-1.5" />
            My Collections
          </Button>
          <Button
            onClick={() => navigate({ to: "/marketplace" })}
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground"
            data-ocid="portfolio.browse_marketplace_button"
          >
            <LayoutGrid className="w-4 h-4 mr-1.5" />
            Marketplace
          </Button>
        </div>
      </div>

      {/* ── Wallet Overview ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Wallet}
          label="SOL Balance"
          ocid="portfolio.balance_card"
        >
          {balanceLoading ? (
            <Skeleton className="h-8 w-28" />
          ) : (
            <SolAmount sol={solBalance} size="xl" />
          )}
        </StatCard>

        <StatCard
          icon={TrendingUp}
          label="Est. Portfolio Value"
          ocid="portfolio.value_card"
        >
          {nftsLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <SolAmount sol={estimatedValue} size="xl" />
          )}
        </StatCard>

        <StatCard
          icon={Image}
          label="NFTs Owned"
          ocid="portfolio.nfts_count_card"
        >
          {nftsLoading ? (
            <Skeleton className="h-8 w-10" />
          ) : (
            <StatValue>{nfts.length}</StatValue>
          )}
        </StatCard>

        <StatCard
          icon={FolderOpen}
          label="Collections Held"
          ocid="portfolio.collections_count_card"
        >
          {nftsLoading ? (
            <Skeleton className="h-8 w-10" />
          ) : (
            <StatValue>{uniqueCollections}</StatValue>
          )}
        </StatCard>
      </div>

      {/* ── My NFTs ──────────────────────────────────────────────────── */}
      <div data-ocid="portfolio.nfts_section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-foreground">
            My NFTs
          </h2>
          {!nftsLoading && nfts.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {nfts.length} item{nfts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {nftsError && (
          <div
            className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"
            data-ocid="portfolio.nfts_error_state"
          >
            Failed to load NFTs:{" "}
            {nftsError instanceof Error ? nftsError.message : "Unknown error"}
          </div>
        )}

        {nftsLoading ? (
          <div data-ocid="portfolio.nfts_loading_state">
            <SkeletonGrid count={8} />
          </div>
        ) : !nftsError && nfts.length === 0 ? (
          <EmptyState
            icon={Image}
            title="No NFTs yet"
            description="Browse the marketplace to discover NFTs, or mint your own from your collections."
            ctaLabel="Browse Marketplace"
            onCta={() => navigate({ to: "/marketplace" })}
            data-ocid="portfolio.nfts_empty_state"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {nfts.map((nft, i) => (
              <NftCard
                key={nft.mintAddress}
                nft={nft}
                index={i}
                onView={(addr) =>
                  navigate({
                    to: "/nft/$mintAddress",
                    params: { mintAddress: addr },
                  })
                }
                data-ocid={`portfolio.nft_card.item.${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── My Collections Summary ───────────────────────────────────── */}
      <div
        className="card-glass p-6 rounded-xl"
        data-ocid="portfolio.collections_summary"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">
              My Collections
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Collections you've created and minted
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: "/my-collections" })}
            className="border-primary/20 text-primary hover:bg-primary/10"
            data-ocid="portfolio.manage_collections_button"
          >
            Manage
          </Button>
        </div>

        {collectionsLoading ? (
          <div
            className="grid grid-cols-3 gap-4"
            data-ocid="portfolio.collections_loading_state"
          >
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-16 rounded-lg" />
            ))}
          </div>
        ) : collections.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No collections yet"
            description="Create your first NFT collection and start minting."
            ctaLabel="Create Collection"
            onCta={() => navigate({ to: "/my-collections" })}
            className="py-10"
            data-ocid="portfolio.collections_empty_state"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FolderOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Collections</p>
                <p className="text-xl font-mono font-bold text-foreground">
                  {collections.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
              <div className="w-8 h-8 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Mints</p>
                <p className="text-xl font-mono font-bold text-foreground">
                  {totalCollectionMints}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Listed by You</p>
                <p className="text-xl font-mono font-bold text-foreground">
                  {mintedCount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
