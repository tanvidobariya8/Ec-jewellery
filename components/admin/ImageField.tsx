"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Input } from "@/components/ui/FormField";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { adminMessage } from "@/lib/api/admin";

type ImageFieldProps = {
  id: string;
  value: string;
  onChange: (url: string) => void;
  folder: "categories" | "banners" | "products";
};

/** One image: drop/upload to Cloudinary, or paste an https URL. */
export function ImageField({ id, value, onChange, folder }: ImageFieldProps) {
  const { upload, isUploading } = useCloudinaryUpload(folder);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    disabled: isUploading,
    onDrop: async ([file]) => {
      if (!file) return;
      try {
        onChange((await upload(file)).url);
      } catch (error) {
        toast.error(adminMessage(error, "Upload failed"));
      }
    },
  });

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative aspect-4/3 w-40 border border-border bg-surface">
          <Image src={value} alt="" fill unoptimized sizes="160px" className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Remove image"
            className="absolute top-1 right-1 bg-background/90 p-1 text-danger"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border px-4 py-6 text-center text-sm text-muted hover:border-primary data-[active=true]:border-primary"
          data-active={isDragActive}
        >
          <input {...getInputProps()} aria-label="Upload image" />
          {isUploading ? (
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
          ) : (
            <ImagePlus aria-hidden="true" className="size-5" />
          )}
          {isUploading ? "Uploading…" : "Drop an image or click to upload"}
        </div>
      )}
      <Input
        id={id}
        placeholder="…or paste an https:// image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
