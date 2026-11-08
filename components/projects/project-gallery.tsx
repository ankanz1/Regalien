"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { InteriorProject } from "@/lib/projects";

type ProjectGalleryProps = {
  projects: readonly (InteriorProject & { coverImage: string })[];
};

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const reducedMotion = useReducedMotion();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeProject = projects.find((project) => project.id === activeProjectId);
  const activeImage = activeProject?.images[activeImageIndex];

  const closeGallery = useCallback(() => setActiveProjectId(null), []);

  const moveImage = useCallback((direction: -1 | 1) => {
    if (!activeProject) return;
    setActiveImageIndex((index) => (index + direction + activeProject.images.length) % activeProject.images.length);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProjectId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") moveImage(-1);
      if (event.key === "ArrowRight") moveImage(1);
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>(".project-lightbox");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeProjectId, closeGallery, moveImage]);

  const openProject = (projectId: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveImageIndex(0);
    setActiveProjectId(projectId);
  };

  if (projects.length === 0) {
    return (
      <div className="portfolio-empty">
        <span className="portfolio-empty-mark" aria-hidden="true">R.</span>
        <p className="eyebrow">A considered collection</p>
        <h2>Stories of space,<br /><em>coming soon.</em></h2>
        <p>Verified Regalien project photography will appear here when it is ready to share.</p>
        <span className="portfolio-empty-rule" aria-hidden="true" />
      </div>
    );
  }

  return (
    <>
      <div className="project-grid">
        {projects.map((project, index) => (
          <m.article
            className="project-card"
            key={project.id}
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="project-card-trigger"
              type="button"
              aria-label={`View ${project.images.length} photographs from ${project.name}`}
              onClick={(event) => openProject(project.id, event.currentTarget)}
            >
              <span className="project-card-image">
                <Image
                  src={project.coverImage}
                  alt={project.images.find((image) => image.src === project.coverImage)?.alt ?? `Interior photograph from the ${project.name} project`}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  className="editorial-image"
                />
                <span className="project-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-card-open" aria-hidden="true"><ArrowRight size={19} /></span>
              </span>
              <span className="project-card-copy">
                <span className="project-card-count">{String(project.images.length).padStart(2, "0")} photographs</span>
                <span className="project-card-title">{project.name}</span>
                <span className="project-card-action">View project <ArrowRight size={13} aria-hidden="true" /></span>
              </span>
            </button>
          </m.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && activeImage && (
          <m.div
            className="project-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} photographs`}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeGallery();
            }}
          >
            <div className="project-lightbox-top">
              <div>
                <p className="eyebrow">Regalien · Project photographs</p>
                <h2>{activeProject.name}</h2>
              </div>
              <span className="project-lightbox-count" aria-live="polite">
                {String(activeImageIndex + 1).padStart(2, "0")} / {String(activeProject.images.length).padStart(2, "0")}
              </span>
              <button className="project-lightbox-control project-lightbox-close" ref={closeButtonRef} type="button" onClick={closeGallery} aria-label="Close project photographs">
                <X size={21} aria-hidden="true" />
              </button>
            </div>
            <div className="project-lightbox-frame">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  className="project-lightbox-image"
                  key={activeImage.id}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: reducedMotion ? 0 : 0.28 }}
                >
                  <Image src={activeImage.src} alt={activeImage.alt} fill sizes="100vw" priority={activeImageIndex === 0} />
                </m.div>
              </AnimatePresence>
              {activeProject.images.length > 1 && (
                <>
                  <button className="project-lightbox-control project-lightbox-prev" type="button" onClick={() => moveImage(-1)} aria-label="Previous photograph">
                    <ArrowLeft size={19} aria-hidden="true" />
                  </button>
                  <button className="project-lightbox-control project-lightbox-next" type="button" onClick={() => moveImage(1)} aria-label="Next photograph">
                    <ArrowRight size={19} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            <div className="project-lightbox-bottom">
              <p>{activeImage.alt}</p>
              <span>Use the arrow keys to browse</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
