import { Avatar, Badge, Box, HStack, Stack, Text } from "@chakra-ui/react";

import { useUser } from "@/hooks/useUser";
import { baseURL } from "@/services";

const Profile = () => {
  const { user } = useUser();

  return (
    <Box>
      <HStack>
        <Stack spacing={0}>
          <Text fontWeight="bold" fontSize="sm">
            {user?.name}
          </Text>
          <Badge
            w="max"
            px="2"
            rounded="full"
            colorScheme={user?.role === "admin" ? "orange" : "red"}
          >
            {user?.role}
          </Badge>
        </Stack>
        <Avatar
          src={` ${baseURL}/${user?.imgUrl}`}
          name={user?.name}
          w="8"
          h="8"
        />
      </HStack>
    </Box>
  );
};

export default Profile;
