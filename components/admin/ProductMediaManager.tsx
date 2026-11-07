"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Loader2, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { MediaThumb } from "@/components/admin/MediaThumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormField";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import {
  addProductMedia,
  adminMessage,
  deleteProductMedia,
  reorderProductMedia,
  updateProductMedia,
} from "@/lib/api/admin";
import type { ProductMedia } from "@/lib/api/admin-schemas";

type Props = { productId: string; productName: string; media: ProductMedia[] };

/** Photos & videos: upload (multi), order (first = main image), alt text, remove. */
export function ProductMediaManager({ productId, productName, media }: Props) {
  const queryClient = useQueryClient();
  const { upload, isUploading } = useCloudinaryUpload("products");
  const [pasteUrl, setPasteUrl] = useState("");
  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: ["admin", "product", productId] });

  const run = async (action: () => Promise<unknown>, success?: string) => {
    try {
      await action();
      if (success) toast.success(success);
    } catch (error) {
      toast.error(adminMessage(error));
    } finally {
      await refresh();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    disabled: isUploading,
    onDrop: (files) =>
      run(
        async () => {
          // One by one, so the upload order is the display order.
          for (const file of files) {
            const uploaded = await upload(file);
            await addProductMedia(productId, {
              url: uploaded.url,
              kind: uploaded.kind,
              alt: productName,
            });
          }
        },
        `${files.length} file${files.length > 1 ? "s" : ""} added`,
      ),
  });

  const move = (index: number, by: -1 | 1) => {
    const ids = media.map((m) => m.id);
    const target = index + by;
    [ids[index], ids[target]] = [ids[target]!, ids[index]!];
    void run(() => reorderProductMedia(productId, ids));
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        data-active={isDragActive}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border px-4 py-10 text-center text-sm text-muted hover:border-primary data-[active=true]:border-primary"
      >
        <input {...getInputProps()} aria-label="Upload photos or videos" />
        {isUploading ? (
          <Loader2 aria-hidden="true" className="size-6 animate-spin" />
        ) : (
          <Upload aria-hidden="true" className="size-6" />
        )}
        <p>{isUploading ? "Uploading…" : "Drop photos / videos here, or click to choose"}</p>
        <p className="text-xs">
          Images up to 10 MB, videos up to 100 MB. The first item is the main photo.
        </p>
      </div>

      <form
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!pasteUrl.trim()) return;
          void run(
            () => addProductMedia(productId, { url: pasteUrl.trim(), alt: productName }),
            "Image added",
          ).then(() => setPasteUrl(""));
        }}
      >
        <Input
          aria-label="Image URL"
          placeholder="…or paste an https:// image URL"
          value={pasteUrl}
          onChange={(e) => setPasteUrl(e.target.value)}
          className="h-11 py-2"
        />
        <Button type="submit" variant="outline" className="shrink-0">
          Add URL
        </Button>
      </form>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {media.map((m, index) => (
          <li key={m.id} className="border border-border bg-white/50 p-3">
            <MediaThumb media={m} isMain={index === 0} />
            <Input
              aria-label="Alt text"
              defaultValue={m.alt ?? ""}
              placeholder="Alt text (describe the photo)"
              className="mt-3 h-10 py-2"
              onBlur={(e) =>
                e.target.value !== (m.alt ?? "") &&
                void run(
                  () => updateProductMedia(productId, m.id, { alt: e.target.value || null }),
                  "Alt text saved",
                )
              }
            />
            <div className="mt-2 flex justify-between">
              <div className="flex">
                <Button
                  variant="link"
                  size="icon"
                  aria-label="Move earlier"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp aria-hidden="true" className="size-4" />
                </Button>
                <Button
                  variant="link"
                  size="icon"
                  aria-label="Move later"
                  disabled={index === media.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown aria-hidden="true" className="size-4" />
                </Button>
              </div>
              <Button
                variant="link"
                size="icon"
                aria-label="Remove"
                className="text-danger"
                onClick={() =>
                  window.confirm("Remove this file from the product?") &&
                  void run(() => deleteProductMedia(productId, m.id), "Removed")
                }
              >
                <Trash2 aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {!media.length && (
        <p className="text-sm text-muted">
          No photos yet — products without photos show a placeholder.
        </p>
      )}
    </div>
  );
}
