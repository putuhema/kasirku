import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Skeleton,
  Stack,
  Flex,
  Text,
  HStack,
  useDisclosure,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import services from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CategoryForm, categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EditCategoryForm from "./EditCategoryForm";
import ConfirmationModal from "./ConfirmationModal";

type CategoryRes = {
  id: number;
  name: string;
};

type ManageCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ManageCategory = ({ isOpen, onClose }: ManageCategoryProps) => {
  const [edit, setEdit] = useState(0);
  const [deleteCategoryLabel, setDeleteCategoryLabel] = useState<CategoryRes>({
    id: 0,
    name: "",
  });
  const {
    isOpen: modalDeleteIsOpen,
    onOpen: modalDeleteOnOpen,
    onClose: modalDeleteOnClose,
  } = useDisclosure();
  const { data: category, isLoading: categoryLoading } = useQuery<
    CategoryRes[]
  >({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await services.get("/category");
      return res.data.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: "",
    },
  });

  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    mutationFn: async (category: CategoryForm) =>
      services.post("/category", category),
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        category: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (values: CategoryForm) => {
    categoryMutation.mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Your Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl isInvalid={!!errors["category"]}>
                <Input
                  borderColor="teal"
                  _hover={{
                    borderColor: "teal",
                  }}
                  {...register("category")}
                  variant="filled"
                />
                <FormErrorMessage>
                  {errors["category"]?.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={categoryMutation.isLoading}
                colorScheme="teal"
                fontWeight="normal"
                variant="outline"
                type="submit"
              >
                Create cew category
              </Button>
            </Stack>
          </form>
          <Flex flexDir="column" w="full" my="6" gap="2">
            {categoryLoading ? (
              <Skeleton />
            ) : (
              category?.map((c) => (
                <Flex flexDir="column" key={c.id} w="full">
                  <Flex
                    w="full"
                    p="2"
                    gap="2"
                    border="1px"
                    borderColor="blackAlpha.200"
                    rounded="md"
                    align="center"
                    justify="space-between"
                  >
                    <HStack>
                      <Text>#{c.id}</Text>
                      <Text>{c.name}</Text>
                    </HStack>
                    <HStack>
                      <Button onClick={() => setEdit(c.id)} colorScheme="teal">
                        <Edit size={20} />
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteCategoryLabel(c);
                          modalDeleteOnOpen();
                        }}
                        variant="outline"
                        colorScheme="red"
                      >
                        <Trash size={20} strokeWidth={1} />
                      </Button>
                    </HStack>
                  </Flex>
                  {edit === c.id && (
                    <EditCategoryForm category={c} onEdit={() => setEdit(-1)} />
                  )}
                </Flex>
              ))
            )}
          </Flex>
        </ModalBody>
        <ConfirmationModal
          category={deleteCategoryLabel}
          isOpen={modalDeleteIsOpen}
          onClose={modalDeleteOnClose}
        />
      </ModalContent>
    </Modal>
  );
};

export default ManageCategory;
