import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SellerSectionProvider } from "@/contexts/seller-section-context";
import { SellerContent } from "@/components/seller-content";

/**
 * Catch-all route for seller sections (e.g., /seller/products, /seller/settings)
 * Renders the same layout as the main seller page
 * The SellerSectionProvider will detect the section from the URL
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
          <header className="flex h-12 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <p>Products</p>
            </div>
          </header>
          <SellerContent />
        </SidebarInset>
      </SidebarProvider>
    </SellerSectionProvider>
  )
}
