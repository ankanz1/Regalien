import Image from "next/image";
import { AnimatedLines } from "@/components/animation/animated-lines";
import { BrandMarquee } from "@/components/animation/brand-marquee";
import { Button } from "@/components/button";
import { ContactPrompt } from "@/components/inner-page/contact-prompt";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description: `Learn about ${business.legalCompanyName}, an interior design company in New Town, Kolkata, and its thoughtful approach to spaces.`,
  path: "/about",
});

const approach = [
  { number: "01", title: "Begin with listening", text: "Understand the people, rhythms and practical needs that give a space its purpose." },
  { number: "02", title: "Shape the experience", text: "Consider how proportion, light, materials and movement work together." },
  { number: "03", title: "Resolve the details", text: "Bring the essential choices into a considered and cohesive whole." },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <section className="inner-hero" aria-labelledby="about-page-title">
        <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=84" alt="Illustrative, sunlit interior with warm timber and calm natural materials; not a Regalien project" fill priority sizes="100vw" className="inner-hero-image" />
        <div className="inner-hero-shade" aria-hidden="true" />
        <div className="shell inner-hero-copy">
          <p className="eyebrow">A little about us · {business.locationLabel}</p>
          <h1 id="about-page-title"><AnimatedLines lines={[{ id: "lead", content: <>Thoughtful spaces,</> }, { id: "emphasis", content: <><em>considered living.</em></> }]} /></h1>
          <p>{business.legalCompanyName} is an interior design and infrastructure company based in {business.locationFull}.</p>
          <span className="inner-hero-note">ILLUSTRATIVE INTERIOR · NOT A REGALIEN PROJECT</span>
        </div>
      </section>

      <section className="about-story section-pad" aria-labelledby="about-intro-title">
        <div className="shell about-story-grid">
          <Reveal className="about-story-image" variant="image">
            <Image src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=82" alt="Illustrative open-plan living area with generous natural light; not a Regalien project" fill sizes="(max-width: 760px) 100vw, 45vw" className="editorial-image" />
            <span className="image-caption">ILLUSTRATIVE · SPACE AND LIGHT</span>
          </Reveal>
          <Reveal className="about-story-copy" delay={0.1}>
            <span className="eyebrow">Our point of view</span>
            <h2 id="about-intro-title">Make room for<br /><em>what matters.</em></h2>
            <p>A well-considered interior starts with the life it needs to hold. The brief, the setting and the everyday details all have a place in shaping it.</p>
            <p>Regalien brings interior design and infrastructure together as a company based in Newtown, Kolkata. More about its team, history and completed work can be added as those details are confirmed.</p>
            <Button href="/services" variant="text">Explore proposed categories</Button>
          </Reveal>
        </div>
      </section>

      <section className="about-belief section-pad" aria-labelledby="about-belief-title">
        <div className="shell about-belief-layout">
          <Reveal><span className="eyebrow">A design philosophy</span><span className="belief-index">01 — 03</span></Reveal>
          <Reveal className="about-belief-copy" delay={0.1}>
            <h2 id="about-belief-title">A space can be<br /><em>beautiful to live in.</em></h2>
            <p>Function, aesthetics and thoughtful decisions can belong in the same conversation. Each project begins with its own context; this is a design point of view, not a claim about past work.</p>
          </Reveal>
        </div>
      </section>

      <BrandMarquee />

      <section className="about-approach section-pad" aria-labelledby="about-approach-title">
        <div className="shell">
          <Reveal className="section-heading">
            <div><span className="eyebrow">A way of thinking</span><h2 id="about-approach-title">From the overall<br /><em>to the essential.</em></h2></div>
            <p className="section-intro">A thoughtful framework for approaching the shape and feeling of a space.</p>
          </Reveal>
          <div className="approach-list">
            {approach.map((item, index) => (
              <Reveal className="approach-row" key={item.number} delay={index * 0.06}>
                <span className="approach-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-company section-pad" aria-labelledby="company-information-title">
        <div className="shell about-company-layout">
          <Reveal><span className="eyebrow">Company information</span><h2 id="company-information-title">Rooted in<br /><em>{business.locationLabel}.</em></h2></Reveal>
          <Reveal className="company-facts" delay={0.1}>
            <div><span>Legal name</span><p>{business.legalCompanyName}</p></div>
            <div><span>Brand</span><p>{business.brandName}</p></div>
            <div><span>Address</span><p>{business.fullAddress}</p></div>
          </Reveal>
        </div>
      </section>
      <ContactPrompt />
    </main>
  );
}
