import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function Seller() {
    const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/");
      }


    return (
        <div>
            <h1>Seller</h1>
        </div>
    )
}