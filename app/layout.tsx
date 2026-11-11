import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionProvider } from "@/components/motion-provider";
import { PageTransition } from "@/components/animation/page-transition";
import { Preloader } from "@/components/animation/preloader";
import { ScrollProgress } from "@/components/animation/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  metadataBase: new URL(business.websiteUrl),
  title: `${business.brandName} | Thoughtful Spaces, Built to Last`,
  description: `${business.legalCompanyName} creates considered interior and infrastructure spaces in ${business.locationFull}.`,
  applicationName: business.brandName,
  openGraph: { title: `${business.brandName} | Thoughtful Spaces, Built to Last`, description: `Interior design and infrastructure in ${business.locationLabel}.`, url: business.websiteUrl, siteName: business.brandName, locale: "en_IN", type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F3EEE3", colorScheme: "light" };

const organizationStructuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: business.legalCompanyName,
  legalName: business.legalCompanyName,
  url: business.websiteUrl,
  description: `${business.legalCompanyName} is an interior design and infrastructure company based in ${business.locationFull}.`,
  telephone: [business.phones.primary.display, business.phones.secondary.display],
  address: {
    "@type": "PostalAddress",
    ...business.addressDetails,
  },
  sameAs: Object.values(business.socialProfiles).map((profile) => profile.url),
}).replace(/</g, "\\u003c");

const themeInitializationScript = `(()=>{try{const saved=localStorage.getItem("regalien-theme");const dark=saved==="dark"||(saved!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=dark?"dark":"light";document.documentElement.classList.toggle("dark",dark)}catch{document.documentElement.dataset.theme="light";document.documentElement.classList.remove("dark")}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationStructuredData }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ThemeProvider>
          <MotionProvider>
            <ScrollProgress />
            <SiteHeader />
            <Preloader />
            <PageTransition>{children}</PageTransition>
            <SiteFooter />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
