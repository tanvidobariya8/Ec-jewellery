"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { QueryState } from "@/components/admin/QueryState";
import { StyleForm } from "@/components/admin/StyleForm";
import { Button } from "@/components/ui/Button";
import { adminMessage, createStyle, deleteStyle, getStyles, updateStyle } from "@/lib/api/admin";
import type { AdminStyle } from "@/lib/api/admin-schemas";
import { toStylePayload, type StyleValues } from "@/lib/validations/admin";

const KEY = ["admin", "styles"];

export function StylesManager() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: KEY, queryFn: getStyles });
  const [editing, setEditing] = useState<AdminStyle | "new" | null>(null);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: KEY });
    queryClient.invalidateQueries({ queryKey: ["admin", "lookups"] });
  };

  const save = async (values: StyleValues) => {
    try {
      const payload = toStylePayload(values);
      if (editing === "new") await createStyle(payload);
      else if (editing) await updateStyle(editing.id, payload);
      toast.success("Style saved");
      setEditing(null);
      refresh();
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const remove = useMutation({
    mutationFn: (s: AdminStyle) => deleteStyle(s.id),
    onSuccess: () => {
      toast.success("Style deleted");
      refresh();
    },
    onError: (error) => toast.error(adminMessage(error)),
  });

  const styles = query.data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Ring styles"
        description="Styles you tag products with (Solitaire, Halo…). Each stone tab of the home page “Shop rings by style” section has its own tile photo and order (#)."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus aria-hidden="true" className="size-4" /> New style
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
                <th className="px-4 py-3 font-medium">Lab-grown tile</th>
                <th className="px-4 py-3 font-medium">Moissanite tile</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {styles.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted">{s.slug}</td>
                  <td className="px-4 py-2">
                    <TileCell image={s.image} order={s.sort} />
                  </td>
                  <td className="px-4 py-2">
                    <TileCell image={s.moissaniteImage} order={s.moissaniteSort} />
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
                          window.confirm(`Delete "${s.name}"? Products lose this style tag.`) &&
                          remove.mutate(s)
                        }
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!styles.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No styles yet.
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
        title={editing === "new" ? "New style" : "Edit style"}
      >
        {editing !== null && (
          <StyleForm
            key={editing === "new" ? "new" : editing.id}
            style={editing === "new" ? undefined : editing}
            onSubmit={save}
          />
        )}
      </AdminDialog>
    </>
  );
}

/** Tile thumbnail with its position on that tab. */
function TileCell({ image, order }: { image: string | null; order: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-15 w-12 shrink-0 bg-surface">
        {image && (
          <Image src={image} alt="" fill unoptimized sizes="48px" className="object-cover" />
        )}
      </div>
      <span className="text-xs text-muted">{image ? `#${order}` : "No photo"}</span>
    </div>
  );
}
