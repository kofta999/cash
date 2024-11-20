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
import { createProduct } from "../actions";

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
    <div className=" mx-auto my-5 ">
      {" "}
      {/* Outer form container */}
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          createProduct({ ...data, userId });
        })}
      >
        <div className="bg-base-300 mt-8 p-4 shadow-md">
          {" "}
          {/* Form container */}
          <h1 className="text-2xl font-bold text-center mb-4">Post Your Ad</h1>
          <div className="lex flex-col md:grid md:grid-cols-2 gap-4">
            <div className="choice-container mb-4 border border-gray-300 px-4 py-2">
              <h2 className="text-xl font-semibold mb-2">Category:</h2>
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
            <div className="title-container mb-4 border border-gray-300 px-4 py-2">
              <h2 className="text-xl font-semibold mb-2">Ad Title:</h2>
              <input
                className="input input-bordered w-full bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="title"
                {...register("title")}
                placeholder="Enter a descriptive title for your ad"
              />
            </div>
          </div>
          <div className="mb-4 border border-gray-300 px-4 py-2">
            <h2 className="text-xl font-semibold mb-2">Description:</h2>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Describe your product and additional details (brand, size, material, etc.)"
              className="w-full h-48 resize-none overflow-auto bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ImageUploader
            setImages={setImages}
            images={images}
            userId={userId}
          />
          <div className="governorate-container mb-4 border border-gray-300 px-4 py-2">
            <h2 className="text-xl font-semibold mb-2">Location:</h2>
            <select id="governorate" {...register("governorate")}>
              <option value="">Select Governorate</option>
              {governorates.map((governorate, index) => (
                <option key={index} value={governorate.value}>
                  {governorate.label}
                </option>
              ))}
            </select>
          </div>
          <div className="title-container mb-4 border border-gray-300 px-4 py-2">
            <h2 className="text-xl font-semibold mb-2">Price:</h2>
            <input
              className="input input-bordered w-full bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              /*
             make it functional
             */
              type="number"
              id="price"
              {...register("price")}
              placeholder="Enter a price in EGP"
            />
          </div>
          <SubmitButton pendingText="Submitting..." type="submit">
            Submit
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default SellForm;
