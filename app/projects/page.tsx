import { AnimatedLines } from "@/components/animation/animated-lines";
import { ContactPrompt } from "@/components/inner-page/contact-prompt";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { Reveal } from "@/components/home/reveal";
import { business } from "@/lib/business";
import { projectsWithPhotos } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Interior Design Projects",
  description: `Explore project photographs from ${business.brandName}, an interior design studio in ${business.locationLabel}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main id="main-content" className="projects-page">
      <section className="portfolio-hero" aria-labelledby="projects-page-title">
        <div className="shell portfolio-hero-copy">
          <Reveal>
            <span className="eyebrow">Regalien · Project photography</span>
            <h1 id="projects-page-title"><AnimatedLines lines={[{ id: "lead", content: <>Spaces in</> }, { id: "emphasis", content: <><em>perspective.</em></> }]} /></h1>
            <p>A selection of project photographs, arranged by the names supplied for each folder.</p>
          </Reveal>
          <span className="portfolio-image-note">INTERIOR PHOTOGRAPHY · REGALIEN</span>
        </div>
      </section>
      <section className="portfolio-content section-pad" aria-label="Regalien project gallery">
        <div className="shell">
          <div className="portfolio-intro-row"><span className="eyebrow">The collection</span><span>PHOTOGRAPHS BY PROJECT</span></div>
          <ProjectGallery projects={projectsWithPhotos} />
        </div>
      </section>
      <ContactPrompt />
    </main>
  );
}
