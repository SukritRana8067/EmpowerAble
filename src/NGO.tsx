import { useState } from "react";

/* ──────────────── STARS (same as Marketplace) ──────────────── */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.65 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── DATA ──────────────── */
const NGOS = [
  {
    id: 1,
    name: "IDEA",
    category: "Education & Inclusion",
    location: "Dwarka",
    state: "New Delhi",
    desc: "Inclusive Divyangjan Entrepreneur Association. Promoting inclusive education and accessibility for all.",
    contact: "+91 8076083697",
    website: "https://idea4newindia.com/",
    focus: ["Inclusion", "Entrepreneurship", "Accessibility"],
    founded: "2008",
    reach: "8,000+",
    emoji: "💡",
    accent: "#7c3aed",
  },
  {
    id: 2,
    name: "Sense International",
    category: "Deafblind Support",
    location: "Delhi",
    state: "Delhi",
    desc: "Supporting deafblind individuals through education, training and life-changing interventions.",
    contact: "info@senseint.org",
    website: "https://www.senseinternational.org.in",
    focus: ["Deafblind", "Education", "Rehabilitation"],
    founded: "1997",
    reach: "5,000+",
    emoji: "🤲",
    accent: "#0891b2",
  },
  {
    id: 3,
    name: "ADAPT India",
    category: "Rehabilitation",
    location: "Mumbai",
    state: "Maharashtra",
    desc: "Providing comprehensive education, therapy and advocacy for persons with all forms of disability.",
    contact: "info@adaptindia.org",
    website: "https://www.adaptindia.org",
    focus: ["Therapy", "Education", "Advocacy"],
    founded: "1959",
    reach: "15,000+",
    emoji: "♿",
    accent: "#be123c",
  },
  {
    id: 4,
    name: "Enable India",
    category: "Employment",
    location: "Bangalore",
    state: "Karnataka",
    desc: "Helping people with disabilities gain skills and sustainable employment across India.",
    contact: "contact@enableindia.org",
    website: "https://www.enableindia.org",
    focus: ["Livelihood", "Skills Training", "Placement"],
    founded: "1999",
    reach: "20,000+",
    emoji: "🚀",
    accent: "#4f46e5",
  },
  {
    id: 5,
    name: "National Association of the Blind",
    category: "Visual Impairment",
    location: "Mumbai",
    state: "Maharashtra",
    desc: "Empowering visually impaired individuals with education, vocational training and social integration.",
    contact: "nab@nabindia.org",
    website: "https://www.nabindia.org",
    focus: ["Visual Impairment", "Braille", "Training"],
    founded: "1952",
    reach: "50,000+",
    emoji: "👁️",
    accent: "#0f766e",
  },
  {
    id: 6,
    name: "Action for Autism",
    category: "Autism Support",
    location: "New Delhi",
    state: "Delhi",
    desc: "Creating a meaningful life for persons with autism through education, guidance and community.",
    contact: "info@autism-india.org",
    website: "https://www.autism-india.org",
    focus: ["Autism", "Family Support", "Training"],
    founded: "1991",
    reach: "10,000+",
    emoji: "🧩",
    accent: "#92400e",
  },
];

const CATEGORIES = ["All", "Employment", "Education & Inclusion", "Rehabilitation", "Deafblind Support", "Visual Impairment", "Autism Support"];
const STATES     = ["All States", "Karnataka", "Maharashtra", "Delhi"];

const STATS = [
  { n: "6+",     l: "NGO Partners" },
  { n: "1 Lakh+", l: "Lives Impacted" },
  { n: "10+",    l: "Disability Types" },
];

const INFO_CARDS = [
  { icon: "◈", title: "Find the Right Support", sub: "Browse vetted organizations by category, location and disability type" },
  { icon: "◆", title: "Direct Connections",      sub: "Contact NGOs directly via email or website with one click" },
  { icon: "⬡", title: "Verified Listings",       sub: "All NGOs are independently verified and regularly updated" },
];

/* ──────────────── SUB-COMPONENTS ──────────────── */

function NGOCard({ ngo, onContact }: { ngo: typeof NGOS[0]; onContact: (n: typeof NGOS[0]) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        border: hov ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)",
        transition: "all 0.22s", transform: hov ? "translateY(-4px)" : "none",
      }}
    >
      {/* Top accent bar / visual */}
      <div style={{ height: 120, position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg,${ngo.accent}33 0%,${ngo.accent}11 100%)`,
        borderBottom: `1px solid ${ngo.accent}22` }}>
        <svg viewBox="0 0 300 120" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <circle cx="260" cy="20"  r="70" fill={ngo.accent} opacity="0.12"/>
          <circle cx="30"  cy="100" r="55" fill={ngo.accent} opacity="0.10"/>
          <rect x="80" y="30" width="140" height="60" rx="8" fill={ngo.accent} opacity="0.07" transform="rotate(-8 150 60)"/>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 22px", gap: 16 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: `${ngo.accent}22`,
            border: `1px solid ${ngo.accent}44`, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{ngo.emoji}</div>
          <div>
            <div style={{ fontSize: 10, color: ngo.accent, fontFamily: "system-ui,sans-serif",
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{ngo.category}</div>
            <div style={{ fontFamily: "'Georgia',serif", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{ngo.name}</div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 14,
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
          padding: "3px 8px", fontSize: 10, color: "rgba(255,255,255,0.6)",
          fontFamily: "system-ui,sans-serif" }}>
          📍 {ngo.location}, {ngo.state}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
          lineHeight: 1.65, margin: "0 0 14px" }}>{ngo.desc}</p>

        {/* Focus tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {ngo.focus.map(f => (
            <span key={f} style={{ background: `${ngo.accent}18`, border: `1px solid ${ngo.accent}33`,
              color: ngo.accent, fontSize: 10, padding: "3px 10px", borderRadius: 20,
              fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>{f}</span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 16, paddingBottom: 14,
          borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif" }}>{ngo.reach}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Reached</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)" }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif" }}>Est. {ngo.founded}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Founded</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onContact(ngo)}
            style={{ flex: 1, padding: "9px 0", borderRadius: 100, fontSize: 12, fontWeight: 700,
              fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.18s",
              background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >Contact →</button>
          <a href={ngo.website} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, padding: "9px 0", borderRadius: 100, fontSize: 12, fontWeight: 700,
              fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.18s",
              background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
          >Website ↗</a>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ ngo, onClose }: { ngo: typeof NGOS[0]; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center",
      justifyContent: "center", padding: "20px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 440, borderRadius: 24, overflow: "hidden",
          background: "rgba(6,12,26,0.96)", border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)", position: "relative" }}>

        {/* Top accent */}
        <div style={{ height: 6, background: `linear-gradient(90deg,${ngo.accent},${ngo.accent}55)` }}/>

        <div style={{ padding: "32px 36px 36px" }}>
          <button onClick={onClose}
            style={{ position: "absolute", top: 18, right: 18, width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${ngo.accent}22`,
              border: `1px solid ${ngo.accent}44`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 26 }}>{ngo.emoji}</div>
            <div>
              <div style={{ fontSize: 10, color: ngo.accent, fontFamily: "system-ui,sans-serif",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{ngo.category}</div>
              <div style={{ fontFamily: "'Georgia',serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{ngo.name}</div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
            lineHeight: 1.7, margin: "0 0 24px", paddingBottom: 20,
            borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{ngo.desc}</p>

          {/* Info rows */}
          {[
            { label: "📍 Location",  val: `${ngo.location}, ${ngo.state}` },
            { label: "📧 Email",     val: ngo.contact },
            { label: "🌐 Website",   val: ngo.website },
            { label: "🏷️ Category", val: ngo.category },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif" }}>{row.label}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "system-ui,sans-serif",
                maxWidth: 220, textAlign: "right" }}>{row.val}</span>
            </div>
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <a href={`mailto:${ngo.contact}`}
              style={{ flex: 1, padding: "13px 0", borderRadius: 100, fontSize: 13, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "opacity 0.2s",
                background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none",
                textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}>
              Send Email →
            </a>
            <a href={ngo.website} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: "13px 0", borderRadius: 100, fontSize: 13, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.2s",
                background: "transparent", color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.18)", textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}>
              Visit Site ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function NGOPage() {
  const [search,      setSearch]      = useState("");
  const [selCategory, setSelCategory] = useState("All");
  const [selState,    setSelState]    = useState("All States");
  const [selectedNGO, setSelectedNGO] = useState<typeof NGOS[0] | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = NGOS.filter(n => {
    const q = search.toLowerCase();
    const matchSearch   = !q || n.name.toLowerCase().includes(q) || n.category.toLowerCase().includes(q) || n.location.toLowerCase().includes(q);
    const matchCategory = selCategory === "All" || n.category === selCategory;
    const matchState    = selState === "All States" || n.state === selState;
    return matchSearch && matchCategory && matchState;
  });

  const FilterSection = ({ label, children }: { label: string; children: React.ReactNode }) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 16, marginBottom: 16 }}>
        <button onClick={() => setOpen(o => !o)}
          style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "none", border: "none", cursor: "pointer", marginBottom: open ? 14 : 0 }}>
          <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, fontWeight: 800, color: "#fff" }}>{label}</span>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s", display: "inline-block" }}>⌄</span>
        </button>
        {open && children}
      </div>
    );
  };

  return (
    <div style={{ background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      {/* Fixed pinned bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1,
        background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.55s ease 0.1s forwards;opacity:0}
        input[type=text]{outline:none}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px}
      `}</style>

      {/* STARFIELD */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {STARS.map(s => (
          <div key={s.id} style={{ position: "absolute", top: s.top + "%", left: s.left + "%",
            width: s.size, height: s.size, borderRadius: "50%", background: "#fff",
            ["--op" as any]: s.op, opacity: s.op,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)", pointerEvents: "none" }}/>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ══════════ HERO BANNER ══════════ */}
        <section className="fu" style={{ padding: "52px 0 44px" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 220,
            background: "linear-gradient(135deg,#1e1252 0%,#2d1b69 35%,#0c1a3a 70%,#041a2e 100%)",
            border: "1px solid rgba(139,92,246,0.18)", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 32, padding: "40px 52px", flexWrap: "wrap" }}>

            {/* Grid overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }}/>

            {/* Right decorative circles */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", overflow: "hidden", pointerEvents: "none" }}>
              <svg viewBox="0 0 400 220" width="400" height="220" style={{ position: "absolute", right: -40, top: -10 }}>
                {[
                  { x: 220, y: 40,  r: 55, c1: "#4f46e5", c2: "#818cf8" },
                  { x: 310, y: 80,  r: 48, c1: "#0891b2", c2: "#38bdf8" },
                  { x: 240, y: 130, r: 52, c1: "#7c3aed", c2: "#a78bfa" },
                  { x: 340, y: 155, r: 44, c1: "#0f766e", c2: "#34d399" },
                ].map((d, i) => (
                  <g key={i}>
                    <circle cx={d.x} cy={d.y} r={d.r}       fill={d.c1} opacity="0.3"/>
                    <circle cx={d.x} cy={d.y} r={d.r * 0.55} fill={d.c2} opacity="0.25"/>
                  </g>
                ))}
              </svg>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(10,22,40,1) 0%,transparent 40%)" }}/>
            </div>

            {/* Left text */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em",
                textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 10px" }}>
                EmpowerAble · NGO Directory
              </p>
              <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,54px)", fontWeight: 900,
                color: "#fff", lineHeight: 0.95, letterSpacing: "-0.025em", margin: "0 0 12px" }}>
                Support &<br/>Resource Network.
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                lineHeight: 1.65, maxWidth: 400, margin: 0 }}>
                Connect with vetted NGOs across India — find education, rehabilitation, employment and advocacy support.
              </p>
            </div>

            {/* Stats */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 20, flexWrap: "wrap" }}>
              {STATS.map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(24px,2.5vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 5, letterSpacing: "0.1em",
                    textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36,
          fontSize: 12, fontFamily: "system-ui,sans-serif", color: "rgba(255,255,255,0.28)" }}>
          <span style={{ cursor: "pointer", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}>Home</span>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>NGO Support</span>
        </div>

        {/* ── INFO FEATURE PILLS ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
          {INFO_CARDS.map(f => (
            <div key={f.title} style={{ flex: "1 1 220px", borderRadius: 14, padding: "20px 22px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════ MAIN LAYOUT — SIDEBAR + GRID ══════════ */}
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* ── LEFT FILTER SIDEBAR ── */}
          <div style={{ width: 230, flexShrink: 0, position: "sticky", top: 100 }}>
            <div style={{ borderRadius: 16, padding: "20px", background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "#fff" }}>Filters</span>
                {(selCategory !== "All" || selState !== "All States") && (
                  <button onClick={() => { setSelCategory("All"); setSelState("All States"); setSearch(""); }}
                    style={{ fontSize: 11, fontFamily: "system-ui,sans-serif", background: "none", border: "none",
                      color: "rgba(255,255,255,0.35)", cursor: "pointer", textDecoration: "underline" }}>Clear all</button>
                )}
              </div>

              {/* Search inside sidebar */}
              <FilterSection label="Search">
                <input
                  type="text"
                  placeholder="Name, category, city..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 10, fontSize: 12,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", fontFamily: "system-ui,sans-serif", boxSizing: "border-box" }}
                />
              </FilterSection>

              {/* Category */}
              <FilterSection label="Category">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {CATEGORIES.map(c => (
                    <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <div onClick={() => setSelCategory(c)}
                        style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, cursor: "pointer", transition: "all 0.15s",
                          background: selCategory === c ? "#7c3aed" : "transparent",
                          border: selCategory === c ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                      <span onClick={() => setSelCategory(c)}
                        style={{ fontSize: 12, color: selCategory === c ? "#fff" : "rgba(255,255,255,0.48)",
                          fontFamily: "system-ui,sans-serif", cursor: "pointer", lineHeight: 1.3 }}>{c}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* State */}
              <FilterSection label="State">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {STATES.map(s => (
                    <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
                      onClick={() => setSelState(s)}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, cursor: "pointer", transition: "all 0.15s",
                        background: selState === s ? "#7c3aed" : "transparent",
                        border: selState === s ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                      <span style={{ fontSize: 12, color: selState === s ? "#fff" : "rgba(255,255,255,0.48)",
                        fontFamily: "system-ui,sans-serif" }}>{s}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

            </div>
          </div>

          {/* ── RIGHT NGO GRID ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif" }}>
                {filtered.length} organisation{filtered.length !== 1 ? "s" : ""}
              </span>
              {(selCategory !== "All" || selState !== "All States" || search) && (
                <button onClick={() => { setSelCategory("All"); setSelState("All States"); setSearch(""); }}
                  style={{ padding: "8px 16px", borderRadius: 100, fontSize: 11, fontWeight: 700,
                    fontFamily: "system-ui,sans-serif", cursor: "pointer",
                    background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                  Clear filters ×
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>⬡</div>
                <p style={{ color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif" }}>No NGOs match your filters.</p>
                <button onClick={() => { setSelCategory("All"); setSelState("All States"); setSearch(""); }}
                  style={{ marginTop: 10, background: "none", border: "none", color: "rgba(255,255,255,0.35)",
                    cursor: "pointer", textDecoration: "underline", fontSize: 13, fontFamily: "system-ui,sans-serif" }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
                {filtered.map(ngo => (
                  <NGOCard key={ngo.id} ngo={ngo} onContact={setSelectedNGO} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── FOOTER WATERMARK ── */}
        <section style={{ textAlign: "center", paddingBottom: 80, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 56, marginTop: 60 }}>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(48px,8vw,108px)", fontWeight: 900,
            letterSpacing: "-0.04em", color: "rgba(255,255,255,0.04)", lineHeight: 0.85, userSelect: "none" }}>
            EMPOWERABLE
          </div>
          <p style={{ color: "rgba(255,255,255,0.14)", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "system-ui,sans-serif", marginTop: -14 }}>
            Support · Access · Belonging
          </p>
        </section>
      </div>

      {/* CONTACT MODAL */}
      {selectedNGO && <ContactModal ngo={selectedNGO} onClose={() => setSelectedNGO(null)} />}
    </div>
  );
}