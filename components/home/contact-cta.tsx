import { EnquiryCta } from "@/components/contact/enquiry-cta";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";

export function ContactCta() {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-title">
      <div className="shell contact-cta-layout">
        <Reveal>
          <p className="eyebrow">Your space, your next step</p>
          <h2 id="contact-cta-title">Let’s start<br /><em>with a conversation.</em></h2>
        </Reveal>
        <Reveal className="contact-cta-actions" delay={0.12}>
          <EnquiryCta />
          <WhatsAppLink ariaLabel={`Chat with ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>Chat on WhatsApp</WhatsAppLink>
          <div className="contact-phones"><span className="contact-phone-item"><small>Primary call</small><a href={business.phones.primary.href} aria-label={`Call primary number ${business.phones.primary.display}`}>{business.phones.primary.display}</a></span><span className="contact-phone-item"><small>Secondary call</small><a href={business.phones.secondary.href} aria-label={`Call secondary number ${business.phones.secondary.display}`}>{business.phones.secondary.display}</a></span></div>
        </Reveal>
      </div>
    </section>
  );
}
