"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ImageUpload } from "@/components/_components/image-upload";
import { useUpdateProduct, useDeleteProduct } from "@/lib/hooks/useProducts";
import { toast } from "sonner";
import type { Product } from "@/lib/supabase/types";
import { Separator } from "@radix-ui/react-dropdown-menu";

const EditProductSheet = ({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serviceName, setServiceName] = useState(product.service_name);
  const [salePrice, setSalePrice] = useState(product.sale_price.toString());
  const [originalPrice, setOriginalPrice] = useState(
    product.original_price.toString(),
  );
  const [badgeInput, setBadgeInput] = useState("");
  const [badges, setBadges] = useState<string[]>(product.plans);

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

  const handleSubmit = () => {
    if (!serviceName.trim()) {
      toast.error("Service name is required");
      return;
    }

    if (!salePrice || parseFloat(salePrice) <= 0) {
      toast.error("Valid sale price is required");
      return;
    }

    if (!originalPrice || parseFloat(originalPrice) <= 0) {
      toast.error("Valid original price is required");
      return;
    }

    updateProductMutation.mutate(
      {
        id: product.id,
        input: {
          service_name: serviceName,
          sale_price: parseFloat(salePrice),
          original_price: parseFloat(originalPrice),
          plans: badges,
        },
        imageFile,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this product? This action cannot be undone.",
      )
    ) {
      deleteProductMutation.mutate(product.id, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-0 sm:max-w-[500px]">
        <SheetHeader className="hidden">
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Image
              </label>
              <ImageUpload
                onChange={(file) => setImageFile(file)}
                defaultPreview={product.image_url || undefined}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Service Name
              </label>
              <Input
                placeholder="e.g., Spotify Premium"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="rounded-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Sale Price in USD
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="rounded-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Original USA Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="rounded-sm"
                />
              </div>
            </div>

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
                  className="rounded-sm"
                />
                <Button
                  type="button"
                  onClick={handleAddBadge}
                  size="sm"
                  className="shrink-0 cursor-pointer rounded-sm"
                >
                  Add
                </Button>
              </div>
              {badges.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveBadge(badge)}
                    >
                      {badge}
                      <span className="ml-1">×</span>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed buttons at bottom */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button
              className="flex-1 cursor-pointer rounded-sm"
              size="lg"
              onClick={handleSubmit}
              disabled={
                updateProductMutation.isPending ||
                deleteProductMutation.isPending
              }
            >
              {updateProductMutation.isPending ? (
                <>Updating...</>
              ) : (
                <>Update Product</>
              )}
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer rounded-sm"
              size="lg"
              onClick={handleDelete}
              disabled={
                deleteProductMutation.isPending ||
                updateProductMutation.isPending
              }
            >
              {deleteProductMutation.isPending ? <>Deleting...</> : <>Delete</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditProductSheet;
