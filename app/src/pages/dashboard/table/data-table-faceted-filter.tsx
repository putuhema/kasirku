import {
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Badge,
  MenuGroup,
  Box,
  Menu,
  HStack,
  Flex,
  Text,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import { Column } from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";
type CategoryRes = {
  id: number;
  name: string;
};
interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: CategoryRes[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as number[]);
  return (
    <Menu>
      <MenuButton
        as={Button}
        fontWeight="normal"
        variant="outline"
        leftIcon={<PlusCircleIcon size={20} />}
      >
        <HStack>
          <Text>{title}</Text>
          <Divider orientation="vertical" />
          {selectedValues.size > 2 ? (
            <Badge>{selectedValues.size} selected</Badge>
          ) : (
            options
              .filter((option) => selectedValues.has(option.id))
              .map((option) => <Badge key={option.id}>{option.name}</Badge>)
          )}
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.id);
            return (
              <MenuItem
                key={option.id}
                onClick={() => {
                  if (isSelected) {
                    selectedValues.delete(option.id);
                  } else {
                    selectedValues.add(option.id);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
              >
                <Flex w="full" gap="2" justify="space-between">
                  <HStack>
                    <Checkbox isChecked={isSelected} />
                    <Box>{option.name}</Box>
                  </HStack>
                  {facets?.get(option.id) && <Box>{facets.get(option.id)}</Box>}
                </Flex>
              </MenuItem>
            );
          })}
        </MenuGroup>
        <MenuGroup>
          {selectedValues.size > 0 && (
            <MenuGroup>
              <MenuItem
                as={Button}
                onClick={() => column?.setFilterValue(undefined)}
              >
                Clear Filters
              </MenuItem>
            </MenuGroup>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
