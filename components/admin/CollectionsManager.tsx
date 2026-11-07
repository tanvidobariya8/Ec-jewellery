"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { QueryState } from "@/components/admin/QueryState";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Textarea } from "@/components/ui/FormField";
import {
  adminMessage,
  createCollection,
  deleteCollection,
  getCollections,
  updateCollection,
} from "@/lib/api/admin";
import type { AdminCollection } from "@/lib/api/admin-schemas";
import {
  collectionDefaults,
  collectionSchema,
  toCollectionPayload,
  type CollectionValues,
} from "@/lib/validations/admin";

const KEY = ["admin", "collections"];

function CollectionForm({
  collection,
  onSubmit,
}: {
  collection?: AdminCollection;
  onSubmit: (values: CollectionValues) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CollectionValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: collectionDefaults(collection),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField id="col-name" label="Name" error={errors.name?.message}>
        <Input id="col-name" aria-invalid={!!errors.name} {...register("name")} />
      </FormField>
      <FormField id="col-slug" label="URL slug" optional error={errors.slug?.message}>
        <Input id="col-slug" placeholder="Generated from the name" {...register("slug")} />
      </FormField>
      <FormField id="col-description" label="Description" optional>
        <Textarea id="col-description" className="min-h-24" {...register("description")} />
      </FormField>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save collection"}
      </Button>
    </form>
  );
}

export function CollectionsManager() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: KEY, queryFn: getCollections });
  const [editing, setEditing] = useState<AdminCollection | "new" | null>(null);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: KEY });
    queryClient.invalidateQueries({ queryKey: ["admin", "lookups"] });
  };

  const save = async (values: CollectionValues) => {
    try {
      const payload = toCollectionPayload(values);
      if (editing === "new") await createCollection(payload);
      else if (editing) await updateCollection(editing.id, payload);
      toast.success("Collection saved");
      setEditing(null);
      refresh();
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const remove = useMutation({
    mutationFn: (c: AdminCollection) => deleteCollection(c.id),
    onSuccess: () => {
      toast.success("Collection deleted");
      refresh();
    },
    onError: (error) => toast.error(adminMessage(error)),
  });

  return (
    <>
      <AdminPageHeader
        title="Collections"
        description="Optional groups such as Bridal or Everyday. Deleting a collection keeps its products."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus aria-hidden="true" className="size-4" /> New collection
          </Button>
        }
      />
      <QueryState isPending={query.isPending} error={query.error} onRetry={query.refetch} />
      {query.data && (
        <ul className="divide-y divide-border border border-border">
          {query.data.map((c) => (
            <li key={c.id} className="flex items-center gap-4 px-4 py-3 text-sm">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{c.name}</p>
                <p className="text-muted">
                  {c.slug} · {c.productCount ?? 0} products
                </p>
              </div>
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
                onClick={() => window.confirm(`Delete "${c.name}"?`) && remove.mutate(c)}
              >
                <Trash2 aria-hidden="true" className="size-4" />
              </Button>
            </li>
          ))}
          {!query.data.length && (
            <li className="px-4 py-8 text-center text-muted">No collections yet.</li>
          )}
        </ul>
      )}
      <AdminDialog
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        title={editing === "new" ? "New collection" : "Edit collection"}
      >
        {editing !== null && (
          <CollectionForm
            key={editing === "new" ? "new" : editing.id}
            collection={editing === "new" ? undefined : editing}
            onSubmit={save}
          />
        )}
      </AdminDialog>
    </>
  );
}
