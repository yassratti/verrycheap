import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Main seller page - redirects to the default section (products)
 * This ensures that /seller always shows a specific section
 */
export default async function Seller() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  // Redirect to the default section (products)
  redirect("/seller/products");
}
