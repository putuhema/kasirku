import services from "@/services";
import { useMutation } from "@tanstack/react-query";

export function usePost<T>(route: string) {
  const mutation = useMutation({
    mutationFn: async (data: T) => services.post(route, data),
  });

  return mutation;
}
