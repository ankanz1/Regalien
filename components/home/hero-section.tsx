import { ArrowDown } from "lucide-react";
import { Button } from "@/components/button";
import { Reveal } from "@/components/home/reveal";
import { AnimatedLines } from "@/components/animation/animated-lines";
import { BrandMarquee } from "@/components/animation/brand-marquee";
import { HeroVisual } from "@/components/animation/hero-visual";
import { business } from "@/lib/business";

export function HeroSection() {
  return (
    <>
    <section className="home-hero" aria-labelledby="hero-title">
      <HeroVisual src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85" alt="Illustrative sunlit interior with natural materials; not a Regalien project" />
      <div className="home-hero-overlay" aria-hidden="true" />
      <div className="shell home-hero-content">
        <Reveal className="hero-copy" delay={0.12}>
          <h1 id="hero-title"><AnimatedLines lines={[{ id: "lead", content: <>Spaces, shaped</> }, { id: "emphasis", content: <>around <em>life.</em></> }]} /></h1>
          <p className="hero-description">Thoughtful interiors. Timeless materials. Spaces designed to feel like home.</p>
          <div className="hero-actions">
            <Button href="/projects" variant="outline" className="button--light">Explore the portfolio</Button>
            <Button href="/contact" variant="text" className="button--hero-text">Start a conversation</Button>
          </div>
        </Reveal>
      </div>
      <div className="hero-caption shell"><span>ILLUSTRATIVE INTERIOR IMAGE · NOT A {business.brandName.toUpperCase()} PROJECT</span><a href="#about-intro" aria-label="Scroll to discover Regalien">SCROLL TO DISCOVER <ArrowDown size={14} aria-hidden="true" /></a></div>
    </section>
    <BrandMarquee />
    </>
  );
}
