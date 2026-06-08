"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IFTag } from "@/app/interfaces/tag";
import TagInput from "@/app/blogs/new/components/TagInput";
import ImageInput from "@/app/blogs/new/components/ImageInput";
import { createBlog } from "@/app/api/blogApi";
import { createTag } from "@/app/api/tagApi";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

// SimpleMDE truy cập `document` khi import → chỉ load phía client, tránh
// lỗi "document is not defined" khi Next prerender trang ở build time.
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type TFormData = {
  imageFile: File | null;
  title: string;
  tags: IFTag[];
  body: string;
};

export default function FormBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState<TFormData>({
    imageFile: null,
    title: "",
    tags: [],
    body: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    field: keyof typeof formData,
    value: (typeof formData)[keyof typeof formData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateTagIds = async (tags: IFTag[]) => {
    return await Promise.all(
      tags.map(async (tag) => {
        if (!tag.isNew) return tag.id;
        const { data } = await createTag(
          tag.name,
          tag.description || tag.name
        );
        return data?.data?.id;
      })
    ).then((ids) => ids.filter((id) => id !== null));
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalTags = await generateTagIds(formData.tags);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("body", formData.body);
    submitData.append("status", "published");

    finalTags.forEach((tagId, index) => {
      submitData.append(`tags[${index}]`, tagId.toString());
    });

    if (formData.imageFile) {
      submitData.append("image", formData.imageFile);
    }

    const { error } = await createBlog(submitData);
    if (!error) {
      router.push("/");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <form onSubmit={handlePublish}>
        <ImageInput
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setImageFile={(value) => handleChange("imageFile", value)}
        />
        <div className="mb-4">
          <input
            type="text"
            placeholder="New Blog title here..."
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-2 border-none rounded text-3xl font-bold focus:outline-none dark:bg-black"
          />
        </div>
        <TagInput
          tags={formData.tags}
          setTags={(value) => handleChange("tags", value)}
        />
        <SimpleMDE
          value={formData.body}
          onChange={(value) => handleChange("body", value)}
        />
        <div className="flex justify-center mt-3">
          <Button type="submit" variant="default">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
