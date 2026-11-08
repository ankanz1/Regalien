"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HeroVisualProps = {
  src: string;
  alt: string;
};

export function HeroVisual({ src, alt }: HeroVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 42]);

  return (
    <m.div
      ref={ref}
      className="home-hero-media"
      initial={prefersReducedMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: prefersReducedMotion ? 0 : 1.15, delay: prefersReducedMotion ? 0 : 0.05, ease: [0.76, 0, 0.24, 1] }}
    >
      <m.div className="home-hero-parallax" style={prefersReducedMotion ? undefined : { y }}>
        <Image src={src} alt={alt} fill priority sizes="100vw" className="home-hero-image" />
      </m.div>
    </m.div>
  );
}
