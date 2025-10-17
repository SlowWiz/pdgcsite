import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Mail, MapPin, HeartHandshake, ExternalLink, Instagram, Facebook, Link } from "lucide-react";

const ORG = {
  name: "Peninsula Disc Golf Club (PDGC)",
  tagline: "Connecting People Through Disc Golf",
  blurb:
    "Help Us Grow the Long Beach Dunes Disc Golf Course! Since 2023, the Peninsula Disc Golf Club has transformed empty dunes into a thriving 11-hole community disc golf course. With over 1,000 volunteer hours and strong local support, we’ve built tee pads, baskets, and signage — and welcomed 700+ unique players from across the Northwest.",
  metrics: {
    volunteerHours: 520,
    periodLabel: "2025 YTD",
  },
  logos: {
    light: "/images/logo-color.png",
    dark: "/images/logo-dark.png",
  },
  heroImg: "/images/hero.jpg",
  primaryCTA: {
    text: "Donate",
    href: "https://www.paypal.com/donate/?hosted_button_id=NFN35LVULXANN",
  },
  secondaryCTA: {
    text: "Become a Sponsor",
    href: "#sponsorships",
  },
  qrDataUrl: "/images/paypal-qr.png",
  contact: {
    email: "info@peninsuladiscgolfclub.org",
    address: "Long Beach, WA",
    socials: [
      { name: "Instagram", href: "https://instagram.com/longbeachdunesdiscgolf", icon: Instagram },
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100087858846267", icon: Facebook },
    ],
  },
};

function logoFor(pass: "light" | "dark" = "light") {
  return ORG.logos[pass] || ORG.logos.light;
}

export default function PDGCWebsite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoFor("light")} alt="logo" className="h-9 w-9 rounded-full object-cover shadow" />
            <div className="leading-tight">
              <div className="font-semibold">{ORG.name}</div>
              <div className="text-xs text-zinc-500">{ORG.tagline}</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="#mission" className="text-sm hover:underline">Mission</a>
            <a href="#why" className="text-sm hover:underline">Why it Matters</a>
            <a href="#volunteer" className="text-sm hover:underline">Volunteer</a>
            <a href="#sponsorships" className="text-sm hover:underline">Sponsorships</a>
            <a href="#contact" className="text-sm hover:underline">Contact</a>
            <Button asChild className="rounded-2xl">
              <a href={ORG.primaryCTA.href} target="_blank" rel="noreferrer">
                <HeartHandshake className="mr-2 h-4 w-4" /> {ORG.primaryCTA.text}
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative">
        <div className="absolute inset-0 -z-10">
          <img src={ORG.heroImg} alt="hero" className="h-[60vh] w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mx-auto max-w-6xl px-4 flex flex-col justify-center h-[60vh] text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow">
            Disc Golf that Builds Community
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-zinc-200">{ORG.blurb}</p>
          <div className="mt-6 flex gap-3">
            <Button size="lg" asChild className="rounded-2xl">
              <a href={ORG.primaryCTA.href} target="_blank" rel="noreferrer">
                <HeartHandshake className="mr-2 h-5 w-5" /> {ORG.primaryCTA.text}
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild className="rounded-2xl">
              <a href={ORG.secondaryCTA.href}>
                <ExternalLink className="mr-2 h-5 w-5" /> {ORG.secondaryCTA.text}
              </a>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
