import type { Metadata } from "next";
import PageCta from "@/components/PageCta";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import Instrument from "@/components/services/Instrument";
import ProcLine from "@/components/services/ProcLine";
import { servicesPage } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: servicesPage.meta.title },
  description: servicesPage.meta.description,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        title={servicesPage.hero.title}
        lede={servicesPage.hero.lede}
        image={servicesPage.hero.image}
      />

      {/* three offerings — editorial index rows */}
      <section className="section section--flush-b" aria-label="What we offer">
        <div className="container">
          {servicesPage.offerings.map((o, i) => (
            <Reveal key={o.num} kind="fade" delay={i * 0.1} duration={0.8}>
              <div className="svc-row" style={{ cursor: "default" }}>
                <span className="svc-num">({o.num})</span>
                <h3 className="svc-name">{o.name}</h3>
                <p className="svc-short">{o.text}</p>
                <span />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* seven steps, the genuine sequence — dark band, drawn line */}
      <section className="section dark proc" aria-label="The seven-step process">
        <div className="container">
          <Reveal kind="up" className="proc-head">
            <p className="eyebrow">{servicesPage.sequence.eyebrow}</p>
            <h2 className="display-2">{servicesPage.sequence.title}</h2>
          </Reveal>
          <ProcLine />
          <div className="proc-grid proc-grid--7">
            {servicesPage.sequence.steps.map((s, i) => (
              <Reveal key={s.num} kind="up" delay={Math.min(i * 0.08, 0.4)} duration={0.85}>
                <div className="proc-step">
                  <span className="proc-num">{s.num}</span>
                  <h3 className="proc-name">{s.name}</h3>
                  <p className="proc-text">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* the signature instrument */}
      <section className="section" aria-label="What you actually receive">
        <div className="container">
          <Reveal kind="up" className="section-head" style={{ maxWidth: "60ch", marginBottom: 0 }}>
            <p className="eyebrow">{servicesPage.instrument.eyebrow}</p>
            <h2 className="mt-2">{servicesPage.instrument.title}</h2>
            <p className="lede mt-2">{servicesPage.instrument.lede}</p>
          </Reveal>
          <Reveal kind="fade" delay={0.1}>
            <Instrument />
          </Reveal>
        </div>
      </section>

      {/* scope — two-block ledger, not cards */}
      <section className="section section--flush-b" aria-label="Scope">
        <div className="container">
          <div className="why-grid">
            <Reveal kind="left" className="why-item" style={{ gridTemplateColumns: "1fr" }}>
              <div>
                <span className="eyebrow">{servicesPage.scope.in.eyebrow}</span>
                <p className="why-text mt-2" style={{ maxWidth: "48ch" }}>
                  {servicesPage.scope.in.text}
                </p>
              </div>
            </Reveal>
            <Reveal kind="right" delay={0.08} className="why-item" style={{ gridTemplateColumns: "1fr" }}>
              <div>
                <span className="eyebrow">{servicesPage.scope.out.eyebrow}</span>
                <p className="why-text mt-2" style={{ maxWidth: "48ch" }}>
                  {servicesPage.scope.out.text}{" "}
                  <span style={{ color: "var(--accent)" }}>{servicesPage.scope.out.flag}</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageCta title={servicesPage.cta.title} body={servicesPage.cta.body} />
    </>
  );
}
