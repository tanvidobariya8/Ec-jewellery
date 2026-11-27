"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { QueryState } from "@/components/admin/QueryState";
import { ShapeForm } from "@/components/admin/ShapeForm";
import { Button } from "@/components/ui/Button";
import { adminMessage, createShape, deleteShape, getShapes, updateShape } from "@/lib/api/admin";
import type { AdminShape } from "@/lib/api/admin-schemas";
import { toShapePayload, type ShapeValues } from "@/lib/validations/admin";

const KEY = ["admin", "shapes"];

export function ShapesManager() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: KEY, queryFn: getShapes });
  const [editing, setEditing] = useState<AdminShape | "new" | null>(null);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: KEY });
    queryClient.invalidateQueries({ queryKey: ["admin", "lookups"] });
  };

  const save = async (values: ShapeValues) => {
    try {
      const payload = toShapePayload(values);
      if (editing === "new") await createShape(payload);
      else if (editing) await updateShape(editing.id, payload);
      toast.success("Shape saved");
      setEditing(null);
      refresh();
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const remove = useMutation({
    mutationFn: (s: AdminShape) => deleteShape(s.id),
    onSuccess: () => {
      toast.success("Shape deleted");
      refresh();
    },
    onError: (error) => toast.error(adminMessage(error)),
  });

  const shapes = query.data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Stone shapes"
        description="Shapes you tag products with. Each has a stone photo, description and order (#) for the home page “Shop ring by shape” section."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus aria-hidden="true" className="size-4" /> New shape
          </Button>
        }
      />
      <QueryState isPending={query.isPending} error={query.error} onRetry={query.refetch} />
      {query.data && (
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="bg-surface text-xs tracking-label uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Photo</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {shapes.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 text-muted">{s.sort}</td>
                  <td className="px-4 py-2">
                    <div className="relative size-12 bg-background">
                      {s.image && (
                        <Image
                          src={s.image}
                          alt=""
                          fill
                          unoptimized
                          sizes="48px"
                          className="object-contain"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted">{s.slug}</p>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-muted">
                    <p className="line-clamp-2">{s.description || "—"}</p>
                  </td>
                  <td className="px-4 py-3">{s.productCount ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="link"
                        size="icon"
                        aria-label={`Edit ${s.name}`}
                        onClick={() => setEditing(s)}
                      >
                        <Pencil aria-hidden="true" className="size-4" />
                      </Button>
                      <Button
                        variant="link"
                        size="icon"
                        aria-label={`Delete ${s.name}`}
                        className="text-danger"
                        disabled={remove.isPending}
                        onClick={() =>
                          window.confirm(
                            `Delete "${s.name}"? Products lose this shape tag and its stone prices are removed.`,
                          ) && remove.mutate(s)
                        }
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!shapes.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No shapes yet.
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
        title={editing === "new" ? "New shape" : "Edit shape"}
      >
        {editing !== null && (
          <ShapeForm
            key={editing === "new" ? "new" : editing.id}
            shape={editing === "new" ? undefined : editing}
            onSubmit={save}
          />
        )}
      </AdminDialog>
    </>
  );
}
