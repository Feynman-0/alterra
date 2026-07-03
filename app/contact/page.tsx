import type { Metadata } from "next";
import BookingScheduler from "@/components/contact/BookingScheduler";
import ContactForm from "@/components/contact/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: contact.meta.title },
  description: contact.meta.description,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        lede={contact.hero.lede}
        image={contact.hero.image}
      />

      <section className="section" aria-label="Send a message">
        <div className="container ct-grid">
          <div>
            <Reveal kind="up">
              <p className="eyebrow">Send a note</p>
              <h2 className="display-2" style={{ margin: "16px 0 40px", maxWidth: "16ch" }}>
                Tell us what you&rsquo;re financing.
              </h2>
            </Reveal>
            <Reveal kind="fade" delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>

          <aside className="ct-aside">
            {(
              [
                { label: "Email", value: site.email, href: `mailto:${site.email}` },
                { label: "Office", value: contact.aside.location },
                { label: "LinkedIn", value: "Connect with Dana ↗", href: site.linkedin, external: true },
              ] as { label: string; value: string; href?: string; external?: boolean }[]
            ).map((item, i) => (
              <Reveal key={item.label} kind="right" delay={0.08 * i}>
                <div className="ct-aside-block">
                  <span className="ct-aside-label">{item.label}</span>
                  <span className="ct-aside-value">
                    {item.href ? (
                      <a
                        className="link-line"
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
              </Reveal>
            ))}
          </aside>
        </div>
      </section>

      {/* the scheduler — deep-linked from every "Let's talk" button on the site */}
      <section className="section dark book" id="book" aria-label="Book a discovery meeting">
        <div className="container">
          <Reveal kind="up">
            <p className="eyebrow">{contact.scheduler.title}</p>
            <h2 className="display-2" style={{ margin: "16px 0 10px" }}>
              {contact.scheduler.title}
            </h2>
            <p className="lede" style={{ marginBottom: 34 }}>
              {contact.scheduler.lede}
            </p>
          </Reveal>
          <Reveal kind="fade" delay={0.15}>
            <BookingScheduler />
          </Reveal>
        </div>
      </section>
    </>
  );
}
