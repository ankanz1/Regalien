import type { ReactNode } from "react";
import { business } from "@/lib/business";

type SocialLinksProps = {
  heading: ReactNode;
  ariaLabel: string;
  className?: string;
};

type SocialBrand = "instagram" | "facebook" | "youtube";

const socialProfiles = [
  { ...business.socialProfiles.instagram, brand: "instagram" },
  { ...business.socialProfiles.facebook, brand: "facebook" },
  { ...business.socialProfiles.youtube, brand: "youtube" },
] as const;

function SocialBrandIcon({ brand }: { brand: SocialBrand }) {
  if (brand === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" focusable="false">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.05" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.8" cy="6.35" r="1.05" fill="currentColor" />
      </svg>
    );
  }

  if (brand === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M13.55 21v-8.2h2.78l.42-3.2h-3.2V7.56c0-.93.26-1.56 1.6-1.56h1.72V3.14A22.6 22.6 0 0 0 14.36 3c-2.49 0-4.19 1.52-4.19 4.32V9.6H7.36v3.2h2.81V21h3.38Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.3 3.8-6.3 3.8Z" />
    </svg>
  );
}

export function SocialLinks({ heading, ariaLabel, className = "" }: SocialLinksProps) {
  return (
    <nav className={`social-links-block ${className}`} aria-label={ariaLabel}>
      <span className="eyebrow">{heading}</span>
      <ul className="social-link-list">
        {socialProfiles.map(({ label, url, brand }) => (
          <li key={label}>
            <a className="social-profile-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${business.brandName} on ${label} (opens in a new tab)`}>
              <SocialBrandIcon brand={brand} />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
