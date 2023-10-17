import Navbar from "@/components/Navbar";
import { Flex } from "@chakra-ui/layout";
import {
  Button,
  VStack,
  Box,
  Stack,
  HStack,
  Text,
  Input,
  Divider,
  FormControl,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { Minus, Plus } from "lucide-react";
import { IoFastFood } from "react-icons/io5";

const Home = () => {
  return (
    <Flex w="full" h="100vh">
      <Flex direction="column" flex={1}>
        <Navbar />
        <VStack>
          <Text>Choose Category</Text>
          <Box border="1px" rounded="lg" boxShadow="md" p="2" minW="100">
            <VStack>
              <Box fontSize="4xl">
                <IoFastFood />
              </Box>
              <Text>Food</Text>
            </VStack>
          </Box>
        </VStack>
      </Flex>
      <Flex align="start" p="4" boxShadow="md" w="450px" bg="white">
        <Stack w="full">
          <Flex w="full" align="center">
            <Text fontWeight="bold" fontSize="xl">
              Order details
            </Text>
            <Spacer />
            <Text color="blackAlpha.600">#442</Text>
          </Flex>
          <Text>Customer Information</Text>
          <form>
            <FormControl>
              <Input placeholder="Customer Name" />
            </FormControl>
          </form>
          <Divider my="2" />
          <Text>Order Details</Text>
          <Box>
            <HStack>
              <Image src="" w="100px" h="100px" rounded="md" />
              <Stack w="full">
                <Text>Crispy Dory Sambal Matah</Text>
                <Flex justify="space-between" w="full">
                  <HStack maxW="100px">
                    <Button>
                      <Minus />
                    </Button>
                    <Input type="text" />
                    <Button>
                      <Plus />
                    </Button>
                  </HStack>
                  <Text>150K</Text>
                </Flex>
              </Stack>
            </HStack>
          </Box>
          <Divider my="2" />
          <Text>Payment Details</Text>
          <Box>Pay With Cash</Box>
          <Box>Qris</Box>
          <Button variant="gradient">Place an order</Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Home;
