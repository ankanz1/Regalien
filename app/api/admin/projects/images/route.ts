import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";

const bucket = "project-images";
function objectPath(source: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const prefix = `${base}/storage/v1/object/public/${bucket}/`;
  if (!source.startsWith(prefix)) return null;
  const path = decodeURIComponent(source.slice(prefix.length));
  if (!path || path.split("/").some((part) => part === "..")) return null;
  return path;
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Supabase unavailable" }, { status: 503 });
    const body: unknown = await request.json();
    const sources = typeof body === "object" && body !== null && "sources" in body && Array.isArray(body.sources) ? body.sources.filter((s): s is string => typeof s === "string") : [];
    if (sources.length > 100) return NextResponse.json({ error: "Too many objects." }, { status: 413 });
    const candidatePaths = [...new Set(sources.map(objectPath).filter((p): p is string => p !== null))];
    if (!candidatePaths.length) return NextResponse.json({ deleted: 0, preserved: sources.length });
    const { data: rows, error: readError } = await supabase.from("projects").select("images");
    if (readError) return NextResponse.json({ error: "Could not verify image references; no files were deleted." }, { status: 503 });
    const referenced = new Set<string>();
    for (const row of rows ?? []) for (const image of Array.isArray(row.images) ? row.images : []) if (image && typeof image.src === "string") { const path = objectPath(image.src); if (path) referenced.add(path); }
    const removable = candidatePaths.filter((path) => !referenced.has(path));
    if (!removable.length) return NextResponse.json({ deleted: 0, preserved: candidatePaths.length });
    const { error } = await supabase.storage.from(bucket).remove(removable);
    if (error) return NextResponse.json({ error: "Database save succeeded, but Storage cleanup failed." }, { status: 502 });
    return NextResponse.json({ deleted: removable.length, preserved: candidatePaths.length - removable.length });
  } catch {
    return NextResponse.json({ error: "Unauthorized or image cleanup failed." }, { status: 403 });
  }
}
