import { requireAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { ProjectAdminList } from "@/components/admin/project-admin-list";
export default async function AdminProjectsPage() { try { await requireAdmin(); } catch { redirect("/admin/login"); } return <main className="admin-main"><p className="eyebrow">PROJECT MANAGEMENT</p><h1>Projects</h1><ProjectAdminList /></main>; }
