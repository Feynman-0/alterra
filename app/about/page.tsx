import type { Metadata } from "next";
import PageCta from "@/components/PageCta";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import Accordion from "@/components/ui/Accordion";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: about.meta.title },
  description: about.meta.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        lede={about.hero.lede}
        image={about.hero.image}
      />

      {/* the story — sticky headline is implicit in the split layout, flowing prose right */}
      <section className="section" aria-label="Dana's background">
        <div className="container about-story">
          <div className="about-story-head">
            <Reveal kind="left">
              <p className="eyebrow">The founder</p>
              <h2 className="display-2">Dana Swanson</h2>
              <p className="about-founder-role">Founder &amp; CEO</p>
            </Reveal>
          </div>
          <div className="about-paras">
            <Reveal kind="fade" duration={1}>
              <p>{about.story.lead}</p>
            </Reveal>
            <Reveal kind="fade" delay={0.1} duration={1}>
              <p>{about.story.body}</p>
            </Reveal>
            <Reveal kind="mask" delay={0.15}>
              <figure className="pullquote">
                <blockquote>{about.story.pullquote.quote}</blockquote>
                <figcaption>{about.story.pullquote.cite}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* why this model works — two-block ledger */}
      <section className="section section--flush-b" aria-label="Why this model works">
        <div className="container">
          <Reveal kind="up">
            <p className="eyebrow">{about.principles.eyebrow}</p>
          </Reveal>
          <div className="why-grid">
            {about.principles.items.map((v, i) => (
              <Reveal key={v.title} kind={i % 2 ? "right" : "left"} delay={0.08 * i}>
                <div className="why-item">
                  <span className="why-index">({String(i + 1).padStart(2, "0")})</span>
                  <div>
                    <h3 className="why-title">{v.title}</h3>
                    <p className="why-text">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* quiet expandable detail */}
      <section className="section" aria-label="Details">
        <div className="container faq-wrap" style={{ gridTemplateColumns: "1fr" }}>
          <Reveal kind="fade" delay={0.1} style={{ maxWidth: 760 }}>
            <Accordion items={about.accordions.map((a) => ({ q: a.q, a: a.a }))} />
          </Reveal>
        </div>
      </section>

      <PageCta title={about.cta.title} body={about.cta.body} />
    </>
  );
}
