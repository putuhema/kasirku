import { Button, Flex, HStack, Input, useDisclosure } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { X } from "lucide-react";
import ManageCategory from "@/components/dashboard/ManageCategory";

interface DataTableToolbarProps<TData> {
  drawerOpen?: () => void;
  filter?: string;
  tableName: string;
  table: Table<TData>;
}
type CategoryRes = {
  id: number;
  name: string;
};

export function DataTableToolbar<TData>({
  filter,
  drawerOpen,
  tableName,
  table,
}: DataTableToolbarProps<TData>) {
  const { data: category } = useQuery<CategoryRes[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await services.get("/category");
      return res.data.data;
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <Flex gap="2" w="full" my="4" justify="space-between">
      <Flex gap="2">
        <Input
          w="max"
          value={
            (table.getColumn(filter as string)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(filter as string)
              ?.setFilterValue(event.target.value)
          }
          placeholder="Filter Names..."
        />
        {tableName === "products" &&
          category &&
          table.getColumn("categoryId") && (
            <DataTableFacetedFilter
              column={table.getColumn("categoryId")}
              title="Category"
              options={category}
            />
          )}
        {isFiltered && (
          <Button
            variant="outline"
            fontWeight="normal"
            onClick={() => table.resetColumnFilters()}
            rightIcon={<X size={15} />}
          >
            reset
          </Button>
        )}
      </Flex>
      <HStack>
        <ManageCategory isOpen={isOpen} onClose={onClose} />
        {tableName === "products" && (
          <Button onClick={onOpen} variant="outline" fontWeight="normal">
            Manage Category
          </Button>
        )}
        {tableName !== "transactions" && (
          <Button onClick={drawerOpen} variant="outline" fontWeight="normal">
            {tableName === "users" ? "Add User" : "Add Product"}
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
