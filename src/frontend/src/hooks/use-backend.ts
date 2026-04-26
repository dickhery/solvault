import { useMutation, useQuery } from "@tanstack/react-query";

// Stub hooks — will be wired to real backend once backend methods are implemented
// Backend currently has no methods defined (backendInterface is empty)

export function useRegisterUser(solanaAddress: string) {
  return useMutation({
    mutationFn: async (_addr: string) => {
      // TODO: wire to actor.registerUser(solanaAddress) once backend implements it
      console.log("registerUser called for:", solanaAddress);
      return { role: "user" as const };
    },
  });
}

export function useGetConfig() {
  return useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      // TODO: wire to actor.getConfig() once backend implements it
      return {
        network: "devnet",
        mintFee: 0.1,
        platformFee: 0.025,
      };
    },
    staleTime: 60_000,
  });
}
