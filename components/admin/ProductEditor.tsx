"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/product-form/ProductForm";
import { ProductMediaManager } from "@/components/admin/ProductMediaManager";
import { QueryState } from "@/components/admin/QueryState";
import { Button } from "@/components/ui/Button";
import { useLookups } from "@/hooks/useLookups";
import {
  adminMessage,
  createProduct,
  deleteProduct,
  getAdminProduct,
  updateProduct,
} from "@/lib/api/admin";
import { toProductPayload, type ProductValues } from "@/lib/validations/admin";

/** Create (no `productId`) or edit a product. Photos can be added once it exists. */
export function ProductEditor({ productId }: { productId?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const lookups = useLookups();
  const product = useQuery({
    queryKey: ["admin", "product", productId],
    queryFn: () => getAdminProduct(productId!),
    enabled: !!productId,
  });

  const save = async (values: ProductValues) => {
    try {
      const payload = toProductPayload(values);
      if (productId) {
        const updated = await updateProduct(productId, payload);
        queryClient.setQueryData(["admin", "product", productId], updated);
        toast.success("Product saved");
      } else {
        const created = await createProduct(payload);
        toast.success("Product created — now add photos");
        router.replace(`/admin/products/${created.id}`);
      }
      await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const remove = async () => {
    if (!productId || !window.confirm("Delete this product permanently?")) return;
    try {
      await deleteProduct(productId);
      toast.success("Product deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      router.replace("/admin/products");
    } catch (error) {
      toast.error(adminMessage(error));
    }
  };

  const loading = lookups.isPending || (!!productId && product.isPending);
  const error = lookups.error ?? product.error;
  const data = product.data;

  return (
    <>
      <AdminPageHeader
        title={productId ? (data?.name ?? "Edit product") : "New product"}
        description={productId ? data?.sku : "Fill in the details, save, then add photos."}
        actions={
          data && (
            <>
              {data.status === "ACTIVE" && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/product/${data.slug}`} target="_blank">
                    <ExternalLink aria-hidden="true" className="size-4" /> View in shop
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-danger text-danger"
                onClick={remove}
              >
                <Trash2 aria-hidden="true" className="size-4" /> Delete
              </Button>
            </>
          )
        }
      />
      <QueryState isPending={loading} error={error} onRetry={() => void lookups.refetch()} />
      {lookups.data && (!productId || data) && (
        <div className="space-y-12">
          {data && (
            <section aria-labelledby="media-heading">
              <h2 id="media-heading" className="mb-4 text-2xl">
                Photos & videos
              </h2>
              <ProductMediaManager productId={data.id} productName={data.name} media={data.media} />
            </section>
          )}
          <ProductForm
            key={data?.updatedAt ?? "new"}
            product={data}
            lookups={lookups.data}
            onSubmit={save}
          />
        </div>
      )}
    </>
  );
}
