import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import Profile from "./Profile";
import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <Box bg={useColorModeValue("white", "gray.900")} px={4}>
      <Flex
        bg={useColorModeValue("white", "gray.900")}
        h={16}
        w="full"
        gap={10}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box flex="1">
          <InputGroup>
            <InputLeftElement>
              <Search />
            </InputLeftElement>
            <Input placeholder="search cat foods" bg="white" />
          </InputGroup>
        </Box>
        <Flex gap={3} alignItems={"center"}>
          <Bell />

          <Profile />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
