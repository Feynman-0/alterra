"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { getStats } from "@/lib/store";

type Stats = ReturnType<typeof getStats>;

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="hero-stat" style={{ borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
      <div className="stat-value" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
        {value}
      </div>
      <div className="hero-stat-label" style={{ color: "var(--fg-muted)" }}>
        {label}
      </div>
    </div>
  );
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const maxViews = Math.max(1, ...stats.days.map((d) => d.views));

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <section className="section" aria-label="Admin dashboard">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="display-3" style={{ marginTop: 16 }}>
              Website analytics.
            </h1>
          </div>
          <button className="btn btn--ghost" onClick={logout} disabled={loggingOut}>
            <span>{loggingOut ? "Signing out…" : "Log out"}</span>
          </button>
        </div>

        {/* headline numbers */}
        <div className="hero-stats-row" style={{ marginTop: 48 }}>
          <StatCard label="Unique visitors (all time)" value={stats.uniqueVisitors} />
          <StatCard label="Page views (all time)" value={stats.pageViews} />
          <StatCard label="Visitors today" value={stats.visitorsToday} />
          <StatCard label="Page views today" value={stats.viewsToday} />
          <StatCard label="Enquiries received" value={stats.totalEnquiries} />
        </div>

        {/* 14-day trend */}
        <div style={{ marginTop: 64 }}>
          <p className="eyebrow">Last 14 days</p>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: 140,
              borderBottom: "1px solid var(--rule)",
              paddingBottom: 4,
            }}
          >
            {stats.days.map((d) => (
              <div key={d.date} style={{ flex: 1, textAlign: "center" }} title={`${d.date}: ${d.views} views, ${d.visitors} visitors`}>
                <div
                  style={{
                    height: `${Math.max(3, (d.views / maxViews) * 120)}px`,
                    background: "var(--accent)",
                    opacity: 0.75,
                    borderRadius: "2px 2px 0 0",
                    marginInline: "auto",
                    width: "70%",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {stats.days.map((d) => (
              <div key={d.date} style={{ flex: 1, textAlign: "center", fontSize: "0.68rem", color: "var(--fg-muted)" }}>
                {d.date.slice(5)}
              </div>
            ))}
          </div>
        </div>

        {/* top pages + recent enquiries */}
        <div className="why-grid" style={{ marginTop: 64 }}>
          <div>
            <p className="eyebrow">Top pages</p>
            <div style={{ marginTop: 16 }}>
              {stats.topPages.length === 0 && <p className="small">No visits recorded yet.</p>}
              {stats.topPages.map((p) => (
                <div
                  key={p.path}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderTop: "1px solid var(--rule)",
                    fontSize: "0.95rem",
                  }}
                >
                  <span>{p.path}</span>
                  <span className="figure">{p.views}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Recent enquiries</p>
            <div style={{ marginTop: 16 }}>
              {stats.recentEnquiries.length === 0 && <p className="small">No enquiries yet.</p>}
              {stats.recentEnquiries.map((e, i) => (
                <div key={i} style={{ padding: "12px 0", borderTop: "1px solid var(--rule)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <strong>{String(e.name ?? "—")}</strong>
                    <span className="small">{new Date(String(e.receivedAt)).toLocaleString()}</span>
                  </div>
                  <div className="small">
                    {String(e.type)} · {String(e.email ?? "")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
