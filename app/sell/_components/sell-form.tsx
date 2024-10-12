"use client";
import React, { useEffect, useState } from "react";
import ImageUploader from "./image-uploader";
import {
  choices,
  sellFormSchema,
  governorates,
  SellFormSchema,
} from "../consts";
import { SubmitButton } from "@/components/submit-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/app/actions";

interface SellFormProps {
  userId: string;
}

const SellForm = ({ userId }: SellFormProps) => {
  const [images, setImages] = useState<string[]>([]);

  // TODO: Show errors
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SellFormSchema>({
    resolver: zodResolver(sellFormSchema),
  });

  useEffect(() => {
    setValue("imageUrls", images);
  }, [images, setValue]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        createProduct({ ...data, userId });
      })}
    >
      <h1>post your Ad</h1>
      <div className="choice-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        {choices.map((choice, index) => (
          <div key={index} className="choice-item">
            <input
              type="radio"
              id={choice}
              value={choice}
              {...register("type")}
            />
            <label htmlFor={choice}>{choice}</label>
          </div>
        ))}
      </div>
      <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        {/* Title input container */}
        <label htmlFor="title">Ad Title :</label>
        <input
          className="input input-bordered"
          type="text"
          id="title"
          {...register("title")}
          placeholder="Enter a descriptive title for your ad"
        />
      </div>

      <div className="title-container mb-4 border border-gray-300 rounded-md px-4 py-2">
        <label htmlFor="description"> Description:</label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Describe your product and additional details (brand, size, material, etc.)"
          className="w-full h-48 resize-none overflow-auto"
        />
      </div>

      <ImageUploader setImages={setImages} images={images} userId={userId} />

      <div className="governorate-container mb-4 border-gray-300 rouded-md px-4 py-2">
        <label htmlFor="governorate">Location:</label>
        <select id="governorate" {...register("governorate")}>
          <option value="">Select Governorate</option>
          {governorates.map((governorate, index) => (
            <option key={index} value={governorate.value}>
              {governorate.label}
            </option>
          ))}
        </select>
      </div>
      <SubmitButton pendingText="Submitting..." type="submit">
        Submit
      </SubmitButton>
    </form>
  );
};

export default SellForm;
