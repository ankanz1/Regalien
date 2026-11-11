"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setError("Supabase authentication is not configured."); setBusy(false); return; }
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) });
    if (authError || !data.user) { setError("Sign in failed. Check your details or account access."); setBusy(false); return; }
    router.replace("/admin"); router.refresh();
  }
  return <main id="main-content" className="admin-login"><Link href="/" className="eyebrow">← Regalien website</Link><p className="eyebrow">REGALIEN · ADMINISTRATION</p><h1>Sign in</h1><p>Use an authorized team account to manage the website.</p><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p role="alert">{error}</p>}<button className="button" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button><Link href="/admin/forgot-password">Forgot password?</Link></form></main>;
}
