import z from "zod";

export const signinSchema = z.object({
  username: z.string().min(2, { message: "username is empty" }),
  password: z.string().min(2, { message: "password cannot be empty" }),
});

export type SignInForm = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2),
    username: z.string().min(2),
    email: z.string().email().min(2),
    phone: z.string().min(2),
    password: z.string().min(2),
    confirm: z.string().min(2),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });

export type SignUpForm = z.infer<typeof signupSchema>;
