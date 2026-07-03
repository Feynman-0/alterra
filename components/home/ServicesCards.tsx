import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { home } from "@/lib/content";

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "What we do" — editorial index rows, no cards. Whole row is the link. */
export default function ServicesCards() {
  return (
    <section className="section" aria-label="What we do">
      <div className="container">
        <Reveal kind="up" className="svc-head">
          <p className="eyebrow">{home.servicesIntro.eyebrow}</p>
          <h2 className="display-2" style={{ maxWidth: "18ch" }}>
            {home.servicesIntro.title}
          </h2>
        </Reveal>

        <div>
          {home.services.map((s, i) => (
            <Reveal key={s.num} kind="fade" delay={i * 0.12} duration={0.8}>
              <Link href="/services" className="svc-row">
                <span className="svc-num">({s.num})</span>
                <h3 className="svc-name">{s.name}</h3>
                <p className="svc-short">{s.text}</p>
                <span className="svc-go">
                  <ArrowUpRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal kind="fade" delay={0.3} style={{ marginTop: 32 }}>
          <Link href={home.servicesLink.href} className="link-line">
            {home.servicesLink.label} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
