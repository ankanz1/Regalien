import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { SocialLinks } from "@/components/contact/social-links";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { AnimatedLines } from "@/components/animation/animated-lines";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact | Interior Design Kolkata",
  description: `Contact ${business.legalCompanyName} in New Town, Kolkata by WhatsApp or phone, or get directions to the office.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <section className="contact-intro section-pad" aria-labelledby="contact-title">
        <div className="shell contact-intro-layout">
          <Reveal>
            <span className="eyebrow">A conversation starts here · {business.locationLabel}</span>
            <h1 id="contact-title"><AnimatedLines lines={[{ id: "lead", content: <>Tell us about</> }, { id: "emphasis", content: <><em>your space.</em></> }]} /></h1>
          </Reveal>
          <Reveal className="contact-intro-aside" delay={0.1}>
            <p>Share a little about what you have in mind. Reach the office directly, or send an enquiry for the team to review.</p>
            <a href="#enquiry-form">Write an enquiry <span aria-hidden="true">↓</span></a>
          </Reveal>
        </div>
      </section>

      <section className="contact-main section-pad" aria-label="Contact Regalien and send an enquiry">
        <div className="shell contact-main-grid">
          <Reveal className="contact-info-panel">
            <div className="contact-info-heading"><span className="eyebrow">Get in touch</span><h2>Good things<br />begin with <em>a hello.</em></h2></div>
            <a className="contact-action-row" href={business.whatsapp.url + `?text=${encodeURIComponent(`Hello ${business.brandName}, I would like to discuss an interior design enquiry.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Message ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>
              <span className="contact-action-icon"><MessageCircle size={19} aria-hidden="true" /></span><span><small>WHATSAPP · PRIMARY CONTACT</small><strong>{business.whatsapp.display}</strong></span><ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="contact-action-row" href={business.phones.primary.href} aria-label={`Call primary number ${business.phones.primary.display}`}>
              <span className="contact-action-icon"><Phone size={19} aria-hidden="true" /></span><span><small>PRIMARY CALLING CONTACT</small><strong>{business.phones.primary.display}</strong></span><ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="contact-action-row" href={business.phones.secondary.href} aria-label={`Call secondary number ${business.phones.secondary.display}`}>
              <span className="contact-action-icon"><Phone size={19} aria-hidden="true" /></span><span><small>SECONDARY CALLING CONTACT</small><strong>{business.phones.secondary.display}</strong></span><ArrowUpRight size={17} aria-hidden="true" />
            </a>

            <div className="contact-address-block">
              <span className="contact-action-icon"><MapPin size={19} aria-hidden="true" /></span>
              <div><span className="eyebrow">Visit the office</span><address>{business.addressLines.map((line) => <span key={line}>{line}</span>)}</address>
                <a className="directions-link" href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
            <SocialLinks className="contact-socials" heading={`Follow ${business.brandName}`} ariaLabel={`${business.brandName} official social profiles`} />
          </Reveal>

          <Reveal className="contact-form-panel" delay={0.12}>
            <div className="contact-form-heading" id="enquiry-form"><span className="eyebrow">Your enquiry</span><h2>Tell us a little<br /><em>about it.</em></h2><p>Fields marked as required help us understand how to respond.</p></div>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
      <section className="contact-note" aria-label="Regalien location">
        <div className="shell contact-note-inner"><span>REGALIEN INFRASTRUCTURE PVT. LTD.</span><span>{business.locationFull}</span><WhatsAppLink ariaLabel={`Message ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>Message on WhatsApp</WhatsAppLink></div>
      </section>
    </main>
  );
}
