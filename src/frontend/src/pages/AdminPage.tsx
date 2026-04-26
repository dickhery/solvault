import type { AppConfig, Collection } from "@/backend";
import { AddCollectionModal } from "@/components/admin/AddCollectionModal";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhantom } from "@/contexts/phantom-context";
import {
  useAppConfig,
  useCollections,
  useDeleteCollection,
  useUpdateConfig,
} from "@/hooks/use-admin";
import { truncateAddress } from "@/lib/solana";
import { Link } from "@tanstack/react-router";
import {
  ImageOff,
  Layers,
  LayoutDashboard,
  Loader2,
  Network,
  Pencil,
  Plus,
  Save,
  Settings,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Access Denied ────────────────────────────────────────────────────────────

function AccessDenied() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4"
      data-ocid="admin.access_denied"
    >
      <div className="w-20 h-20 rounded-3xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
        <ShieldAlert className="w-10 h-10 text-destructive/70" />
      </div>
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Access Denied
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          This page is restricted to the platform administrator.
        </p>
      </div>
      <Button asChild variant="outline" data-ocid="admin.back_button">
        <Link to="/">← Back to Portfolio</Link>
      </Button>
    </div>
  );
}

// ─── Collection Row ───────────────────────────────────────────────────────────

function CollectionRow({
  collection,
  index,
  onEdit,
}: {
  collection: Collection;
  index: number;
  onEdit: (c: Collection) => void;
}) {
  const deleteCollection = useDeleteCollection();
  const imgUrl = collection.imageBlob.getDirectURL();
  const createdDate = new Date(
    Number(collection.createdAt) / 1_000_000,
  ).toLocaleDateString();

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border/50 hover:bg-muted/20 transition-colors group"
      data-ocid={`admin.collections.item.${index + 1}`}
    >
      {/* Image + Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden flex-shrink-0">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm truncate">
              {collection.name}
            </p>
            {collection.description && (
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Mint address */}
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="font-mono text-xs badge-primary">
          {truncateAddress(collection.mintAddress)}
        </span>
      </td>

      {/* Metadata program */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="font-mono text-xs text-muted-foreground">
          {truncateAddress(collection.metadataProgramAddress)}
        </span>
      </td>

      {/* Created */}
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="text-xs text-muted-foreground">{createdDate}</span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-smooth"
            onClick={() => onEdit(collection)}
            data-ocid={`admin.collections.edit_button.${index + 1}`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="sr-only">Edit</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-destructive/70 hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
                data-ocid={`admin.collections.delete_button.${index + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="admin.delete.dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Collection</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove{" "}
                  <strong>{collection.name}</strong>? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="admin.delete.cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => deleteCollection.mutate(collection.id)}
                  data-ocid="admin.delete.confirm_button"
                >
                  {deleteCollection.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </motion.tr>
  );
}

// ─── Collections Section ──────────────────────────────────────────────────────

function CollectionsSection() {
  const { data: collections, isLoading } = useCollections();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );

  function handleEdit(c: Collection) {
    setEditingCollection(c);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditingCollection(null);
    setModalOpen(true);
  }

  return (
    <section className="space-y-4" data-ocid="admin.collections.section">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            Registered Collections
          </h2>
          {collections && (
            <Badge variant="secondary" className="font-mono text-xs">
              {collections.length}
            </Badge>
          )}
        </div>
        <Button
          onClick={handleAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          size="sm"
          data-ocid="admin.collections.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Collection
        </Button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {["col-a", "col-b", "col-c"].map((k) => (
              <div key={k} className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : !collections?.length ? (
          <EmptyState
            icon={Layers}
            title="No collections registered"
            description="Add NFT collections to allow users to view and trade them on the platform."
            ctaLabel="Add First Collection"
            onCta={handleAdd}
            className="border-0 rounded-none"
            data-ocid="admin.collections.empty_state"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Collection
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                    Mint Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                    Metadata Program
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {collections.map((col, i) => (
                  <CollectionRow
                    key={col.id}
                    collection={col}
                    index={i}
                    onEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddCollectionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        editing={editingCollection}
      />
    </section>
  );
}

// ─── Config Section ───────────────────────────────────────────────────────────

function ConfigSection() {
  const { data: config, isLoading } = useAppConfig();
  const updateConfig = useUpdateConfig();
  const [draft, setDraft] = useState<AppConfig | null>(null);

  const current = draft ?? config;

  function setField<K extends keyof AppConfig>(key: K, value: AppConfig[K]) {
    setDraft((prev) => ({
      ...(prev ?? config ?? ({} as AppConfig)),
      [key]: value,
    }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!current) return;
    updateConfig.mutate(current, { onSuccess: () => setDraft(null) });
  }

  return (
    <section className="space-y-4" data-ocid="admin.config.section">
      <div className="flex items-center gap-2.5">
        <Settings className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-display font-semibold text-foreground">
          App Configuration
        </h2>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        {isLoading ? (
          <div className="space-y-4">
            {["cfg-a", "cfg-b", "cfg-c", "cfg-d", "cfg-e"].map((k) => (
              <div key={k} className="space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Collection Creation Fee */}
              <div className="space-y-1.5">
                <Label htmlFor="cfg-mint-fee">
                  Collection Creation Fee (SOL)
                </Label>
                <Input
                  id="cfg-mint-fee"
                  type="number"
                  min="0"
                  step="0.001"
                  value={current?.collectionCreationFeeSOL ?? ""}
                  onChange={(e) =>
                    setField(
                      "collectionCreationFeeSOL",
                      Number.parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="0.05"
                  data-ocid="admin.config.collection_fee.input"
                />
              </div>

              {/* Platform Fee % */}
              <div className="space-y-1.5">
                <Label htmlFor="cfg-platform-fee">Platform Fee (%)</Label>
                <Input
                  id="cfg-platform-fee"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={current?.platformFeePercent ?? ""}
                  onChange={(e) =>
                    setField(
                      "platformFeePercent",
                      Number.parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="2.5"
                  data-ocid="admin.config.platform_fee.input"
                />
              </div>
            </div>

            {/* Escrow Wallet */}
            <div className="space-y-1.5">
              <Label htmlFor="cfg-escrow">Escrow Wallet Address</Label>
              <Input
                id="cfg-escrow"
                placeholder="Solana wallet address for escrow"
                value={current?.escrowWalletAddress ?? ""}
                onChange={(e) =>
                  setField("escrowWalletAddress", e.target.value)
                }
                className="font-mono text-sm"
                data-ocid="admin.config.escrow_wallet.input"
              />
            </div>

            {/* RPC URL */}
            <div className="space-y-1.5">
              <Label htmlFor="cfg-rpc">Solana RPC URL</Label>
              <Input
                id="cfg-rpc"
                placeholder="https://api.devnet.solana.com"
                value={current?.solanaRpcUrl ?? ""}
                onChange={(e) => setField("solanaRpcUrl", e.target.value)}
                data-ocid="admin.config.rpc_url.input"
              />
            </div>

            {/* Network */}
            <div className="space-y-1.5">
              <Label>Network</Label>
              <Select
                value={current?.network ?? "devnet"}
                onValueChange={(v) => setField("network", v)}
              >
                <SelectTrigger data-ocid="admin.config.network.select">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devnet">Devnet</SelectItem>
                  <SelectItem value="mainnet-beta">Mainnet Beta</SelectItem>
                  <SelectItem value="testnet">Testnet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={updateConfig.isPending || !draft}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                data-ocid="admin.config.save_button"
              >
                {updateConfig.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Configuration
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const { data: collections } = useCollections();
  const { data: config } = useAppConfig();

  const stats = [
    {
      label: "Registered Collections",
      value: collections?.length ?? "—",
      icon: Layers,
    },
    {
      label: "Active Network",
      value: config?.network ?? "—",
      icon: Network,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4" data-ocid="admin.stats.section">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-glass rounded-xl p-5 flex items-center gap-4"
          data-ocid={`admin.stats.item.${i + 1}`}
        >
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
            <p className="text-xl font-display font-bold text-foreground capitalize">
              {String(s.value)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const { role } = usePhantom();

  if (role !== "admin") return <AccessDenied />;

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-8 space-y-10"
      data-ocid="admin.page"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
          <LayoutDashboard className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Admin Dashboard
            </h1>
            <Badge className="bg-primary/15 text-primary border-primary/25 text-xs font-mono">
              ADMIN
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage NFT collections and app configuration
          </p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <StatsBar />

      {/* Divider */}
      <div className="border-t border-border/50" />

      {/* Collections */}
      <CollectionsSection />

      {/* Divider */}
      <div className="border-t border-border/50" />

      {/* Config */}
      <ConfigSection />
    </div>
  );
}
