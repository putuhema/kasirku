import {
  EditProduct,
  FileForm,
  editProductSchema,
  fileSchema,
} from "@/schemas";
import services, { baseURL } from "@/services";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Skeleton,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

type CategoryRes = {
  id: number;
  name: string;
};

type ProductType = {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
  categoryId: number;
  description: string;
  imgUrl: string;
};

const EditProductPage = () => {
  const { productId } = useParams();
  const [editImage, setEditImage] = useState(false);
  const queryClient = useQueryClient();

  const { data: product } = useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await services.get(`/products/${productId}`);
      return res.data.data;
    },
    enabled: !!productId,
  });

  const { data: category, isLoading: categoryLoading } = useQuery<
    CategoryRes[]
  >({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await services.get("/category");
      return res.data.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProduct>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
    },
    shouldUnregister: true,
  });

  const imageForm = useForm<FileForm>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      profile: [],
    },
  });

  console.log(product?.status);
  const [status, setStatus] = useState(product?.status == "active");
  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("categoryId", product.categoryId);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const productMutation = useMutation({
    mutationFn: async (data: EditProduct) =>
      services.post(`/products/edit/${product?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product", String(product?.id)]);
    },
  });

  const onSubmit = (values: EditProduct) => {
    productMutation.mutate({
      ...values,
      status: status ? "active" : "disabled",
    });
  };

  const profileMutation = useMutation({
    mutationFn: async (profile: FormData) =>
      services.post("/products/image", profile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product", String(product?.id)]);
    },
  });
  const imageOnSubmit = (values: FileForm) => {
    const formData = new FormData();
    formData.append("profile", values.profile[0]);
    formData.append("productId", String(product?.id));
    profileMutation.mutate(formData);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem color="blackAlpha.500">
          <Link to="/dashboard/products">products</Link>
        </BreadcrumbItem>
        <BreadcrumbItem color="teal.500">
          <Link to={`/dashboard/products/edit/${productId}`}>
            edit products
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Container>
        <Heading fontSize="2xl" mb="10">
          Edit Product Details
        </Heading>

        <form
          id="edit-product"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
        >
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

          <Stack>
            <FormControl isInvalid={!!errors["name"]}>
              <FormLabel htmlFor="name">Product Name</FormLabel>
              <Input {...register("name")} />
              <FormErrorMessage>{errors["name"]?.message}</FormErrorMessage>
            </FormControl>
            <HStack>
              <FormControl isInvalid={!!errors["price"]}>
                <FormLabel htmlFor="price">Product Price</FormLabel>
                <Input
                  type="number"
                  {...register("price", {
                    setValueAs: (value) => Number(value),
                  })}
                />
                <FormErrorMessage>{errors["price"]?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors["stock"]}>
                <FormLabel htmlFor="stock">Product Stock</FormLabel>
                <Input
                  type="number"
                  {...register("stock", {
                    setValueAs: (value) => Number(value),
                  })}
                />
                <FormErrorMessage>{errors["stock"]?.message}</FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              {categoryLoading ? (
                <Skeleton />
              ) : (
                <FormControl isInvalid={!!errors["categoryId"]}>
                  <FormLabel htmlFor="categoryId">Product Category</FormLabel>
                  <Select
                    {...register("categoryId", {
                      setValueAs: (value) => Number(value),
                    })}
                    id="categoryId"
                    placeholder="Select Category"
                  >
                    {category?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors["categoryId"]?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            </HStack>
            <FormControl isInvalid={!!errors["description"]}>
              <FormLabel htmlFor="description">Product Description</FormLabel>
              <Textarea
                size="md"
                id="description"
                resize="vertical"
                {...register("description")}
              />
              <FormErrorMessage>
                {errors["description"]?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </form>
        <Flex gap="4" my="8">
          <Stack>
            <Text>Product Image</Text>
            <Box w="150px" h="150px">
              <Image
                w="full"
                h="full"
                rounded="lg"
                src={`${baseURL}/${product?.imgUrl}`}
              />
            </Box>
          </Stack>
          <form
            onSubmit={imageForm.handleSubmit(imageOnSubmit, (err) =>
              console.log(err)
            )}
          >
            {editImage ? (
              <Stack>
                <Controller
                  control={imageForm.control}
                  name="profile"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="file"
                      id="profile"
                      multiple={false}
                      value={field.value.filename}
                      onChange={(e) => {
                        imageForm.setValue("profile", e.target.files);
                      }}
                    />
                  )}
                />
                <Button isLoading={profileMutation.isLoading} type="submit">
                  upload
                </Button>
              </Stack>
            ) : (
              <Button onClick={() => setEditImage(true)}>edit image</Button>
            )}
          </form>
        </Flex>
        <Button
          isLoading={productMutation.isLoading}
          w="full"
          colorScheme="teal"
          form="edit-product"
          type="submit"
        >
          Edit
        </Button>
      </Container>
    </>
  );
};

export default EditProductPage;
