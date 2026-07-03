/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALTERRA — SITE CONTENT
 *  Every word on the website lives in this file. Edit the text between quotes,
 *  save, and redeploy — no other file needs to change for copy edits.
 *
 *  This copy follows the confirmed client brief (discovery call + signed
 *  intake form, 2026-06-23): navy-dominant, no red, "white-glove," exactly
 *  five pages, one CTA — "Book a discovery meeting." Brand spelling follows
 *  the signed intake form: "Alterra."
 *
 *  STILL PLACEHOLDER — flagged inline, do not treat as final:
 *  testimonial names/photos/quotes, "companies served" sectors, Dana's
 *  headshot, exact fee/timeline language, LinkedIn URL, branded email.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Alterra",
  legalName: "Alterra",
  tagline: "Commercial Banking Advisory",
  // Update once the final .com domain is registered/confirmed available:
  url: "https://www.alterra-advisory.com",
  email: "danaswanson.home@gmail.com", // swap for a branded domain email once the domain is live
  phone: "209-479-8223", // confirm whether this should be public before launch
  phoneHref: "+12094798223",
  location: "Granite Bay, California",
  linkedin: "https://www.linkedin.com/", // set to Dana's LinkedIn profile
  meetingLength: "30 minutes",
  description:
    "Alterra is an independent commercial banking advisory for mid-market CEOs and CFOs. We run the full capital and treasury process and hand you every bank's offer on one comparable page.",
};

export const nav = {
  links: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  // Short header CTA per the client's "let's talk" preference (boostcfo.com reference).
  cta: { label: "Let's talk", href: "/contact" },
};

/* ────────────────────────────── HOME ────────────────────────────── */

export const home = {
  meta: {
    title: "Alterra — Commercial Banking Advisory",
    description:
      "Alterra is an independent commercial-banking advisory for mid-market CEOs and CFOs. We run the full capital and treasury process and hand you every bank's offer on one comparable page.",
  },
  hero: {
    eyebrow: "Commercial Banking Advisory",
    // "your" renders in the Verdigris accent.
    headline: "The advisor on *your* side of the banking table.",
    lede: "Alterra helps mid-market CEOs and CFOs save time and money raising capital and setting up treasury — we run the whole process and hand you every bank's offer on one comparable page.",
    primaryCta: { label: "Let's talk", href: "/contact" },
    secondaryCta: { label: "See how it works", href: "/services" },
    stats: [
      { value: "20", suffix: " yrs", label: "In commercial & corporate banking" },
      { value: "$50M+", suffix: "", label: "Revenue of companies financed" },
      { value: "7", suffix: " steps", label: "First brief to final close" },
    ],
    // The signature visual: five real-looking bank offers settle into one sorted, comparable line.
    normalization: {
      label: "What you receive — every bid on one line",
      rows: [
        { bank: "Bank Gamma", rate: "6.70%", win: true },
        { bank: "Bank Beta", rate: "6.85%" },
        { bank: "Bank Alpha", rate: "7.00%" },
        { bank: "Bank Delta", rate: "7.10%" },
        { bank: "Bank Epsilon", rate: "7.45%" },
      ],
    },
  },
  gap: {
    eyebrow: "Why Alterra",
    title: "A seat that's always been empty.",
    paragraphs: [
      "When a company needs capital, the CFO usually calls five banks and gets five bids that don't line up — different structures, fees, covenants, and treasury terms. In commercial real estate, an advisor runs that process for you. On the operating side of a business, no one has — until now.",
      "Alterra serves CEOs, CFOs, and finance directors of mid-size companies — roughly $10M+ in lending needs and/or $20M+ in revenue — at a moment when out-of-state banks are pushing into California for share. We bring a disciplined, market-wide process to your desk and keep it simple.",
    ],
    link: { label: "Meet Dana & the approach", href: "/about" },
    image: {
      src: "/images/hero-about.jpg",
      alt: "Photography — placeholder pending Dana's photos (desk / Granite Bay office detail)",
    },
  },
  servicesIntro: {
    eyebrow: "What we do",
    title: "White-glove, end to end.",
  },
  services: [
    {
      num: "01",
      name: "Cash-flow lending",
      text: "Term loans and revolving facilities priced on your operating cash flow — taken to the right lenders, compared, and negotiated on your behalf.",
    },
    {
      num: "02",
      name: "Treasury management",
      text: "Operating accounts, sweep structures, and treasury fees evaluated alongside the credit — so your working capital is as efficient as your debt.",
    },
    {
      num: "03",
      name: "One comparable page",
      text: "Every bank's offer translated into the same terms and sorted best-first, so you decide on the facts — not on five mismatched phone calls.",
    },
  ],
  servicesLink: { label: "See the full seven-step process", href: "/services" },
  testimonialsIntro: {
    eyebrow: "Testimonials",
    title: "In their words.",
  },
  testimonialsLink: { label: "Read more", href: "/testimonials" },
  served: {
    eyebrow: "Companies served",
    items: ["Manufacturing", "Logistics", "Healthcare services", "Distribution", "Professional services"],
    note: "Placeholder — swap for real client logos / named sectors once Dana confirms what can be shown.",
  },
  cta: {
    title: "Let's talk.",
    body: "Tell us what you're financing. We'll tell you whether a competitive process makes sense — no obligation.",
    button: { label: "Book a discovery meeting", href: "/contact" },
  },
};

/* ────────────────────────────── SERVICES ────────────────────────────── */

export const servicesPage = {
  meta: {
    title: "Services — Alterra",
    description:
      "Alterra runs the full seven-step capital and treasury process and returns every bank's bid on one comparable page — cash-flow lending and treasury management, end to end.",
  },
  hero: {
    eyebrow: "Services / What we do",
    title: "The full process — first brief to final close.",
    lede: "We're not a bank and we don't lend. Alterra is independent — we run the competitive process and represent you, across cash-flow lending and treasury management.",
    image: {
      src: "/images/hero-services.jpg",
      alt: "Glass office towers rising against a clear sky",
    },
  },
  offerings: [
    {
      num: "01",
      name: "Cash-flow lending",
      text: "Term loans and revolving facilities priced on your operating cash flow — taken to the right lenders, compared, and negotiated on your behalf.",
    },
    {
      num: "02",
      name: "Treasury management",
      text: "Operating accounts, sweep structures, and treasury fees evaluated alongside the credit — so your working capital is as efficient as your debt.",
    },
    {
      num: "03",
      name: "One comparable page",
      text: "Every offer translated into the same terms and sorted best-first, so you decide on the facts — not on five mismatched phone calls.",
    },
  ],
  sequence: {
    eyebrow: "The sequence",
    title: "Seven steps, in order.",
    steps: [
      { num: "01", name: "Understand the need", text: "We learn your business, your cash-flow profile, and exactly what you're financing." },
      { num: "02", name: "Build the pitch", text: "We assemble the materials banks need to underwrite you well — and quickly." },
      { num: "03", name: "Take it to market", text: "We approach the right lenders across financing and treasury — not only the ones already on your desk." },
      { num: "04", name: "Gather the bids", text: "Every offer comes back to us, translated onto one comparable sheet." },
      { num: "05", name: "Distill to finalists", text: "We narrow the field to the two or three banks genuinely worth your time." },
      { num: "06", name: "Interview for fit", text: "We bring the finalists in for questions and a real read on the relationship — not just the rate." },
      { num: "07", name: "Select & onboard", text: "You choose. We manage onboarding and implementation through to close." },
    ],
  },
  instrument: {
    eyebrow: "What you actually receive",
    title: "Every bid on one comparable page.",
    lede: "Banks use mismatched fees, covenant formats, and floating variables that obscure the true cost of capital. We translate all of it — including treasury terms — into one comparable line and sort best-first.",
    tag: "Representative engagement",
    toggleNormalized: "Show raw offers",
    toggleRaw: "Show normalized",
    disclaimer: "Representative engagement, not an actual offer. Terms vary with operating cash flows and treasury structure.",
    columns: ["Lender", "All-in pricing", "Facility", "Upfront fees", "Covenants", "Structure"],
    normalized: [
      { lender: "Bank Gamma", pricing: "6.70%", facility: "$10,000,000", fees: "$25,000", covenants: "DSCR > 1.20x", structure: "Best comparable", win: true },
      { lender: "Bank Beta", pricing: "6.85%", facility: "$9,500,000", fees: "$50,000", covenants: "DSCR > 1.30x", structure: "Higher covenants" },
      { lender: "Bank Alpha", pricing: "7.00%", facility: "$10,250,000", fees: "$85,000", covenants: "DSCR > 1.25x", structure: "High upfront cost" },
      { lender: "Bank Delta", pricing: "7.10%", facility: "$10,000,000", fees: "$40,000", covenants: "DSCR > 1.25x", structure: "Slightly restrictive" },
      { lender: "Bank Epsilon", pricing: "7.45%", facility: "$8,000,000", fees: "$15,000", covenants: "DSCR > 1.20x", structure: "Capital shortfall" },
    ],
    raw: [
      { lender: "Bank Alpha", pricing: "SOFR + 2.15%", facility: "$10,250,000", fees: "$85,000", covenants: "DSCR > 1.25x · Liquidity > $500k", structure: "Variable" },
      { lender: "Bank Beta", pricing: "6.85% Fixed", facility: "$9,500,000", fees: "$50,000", covenants: "DSCR > 1.30x · Min. net worth", structure: "Shorter term" },
      { lender: "Bank Gamma", pricing: "SOFR + 1.85%", facility: "$10,000,000", fees: "$25,000", covenants: "DSCR > 1.20x", structure: "Flexible", win: true },
      { lender: "Bank Delta", pricing: "7.10% Fixed", facility: "$10,000,000", fees: "$40,000", covenants: "DSCR > 1.25x · Debt/equity cap", structure: "Fixed" },
      { lender: "Bank Epsilon", pricing: "SOFR + 2.30%", facility: "$8,000,000", fees: "$15,000", covenants: "DSCR > 1.20x · Receivables audit", structure: "Lower limit" },
    ],
  },
  scope: {
    in: {
      eyebrow: "In scope",
      text: "Cash-flow lending and treasury management, handled end to end — from first brief through onboarding and close.",
    },
    out: {
      eyebrow: "Out of scope",
      text: "We don't lend, take deposits, or sell securities, and we don't represent the banks. If a competitive market won't serve you, we'll tell you plainly.",
      flag: "[Engagement specifics & timelines — Dana to confirm.]",
    },
  },
  cta: {
    title: "Let's talk.",
    body: "Bring us what you're financing and we'll show you what a normalized process looks like.",
  },
};

/* ────────────────────────────── ABOUT ────────────────────────────── */

export const about = {
  meta: {
    title: "About Us — Alterra",
    description:
      "Dana Swanson spent 20 years on the bank's side of the table — community-bank executive, Wells Fargo middle-market lending, debt and equity placements. Alterra puts that experience on yours.",
  },
  hero: {
    eyebrow: "About us",
    title: "Twenty years on the bank's side of the table. Now on yours.",
    lede: "Alterra is led by Dana Swanson — a 20-year banking executive who built the firm to give CEOs and CFOs the one thing they were missing: someone unconflicted, in the room, working only for them.",
    image: {
      src: "/images/hero-about.jpg",
      alt: "Dana Swanson — portrait placeholder",
    },
  },
  story: {
    lead: "Dana spent two decades inside commercial banking — most recently an executive at a roughly $4B community bank, and before that in the middle-market division of Wells Fargo, financing companies with $50M+ in top-line revenue and closing both debt and equity placements for private and publicly-traded businesses.",
    body: "That seat taught her exactly how capital decisions get made — and where the operating company is at a disadvantage. When a CFO needs to raise capital or stand up treasury services, the standard move is to call five banks and try to compare offers that are built not to be comparable. In commercial real estate, advisors like Preferred Capital and Palmer Capital run that process for the borrower. On the operating side of a business, that seat has been empty. Alterra fills it.",
    pullquote: {
      quote: "I sat across the table from operating companies for twenty years. Alterra is me moving to your side of it.",
      cite: "Dana Swanson · Founder & CEO",
    },
  },
  principles: {
    eyebrow: "Why this model works",
    items: [
      {
        title: "Independent",
        text: "We answer to you, not a lending desk's quota. Alterra doesn't lend, take deposits, or earn a hidden spread — so the advice has no second agenda.",
      },
      {
        title: "End-to-end",
        text: "From first brief to onboarding and close, one relationship throughout. We draft the materials, run the competition, compare the bids, and manage implementation.",
      },
    ],
  },
  accordions: [
    {
      q: "How we're paid",
      a: "Fees are agreed up front and disclosed in full before any engagement begins. Because Alterra is independent, there are no hidden bank margins behind the advice. [Specific fee terms — Dana to confirm.]",
    },
    {
      q: "What we don't do",
      a: "We are not a bank and we don't lend, broker securities, or extend credit. We're your advisor — we run the process, compare the offers, and represent your interest through to close.",
    },
    {
      q: "Lending vs treasury",
      a: "Most advisors weigh only the loan margin. We compare the full picture — operating accounts, sweep structures, and treasury fees alongside the credit terms — so your working capital is as efficient as your long-term debt.",
    },
  ],
  cta: {
    title: "Let's talk.",
    body: "A short conversation is the easiest way to see whether a competitive process makes sense for you.",
  },
};

/* ────────────────────────────── TESTIMONIALS ────────────────────────────── */

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  photo: string;
};

// PLACEHOLDER — names, titles, quotes and headshots must be replaced with
// real, client-approved testimonials Dana gathers before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Having Alterra in the room completely changed how the banks approached our refinancing. Instead of five proposals on five different terms, we had a single normalized sheet that made them compete on our turf. It saved us months of work and over 80 basis points on our debt.",
    name: "Marcus Reyes",
    title: "CFO, Regional Manufacturing Group",
    photo: "/images/testi-marcus-reyes.png",
  },
  {
    quote:
      "We had outgrown our local bank's treasury system but didn't know which national bank fit our model. Alterra compared the treasury fees and sweep structure alongside a new cash-flow facility. The clarity was outstanding.",
    name: "Priya Anand",
    title: "CEO, Logistics Services Corp",
    photo: "/images/testi-priya-anand.png",
  },
  {
    quote:
      "Raising capital is usually a black box where the bank holds all the cards. Alterra sat on our side of the table and ran a disciplined process that brought us term sheets we could actually compare.",
    name: "David Hollis",
    title: "Finance Director, Healthcare Operations",
    photo: "/images/testi-david-hollis.png",
  },
];

export const testimonialsPage = {
  meta: {
    title: "Testimonials — Alterra",
    description:
      "What it's like to have an independent advisor run your banking process — in the words of the CEOs and CFOs Alterra has represented.",
  },
  hero: {
    eyebrow: "Testimonials",
    title: "In their words.",
    lede: "Mid-market CEOs and CFOs on what changes when an independent advisor runs the banking process for them.",
    image: {
      src: "/images/hero-testimonials.jpg",
      alt: "A city skyline glowing gold at blue hour",
    },
  },
  sectors: {
    eyebrow: "Companies served",
    title: "Sectors we work across.",
    items: ["Manufacturing", "Logistics", "Healthcare services", "Distribution", "Professional services"],
    note: "Placeholder — swap for real client logos / named sectors once Dana confirms what can be shown.",
  },
  cta: {
    title: "Let's talk.",
    body: "Tell us what you're financing — we'll tell you whether a competitive process makes sense.",
  },
};

/* ────────────────────────────── CONTACT ────────────────────────────── */

export const contact = {
  meta: {
    title: "Contact — Alterra",
    description:
      "Let's talk. Tell Alterra what you're financing and we'll tell you whether a competitive banking process makes sense — no obligation.",
  },
  hero: {
    eyebrow: "Contact",
    title: "Let's talk.",
    lede: "Tell us what you're financing. We'll tell you whether a competitive process makes sense — no obligation.",
    image: {
      src: "/images/hero-contact.jpg",
      alt: "Morning sun falling down a city avenue between towers",
    },
  },
  form: {
    fields: {
      name: "Name",
      company: "Company",
      email: "Work email",
      message: "What are you financing?",
      messagePlaceholder: "Briefly — the facility or treasury need, rough size, and timeline.",
    },
    submit: "Request a discovery meeting",
    reassure: "We reply within one business day. Your details stay between us.",
    success: {
      title: "Request received.",
      body: "Thanks — your note is on its way. Dana will be in touch within one business day.",
    },
    error: "Something interrupted the send. Please email us directly and we'll pick it up from there.",
  },
  scheduler: {
    title: "Book a discovery meeting",
    lede: "Prefer to grab a time directly? Pick a slot — 30 minutes, no obligation.",
    cta: "Open the scheduler",
    // Set once the real scheduler (Calendly or similar) is confirmed; falls back to the contact form.
    calendlyUrl: "",
  },
  aside: {
    location: "Granite Bay, California",
  },
};

/* ────────────────────────────── LEGAL ────────────────────────────── */

export const legal = {
  heroImage: {
    src: "/images/hero-legal.jpg",
    alt: "Minimal white architecture against a pale sky",
  },
  privacy: {
    meta: {
      title: "Privacy Policy — Alterra",
      description: "How Alterra collects, uses, and protects the information you share through this website.",
    },
    title: "Privacy Policy",
    updated: "Last updated: June 2026",
    flag: "[Template — for counsel review. Confirm entity, jurisdiction, analytics use, and contact address before launch.]",
    sections: [
      {
        h: "Who we are",
        p: [
          "Alterra is a commercial-banking advisory practice based in Granite Bay, California. This policy explains what information we collect through this website and how we use it.",
        ],
      },
      {
        h: "Information we collect",
        p: [
          "We only collect what you choose to give us. When you submit the contact form or request a discovery meeting, we collect your name, company, work email, and the details you describe about your financing need. We do not sell personal information.",
          "Contact details you submit through the form. Basic technical data (such as browser type and pages viewed) if web analytics are enabled. [Confirm whether analytics are used.]",
        ],
      },
      {
        h: "How we use it",
        p: [
          "To respond to your enquiry, schedule a discovery meeting, and, if we work together, to provide advisory services. We keep your details confidential and share them only as needed to serve you, or where required by law.",
        ],
      },
      {
        h: "Cookies & analytics",
        p: [
          "This site uses only the cookies necessary to function. If analytics are added, they will be described here and you will be able to opt out. [Update once the analytics decision is final.]",
        ],
      },
      {
        h: "How we protect it",
        p: [
          "We use reasonable safeguards to protect the information you share. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        h: "Your choices",
        p: ["You may ask us to access, correct, or delete the information you have provided at any time by emailing us."],
      },
      {
        h: "Contact",
        p: ["Questions about this policy? Email the address in the footer of this site. [Replace with branded email once the domain is live.]"],
      },
    ],
  },
  terms: {
    meta: {
      title: "Terms of Service — Alterra",
      description: "The terms that govern your use of the Alterra website.",
    },
    title: "Terms of Service",
    updated: "Last updated: June 2026",
    flag: "[Template — for counsel review. Confirm entity, jurisdiction, and financial-services disclosures before launch.]",
    sections: [
      {
        h: "Acceptance",
        p: ["By using this website you agree to these terms. If you do not agree, please do not use the site."],
      },
      {
        h: "Informational purpose only",
        p: [
          "The content here is general information about Alterra's advisory services. It is not financial, legal, tax, or investment advice, and it does not create an advisory relationship. Any engagement is governed by a separate written agreement.",
        ],
      },
      {
        h: "No offer or guarantee",
        p: [
          "The representative comparisons and examples shown are illustrative only. They are not offers of credit and do not guarantee any particular terms, pricing, or outcome. Alterra is not a bank and does not lend, take deposits, or sell securities.",
        ],
      },
      {
        h: "Your submissions",
        p: ["Information you submit through the contact form should be accurate and yours to share. We treat it as confidential, as described in our Privacy Policy."],
      },
      {
        h: "Intellectual property",
        p: ["The site's content, design, and marks are the property of Alterra and may not be reproduced without permission."],
      },
      {
        h: "Limitation of liability",
        p: ["To the extent permitted by law, Alterra is not liable for any loss arising from your use of, or reliance on, this website. [Confirm wording and any required disclosures with counsel.]"],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by the laws of the State of California. [Confirm jurisdiction.]"],
      },
      {
        h: "Contact",
        p: ["Questions about these terms? Email the address in the footer of this site."],
      },
    ],
  },
};

/* ────────────────────────────── FOOTER ────────────────────────────── */

export const footer = {
  blurb: "Commercial banking advisory for mid-market CEOs and CFOs. Cash-flow lending and treasury management, handled end to end.",
  adminLinks: [{ label: "Admin Dashboard", href: "/admin" }],
  navigate: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-use" },
  ],
};
