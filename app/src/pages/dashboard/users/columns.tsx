import { baseURL } from "@/services";
import { Avatar, Badge, Box, Button, Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ArrowUpDown, UserCog } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import DeleteUser from "@/components/DeleteUser";
import { Link } from "react-router-dom";
import DisableUser from "@/components/DisableUser";

export type User = {
  id: number;
  name: string;
  role: string;
  status: string;
  username: string;
  email: string;
  phone: string;
  imgUrl: string;
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "imgUrl",
    header: "Profile",
    cell: ({ row }) => {
      return (
        <Avatar
          w="8"
          h="8"
          src={`${baseURL}/${row.getValue("imgUrl")}`}
          name={row.getValue("username")}
        />
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      const superAdmin = row.getValue("id") === 1 && role === "admin";
      return (
        <Badge
          rounded="full"
          px="4"
          colorScheme={role === "admin" ? "orange" : "teal"}
        >
          {`${superAdmin ? "super " : ""}${role}`}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          rounded="full"
          px="4"
          colorScheme={status === "active" ? "teal" : "red"}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          fontSize="sm"
          fontWeight="normal"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <Box ml="2">
            <ArrowUpDown size={16} />
          </Box>
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return <Text>@{row.getValue("username")}</Text>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Menu>
          <MenuButton as={Button} p="0">
            ...
          </MenuButton>
          <MenuList>
            <Link to={`/dashboard/users/edit/${user.id}`}>
              <MenuItem as={Button} icon={<UserCog width={20} />}>
                Edit
              </MenuItem>
            </Link>

            <DisableUser id={user.id} />
            <MenuDivider />
            <DeleteUser id={user.id} />
          </MenuList>
        </Menu>
      );
    },
  },
];
