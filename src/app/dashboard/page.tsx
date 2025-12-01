import LogoutButton from "@/components/_components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      <div className="bg-card p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
        <p className="text-muted-foreground">
          You are successfully logged in via Google.
        </p>
      </div>
    </div>
  );
}
