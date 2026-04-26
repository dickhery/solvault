import type { AppConfig, Collection, CollectionInput } from "@/backend";
import {
  getBackendMutationActor,
  getBackendQueryActor,
} from "@/lib/backend-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ─── Collections ─────────────────────────────────────────────────────────────

export function useCollections() {
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      const actor = getBackendQueryActor();
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
      const actor = getBackendMutationActor();
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
      const actor = getBackendMutationActor();
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
      const actor = getBackendMutationActor();
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
      const actor = getBackendQueryActor();
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
      const actor = getBackendMutationActor();
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
