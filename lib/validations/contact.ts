import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
