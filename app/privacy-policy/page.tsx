import type { Metadata } from "next";
import LegalArticle from "@/components/LegalArticle";
import { legal } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: legal.privacy.meta.title },
  description: legal.privacy.meta.description,
};

export default function PrivacyPolicyPage() {
  return <LegalArticle doc={legal.privacy} />;
}
