import type { Metadata } from "next";
import LegalArticle from "@/components/LegalArticle";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: legal.terms.meta.title },
  description: legal.terms.meta.description,
};

export default function TermsOfUsePage() {
  return <LegalArticle doc={legal.terms} />;
}
