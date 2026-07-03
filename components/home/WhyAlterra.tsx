import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { home } from "@/lib/content";

/** "A seat that's always been empty" — the gap Alterra fills, editorial split layout. */
export default function WhyAlterra() {
  return (
    <section className="section" aria-label="Why Alterra">
      <div className="container narr-res" style={{ marginTop: 0 }}>
        <Reveal kind="left">
          <p className="eyebrow">{home.gap.eyebrow}</p>
          <h2 className="display-3 narr-res-title">{home.gap.title}</h2>
          <Reveal kind="fade" delay={0.15} className="img-frame img-frame--wide" style={{ marginTop: 32 }}>
            <Image
              src={home.gap.image.src}
              alt={home.gap.image.alt}
              fill
              sizes="(max-width: 800px) 92vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
        </Reveal>
        <Reveal kind="fade" delay={0.2} className="narr-res-body">
          {home.gap.paragraphs.map((p, i) => (
            <p key={i} style={i > 0 ? { marginTop: "1.4em" } : undefined}>
              {p}
            </p>
          ))}
          <a href={home.gap.link.href} className="link-line narr-res-link">
            {home.gap.link.label} →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
