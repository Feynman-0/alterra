import AuroraField from "@/components/AuroraField";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="nf dark">
      <AuroraField pointer={false} />
      <div className="container" style={{ position: "relative" }}>
        <p className="nf-code">404</p>
        <p className="nf-text lede" style={{ marginInline: "auto" }}>
          This page seems to have moved on to better terms.
        </p>
        <Button href="/">Return home</Button>
      </div>
    </section>
  );
}
