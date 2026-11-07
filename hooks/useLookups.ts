"use client";

import { useQuery } from "@tanstack/react-query";

import { getLookups } from "@/lib/api/admin";

/** Categories, collections, shapes, styles, metals and stone types (with ids) for admin forms. */
export function useLookups() {
  return useQuery({ queryKey: ["admin", "lookups"], queryFn: getLookups, staleTime: 60 * 1000 });
}
