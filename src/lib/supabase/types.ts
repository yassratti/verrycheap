// TypeScript types for database entities

export interface Product {
  id: string;
  user_id: string;
  service_name: string;
  sale_price: number;
  original_price: number;
  image_url: string | null;
  plans: string[];
  payment_method: "monthly" | "one-time";
  months: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  service_name: string;
  sale_price: number;
  original_price: number;
  image_url?: string | null;
  plans: string[];
  payment_method: "monthly" | "one-time";
  months?: number | null;
}

export interface UpdateProductInput {
  service_name?: string;
  sale_price?: number;
  original_price?: number;
  image_url?: string | null;
  plans?: string[];
  payment_method?: "monthly" | "one-time";
  months?: number | null;
}
