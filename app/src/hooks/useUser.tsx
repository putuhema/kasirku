import { useAuth } from "@/auth/useAuth";
import services from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  imgUrl: string;
}

export const useUser = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const userId = auth?.data.user.id;
  const accessToken = auth?.data.accessToken;
  const { data: user } = useQuery<User | null>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const cache = queryClient.getQueryData(["user", Number(userId)]);
      if (cache) {
        return cache;
      }

      const res = await services.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data.data;
    },
    enabled: !!userId,
  });

  return { user };
};
