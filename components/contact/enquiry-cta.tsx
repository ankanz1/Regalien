"use client";

import Link from "next/link";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";

export function EnquiryCta() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 170, damping: 18, mass: 0.35 });

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse" || !window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * 0.045)));
    y.set(Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.045)));
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div className="enquiry-cta-motion" style={{ x: springX, y: springY }} onPointerMove={followPointer} onPointerLeave={resetPosition}>
      <Link className="enquiry-cta" href="/contact">
        <span className="enquiry-cta-copy"><small>A thoughtful conversation</small><strong>Tell us about your space</strong></span>
        <span className="enquiry-cta-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span>
      </Link>
    </m.div>
  );
}
