import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import SidebarContent from "@/components/home/SidebarContent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { onClose } = useDisclosure();
  return (
    <Flex h="100vh">
      <SidebarContent onClose={onClose} />
      <Box flex="1" ml="320px">
        <Outlet />
      </Box>
      {/* <Flex border="1px" w="350px"></Flex> */}
    </Flex>
  );
};

export default Layout;
