"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSchool } from "@/app/actions/schools";

type FormValues = {
  name: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  address: string;
  image: FileList;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass =
  "rounded-xl border border-gray-300/70 bg-white/80 px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

export default function AddSchoolForm() {
  const [serverMsg, setServerMsg] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const imageFile = watch("image")?.[0]; // ✅ get first file from FileList

  const onSubmit = async (data: FormValues) => {
    try {
      setIsPending(true);
      setServerMsg("");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // ✅ append only the first file
      }

      const res = await createSchool(formData);
      if (!res?.ok) throw new Error(res?.error || "Failed to save school");

      setServerMsg("School saved successfully ✅");
    } catch (err: any) {
      setServerMsg(err?.message || "Something went wrong ❌");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-10 md:py-14">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-white/40 bg-white/70 p-8 shadow-xl shadow-indigo-100 backdrop-blur-md ring-1 ring-black/5">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Add School</h1>
          <p className="mt-1 text-sm text-gray-600">Enter school details and upload a display image.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-800">Name</label>
            <input className={inputClass} {...register("name", { required: "Name is required" })} placeholder="School name" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-800">City</label>
            <input className={inputClass} {...register("city", { required: "City is required" })} placeholder="City" />
            {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-800">State</label>
            <input className={inputClass} {...register("state", { required: "State is required" })} placeholder="State" />
            {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>}
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-800">Contact</label>
            <input
              className={inputClass}
              {...register("contact", {
                required: "Contact is required",
                minLength: { value: 7, message: "Minimum 7 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
                pattern: { value: /^[0-9+\-\s()]{7,20}$/, message: "Only digits and + - ( ) spaces" }
              })}
              placeholder="+91 98765 43210"
            />
            {errors.contact && <p className="mt-1 text-xs text-red-600">{errors.contact.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              className={inputClass}
              {...register("email_id", { required: "Email is required", pattern: { value: emailRegex, message: "Invalid email" } })}
              placeholder="admin@school.edu"
            />
            {errors.email_id && <p className="mt-1 text-xs text-red-600">{errors.email_id.message}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1.5 text-sm font-medium text-gray-800">Address</label>
            <input className={inputClass} {...register("address", { required: "Address is required" })} placeholder="123 Main St, Area" />
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
          </div>

          {/* Image */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1.5 text-sm font-medium text-gray-800">Image</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="rounded-xl border border-gray-300/70 bg-white/80 px-3.5 py-2.5 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              {...register("image", {
                required: "Image is required",
                validate: {
                  size: (files) => (files?.[0]?.size ?? 0) <= 5 * 1024 * 1024 || "Max file size 5MB",
                  type: (files) => (files?.[0] && ["image/jpeg", "image/png", "image/webp"].includes(files[0].type)) || "Only JPEG/PNG/WEBP"
                }
              })}
            />
            {imageFile && (
              <p className="mt-1 text-xs text-gray-500">
                {imageFile.name} • {(imageFile.size / 1024).toFixed(0)} KB
              </p>
            )}
            {errors.image && <p className="mt-1 text-xs text-red-600">{String(errors.image.message)}</p>}
          </div>

          {/* Actions */}
          <hr className="md:col-span-2 my-1 border-gray-200/70" />
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-300/40 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            {serverMsg && <p className="text-sm text-gray-700">{serverMsg}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
