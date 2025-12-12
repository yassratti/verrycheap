import ProfileUser from "@/components/_components/pfp";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AppHeader from "@/components/_components/app-header";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="px-0 md:px-8 lg:px-42 xl:px-52">
      <AppHeader />
    </div>
  );
}
