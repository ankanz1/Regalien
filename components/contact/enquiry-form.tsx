"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  ENQUIRY_SERVICES,
  isEnquiryField,
  validateEnquiryInput,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/enquiry-validation";
import { business } from "@/lib/business";

type FormState = "idle" | "submitting" | "success" | "error";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const submissionInProgress = useRef(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current || !formRef.current) return;

    const formData = new FormData(formRef.current);
    const values = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const validation = validateEnquiryInput(values);
    setFieldErrors(validation.errors);
    setFormError(null);
    setFormState("idle");

    if (!validation.data) {
      setFormError("Please check the highlighted fields.");
      return;
    }

    const website = String(formData.get("website") ?? "");
    submissionInProgress.current = true;
    setFormState("submitting");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, website }),
      });
      const result: unknown = await response.json().catch(() => null);

      if (response.ok && isRecord(result) && result.ok === true) {
        formRef.current?.reset();
        setFieldErrors({});
        setFormError(null);
        setFormState("success");
        return;
      }

      if (isRecord(result) && isRecord(result.errors)) {
        const serverErrors: EnquiryErrors = {};
        for (const [field, message] of Object.entries(result.errors)) {
          if (isEnquiryField(field) && typeof message === "string") serverErrors[field] = message;
        }
        setFieldErrors(serverErrors);
      }

      const serverMessage = isRecord(result) && typeof result.message === "string" ? result.message : null;
      setFormError(serverMessage ?? `We could not send your enquiry. Please try again or call ${business.brandName}.`);
      setFormState("error");
    } catch {
      setFormError(`We could not send your enquiry. Please check your connection, try again, or call ${business.brandName}.`);
      setFormState("error");
    } finally {
      submissionInProgress.current = false;
    }
  }

  function fieldAttributes(field: EnquiryField) {
    const errorId = `${field}-error`;
    return {
      id: field,
      "aria-invalid": fieldErrors[field] ? true : undefined,
      "aria-describedby": fieldErrors[field] ? errorId : undefined,
    };
  }

  function renderFieldError(field: EnquiryField) {
    const message = fieldErrors[field];
    return message ? <span className="form-field-error" id={`${field}-error`}>{message}</span> : null;
  }

  const submitting = formState === "submitting";

  return (
    <form ref={formRef} className="enquiry-form" action="/api/enquiries" method="post" onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      <p className="form-notice">The details you share are sent to {business.brandName} so the company can respond to your enquiry.</p>

      {formError && <p className="form-feedback form-feedback--error" role="alert">{formError}</p>}
      {formState === "success" && <p className="form-feedback form-feedback--success" role="status">Thank you. Your enquiry has been received.</p>}

      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="form-fields" disabled={submitting}>
        <legend className="sr-only">Enquiry details</legend>
        <label className="form-field" htmlFor="name"><span>Name</span><input {...fieldAttributes("name")} name="name" type="text" autoComplete="name" placeholder="Your name" minLength={2} maxLength={120} required />{renderFieldError("name")}</label>
        <label className="form-field" htmlFor="phone"><span>Phone</span><input {...fieldAttributes("phone")} name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={32} required />{renderFieldError("phone")}</label>
        <label className="form-field" htmlFor="email"><span>Email <small>(optional)</small></span><input {...fieldAttributes("email")} name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} />{renderFieldError("email")}</label>
        <label className="form-field" htmlFor="service"><span>Service interest <small>(optional)</small></span><select {...fieldAttributes("service")} name="service" defaultValue=""><option value="">Select a category</option>{ENQUIRY_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}</select>{renderFieldError("service")}</label>
        <label className="form-field form-field--wide" htmlFor="message"><span>Tell us about your space</span><textarea {...fieldAttributes("message")} name="message" rows={5} placeholder="A little about what you have in mind" minLength={10} maxLength={3000} required />{renderFieldError("message")}</label>
      </fieldset>

      <button className="button form-submit" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
      <p className="form-privacy-note">Please don’t include payment details or other sensitive information.</p>
    </form>
  );
}
