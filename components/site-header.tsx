"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { business } from "@/lib/business";

const links = [
  { href: "/about", label: "About", number: "01" },
  { href: "/services", label: "Services", number: "02" },
  { href: "/projects", label: "Projects", number: "03" },
  { href: "/contact", label: "Contact", number: "04" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <>
      <header className="site-header" id="top">
        <div className="header-inner shell">
          <Link href="/" className="wordmark" aria-label={`${business.brandName} home`} onClick={() => setOpen(false)}>
            <span className="wordmark-symbol" aria-hidden="true">R</span>
            <span className="wordmark-copy"><span className="wordmark-main">{business.brandName}</span><span className="wordmark-sub">INTERIORS · {business.locationLabel.toUpperCase()}</span></span>
          </Link>

          <nav className="primary-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/contact" className="header-cta">Enquire <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>

          <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={prefersReducedMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={prefersReducedMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-inner shell">
              <span className="mobile-menu-eyebrow">Navigation · {business.locationLabel}</span>
              <nav aria-label="Mobile navigation">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMenu} aria-current={pathname === link.href ? "page" : undefined}>
                    <span className="menu-link-number">{link.number}</span><span>{link.label}</span><ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <div className="mobile-menu-bottom">
                <WhatsAppLink ariaLabel={`Message ${business.brandName} on WhatsApp at ${business.whatsapp.display}`}>Start a conversation</WhatsAppLink>
                <a href={business.phones.primary.href} aria-label={`Call ${business.brandName}`}>Call the office</a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
