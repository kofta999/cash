import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface ImageUploaderProps {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  userId: string;
  maxFiles?: number;
  error?: string;
}

export default function ImageUploader({
  images,
  setImages,
  userId,
  maxFiles = 5,
  error,
}: ImageUploaderProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeImage = async (index: number) => {
    const imageUrl = images[index];
    const path = imageUrl.split("/").slice(-3).join("/"); // Extract path from URL

    // Remove from Supabase storage
    const { error } = await supabase.storage
      .from("product-images")
      .remove([path]);

    if (error) {
      console.error("Error removing file:", error);
      return;
    }

    // Remove from state
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const processFiles = async (files: FileList | null) => {
    if (!files) return;

    const newFilesArray = Array.from(files);
    const remainingSlots = maxFiles - images.length;
    const filesToUpload = newFilesArray.slice(0, remainingSlots);

    if (filesToUpload.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file, index) => {
        // Validate file type and size
        if (!file.type.startsWith("image/")) {
          throw new Error(`File ${file.name} is not an image`);
        }
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          throw new Error(`File ${file.name} is too large (max 5MB)`);
        }

        const filename = `${userId}/temp/${Date.now()}-${index}.${file.name.split(".").pop()}`;

        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(filename, file);

        if (error) {
          throw error;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filename);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null,
      );

      setImages((prevURLs) => [...prevURLs, ...validUrls]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files } = e.dataTransfer;
    await processFiles(files);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await processFiles(e.target.files);
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-32 transition-colors border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-200 ${
          dragActive ? "border-primary bg-base-200" : "border-base-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          disabled={isUploading || images.length >= maxFiles}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
          <p className="text-sm text-center">
            {isUploading ? (
              "Uploading..."
            ) : images.length >= maxFiles ? (
              `Maximum ${maxFiles} images allowed`
            ) : (
              <>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
                <br />
                <span className="text-xs text-base-content/70">
                  PNG, JPG or WEBP (max 5MB)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={image}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover rounded-lg brightness-75"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-base-200"
              >
                <X className="w-6 h-6" color="white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
