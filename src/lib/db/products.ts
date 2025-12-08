import { createClient } from "@/lib/supabase/client";
import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from "@/lib/supabase/types";

const TABLE_NAME = "seller_products";

/**
 * Create a new product
 * @param userId - The ID of the user creating the product
 * @param input - The product data
 * @returns The created product
 */
export async function createProduct(
  userId: string,
  input: CreateProductInput
): Promise<Product> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      user_id: userId,
      ...input,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }

  return data as Product;
}

/**
 * Get all products for a user
 * @param userId - The ID of the user
 * @returns Array of products
 */
export async function getProducts(userId: string): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return (data as Product[]) || [];
}

/**
 * Get a single product by ID
 * @param id - The product ID
 * @returns The product
 */
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Product not found
    }
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return data as Product;
}

/**
 * Update a product
 * @param id - The product ID
 * @param input - The updated product data
 * @returns The updated product
 */
export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }

  return data as Product;
}

/**
 * Delete a product
 * @param id - The product ID
 */
export async function deleteProduct(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}
