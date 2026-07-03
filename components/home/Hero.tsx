"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import AuroraField from "@/components/AuroraField";
import SplitWords from "@/components/motion/SplitWords";
import { introDelay } from "@/components/Preloader";
import Button from "@/components/ui/Button";
import { home } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const [t] = useState(() => introDelay());

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="hero dark" aria-label="Introduction">
      <AuroraField />

      <div className="container hero-body">
        <div className="phero-grid" style={{ alignItems: "center" }}>
          <div>
            <motion.p className="eyebrow hero-eyebrow" {...rise(t + 0.05)}>
              {home.hero.eyebrow}
            </motion.p>

            <h1 className="display-1 hero-h1" style={{ maxWidth: "14ch" }}>
              <SplitWords text={home.hero.headline} delay={t + 0.12} />
            </h1>

            <motion.p className="lede hero-lede" {...rise(t + 0.5)}>
              {home.hero.lede}
            </motion.p>

            <motion.div className="hero-ctas" {...rise(t + 0.62)}>
              <Button href={home.hero.primaryCta.href} size="lg">
                {home.hero.primaryCta.label}
              </Button>
              <Button href={home.hero.secondaryCta.href} variant="ghost" size="lg">
                {home.hero.secondaryCta.label}
              </Button>
            </motion.div>

            <motion.div className="hero-stats-row" {...rise(t + 0.75)}>
              {home.hero.stats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <div className="hero-stat-value">
                    {s.value}
                    {s.suffix}
                  </div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.figure {...rise(t + 0.4)} style={{ margin: 0 }}>
            <div
              className="mini-normal"
              role="img"
              aria-label={`Example: five bank offers normalized onto one comparable line, best first. ${home.hero.normalization.rows
                .map((r) => `${r.bank} ${r.rate}`)
                .join(", ")}`}
            >
              <div className="mini-normal-label">{home.hero.normalization.label}</div>
              {home.hero.normalization.rows.map((row) => (
                <div className={`mini-normal-row${row.win ? " win" : ""}`} key={row.bank}>
                  <span className="bank">{row.bank}</span>
                  <span className="rate figure">{row.rate}</span>
                </div>
              ))}
            </div>
          </motion.figure>
        </div>
      </div>

      <span className="hero-scroll" aria-hidden="true">
        Scroll
      </span>
    </section>
  );
}
