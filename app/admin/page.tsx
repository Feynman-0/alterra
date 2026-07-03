import { cookies } from "next/headers";
import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { ADMIN_COOKIE, adminSessionToken } from "@/lib/adminAuth";
import { getStats } from "@/lib/store";

export const metadata: Metadata = {
  title: "Admin — Alterra",
  robots: { index: false, follow: false },
};

// always dynamic — reads cookies and the on-disk analytics store per request
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  const authenticated = session === adminSessionToken();

  if (!authenticated) return <AdminLogin />;

  return <AdminDashboard stats={getStats()} />;
}
