"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  className,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Call onChange callback
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleClick}
            >
              <Icons.edit className="mr-2 h-4 w-4" />
              Change
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="border-muted-foreground/25 bg-muted/50 hover:border-muted-foreground/50 hover:bg-muted flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors"
        >
          <div className="bg-primary/10 rounded-full p-4">
            <Icons.plus className="text-primary h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Upload Image</p>
            <p className="text-muted-foreground text-xs">
              Click to browse or drag and drop
            </p>
          </div>
        </button>
      )}
    </div>
  );
};
