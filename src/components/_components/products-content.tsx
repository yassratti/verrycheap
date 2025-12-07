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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  const [serviceName, setServiceName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
  const [badges, setBadges] = useState<string[]>([]);

  const handleAddBadge = () => {
    if (badgeInput.trim() && !badges.includes(badgeInput.trim())) {
      setBadges([...badges, badgeInput.trim()]);
      setBadgeInput("");
    }
  };

  const handleRemoveBadge = (badgeToRemove: string) => {
    setBadges(badges.filter((badge) => badge !== badgeToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddBadge();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-lg">Add Product</DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>
            <ImageUpload onChange={(file) => setImageFile(file)} />
          </div>

          {/* Service Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Service Name
            </label>
            <Input
              placeholder="e.g., Spotify Premium"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          {/* Sale Price */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Sale Price in USD
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </div>

          {/* Original USA Price */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Original USA Price
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          {/* Plans/Badges */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Available Plans
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Individual, Family"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                type="button"
                onClick={handleAddBadge}
                size="sm"
                className="shrink-0"
              >
                Add
              </Button>
            </div>

            {/* Display Badges */}
            {badges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {badge}
                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(badge)}
                      className="hover:text-destructive ml-1"
                    >
                      <Icons.trash className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full" size="lg">
            Add Product
          </Button>
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
