import React, { useRef, useState } from "react";
import Image from "next/image";
import { PlusIcon, XIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  userId: string;
}

export default function ImageUploader({
  images,
  setImages,
  userId,
}: ImageUploaderProps) {
  // PLAN
  // First upload files client side to /userId/temp
  // it wont matter if the user refreshed
  // when the data gets submitted to the server I'll call to empty the /temp folder
  // then add product urls seamlessly

  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;

    if (newFiles) {
      const newFilesArray = Array.from(newFiles);
      const uploadPromises = newFilesArray.map(async (file, index) => {
        const filename = `${userId}/temp/${Date.now()}-${index}.${file.name.split(".")[1]}`;
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(filename, file);

        if (error) {
          console.error("Error uploading file:", error);
          return null;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filename);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter((url) => url !== null) as string[];

      setImages((prevURLs) => [...prevURLs, ...validUrls]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap items-center mb-4 border border-gray-300 rounded-md px-4 py-2">
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
      />

      {images.length == 0 ? (
        <button className="btn" onClick={() => fileInputRef.current?.click()}>
          <PlusIcon /> Upload Images
        </button>
      ) : (
        <>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image}
                alt={`Uploaded image ${index + 1}`}
                width={100}
                height={100}
                className="rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <XIcon color="white" />
              </button>
            </div>
          ))}
          <div className="flex justify-center items-center">
            <button
              className="btn btn-ghost"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </button>
          </div>
        </>
      )}
    </div>
  );
}
