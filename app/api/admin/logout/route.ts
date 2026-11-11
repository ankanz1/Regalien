import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
}
