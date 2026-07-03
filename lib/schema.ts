import { site } from "@/lib/content";

/** Structured data: the firm, as search engines should understand it. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Granite Bay",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: "United States",
    founder: { "@type": "Person", name: "Dana Swanson", jobTitle: "Founder & CEO" },
    sameAs: [site.linkedin],
    knowsAbout: [
      "Commercial banking advisory",
      "Cash flow lending",
      "Treasury management",
      "Banking transitions",
    ],
  };
}
