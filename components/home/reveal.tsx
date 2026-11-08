"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "image";
};

export function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const hidden = variant === "image"
    ? { opacity: 0.85, clipPath: "inset(12% 0 12% 0)" }
    : variant === "fade"
      ? { opacity: 0 }
      : { opacity: 0, y: 28 };

  return (
    <m.div
      className={`reveal reveal--${variant} ${className ?? ""}`}
      initial={prefersReducedMotion ? false : hidden}
      whileInView={variant === "image" ? { opacity: 1, clipPath: "inset(0% 0 0% 0)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -48px 0px" }}
      transition={{ duration: variant === "image" ? 1.05 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
