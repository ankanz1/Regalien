import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import { Reveal } from "@/components/home/reveal";
import { proposedServices } from "@/lib/proposed-services";

export function ServicesPreview() {
  return (
    <section className="services-preview section-pad" id="services-preview" aria-labelledby="services-title">
      <div className="shell">
        <Reveal className="section-heading services-heading">
          <div><p className="eyebrow">Areas of focus</p><h2 id="services-title">Considered for<br /><em>everyday life.</em></h2></div>
          <p className="section-intro">Five proposed categories for client confirmation. Each is a starting point, not a confirmed service list.</p>
        </Reveal>
        <div className="service-cards">
          {proposedServices.map((service, index) => (
            <Reveal key={service.number} className={`service-card service-card--${index + 1}`} delay={index < 3 ? index * 0.06 : 0}>
              <div className="service-card-image-wrap">
                <div className="service-card-image">
                  <Image src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=1000&q=78`} alt={`${service.alt}; illustrative image, not a Regalien project`} fill sizes="(max-width: 700px) 88vw, (max-width: 1050px) 44vw, 30vw" className="editorial-image" />
                  <span className="service-card-number">{service.number}</span>
                  <span className="service-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
                </div>
                <span className="service-image-note">ILLUSTRATIVE · NOT A REGALIEN PROJECT</span>
              </div>
              <h3>{service.title}</h3>
              <p className="proposed-label">PROPOSED CATEGORY</p>
            </Reveal>
          ))}
        </div>
        <div className="services-more"><Button href="/services" variant="text">View all services</Button></div>
      </div>
    </section>
  );
}
