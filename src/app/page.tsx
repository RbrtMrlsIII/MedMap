import { MedMapCanvas } from "@/components/map/MedMapCanvas";

const clinics = [
  { id: "northstar", name: "Northstar Family Clinic", treatment: "General consultation", price: "From ₱900", distance: "0.8 km", availability: "Next opening 09:30" },
  { id: "harbor", name: "Harbor Dental Studio", treatment: "Dental cleaning", price: "₱1,500", distance: "1.4 km", availability: "Next opening 10:00" },
  { id: "lumen", name: "Lumen Skin & Wellness", treatment: "Skin consultation", price: "Contact clinic", distance: "2.1 km", availability: "Next opening 11:30" },
];

const clinicNav = ["Profile", "Services", "Booking", "About", "Contact"];

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-environment">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <MedMapCanvas />

        <header className="hero-nav glass-panel">
          <div className="brand-lockup">
            <span className="brand-mark">✦</span>
            <div>
              <p className="eyebrow">SPATIAL CLINIC DISCOVERY</p>
              <h1>MedMap</h1>
            </div>
          </div>
          <nav className="clinic-nav" aria-label="Clinic page sections">
            {clinicNav.map((item) => (
              <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>
            ))}
          </nav>
          <button className="ghost-button" type="button">For clinics</button>
        </header>

        <div className="hero-copy glass-panel">
          <p className="eyebrow">MAP-FIRST CARE DISCOVERY</p>
          <h2>Find care that can actually accept you.</h2>
          <p className="hero-description">
            Explore nearby clinics, inspect the services they publish, and discover bookable times from one spatial view.
          </p>
          <div className="search-row">
            <input aria-label="Search treatments" placeholder="Treatment, clinical matter, or clinic" />
            <button type="button">Explore</button>
          </div>
          <div className="hero-stats">
            <span><strong>3</strong> clinics in view</span>
            <span><strong>12</strong> services represented</span>
            <span><strong>Live</strong> spatial surface</span>
          </div>
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
          <div className="mini-nav" aria-label="Northstar clinic tabs">
            {clinicNav.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
          </div>
          <button type="button" className="secondary-action">Open clinic</button>
        </div>

        <div className="map-hud glass-panel">
          <span className="status-dot" />
          <span>MapLibre WebGL</span>
          <span className="hud-separator">•</span>
          <span>3D spatial mode</span>
          <span className="hud-separator">•</span>
          <span>Availability-aware</span>
        </div>

        <div className="hero-scroll-cue">SCROLL TO DISCOVER <span>↓</span></div>
      </section>

      <section className="discovery-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NEARBY CLINICS</p>
            <h2>Explore the care layer.</h2>
          </div>
          <p>Every clinic has its own public profile surface. Owners keep Edit controls private.</p>
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
              <button type="button" className="secondary-action">View clinic</button>
            </article>
          ))}
        </div>
        <p className="demo-note">Prototype surface only. Backend booking and clinic ownership are intentionally parked for the next governed phase.</p>
      </section>
    </main>
  );
}
