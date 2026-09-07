import Link from "next/link";
import { HeroDiorama } from "@/components/hero/HeroDiorama";
import { MedMapCanvas } from "@/components/map/MedMapCanvas";

const clinics = [
  { id: "northstar", name: "Northstar Family Clinic", treatment: "General consultation", price: "From ₱900", distance: "0.8 km", availability: "Next opening 09:30" },
  { id: "harbor", name: "Harbor Dental Studio", treatment: "Dental cleaning", price: "₱1,500", distance: "1.4 km", availability: "Next opening 10:00" },
  { id: "lumen", name: "Lumen Skin & Wellness", treatment: "Skin consultation", price: "Contact clinic", distance: "2.1 km", availability: "Next opening 11:30" },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-environment">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-beacon hero-beacon-one" aria-hidden="true" />
        <div className="hero-beacon hero-beacon-two" aria-hidden="true" />
        <HeroDiorama />
        <MedMapCanvas />

        <header className="hero-nav glass-panel">
          <Link href="/" className="brand-lockup" aria-label="MedMap home">
            <span className="brand-mark">✦</span>
            <div>
              <p className="eyebrow">SPATIAL CLINIC DISCOVERY</p>
              <h1>MedMap</h1>
            </div>
          </Link>
          <div className="hero-nav-context">
            <span className="context-pill">3D spatial mode</span>
            <span className="context-pill">Clinic-first</span>
          </div>
          <button className="ghost-button" type="button">For clinics</button>
        </header>

        <div className="hero-copy glass-panel">
          <div className="hero-copy-kicker"><span className="status-dot" /> DISCOVER AROUND YOU</div>
          <p className="eyebrow">MAP-FIRST CARE DISCOVERY</p>
          <h2>Find a clinic that can actually take your appointment.</h2>
          <p className="hero-description">
            Explore clinics in a living spatial view, inspect the services they publish, and move into a clinic page built around what is actually offered.
          </p>
          <div className="search-row">
            <input aria-label="Search treatments" placeholder="Treatment, clinical matter, or clinic" />
            <button type="button">Explore map</button>
          </div>
          <div className="hero-stats">
            <span><strong>3</strong> clinics in view</span>
            <span><strong>12</strong> service signals</span>
            <span><strong>MapLibre</strong> WebGL</span>
          </div>
        </div>

        <div className="spatial-inspector glass-panel" aria-hidden="true">
          <div className="inspector-line"><span>SPATIAL LAYER</span><strong>ACTIVE</strong></div>
          <div className="inspector-line"><span>CAMERA</span><strong>58° PITCH</strong></div>
          <div className="inspector-line"><span>CLINIC POINTS</span><strong>03</strong></div>
          <div className="inspector-line"><span>BOOKING STATE</span><strong>DEMO</strong></div>
        </div>

        <div className="floating-clinic-card glass-panel">
          <div className="clinic-card-topline">
            <span className="clinic-pulse" />
            <span>Featured clinic</span>
          </div>
          <div className="clinic-identity-row">
            <div className="clinic-avatar">NF</div>
            <div>
              <h3>Northstar Family Clinic</h3>
              <p>General consultation · 0.8 km</p>
            </div>
          </div>
          <div className="clinic-hero-meta">
            <span>From ₱900</span>
            <span>Next opening 09:30</span>
          </div>
          <div className="mini-nav" aria-label="Northstar clinic sections">
            {[
              ["Profile", "/clinics/northstar#profile"],
              ["Services", "/clinics/northstar#services"],
              ["Booking", "/clinics/northstar#booking"],
            ].map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          </div>
          <Link href="/clinics/northstar" className="secondary-action">Open clinic</Link>
        </div>

        <div className="map-hud glass-panel">
          <span className="status-dot" />
          <span>MapLibre WebGL</span>
          <span className="hud-separator">•</span>
          <span>3D spatial mode</span>
          <span className="hud-separator">•</span>
          <span>Prototype data</span>
        </div>

        <div className="hero-scroll-cue">SCROLL TO DISCOVER <span>↓</span></div>
      </section>

      <section className="discovery-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NEARBY CLINICS</p>
            <h2>Step into the care layer.</h2>
          </div>
          <p>Each clinic gets one coherent public surface with Profile, Services, Booking, About, and Contact. Owners unlock Edit separately.</p>
        </div>
        <div className="clinic-list">
          {clinics.map((clinic) => (
            <article className="clinic-card glass-panel" key={clinic.id}>
              <div className="clinic-card-topline">
                <span className="clinic-pulse" />
                <span>{clinic.distance}</span>
              </div>
              <h3>{clinic.name}</h3>
              <p>{clinic.treatment}</p>
              <div className="clinic-meta">
                <span>{clinic.price}</span>
                <span>{clinic.availability}</span>
              </div>
              <Link href={`/clinics/${clinic.id}`} className="secondary-action">View clinic</Link>
            </article>
          ))}
        </div>
        <p className="demo-note">Frontend spatial prototype only. Booking writes, ownership enforcement, and live clinic data remain deliberately parked for later governed phases.</p>
      </section>
    </main>
  );
}
