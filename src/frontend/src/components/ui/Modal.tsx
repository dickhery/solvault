import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  "data-ocid"?: string;
}

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  size = "md",
  "data-ocid": ocid,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full mx-4 bg-card border border-border rounded-xl shadow-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            SIZE_CLASSES[size],
            className,
          )}
          data-ocid={ocid ?? "modal.dialog"}
        >
          {/* Header */}
          {(title || description) && (
            <div className="px-6 pt-6 pb-4 border-b border-border">
              {title && (
                <Dialog.Title className="text-lg font-display font-semibold text-foreground">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-sm text-muted-foreground mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>

          {/* Close button */}
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute right-4 top-4 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close modal"
              data-ocid={ocid ? `${ocid}.close_button` : "modal.close_button"}
            >
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Re-export trigger for convenience
export const ModalTrigger = Dialog.Trigger;
