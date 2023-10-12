import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "./user.localstorage";

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = useCallback(() => {
    removeUser();
    queryClient.setQueryData(["user"], null);
    navigate("/");
  }, [navigate, queryClient]);

  return onSignOut;
}
