import { NextResponse } from "next/server";
import { createEnquirySupabaseClient } from "@/lib/supabase-server";
import { validateEnquiryInput } from "@/lib/enquiry-validation";
import { business } from "@/lib/business";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invalidRequest(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status, headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") return invalidRequest("Send the enquiry as JSON.", 415);

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return invalidRequest("The submitted form is too large.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return invalidRequest("We could not read this submission. Please try again.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return invalidRequest("The submitted form is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return invalidRequest("Please check the form and try again.", 400);
  }

  if (!isRecord(body)) return invalidRequest("Please check the form and try again.", 400);

  const honeypot = body.website;
  if (honeypot !== undefined && (typeof honeypot !== "string" || honeypot.trim().length > 0)) {
    return invalidRequest("We could not process this submission.", 400);
  }

  const validation = validateEnquiryInput(body);
  if (!validation.data) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields and try again.", errors: validation.errors },
      { status: 422, headers: NO_STORE_HEADERS },
    );
  }

  const supabase = createEnquirySupabaseClient();
  if (!supabase) {
    return invalidRequest(`Online enquiries are temporarily unavailable. Please call ${business.brandName} using the numbers on this page.`, 503);
  }

  try {
    const { error } = await supabase.from("enquiries").insert(validation.data);
    if (error) {
      return invalidRequest(`We could not send your enquiry right now. Please try again or call ${business.brandName}.`, 503);
    }
  } catch {
    return invalidRequest(`We could not send your enquiry right now. Please try again or call ${business.brandName}.`, 503);
  }

  return NextResponse.json({ ok: true, message: "Your enquiry has been received." }, { status: 201, headers: NO_STORE_HEADERS });
}
