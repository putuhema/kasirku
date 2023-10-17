import {
  Text,
  Box,
  BoxProps,
  CloseButton,
  Flex,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import NavItem from "./NavItem";
import { FiHome, FiTrendingUp, FiCompass, FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { GiCat } from "react-icons/gi";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, route: "/dashboard" },
  { name: "Products", icon: GiCat, route: "/dashboard/products" },
  {
    name: "Transactions",
    icon: FiTrendingUp,
    route: "/dashboard/transactions",
  },
  { name: "Reports", icon: FiCompass, route: "/dashboard/reports" },
];

const UserLinkItems: Array<LinkItemProps> = [
  { name: "Cashier", icon: FiUser, route: "/dashboard/users/cashier" },
  { name: "Admin", icon: FiUser, route: "/dashboard/users/admin" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { pathname } = useLocation();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          route={link.route}
          active={link.route === pathname}
        >
          {link.name}
        </NavItem>
      ))}
      <Stack ml="6">
        <Text p="2">User</Text>
        {UserLinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            route={link.route}
            active={link.route === pathname}
          >
            {link.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );
};

export default SidebarContent;
