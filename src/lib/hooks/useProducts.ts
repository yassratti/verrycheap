import { useState, useEffect } from "react";
import { useUser } from "@/lib/hooks/useUser";
import {
  getProducts,
  createProduct as createProductDb,
  updateProduct as updateProductDb,
  deleteProduct as deleteProductDb,
} from "@/lib/db/products";
import { uploadProductImage } from "@/lib/db/storage";
import type { CreateProductInput, Product } from "@/lib/supabase/types";
import { toast } from "sonner";

const PRODUCTS_UPDATED = "products-updated";

export function useProducts() {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProducts = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getProducts(user.id);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    const handleUpdate = () => fetchProducts();
    window.addEventListener(PRODUCTS_UPDATED, handleUpdate);
    return () => window.removeEventListener(PRODUCTS_UPDATED, handleUpdate);
  }, [user?.id]);

  return { data: products, isLoading, isError };
}

export function useCreateProduct() {
  const { user } = useUser();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    { input, imageFile }: { input: CreateProductInput; imageFile: File | null },
    options?: { onSuccess?: () => void }
  ) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    setIsPending(true);
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, user.id);
      }

      await createProductDb(user.id, { ...input, image_url: imageUrl });
      toast.success("Product added successfully!");
      window.dispatchEvent(new Event(PRODUCTS_UPDATED));
      options?.onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add product");
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}

export function useUpdateProduct() {
  const { user } = useUser();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    { id, input, imageFile }: { id: string; input: Partial<CreateProductInput>; imageFile?: File | null },
    options?: { onSuccess?: () => void }
  ) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    setIsPending(true);
    try {
      let imageUrl: string | undefined = input.image_url || undefined;
      
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, user.id);
      }

      await updateProductDb(id, { ...input, ...(imageUrl !== undefined && { image_url: imageUrl }) });
      toast.success("Product updated successfully!");
      window.dispatchEvent(new Event(PRODUCTS_UPDATED));
      options?.onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}

export function useDeleteProduct() {
  const { user } = useUser();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (id: string, options?: { onSuccess?: () => void }) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    setIsPending(true);
    try {
      await deleteProductDb(id);
      toast.success("Product deleted successfully!");
      window.dispatchEvent(new Event(PRODUCTS_UPDATED));
      options?.onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete product");
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}
