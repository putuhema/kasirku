import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "./user.localstorage";
import { useAuth } from "./useAuth";

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuth();

  const userId = auth?.data.user.id;

  const onSignOut = useCallback(() => {
    removeUser();
    queryClient.setQueryData(["user"], null);
    queryClient.setQueryData(["user", userId], null);
    navigate("/");
  }, [navigate, queryClient, userId]);

  return onSignOut;
}
