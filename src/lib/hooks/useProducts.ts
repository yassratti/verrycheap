import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/lib/hooks/useUser";
import {
  getProducts,
  createProduct as createProductDb,
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
    onMutate: async ({ input, imageFile }) => {
      console.log("⚡ OPTIMISTIC UPDATE - showing product immediately");
      
      await queryClient.cancelQueries({ queryKey: ["products", user?.id] });

      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
        user?.id,
      ]);

      const optimisticProduct: Product = {
        id: `temp-${Date.now()}`,
        user_id: user!.id,
        service_name: input.service_name,
        sale_price: input.sale_price,
        original_price: input.original_price,
        image_url: imageFile ? URL.createObjectURL(imageFile) : null,
        plans: input.plans,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Product[]>(
        ["products", user?.id],
        (old = []) => [optimisticProduct, ...old]
      );

      return { previousProducts };
    },
    onError: (error, _variables, context) => {
      console.log("❌ ERROR - reverting optimistic update");
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ["products", user?.id],
          context.previousProducts
        );
      }
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
