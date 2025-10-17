import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  HeartHandshake,
  ExternalLink,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Check,
  X,
} from "lucide-react";

// Import images from src/assets (Vite will fingerprint & cache-bust)
import heroImg from "./assets/hero2.jpg";
import logoLight from "./assets/PDGC logo white background.png";
import logoDark from "./assets/PDGC black background.png";
import paypalQR from "./assets/fall2025qrcode.png";
import venmoQR from "./assets/venmo-qr.png"; // <-- make sure this exists (or updat pth)

/** Ensures Zeffy embed script is present (required for modal button) */
function useZeffyScript() {
  useEffect(() => {
    const src = "https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js";
    const already = document.querySelector(`script[src="${src}"]`);
    if (already) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }, []);
}

/** Detects system dark mode and listens for changes */
function usePrefersDark() {
  const [prefersDark, setPrefersDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersDark;
}

const ORG = {
  name: "Peninsula Disc Golf Club",
  tagline: "Strengthening Connections and People Through Disc Golf",
  blurb:
    "Help Us Grow the Long Beach Dunes Disc Golf Course! The Peninsula Disc Golf Club is transforming rolling dunes into a free-to-play 18-hole disc golf course. With over 1,000 volunteer hours and strong local support, we’ve built tee pads, baskets and signage — and welcomed over 700+ unique players from across the country.",
  metrics: { volunteerHours: 520, periodLabel: "2025 YTD" },
  logos: { light: logoLight, dark: logoDark },
  contact: {
    email: "info@peninsuladiscgolfclub.org",
    address: "Long Beach, WA",
    socials: [
      { name: "Instagram", href: "https://instagram.com/longbeachdunesdiscgolf", icon: Instagram },
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100087858846267", icon: Facebook },
    ],
  },
};

// BRAND COLORS
const BRAND = {
  zeffy: "#00B386",
  paypal: "#003087",
  venmo: "#3D95CE",
  textOnDark: "#ffffff",
};

// Sponsorship tiers
const tiers = [
  { name: "Bronze", amount: "$250", perks: ["Thank-you post on social media", "Name on website"] },
  { name: "Silver", amount: "$500", perks: ["All Bronze perks", "Sticker pack / shout-out"] },
  { name: "Gold", amount: "$750", perks: ["All Silver perks", "Logo on website", "Logo on quarterly update"] },
  { name: "Platinum", amount: "$1000", perks: ["All Gold perks", "Small logo on tee sign (season)", "Event-day shout-out"] },
];

/** A button that triggers the Zeffy modal via the special attribute */
function ZeffyButton({
  children,
  href,
  style,
}: {
  children?: React.ReactNode;
  href: string;
  style?: CSSProperties;
}) {
  useZeffyScript();
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("zeffy-form-link", href);
    }
  }, [href]);

  return (
    <a
      ref={ref}
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{
        ...buttonSolid(BRAND.zeffy),
        ...style,
      }}
      aria-label="Donate via Zeffy (no fees)"
      role="button"
    >
      <HeartHandshake size={16} style={{ marginRight: 6 }} />
      Donate via Zeffy
    </a>
  );
}

/** Simple Venmo QR modal */
function VenmoModal({
  open,
  onClose,
  prefersDark,
}: {
  open: boolean;
  onClose: () => void;
  prefersDark: boolean;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(92vw, 520px)",
          background: prefersDark ? "#111113" : "#ffffff",
          color: prefersDark ? "#fafafa" : "#18181b",
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          border: `1px solid ${prefersDark ? "#27272a" : "#e4e4e7"}`,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: `1px solid ${prefersDark ? "#27272a" : "#e4e4e7"}` }}>
          <strong>Donate via Venmo</strong>
          <button onClick={onClose} aria-label="Close Venmo modal" style={{ background: "transparent", border: 0, color: "inherit", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: 16, display: "grid", gap: 12, placeItems: "center" }}>
          <img
            src={venmoQR}
            alt="Venmo QR code"
            style={{ width: 280, maxWidth: "80vw", height: "auto" }}
          />
          <p style={{ margin: 0, fontSize: 14, color: prefersDark ? "#a1a1aa" : "#52525b", textAlign: "center" }}>
            Scan this QR with the Venmo app to donate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PDGCWebsite() {
  const prefersDark = usePrefersDark();
  const [venmoOpen, setVenmoOpen] = useState(false);

  const colors = {
    bg: prefersDark ? "#18181b" : "#ffffff",
    text: prefersDark ? "#fafafa" : "#18181b",
    subtext: prefersDark ? "#a1a1aa" : "#52525b",
    border: prefersDark ? "#27272a" : "#e4e4e7",
    cardBg: prefersDark ? "#111113" : "#ffffff",
    cardShadow: prefersDark ? "0 1px 2px rgba(0,0,0,0.25)" : "0 1px 2px rgba(0,0,0,0.06)",
    navBg: prefersDark ? "rgba(24,24,27,0.85)" : "rgba(255,255,255,0.85)",
    heroOverlay: prefersDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
    accent: "#10b981",
    accentBorder: "#059669",
    softAlt: prefersDark ? "#1f1f23" : "#f9fafb",
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      {/* Small responsive helper for hero grid */}
      <style>{`
        @media (max-width: 900px) {
          .heroGrid {
            grid-template-columns: 1fr !important;
          }
          .donateRow {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>

      {/*NAV*/}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(6px)",
          background: colors.navBg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={containerRow}>
          
          {/* Left: logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={prefersDark ? ORG.logos.dark : ORG.logos.light}
              alt="logo"
              style={{ height: 130, width: 130, borderRadius: 999, objectFit: "cover", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
            />
            <div>
              <div style={{ fontWeight: 600 }}>{ORG.name}</div>
              <div style={{ fontSize: 14, color: colors.subtext }}>{ORG.tagline}</div>
            </div>
          </div>

          {/* Right: navigation links only */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#mission" style={navLink(colors.text)}>Mission</a>
            <a href="#why" style={navLink(colors.text)}>How You Can Help</a>
            <a href="#sponsorships" style={navLink(colors.text)}>Sponsorships</a>
            <a href="#volunteer" style={navLink(colors.text)}>Volunteering</a>
            <a href="#contact" style={navLink(colors.text)}>Contact</a>
          </div>
        </div>
      </nav>



      
     {/* =========================
    HERO WITH FUNDRAISER
   ========================= */}
<header
  style={{
    position: "relative",
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    overflow: "visible",
  }}
>
  {/* Background image */}
  <img
    src={heroImg}
    alt="hero"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
    }}
  />

  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: colors.heroOverlay,
      zIndex: 1,
    }}
  />

  {/* Fundraiser content */}
  <div style={{ position: "relative", zIndex: 2, ...container }}>
    <div
      className="heroGrid"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        alignItems: "center",
        gap: 24,
        textAlign: "left",
      }}
    >
      {/* LEFT SIDE — text only */}
      <div style={{ paddingRight: 16 }}>
        <h1
          style={{
            fontSize: "clamp(32px,6vw,56px)",
            fontWeight: 800,
            marginBottom: 16,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          Disc Golf that Builds Community
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "#e4e4e7",
            marginBottom: 18,
          }}
        >
          {ORG.blurb}
        </p>
      </div>

      {/* RIGHT SIDE — Zeffy form, thermometer, and buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Donation form */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "550px",
            width: "100%",
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            background: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: colors.cardShadow,
          }}
        >
          <iframe
            title="Donation form powered by Zeffy"
            style={{
              position: "absolute",
              border: 0,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 12,
              backgroundColor: "transparent",
            }}
            src="https://www.zeffy.com/embed/donation-form/help-us-grow-the-long-beach-dunes-disc-golf-course"
            allowPaymentRequest
            allowTransparency={true}
          ></iframe>
        </div>

        {/* Thermometer (frosted) */}
<div
  style={{
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    border: `1px solid ${colors.border}`,
    background: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    padding: "12px 14px 10px",
    boxShadow: colors.cardShadow,
  }}
>
  <p
    style={{
      fontSize: 15,
      color: "#374151",
      opacity: 0.9,
      textAlign: "center",
      marginBottom: 5, // space below text
    }}
  >
    Raised so far 💚 
  </p>

  <iframe
    title="Donation thermometer powered by Zeffy"
    style={{
      border: 0,
      width: "100%",
      height: "70px", 
      borderRadius: 8,
      backgroundColor: "transparent",
    }}
    src="https://www.zeffy.com/embed/thermometer/help-us-grow-the-long-beach-dunes-disc-golf-course"
    allowTransparency={true}
  ></iframe>
</div>

        {/* Centered buttons below the glassy blocks */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 4,
          }}
        >
          
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=NFN35LVULXANN"
            target="_blank"
            rel="noreferrer"
            style={buttonSolid(BRAND.paypal)}
          >
            Donate via PayPal
          </a>
          
          <button
            onClick={() => setVenmoOpen(true)}
            style={buttonSolid(BRAND.venmo) as CSSProperties}
          >
            Donate via Venmo
          </button>
          
        </div>
      </div>
    </div>
  </div>

  
</header>



      

      {/* MISSION + GOAL */}
      <section id="mission" style={section}>
        <div style={container}>
          <div style={gridTwoCols}>
            <div>
              <h2 style={h2}>Our Mission</h2>
              <p style={{ marginTop: 12, color: colors.subtext, lineHeight: 1.6 }}>
                We expand access to healthy outdoor recreation through disc golf, steward local courses with volunteer labor,
                and host inclusive events and youth programs.
              </p>
              <ul style={{ marginTop: 16, color: colors.text, listStyle: "none", padding: 0 }}>
                {[
                  "Maintain and improve public disc-golf courses",
                  "Host community events and tournaments",
                  "Promote stewardship of dunes and local ecology",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 8 }}>
                    <Check size={20} style={{ marginTop: 2 }} /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={card(colors)}>
              <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}` }}>
                <h3 style={{ margin: 0, fontWeight: 700 }}>Our 2026 Goal</h3>
              </div>
              <div style={{ padding: 16, fontSize: 14, color: colors.subtext }}>
                <p>Raise <strong style={{ color: colors.text }}>$30,000</strong> </p>
                <p>Every dollar goes directly to:</p>
                <ul style={{ paddingLeft: 18 }}>
                  <li>Tee pads and baskets for new holes and practice areas</li>
                  <li>Professional signage</li>
                  <li>Safe and effective land clearing and mowing</li>
                  <li>Benches, erosion control, and course improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      
      {/* HOW TO HELP */}
      <section id="why" style={{ borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, background: colors.softAlt }}>
        <div style={{ ...container, paddingTop: 48, paddingBottom: 48 }}>
          <h2 style={h2}>How You Can Help</h2>
          <ul style={{ marginTop: 16, color: prefersDark ? "#e2e8f0" : "#374151", fontSize: 15, lineHeight: 1.7 }}>
            <li>Make a tax-deductible donation today</li>
            <li>Sponsor a hole or sign with a donation and get your business logo on signage</li>
            <li>Join us as a volunteer and help us finish the course</li>
          </ul>
        </div>
      </section>



      

      {/* SPONSORSHIPS */}
      <section id="sponsorships" style={section}>
        <div style={container}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <h2 style={h2}>Sponsorships</h2>
              <p style={{ color: colors.subtext, maxWidth: 720 }}>
                Local businesses make our mission possible. Choose a tier below or contact us for a custom package (in-kind donations also very welcome!).
              </p>
            </div>
            <a href="#contact" style={buttonPrimary(colors)}><HeartHandshake size={16} style={{ marginRight: 6 }} /> Start a Conversation</a>
          </div>

          <div style={{ marginTop: 16, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {tiers.map((tier) => (
              <div key={tier.name} style={card(colors)}>
                <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between" }}>
                  <strong>{tier.name}</strong>
                  <span style={{ color: colors.subtext }}>{tier.amount}</span>
                </div>
                <div style={{ padding: 16 }}>
                  <a href="https://www.paypal.com/donate/?hosted_button_id=NFN35LVULXANN" target="_blank" rel="noreferrer" style={{ ...buttonSecondary(colors), width: "100%", display: "inline-block", textAlign: "center", marginTop: 12 }}>
                    Sponsor {tier.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      

      {/* VOLUNTEER */}
      <section id="volunteer" style={{ borderBottom: `1px solid ${colors.border}`, background: prefersDark ? "#0b0b0c" : "#fafafa" }}>
        <div style={{ ...container, paddingTop: 48, paddingBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <h2 style={h2}>Volunteer Hours</h2>
            <span style={{ fontSize: 12, color: colors.subtext }}>{ORG.metrics.periodLabel || "This Year"}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div style={card(colors)}>
              <div style={{ padding: 16 }}>
                <p style={{ color: colors.subtext }}>
                  We track and celebrate the hours volunteers put into maintaining the Dunes course and running clinics.
                  If you put in time—log it so we can recognize you and report impact to sponsors.
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
                  <div style={{ border: `1px solid ${colors.border}`, background: colors.cardBg, borderRadius: 12, padding: 16, minWidth: 160, textAlign: "center" }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: colors.text }}>{ORG.metrics.volunteerHours}</div>
                    <div style={{ fontSize: 12, color: colors.subtext }}>Total Hours</div>
                  </div>
                  <a
                    href={`mailto:${ORG.contact.email}?subject=Volunteer%20Hours%20Log&body=Name:%0AHours:%0ADate:%0AActivity:`}
                    style={buttonPrimary(colors)}
                  >
                    Submit Hours via Email
                  </a>
                  <a href="#contact" style={buttonSecondary(colors)}>Contact Us</a>
                </div>
              </div>
            </div>

            <div style={card(colors)}>
              <div style={{ padding: 16 }}>
                <h3 style={{ marginTop: 0 }}>How to Help</h3>
                <div style={{ fontSize: 14, color: colors.subtext, lineHeight: 1.6 }}>
                  <p>• Join work parties for trail and tee maintenance</p>
                  <p>• Help at youth clinics and beginner days</p>
                  <p>• Contribute signage, tools, or printing (in-kind)</p>
                  <p>• Share updates on social to spread the word</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* DONATE STRIP */}
      <section style={{ borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, background: prefersDark ? "linear-gradient(90deg,#052e2b,#0b2a33)" : "linear-gradient(90deg,#ecfdf5,#e0f2fe)" }}>
        <div style={{ ...container, paddingTop: 24, paddingBottom: 24, display: "flex", gap: 16, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Every gift keeps the course playable and the community growing.</h3>
            <p style={{ marginTop: 6, color: colors.subtext }}>One-time or monthly donations are tax-deductible to the extent allowed by law.</p>
            <ul style={{ marginTop: 8, color: prefersDark ? "#e2e8f0" : "#374151", fontSize: 14, lineHeight: 1.6 }}>
              <li>• Make a tax-deductible donation today</li>
              <li>• Sponsor a hole or sign with your business logo</li>
              <li>• Join us as a volunteer and help us finish the course</li>
            </ul>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <ZeffyButton href="https://www.zeffy.com/embed/donation-form/help-us-grow-the-long-beach-dunes-disc-golf-course?modal=true" />
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=NFN35LVULXANN"
              target="_blank"
              rel="noreferrer"
              style={buttonSolid(BRAND.paypal)}
            >
              Donate via PayPal
            </a>
            <button
              onClick={() => setVenmoOpen(true)}
              style={buttonSolid(BRAND.venmo) as CSSProperties}
            >
              Donate via Venmo
            </button>

            {/* QR quick donate card (PayPal) */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", border: `1px solid ${colors.border}`, background: colors.cardBg, borderRadius: 12, padding: "8px 12px" }}>
              <img src={paypalQR} alt="PayPal QR code" style={{ height: 160, width: 160, objectFit: "contain" }} />
              <div style={{ fontSize: 12, color: colors.subtext }}>Scan with your phone<br/>to donate via PayPal</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={section}>
        <div style={container}>
          <div style={gridTwoCols}>
            <div>
              <h2 style={h2}>Get in Touch</h2>
              <p style={{ marginTop: 8, color: colors.subtext }}>We’d love to chat about sponsorships, in-kind donations, or volunteering.</p>
              <div style={{ marginTop: 12, fontSize: 14 }}>
                <p style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Mail size={16} /> <a href={`mailto:${ORG.contact.email}`} style={{ textDecoration: "underline", color: colors.text }}>{ORG.contact.email}</a>
                </p>
                <p style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MapPin size={16} /> {ORG.contact.address}
                </p>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {ORG.contact.socials.map(({ name, href, icon: Icon }) => (
                  <a key={name} href={href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${colors.border}`, background: colors.cardBg, borderRadius: 10, padding: "8px 10px", textDecoration: "none", color: colors.text }}>
                    <Icon size={16} /> <span style={{ fontSize: 14 }}>{name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form (demo) */}
            <div style={card(colors)}>
              <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}` }}>
                <h3 style={{ margin: 0 }}>Message Us</h3>
              </div>
              <div style={{ padding: 16 }}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <input placeholder="Your name" required style={input(colors)} />
                    <input type="email" placeholder="Email" required style={input(colors)} />
                    <textarea placeholder="How would you like to partner with PDGC?" rows={5} style={textarea(colors)} />
                    <button type="submit" style={buttonPrimary(colors)}>Send</button>
                    <p style={{ fontSize: 12, color: colors.subtext }}>
                      This form is a demo. Replace with a live form endpoint.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${colors.border}`, background: colors.cardBg }}>
        <div style={{ ...container, paddingTop: 28, paddingBottom: 28, fontSize: 14, color: colors.subtext }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600, color: colors.text }}>{ORG.name}</div>
              <div style={{ fontSize: 12 }}>{ORG.tagline}</div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {ORG.contact.socials.map(({ name, href, icon: Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", color: colors.text }}>
                  <Icon size={16} /> {name}
                </a>
              ))}
            </div>
          </div>
          <p style={{ marginTop: 12, fontSize: 12 }}>© {new Date().getFullYear()} Strengthening Connections and People Through Disc Golf. All rights reserved.</p>
        </div>
      </footer>

      {/* Venmo modal (global) */}
      <VenmoModal open={venmoOpen} onClose={() => setVenmoOpen(false)} prefersDark={prefersDark} />
    </div>
  );
}

/* ===== style helpers ===== */
const container: CSSProperties = { maxWidth: 1152, margin: "0 auto", padding: "0 16px" };
const containerRow: CSSProperties = { ...container, display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, paddingBottom: 12 };
const section: CSSProperties = { padding: "64px 0" };
const h2: CSSProperties = { fontSize: 28, fontWeight: 800, marginBottom: 16 };
const gridTwoCols: CSSProperties = { display: "grid", gap: 16, gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" };

// Buttons styled consistently
function buttonSolid(bg: string): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: bg,
    color: BRAND.textOnDark,
    padding: "10px 16px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid rgba(0,0,0,0.15)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    cursor: "pointer",
  };
}

function navLink(color: string): CSSProperties {
  return { fontSize: 14, color, textDecoration: "none" };
}
function card(colors: any): CSSProperties {
  return { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: "hidden", boxShadow: colors.cardShadow };
}
function buttonPrimary(colors: any): CSSProperties {
  return { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, background: colors.accent, color: "#fff", padding: "8px 16px", borderRadius: 12, textDecoration: "none", fontWeight: 600, border: `1px solid ${colors.accentBorder}` };
}
function buttonSecondary(colorsOrObj: any): CSSProperties {
  const border = typeof colorsOrObj === "object" && colorsOrObj.border ? colorsOrObj.border : "#e4e4e7";
  return { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, border: `1px solid ${border}`, background: "transparent", color: "inherit", padding: "8px 16px", borderRadius: 12, textDecoration: "none" };
}
function input(colors: any): CSSProperties {
  return { height: 40, padding: "0 10px", border: `1px solid ${colors.border}`, background: colors.cardBg, color: colors.text, borderRadius: 8, outline: "none" };
}
function textarea(colors: any): CSSProperties {
  return { padding: 10, border: `1px solid ${colors.border}`, background: colors.cardBg, color: colors.text, borderRadius: 8, outline: "none", resize: "vertical", width: "100%" };
}
