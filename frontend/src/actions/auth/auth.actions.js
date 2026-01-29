"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export async function adminLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // ✅ login success → go to dashboard
  redirect("/admin/protected/dashboard");
}
