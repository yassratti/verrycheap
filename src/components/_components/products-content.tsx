"use client";

import { useState, useEffect } from "react";
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
import { useUser } from "@/lib/hooks/useUser";
import { createProduct, getProducts } from "@/lib/db/products";
import { uploadProductImage } from "@/lib/db/storage";
import { toast } from "sonner";
import type { Product } from "@/lib/supabase/types";

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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
  const [badges, setBadges] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    // Validation
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

    setIsSubmitting(true);

    try {
      let imageUrl: string | null = null;

      // Upload image if provided
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, user.id);
      }

      // Create product
      await createProduct(user.id, {
        service_name: serviceName,
        sale_price: parseFloat(salePrice),
        original_price: parseFloat(originalPrice),
        image_url: imageUrl,
        plans: badges,
      });

      // Success!
      toast.success("Product added successfully!");

      // Reset form
      setImageFile(null);
      setServiceName("");
      setSalePrice("");
      setOriginalPrice("");
      setBadges([]);
      setBadgeInput("");

      // Close dialog
      onOpenChange?.(false);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add product",
      );
    } finally {
      setIsSubmitting(false);
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
            disabled={isSubmitting || userLoading}
          >
            {isSubmitting ? (
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

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <>
      <Card className="flex h-80 w-70 flex-col gap-0 pt-0 shadow-xs">
        <CardHeader className="h-auto p-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.service_name}
              width={400}
              height={200}
              className="h-auto w-full rounded-t-lg object-cover"
            />
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
  const { user, loading: userLoading } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const fetchedProducts = await getProducts(user.id);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchProducts();
    }
  }, [user, userLoading]);

  if (loading || userLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading products...</p>
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsContent;
