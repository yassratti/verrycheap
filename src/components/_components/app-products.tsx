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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Icons } from "./icons";
import type { Product } from "@/lib/supabase/types";
import { useAllProducts } from "@/lib/hooks/useProducts";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/**
 * PublicProductCard component
 * Displays a product card for public viewing with a "Purchase product" button
 * Reuses the design from the seller's ProductCard but without edit functionality
 */
const PublicProductCard = ({ product }: { product: Product }) => {
  const handlePurchase = () => {
    // TODO: Implement purchase functionality
    console.log("Purchase product:", product.id);
  };

  return (
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
            <p>
              ${product.sale_price.toFixed(2)}
              <span className="text-muted-foreground text-sm font-normal">
                /
                {product.payment_method === "monthly"
                  ? "monthly"
                  : `${product.months} months`}
              </span>
            </p>
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
            onClick={handlePurchase}
          >
            <Icons.store className="mr-2 h-4 w-4" />
            Purchase product
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

/**
 * ProductCardSkeleton component
 * Loading skeleton for product cards
 */
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

/**
 * AppProducts component
 * Displays all products from all sellers in a grid layout
 * Allows users to browse and purchase products
 */
export default function AppProducts() {
  const { data: products = [], isLoading, isError } = useAllProducts();

  // Show skeleton loaders on first load
  if (isLoading && products.length === 0) {
    return (
      <div className="flex flex-wrap gap-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Failed to load products</p>
      </div>
    );
  }

  // Show empty state
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">
          No products available yet. Check back soon!
        </p>
      </div>
    );
  }

  // Show products grid
  return (
    <div className="flex flex-wrap gap-3 p-4">
      {products.map((product: Product) => (
        <PublicProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
