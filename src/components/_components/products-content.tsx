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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Icons } from "./icons";
import { ImageUpload } from "./image-upload";
import { useUser } from "@/lib/hooks/useUser";
import { toast } from "sonner";
import type { Product } from "@/lib/supabase/types";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
} from "@/lib/hooks/useProducts";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  const { user, loading: userLoading } = useUser();
  const createProductMutation = useCreateProduct();

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

  const handleSubmit = () => {
    if (!user) {
      toast.error("You must be logged in to add a product");
      return;
    }

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

    createProductMutation.mutate(
      {
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
          setImageFile(null);
          setServiceName("");
          setSalePrice("");
          setOriginalPrice("");
          setBadges([]);
          setBadgeInput("");
          onOpenChange?.(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]"
        showCloseButton={false}
      >
        <DialogHeader className="hidden">
          <DialogTitle className="text-lg">Add Product</DialogTitle>
        </DialogHeader>

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
              className="rounded-sm"
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
              className="rounded-sm"
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
              className="rounded-sm"
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
                      className="hover:text-destructive ml-1 cursor-pointer"
                    >
                      <Icons.trash className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            className="w-full cursor-pointer rounded-sm"
            size="lg"
            onClick={handleSubmit}
            disabled={createProductMutation.isPending || userLoading}
          >
            {createProductMutation.isPending ? (
              <>Loading...</>
            ) : (
              <>
                <Icons.plus className="h-4 w-4" />
                Add Product
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
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

          <Button
            className="w-full cursor-pointer rounded-sm"
            size="lg"
            onClick={handleSubmit}
            disabled={updateProductMutation.isPending}
          >
            {updateProductMutation.isPending ? (
              <>Updating...</>
            ) : (
              <>Update Product</>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card className="flex h-auto w-70 flex-col gap-0 pt-0 pb-0 shadow-xs">
        <CardHeader className="h-auto p-0">
          {product.image_url ? (
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <Image
                src={product.image_url}
                alt={product.service_name}
                fill
                className="h-full w-full rounded-t-lg object-cover"
              />
            </AspectRatio>
          ) : (
            <div className="bg-muted flex h-48 w-full items-center justify-center rounded-t-lg">
              <p className="text-muted-foreground text-sm">No image</p>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-2">
          <CardTitle className="text-lg font-semibold">
            {product.service_name}
          </CardTitle>
          <CardDescription className="flex flex-col justify-between gap-2 text-lg font-semibold text-black">
            <div className="flex w-full justify-between">
              <p>${product.sale_price.toFixed(2)}</p>
              <p className="text-muted-foreground line-through">
                ${product.original_price.toFixed(2)}
              </p>
            </div>

            {product.plans.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.plans.map((plan: string) => (
                  <Badge key={plan} variant="outline">
                    {plan}
                  </Badge>
                ))}
              </div>
            )}
          </CardDescription>
          <CardFooter className="flex flex-col gap-2 p-0">
            <Button
              className="w-full cursor-pointer text-sm font-normal text-white"
              onClick={() => setEditOpen(true)}
            >
              <Icons.edit />
              Edit product
            </Button>
          </CardFooter>
        </CardContent>
      </Card>

      <EditProductSheet
        product={product}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};

const ProductCardSkeleton = () => {
  return (
    <Card className="flex h-80 w-70 flex-col gap-0 border-none pt-0 shadow-none">
      <CardHeader className="h-auto p-0">
        <Skeleton className="h-40 w-full rounded-t-lg" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-2">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex w-full justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 px-2">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
};

const ProductsContent = () => {
  const { user, loading: userLoading } = useUser();
  const { data: products = [], isLoading, isFetching, isError } = useProducts();

  console.log("📊 ProductsContent render");
  console.log("  - Has data:", products.length > 0);
  console.log("  - isLoading:", isLoading);
  console.log("  - isFetching:", isFetching);
  console.log("  - Using cache:", !isFetching && products.length > 0);

  // Only show skeleton if we have NO data yet (first load)
  if ((isLoading || userLoading) && products.length === 0) {
    return (
      <div className="flex flex-wrap gap-3 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Please log in to view products</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Failed to load products</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">
          No products yet. Add your first product!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 p-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsContent;
