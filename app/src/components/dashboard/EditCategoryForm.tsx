import { useAuth } from "@/auth/useAuth";
import services from "@/services";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

const EditCategoryForm = ({
  category,
  onEdit,
}: {
  category: { id: number; name: string };
  onEdit: () => void;
}) => {
  const [field, setField] = useState(category.name);
  const auth = useAuth();
  const accessToken = auth?.data.accessToken as string;
  const queryClient = useQueryClient();

  const modalMutation = useMutation({
    mutationFn: async (name: string) =>
      services.post(
        `/category/edit/${category.id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    onSuccess: () => {
      onEdit();
      queryClient.invalidateQueries(["category"]);
      queryClient.invalidateQueries(["products"]);
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalMutation.mutate(field);
  };
  return (
    <Flex w="full" gap="3" p="2">
      <form onSubmit={onSubmit}>
        <Flex flexDir="column" gap="2">
          <Input value={field} onChange={(e) => setField(e.target.value)} />
          <Button type="submit" w="full">
            Edit
          </Button>
        </Flex>
      </form>
      <Button
        variant="outline"
        fontWeight="normal"
        onClick={() => {
          onEdit();
        }}
      >
        cancel
      </Button>
    </Flex>
  );
};

export default EditCategoryForm;
