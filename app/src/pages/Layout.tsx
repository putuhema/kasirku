import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import SidebarContent from "@/components/home/SidebarContent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { onClose } = useDisclosure();
  return (
    <Flex h="100vh">
      <SidebarContent onClose={onClose} />
      <Box flex="1" ml={{ base: "65px", lg: "200px" }}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
