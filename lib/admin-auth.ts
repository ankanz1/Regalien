import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";

/** Authenticates with Supabase Auth and checks the database-backed admin role. */
export async function getAdminUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || isAdmin !== true) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
