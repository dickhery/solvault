import { type Collection, ExternalBlob } from "@/backend";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterCollection, useUpdateCollection } from "@/hooks/use-admin";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AddCollectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Collection | null;
}

interface FormState {
  name: string;
  description: string;
  mintAddress: string;
  metadataProgramAddress: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  description: "",
  mintAddress: "",
  metadataProgramAddress: "",
};

export function AddCollectionModal({
  open,
  onOpenChange,
  editing,
}: AddCollectionModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const register = useRegisterCollection();
  const update = useUpdateCollection();
  const isPending = register.isPending || update.isPending;

  useEffect(() => {
    if (open) {
      if (editing) {
        setForm({
          name: editing.name,
          description: editing.description,
          mintAddress: editing.mintAddress,
          metadataProgramAddress: editing.metadataProgramAddress,
        });
        setImagePreview(editing.imageBlob.getDirectURL());
      } else {
        setForm(INITIAL_FORM);
        setImagePreview(null);
      }
      setImageFile(null);
      setUploadProgress(0);
    }
  }, [open, editing]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function setField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.mintAddress.trim() ||
      !form.metadataProgramAddress.trim()
    )
      return;

    let imageBlob: ExternalBlob;
    if (imageFile) {
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );
    } else if (editing) {
      imageBlob = editing.imageBlob;
    } else {
      return;
    }

    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      mintAddress: form.mintAddress.trim(),
      metadataProgramAddress: form.metadataProgramAddress.trim(),
      imageBlob,
    };

    if (editing) {
      update.mutate(
        { id: editing.id, data },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      register.mutate(data, { onSuccess: () => onOpenChange(false) });
    }
  }

  const isFormValid =
    form.name.trim() &&
    form.mintAddress.trim() &&
    form.metadataProgramAddress.trim() &&
    (imageFile || editing?.imageBlob);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? "Edit Collection" : "Add Collection"}
      description={
        editing
          ? "Update collection details below."
          : "Register a new Solana NFT collection in the platform."
      }
      size="lg"
      data-ocid="add-collection.dialog"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div className="space-y-2">
          <Label>
            Collection Image{" "}
            {!editing && <span className="text-destructive">*</span>}
          </Label>
          <div
            className={cn(
              "relative flex items-center justify-center rounded-xl border-2 border-dashed border-border",
              "h-40 overflow-hidden cursor-pointer transition-smooth hover:border-primary/50 group",
              imagePreview ? "border-primary/30" : "",
            )}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) =>
              e.key === "Enter" && fileInputRef.current?.click()
            }
            data-ocid="add-collection.dropzone"
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center rounded-xl">
                  <span className="text-sm text-foreground font-medium">
                    Change image
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImagePlus className="w-8 h-8" />
                <span className="text-sm">Click to upload image</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              data-ocid="add-collection.upload_button"
            />
          </div>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Collection Name */}
        <div className="space-y-1.5">
          <Label htmlFor="col-name">
            Collection Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="col-name"
            placeholder="e.g. DeGods"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            required
            data-ocid="add-collection.name.input"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="col-desc">Description</Label>
          <Textarea
            id="col-desc"
            placeholder="Brief description of the collection..."
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
            data-ocid="add-collection.description.textarea"
          />
        </div>

        {/* Mint Address */}
        <div className="space-y-1.5">
          <Label htmlFor="col-mint">
            Mint Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="col-mint"
            placeholder="Solana collection mint address"
            value={form.mintAddress}
            onChange={(e) => setField("mintAddress", e.target.value)}
            required
            className="font-mono text-sm"
            data-ocid="add-collection.mint_address.input"
          />
        </div>

        {/* Metadata Program Address */}
        <div className="space-y-1.5">
          <Label htmlFor="col-meta">
            Metadata Program Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="col-meta"
            placeholder="Metaplex token metadata program address"
            value={form.metadataProgramAddress}
            onChange={(e) => setField("metadataProgramAddress", e.target.value)}
            required
            className="font-mono text-sm"
            data-ocid="add-collection.metadata_program.input"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="add-collection.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="add-collection.submit_button"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {uploadProgress > 0 && uploadProgress < 100
                  ? `Uploading ${uploadProgress}%…`
                  : "Saving…"}
              </>
            ) : editing ? (
              "Save Changes"
            ) : (
              "Add Collection"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
