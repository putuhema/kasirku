import services from "@/services";
import { Button, MenuItem, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserX2 } from "lucide-react";
import { FormEvent } from "react";

const DisableUser = ({ id }: { id: number }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => services.post(`/users/status/${id}`),
    onSuccess: () => {
      toast({
        title: "Account Status Change.",
        description: "Account has been Changed.",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      queryClient.invalidateQueries(["users"]);
    },
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form onSubmit={onSubmit}>
      <MenuItem as={Button} type="submit" icon={<UserX2 width={20} />}>
        Disable
      </MenuItem>
      ;
    </form>
  );
};

export default DisableUser;
