import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SellerSectionProvider } from "@/contexts/seller-section-context";
import { SellerContent } from "@/components/seller-content";

/**
 * Catch-all route for seller sections (e.g., /seller/products, /seller/settings)
 * Renders the same layout as the main seller page
 * The SellerSectionProvider will detect the section from the URL
 * Each section has its own header rendered by SellerContent
 */
export default async function SellerSection() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <SellerSectionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SellerContent />
        </SidebarInset>
      </SidebarProvider>
    </SellerSectionProvider>
  )
}
