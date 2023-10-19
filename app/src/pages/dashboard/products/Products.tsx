import { columns } from "./columns";
import { DataTable } from "../table/data-table";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Stack,
  Textarea,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product, productSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import services from "@/services";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type CategoryRes = {
  id: number;
  name: string;
};
const Products = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await services.get("/products");
      return res.data.data;
    },
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
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      image: [],
    },
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        image: [],
      });
    }
  }, [isSubmitSuccessful, reset]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (products: FormData) =>
      services.post("/products", products, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const onSubmit = (values: Product) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append(
      "products",
      JSON.stringify({
        ...values,
      })
    );
    mutation.mutate(formData);
  };
  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : (
        <DataTable
          tableName="products"
          onOpen={onOpen}
          filter="name"
          columns={columns}
          data={productsData}
        />
      )}
      <Drawer isOpen={isOpen} size="md" placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new Product</DrawerHeader>

          <DrawerBody>
            <form
              id="create-product"
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
            >
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
                    <FormErrorMessage>
                      {errors["price"]?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors["stock"]}>
                    <FormLabel htmlFor="stock">Product Stock</FormLabel>
                    <Input
                      type="number"
                      {...register("stock", {
                        setValueAs: (value) => Number(value),
                      })}
                    />
                    <FormErrorMessage>
                      {errors["stock"]?.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <HStack>
                  {categoryLoading ? (
                    <Skeleton />
                  ) : (
                    <FormControl isInvalid={!!errors["categoryId"]}>
                      <FormLabel htmlFor="categoryId">
                        Product Category
                      </FormLabel>
                      <Select
                        id="categoryId"
                        placeholder="Select Category"
                        {...register("categoryId", {
                          setValueAs: (value) => Number(value),
                        })}
                      >
                        {category?.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </HStack>
                <FormControl isInvalid={!!errors["description"]}>
                  <FormLabel htmlFor="description">
                    Product Description
                  </FormLabel>
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
                <FormControl isInvalid={!!errors["image"]}>
                  <FormLabel htmlFor="image">Product Image</FormLabel>
                  <Input
                    {...register("image")}
                    type="file"
                    id="image"
                    name="image"
                    multiple={false}
                  />
                  <FormErrorMessage>
                    {errors["image"]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button form="create-product" type="submit" colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Products;
