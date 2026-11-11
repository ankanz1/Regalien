"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const password = String(form.get("password")); const confirm = String(form.get("confirm")); if (password.length < 10 || password !== confirm) { setMessage("Use at least 10 characters and make both password fields match."); return; } const client = createSupabaseBrowserClient(); if (!client) { setMessage("Password recovery is not configured."); return; } const { error } = await client.auth.updateUser({ password }); setMessage(error ? "This recovery link is invalid or expired. Request another link." : "Password updated. You can now sign in."); }
  return <main id="main-content" className="admin-login"><Link href="/admin/login">← Back to sign in</Link><p className="eyebrow">ACCOUNT RECOVERY</p><h1>Choose a new password</h1><form onSubmit={submit}><label>New password<input name="password" type="password" autoComplete="new-password" minLength={10} required /></label><label>Confirm password<input name="confirm" type="password" autoComplete="new-password" minLength={10} required /></label><button className="button">Update password</button>{message && <p role="status">{message}</p>}</form></main>;
}
