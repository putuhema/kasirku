import { useAuth } from "@/auth/useAuth";
import { CreateUserForm, createUserSchema } from "@/schemas";
import services from "@/services";
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  Select,
  InputRightElement,
  Button,
  Switch,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type UserFormData = {
  name: string;
  username: string;
  email: string;
  status: string;
  phone: string;
  imgUrl: string;
  password: string;
};

const UserForm = ({ userId }: { userId?: number }) => {
  const auth = useAuth();
  const accessToken = auth?.data.accessToken;
  const toast = useToast();

  const queryClient = useQueryClient();

  const url = userId ? `/users/${userId}` : `/users`;
  const { mutate } = useMutation({
    mutationFn: async (newuser: UserFormData) =>
      services.post(url, newuser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: () => {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      queryClient.invalidateQueries(["users"]);
    },
  });

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: userData } = useQuery<UserFormData | null>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const cache = queryClient.getQueryData(["user", Number(userId)]);
      if (cache) {
        return cache;
      }

      const res = await services.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data.data;
    },
    enabled: !!userId,
  });
  const [status, setStatus] = useState(String(userData?.status) == "active");

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: "cashier",
      phone: "",
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("username", userData.username);
      setValue("email", userData.email);
      setValue("phone", userData.phone);
      setValue("password", userData.password);
      setValue("confirm", userData.password);
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        username: "",
        role: "cashier",
        email: "",
        phone: "",
        password: "",
        confirm: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (values: CreateUserForm) => {
    mutate({
      ...values,
      status: status ? "active" : "disabled",
      imgUrl: "",
    });
  };

  return (
    <form id="create-user" onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        {userId && (
          <FormControl my="4" display="flex" alignItems="center">
            <FormLabel htmlFor="status" mb="0">
              Status
            </FormLabel>
            <Badge
              mr="2"
              px="3"
              colorScheme={status ? "teal" : "red"}
              rounded="full"
            >
              {status ? "active" : "disabled"}
            </Badge>
            <Switch
              onChange={() => setStatus(!status)}
              isChecked={status}
              colorScheme="teal"
              id="status"
            />
          </FormControl>
        )}
        <HStack w="full">
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
        <HStack w="full">
          <FormControl isInvalid={!!errors["email"]}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input {...register("email")} type="email" />
            <FormErrorMessage>{errors["email"]?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors["role"]}>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select {...register("role")} defaultValue="cashier" size="md">
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
            </Select>
            <FormErrorMessage>{errors["email"]?.message}</FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={!!errors["phone"]}>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+62" />
            <Input {...register("phone")} type="number" />
          </InputGroup>
          <FormErrorMessage>{errors["phone"]?.message}</FormErrorMessage>
        </FormControl>
        <FormControl hidden={!!userId} isInvalid={!!errors["password"]}>
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
        <FormControl hidden={!!userId} isInvalid={!!errors["confirm"]}>
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
      </VStack>
    </form>
  );
};

export default UserForm;
