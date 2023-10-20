import services from "@/services";
import { useToast, MenuItem, Button } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import { FormEvent } from "react";

const DeleteTransaction = ({ id }: { id: number }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => services.post(`/transactions/delete/${id}`),
    onSuccess: () => {
      toast({
        title: "Transaction deleted.",
        description: "Transaction has been deleted.",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      queryClient.invalidateQueries(["transactions"]);
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

export default DeleteTransaction;
