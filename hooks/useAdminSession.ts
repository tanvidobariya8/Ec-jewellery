"use client";

import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/lib/api/admin";
import { ApiError } from "@/lib/api/client";

export const SESSION_KEY = ["auth", "me"] as const;

/** The signed-in user (from the httpOnly session cookie), or `signedOut`. */
export function useAdminSession() {
  const query = useQuery({
    queryKey: SESSION_KEY,
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const signedOut = query.error instanceof ApiError && query.error.kind === "unauthorized";
  return { ...query, signedOut };
}
