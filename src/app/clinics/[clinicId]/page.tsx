import Link from "next/link";

const clinic = {
  name: "Northstar Family Clinic",
  initials: "NF",
  tagline: "Everyday family care, made easier to find.",
  location: "Makati City, Metro Manila",
  about: "Northstar Family Clinic is a community-focused clinic offering general consultations and selected family health services with a patient-first approach.",
  contacts: [
    { label: "Phone", value: "+63 900 000 0000" },
    { label: "Email", value: "hello@northstar.example" },
    { label: "Website", value: "northstar.example" },
  ],
  services: [
    { name: "General consultation", duration: "30 min", price: "From ₱900", state: "Bookable" },
    { name: "Family wellness consultation", duration: "45 min", price: "Contact clinic", state: "Bookable" },
    { name: "Follow-up consultation", duration: "20 min", price: "₱650", state: "Bookable" },
  ],
};

const tabs = ["Profile", "Services", "Booking", "About", "Contact"];

export default async function ClinicPage({ params }: { params: Promise<{ clinicId: string }> }) {
  await params;

  return (
    <main className="clinic-page">
      <header className="clinic-hero glass-panel">
        <div className="clinic-hero-glow" aria-hidden="true" />
        <div className="clinic-hero-top">
          <Link className="back-link" href="/">← Back to map</Link>
          <span className="clinic-status"><span className="status-dot" /> Published clinic</span>
        </div>
        <div className="clinic-hero-identity">
          <div className="clinic-avatar large">{clinic.initials}</div>
          <div>
            <p className="eyebrow">CLINIC HERO</p>
            <h1>{clinic.name}</h1>
            <p>{clinic.tagline}</p>
            <span className="clinic-location">⌖ {clinic.location}</span>
          </div>
        </div>
        <div className="clinic-hero-actions">
          <a href="#booking" className="hero-action">Book a service</a>
          <a href="#contact" className="soft-action">Contact clinic</a>
        </div>
      </header>

      <nav className="clinic-tabs glass-panel" aria-label={`${clinic.name} sections`}>
        {tabs.map((tab) => <a href={`#${tab.toLowerCase()}`} key={tab}>{tab}</a>)}
      </nav>

      <section className="clinic-section-grid">
        <article id="profile" className="clinic-section glass-panel">
          <p className="eyebrow">PROFILE</p>
          <h2>The clinic at a glance.</h2>
          <div className="profile-facts">
            <div><span>Location</span><strong>{clinic.location}</strong></div>
            <div><span>Services</span><strong>{clinic.services.length} published services</strong></div>
            <div><span>Contact</span><strong>{clinic.contacts.length} public channels</strong></div>
          </div>
        </article>

        <article id="services" className="clinic-section glass-panel">
          <p className="eyebrow">SERVICES</p>
          <h2>What this clinic offers.</h2>
          <div className="service-list">
            {clinic.services.map((service) => (
              <div className="service-row" key={service.name}>
                <div><strong>{service.name}</strong><span>{service.duration}</span></div>
                <div className="service-side"><span>{service.price}</span><small>{service.state}</small></div>
              </div>
            ))}
          </div>
        </article>

        <article id="booking" className="clinic-section booking-placeholder glass-panel">
          <p className="eyebrow">BOOKING</p>
          <h2>Choose a service, then a real available time.</h2>
          <p>Calendar and availability controls are deliberately waiting for the governed booking engine. This prototype does not create reservations.</p>
          <button type="button" disabled>Booking engine next phase</button>
        </article>

        <article id="about" className="clinic-section glass-panel">
          <p className="eyebrow">ABOUT</p>
          <h2>About the clinic.</h2>
          <p className="body-copy">{clinic.about}</p>
        </article>

        <article id="contact" className="clinic-section glass-panel">
          <p className="eyebrow">CONTACT</p>
          <h2>Connect with the clinic.</h2>
          <div className="contact-list">
            {clinic.contacts.map((contact) => (
              <div key={contact.label}><span>{contact.label}</span><strong>{contact.value}</strong></div>
            ))}
          </div>
        </article>
      </section>

      <aside className="owner-note glass-panel">
        <span>OWNER VIEW</span>
        <strong>Edit is intentionally absent from guest navigation.</strong>
        <p>The future owner surface will edit profile, services, schedule, capacity, About, Contact, and publication settings only after authenticated ownership is enforced.</p>
      </aside>
    </main>
  );
}
