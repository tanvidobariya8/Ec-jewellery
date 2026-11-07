"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { FormField, Input } from "@/components/ui/FormField";
import { SESSION_KEY } from "@/hooks/useAdminSession";
import { login } from "@/lib/api/admin";
import { userMessage } from "@/lib/api/client";
import { loginSchema, type LoginValues } from "@/lib/validations/admin";

/** Only redirect back inside the admin area (no open redirects). */
const safeNext = (next: string | null) =>
  next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [next] = useQueryState("next", parseAsString);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const user = await login(values);
      if (user.role !== "ADMIN") {
        toast.error("This account does not have admin access.");
        return;
      }
      queryClient.setQueryData(SESSION_KEY, user);
      router.replace(safeNext(next));
    } catch (error) {
      toast.error(userMessage(error, "Sign-in failed. Please try again."));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>
      <FormField id="password" label="Password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
