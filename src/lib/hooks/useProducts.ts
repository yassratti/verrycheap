import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export function useProducts() {
  const { user } = useUser();

  return useQuery({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      console.log("🔄 FETCHING from Supabase...");
      const products = await getProducts(user!.id);
      console.log("✅ Got", products.length, "products from API");
      return products;
    },
    enabled: !!user,
    placeholderData: (previousData) => previousData, // Keep showing old data while refetching
  });
}

export function useCreateProduct() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      input,
      imageFile,
    }: {
      input: CreateProductInput;
      imageFile: File | null;
    }) => {
      if (!user) throw new Error("User not authenticated");

      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, user.id);
      }

      return createProductDb(user.id, {
        ...input,
        image_url: imageUrl,
      });
    },
    onError: (error) => {
      console.log("❌ ERROR - failed to create product");
      toast.error(
        error instanceof Error ? error.message : "Failed to add product"
      );
    },
    onSuccess: () => {
      console.log("✅ Product created successfully");
      toast.success("Product added successfully!");
    },
    onSettled: () => {
      console.log("🔄 Refetching to confirm...");
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
    },
  });
}

export function useUpdateProduct() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
      imageFile,
    }: {
      id: string;
      input: Partial<CreateProductInput>;
      imageFile?: File | null;
    }) => {
      if (!user) throw new Error("User not authenticated");

      let imageUrl: string | undefined = input.image_url || undefined;
      
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, user.id);
      }

      return updateProductDb(id, {
        ...input,
        ...(imageUrl !== undefined && { image_url: imageUrl }),
      });
    },
    onMutate: async ({ id, input, imageFile }) => {
      console.log("⚡ OPTIMISTIC UPDATE - updating product");
      
      await queryClient.cancelQueries({ queryKey: ["products", user?.id] });

      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
        user?.id,
      ]);

      queryClient.setQueryData<Product[]>(
        ["products", user?.id],
        (old = []) =>
          old.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...input,
                  ...(imageFile && { image_url: URL.createObjectURL(imageFile) }),
                  updated_at: new Date().toISOString(),
                }
              : p
          )
      );

      return { previousProducts };
    },
    onError: (error, _variables, context) => {
      console.log("❌ ERROR - reverting update");
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ["products", user?.id],
          context.previousProducts
        );
      }
      toast.error(
        error instanceof Error ? error.message : "Failed to update product"
      );
    },
    onSuccess: () => {
      console.log("✅ Product updated successfully");
      toast.success("Product updated successfully!");
    },
    onSettled: () => {
      console.log("🔄 Refetching to confirm...");
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
    },
  });
}

export function useDeleteProduct() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error("User not authenticated");
      return deleteProductDb(id);
    },
    onMutate: async (id) => {
      console.log("⚡ OPTIMISTIC UPDATE - removing product");
      
      await queryClient.cancelQueries({ queryKey: ["products", user?.id] });

      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
        user?.id,
      ]);

      queryClient.setQueryData<Product[]>(
        ["products", user?.id],
        (old = []) => old.filter((p) => p.id !== id)
      );

      return { previousProducts };
    },
    onError: (error, _variables, context) => {
      console.log("❌ ERROR - reverting delete");
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ["products", user?.id],
          context.previousProducts
        );
      }
      toast.error(
        error instanceof Error ? error.message : "Failed to delete product"
      );
    },
    onSuccess: () => {
      console.log("✅ Product deleted successfully");
      toast.success("Product deleted successfully!");
    },
    onSettled: () => {
      console.log("🔄 Refetching to confirm...");
      queryClient.invalidateQueries({ queryKey: ["products", user?.id] });
    },
  });
}
