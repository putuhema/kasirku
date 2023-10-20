import services from "@/services";
import {
  Box,
  Modal,
  ModalOverlay,
  Text,
  ModalContent,
  ModalHeader,
  Flex,
  Button,
  ModalCloseButton,
  ModalBody,
  HStack,
  Grid,
  Select,
  Skeleton,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from "react-icons/tb";
import FilterTag from "./FilterTag";

type CategoryRes = {
  id: number;
  name: string;
};

const FilterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [filter, setFilter] = useState({
    name: "",
    price: "",
    category: "",
  });
  const { data: category, isLoading: categoryLoading } = useQuery<
    CategoryRes[]
  >({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await services.get("/category");
      return res.data.data;
    },
  });
  const [isFetchFilter, setIsFetchFilter] = useState(false);

  const deleteFilter = (key: string) => {
    setFilter({ ...filter, [key]: "" });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" justify="space-between" mt="10">
            <Text>Filters</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="10">
          <Grid templateColumns="repeat(2, 1fr)">
            <Box flex="1">
              <Stack>
                <Box>Name</Box>
                <Box>Price</Box>
                <Box>Category</Box>
              </Stack>
            </Box>
            <Box flex="1">
              <Stack>
                <HStack>
                  <Button onClick={() => setFilter({ ...filter, name: "ASC" })}>
                    <AiOutlineSortAscending />
                  </Button>
                  <Button
                    onClick={() => setFilter({ ...filter, name: "DESC" })}
                  >
                    <AiOutlineSortDescending />
                  </Button>
                </HStack>
                <HStack>
                  <Button
                    onClick={() => setFilter({ ...filter, price: "ASC" })}
                  >
                    <TbSortAscendingNumbers />
                  </Button>
                  <Button
                    onClick={() => setFilter({ ...filter, price: "DESC" })}
                  >
                    <TbSortDescendingNumbers />
                  </Button>
                </HStack>
                {categoryLoading ? (
                  <Skeleton />
                ) : (
                  <Box>
                    <Select
                      onChange={(val) =>
                        setFilter({ ...filter, category: val.target.value })
                      }
                    >
                      {category?.map((cat) => (
                        <option key={cat.id}>{cat.name}</option>
                      ))}
                    </Select>
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
          <Text>Your Filter</Text>
          <HStack>
            {!!filter.name && (
              <FilterTag
                name={filter.name}
                field="name"
                onDelete={deleteFilter}
              />
            )}
            {!!filter.price && (
              <FilterTag
                name={filter.price}
                field="price"
                onDelete={deleteFilter}
              />
            )}
            {!!filter.category && (
              <FilterTag
                name={filter.category}
                field="category"
                onDelete={deleteFilter}
              />
            )}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setIsFetchFilter(!isFetchFilter)}
            variant="outline"
          >
            Apply Filter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
