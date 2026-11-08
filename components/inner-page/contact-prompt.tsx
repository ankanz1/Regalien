import { EnquiryCta } from "@/components/contact/enquiry-cta";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";

type ContactPromptProps = {
  whatsappMessage?: string;
};

export function ContactPrompt({ whatsappMessage }: ContactPromptProps) {
  return (
    <section className="inner-contact-prompt" aria-labelledby="inner-contact-title">
      <div className="shell inner-contact-layout">
        <Reveal>
          <p className="eyebrow">A good place to begin</p>
          <h2 id="inner-contact-title">Let’s talk about<br /><em>your space.</em></h2>
        </Reveal>
        <Reveal className="inner-contact-actions" delay={0.1}>
          <EnquiryCta />
          <WhatsAppLink message={whatsappMessage} ariaLabel={`Chat with ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>Chat on WhatsApp</WhatsAppLink>
        </Reveal>
      </div>
    </section>
  );
}
