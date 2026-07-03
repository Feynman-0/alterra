import type { Metadata } from "next";
import CompaniesServed from "@/components/CompaniesServed";
import CtaBand from "@/components/home/CtaBand";
import Hero from "@/components/home/Hero";
import ServicesCards from "@/components/home/ServicesCards";
import TestimonialsGrid from "@/components/home/TestimonialsGrid";
import WhyAlterra from "@/components/home/WhyAlterra";
import { home } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyAlterra />
      <ServicesCards />
      <TestimonialsGrid />
      <CompaniesServed
        eyebrow={home.served.eyebrow}
        items={home.served.items}
        note={home.served.note}
      />
      <CtaBand />
    </>
  );
}
