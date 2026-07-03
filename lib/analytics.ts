/**
 * Conversion & lead tracking.
 * Events flow to whichever analytics layer is present:
 *  - GA4 / GTM via window.dataLayer
 *  - Plausible via window.plausible (set NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
 * Key events fired by the site:
 *  - `enquiry_submitted`  (contact form)
 *  - `booking_requested`  (discovery-call scheduler)
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    dataLayer?: Record<string, unknown>[];
    plausible?: (n: string, o?: { props?: Record<string, string> }) => void;
  };
  w.dataLayer?.push({ event: name, ...props });
  w.plausible?.(name, { props });
}
