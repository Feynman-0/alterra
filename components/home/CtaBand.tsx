"use client";

import { motion, useReducedMotion } from "framer-motion";
import AuroraField from "@/components/AuroraField";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { home, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The closing invitation — Ink surface, aurora, magnetic gold CTA. */
export default function CtaBand() {
  const reduce = useReducedMotion();

  return (
    <section className="section dark cta" aria-label="Let's talk">
      <AuroraField />
      <div className="container" style={{ position: "relative" }}>
        <Reveal kind="scale" duration={1.1}>
          <h2 className="cta-title">{home.cta.title}</h2>
        </Reveal>
        <motion.div
          className="cta-underline"
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
        />
        <Reveal kind="fade" delay={0.3}>
          <p className="cta-body">{home.cta.body}</p>
        </Reveal>
        <Reveal kind="up" delay={0.4} className="cta-actions">
          <Button href={home.cta.button.href} size="lg">
            {home.cta.button.label}
          </Button>
          <p className="cta-alt">
            Prefer email?{" "}
            <a className="link-line" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
