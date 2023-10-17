import ChangePassword from "@/components/ChangePassword";
import SettingInputControl from "@/components/SettingInputControl";
import { useUser } from "@/hooks/useUser";
import { EditForm, FileForm, editSchema, fileSchema } from "@/schemas";
import services, { baseURL } from "@/services";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Input,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";

const Settings = () => {
  const { user } = useUser();
  const profileForm = useForm<FileForm>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      profile: [],
    },
  });

  const { data: userSettings } = useQuery({
    queryKey: ["userSettings", user?.id],
    queryFn: async () => {
      const res = await services.get(`/users/settings/${user?.id}`);
      return res.data.data;
    },
  });

  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: async (profile: FormData) =>
      services.post("/users/profile", profile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["userSettings", Number(user?.id)]);
    },
  });

  const settingsMutation = useMutation({
    mutationFn: async (profile: EditForm) =>
      services.post(`/users/settings/${user?.id}`, profile),
    onSuccess: () => {
      queryClient.invalidateQueries(["userSettings", Number(user?.id)]);
    },
  });

  const form = useForm<EditForm>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userSettings) {
      form.setValue("name", userSettings.name);
      form.setValue("username", userSettings.username);
      form.setValue("email", userSettings.email);
      form.setValue("phone", userSettings.phone);
    }
  }, [userSettings, form]);

  const onSubmit = (values: EditForm) => {
    settingsMutation.mutate({
      ...values,
    });
    console.log(values);
  };

  const onSubmitProfile = (values: FileForm) => {
    const formData = new FormData();
    formData.append("profile", values.profile[0]);
    formData.append("userId", String(user?.id));
    profileMutation.mutate(formData);
  };

  return (
    <Container
      maxW="container.sm"
      border="1px solid"
      borderColor="blackAlpha.300"
      borderRadius="md"
      my="12"
    >
      <Box w="xl" p="8">
        <Text fontWeight="bold">Account</Text>
        <Divider my="3" />
        <Flex>
          <HStack spacing={4}>
            <label htmlFor="profile">
              <Box
                bg="linear(to-r, red.400,pink.400)"
                w="100px"
                h="100px"
                pos="relative"
                rounded="full"
                overflow="hidden"
              >
                <Avatar
                  w="full"
                  h="full"
                  borderRadius="full"
                  objectFit="cover"
                  src={`${baseURL}/${userSettings?.imgUrl}`}
                  name={user?.name}
                />
                <Flex
                  pos="absolute"
                  bottom="0"
                  bg="rgba(0,0,0,0)"
                  cursor="pointer"
                  _hover={{
                    bg: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                  transition="ease"
                  transitionDuration="100ms"
                  w="full"
                  textAlign="center"
                  color="transparent"
                  h="40%"
                  p="2"
                  fontSize={20}
                  placeContent="center"
                >
                  <FiUploadCloud />
                </Flex>
              </Box>
            </label>
            <VStack alignItems="start" spacing={0}>
              <Text>Profile Picture</Text>
              <Text fontSize="xs" color="blackAlpha.600">
                PNG, JPG or GIF Max 1 MB
              </Text>
              <Text fontSize="xs" color="blackAlpha.600">
                (click image to upload)
              </Text>
            </VStack>
          </HStack>
          <Spacer />
          <HStack>
            <form
              encType="multipart/form-data"
              method="post"
              onSubmit={profileForm.handleSubmit(onSubmitProfile, (err) =>
                console.log(err)
              )}
            >
              <Input
                {...profileForm.register("profile")}
                display="none"
                id="profile"
                name="profile"
                type="file"
                multiple={false}
              />
              <Button w="max" type="submit" variant="gradient" rounded="md">
                Upload Picture
              </Button>
            </form>
          </HStack>
        </Flex>
        <Text color="red.500" my="2" fontSize="sm">
          {profileForm.formState.errors["profile"]?.message as string}
        </Text>
        <Divider my="3" />
        <form
          id="setting"
          onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        >
          <FormProvider {...form}>
            <Stack spacing="3">
              <HStack>
                <SettingInputControl name="name" label="Name" />
                <SettingInputControl name="username" label="Username" />
              </HStack>
              <Stack my="6">
                <Text fontWeight="bold">Contact</Text>
                <Text textColor="blackAlpha.600">
                  Manage your account email address
                </Text>
              </Stack>
              <SettingInputControl name="email" label="Email" />
              <SettingInputControl name="phone" label="Phone Number" />
            </Stack>
          </FormProvider>
        </form>
        <Divider my="3" />
        <Text fontWeight="bold">Password</Text>
        <Text textColor="blackAlpha.600">Modify your current passsword</Text>
        <ChangePassword userId={userSettings?.id} />
        <Button
          form="settings"
          type="submit"
          mt="6"
          w="max"
          rounded="md"
          variant="gradient"
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
