import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import { useNavigate } from "react-router-dom";

const signinSchema = z.object({
  username: z.string().min(2, { message: "username is empty" }),
  password: z.string().min(2, { message: "password cannot be empty" }),
});

type FormData = z.infer<typeof signinSchema>;

const Signin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (loginData: FormData) =>
      services.post("/auth/login", loginData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/home");
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
        <FormControl isInvalid={!!errors["username"]}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input {...register("username")} />
          <FormErrorMessage>{errors["username"]?.message}</FormErrorMessage>
        </FormControl>
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
        <Button w="full" rounded="full" type="submit">
          SignIn
        </Button>
      </VStack>
    </form>
  );
};

export default Signin;
