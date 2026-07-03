"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Incorrect password.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <section className="section dark" style={{ minHeight: "100svh", display: "grid", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 420 }}>
        <p className="eyebrow">Admin</p>
        <h1 className="display-3" style={{ marginTop: 16, marginBottom: 32 }}>
          Sign in to the dashboard.
        </h1>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
              required
            />
          </div>
          <div className="ct-form-actions" style={{ marginTop: 24 }}>
            <button type="submit" className="btn btn--solid" disabled={loading}>
              <span>{loading ? "Checking…" : "Sign in"}</span>
            </button>
            {error && (
              <p className="form-note" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
