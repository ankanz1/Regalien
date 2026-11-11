import { EnquiryCta } from "@/components/contact/enquiry-cta";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { PhoneLink } from "@/components/contact/phone-link";
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
          <WhatsAppLink ariaLabel={`Message ${business.brandName} on WhatsApp`}>WhatsApp</WhatsAppLink>
          <div className="contact-phones"><PhoneLink /><PhoneLink secondary /></div>
        </Reveal>
      </div>
    </section>
  );
}
