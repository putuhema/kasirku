import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import * as userLocalStorage from "./user.localstorage";
import { ResponseError } from "@/utils/Errors/ResponseError";
import services from "@/services";

async function getUser(user: User | null | undefined): Promise<User | null> {
  if (!user) return null;
  const response = await services.get(`/auth/verify`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  if (response.status !== 200)
    throw new ResponseError("Failed on get user request", response.request);
  return await response.data;
}

export interface User {
  accessToken: string;
  user: {
    role: string;
    id: number;
  };
}

interface IUseUser {
  user: User | null;
}

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>(
    ["user"],
    async (): Promise<User | null> => getUser(user),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser,
      onError: () => {
        userLocalStorage.removeUser();
      },
    }
  );

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
}
