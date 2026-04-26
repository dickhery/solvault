import { ExternalBlob } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddNftToUserCollection } from "@/hooks/use-collections";
import { cn } from "@/lib/utils";
import { CheckCircle2, ImagePlus, Loader2, Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string;
  collectionName: string;
}

interface Attribute {
  id: number;
  key: string;
  value: string;
}

interface MintForm {
  name: string;
  description: string;
  mintAddress: string;
}

export function MintNftModal({
  open,
  onOpenChange,
  collectionId,
  collectionName,
}: Props) {
  const mintMutation = useAddNftToUserCollection();

  const [form, setForm] = useState<MintForm>({
    name: "",
    description: "",
    mintAddress: "",
  });
  const [attributes, setAttributes] = useState<Attribute[]>([
    { id: 1, key: "", value: "" },
  ]);
  const attrIdRef = useRef(2);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedAddress, setMintedAddress] = useState<string | null>(null);

  const resetModal = () => {
    setForm({ name: "", description: "", mintAddress: "" });
    setAttributes([{ id: 1, key: "", value: "" }]);
    attrIdRef.current = 2;
    setImageFile(null);
    setImagePreview(null);
    setMintedAddress(null);
  };

  const handleClose = (v: boolean) => {
    if (!v) resetModal();
    onOpenChange(v);
  };

  const handleField =
    (key: keyof MintForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleImageSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const addAttr = () => {
    setAttributes((prev) => [
      ...prev,
      { id: attrIdRef.current++, key: "", value: "" },
    ]);
  };
  const removeAttr = (i: number) =>
    setAttributes((prev) => prev.filter((_, idx) => idx !== i));
  const updateAttr = (i: number, field: "key" | "value", v: string) => {
    setAttributes((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, [field]: v } : a)),
    );
  };

  const isValid = form.name.trim() && form.mintAddress.trim() && imageFile;

  const handleMint = async () => {
    if (!isValid) return;
    setIsMinting(true);
    try {
      const bytes = new Uint8Array(await imageFile!.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);

      const validAttrs = attributes
        .filter((a) => a.key.trim() && a.value.trim())
        .map((a) => [a.key.trim(), a.value.trim()] as [string, string]);

      const nftInput = {
        collectionId,
        name: form.name.trim(),
        description: form.description.trim(),
        mintAddress: form.mintAddress.trim(),
        attributes: validAttrs,
        imageBlob: blob,
      };

      const result = await mintMutation.mutateAsync({
        collectionId,
        nft: nftInput,
      });
      setMintedAddress(result.mintAddress);
      toast.success("NFT registered successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Minting failed");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title={mintedAddress ? "NFT Registered!" : `Mint NFT — ${collectionName}`}
      size="lg"
      data-ocid="mint_nft.dialog"
    >
      {mintedAddress ? (
        // Success state
        <div className="space-y-5 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-foreground">
              NFT Registered!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Your NFT is now part of the collection.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-4 text-left space-y-2">
            <p className="text-xs text-muted-foreground">Mint Address</p>
            <p className="font-mono text-xs text-foreground break-all">
              {mintedAddress}
            </p>
          </div>
          <Button
            onClick={() => handleClose(false)}
            className="w-full"
            data-ocid="mint_nft.done_button"
          >
            View Collection
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Instructions banner */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">How it works:</strong> Use your
            Solana wallet (e.g. Phantom) to mint this NFT on Metaplex, then
            enter the mint address below to register it here. The platform
            stores your NFT record — no on-chain minting happens through this
            form.
          </div>

          {/* Image Upload */}
          <div>
            <Label className="mb-2 block">NFT Image *</Label>
            <label
              htmlFor="mint-nft-file"
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files[0];
                if (f) handleImageSelect(f);
              }}
              onDragOver={(e) => e.preventDefault()}
              className={cn(
                "flex items-center gap-4 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors",
                imagePreview
                  ? "border-accent/40 bg-accent/5"
                  : "border-border hover:border-primary/40 hover:bg-primary/5",
              )}
              data-ocid="mint_nft.dropzone"
            >
              <input
                id="mint-nft-file"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageSelect(f);
                }}
                data-ocid="mint_nft.upload_button"
              />
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover border border-border flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-accent truncate">
                      {imageFile?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Click to replace
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center flex-shrink-0">
                    <ImagePlus className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      Click or drag to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, GIF · max 10MB
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>

          {/* NFT Name */}
          <div>
            <Label htmlFor="mint-name">NFT Name *</Label>
            <Input
              id="mint-name"
              value={form.name}
              onChange={handleField("name")}
              placeholder="My Awesome NFT #1"
              className="mt-1.5"
              data-ocid="mint_nft.name_input"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="mint-desc">Description</Label>
            <Textarea
              id="mint-desc"
              value={form.description}
              onChange={handleField("description")}
              placeholder="Describe this NFT…"
              rows={2}
              className="mt-1.5 resize-none"
              data-ocid="mint_nft.description_input"
            />
          </div>

          {/* Mint Address */}
          <div>
            <Label htmlFor="mint-addr">
              Mint Address *{" "}
              <span className="text-muted-foreground text-xs">
                (from Metaplex)
              </span>
            </Label>
            <Input
              id="mint-addr"
              value={form.mintAddress}
              onChange={handleField("mintAddress")}
              placeholder="Solana NFT mint address"
              className="mt-1.5 font-mono text-sm"
              data-ocid="mint_nft.mint_address_input"
            />
          </div>

          {/* Attributes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Attributes</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addAttr}
                className="h-7 px-2 text-xs gap-1"
                data-ocid="mint_nft.add_attribute_button"
              >
                <Plus className="w-3 h-3" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {attributes.map((attr, i) => (
                <div
                  key={attr.id}
                  className="flex gap-2 items-center"
                  data-ocid={`mint_nft.attribute.${i + 1}`}
                >
                  <Input
                    value={attr.key}
                    onChange={(e) => updateAttr(i, "key", e.target.value)}
                    placeholder="Trait"
                    className="text-xs h-8"
                    data-ocid={`mint_nft.attribute_key.${i + 1}`}
                  />
                  <Input
                    value={attr.value}
                    onChange={(e) => updateAttr(i, "value", e.target.value)}
                    placeholder="Value"
                    className="text-xs h-8"
                    data-ocid={`mint_nft.attribute_value.${i + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeAttr(i)}
                    className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
                    disabled={attributes.length === 1}
                    data-ocid={`mint_nft.remove_attribute.${i + 1}`}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isMinting}
              className="flex-1"
              data-ocid="mint_nft.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleMint}
              disabled={!isValid || isMinting}
              className="flex-1 gap-2"
              data-ocid="mint_nft.submit_button"
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Registering…
                </>
              ) : (
                "Register NFT"
              )}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
