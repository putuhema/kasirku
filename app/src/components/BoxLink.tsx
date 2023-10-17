import { HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const BoxLink = ({
  to,
  title,
  icon,
  active,
}: {
  to: string;
  title: string;
  icon: ReactNode;
  active: boolean;
}) => {
  return (
    <Link style={{ width: "100%" }} to={to}>
      <HStack
        spacing={3}
        bg={active ? "teal.500" : "white"}
        _hover={{
          bg: "teal.500",
          color: "white",
          borderColor: "teal.500",
        }}
        transition="ease-in"
        transitionDuration="100ms"
        cursor="pointer"
        fontWeight="bold"
        p="3"
        w="full"
        rounded="md"
        borderColor="blackAlpha.200"
        color={active ? "white" : "teal.500"}
      >
        {icon}
        <Text w="full">{title}</Text>
      </HStack>
    </Link>
  );
};

export default BoxLink;
