import { AboutPreview } from "@/components/home/about-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { HeroSection } from "@/components/home/hero-section";
import { PhilosophySection } from "@/components/home/philosophy-section";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { business } from "@/lib/business";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interior Design in New Town Kolkata",
  description: `Explore ${business.brandName}, an interior design and infrastructure company based in New Town, Kolkata, West Bengal.`,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <ProjectsPreview />
      <PhilosophySection />
      <ContactCta />
    </main>
  );
}
