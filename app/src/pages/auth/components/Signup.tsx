import { SignUpForm, signupSchema } from "@/schemas";
import services from "@/services";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (newuser: User) => services.post("/auth/signup", newuser),
    onSuccess: () => {
      return navigate("/?form=sign-in");
    },
  });

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (values: SignUpForm) => {
    mutate({
      ...values,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <HStack>
          <FormControl isInvalid={!!errors["name"]}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input {...register("name")} />
            <FormErrorMessage>{errors["name"]?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors["username"]}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <InputGroup>
              <InputLeftAddon children="@" />
              <Input {...register("username")} />
            </InputGroup>
            <FormErrorMessage>{errors["username"]?.message}</FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={!!errors["email"]}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input {...register("email")} type="email" />
          <FormErrorMessage>{errors["email"]?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["phone"]}>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+62" />
            <Input {...register("phone")} />
          </InputGroup>
          <FormErrorMessage>{errors["phone"]?.message}</FormErrorMessage>
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
        <Button variant="gradient" type="submit">
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
