export const ENQUIRY_SERVICES = [
  "Residential Interiors",
  "Commercial Interiors",
  "Space Planning",
  "Interior Execution",
  "Modular Solutions",
  "Something else",
] as const;

export type EnquiryService = (typeof ENQUIRY_SERVICES)[number];
export type EnquiryField = "name" | "phone" | "email" | "service" | "message";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string | null;
  service: EnquiryService | null;
  message: string;
};

export type EnquiryValidation = {
  data: EnquiryInput | null;
  errors: EnquiryErrors;
};

const NAME_MAX_LENGTH = 120;
const PHONE_RAW_MAX_LENGTH = 32;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 3000;
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const MESSAGE_CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/;
const serviceSet = new Set<string>(ENQUIRY_SERVICES);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringField(record: Record<string, unknown>, field: string): string {
  const value = record[field];
  return typeof value === "string" ? value : "";
}

export function validateEnquiryInput(value: unknown): EnquiryValidation {
  const record = isRecord(value) ? value : {};
  const rawName = stringField(record, "name");
  const rawPhone = stringField(record, "phone");
  const rawEmail = stringField(record, "email");
  const rawService = stringField(record, "service");
  const rawMessage = stringField(record, "message");

  const name = rawName.normalize("NFKC").trim().replace(/\s+/g, " ");
  const phoneWithoutFormatting = rawPhone.normalize("NFKC").trim().replace(/[\s().-]/g, "");
  const phone = phoneWithoutFormatting.startsWith("00") ? `+${phoneWithoutFormatting.slice(2)}` : phoneWithoutFormatting;
  const emailText = rawEmail.normalize("NFKC").trim().toLowerCase();
  const serviceText = rawService.normalize("NFKC").trim();
  const message = rawMessage.normalize("NFKC").replace(/\r\n?/g, "\n").trim();
  const errors: EnquiryErrors = {};

  for (const field of ["name", "phone", "email", "service", "message"] as const) {
    if (record[field] !== undefined && typeof record[field] !== "string") {
      errors[field] = "Enter this field as text.";
    }
  }

  if (name.length < 2) errors.name = "Enter your name (at least 2 characters).";
  else if (name.length > NAME_MAX_LENGTH) errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  else if (CONTROL_CHARACTERS.test(name)) errors.name = "Name contains unsupported characters.";

  if (rawPhone.trim().length === 0) errors.phone = "Enter a phone number.";
  else if (rawPhone.length > PHONE_RAW_MAX_LENGTH || !PHONE_PATTERN.test(phone)) {
    errors.phone = "Enter a valid phone number, including country code if needed.";
  }

  const email: string | null = emailText.length > 0 ? emailText : null;
  if (email !== null && email.length > EMAIL_MAX_LENGTH) errors.email = `Email must be ${EMAIL_MAX_LENGTH} characters or fewer.`;
  else if (email !== null && (!EMAIL_PATTERN.test(email) || CONTROL_CHARACTERS.test(email))) errors.email = "Enter a valid email address or leave this field blank.";

  let service: EnquiryService | null = null;
  if (serviceText.length > 0) {
    if (serviceText.length > 60 || !serviceSet.has(serviceText)) errors.service = "Choose one of the listed service interests.";
    else service = serviceText as EnquiryService;
  }

  if (message.length < MESSAGE_MIN_LENGTH) errors.message = `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
  else if (message.length > MESSAGE_MAX_LENGTH) errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  else if (MESSAGE_CONTROL_CHARACTERS.test(message)) errors.message = "Message contains unsupported characters.";

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return {
    data: { name, phone, email, service, message },
    errors,
  };
}

export function isEnquiryField(value: string): value is EnquiryField {
  return value === "name" || value === "phone" || value === "email" || value === "service" || value === "message";
}
