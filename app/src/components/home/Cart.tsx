import services from "@/services";
import { cartSelector, emptyCart } from "@/services/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/services/redux/hook";
import { formatToIDR } from "@/utils";
import {
  Flex,
  Spacer,
  FormControl,
  Input,
  Divider,
  Stack,
  Button,
  Text,
  Box,
  Grid,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BsCreditCard2Front, BsQrCode } from "react-icons/bs";
import Payment from "../Payment";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CartItem from "./CartItem";

type Order = {
  productId: number;
  quantity: number;
  price: number;
};
type TransactionMutation = {
  name: string;
  orders: Order[];
  payment: string;
};

const orderSchema = z.object({
  name: z.string().min(2, "Customer name is empty"),
});

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(cartSelector);
  const totalItems = cart.reduce((prev, curr) => prev + curr.qty, 0);
  const subTotal = cart.reduce(
    (prev, curr) => prev + curr.product.price * curr.qty,
    0
  );
  const tax = subTotal * 0.1;

  const [payment, setPayment] = useState("Cash");

  const queryClient = useQueryClient();
  const transactionMutation = useMutation({
    mutationFn: async (transaction: TransactionMutation) =>
      services.post("/transactions", transaction),
    onSuccess: () => {
      setPayment("");
      dispatch(emptyCart());
      queryClient.invalidateQueries(["transactions/today"]);
    },
  });

  const orderForm = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (orderForm.formState.isSubmitSuccessful) {
      orderForm.reset({
        name: "",
      });
    }
  }, [orderForm.formState.isSubmitSuccessful, orderForm]);

  const onSubmit = (values: z.infer<typeof orderSchema>) => {
    transactionMutation.mutate({
      payment,
      name: values.name,
      orders: cart.map((c) => ({
        productId: c.id,
        price: c.product.price,
        quantity: c.qty,
      })),
    });
  };

  return (
    <Flex direction="column" h="full">
      <Flex mb="10" w="full" align="center" zIndex="popover" h="full">
        <Text fontWeight="bold" fontSize="xl">
          Order details
        </Text>
        <Spacer />
        <Text color="blackAlpha.600">#442</Text>
      </Flex>
      <Text>Customer Information</Text>
      <form id="customer-name" onSubmit={orderForm.handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!orderForm.formState.errors["name"]}>
          <FormLabel htmlFor="name">Customer Name</FormLabel>
          <Input
            {...orderForm.register("name")}
            id="name"
            placeholder="Customer Name"
          />
          <FormErrorMessage>
            {orderForm.formState.errors["name"]?.message}
          </FormErrorMessage>
        </FormControl>
      </form>
      <Divider my="2" />
      <Stack w="full">
        {cart.length > 0 ? (
          <>
            <Flex align="center" justify="space-between">
              <Text>Order Details</Text>
              <Button variant="ghost" onClick={() => dispatch(emptyCart())}>
                clear
              </Button>
            </Flex>
          </>
        ) : (
          <Text align="center" my="4">
            no items
          </Text>
        )}
      </Stack>
      <Stack>
        {cart.map((c) => (
          <CartItem key={c.id} cart={c} />
        ))}
      </Stack>
      {cart.length > 0 && (
        <>
          <Text>Payment Details</Text>
          <Stack>
            <Flex justify="space-between">
              <Text>Item</Text>
              <Text>
                {totalItems}
                {totalItems > 1 ? "(items)" : "(item)"}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Subtotal</Text>
              <Text>{formatToIDR(subTotal)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Tax(10%)</Text>
              <Text>{formatToIDR(tax)}</Text>
            </Flex>
          </Stack>
          <Box borderBottom="1px" my="2" borderStyle="dashed" />
          <Flex my="2" justify="space-between">
            <Text fontWeight="bold">Total</Text>
            <Text color="red.400" fontWeight="bold" fontSize="xl">
              {formatToIDR(subTotal + tax)}
            </Text>
          </Flex>
          <Divider my="2" />
        </>
      )}
      {cart.length > 0 && (
        <>
          <Text my="2">Payment Method</Text>
          <Grid
            templateColumns="repeat(3, 1fr)"
            w="full"
            justifyItems="stretch"
            justifyContent="space-around"
            gap="4"
          >
            <Payment payment={payment} setPayment={setPayment} title="Cash">
              <LiaMoneyBillWaveSolid />
            </Payment>
            <Payment payment={payment} setPayment={setPayment} title="Debit">
              <BsCreditCard2Front />
            </Payment>
            <Payment payment={payment} setPayment={setPayment} title="Qris">
              <BsQrCode />
            </Payment>
          </Grid>
        </>
      )}
      <Button
        isLoading={transactionMutation.isLoading}
        isDisabled={cart.length <= 0}
        position="relative"
        bottom="0"
        type="submit"
        form="customer-name"
        my="12"
        rounded="full"
        color="white"
        bg="red.400"
      >
        Place an order
      </Button>
    </Flex>
  );
};

export default Cart;
