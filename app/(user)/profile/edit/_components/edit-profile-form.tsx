"use client";

import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  UploadIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, updateUserSchema } from "../consts";
import { updateUser } from "../actions";
import { createClient } from "@/lib/supabase/client";

type ProfileFormData = {
  id: string;
  full_name: string | null;
  bio: string | null;
  phone_number: string | null;
  avatar: string | null;
  links: string[];
};

interface ProfileEditFormProps {
  initialData: ProfileFormData;
}

export default function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(initialData.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: "links",
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    setIsLoading(true);
    // Add your form submission logic here
    console.log(data);
    const status = await updateUser(data);

    if (status) {
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const supabase = createClient();
    const file = event.target.files?.[0];
    const userId = initialData.id;

    if (file) {
      if (!file.type.startsWith("image/")) {
        throw new Error(`File ${file.name} is not an image`);
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        throw new Error(`File ${file.name} is too large (max 5MB)`);
      }

      const filename = `${userId}/avatar-${Date.now()}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filename, file);

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filename);

      setPreviewImage(publicUrl);
      setValue("avatar", publicUrl);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
        >
          {isEditing ? (
            <>
              <CheckIcon size={20} className="mr-2" />
              Finish Editing
            </>
          ) : (
            <>
              <PencilIcon size={20} className="mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div
          className={`card bg-base-100 shadow-xl ${!isEditing ? "opacity-70" : ""}`}
        >
          <div className="card-body">
            <h2 className="card-title">Personal Information</h2>
            <div className="form-control">
              <label className="label" htmlFor="full_name">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                id="full_name"
                {...register("full_name", {
                  required: "Full name is required",
                })}
                className={`input input-bordered ${errors.full_name ? "input-error" : ""}`}
                placeholder="Enter your full name"
                disabled={!isEditing}
              />
              {errors.full_name && (
                <span className="text-error text-sm mt-1">
                  {errors.full_name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="bio">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                id="bio"
                {...register("bio")}
                className={`textarea textarea-bordered h-24 ${errors.bio ? "textarea-error" : ""}`}
                placeholder="Tell us about yourself"
                disabled={!isEditing}
              />
              {errors.bio && (
                <span className="text-error text-sm mt-1">
                  {errors.bio.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label" htmlFor="avatar">
                <span className="label-text">Profile Picture</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <input
                  type="file"
                  id="avatar"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  disabled={!isEditing}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary"
                  disabled={!isEditing}
                >
                  <UploadIcon size={20} className="mr-2" />
                  Upload Image
                </button>
              </div>
              {errors.avatar && (
                <span className="text-error text-sm mt-1">
                  {errors.avatar.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          className={`card bg-base-100 shadow-xl ${!isEditing ? "opacity-70" : ""}`}
        >
          <div className="card-body">
            <h2 className="card-title">Contact Information</h2>
            <div className="form-control">
              <label className="label" htmlFor="phone_number">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                id="phone_number"
                {...register("phone_number")}
                className={`input input-bordered ${errors.phone_number ? "input-error" : ""}`}
                placeholder="Enter your phone number"
                disabled={!isEditing}
              />
              {errors.phone_number && (
                <span className="text-error text-sm mt-1">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

            <h3 className="font-semibold mt-4 mb-2">Social Links</h3>
            <div className="form-control">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-2 mt-2"
                >
                  <input
                    {...register(`links.${index}`)}
                    className={`input input-bordered flex-grow ${errors.links?.[index] ? "input-error" : ""}`}
                    placeholder="Enter profile URL"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn btn-square btn-error"
                    >
                      <TrashIcon size={20} />
                    </button>
                  )}
                  {errors.links?.[index] && (
                    <span className="text-error text-sm mt-1">
                      {errors.links[index]?.message}
                    </span>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => append({ platform: "", url: "" })}
                  className="btn btn-primary mt-2"
                >
                  <PlusIcon size={20} className="mr-2" />
                  Add Link
                </button>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
