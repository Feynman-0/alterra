"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fires a page-view beacon to /api/track on first load and every route change. */
export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
