import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SellerSectionProvider } from "@/contexts/seller-section-context";
import { SellerContent } from "@/components/seller-content";

export default async function SellerSection() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const sidebarUser = {
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
    email: user.email || "",
    avatar: user.user_metadata?.avatar_url || "/avatars/default.jpg",
  };

  return (
    <SellerSectionProvider>
      <SidebarProvider>
        <AppSidebar user={sidebarUser} />
        <SidebarInset>
          <SellerContent />
        </SidebarInset>
      </SidebarProvider>
    </SellerSectionProvider>
  );
}
