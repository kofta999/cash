"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdFormData, adFormSchema, choices, governorates } from "../consts";
import { createProduct } from "../actions";
import { SubmitButton } from "@/components/submit-button";
import ImageUploader from "./image-uploader";

interface SellFormProps {
  userId: string;
}

const SellForm = ({ userId }: SellFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const schema = adFormSchema.refine(
    (data) => {
      // Check if either field has a non-null, non-empty value
      return Boolean(data.contactNumber) || Boolean(data.instagramLink);
    },
    {
      message: "Either phone number or Instagram link is required",
      path: ["contactNumber"],
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AdFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      imageUrls: [],
    },
  });

  useEffect(() => {
    setValue("imageUrls", images);
  }, [images, setValue]);

  const onSubmit = async (data: AdFormData) => {
    const formData = { ...data, userId };
    await createProduct(formData);
  };

  return (
    <div className="mx-auto my-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-base-300 mt-8 p-6 shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Post Your Ad</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Category:</h2>
              <div className="flex flex-wrap gap-4">
                {choices.map((choice) => (
                  <label
                    key={choice}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={choice}
                      {...register("type")}
                      // className="radio radio-primary"
                    />
                    <span className="capitalize">
                      {choice.replace("-", " ")}
                    </span>
                  </label>
                ))}
              </div>
              {errors.type && (
                <p className="text-error text-sm">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Ad Title:</h2>
              <input
                type="text"
                {...register("title")}
                placeholder="Enter a descriptive title for your ad"
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-error text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description:</h2>
              <textarea
                {...register("description")}
                placeholder="Describe your product and additional details (brand, size, material, etc.)"
                className="textarea textarea-bordered w-full h-32"
              />
              {errors.description && (
                <p className="text-error text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Images:</h2>
              <ImageUploader
                images={images}
                setImages={setImages}
                userId={userId}
                maxFiles={5}
                error={errors.imageUrls?.message}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Location:</h2>
              <select
                {...register("governorate")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option disabled value="">
                  Select your governorate
                </option>
                {governorates.map((governorate) => (
                  <option key={governorate.value} value={governorate.value}>
                    {governorate.label}
                  </option>
                ))}
              </select>
              {errors.governorate && (
                <p className="text-error text-sm">
                  {errors.governorate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Price:</h2>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="Enter a price in EGP"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-error text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Contact Number:</h2>
              <input
                type="tel"
                {...register("contactNumber")}
                placeholder="Enter a contact number"
                className="input input-bordered w-full"
              />
              {errors.contactNumber && (
                <p className="text-error text-sm">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Instagram Link:</h2>
              <input
                type="url"
                {...register("instagramLink")}
                placeholder="https://www.instagram.com/your_username"
                className="input input-bordered w-full"
              />
              {errors.instagramLink && (
                <p className="text-error text-sm">
                  {errors.instagramLink.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p className="text-error text-sm">{errors.root.message}</p>
            )}

            <SubmitButton pendingText="Submitting..." type="submit">
              Submit
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SellForm;

// "use client";
// import React, { useEffect, useState } from "react";
// import ImageUploader from "./image-uploader";
// import {
//   choices,
//   sellFormSchema,
//   governorates,
//   SellFormSchema,
// } from "../consts";
// import { SubmitButton } from "@/components/submit-button";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createProduct } from "../actions";
// import EnhancedImageUploader from "./enhanced-image-uploader";

// interface SellFormProps {
//   userId: string;
// }

// const SellForm = ({ userId }: SellFormProps) => {
//   const [images, setImages] = useState<string[]>([]);

//   // TODO: Show errors
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     setValue,
//   } = useForm<SellFormSchema>({
//     resolver: zodResolver(sellFormSchema),
//   });

//   useEffect(() => {
//     setValue("imageUrls", images);
//   }, [images, setValue]);

//   return (
//     <div className=" mx-auto my-5 ">
//       {" "}
//       {/* Outer form container */}
//       <form
//         onSubmit={handleSubmit((data) => {
//           console.log(data);
//           createProduct({ ...data, userId });
//         })}
//       >
//         <div className="bg-base-300 mt-8 p-4 shadow-md">
//           {" "}
//           {/* Form container */}
//           <h1 className="text-2xl font-bold text-center mb-4">Post Your Ad</h1>
//           <div className="lex flex-col md:grid md:grid-cols-2 gap-4">
//             <div className="choice-container mb-4 border border-gray-300 px-4 py-2">
//               <h2 className="text-xl font-semibold mb-2">Category:</h2>
//               {choices.map((choice, index) => (
//                 <div key={index} className="choice-item">
//                   <input
//                     type="radio"
//                     id={choice}
//                     value={choice}
//                     {...register("type")}
//                   />
//                   <label htmlFor={choice}>{choice}</label>
//                 </div>
//               ))}
//             </div>
//             <div className="title-container mb-4 border border-gray-300 px-4 py-2">
//               <h2 className="text-xl font-semibold mb-2">Ad Title:</h2>
//               <input
//                 className="input input-bordered w-full bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 type="text"
//                 id="title"
//                 {...register("title")}
//                 placeholder="Enter a descriptive title for your ad"
//               />
//             </div>
//           </div>
//           <div className="mb-4 border border-gray-300 px-4 py-2">
//             <h2 className="text-xl font-semibold mb-2">Description:</h2>
//             <textarea
//               id="description"
//               {...register("description")}
//               placeholder="Describe your product and additional details (brand, size, material, etc.)"
//               className="w-full h-48 resize-none overflow-auto bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <EnhancedImageUploader
//             setImages={setImages}
//             images={images}
//             userId={userId}
//             maxFiles={5}
//           />
//           <div className="governorate-container mb-4 border border-gray-300 px-4 py-2">
//             <h2 className="text-xl font-semibold mb-2">Location:</h2>
//             <select id="governorate" {...register("governorate")}>
//               <option value="">Select Governorate</option>
//               {governorates.map((governorate, index) => (
//                 <option key={index} value={governorate.value}>
//                   {governorate.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="title-container mb-4 border border-gray-300 px-4 py-2">
//             <h2 className="text-xl font-semibold mb-2">Price:</h2>
//             <input
//               className="input input-bordered w-full bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               /*
//              make it functional
//              */
//               type="number"
//               id="price"
//               {...register("price")}
//               placeholder="Enter a price in EGP"
//             />
//           </div>
//           <div className="title-container mb-4 border border-gray-300 px-4 py-2">
//             <h2 className="text-xl font-semibold mb-2">Contact Number:</h2>
//             <input
//               className="input input-bordered w-full bg-base-300 border border-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               /*
//              make it functional
//              */
//               type="tel"
//               id="contactNumber"
//               {...register("contactNumber")}
//               min={10}
//               max={11}
//               placeholder="Enter a contact number"
//             />
//           </div>
//           <SubmitButton pendingText="Submitting..." type="submit">
//             Submit
//           </SubmitButton>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SellForm;
