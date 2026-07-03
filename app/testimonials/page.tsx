import type { Metadata } from "next";
import Image from "next/image";
import CompaniesServed from "@/components/CompaniesServed";
import PageCta from "@/components/PageCta";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { testimonials, testimonialsPage } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: testimonialsPage.meta.title },
  description: testimonialsPage.meta.description,
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow={testimonialsPage.hero.eyebrow}
        title={testimonialsPage.hero.title}
        lede={testimonialsPage.hero.lede}
        image={testimonialsPage.hero.image}
      />

      {/* voices — editorial quote ledger */}
      <section className="section section--flush-b" aria-label="Client testimonials">
        <div className="container">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} kind={i % 2 ? "right" : "left"} duration={1}>
              <figure className="tst-quote" style={{ margin: 0 }}>
                <blockquote className="tst-q" style={{ margin: 0 }}>
                  {t.quote}
                </blockquote>
                <figcaption className="tst-aside">
                  <span className="tst-photo">
                    <Image src={t.photo} alt={`Portrait of ${t.name}`} width={56} height={56} />
                  </span>
                  <span className="tst-who">{t.name}</span>
                  <span className="tst-title">{t.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CompaniesServed
        eyebrow={testimonialsPage.sectors.eyebrow}
        title={testimonialsPage.sectors.title}
        items={testimonialsPage.sectors.items}
        note={testimonialsPage.sectors.note}
      />

      <PageCta title={testimonialsPage.cta.title} body={testimonialsPage.cta.body} />
    </>
  );
}
