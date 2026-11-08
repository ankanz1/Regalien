import Image from "next/image";
import { Button } from "@/components/button";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";

export function AboutPreview() {
  return (
    <section className="about-preview section-pad" id="about-intro" aria-labelledby="about-title">
      <div className="shell about-layout">
        <Reveal className="about-image-wrap" variant="image">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=82"
            alt="Illustrative interior with sculptural furniture, warm wood and soft daylight; not a Regalien project"
            fill
            sizes="(max-width: 760px) 100vw, 48vw"
            className="editorial-image"
          />
          <span className="image-caption">ILLUSTRATIVE INTERIOR · LIGHT · MATERIAL · FORM</span>
        </Reveal>
        <Reveal className="about-copy" delay={0.12}>
          <p className="eyebrow">An introduction</p>
          <h2 id="about-title">A place for<br />the way you <em>live.</em></h2>
          <p>{business.legalCompanyName} is an interior design and infrastructure company based in {business.locationLabel}. The work of shaping a space begins with its people, its purpose and the feeling it should hold.</p>
          <Button href="/about" variant="text">Get to know Regalien</Button>
        </Reveal>
      </div>
    </section>
  );
}
