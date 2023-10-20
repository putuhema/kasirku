import Navbar from "@/components/Navbar";
import Product from "@/components/home/Product";
import { Flex, Grid } from "@chakra-ui/layout";
import {
  Button,
  Stack,
  Text,
  useDisclosure,
  HStack,
  Center,
  Skeleton,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { Product as ProductData } from "@/services/redux/features/cartSlice";
import Cart from "@/components/home/Cart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterModal from "@/components/home/FilterModal";
import { useAppSelector } from "@/services/redux/hook";
import { searchSelector } from "@/services/redux/features/searchSlice";
import { useDebounce } from "use-debounce";

type CategoryRes = {
  id: number;
  name: string;
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const currentPage = Number(searchParams.get("page"));
  const navigate = useNavigate();
  const { isOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState({
    name: "ASC",
    price: "ASC",
  });

  const { term: searchTerm } = useAppSelector(searchSelector);
  const [debounceSearchTerm] = useDebounce(searchTerm, 500);

  const { data: products, isLoading } = useQuery({
    queryKey: [
      "products",
      currentPage,
      category,
      sort.name,
      sort.price,
      debounceSearchTerm,
    ],
    queryFn: async () => {
      const res = await services.get(`/products/page/${currentPage}`, {
        params: {
          category: category,
          name: sort.name,
          price: sort.price,
          search: debounceSearchTerm,
        },
      });
      return res.data.data as ProductData[];
    },
    enabled: Boolean(currentPage) || Boolean(category),
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery<
    CategoryRes[]
  >({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await services.get("/category");
      return res.data.data;
    },
  });

  useEffect(() => {
    if (currentPage < 1) {
      return navigate("/home?page=1");
    }
  }, [currentPage, navigate]);

  const currentCategory = categoryData?.filter(
    (c) => c.id === Number(category)
  )[0];
  return (
    <Flex w="full" h="100vh" zIndex={3}>
      <FilterModal isOpen={isOpen} onClose={onClose} />
      <Flex direction="column" flex={1} mr={{ base: "20px", lg: "350px" }}>
        <Navbar />
        <Stack p="4">
          <Flex justify="space-between" align="center">
            <HStack>
              <Text>Show Menus</Text>
              {categoryLoading ? (
                <Skeleton />
              ) : (
                !!category &&
                currentCategory && (
                  <Tag>
                    <TagLabel>{currentCategory?.name}</TagLabel>
                    <TagCloseButton onClick={() => setCategory("")} />
                  </Tag>
                )
              )}
              {!!sort.name && (
                <Tag>
                  <TagLabel>Name {sort.name}</TagLabel>
                  <TagCloseButton
                    onClick={() => setSort({ ...sort, name: "" })}
                  />
                </Tag>
              )}
              {!!sort.price && (
                <Tag>
                  <TagLabel>Price {sort.price}</TagLabel>
                  <TagCloseButton
                    onClick={() => setSort({ ...sort, price: "" })}
                  />
                </Tag>
              )}
            </HStack>
            <HStack>
              <HStack>
                <Text>Category</Text>
                <Select
                  value={category}
                  placeholder="pick a category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryData?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </HStack>
              <Button
                onClick={() =>
                  setSort({
                    ...sort,
                    price: sort.price === "ASC" ? "DESC" : "ASC",
                  })
                }
              >
                {sort.price === "ASC" ? (
                  <TbSortAscendingNumbers />
                ) : (
                  <TbSortDescendingNumbers />
                )}
              </Button>
              <Button
                onClick={() =>
                  setSort({
                    ...sort,
                    name: sort.name === "ASC" ? "DESC" : "ASC",
                  })
                }
              >
                {sort.name === "ASC" ? (
                  <AiOutlineSortAscending />
                ) : (
                  <AiOutlineSortDescending />
                )}
              </Button>
            </HStack>
          </Flex>
          {isLoading ? (
            <Grid></Grid>
          ) : (
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {products?.map((prod) => (
                <Product key={prod.name} products={prod} />
              ))}
            </Grid>
          )}
          {isLoading ? (
            <Skeleton />
          ) : (
            <Center my="10">
              <HStack spacing={0}>
                <Button
                  bg="red.400"
                  w="40px"
                  p="0"
                  roundedLeft="md"
                  roundedRight="none"
                  isDisabled={currentPage === 1}
                  onClick={() =>
                    setSearchParams((params) => {
                      params.set("page", String(currentPage - 1));
                      return params;
                    })
                  }
                >
                  <ChevronLeft />
                </Button>
                <Button
                  bg="red.400"
                  w="40px"
                  p="0"
                  roundedLeft="none"
                  roundedRight="md"
                  isDisabled={
                    products !== undefined ? products.length < 10 : false
                  }
                  onClick={() =>
                    setSearchParams((params) => {
                      params.set("page", String(currentPage + 1));
                      return params;
                    })
                  }
                >
                  <ChevronRight />
                </Button>
              </HStack>
            </Center>
          )}
        </Stack>
      </Flex>
      <Flex
        align="start"
        p="4"
        boxShadow="md"
        pos="fixed"
        right={0}
        top={0}
        w="350px"
        h="100vh"
        bg="white"
        overflowY="auto"
      >
        <Stack w="full">
          <Cart />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Home;
