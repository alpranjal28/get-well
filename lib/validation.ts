import { z } from "zod";

const UserFormValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(30, "Username must be at most 30 characters."),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((phone) => {
    return /^[0-9]{10}$/.test(phone);
  }, "phone number must be 10 digits."),
})

export default UserFormValidationSchema;
