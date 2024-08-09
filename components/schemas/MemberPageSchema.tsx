import { z } from "zod";

export const MemberSchema = z.object({
  username: z.string().nonempty("Username is required"),
  name: z.string().nonempty("Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  permissions: z
    .array(z.string())
    .nonempty("At least one permission is required"),
});
