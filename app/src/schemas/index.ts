import z from "zod";

export const signinSchema = z.object({
  username: z.string().min(2, { message: "username is empty" }),
  password: z.string().min(2, { message: "password cannot be empty" }),
});

export type SignInForm = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, {
      message: "name is empty",
    }),
    username: z.string().min(2, {
      message: "username is empty",
    }),
    email: z.string().email().min(2, {
      message: "email is empty",
    }),
    phone: z
      .string()
      .min(12, {
        message: "The phone number is minimum 12 digits",
      })
      .max(12, "The phone number should be less than 12 digits"),
    password: z.string().min(2, {
      message: "password is empty",
    }),
    confirm: z.string().min(2, {
      message: "password confirmation is empty",
    }),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export type SignUpForm = z.infer<typeof signupSchema>;

export const createUserSchema = z
  .object({
    name: z.string().min(2, {
      message: "name is empty",
    }),
    username: z.string().min(2, {
      message: "username is empty",
    }),
    email: z.string().email().min(2, {
      message: "email is empty",
    }),
    role: z.string().min(2, {
      message: "role is empty",
    }),
    status: z.string().optional(),
    phone: z.string().min(2, {
      message: "phone number is empty",
    }),
    password: z.string().min(2, {
      message: "password is empty",
    }),
    confirm: z.string().min(2, {
      message: "password confirmation is empty",
    }),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export type CreateUserForm = z.infer<typeof createUserSchema>;

export const editSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email().min(2),
  phone: z.string().min(2),
});

export type EditForm = z.infer<typeof editSchema>;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];
export const fileSchema = z.object({
  profile: z
    .any()
    .refine((file) => {
      return file?.length > 0;
    }, "Please pick an image")
    .refine((file) => {
      return file[0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .png and .gif formats are supported"
    ),
});
export type FileForm = z.infer<typeof fileSchema>;

export const pwdSchema = z
  .object({
    password: z.string().min(2),
    confirm: z.string().min(2),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export type PwdForm = z.infer<typeof pwdSchema>;

const MAX_PRODUCT_IMAGE_SIZE = 5000000;
export const productSchema = z.object({
  name: z.string().min(2, "product name is empty"),
  price: z.number().min(2, "product price is empty"),
  stock: z.number().min(1, "product stock is empty"),
  categoryId: z.number().min(1, "category is empty"),
  description: z.string().min(2, "product description is empty"),
  image: z
    .any()
    .refine((file) => {
      return file?.length > 0;
    }, "Please pick an image")
    .refine((file) => {
      return file[0]?.size <= MAX_PRODUCT_IMAGE_SIZE;
    }, "Max image size is 1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .png and .gif formats are supported"
    ),
});

export type Product = z.infer<typeof productSchema>;

export const editProductSchema = z.object({
  name: z.string().min(2, "product name is empty"),
  price: z.number().min(2, "product price is empty"),
  status: z.string().optional(),
  stock: z.number().min(1, "product stock is empty"),
  categoryId: z.number().min(1, "category is empty"),
  description: z.string().min(2, "product description is empty"),
});

export type EditProduct = z.infer<typeof editProductSchema>;

export const categorySchema = z.object({
  category: z.string().min(3, "Category is empty."),
});

export type CategoryForm = z.infer<typeof categorySchema>;
