import { getAdminUser } from "@/lib/admin-auth";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return <div className="admin-app-shell"><AdminNavigation email={user.email ?? ""}/><div className="admin-app-content"><div className="admin-topbar"><span>Regalien / <strong>Workspace</strong></span><span>Private administration</span></div>{children}</div></div>;
}
