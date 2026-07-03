import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand card for link previews — generated at build time, no binary assets. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(80% 90% at 20% 0%, #16304f 0%, #081426 55%, #050b17 100%)",
          color: "#f2efe7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            letterSpacing: 36,
            paddingLeft: 36,
            display: "flex",
          }}
        >
          ALTERRA
        </div>
        <div
          style={{
            width: 320,
            height: 1,
            background: "#b3894a",
            marginTop: 34,
            marginBottom: 34,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#b3894a",
            display: "flex",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size
  );
}
