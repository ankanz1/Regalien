import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { SocialLinks } from "@/components/contact/social-links";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-topline">
          <span className="eyebrow">Have a space in mind?</span>
          <WhatsAppLink ariaLabel={`Message ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>Begin with a conversation</WhatsAppLink>
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="wordmark" aria-label={`${business.brandName} home`}>
              <span className="wordmark-symbol" aria-hidden="true">R</span>
              <span className="wordmark-copy"><span className="wordmark-main">{business.brandName}</span><span className="wordmark-sub">INTERIORS · {business.locationLabel.toUpperCase()}</span></span>
            </Link>
            <p>Spaces shaped<br />around life.</p>
            <SocialLinks className="footer-socials" heading="Follow along" ariaLabel={`${business.brandName} official social profiles`} />
          </div>
          <nav className="footer-column" aria-label="Footer navigation">
            <span className="eyebrow">Explore</span>
            <Link href="/">Home</Link><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link>
          </nav>
          <div className="footer-column footer-contact">
            <span className="eyebrow">Call the office</span>
            <span className="footer-phone"><small>Primary</small><a href={business.phones.primary.href}>{business.phones.primary.display}</a></span>
            <span className="footer-phone"><small>Secondary</small><a href={business.phones.secondary.href}>{business.phones.secondary.display}</a></span>
            <WhatsAppLink className="footer-whatsapp" ariaLabel={`Message ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>WhatsApp · {business.whatsapp.display}</WhatsAppLink>
          </div>
          <div className="footer-column footer-address">
            <span className="eyebrow">Find us</span>
            <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${business.fullAddress} in Google Maps`}>
              {business.addressLines.map((line) => <span key={line}>{line}</span>)} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <p>{business.legalCompanyName}</p>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.legalCompanyName}</span><span>{business.locationLabel} · India</span><a href="#top" className="back-to-top">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
