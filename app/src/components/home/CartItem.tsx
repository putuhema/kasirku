import { baseURL } from "@/services";
import {
  ProductItem,
  changeQty,
  deleteProduct,
  minQty,
  plusQty,
} from "@/services/redux/features/cartSlice";
import { useAppDispatch } from "@/services/redux/hook";
import { formatToIDR } from "@/utils";
import {
  Box,
  HStack,
  Stack,
  Flex,
  Button,
  Input,
  Divider,
  Text,
  Image,
} from "@chakra-ui/react";
import { X, Minus, Plus } from "lucide-react";

const CartItem = ({ cart }: { cart: ProductItem }) => {
  const dispatch = useAppDispatch();
  return (
    <Box key={cart.id}>
      <Box
        py="2"
        cursor="pointer"
        _hover={{ bg: "blackAlpha.50" }}
        rounded="md"
      >
        <HStack>
          <Box w="80px" h="60px">
            <Image
              src={`${baseURL}/${cart.product.imgUrl}`}
              w="full"
              h="full"
              objectFit="cover"
              rounded="md"
            />
          </Box>
          <Stack w="full" spacing={0}>
            <Flex justify="space-between" align="center">
              <Text
                width="150px"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                fontWeight="bold"
                fontSize="md"
              >
                {cart.product.name}
              </Text>
              <Text
                onClick={() => dispatch(deleteProduct(cart.id))}
                color="red.400"
                _hover={{ color: "red.200" }}
                cursor="pointer"
              >
                <X size={20} />
              </Text>
            </Flex>
            <Flex align="center" justify="space-between" w="full">
              <HStack maxW="150px">
                <Button
                  p={3}
                  w="8"
                  h="8"
                  onClick={() => dispatch(minQty(cart.id))}
                >
                  <Minus />
                </Button>
                <Input
                  w="full"
                  textAlign="center"
                  type="number"
                  border="none"
                  onChange={(e) =>
                    dispatch(
                      changeQty({ id: cart.id, qty: Number(e.target.value) })
                    )
                  }
                  value={cart.qty}
                />
                <Button
                  bg="red.400"
                  variant="gradient"
                  rounded="lg"
                  p={3}
                  w="8"
                  h="8"
                  onClick={() => dispatch(plusQty(cart.id))}
                >
                  <Plus />
                </Button>
              </HStack>
              <Text>{formatToIDR(cart.product.price)}</Text>
            </Flex>
          </Stack>
        </HStack>
      </Box>
      <Divider />
    </Box>
  );
};

export default CartItem;
