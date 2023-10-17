import { useTitle } from "@/hooks/useTitle";
import services from "@/services";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const passwordSchema = z.object({
  password: z.string().min(8, "Password minimum 8 characters"),
});

type PwdType = z.infer<typeof passwordSchema>;

interface ErrorResponse {
  message: string;
}

const ChangePassword = ({ userId }: { userId: string }) => {
  useTitle("Home | Settings");
  const toast = useToast();
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (data: PwdType) =>
      services.post(`/users/check-password/${userId}`, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["pwd", userId], data.data.isMatch);
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as ErrorResponse;
      setErrorMessage(data.message);
    },
  });
  const newPassword = useMutation({
    mutationFn: async (data: PwdType) =>
      services.post(`/users/change-password/${userId}`, data),
    onSuccess: () => {
      queryClient.setQueryData(["pwd", userId], null);
      toast({
        title: "Password Has been changed",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    },
  });

  const isMatch = queryClient.getQueryData(["pwd", userId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<PwdType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (values: PwdType) => {
    if (isMatch) {
      newPassword.mutate(values);
    } else {
      mutate(values);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormControl id="password" isInvalid={isError}>
          <FormLabel htmlFor="password">
            {isMatch ? "Change your password" : "Enter your current password"}
          </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              {...register("password")}
              id="password"
              w="full"
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
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
          <Link to="/req-reset-pwd" target="_blank">
            <Text float="right" py="2" _hover={{ color: "blackAlpha.600" }}>
              forgot your password?
            </Text>
          </Link>
        </FormControl>
        <Button isLoading={isLoading} type="submit">
          Change Password
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePassword;
