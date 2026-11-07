"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { QueryState } from "@/components/admin/QueryState";
import { Button } from "@/components/ui/Button";
import {
  adminMessage,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/lib/api/admin";
import type { AdminCategory } from "@/lib/api/admin-schemas";
import { toCategoryPayload, type CategoryValues } from "@/lib/validations/admin";

const KEY = ["admin", "categories"];

export function CategoriesManager() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: KEY, queryFn: getCategories });
  const [editing, setEditing] = useState<AdminCategory | "new" | null>(null);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: KEY });
    queryClient.invalidateQueries({ queryKey: ["admin", "lookups"] });
  };

  const save = async (values: CategoryValues) => {
    try {
      const payload = toCategoryPayload(values);
      if (editing === "new") await createCategory(payload);
      else if (editing) await updateCategory(editing.id, payload);
      toast.success("Category saved");
      setEditing(null);
      refresh();
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const remove = useMutation({
    mutationFn: (c: AdminCategory) => deleteCategory(c.id),
    onSuccess: () => {
      toast.success("Category deleted");
      refresh();
    },
    onError: (error) => toast.error(adminMessage(error)),
  });

  const categories = query.data ?? [];
  const nameOf = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <>
      <AdminPageHeader
        title="Categories"
        description="Shop menu categories. A category with products cannot be deleted — move its products first."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus aria-hidden="true" className="size-4" /> New category
          </Button>
        }
      />
      <QueryState isPending={query.isPending} error={query.error} onRetry={query.refetch} />
      {query.data && (
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="bg-surface text-xs tracking-label uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Parent</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium">Sort</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted">{c.slug}</td>
                  <td className="px-4 py-3">{nameOf(c.parentId)}</td>
                  <td className="px-4 py-3">{c.productCount ?? 0}</td>
                  <td className="px-4 py-3">{c.sort}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="link"
                        size="icon"
                        aria-label={`Edit ${c.name}`}
                        onClick={() => setEditing(c)}
                      >
                        <Pencil aria-hidden="true" className="size-4" />
                      </Button>
                      <Button
                        variant="link"
                        size="icon"
                        aria-label={`Delete ${c.name}`}
                        className="text-danger"
                        disabled={remove.isPending}
                        onClick={() => window.confirm(`Delete "${c.name}"?`) && remove.mutate(c)}
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!categories.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <AdminDialog
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        title={editing === "new" ? "New category" : "Edit category"}
      >
        {editing !== null && (
          <CategoryForm
            key={editing === "new" ? "new" : editing.id}
            category={editing === "new" ? undefined : editing}
            parents={categories}
            onSubmit={save}
          />
        )}
      </AdminDialog>
    </>
  );
}
