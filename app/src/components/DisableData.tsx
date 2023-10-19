import services from "@/services";
import { Button, MenuItem, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserCheck2, UserX2 } from "lucide-react";
import { FormEvent } from "react";

type DisableDataProps = {
  url: string;
  state: boolean;
  invalidate: string;
  toastTitle?: string;
  toastDescription?: string;
};
const DisableData = ({
  url,
  invalidate,
  state,
  toastTitle,
  toastDescription,
}: DisableDataProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => services.post(url),
    onSuccess: () => {
      toast({
        title: toastTitle ? toastTitle : "Success",
        description: toastDescription
          ? toastDescription
          : "Action successfully performed",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      queryClient.invalidateQueries([invalidate]);
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form onSubmit={onSubmit}>
      <MenuItem
        as={Button}
        type="submit"
        icon={!state ? <UserCheck2 width={20} /> : <UserX2 size={20} />}
      >
        {state ? "Disabled" : "Activated"}
      </MenuItem>
    </form>
  );
};

export default DisableData;
