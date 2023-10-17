import { PwdForm, pwdSchema } from "@/schemas";
import services from "@/services";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  useToast,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, EyeIcon, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";

type PasswordData = {
  password: string;
  token: string;
  userId: string;
};

const ResetPassword = () => {
  useTitle("Kasirku | Reset Password");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");
  const userId = params.get("id");
  const toast = useToast();

  useEffect(() => {
    if (!token || !userId) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async (newPassword: PasswordData) =>
      services.post("/auth/reset-password", newPassword),
    onSuccess: () => {
      toast({
        title: "Password Changed",
        description: "Successfully changed password",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    },
  });

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<PwdForm>({
    resolver: zodResolver(pwdSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        password: "",
        confirm: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (values: PwdForm) => {
    mutate({
      token: token as string,
      userId: userId as string,
      password: values.password,
    });
  };
  return (
    <Flex
      minH="100vh"
      align="start"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        minW="md"
        mt="10"
        spacing={4}
        boxShadow="lg"
        rounded="lg"
        p="6"
        bg={useColorModeValue("white", "gray.700")}
      >
        {isSuccess ? (
          <Link to="/?form=sign-in">
            <HStack _hover={{ color: "red.400" }}>
              <ChevronLeft />
              <Text>Sign in</Text>
            </HStack>
          </Link>
        ) : (
          <Heading>Enter new password</Heading>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors["password"]}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  {...register("password")}
                  type={show ? "text" : "password"}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <EyeIcon /> : <EyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors["password"]?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors["confirm"]}>
              <FormLabel htmlFor="confirm">Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  {...register("confirm")}
                  type={showConfirm ? "text" : "password"}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeIcon /> : <EyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors["confirm"]?.message}</FormErrorMessage>
            </FormControl>
            <Button isLoading={isLoading} variant="gradient" type="submit">
              Reset Password
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default ResetPassword;
