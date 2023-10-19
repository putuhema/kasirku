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
import {
  searchSelector,
  setSearchTerm,
} from "@/services/redux/features/searchSlice";
import { useAppDispatch, useAppSelector } from "@/services/redux/hook";

const Navbar = () => {
  const { term } = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
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
            <Input
              value={term}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              placeholder="search cat foods"
              bg="white"
            />
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
