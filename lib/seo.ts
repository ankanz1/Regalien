import type { Metadata } from "next";
import { business } from "@/lib/business";

type PageMetadataInput = {
  title: string;
  description: string;
  path: "/" | "/about" | "/services" | "/projects" | "/contact";
};

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const canonical = new URL(path, business.websiteUrl).toString();
  const socialTitle = `${title} | ${business.brandName}`;

  return {
    title: socialTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: business.brandName,
      title: socialTitle,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
