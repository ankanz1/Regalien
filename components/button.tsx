import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonVariant = "primary" | "outline" | "text";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
  ariaLabel?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function Button({ href, children, variant = "primary", className = "", showArrow = true, ariaLabel, ...props }: ButtonProps) {
  return <Link href={href} className={`button button--${variant} ${className}`} aria-label={ariaLabel} {...props}>
    <span>{children}</span>{showArrow && <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />}
  </Link>;
}
