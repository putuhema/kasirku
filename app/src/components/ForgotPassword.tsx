import { useTitle } from "@/hooks/useTitle";
import services from "@/services";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Text, Heading, Stack } from "@chakra-ui/layout";
import { FormControl, useColorModeValue } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

const ForgotPassword = () => {
  useTitle("Kasirku | Request reset Password");
  const { mutate, isLoading } = useMutation({
    mutationFn: async (email: string) =>
      services.post("/auth/req-reset-pwd", { email }),
  });
  const [email, setEmail] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email);
    setEmail("");
  };

  return (
    <Flex
      minH="100vh"
      align="start"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        mt="10"
        spacing={4}
        boxShadow="lg"
        rounded="lg"
        p="6"
        bg={useColorModeValue("white", "gray.700")}
      >
        <Heading>Forgot Your Password?</Heading>
        <Text>You'll get an email with a reset link</Text>
        <form onSubmit={onSubmit}>
          <Stack spacing={4} w="full">
            <FormControl id="email">
              <Input
                w="full"
                type="email"
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </FormControl>
            <Button isLoading={isLoading} type="submit" variant="gradient">
              Request
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
