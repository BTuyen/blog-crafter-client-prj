"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { showToast } from "@/lib/toast";

type TImageProps = {
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  setImageFile: (file: File | null) => void;
}

export default function ImageInput({
  imagePreview,
  setImagePreview,
  setImageFile,
}: TImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    if (file.size > 500 * 1024 * 1024) {
      showToast("error", "File is too large, please select file <= 500MB");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    if (!imagePreview) return;
    URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!imagePreview ? (
        <Button onClick={handleButtonClick} variant="outline" type="button">
          Add a cover image
        </Button>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <Image
            src={imagePreview}
            alt="Uploaded"
            width={192}
            height={192}
            className="object-cover rounded"
          />
          <Button onClick={handleButtonClick} variant="secondary" type="button">
            Change
          </Button>
          <Button
            onClick={handleRemoveImage}
            variant="destructive"
            type="button"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
