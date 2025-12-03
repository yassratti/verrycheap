import ProfilePicture from "@/components/_components/pfp";
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
        <ProfilePicture />
      </div>
     
    </div>
  );
}
