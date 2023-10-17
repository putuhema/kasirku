import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import services from "@/services";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import DrawerFormUser from "@/components/DrawerFormUser";
import { PlusIcon } from "lucide-react";

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await services.get("/users?role=cashier");
      return res.data.data;
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isLoading ? (
        <Text>Loading ....</Text>
      ) : (
        <>
          <Button leftIcon={<PlusIcon />} colorScheme="teal" onClick={onOpen}>
            Create user
          </Button>
          <DataTable columns={columns} data={users} />
          <DrawerFormUser isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
};

export default Users;
