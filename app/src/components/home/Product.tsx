import { baseURL } from "@/services";
import {
  Product as ProductData,
  addProduct,
} from "@/services/redux/features/cartSlice";
import { useAppDispatch } from "@/services/redux/hook";
import {
  Box,
  Center,
  useColorModeValue,
  Image,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react";

const Product = ({ products }: { products: ProductData }) => {
  const dispatch = useAppDispatch();
  const handleAddProduct = () => {
    dispatch(
      addProduct({
        id: products.id,
        product: products,
        qty: 1,
      })
    );
  };
  return (
    <Center zIndex="base">
      <Box
        cursor="pointer"
        onClick={handleAddProduct}
        role={"group"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="sm"
        border="1px"
        borderColor="blackAlpha.200"
        _hover={{
          boxShadow: "md",
        }}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Stack>
          <Image
            roundedTop={"lg"}
            width="full"
            height="150px"
            objectFit="cover"
            src={`${baseURL}/${products.imgUrl}`}
            alt={products.name}
          />
          <Stack px={4} pb={4}>
            <Stack w="full" spacing={0}>
              <Text fontWeight="bold" fontSize="lg" textAlign="start">
                {products.name}
              </Text>
              <HStack color="blackAlpha.600" fontSize="xs">
                <Text>{products.stock} Avaiable</Text>
                <Text>0 sold</Text>
              </HStack>
              <Text fontSize="lg" fontWeight="bold">
                Rp. {products.price}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default Product;
