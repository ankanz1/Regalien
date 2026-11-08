"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedLine = {
  id: string;
  content: ReactNode;
};

type AnimatedLinesProps = {
  lines: readonly AnimatedLine[];
  className?: string;
};

export function AnimatedLines({ lines, className = "" }: AnimatedLinesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span className={`animated-lines ${className}`}>
      {lines.map(({ id, content }, index) => (
        <span className="animated-line-mask" key={id}>
          <m.span
            className="animated-line"
            initial={prefersReducedMotion ? false : { y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : 0.16 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </m.span>
        </span>
      ))}
    </span>
  );
}
