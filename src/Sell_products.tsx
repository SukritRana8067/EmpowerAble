import { useState, useRef } from "react";

/* ──────────────── STARS ──────────────── */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.65 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── DATA ──────────────── */
const SELLER_BENEFITS = [
  { icon: "◈", title: "Zero Commission on First 5 Sales", sub: "Keep 100% of your earnings while you get started." },
  { icon: "⬡", title: "Dedicated Onboarding Support",    sub: "Our team helps you set up your store and first listings." },
  { icon: "◆", title: "Direct Bank Transfers",           sub: "Payments deposited within 3 business days." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create Your Profile",     desc: "Tell your story — share your disability journey, artistic style, and inspiration. Buyers connect with people, not just products.",          accent: "#4f46e5" },
  { step: "02", title: "List Your Works",         desc: "Upload up to 20 artworks or products. Add title, description, price, size, and medium. We help with photography tips.",                 accent: "#0891b2" },
  { step: "03", title: "Get Discovered",          desc: "Your work is featured in curated collections, artist spotlights, and corporate art programs. We actively promote your store.",           accent: "#be123c" },
  { step: "04", title: "Earn & Grow",             desc: "Receive payments, manage orders, and track your earnings in your dashboard. Scale with commissions and bulk corporate orders.",          accent: "#0f766e" },
];

const TESTIMONIALS = [
  { name: "Priya Shankar",  disability: "Visually Impaired", city: "Mumbai",    initials: "PS", accent: "#4f46e5", quote: "I sold my first painting within a week of listing. EmpowerAble handles everything — I just create." },
  { name: "Rajan Mehta",   disability: "Cerebral Palsy",    city: "Delhi",     initials: "RM", accent: "#be123c", quote: "The corporate commissions changed my life. Three offices now have my large-format work on their walls." },
  { name: "Divya Kapoor",  disability: "Deaf",               city: "Bangalore", initials: "DK", accent: "#0891b2", quote: "The onboarding team guided me through everything via email. I launched my digital prints store in 2 days." },
];

const CATEGORIES_SELL = [
  { label: "Paintings & Fine Art",    desc: "Oil, acrylic, watercolour, pastel",  accent: "#be123c" },
  { label: "Digital Art & Prints",    desc: "Illustrations, NFT prints, posters", accent: "#0891b2" },
  { label: "Handcrafted Goods",       desc: "Textiles, pottery, woodwork",         accent: "#7c2d12" },
  { label: "Jewellery & Accessories", desc: "Silver, beadwork, woven pieces",      accent: "#0f766e" },
  { label: "Sculpture & Ceramics",    desc: "Clay, resin, mixed media",            accent: "#6d28d9" },
  { label: "Abstract & Expressionist",desc: "Expressive, conceptual, mixed",       accent: "#4f46e5" },
];

const LISTING_TYPES = [
  { id: "original",   label: "Original Work",    icon: "◈", desc: "One-of-a-kind piece, priced per artwork" },
  { id: "prints",     label: "Prints / Editions", icon: "⬡", desc: "Multiple copies, set print run" },
  { id: "commission", label: "Commission",         icon: "◆", desc: "Custom work on buyer's brief" },
  { id: "craft",      label: "Handcrafted Good",  icon: "◇", desc: "Physical craft or jewellery item" },
];

const MEDIUMS_SELL = ["Oil", "Acrylic", "Watercolour", "Pastel", "Digital", "Ceramic", "Silver", "Textile", "Charcoal", "Resin", "Mural", "Mixed Media"];
const DISABILITY_TYPES = ["Visually Impaired", "Hearing Impaired / Deaf", "Cerebral Palsy", "Autism Spectrum", "Mobility Impairment", "Chronic Illness", "PTSD / Mental Health", "Arthritis", "Other"];
const SIZES_SELL = ["Small (up to A4)", "Medium (A4–A2)", "Large (A2–A0)", "Extra Large (Custom)"];

/* ──────────────── COMPONENTS ──────────────── */

function TestimonialCard({ t }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 16, padding: "24px", cursor: "default", transition: "all 0.22s",
        background: hov ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.03)",
        border: hov ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ fontSize: 24, marginBottom: 14, color: t.accent, lineHeight: 1 }}>"</div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif",
        lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic" }}>{t.quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif", flexShrink: 0 }}>{t.initials}</div>
        <div>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif", marginTop: 2 }}>{t.city} · {t.disability}</div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ s, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 16, padding: "28px 26px", transition: "all 0.22s", cursor: "default",
        background: hov ? `linear-gradient(135deg,${s.accent}14 0%,rgba(255,255,255,0.03) 100%)` : "rgba(255,255,255,0.025)",
        border: hov ? `1px solid ${s.accent}40` : "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ fontFamily: "'Georgia',serif", fontSize: 48, fontWeight: 900, color: `${s.accent}30`,
        lineHeight: 1, marginBottom: 16, letterSpacing: "-0.03em" }}>{s.step}</div>
      <div style={{ fontFamily: "'Georgia',serif", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{s.title}</div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
    </div>
  );
}

/* ──────────────── LIST ARTWORK FORM ──────────────── */
function ListForm() {
  const [step, setStep] = useState(1); // 3-step form
  const TOTAL_STEPS = 3;

  /* Step 1 — About You */
  const [artistName, setArtistName]   = useState("");
  const [city, setCity]               = useState("");
  const [disability, setDisability]   = useState("");
  const [bio, setBio]                 = useState("");

  /* Step 2 — Your Listing */
  const [listingType, setListingType] = useState("original");
  const [title, setTitle]             = useState("");
  const [category, setCategory]       = useState("");
  const [medium, setMedium]           = useState("");
  const [size, setSize]               = useState("");
  const [price, setPrice]             = useState("");
  const [description, setDescription] = useState("");
  const [edition, setEdition]         = useState("");

  /* Step 3 — Done */
  const [submitted, setSubmitted]     = useState(false);

  const inputStyle = (focused) => ({
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 13,
    fontFamily: "system-ui,sans-serif", outline: "none", transition: "all 0.18s",
    background: "rgba(255,255,255,0.05)", color: "#fff",
    border: focused ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.12)",
    boxSizing: "border-box",
  });

  const labelStyle = {
    fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)",
    fontFamily: "system-ui,sans-serif", marginBottom: 7, display: "block",
    letterSpacing: "0.05em", textTransform: "uppercase",
  };

  const [foci, setFoci] = useState({});
  const focus  = k => setFoci(p => ({ ...p, [k]: true  }));
  const unfocus= k => setFoci(p => ({ ...p, [k]: false }));

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0 40px" }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>✦</div>
        <h3 style={{ fontFamily: "'Georgia',serif", fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 14px" }}>
          Your Listing is Live!
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
          lineHeight: 1.75, maxWidth: 400, margin: "0 auto 32px" }}>
          Welcome to EmpowerAble, {artistName || "Artist"}. Our team will review your listing within 24 hours and reach out to you.
        </p>
        <button onClick={() => { setSubmitted(false); setStep(1); setArtistName(""); setCity(""); setDisability(""); setBio(""); setTitle(""); setCategory(""); setMedium(""); setSize(""); setPrice(""); setDescription(""); }}
          style={{ padding: "13px 36px", borderRadius: 100, fontSize: 14, fontWeight: 800,
            fontFamily: "system-ui,sans-serif", cursor: "pointer",
            background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none" }}>
          List Another Work →
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Step progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < TOTAL_STEPS - 1 ? 1 : "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 800, fontFamily: "system-ui,sans-serif", transition: "all 0.25s",
              background: step > i + 1 ? "#7c3aed" : step === i + 1 ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
              border: step === i + 1 ? "2px solid #7c3aed" : step > i + 1 ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.15)",
              color: step >= i + 1 ? "#fff" : "rgba(255,255,255,0.3)" }}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 8px", borderRadius: 2, transition: "background 0.3s",
                background: step > i + 1 ? "#7c3aed" : "rgba(255,255,255,0.08)" }} />
            )}
          </div>
        ))}
        <div style={{ marginLeft: 14, fontSize: 12, color: "rgba(255,255,255,0.3)",
          fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>
          Step {step} of {TOTAL_STEPS}
        </div>
      </div>

      {/* ── STEP 1: About You ── */}
      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>About You</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", margin: "0 0 28px", lineHeight: 1.6 }}>
            Your story is what makes your art meaningful to buyers.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input value={artistName} onChange={e => setArtistName(e.target.value)}
                onFocus={() => focus("name")} onBlur={() => unfocus("name")}
                placeholder="e.g. Priya Shankar"
                style={{ ...inputStyle(foci.name), width: "100%", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={labelStyle}>City *</label>
              <input value={city} onChange={e => setCity(e.target.value)}
                onFocus={() => focus("city")} onBlur={() => unfocus("city")}
                placeholder="e.g. Mumbai"
                style={{ ...inputStyle(foci.city), width: "100%", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Disability / Condition</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {DISABILITY_TYPES.map(d => (
                <button key={d} onClick={() => setDisability(d)}
                  style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.15s",
                    background: disability === d ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)",
                    border: disability === d ? "1px solid rgba(124,58,237,0.7)" : "1px solid rgba(255,255,255,0.1)",
                    color: disability === d ? "#fff" : "rgba(255,255,255,0.4)" }}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Your Story (Bio)</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)}
              onFocus={() => focus("bio")} onBlur={() => unfocus("bio")}
              placeholder="Tell buyers about yourself, your journey as an artist, and what inspires your work..."
              rows={4}
              style={{ ...inputStyle(foci.bio), width: "100%", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }} />
          </div>

          <button onClick={() => setStep(2)} disabled={!artistName || !city}
            style={{ padding: "13px 36px", borderRadius: 100, fontSize: 14, fontWeight: 800,
              fontFamily: "system-ui,sans-serif", cursor: !artistName || !city ? "not-allowed" : "pointer",
              background: !artistName || !city ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.9)",
              color: !artistName || !city ? "rgba(255,255,255,0.35)" : "#060c1a", border: "none", transition: "all 0.2s" }}>
            Continue →
          </button>
        </div>
      )}

      {/* ── STEP 2: Listing Details ── */}
      {step === 2 && (
        <div>
          <h3 style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Your Listing</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", margin: "0 0 28px", lineHeight: 1.6 }}>
            Tell us about the artwork or product you want to sell.
          </p>

          {/* Listing type */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Listing Type *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
              {LISTING_TYPES.map(lt => (
                <div key={lt.id} onClick={() => setListingType(lt.id)}
                  style={{ borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.18s",
                    background: listingType === lt.id ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                    border: listingType === lt.id ? "1px solid rgba(124,58,237,0.6)" : "1px solid rgba(255,255,255,0.09)" }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{lt.icon}</div>
                  <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, fontWeight: 800,
                    color: listingType === lt.id ? "#fff" : "rgba(255,255,255,0.55)", marginBottom: 3 }}>{lt.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif" }}>{lt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Title + Price row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Work Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                onFocus={() => focus("title")} onBlur={() => unfocus("title")}
                placeholder="e.g. Radiant Morning"
                style={{ ...inputStyle(foci.title), width: "100%", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                onFocus={() => focus("price")} onBlur={() => unfocus("price")}
                placeholder="e.g. 4999"
                style={{ ...inputStyle(foci.price), width: "100%", boxSizing: "border-box" }} />
            </div>
          </div>

          {/* Category + Medium */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Category *</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                style={{ ...inputStyle(false), width: "100%", appearance: "none", boxSizing: "border-box",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff66' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                <option value="" style={{ background: "#0d1e3a" }}>Select category</option>
                {CATEGORIES_SELL.map(c => <option key={c.label} value={c.label} style={{ background: "#0d1e3a" }}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Medium *</label>
              <select value={medium} onChange={e => setMedium(e.target.value)}
                style={{ ...inputStyle(false), width: "100%", appearance: "none", boxSizing: "border-box",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff66' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                <option value="" style={{ background: "#0d1e3a" }}>Select medium</option>
                {MEDIUMS_SELL.map(m => <option key={m} value={m} style={{ background: "#0d1e3a" }}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Size + Edition */}
          <div style={{ display: "grid", gridTemplateColumns: listingType === "prints" ? "1fr 1fr" : "1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Size</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SIZES_SELL.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    style={{ padding: "7px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.15s",
                      background: size === s ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)",
                      border: size === s ? "1px solid rgba(124,58,237,0.7)" : "1px solid rgba(255,255,255,0.1)",
                      color: size === s ? "#fff" : "rgba(255,255,255,0.4)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {listingType === "prints" && (
              <div>
                <label style={labelStyle}>Edition Size</label>
                <input value={edition} onChange={e => setEdition(e.target.value)}
                  onFocus={() => focus("edition")} onBlur={() => unfocus("edition")}
                  placeholder="e.g. 50 prints"
                  style={{ ...inputStyle(foci.edition), width: "100%", boxSizing: "border-box" }} />
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              onFocus={() => focus("desc")} onBlur={() => unfocus("desc")}
              placeholder="Describe the work — technique, mood, story behind it, dimensions, material, framing..."
              rows={4}
              style={{ ...inputStyle(foci.desc), width: "100%", resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }} />
          </div>

          {/* Upload zone */}
          <div style={{ marginBottom: 28, borderRadius: 12, border: "2px dashed rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.02)", padding: "28px 20px", textAlign: "center", cursor: "pointer",
            transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.45)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>⬡</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif", marginBottom: 4 }}>
              Upload Artwork Images
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif" }}>
              JPG, PNG or WEBP · Up to 10 MB per file · Min 1000px on longest side
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(1)}
              style={{ padding: "13px 24px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer",
                background: "transparent", color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
              ← Back
            </button>
            <button onClick={() => setStep(3)} disabled={!title || !price || !category || !medium}
              style={{ padding: "13px 36px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", transition: "all 0.2s",
                cursor: !title || !price || !category || !medium ? "not-allowed" : "pointer",
                background: !title || !price || !category || !medium ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.9)",
                color: !title || !price || !category || !medium ? "rgba(255,255,255,0.3)" : "#060c1a", border: "none" }}>
              Preview & Submit →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Review ── */}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>Review & Submit</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", margin: "0 0 28px", lineHeight: 1.6 }}>
            Check everything looks right before your listing goes live.
          </p>

          {/* Preview card */}
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 28,
            border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
            {/* Thumbnail simulation */}
            <div style={{ height: 180, background: "linear-gradient(135deg,#1e1a4a,#312e81,#082f49)", position: "relative" }}>
              <svg viewBox="0 0 600 180" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                <circle cx="120" cy="90" r="70" fill="#4f46e5" opacity="0.3"/>
                <circle cx="300" cy="90" r="55" fill="#0891b2" opacity="0.22"/>
                <circle cx="480" cy="90" r="65" fill="#be123c" opacity="0.25"/>
                <ellipse cx="200" cy="120" rx="80" ry="45" fill="#facc15" opacity="0.12"/>
              </svg>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))" }}/>
              <div style={{ position: "absolute", bottom: 14, left: 16,
                background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6,
                padding: "3px 10px", fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "system-ui,sans-serif" }}>
                {size || "Size TBD"} · {medium}
              </div>
            </div>
            <div style={{ padding: "18px 20px 20px" }}>
              <div style={{ fontSize: 10, color: "#7c3aed", fontFamily: "system-ui,sans-serif", marginBottom: 4, letterSpacing: "0.04em" }}>{disability || "Artist"}</div>
              <div style={{ fontFamily: "'Georgia',serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", marginBottom: 14 }}>by {artistName} · {city}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'Georgia',serif", fontSize: 20, fontWeight: 900, color: "#fff" }}>
                  ₹{price ? Number(price).toLocaleString("en-IN") : "—"}
                </div>
                <span style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)",
                  color: "#a78bfa", fontSize: 11, padding: "4px 12px", borderRadius: 20,
                  fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>{category}</span>
              </div>
            </div>
          </div>

          {/* Review checklist */}
          <div style={{ borderRadius: 12, padding: "18px 20px", marginBottom: 28,
            background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
            {[
              { label: "Artist Name",   val: artistName },
              { label: "Title",         val: title },
              { label: "Category",      val: category },
              { label: "Medium",        val: medium },
              { label: "Price",         val: price ? `₹${Number(price).toLocaleString("en-IN")}` : "" },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", paddingBottom: 10, marginBottom: 10,
                borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif" }}>{r.label}</span>
                <span style={{ fontSize: 13, color: r.val ? "#fff" : "rgba(255,100,100,0.6)",
                  fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>{r.val || "Missing"}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif" }}>Commission</span>
              <span style={{ fontSize: 13, color: "#4ade80", fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>0% on first 5 sales</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(2)}
              style={{ padding: "13px 24px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer",
                background: "transparent", color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
              ← Edit
            </button>
            <button onClick={() => setSubmitted(true)}
              style={{ padding: "13px 36px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer",
                background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Submit Listing ✦
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function SellYourWorkPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      {/* Fixed bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1,
        background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.55s ease 0.1s forwards;opacity:0}
        input,textarea,select{color-scheme:dark}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.2)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px}
      `}</style>

      {/* STARFIELD */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {STARS.map(s => (
          <div key={s.id} style={{ position: "absolute", top: s.top + "%", left: s.left + "%",
            width: s.size, height: s.size, borderRadius: "50%", background: "#fff",
            "--op": s.op, opacity: s.op, animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)", pointerEvents: "none" }}/>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ══════════ HERO BANNER ══════════ */}
        <section className="fu" style={{ padding: "52px 0 44px" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 220,
            background: "linear-gradient(135deg,#1a2e14 0%,#0f2d1a 35%,#0c1a3a 70%,#041a2e 100%)",
            border: "1px solid rgba(74,222,128,0.14)", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 32, padding: "40px 52px", flexWrap: "wrap" }}>

            {/* Grid overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }}/>

            {/* Right decoration — artist silhouette circles */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", overflow: "hidden", pointerEvents: "none" }}>
              <svg viewBox="0 0 400 220" width="400" height="220" style={{ position: "absolute", right: -40, top: -10 }}>
                {[
                  { x: 220, y: 50,  r: 50, c1: "#0f766e", c2: "#4ade80" },
                  { x: 310, y: 90,  r: 44, c1: "#4f46e5", c2: "#facc15" },
                  { x: 245, y: 145, r: 48, c1: "#0891b2", c2: "#a78bfa" },
                  { x: 345, y: 160, r: 42, c1: "#be123c", c2: "#f97316" },
                ].map((d, i) => (
                  <g key={i}>
                    <circle cx={d.x} cy={d.y} r={d.r} fill={d.c1} opacity="0.3"/>
                    <circle cx={d.x} cy={d.y} r={d.r * 0.55} fill={d.c2} opacity="0.22"/>
                  </g>
                ))}
              </svg>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(10,22,40,1) 0%,transparent 40%)" }}/>
            </div>

            {/* Left text */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", letterSpacing: "0.14em",
                textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 10px" }}>
                EmpowerAble · Sell Your Work
              </p>
              <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,54px)", fontWeight: 900,
                color: "#fff", lineHeight: 0.95, letterSpacing: "-0.025em", margin: "0 0 12px" }}>
                Your Art Deserves<br/>to Be Seen.
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                lineHeight: 1.65, maxWidth: 400, margin: "0 0 24px" }}>
                List your artworks, crafts, and prints. Earn directly. We handle payments, promotion, and corporate partnerships.
              </p>
              <button onClick={() => setActiveTab("list")}
                style={{ padding: "13px 32px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                  fontFamily: "system-ui,sans-serif", cursor: "pointer", border: "none",
                  background: "rgba(255,255,255,0.9)", color: "#060c1a", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Start Selling →
              </button>
            </div>

            {/* Stats */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { n: "350+",  l: "Active Sellers" },
                { n: "0%",    l: "Commission (First 5)" },
                { n: "3 Days",l: "Payment Cycle" },
              ].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 900, color: "#4ade80", lineHeight: 1 }}>{s.n}</div>
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
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}>Home</span>
          <span>/</span>
          <span style={{ cursor: "pointer", transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.28)"}>Marketplace</span>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>Sell Your Work</span>
          {activeTab === "list" && <><span>/</span><span style={{ color: "rgba(255,255,255,0.55)" }}>List Artwork</span></>}
        </div>

        {/* ══════════ TABS ══════════ */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", borderRadius: 12, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
            {[
              { id: "overview", label: "Overview", icon: "◈" },
              { id: "list",     label: "List Artwork", icon: "◆" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding: "12px 32px", fontSize: 14, fontWeight: 800,
                  fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.22s",
                  display: "flex", alignItems: "center", gap: 8, border: "none",
                  background: activeTab === tab.id ? "rgba(255,255,255,0.92)" : "transparent",
                  color: activeTab === tab.id ? "#060c1a" : "rgba(255,255,255,0.45)" }}>
                <span style={{ fontSize: 14 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ OVERVIEW TAB ══════════ */}
        {activeTab === "overview" && (
          <div>
            {/* Seller benefits */}
            <div style={{ display: "flex", gap: 12, marginBottom: 52, flexWrap: "wrap" }}>
              {SELLER_BENEFITS.map(f => (
                <div key={f.title} style={{ flex: "1 1 220px", borderRadius: 14, padding: "20px 22px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* HOW IT WORKS */}
            <div style={{ marginBottom: 60 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 900,
                  color: "#fff", letterSpacing: "-0.025em", margin: 0 }}>How It Works</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
                {HOW_IT_WORKS.map((s, i) => <StepCard key={s.step} s={s} idx={i} />)}
              </div>
            </div>

            {/* SELLER ↔ CATEGORIES split */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 60 }}>
              {/* Left: What you can sell */}
              <div style={{ borderRadius: 20, padding: "36px 38px",
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em",
                  textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 10px" }}>◈ Sell Anything You Create</p>
                <h3 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 900,
                  color: "#fff", lineHeight: 1.0, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
                  6 Categories,<br/>Infinite Possibilities.
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {CATEGORIES_SELL.map(c => (
                    <div key={c.label} style={{ display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "10px 14px", borderRadius: 10,
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                      cursor: "pointer", transition: "all 0.18s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.065)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                      <div>
                        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, fontWeight: 800, color: "#fff" }}>{c.label}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif" }}>{c.desc}</div>
                      </div>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.accent}22`,
                        border: `1px solid ${c.accent}44`, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 14, flexShrink: 0 }}>→</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Earnings explainer */}
              <div style={{ borderRadius: 20, overflow: "hidden", minHeight: 300, position: "relative",
                background: "linear-gradient(135deg,#0a2e20 0%,#052e16 50%,#0c1a3a 100%)",
                border: "1px solid rgba(74,222,128,0.12)" }}>
                <svg viewBox="0 0 600 420" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                  {/* Rising bars */}
                  {[
                    { x: 60,  h: 80,  y: 310, c: "#4f46e5" },
                    { x: 130, h: 130, y: 260, c: "#0891b2" },
                    { x: 200, h: 175, y: 215, c: "#0f766e" },
                    { x: 270, h: 220, y: 170, c: "#4ade80" },
                    { x: 340, h: 265, y: 125, c: "#a78bfa" },
                  ].map((b, i) => (
                    <g key={i}>
                      <rect x={b.x} y={b.y} width={50} height={b.h} rx={6} fill={b.c} opacity="0.3"/>
                      <rect x={b.x} y={b.y} width={50} height={12} rx={4} fill={b.c} opacity="0.5"/>
                    </g>
                  ))}
                  <line x1="30" y1="395" x2="430" y2="395" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(5,46,22,0.85) 100%)" }}/>
                <div style={{ position: "absolute", bottom: 36, left: 36, right: 36 }}>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 900,
                    color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>
                    Earnings Grow<br/>With Each Sale.
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif", lineHeight: 1.65, margin: "0 0 20px" }}>
                    After your first 5 commission-free sales, you keep 85% of every transaction. Corporate orders pay a 20% premium.
                  </p>
                  <button onClick={() => setActiveTab("list")}
                    style={{ padding: "11px 26px", borderRadius: 100, fontSize: 13, fontWeight: 800,
                      fontFamily: "system-ui,sans-serif", cursor: "pointer",
                      background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none", transition: "opacity 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    List Your First Work →
                  </button>
                </div>
              </div>
            </div>

            {/* TESTIMONIALS */}
            <div style={{ marginBottom: 60 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 900,
                  color: "#fff", letterSpacing: "-0.025em", margin: 0 }}>Artists Who Sell Here</h2>
                <button style={{ fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif",
                  background: "none", border: "none", color: "rgba(255,255,255,0.38)", cursor: "pointer" }}>Meet all artists →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
                {TESTIMONIALS.map(t => <TestimonialCard key={t.name} t={t} />)}
              </div>
            </div>

            {/* CTA BAND */}
            <div style={{ marginBottom: 60, borderRadius: 20, padding: "44px 52px",
              background: "linear-gradient(135deg,#1e1252 0%,#2d1b69 50%,#0c1a3a 100%)",
              border: "1px solid rgba(139,92,246,0.2)", position: "relative", overflow: "hidden", textAlign: "center" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }}/>
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900,
                  color: "#fff", letterSpacing: "-0.025em", margin: "0 0 12px" }}>
                  Ready to Share Your Art<br/>with the World?
                </h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                  lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>
                  Join 350+ disabled artists already earning on EmpowerAble. Set up takes less than 10 minutes.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => setActiveTab("list")}
                    style={{ padding: "13px 36px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                      fontFamily: "system-ui,sans-serif", cursor: "pointer",
                      background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none", transition: "opacity 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    Start Selling →
                  </button>
                  <button style={{ padding: "13px 28px", borderRadius: 100, fontSize: 14, fontWeight: 800,
                    fontFamily: "system-ui,sans-serif", cursor: "pointer",
                    background: "transparent", color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.18)", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                    Talk to Our Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ LIST ARTWORK TAB ══════════ */}
        {activeTab === "list" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "flex-start" }}>

            {/* Form panel */}
            <div style={{ borderRadius: 20, padding: "36px 38px",
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)" }}>
              <ListForm />
            </div>

            {/* Sidebar tips */}
            <div style={{ position: "sticky", top: 100 }}>
              {/* Tips card */}
              <div style={{ borderRadius: 16, padding: "22px", marginBottom: 14,
                background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)",
                backdropFilter: "blur(12px)" }}>
                <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: "system-ui,sans-serif", marginBottom: 12, fontWeight: 700 }}>◆ Seller Tips</div>
                {[
                  "Use natural light for artwork photos.",
                  "Write a personal story — buyers connect with your journey.",
                  "Price for the market — check similar works in Shop.",
                  "List at least 3–5 works to improve discoverability.",
                  "Respond to commission inquiries within 48 hours.",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                      background: "rgba(74,222,128,0.2)", border: "1px solid rgba(74,222,128,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: "#4ade80", fontWeight: 900 }}>✓</div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif", lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Commission card */}
              <div style={{ borderRadius: 16, padding: "22px",
                background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.18)",
                backdropFilter: "blur(12px)" }}>
                <div style={{ fontSize: 11, color: "#a78bfa", letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: "system-ui,sans-serif", marginBottom: 12, fontWeight: 700 }}>◈ Pricing & Fees</div>
                {[
                  { label: "First 5 sales",         val: "0% fee" },
                  { label: "Ongoing transactions",  val: "15% fee" },
                  { label: "Corporate orders",      val: "+20% premium" },
                  { label: "Payment cycle",         val: "3 business days" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between",
                    paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif" }}>{r.label}</span>
                    <span style={{ fontSize: 12, color: "#fff", fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>{r.val}</span>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif", lineHeight: 1.6, marginTop: 4 }}>
                  Payments via direct bank transfer. No hidden charges.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FOOTER WATERMARK ── */}
        <section style={{ textAlign: "center", paddingBottom: 80, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 56, marginTop: 20 }}>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(48px,8vw,108px)", fontWeight: 900,
            letterSpacing: "-0.04em", color: "rgba(255,255,255,0.04)", lineHeight: 0.85, userSelect: "none" }}>
            EMPOWERABLE
          </div>
          <p style={{ color: "rgba(255,255,255,0.14)", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "system-ui,sans-serif", marginTop: -14 }}>
            Art · Commerce · Belonging
          </p>
        </section>
      </div>
    </div>
  );
}