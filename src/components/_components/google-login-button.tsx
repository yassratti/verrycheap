"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <Button onClick={handleLogin}>
      Login with Google
    </Button>
  );
}
