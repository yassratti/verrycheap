"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

import { ImageUploadProps } from "@/app/types";

export const ImageUpload = ({
  value,
  onChange,
  className,
  defaultPreview,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(
    defaultPreview || value || null,
  );
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
        <div className="group bg-muted relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <div className="absolute top-2 right-2 flex gap-1 rounded-lg border bg-white px-0.5 py-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleClick}
                    className="h-6 w-6 cursor-pointer bg-white hover:bg-neutral-200"
                  >
                    <Icons.edit className="h-4 w-4 text-neutral-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-white text-black">
                  <p>Edit image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleRemove}
                    className="h-6 w-6 cursor-pointer bg-white hover:bg-red-200"
                  >
                    <Icons.trash className="h-6 w-6 text-red-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-white text-black">
                  <p>Remove image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="border-muted-foreground/25 bg-muted/50 hover:border-muted-foreground/50 hover:bg-muted flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors"
        >
          <div className="bg-primary/10 rounded-lg p-2">
            <Icons.plus className="h-6 w-6 text-white" />
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
