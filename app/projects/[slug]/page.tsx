import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { getPublishedProject, listPublishedProjects } from "@/lib/project-data";
import { business } from "@/lib/business";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = true;
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const project = await getPublishedProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.seo_title || `${project.name} | Projects | ${business.brandName}`, description: project.seo_description || project.description || `Photographs from ${project.name}, a Regalien project.`, alternates: { canonical: `${business.websiteUrl}projects/${project.slug}` }, openGraph: { images: [project.coverImage] } };
}
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params; const projects = await listPublishedProjects(); const index = projects.findIndex((entry) => entry.slug === slug); const project = projects[index];
  if (!project) notFound();
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <main id="main-content" className="project-detail"><section className="project-detail-hero"><div className="shell"><Link className="eyebrow" href="/projects">← All projects</Link><p className="eyebrow">REGALIEN · PROJECT PHOTOGRAPHY</p><h1>{project.name}</h1><div className="project-detail-cover"><Image src={project.coverImage} alt={project.images.find((image) => image.src === project.coverImage)?.alt ?? `Photograph from ${project.name}`} fill priority sizes="100vw" /></div></div></section><section className="shell project-detail-body">{project.description&&<p>{project.description}</p>}<h2>Project gallery</h2><p>{project.images.length} photographs</p><ProjectGallery projects={[project]} /><section className="project-specifications"><p className="eyebrow">MATERIAL SCHEDULE</p><h2>Specifications</h2>{Object.entries(project.specifications).filter(([,value])=>typeof value==="string"&&value.trim()).length===0?<p>Material specifications have not been added for this project.</p>:<dl>{Object.entries(project.specifications).filter(([,value])=>typeof value==="string"&&value.trim()).map(([key,value])=><div key={key}><dt>{key.replaceAll("_"," ")}</dt><dd>{value}</dd></div>)}</dl>}</section><div className="project-detail-contact"><p>Planning a space of your own?</p><Link className="button" href="/contact">Start a conversation</Link></div>{projects.length>1&&<nav className="project-neighbors" aria-label="Project navigation"><Link href={`/projects/${previous.slug}`}>← {previous.name}</Link><Link href={`/projects/${next.slug}`}>{next.name} →</Link></nav>}</section></main>;
}
