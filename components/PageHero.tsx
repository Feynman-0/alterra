"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import AuroraField from "@/components/AuroraField";
import SplitWords from "@/components/motion/SplitWords";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Inner-page opening band: navy, aurora-lit, split-word title, and an
 * arch-masked photograph drifting on parallax. The last word of the title
 * is automatically set in the italic gold serif.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  accentLast = true,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image?: { src: string; alt: string };
  accentLast?: boolean;
}) {
  const reduce = useReducedMotion();
  const figRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: figRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const words = title.split(" ");
  const marked = accentLast
    ? [...words.slice(0, -1), `*${words[words.length - 1]}*`].join(" ")
    : title;

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        };

  return (
    <section className="phero dark">
      <AuroraField />
      <div className="container" style={{ position: "relative" }}>
        <div className={image ? "phero-grid" : undefined}>
          <div>
            <motion.p className="eyebrow" {...rise(0.15)}>
              {eyebrow}
            </motion.p>
            <h1 className="display-1 phero-title">
              <SplitWords text={marked} delay={0.25} />
            </h1>
            {lede && (
              <motion.p className="lede phero-lede" {...rise(0.6)}>
                {lede}
              </motion.p>
            )}
          </div>

          {image && (
            <motion.figure
              ref={figRef}
              className="phero-figure"
              initial={reduce ? false : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, delay: 0.55, ease: EASE }}
            >
              <span className="phero-arch-echo" aria-hidden="true" />
              <div className="phero-arch">
                <motion.div
                  className="phero-arch-inner"
                  style={reduce ? undefined : { y: drift }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(max-width: 900px) 92vw, 38vw"
                  />
                </motion.div>
              </div>
            </motion.figure>
          )}
        </div>

        <motion.div
          className="phero-rule"
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
        />
      </div>
    </section>
  );
}
