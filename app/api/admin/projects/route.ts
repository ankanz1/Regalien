import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";

export const runtime = "nodejs";
const fields = ["flooring", "wall_finishes", "ceiling", "furniture", "lighting", "surface_finishes", "additional_materials"] as const;
const validSlug = (value: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
function validImagePath(src: string) {
  if (/^\/(?!\/)[^\u0000-\u001f]{1,500}\.(?:jpe?g|png|webp|avif)$/i.test(src)) return true;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return false;
  try { const image = new URL(src); return image.origin === new URL(base).origin && image.pathname.startsWith("/storage/v1/object/public/project-images/") && /\.(?:jpe?g|png|webp|avif)$/i.test(image.pathname); } catch { return false; }
}

export async function GET(request: Request) {
  try { await requireAdmin(); const supabase = await createSupabaseServerClient(); if (!supabase) return NextResponse.json({ error: "Supabase unavailable" }, { status: 503 });
    const url = new URL(request.url); const page = Math.max(1, Number(url.searchParams.get("page")) || 1); const size = Math.min(50, Math.max(1, Number(url.searchParams.get("size")) || 12)); const search = (url.searchParams.get("q") ?? "").trim(); const status = url.searchParams.get("status");
    let query = supabase.from("projects").select("*", { count: "exact" }).order("display_order").range((page - 1) * size, page * size - 1);
    if (search) query = query.ilike("title", `%${search.replace(/[,%()]/g, "")}%`);
    if (status === "published") query = query.eq("published", true); if (status === "draft") query = query.eq("published", false);
    const { data, count, error } = await query; if (error) throw error; return NextResponse.json({ projects: data, count, page, size });
  } catch { return NextResponse.json({ error: "Unauthorized or project query failed." }, { status: 403 }); }
}

export async function POST(request: Request) {
  try { await requireAdmin(); const supabase = await createSupabaseServerClient(); if (!supabase) return NextResponse.json({ error: "Supabase unavailable" }, { status: 503 });
    const body = await request.json(); if (!body || typeof body.title !== "string" || body.title.trim().length < 2 || typeof body.slug !== "string" || !validSlug(body.slug)) return NextResponse.json({ error: "Valid title and slug required." }, { status: 422 });
    const specifications = Object.fromEntries(fields.map((key) => [key, typeof body.specifications?.[key] === "string" ? body.specifications[key].trim().slice(0, 1000) : ""]).filter(([, value]) => value));
    if (typeof body.title !== "string" || body.title.trim().length > 160 || typeof body.description === "string" && body.description.length > 5000 || !Array.isArray(body.images) || body.images.length > 100 || typeof body.published !== "boolean") return NextResponse.json({ error: "Project fields are invalid." }, { status: 422 });
    const rawImages: unknown[] = body.images;
    if (rawImages.some((image) => typeof image !== "object" || image === null || !("src" in image) || typeof image.src !== "string" || !validImagePath(image.src) || !("alt" in image) || typeof image.alt !== "string" || image.alt.length > 300)) return NextResponse.json({ error: "Gallery contains an invalid image path or alt text." }, { status: 422 });
    const images = rawImages.map((image, index) => { const record=image as {id?:unknown;src:string;alt:string;order?:unknown}; return { id: typeof record.id === "string" ? record.id.slice(0,100) : crypto.randomUUID(), src: record.src, alt: record.alt, order: index + 1 }; });
    if (body.cover_image && !images.some((image) => image.src === body.cover_image)) return NextResponse.json({ error: "Cover image must be selected from this project's gallery." }, { status: 422 });
    if (body.specifications && (typeof body.specifications !== "object" || Object.keys(body.specifications).some((key) => !fields.includes(key as typeof fields[number])))) return NextResponse.json({ error: "Invalid material specification." }, { status: 422 });
    const payload = { id: body.id || crypto.randomUUID(), slug: body.slug, title: body.title.trim(), description: typeof body.description === "string" ? body.description.trim() : null, images, cover_image: typeof body.cover_image === "string" ? body.cover_image : images[0]?.src ?? null, specifications, seo_title: body.seo_title || null, seo_description: body.seo_description || null, published: body.published === true, display_order: Number.isInteger(body.display_order) ? body.display_order : 0, updated_at: new Date().toISOString() };
    const { data, error } = await supabase.from("projects").upsert(payload).select().single(); if (error) throw error; return NextResponse.json({ project: data });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Project save failed." }, { status: 400 }); }
}

export async function DELETE(request: Request) {
  try { await requireAdmin(); const supabase = await createSupabaseServerClient(); const id = new URL(request.url).searchParams.get("id"); if (!supabase || !id) return NextResponse.json({ error: "Project id required." }, { status: 400 }); const { error } = await supabase.from("projects").delete().eq("id", id); if (error) throw error; return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Unauthorized or delete failed." }, { status: 403 }); }
}
