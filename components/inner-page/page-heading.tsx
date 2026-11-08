import type { ReactNode } from "react";
import { Reveal } from "@/components/home/reveal";

type PageHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export function PageHeading({ eyebrow, title, description }: PageHeadingProps) {
  return (
    <section className="inner-page-heading" aria-label={eyebrow}>
      <Reveal className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="inner-page-lede">{description}</p>
      </Reveal>
    </section>
  );
}
