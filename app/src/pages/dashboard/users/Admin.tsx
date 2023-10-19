import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "../table/data-table";
import services from "@/services";
import { Text, useDisclosure } from "@chakra-ui/react";
import DrawerFormUser from "@/components/DrawerFormUser";

const Admin = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await services.get("/users?role=admin");
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
          <DataTable
            tableName="users"
            onOpen={onOpen}
            filter="name"
            columns={columns}
            data={users}
          />
          <DrawerFormUser isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
};

export default Admin;
