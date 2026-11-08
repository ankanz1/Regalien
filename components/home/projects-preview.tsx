import { Button } from "@/components/button";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { Reveal } from "@/components/home/reveal";
import { homepageProjects } from "@/lib/projects";

export function ProjectsPreview() {
  return (
    <section className="projects-preview section-pad" id="projects-preview" aria-labelledby="projects-title">
      <div className="shell">
        <div className="projects-section-heading">
          <Reveal>
            <p className="eyebrow">Selected projects</p>
            <h2 id="projects-title">Spaces captured<br /><em>in detail.</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>A selection of Regalien project photographs, presented by project name.</p>
            <Button href="/projects" variant="text">Visit the portfolio</Button>
          </Reveal>
        </div>
        <ProjectGallery projects={homepageProjects} />
      </div>
    </section>
  );
}
