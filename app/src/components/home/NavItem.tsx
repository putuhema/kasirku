import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react";
import { LucideProps } from "lucide-react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface NavItemProps extends FlexProps {
  route: string;
  active: boolean;
  icon: IconType | LucideProps;
  children: React.ReactNode;
}

const NavItem = ({ route, active, icon, children, ...props }: NavItemProps) => {
  return (
    <Link to={route}>
      <Box>
        <Flex
          p="2"
          ml="4"
          bg={
            active
              ? "linear-gradient(-90deg, rgba(245,101,101,.5) 1%, rgba(255,255,255,0) 80%)"
              : "white"
          }
          borderRight={active ? "2px" : "none"}
          borderColor={active ? "red.400" : "transparent"}
          _hover={{
            bg: "linear-gradient(-90deg, rgba(245,101,101,.5) 1%, rgba(255,255,255,0) 80%)",
            borderRight: "2px",
            borderColor: "red.400",
          }}
          color="red.400"
          {...props}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize={{ base: "20", md: "25", lg: "16" }}
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          <Box display={{ base: "none", lg: "block" }}>{children}</Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default NavItem;
