import { useAuth } from "@/auth/useAuth";
import services from "@/services";
import {
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

type CategoryRes = {
  id: number;
  name: string;
};
type ConfirmationModalProps = {
  category: CategoryRes;
  isOpen: boolean;
  onClose: () => void;
};

const ConfirmationModal = ({
  category,
  isOpen,
  onClose,
}: ConfirmationModalProps) => {
  const auth = useAuth();
  const accessToken = auth?.data.accessToken as string;
  const queryClient = useQueryClient();
  const [confirmation, setConfirmation] = useState("");
  const isConfirm = confirmation !== `category/${category.name}`;

  const modalMutation = useMutation({
    mutationFn: async () =>
      services.post(
        `/category/delete/${category.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    onSuccess: () => {
      onClose();
      setConfirmation("");
      queryClient.invalidateQueries(["category"]);
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalMutation.mutate();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <Stack>
              <Text
                userSelect="none"
                fontWeight="bold"
              >{`To Confirm, type "category/${category.name}" in the box below`}</Text>
              <Input
                borderColor="red"
                _hover={{
                  borderColor: "red",
                }}
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
              <Button
                isLoading={modalMutation.isLoading}
                type="submit"
                isDisabled={isConfirm}
                colorScheme="red"
              >
                Delete
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
