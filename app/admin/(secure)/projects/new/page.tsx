import { requireAdmin } from "@/lib/admin-auth"; import { redirect } from "next/navigation"; import { ProjectEditor } from "@/components/admin/project-editor";
export default async function NewProjectPage(){try{await requireAdmin();}catch{redirect("/admin/login");}return <main className="admin-main"><p className="eyebrow">PROJECT MANAGEMENT</p><h1>New project</h1><ProjectEditor/></main>;}
