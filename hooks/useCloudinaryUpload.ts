"use client";

import { useState } from "react";
import { z } from "zod";

import type { MediaKind } from "@/lib/api/admin-schemas";
import { signUpload } from "@/lib/api/admin";

type Folder = Parameters<typeof signUpload>[0];

const cloudinaryResponse = z.object({
  secure_url: z.string(),
  resource_type: z.string(),
});

export type UploadedFile = { url: string; kind: MediaKind; name: string };

/**
 * Signed direct upload: the BE signs, the browser sends the file straight to
 * Cloudinary, and only the returned URL is saved in our database.
 */
export function useCloudinaryUpload(folder: Folder) {
  const [uploading, setUploading] = useState(0);

  const upload = async (file: File): Promise<UploadedFile> => {
    setUploading((n) => n + 1);
    try {
      const sig = await signUpload(folder);
      const isVideo = file.type.startsWith("video/");
      const maxMb = isVideo ? sig.limits.videoMb : sig.limits.imageMb;
      if (file.size > maxMb * 1024 * 1024) {
        throw new Error(`${file.name} is larger than ${maxMb} MB`);
      }

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", sig.apiKey);
      body.append("timestamp", String(sig.timestamp));
      body.append("signature", sig.signature);
      body.append("folder", sig.folder);

      const res = await fetch(sig.uploadUrl, { method: "POST", body });
      if (!res.ok) throw new Error(`Upload of ${file.name} failed (${res.status})`);
      const data = cloudinaryResponse.parse(await res.json());
      return {
        url: data.secure_url,
        kind: data.resource_type === "video" ? "VIDEO" : "IMAGE",
        name: file.name,
      };
    } finally {
      setUploading((n) => n - 1);
    }
  };

  return { upload, isUploading: uploading > 0 };
}
