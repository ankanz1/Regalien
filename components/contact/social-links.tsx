import { Camera, CirclePlay, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "@/lib/business";

type SocialLinksProps = {
  heading: ReactNode;
  ariaLabel: string;
  className?: string;
};

const socialProfiles = [
  { ...business.socialProfiles.instagram, Icon: Camera },
  { ...business.socialProfiles.facebook, Icon: UsersRound },
  { ...business.socialProfiles.youtube, Icon: CirclePlay },
] as const;

export function SocialLinks({ heading, ariaLabel, className = "" }: SocialLinksProps) {
  return (
    <nav className={`social-links-block ${className}`} aria-label={ariaLabel}>
      <span className="eyebrow">{heading}</span>
      <ul className="social-link-list">
        {socialProfiles.map(({ label, url, Icon }) => (
          <li key={label}>
            <a className="social-profile-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${business.brandName} on ${label} (opens in a new tab)`}>
              <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
