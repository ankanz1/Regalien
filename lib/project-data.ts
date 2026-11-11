import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase-server-auth";
import { projectsWithPhotos, type InteriorProject } from "@/lib/projects";
export type ManagedProject = Omit<InteriorProject,"coverImage"> & { coverImage:string; slug:string; description:string|null; specifications:Record<string,string>; published:boolean; seo_title:string|null; seo_description:string|null; display_order:number };
function normalize(row:Record<string,unknown>):ManagedProject{return {id:String(row.id),name:String(row.title),slug:String(row.slug),coverImage:String(row.cover_image??""),images:Array.isArray(row.images)?row.images as InteriorProject["images"]:[],description:typeof row.description==="string"?row.description:null,specifications:typeof row.specifications==="object"&&row.specifications!==null?row.specifications as Record<string,string>:{},published:row.published===true,seo_title:typeof row.seo_title==="string"?row.seo_title:null,seo_description:typeof row.seo_description==="string"?row.seo_description:null,display_order:Number(row.display_order)||0};}
function legacyPublishedProjects(): ManagedProject[] { return projectsWithPhotos.map((p, index) => normalize({ id: p.id, slug: p.id, title: p.name, cover_image: p.coverImage, images: p.images, published: true, specifications: {}, display_order: index + 1 })); }
export async function listPublishedProjects():Promise<ManagedProject[]>{
  // Keep the existing public portfolio available until its manifest import has been reviewed.
  // Enabling DB mode makes RLS-published rows the sole source, including the correct empty state.
  if (process.env.PROJECTS_DATABASE_ENABLED !== "true") return legacyPublishedProjects();
  const client=await createSupabaseServerClient(); if(!client)return [];
  const {data,error}=await client.from("projects").select("*").eq("published",true).order("display_order");
  if(error)return [];
  return (data??[]).map(normalize);
}
export async function getPublishedProject(slug:string){return (await listPublishedProjects()).find(p=>p.slug===slug)||null;}
