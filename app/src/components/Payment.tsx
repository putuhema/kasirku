import { Text, Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

const Payment = ({
  title,
  payment,
  setPayment,
  children,
}: {
  title: string;
  payment: string;
  setPayment: (payment: string) => void;
  children: ReactNode;
}) => {
  return (
    <Grid
      onClick={() => setPayment(title)}
      placeContent="center"
      border="1px"
      borderColor="red.400"
      rounded="xl"
      transition="300ms ease"
      cursor="pointer"
      bg={payment === title ? "red.100" : "white"}
      _hover={{ bg: "blackAlpha.50" }}
      fontWeight="bold"
      fontSize="sm"
      h="80px"
      w="full"
    >
      <Grid placeContent="center" color="red.400">
        <Text fontSize="4xl">{children}</Text>
        <Text>{title}</Text>
      </Grid>
    </Grid>
  );
};

export default Payment;
