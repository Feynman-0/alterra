"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Cinematic inertia scrolling. Disabled automatically for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // honor #hash deep links on hard loads — lenis resets scroll to 0 on
    // init, which swallows the browser's native anchor jump. Two passes:
    // early, then again after fonts/late layout settle.
    const jumpToHash = () => {
      if (!location.hash) return;
      const el = document.querySelector(location.hash) as HTMLElement | null;
      if (!el) return;
      const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80);
      lenis.scrollTo(y, { immediate: true, force: true });
    };
    const hashTimer = setTimeout(jumpToHash, 300);
    const hashTimer2 = setTimeout(jumpToHash, 1300);

    // hash links scroll smoothly through lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname === location.pathname && url.hash) {
        const el = document.querySelector(url.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -80 });
          history.pushState(null, "", url.hash);
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hashTimer);
      clearTimeout(hashTimer2);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
