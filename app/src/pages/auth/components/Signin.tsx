import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useTitle } from "@/hooks/useTitle";

const signinSchema = z.object({
  username: z.string().min(2, { message: "username is empty" }),
  password: z.string().min(2, { message: "password cannot be empty" }),
});

type FormData = z.infer<typeof signinSchema>;

interface ErrorResponse {
  message: string;
}
const Signin = () => {
  useTitle("Kasirku | Sign In");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const [err, setErr] = useState("");

  const { mutate } = useMutation({
    mutationFn: async (loginData: FormData) =>
      services.post("/auth/login", loginData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/home");
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ErrorResponse;
      setErr(data.message);
      toast({
        title: data.message,
        description: "Please contact the admin for further information.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: FormData) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Center my="4"></Center>
        <FormControl isInvalid={!!errors["username"] || !!err}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input variant="filled" {...register("username")} />
          <FormErrorMessage>{errors["username"]?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["password"] || !!err}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              variant="filled"
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
                {show ? <EyeIcon color="#000" /> : <EyeOff color="#000" />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors["password"]?.message}</FormErrorMessage>
          <Box float="right" my="3">
            <Link to="/req-reset-pwd" target="_blank">
              <Text _hover={{ color: "blackAlpha.600" }}>
                forgot your password?
              </Text>
            </Link>
          </Box>
        </FormControl>
        <Button variant="gradient" type="submit">
          SignIn
        </Button>
      </VStack>
    </form>
  );
};

export default Signin;
