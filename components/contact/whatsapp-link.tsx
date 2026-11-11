import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/contact/whatsapp-icon";
import { business } from "@/lib/business";

const defaultMessage = `Hello ${business.brandName}, I am interested in your interior design services. I would like to discuss my requirements.`;

type WhatsAppLinkProps = {
  children: ReactNode;
  message?: string;
  className?: string;
  ariaLabel: string;
};

export function WhatsAppLink({ children, message = defaultMessage, className = "", ariaLabel }: WhatsAppLinkProps) {
  const href = `${business.whatsapp.url}?text=${encodeURIComponent(message)}`;

  return (
    <a className={`whatsapp-link contact-method-link ${className}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      <WhatsAppIcon size={18} />
      <span>{children}</span>
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}
