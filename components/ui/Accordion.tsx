"use client";

import { useId, useState } from "react";

/** Hairline FAQ accordion; the plus morphs to minus, height eases via CSS grid. */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div className="accordion" key={i}>
            <button
              className="faq-q"
              aria-expanded={open}
              aria-controls={`${baseId}-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              {item.q}
              <span className="faq-icon" aria-hidden="true" />
            </button>
            <div className="faq-a" id={`${baseId}-panel-${i}`} role="region" aria-label={item.q}>
              <div className="faq-a-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
