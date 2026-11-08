"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { business } from "@/lib/business";

const SESSION_KEY = "regalien-intro-seen";

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // The short intro remains available when browser storage is disabled.
    }

    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), prefersReducedMotion ? 220 : 1050);
    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="preloader"
          role="status"
          aria-label={`Loading ${business.brandName}`}
          initial={false}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-inner">
            <span className="preloader-wordmark">{business.brandName}</span>
            <span className="preloader-descriptor">Interior spaces · {business.locationLabel}</span>
            <span className="preloader-track" aria-hidden="true"><span /></span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
