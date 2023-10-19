import services from "@/services";
import { useToast, MenuItem, Button } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import { FormEvent } from "react";

const DeleteProducts = ({ id }: { id: number }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => services.post(`/products/delete/${id}`),
    onSuccess: () => {
      toast({
        title: "Product deleted.",
        description: "Product has been deleted.",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      queryClient.invalidateQueries(["products"]);
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

export default DeleteProducts;
