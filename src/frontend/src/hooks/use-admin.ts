import {
  type AppConfig,
  type Collection,
  type CollectionInput,
  ExternalBlob,
  createActor,
} from "@/backend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ─── Actor singleton ──────────────────────────────────────────────────────────

declare const process: { env: Record<string, string | undefined> };

function getActor() {
  const canisterId =
    (typeof process !== "undefined" && process.env.CANISTER_ID_BACKEND) || "";
  if (!canisterId) return null;

  const storageGatewayUrl =
    (typeof process !== "undefined" && process.env.STORAGE_GATEWAY_URL) ||
    "https://blob.caffeine.ai";

  const uploadFile = async (blob: ExternalBlob): Promise<Uint8Array> => {
    const bytes = await blob.getBytes();
    const res = await fetch(`${storageGatewayUrl}/upload`, {
      method: "POST",
      body: bytes,
    });
    if (!res.ok) throw new Error("Upload failed");
    return new Uint8Array(await res.arrayBuffer());
  };

  const downloadFile = async (hash: Uint8Array): Promise<ExternalBlob> => {
    const hexHash = Array.from(hash)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return ExternalBlob.fromURL(`${storageGatewayUrl}/blob/${hexHash}`);
  };

  return createActor(canisterId, uploadFile, downloadFile);
}

// ─── Collections ─────────────────────────────────────────────────────────────

export function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return [];
      return actor.getCollections();
    },
    staleTime: 30_000,
  });
}

export function useRegisterCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CollectionInput) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      return actor.registerCollection(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection registered successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to register collection");
    },
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CollectionInput }) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.updateCollection(id, data);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection updated successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to update collection");
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.deleteCollection(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success("Collection deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to delete collection");
    },
  });
}

// ─── App Config ───────────────────────────────────────────────────────────────

export function useAppConfig() {
  return useQuery<AppConfig | null>({
    queryKey: ["appConfig"],
    queryFn: async () => {
      const actor = getActor();
      if (!actor) return null;
      return actor.getConfig();
    },
    staleTime: 60_000,
  });
}

export function useUpdateConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: AppConfig) => {
      const actor = getActor();
      if (!actor) throw new Error("Backend not available");
      const result = await actor.updateConfig(config);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
      toast.success("Configuration saved");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to save configuration");
    },
  });
}
