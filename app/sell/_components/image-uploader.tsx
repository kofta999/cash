import React, { useRef, useState } from "react";
import Image from "next/image";
import { PlusIcon, XIcon } from "lucide-react";

interface ImageUploaderProps {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploader({ setImages }: ImageUploaderProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevImages) => prevImages.filter((_, i) => i !== index));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles) {
      const newFilesArray = Array.from(newFiles);
      const newObjectURLs = newFilesArray.map((file) =>
        URL.createObjectURL(file),
      );

      setImages((prevFiles) => [...prevFiles, ...newFilesArray]);
      setImageUrls((prevURLs) => [...prevURLs, ...newObjectURLs]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap items-center mb-4 border border-gray-300 rounded-md px-4 py-2">
      <input
        type="file"
        multiple
        hidden
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
      />

      {imageUrls.length == 0 ? (
        <button className="btn" onClick={() => fileInputRef.current?.click()}>
          <PlusIcon /> Upload Images
        </button>
      ) : (
        <>
          {imageUrls.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image}
                alt={`Uploaded image ${index + 1}`}
                width={100}
                height={100}
                objectFit="cover"
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
