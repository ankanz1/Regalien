import Image from "next/image";
import Link from "next/link";
import { AnimatedLines } from "@/components/animation/animated-lines";
import { ContactPrompt } from "@/components/inner-page/contact-prompt";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";
import { proposedServices } from "@/lib/proposed-services";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interior Design Services",
  description: `Review proposed residential, commercial and planning categories for ${business.brandName} in New Town, Kolkata. Categories are pending confirmation.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main-content" className="services-page">
      <section className="services-intro section-pad" aria-labelledby="services-page-title">
        <div className="shell services-intro-layout">
          <Reveal>
            <span className="eyebrow">Five possibilities · To be confirmed</span>
            <h1 id="services-page-title"><AnimatedLines lines={[{ id: "lead", content: <>Ideas for</> }, { id: "emphasis", content: <><em>considered spaces.</em></> }]} /></h1>
          </Reveal>
          <Reveal className="services-intro-aside" delay={0.12}>
            <p>These categories are proposed content for discussion with Regalien. Scope and availability have not yet been confirmed by the client.</p>
            <span>{business.locationLabel.toUpperCase()}</span>
          </Reveal>
        </div>
      </section>

      <section className="service-story-list" aria-label="Proposed service categories">
        {proposedServices.map((service, index) => (
          <article className={`service-story ${index % 2 ? "service-story--reverse" : ""}`} key={service.number}>
            <Reveal className="service-story-image" variant="image">
              <Image src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=1600&q=82`} alt={`${service.alt}; illustrative image, not a Regalien project`} fill sizes="(max-width: 760px) 100vw, 56vw" className="editorial-image" />
              <span className="image-caption">ILLUSTRATIVE IMAGE · NOT A REGALIEN PROJECT</span>
            </Reveal>
            <Reveal className="service-story-copy" delay={0.08}>
              <span className="service-story-index">{service.number} / 05</span>
              <span className="eyebrow">Proposed category · Pending confirmation</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link className="service-story-link" href="/contact">Discuss this idea <span aria-hidden="true">↗</span></Link>
            </Reveal>
          </article>
        ))}
      </section>
      <ContactPrompt whatsappMessage={`Hello ${business.brandName}, I would like to discuss one of your proposed interior design categories and share my requirements.`} />
    </main>
  );
}
