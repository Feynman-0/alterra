import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";

/** Shared "companies served" strip — used on Home and the Testimonials page. */
export default function CompaniesServed({
  eyebrow,
  title,
  items,
  note,
}: {
  eyebrow: string;
  title?: string;
  items: string[];
  note: string;
}) {
  return (
    <section className="credo" aria-label="Companies served">
      <div className="container">
        <Reveal kind="fade">
          <p className="eyebrow">{eyebrow}</p>
          {title && (
            <h2 className="display-3" style={{ marginTop: 16 }}>
              {title}
            </h2>
          )}
        </Reveal>
      </div>
      <Reveal kind="fade" delay={0.1} className="credo-marquee" style={{ marginTop: 40 }}>
        <Marquee items={items} speed={40} />
      </Reveal>
      <div className="container">
        <p className="credo-note">{note}</p>
      </div>
    </section>
  );
}
