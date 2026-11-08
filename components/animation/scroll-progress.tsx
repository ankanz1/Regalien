"use client";

import { m, useReducedMotion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
