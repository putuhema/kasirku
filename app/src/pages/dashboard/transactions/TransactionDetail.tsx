import services, { baseURL } from "@/services";
import { formatToIDR } from "@/utils";
import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const TransactionDetail = () => {
  const { id } = useParams();
  const { data: transaction, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const res = await services.get(`/transactions/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) return <Text>loading...</Text>;
  return (
    <Flex w="full">
      <Container
        boxShadow="sm"
        border="1px"
        borderColor="blackAlpha.200"
        p="4"
        w="xl"
        rounded="md"
      >
        <Stack>
          <Flex justify="space-between">
            <Heading fontSize="2xl">Detail Transaction</Heading>
            <Heading fontSize="2xl">#{transaction.id}</Heading>
          </Flex>
          <Text>Costumer Name</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {transaction.costumerName}
          </Text>
          <Divider />
          <HStack>
            <Stack>
              <Text>Transaction Date</Text>
              <Text>{format(new Date(transaction?.createdAt), "P")}</Text>
            </Stack>
            <Stack borderLeft="1px" pl="3" borderColor="blackAlpha.200">
              <Text>Payment</Text>
              <Text>{transaction.paymentMethod}</Text>
            </Stack>
          </HStack>
          <Text fontWeight="bold">Transaction Details</Text>
          {transaction?.TransactionDetailModels.map((order, i) => (
            <Flex direction="column" gap="2" mb="4" w="full" key={order.id}>
              <Text>Item {i + 1}</Text>
              <HStack>
                <Box w="150px" h="100px">
                  <Image
                    rounded="lg"
                    w="full"
                    h="full"
                    objectFit="cover"
                    src={`${baseURL}/${order.ProductsModel.img_url}`}
                  />
                </Box>
                <Flex w="full" direction="column">
                  <Flex w="full" justify="space-between">
                    <Text>Category</Text>
                    <Tag px="4" rounded="full">
                      {order.ProductsModel.CategoryModel.name}
                    </Tag>
                  </Flex>
                  <Flex w="full" justify="space-between">
                    <Text>Product Name</Text>
                    <Text>{order.ProductsModel.name}</Text>
                  </Flex>
                  <Flex w="full" justify="space-between">
                    <Text>Quantity</Text>
                    <Text>
                      {order.quantity}
                      {order.quantity > 1 ? `(items)` : "(item)"}
                    </Text>
                  </Flex>
                  <Flex w="full" justify="space-between">
                    <Text>Price</Text>
                    <Text>{formatToIDR(order.price)}</Text>
                  </Flex>
                </Flex>
              </HStack>
              <Divider />
            </Flex>
          ))}
        </Stack>
      </Container>
    </Flex>
  );
};

export default TransactionDetail;
