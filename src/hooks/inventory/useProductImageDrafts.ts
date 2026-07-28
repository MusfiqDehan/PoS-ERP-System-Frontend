"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { uploadProductImage } from "@/lib/inventory";
import type { ProductImageDraft } from "@/components/Inventory/add-product/ImagesSection";

export const MAX_PRODUCT_IMAGES = 10;

function newImageId(): string {
  return `img-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function draftsFromUrls(urls: string[]): ProductImageDraft[] {
  return urls.map((url) => ({
    id: newImageId(),
    previewUrl: url,
    uploadedUrl: url,
  }));
}

export function useProductImageDrafts() {
  const [images, setImages] = useState<ProductImageDraft[]>([]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  useEffect(() => {
    return () => {
      for (const image of imagesRef.current) {
        if (image.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(image.previewUrl);
        }
      }
    };
  }, []);

  const setFromUrls = useCallback((urls: string[]) => {
    setImages(draftsFromUrls(urls));
  }, []);

  const addImageFiles = useCallback((files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;

    setImages((prev) => {
      const remaining = MAX_PRODUCT_IMAGES - prev.length;
      const toAdd = list.slice(0, remaining).map((file) => ({
        id: newImageId(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      return [...prev, ...toAdd];
    });
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const uploadAll = useCallback(async (): Promise<string[]> => {
    const token = getAccessToken();
    const urls: string[] = [];
    const pending = imagesRef.current;

    for (const image of pending) {
      if (image.uploadedUrl) {
        urls.push(image.uploadedUrl);
        continue;
      }
      if (!image.file) continue;

      setImages((prev) =>
        prev.map((item) =>
          item.id === image.id
            ? { ...item, uploading: true, error: undefined }
            : item,
        ),
      );

      const result = await uploadProductImage(image.file, token);
      if (result.ok && result.body.data?.url) {
        urls.push(result.body.data.url);
        setImages((prev) =>
          prev.map((item) =>
            item.id === image.id
              ? {
                  ...item,
                  uploading: false,
                  uploadedUrl: result.body.data!.url,
                }
              : item,
          ),
        );
      } else {
        const message = result.body.message ?? "Image upload failed.";
        setImages((prev) =>
          prev.map((item) =>
            item.id === image.id ? { ...item, uploading: false, error: message } : item,
          ),
        );
        throw new Error(message);
      }
    }

    return urls;
  }, []);

  return {
    images,
    addImageFiles,
    removeImage,
    uploadAll,
    setFromUrls,
  };
}
