import { cookies } from "next/headers";
import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { ADMIN_COOKIE, adminSessionToken, isAdminAuthConfigured } from "@/lib/adminAuth";
import { getStats } from "@/lib/store";

export const metadata: Metadata = {
  title: "Admin — Alterra",
  robots: { index: false, follow: false },
};

// always dynamic — reads cookies and the on-disk analytics store per request
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminAuthConfigured()) {
    return (
      <section className="section dark" style={{ minHeight: "100svh", display: "grid", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: 520 }}>
          <p className="eyebrow">Admin setup required</p>
          <h1 className="display-3" style={{ marginTop: 16, marginBottom: 24 }}>
            Admin password is not configured.
          </h1>
          <p className="prose" style={{ color: "var(--fg-muted)" }}>
            Add ADMIN_PASSWORD in your Vercel environment variables, then redeploy.
            The admin login will work once that value is present.
          </p>
        </div>
      </section>
    );
  }

  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  const authenticated = session === adminSessionToken();

  if (!authenticated) return <AdminLogin />;

  return <AdminDashboard stats={getStats()} />;
}
