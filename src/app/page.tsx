"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroDiorama } from "@/components/hero/HeroDiorama";
import { MedMapCanvas } from "@/components/map/MedMapCanvas";

const clinics = [
  { id: "northstar", name: "Northstar Family Clinic", treatment: "General consultation", price: "From ₱900", distance: "0.8 km", availability: "Next opening 09:30" },
  { id: "harbor", name: "Harbor Dental Studio", treatment: "Dental cleaning", price: "₱1,500", distance: "1.4 km", availability: "Next opening 10:00" },
  { id: "lumen", name: "Lumen Skin & Wellness", treatment: "Skin consultation", price: "Contact clinic", distance: "2.1 km", availability: "Next opening 11:30" },
];

type SpatialObjectId = "discovery" | "clinic" | "operations" | null;

const SPATIAL_COPY: Record<Exclude<SpatialObjectId, null>, { eyebrow: string; title: string; body: string; action: string }> = {
  discovery: { eyebrow: "DISCOVERY ROOM", title: "Find nearby clinics.", body: "Search clinic, treatment, or location context before authentication.", action: "Explore map" },
  clinic: { eyebrow: "CLINIC ROOM", title: "Inspect one clinic.", body: "Review Profile, Services, Booking, About, and Contact.", action: "Open clinic" },
  operations: { eyebrow: "OWNER WORKSPACE", title: "Run the booking queue.", body: "Clinic-side operations remain authenticated and owner-authorized.", action: "For clinics" },
};

export default function HomePage() {
  const [spatialObject, setSpatialObject] = useState<SpatialObjectId>(null);
  const [headerRevealed, setHeaderRevealed] = useState(false);

  useEffect(() => {
    const handleFocus = (event: Event) => setSpatialObject((event as CustomEvent<{ id: SpatialObjectId }>).detail?.id ?? null);
    const handleScroll = () => setHeaderRevealed(window.scrollY > window.innerHeight * 0.08);
    window.addEventListener("medmap-spatial-object-focus", handleFocus);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("medmap-spatial-object-focus", handleFocus);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeCopy = spatialObject ? SPATIAL_COPY[spatialObject] : null;

  return (
    <main className="app-shell">
      <section className="hero-environment">
        <div className="hero-atmosphere" aria-hidden="true" />
        <HeroDiorama />
        <MedMapCanvas />

        <header className={`hero-nav glass-panel ${headerRevealed ? "hero-nav-revealed" : "hero-nav-arrival"}`}>
          <Link href="/" className="brand-lockup" aria-label="MedMap home">
            <span className="brand-mark">✦</span>
            <div><p className="eyebrow">SPATIAL CLINIC DISCOVERY</p><h1>MedMap</h1></div>
          </Link>
          <div className="hero-nav-context" aria-label="Spatial site sections">
            <button type="button" className="context-pill" onClick={() => window.dispatchEvent(new CustomEvent("medmap-spatial-set-pose", { detail: { pose: "discovery" } }))}>Discovery</button>
            <button type="button" className="context-pill" onClick={() => window.dispatchEvent(new CustomEvent("medmap-spatial-set-pose", { detail: { pose: "clinic" } }))}>Clinic</button>
            <span className="context-pill">3D Spatial</span>
          </div>
          <button className="ghost-button" type="button" onClick={() => window.dispatchEvent(new CustomEvent("medmap-spatial-set-pose", { detail: { pose: "operations" } }))}>For clinics</button>
        </header>

        <div className="hero-copy glass-panel">
          <div className="hero-copy-kicker"><span className="status-dot" /> FROM THE MAIN HALL</div>
          <p className="eyebrow">MAP-FIRST CARE DISCOVERY</p>
          <h2>Find care nearby.</h2>
          <p className="hero-description">Search clinics, inspect published services, then enter a clinic room before booking.</p>
          <div className="search-row">
            <input aria-label="Search treatments" placeholder="Treatment, clinic, or location" />
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("medmap-spatial-set-pose", { detail: { pose: "discovery" } }))}>Explore map</button>
          </div>
          <div className="hero-stats"><span><strong>3</strong> clinics in view</span><span><strong>Guest</strong> discovery</span><span><strong>MapLibre</strong> inside Spatial</span></div>
        </div>

        {activeCopy && (
          <aside className="spatial-object-panel glass-panel" aria-live="polite">
            <p className="eyebrow">{activeCopy.eyebrow}</p><h3>{activeCopy.title}</h3><p>{activeCopy.body}</p>
            {spatialObject === "clinic" ? <Link href="/clinics/northstar" className="secondary-action">{activeCopy.action}</Link> : <button className="secondary-action" type="button" onClick={() => setSpatialObject(null)}>{activeCopy.action}</button>}
          </aside>
        )}

        <div className="spatial-inspector glass-panel" aria-hidden="true">
          <div className="inspector-line"><span>SITE</span><strong>THREE.JS</strong></div>
          <div className="inspector-line"><span>WEBGL</span><strong>2</strong></div>
          <div className="inspector-line"><span>DISCOVERY</span><strong>MAPLIBRE</strong></div>
          <div className="inspector-line"><span>STATE</span><strong>DEMO</strong></div>
        </div>

        <div className="floating-clinic-card glass-panel">
          <div className="clinic-card-topline"><span className="clinic-pulse" /><span>Featured clinic</span></div>
          <div className="clinic-identity-row"><div className="clinic-avatar">NF</div><div><h3>Northstar Family Clinic</h3><p>General consultation · 0.8 km</p></div></div>
          <div className="clinic-hero-meta"><span>From ₱900</span><span>Next opening 09:30</span></div>
          <div className="mini-nav" aria-label="Northstar clinic sections">
            {[["Profile", "/clinics/northstar#profile"], ["Services", "/clinics/northstar#services"], ["Booking", "/clinics/northstar#booking"]].map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          </div>
          <Link href="/clinics/northstar" className="secondary-action">Open clinic</Link>
        </div>

        <div className="map-hud glass-panel"><span className="status-dot" /><span>MapLibre discovery</span><span className="hud-separator">•</span><span>Three.js Spatial</span><span className="hud-separator">•</span><span>Prototype data</span></div>
        <div className="hero-scroll-cue">TRAVERSE THE HALL <span>↓</span></div>
      </section>

      <section className="discovery-section">
        <div className="section-heading"><div><p className="eyebrow">GUEST DISCOVERY</p><h2>Choose a clinic room.</h2></div><p>MapLibre is the geographic search and filtering engine inside the 3D Spatial site. Authentication begins when a guest proceeds toward booking.</p></div>
        <div className="clinic-list">
          {clinics.map((clinic) => <article className="clinic-card glass-panel" key={clinic.id}><div className="clinic-card-topline"><span className="clinic-pulse" /><span>{clinic.distance}</span></div><h3>{clinic.name}</h3><p>{clinic.treatment}</p><div className="clinic-meta"><span>{clinic.price}</span><span>{clinic.availability}</span></div><Link href={`/clinics/${clinic.id}`} className="secondary-action">View clinic</Link></article>)}
        </div>
        <p className="demo-note">Spatial baseline: authored Three.js environment with semantic fallback. Live Firestore, authentication, booking writes, and subscriptions remain governed by later phases.</p>
      </section>
    </main>
  );
}
