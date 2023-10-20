import { baseURL } from "@/services";
import { Badge, Box, Button, Image, Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ArrowUpDown, UserCog } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { formatToIDR } from "@/utils";
import DeleteProducts from "@/components/DeleteProducts";
import DisableData from "@/components/DisableData";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imgUrl: string;
  status: string;
  categoryId: number;
  CategoryModel: {
    id: number;
    name: string;
  };
};
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
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
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Box w="60px" h="60px">
          <Image
            rounded="md"
            w="full"
            h="full"
            objectFit="cover"
            src={`${baseURL}/${row.getValue("imgUrl")}`}
          />
        </Box>
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
          Product Name
          <Box ml="2">
            <ArrowUpDown size={16} />
          </Box>
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    cell: ({ row }) => {
      return <Text>{formatToIDR(row.getValue("price"))}</Text>;
    },
    header: ({ column }) => {
      return (
        <Button
          fontSize="sm"
          fontWeight="normal"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <Box ml="2">
            <ArrowUpDown size={16} />
          </Box>
        </Button>
      );
    },
  },
  {
    accessorKey: "stock",
    cell: ({ row }) => {
      return <Text textAlign="center">{row.getValue("stock")}</Text>;
    },
    header: ({ column }) => {
      return (
        <Button
          fontSize="sm"
          fontWeight="normal"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <Box ml="2">
            <ArrowUpDown size={16} />
          </Box>
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <Text
          w="180px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {row.getValue("description")}
        </Text>
      );
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category ID",
    cell: ({ row }) => {
      const products = row.original;
      return products.categoryId ? (
        <Text>{products.CategoryModel.name}</Text>
      ) : null;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Menu>
          <MenuButton as={Button} p="0">
            ...
          </MenuButton>
          <MenuList>
            <Link to={`/dashboard/products/edit/${product.id}`}>
              <MenuItem as={Button} icon={<UserCog width={20} />}>
                Edit
              </MenuItem>
            </Link>

            <DisableData
              state={product.status === "active"}
              url={`/products/status/${product.id}`}
              invalidate="products"
              toastTitle="Product Status Change"
              toastDescription="Successfully change product status"
            />
            <MenuDivider />
            <DeleteProducts id={product.id} />
          </MenuList>
        </Menu>
      );
    },
  },
];
