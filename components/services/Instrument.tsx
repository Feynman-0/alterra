"use client";

import { useState } from "react";
import { servicesPage } from "@/lib/content";

/** The signature element: five bank offers, normalized onto one comparable page — with a Raw/Normalized toggle. */
export default function Instrument() {
  const { instrument } = servicesPage;
  const [normalized, setNormalized] = useState(true);
  const rows = normalized ? instrument.normalized : instrument.raw;

  return (
    <div className="instrument">
      <div className="instrument-head">
        <span className="instrument-tag">{instrument.tag}</span>
        <button
          className="instrument-toggle"
          aria-pressed={normalized}
          onClick={() => setNormalized((v) => !v)}
        >
          {normalized ? instrument.toggleNormalized : instrument.toggleRaw}
        </button>
      </div>
      <div className="bidtable-wrap">
        <table className="bidtable">
          <caption className="sr-only">
            Normalized bank bid comparison; use the toggle to view the raw offers as received.
          </caption>
          <thead>
            <tr>
              {instrument.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.lender} className={r.win ? "is-winner" : undefined}>
                <td className="lender" data-label="Lender">
                  {r.lender}
                </td>
                <td data-label="All-in pricing">{r.pricing}</td>
                <td data-label="Facility">{r.facility}</td>
                <td data-label="Upfront fees">{r.fees}</td>
                <td data-label="Covenants">{r.covenants}</td>
                <td data-label="Structure">{r.structure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="instrument-disclaimer">{instrument.disclaimer}</p>
    </div>
  );
}
