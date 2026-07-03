import Link from "next/link";
import { footer, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="foot dark">
      <div className="container">
        <div className="foot-top">
          <div>
            <span className="nav-brand" aria-hidden="true">
              ALTERR<em>A</em>
            </span>
            <p className="foot-blurb">{footer.blurb}</p>
            <div className="foot-contact">
              <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="foot-col">
            <h3>Navigate</h3>
            <ul>
              {footer.navigate.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-col">
            <h3>Connect</h3>
            <ul>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>Email</a>
              </li>
              <li>
                <span>{site.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-mark" aria-hidden="true">
          <span className="foot-mark-text">ALTERRA</span>
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName} · {site.location}
          </span>
          <nav aria-label="Legal">
            {footer.legalLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            {footer.adminLinks.map((l) => (
              <Link key={l.href} href={l.href} className="foot-admin-link">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
