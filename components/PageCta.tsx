"use client";

import { motion, useReducedMotion } from "framer-motion";
import AuroraField from "@/components/AuroraField";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Closing invitation band for inner pages. */
export default function PageCta({
  title,
  body,
  label = "Book a discovery meeting",
  href = "/contact",
}: {
  title: string;
  body: string;
  label?: string;
  href?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="section dark cta" aria-label="Call to action">
      <AuroraField pointer={false} />
      <div className="container" style={{ position: "relative" }}>
        <Reveal kind="scale" duration={1.1}>
          <h2 className="display-2" style={{ fontStyle: "italic", fontWeight: 340 }}>
            {title}
          </h2>
        </Reveal>
        <motion.div
          className="cta-underline"
          initial={reduce ? undefined : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        />
        <Reveal kind="fade" delay={0.25}>
          <p className="cta-body">{body}</p>
        </Reveal>
        <Reveal kind="up" delay={0.35} className="cta-actions">
          <Button href={href} size="lg">
            {label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
