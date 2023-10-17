import { useTitle } from "@/hooks/useTitle";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import MobileNav from "@/components/MobileNav";
import SidebarContent from "@/components/dashboard/SidebarContent";

const Layout = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  useTitle("Dashboard");
  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box
          bg={useColorModeValue("white", "gray.900")}
          ml={{ base: 0, md: 60 }}
          p="4"
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
