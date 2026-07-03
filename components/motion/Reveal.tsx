"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Kind = "up" | "fade" | "left" | "right" | "scale" | "mask";

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Record<Kind, Variants> = {
  up: {
    hidden: { opacity: 0, y: 44 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -56 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 56 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    show: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  },
};

/**
 * Scroll-triggered reveal. Each section chooses its own `kind`
 * so no two parts of the site enter the same way.
 */
export default function Reveal({
  children,
  kind = "up",
  delay = 0,
  duration = 0.9,
  className,
  style,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  kind?: Kind;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "span" | "li" | "header" | "figure";
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      style={style}
      variants={variants[kind]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
