import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiCompass } from "react-icons/fi";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";
import logo from "@/assets/kasirku.svg";
import {
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MenuIcon,
  Settings,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Menu",
    icon: MenuIcon,
    route: "/home/menu",
  },
  { name: "OrderList", icon: FiCompass, route: "/home/order-list" },
];
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useUser();
  const { pathname } = useLocation();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex my="4" direction="column" h="full">
        <Flex direction="column">
          <VStack w="full">
            <Image w="50px" color="red.400" src={logo} />
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              meowfood.io
            </Text>
          </VStack>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
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
          <Divider />
          {[
            { name: "Settings", icon: Settings, route: "/home/settings" },
            {
              name: "Help Center",
              icon: HelpCircle,
              route: "/home/help-center",
            },
          ].map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              route={link.route}
              active={link.route === pathname}
            >
              {link.name}
            </NavItem>
          ))}
          {user?.role === "admin" && (
            <NavItem icon={LayoutDashboard} route="/dashboard">
              Dashboard
            </NavItem>
          )}
        </Flex>
        <Spacer />
        <Flex ml="6" mb="10" color="blackAlpha.600">
          <LogOut size={20} />
          <Text>Sign out</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
