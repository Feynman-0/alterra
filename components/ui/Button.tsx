import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

function Arrow() {
  return (
    <svg
      className="btn-arrow"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7.5h10.5M8.5 3l4.5 4.5L8.5 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Site CTA. Solid = champagne gold + magnetic physics; ghost = hairline. */
export default function Button({
  href,
  children,
  variant = "solid",
  size,
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  size?: "lg";
  magnetic?: boolean;
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""}`;
  const link = (
    <Link href={href} className={cls}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
  if (variant === "solid" && magnetic) return <Magnetic>{link}</Magnetic>;
  return link;
}
