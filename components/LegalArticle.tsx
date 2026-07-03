import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";

type LegalDoc = {
  title: string;
  updated: string;
  flag?: string;
  sections: { h: string; p: string[] }[];
};

export default function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} accentLast={false} />
      <section className="section" aria-label={doc.title}>
        <div className="container legal-body">
          {doc.flag && <p className="legal-flag">{doc.flag}</p>}
          <p className="legal-updated">{doc.updated}</p>
          {doc.sections.map((s, i) => (
            <Reveal key={s.h} kind="fade" delay={Math.min(i * 0.04, 0.2)} duration={0.7}>
              <div className="legal-section">
                <h2>{s.h}</h2>
                {s.p.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
