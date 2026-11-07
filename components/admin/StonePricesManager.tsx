"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { QueryState } from "@/components/admin/QueryState";
import { StonePriceForm } from "@/components/admin/StonePriceForm";
import { Button } from "@/components/ui/Button";
import { useLookups } from "@/hooks/useLookups";
import {
  adminMessage,
  createStonePrice,
  deleteStonePrice,
  getStonePrices,
  updateStonePrice,
} from "@/lib/api/admin";
import type { StonePrice } from "@/lib/api/admin-schemas";
import { formatInrPaise } from "@/lib/currency";
import { toStonePricePayload, type StonePriceValues } from "@/lib/validations/admin";

const KEY = ["admin", "stone-prices"];

export function StonePricesManager() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: KEY, queryFn: getStonePrices });
  const lookups = useLookups();
  const [editing, setEditing] = useState<StonePrice | "new" | null>(null);

  const save = async (values: StonePriceValues) => {
    try {
      const payload = toStonePricePayload(values);
      if (editing === "new") await createStonePrice(payload);
      else if (editing) await updateStonePrice(editing.id, payload);
      toast.success("Stone price saved");
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: KEY });
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const remove = useMutation({
    mutationFn: (p: StonePrice) => deleteStonePrice(p.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
    onError: (error) => toast.error(adminMessage(error)),
  });

  return (
    <>
      <AdminPageHeader
        title="Stone prices"
        description="Price per carat by stone, shape and carat range. A row without a shape applies to every shape."
        actions={
          <Button onClick={() => setEditing("new")} disabled={!lookups.data}>
            <Plus aria-hidden="true" className="size-4" /> New price
          </Button>
        }
      />
      <QueryState isPending={query.isPending} error={query.error} onRetry={query.refetch} />
      {query.data && (
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-2xl text-left text-sm">
            <thead className="bg-surface text-xs tracking-label uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Stone</th>
                <th className="px-4 py-3 font-medium">Shape</th>
                <th className="px-4 py-3 font-medium">Carat range</th>
                <th className="px-4 py-3 font-medium">Per carat</th>
                <th className="px-4 py-3 font-medium">Certificate</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {query.data.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{p.stoneType?.name}</td>
                  <td className="px-4 py-3">{p.shape?.name ?? "All shapes"}</td>
                  <td className="px-4 py-3">
                    {p.caratFrom} – {p.caratTo} ct
                  </td>
                  <td className="px-4 py-3">{formatInrPaise(p.pricePerCaratPaise)}</td>
                  <td className="px-4 py-3">{p.certificate === "NONE" ? "—" : p.certificate}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="link"
                        size="icon"
                        aria-label="Edit price"
                        disabled={!lookups.data}
                        onClick={() => setEditing(p)}
                      >
                        <Pencil aria-hidden="true" className="size-4" />
                      </Button>
                      <Button
                        variant="link"
                        size="icon"
                        aria-label="Delete price"
                        className="text-danger"
                        onClick={() => window.confirm("Delete this price row?") && remove.mutate(p)}
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!query.data.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No stone prices yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <AdminDialog
        open={editing !== null && !!lookups.data}
        onOpenChange={(open) => !open && setEditing(null)}
        title={editing === "new" ? "New stone price" : "Edit stone price"}
      >
        {editing !== null && lookups.data && (
          <StonePriceForm
            key={editing === "new" ? "new" : editing.id}
            price={editing === "new" ? undefined : editing}
            lookups={lookups.data}
            onSubmit={save}
          />
        )}
      </AdminDialog>
    </>
  );
}
