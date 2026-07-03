import type { ReactNode } from "react";

/**
 * Infinite marquee. Pure CSS animation (GPU transform only);
 * pauses on hover, degrades to a wrapped static list under reduced motion.
 */
export default function Marquee({
  items,
  speed = 36,
  className = "",
}: {
  items: ReactNode[];
  speed?: number;
  className?: string;
}) {
  const track = (hidden: boolean) => (
    <div
      className="marq-track"
      aria-hidden={hidden || undefined}
      style={{ ["--marq-speed" as string]: `${speed}s` }}
    >
      {items.map((item, i) => (
        <span className="marq-item" key={i}>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marq ${className}`}>
      {track(false)}
      {track(true)}
    </div>
  );
}
