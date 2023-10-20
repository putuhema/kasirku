import DeleteTransaction from "@/components/DeleteTransaction";
import { Button, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export type Trasaction = {
  id: number;
  costumerName: string;
  paymentMethod: string;
  TransactionDetailModels: {
    id: number;
    quantity: number;
    price: number;
    transactionId: number;
  }[];
};
export const columns: ColumnDef<Trasaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "costumerName",
    header: "Customer Name",
  },
  {
    header: "Orders",
    cell: ({ row }) => {
      const orders = row.original.TransactionDetailModels;
      return <Text>{orders.length} orders</Text>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    id: "action",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <Menu>
          <MenuButton as={Button} p="0">
            ...
          </MenuButton>
          <MenuList>
            <DeleteTransaction id={transaction.id} />
          </MenuList>
        </Menu>
      );
    },
  },
];
