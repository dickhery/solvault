import { ExternalBlob } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { usePhantom } from "@/contexts/phantom-context";
import { useCreateUserCollection } from "@/hooks/use-collections";
import { getPhantomProvider } from "@/lib/phantom-provider";
import { formatSol, getNetworkLabel } from "@/lib/solana";
import { cn } from "@/lib/utils";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { CheckCircle2, ImagePlus, Loader2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | "receipt";

interface CollectionForm {
  name: string;
  symbol: string;
  description: string;
  mintAuthority: string;
  collectionMintAddress: string;
  metadataUri: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionCreationFeeSOL: number;
  collectionPaymentAddress: string;
  solanaRpcUrl: string;
  network: string;
}

function StepIndicator({ current }: { current: number }) {
  const steps = ["Details", "Artwork", "Pay & Create"];
  return (
    <div className="flex items-center gap-2 mb-6">
      {steps.map((label, i) => {
        const num = i + 1;
        const active = current === num;
        const done = current > num;
        return (
          <div
            key={label}
            className="flex items-center gap-2 flex-1 last:flex-none"
          >
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold border transition-colors",
                done
                  ? "bg-accent border-accent text-accent-foreground"
                  : active
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-border text-muted-foreground",
              )}
            >
              {done ? "✓" : num}
            </div>
            <span
              className={cn(
                "text-xs hidden sm:block",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-1",
                  done ? "bg-accent/50" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function CreateCollectionModal({
  open,
  onOpenChange,
  collectionCreationFeeSOL,
  collectionPaymentAddress,
  solanaRpcUrl,
  network,
}: Props) {
  const { address } = usePhantom();
  const createMutation = useCreateUserCollection();

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<CollectionForm>({
    name: "",
    symbol: "",
    description: "",
    mintAuthority: address ?? "",
    collectionMintAddress: "",
    metadataUri: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [receipt, setReceipt] = useState<{
    id: string;
    mintAuthority: string;
    collectionMintAddress: string;
    metadataUri: string;
  } | null>(null);

  const resetModal = () => {
    setStep(1);
    setForm({
      name: "",
      symbol: "",
      description: "",
      mintAuthority: address ?? "",
      collectionMintAddress: "",
      metadataUri: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
    setReceipt(null);
  };

  useEffect(() => {
    if (!address) return;
    setForm((prev) =>
      prev.mintAuthority
        ? prev
        : {
            ...prev,
            mintAuthority: address,
          },
    );
  }, [address]);

  const handleClose = (v: boolean) => {
    if (!v) resetModal();
    onOpenChange(v);
  };

  const handleField =
    (key: keyof CollectionForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const isStep1Valid =
    form.name.trim() &&
    form.symbol.trim() &&
    form.mintAuthority.trim() &&
    form.collectionMintAddress.trim();

  const handleImageSelect = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleImageSelect(file);
    },
    [handleImageSelect],
  );

  const handlePayAndCreate = async () => {
    if (!imageFile || !address) return;
    setIsPaying(true);
    try {
      // Upload image via ExternalBlob
      setIsUploading(true);
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
      setIsUploading(false);

      const solana = getPhantomProvider();
      if (!solana) throw new Error("Phantom not available");
      if (!collectionPaymentAddress.trim()) {
        throw new Error("Collection payment address is not configured yet");
      }

      const lamports = Math.round(collectionCreationFeeSOL * 1e9);
      const connection = new Connection(solanaRpcUrl, "confirmed");
      const fromPubkey = new PublicKey(address);
      const toPubkey = new PublicKey(collectionPaymentAddress);

      const tx = new Transaction().add(
        SystemProgram.transfer({ fromPubkey, toPubkey, lamports }),
      );
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      tx.feePayer = fromPubkey;

      const { signature } = await solana.signAndSendTransaction(tx);
      toast.success("Transaction sent! Waiting for confirmation…");

      // Confirm tx
      await connection.confirmTransaction(signature, "confirmed");

      const collectionInput = {
        name: form.name,
        symbol: form.symbol,
        description: form.description,
        mintAuthority: form.mintAuthority,
        collectionMintAddress: form.collectionMintAddress,
        metadataUri: form.metadataUri,
        imageBlob: blob,
      };

      const created = await createMutation.mutateAsync({
        data: collectionInput,
        txSignature: signature,
      });
      setReceipt({
        id: created.id,
        mintAuthority: created.mintAuthority,
        collectionMintAddress: created.collectionMintAddress,
        metadataUri: created.metadataUri,
      });
      setStep("receipt");
      toast.success("Collection created successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Transaction failed";
      toast.error(msg);
    } finally {
      setIsPaying(false);
      setIsUploading(false);
    }
  };

  const modalTitle =
    step === "receipt" ? "Collection Created!" : "Create Collection";

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title={modalTitle}
      size="lg"
      data-ocid="create_collection.dialog"
    >
      {step !== "receipt" && <StepIndicator current={step as number} />}

      {/* Step 1 — Details */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="cc-name">Collection Name *</Label>
              <Input
                id="cc-name"
                value={form.name}
                onChange={handleField("name")}
                placeholder="My Awesome Collection"
                className="mt-1.5"
                data-ocid="create_collection.name_input"
              />
            </div>
            <div>
              <Label htmlFor="cc-symbol">
                Symbol *{" "}
                <span className="text-muted-foreground text-xs">(max 10)</span>
              </Label>
              <Input
                id="cc-symbol"
                value={form.symbol}
                onChange={handleField("symbol")}
                placeholder="MYCOL"
                maxLength={10}
                className="mt-1.5 font-mono uppercase"
                data-ocid="create_collection.symbol_input"
              />
            </div>
            <div>
              <Label htmlFor="cc-meta">Metadata URI</Label>
              <Input
                id="cc-meta"
                value={form.metadataUri}
                onChange={handleField("metadataUri")}
                placeholder="https://…/metadata.json"
                className="mt-1.5"
                data-ocid="create_collection.metadata_uri_input"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="cc-desc">Description</Label>
              <Textarea
                id="cc-desc"
                value={form.description}
                onChange={handleField("description")}
                placeholder="Describe your collection…"
                rows={2}
                className="mt-1.5 resize-none"
                data-ocid="create_collection.description_input"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="cc-mint-auth">Mint Authority *</Label>
              <Input
                id="cc-mint-auth"
                value={form.mintAuthority}
                onChange={handleField("mintAuthority")}
                placeholder="Solana address"
                className="mt-1.5 font-mono text-sm"
                data-ocid="create_collection.mint_authority_input"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="cc-col-mint">Collection Mint Address *</Label>
              <Input
                id="cc-col-mint"
                value={form.collectionMintAddress}
                onChange={handleField("collectionMintAddress")}
                placeholder="Metaplex collection NFT mint address"
                className="mt-1.5 font-mono text-sm"
                data-ocid="create_collection.collection_mint_input"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              data-ocid="create_collection.step1_next_button"
            >
              Next: Upload Artwork →
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 — Upload Artwork */}
      {step === 2 && (
        <div className="space-y-4">
          <label
            htmlFor="cc-file-input"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors block",
              imagePreview
                ? "border-accent/40 bg-accent/5"
                : "border-border hover:border-primary/40 hover:bg-primary/5",
            )}
            data-ocid="create_collection.dropzone"
          >
            <input
              id="cc-file-input"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageSelect(f);
              }}
              data-ocid="create_collection.upload_button"
            />
            {imagePreview ? (
              <div className="space-y-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto border border-border"
                />
                <p className="text-sm text-accent">{imageFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto">
                  <ImagePlus className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop artwork here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, GIF · max 10MB
                  </p>
                </div>
              </div>
            )}
          </label>
          {isUploading && (
            <div className="space-y-1">
              <Progress value={uploadProgress} className="h-1.5" />
              <p className="text-xs text-muted-foreground text-center">
                Uploading… {uploadProgress}%
              </p>
            </div>
          )}
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              data-ocid="create_collection.step2_back_button"
            >
              ← Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!imageFile}
              data-ocid="create_collection.step2_next_button"
            >
              Next: Pay & Create →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3 — Pay */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Collection Summary
            </h3>
            <div className="flex items-center gap-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover border border-border"
                />
              )}
              <div>
                <p className="font-display font-semibold text-foreground">
                  {form.name}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {form.symbol}
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Collection creation fee
                </span>
                <span className="font-mono font-semibold text-accent">
                  ◎ {formatSol(collectionCreationFeeSOL, 2)} SOL
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="font-mono text-foreground">
                  Solana {getNetworkLabel(network)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {collectionPaymentAddress
                    ? `${collectionPaymentAddress.slice(0, 8)}…${collectionPaymentAddress.slice(-6)}`
                    : "Not configured"}
                </span>
              </div>
            </div>
          </div>
          {!collectionPaymentAddress.trim() && (
            <p className="text-xs text-destructive leading-relaxed">
              The admin has not configured a collection payment wallet yet, so
              collection creation is temporarily unavailable.
            </p>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed">
            Clicking the button below will prompt Phantom to sign a SOL transfer
            of{" "}
            <strong className="text-foreground">
              {formatSol(collectionCreationFeeSOL, 2)} SOL
            </strong>{" "}
            to the admin-configured collection payment wallet. The collection
            will be created immediately after the transaction is confirmed.
          </p>
          <div className="flex justify-between pt-1">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              disabled={isPaying}
              data-ocid="create_collection.step3_back_button"
            >
              ← Back
            </Button>
            <Button
              onClick={handlePayAndCreate}
              disabled={isPaying || !collectionPaymentAddress.trim()}
              className="gap-2"
              data-ocid="create_collection.pay_create_button"
            >
              {isPaying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Pay{" "}
                  {formatSol(collectionCreationFeeSOL, 2)} SOL &amp; Create
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Receipt */}
      {step === "receipt" && receipt && (
        <div className="space-y-5 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-foreground">
              Collection Created!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Your collection is live on the platform. Here are your
              identifiers:
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3 text-left">
            <ReceiptRow label="Collection ID" value={receipt.id} />
            <ReceiptRow label="Mint Authority" value={receipt.mintAuthority} />
            <ReceiptRow
              label="Collection Mint"
              value={receipt.collectionMintAddress}
            />
            {receipt.metadataUri && (
              <ReceiptRow label="Metadata URI" value={receipt.metadataUri} />
            )}
          </div>
          <Button
            onClick={() => handleClose(false)}
            className="w-full"
            data-ocid="create_collection.done_button"
          >
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(`${label} copied`);
  };
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <button
        type="button"
        onClick={copy}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") copy();
        }}
        className="w-full text-left font-mono text-xs bg-background border border-border rounded-md px-3 py-2 text-foreground hover:border-accent/40 transition-colors truncate"
        title={value}
      >
        {copied ? "✓ Copied" : value}
      </button>
    </div>
  );
}
