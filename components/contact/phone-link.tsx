import { ArrowUpRight, Phone } from "lucide-react";
import { business } from "@/lib/business";

type PhoneLinkProps = {
  secondary?: boolean;
  className?: string;
};

export function PhoneLink({ secondary = false, className = "" }: PhoneLinkProps) {
  const phone = secondary ? business.phones.secondary : business.phones.primary;
  const label = secondary ? "Call Office · Secondary" : "Call Office";

  return (
    <a
      className={`contact-method-link phone-method-link ${className}`}
      href={phone.href}
      aria-label={secondary ? `Call ${business.brandName} on the secondary line` : `Call ${business.brandName} office`}
    >
      <Phone size={17} aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
