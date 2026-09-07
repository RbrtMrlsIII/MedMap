import { MedMapCanvas } from "@/components/map/MedMapCanvas";

const clinics = [
  { id: "northstar", name: "Northstar Family Clinic", treatment: "General consultation", price: "From ₱900", distance: "0.8 km", availability: "Next opening 09:30" },
  { id: "harbor", name: "Harbor Dental Studio", treatment: "Dental cleaning", price: "₱1,500", distance: "1.4 km", availability: "Next opening 10:00" },
  { id: "lumen", name: "Lumen Skin & Wellness", treatment: "Skin consultation", price: "Contact clinic", distance: "2.1 km", availability: "Next opening 11:30" },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-panel glass-panel">
        <div className="brand-lockup">
          <span className="brand-mark">✦</span>
          <div>
            <p className="eyebrow">MAP-FIRST CLINIC DISCOVERY</p>
            <h1>MedMap</h1>
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Find care you can actually book</p>
          <h2>What do you need help with?</h2>
          <div className="search-row">
            <input aria-label="Search treatments" placeholder="Treatment, clinical matter, or clinic" />
            <button type="button">Search</button>
          </div>
        </div>
      </section>

      <section className="map-stage">
        <MedMapCanvas />
        <div className="map-hud glass-panel">
          <span className="status-dot" />
          <span>3 clinics in this view</span>
          <span className="hud-separator">•</span>
          <span>Availability-aware discovery</span>
        </div>
      </section>

      <aside className="results-panel glass-panel" aria-label="Clinic results">
        <div className="results-header">
          <div>
            <p className="eyebrow">NEARBY</p>
            <h2>Clinics you can explore</h2>
          </div>
          <button type="button" className="filter-button">Filters</button>
        </div>
        <div className="clinic-list">
          {clinics.map((clinic) => (
            <article className="clinic-card" key={clinic.id}>
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
        <p className="demo-note">Demo discovery data only. Booking writes will be enabled after the availability contract is implemented and verified.</p>
      </aside>
    </main>
  );
}
