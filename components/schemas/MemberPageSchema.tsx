import { z } from "zod";

export const MemberSchema = z.object({
  username: z.string().nonempty("Username is required"),
  name: z.string().nonempty("Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  permissions: z
    .object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    })
    .refine((data) => data.admin || data.write || data.read, {
      message: "At least one permission should be true",
    }),
  email: z.string().email("Invalid email address"),
});
