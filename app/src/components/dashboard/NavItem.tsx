import {
  FlexProps,
  Flex,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface NavItemProps extends FlexProps {
  route: string;
  active: boolean;
  icon: IconType;
  children: React.ReactNode;
}

const NavItem = ({ route, active, icon, children, ...rest }: NavItemProps) => {
  return (
    <Link to={route}>
      <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="2"
          mx="4"
          bg={useColorModeValue(
            active ? "teal.400" : "white",
            active ? "teal.400" : "gray.900"
          )}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}

          {children}
        </Flex>
      </Box>
    </Link>
  );
};
export default NavItem;
