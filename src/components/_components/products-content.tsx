"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icons } from "./icons";
import { ImageUpload } from "./image-upload";

interface AddProductProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export const AddProduct = ({
  open,
  onOpenChange,
  trigger,
}: AddProductProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg">Add Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>
            <ImageUpload onChange={(file) => setImageFile(file)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductCard = () => {
  return (
    <>
      <Card className="flex h-80 w-70 flex-col gap-0 pt-0 shadow-xs">
        <CardHeader className="h-auto p-0">
          <Image
            src="/spotify-banner.png"
            alt="Spotify Banner"
            width={400}
            height={200}
            className="h-auto w-full rounded-t-lg object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-2">
          <CardTitle className="text-lg font-semibold">
            Spotify Premium
          </CardTitle>
          <CardDescription className="flex flex-col justify-between gap-2 text-lg font-semibold text-black">
            <div className="flex w-full justify-between">
              <p>$0,00</p>
              <p className="text-muted-foreground line-through">$0,00</p>
            </div>

            <div className="flex gap-1">
              <Badge variant="outline">individual</Badge>
              <Badge variant="outline">Family</Badge>
            </div>
          </CardDescription>
          <CardFooter className="p-0">
            <Button className="w-full cursor-pointer text-sm font-normal text-white">
              <Icons.edit />
              Edit product
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
};

const ProductsContent = () => {
  return (
    <>
      <div className="flex flex-wrap gap-3 p-4">
        <ProductCard />
      </div>
    </>
  );
};

export default ProductsContent;
