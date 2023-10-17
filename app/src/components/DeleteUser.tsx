import services from "@/services";
import { Button, MenuItem, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import { FormEvent } from "react";

const DeleteUser = ({ id }: { id: number }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => services.post(`/users/delete/${id}`),
    onSuccess: () => {
      toast({
        title: "Account deleted.",
        description: "Account has been deleted.",
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
      <MenuItem as={Button} type="submit" icon={<Delete width={20} />}>
        Delete
      </MenuItem>
    </form>
  );
};

export default DeleteUser;
