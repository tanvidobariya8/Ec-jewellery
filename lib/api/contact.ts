import { apiFetch } from "@/lib/api/client";
import type { ContactFormValues } from "@/lib/validations/contact";

/** BE: POST /api/v1/contact */
export function submitContactMessage(values: ContactFormValues) {
  return apiFetch<void>("/contact", {
    method: "POST",
    body: JSON.stringify(values),
  });
}
