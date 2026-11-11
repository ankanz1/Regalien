"use client";
import { useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const client = createSupabaseBrowserClient(); if (!client) { setMessage("Password recovery is not configured."); return; } const email = String(new FormData(event.currentTarget).get("email")); const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/admin/reset-password` }); setMessage(error ? "We could not start recovery. Check your Supabase email configuration." : "If this address belongs to an admin account, a recovery email has been sent."); }
  return <main id="main-content" className="admin-login"><a href="/admin/login">← Back to sign in</a><p className="eyebrow">ACCOUNT RECOVERY</p><h1>Reset password</h1><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="email" required /></label><button className="button">Send recovery link</button>{message && <p role="status">{message}</p>}</form></main>;
}
