import { useState, useRef } from "react";

/* ──────────────── STARS (same as Community / Learn) ──────────────── */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.65 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── DATA ──────────────── */
const COLLECTIONS = [
  { id: "c1", label: "Abstract & Expressionist", count: 142, icon: "⬡", accent: "#4f46e5" },
  { id: "c2", label: "Paintings & Fine Art",     count: 218, icon: "⬡", accent: "#be123c" },
  { id: "c3", label: "Digital Art & Prints",     count: 97,  icon: "⬡", accent: "#0891b2" },
  { id: "c4", label: "Handcrafted Goods",        count: 164, icon: "⬡", accent: "#7c2d12" },
  { id: "c5", label: "Jewellery & Accessories",  count: 83,  icon: "⬡", accent: "#0f766e" },
  { id: "c6", label: "Sculpture & Ceramics",     count: 56,  icon: "⬡", accent: "#6d28d9" },
];

const SPOTLIGHTS = [
  { name: "Priya Shankar",    disability: "Visually Impaired", works: 24, city: "Mumbai",    accent: "#4f46e5", initials: "PS", tag: "Abstract" },
  { name: "Rajan Mehta",     disability: "Cerebral Palsy",    works: 18, city: "Delhi",     accent: "#be123c", initials: "RM", tag: "Paintings" },
  { name: "Divya Kapoor",    disability: "Deaf",               works: 31, city: "Bangalore", accent: "#0891b2", initials: "DK", tag: "Digital" },
  { name: "Arjun Das",       disability: "Autism",             works: 12, city: "Kolkata",   accent: "#0f766e", initials: "AD", tag: "Ceramics" },
];

const EXPLORE_FEATURES = [
  { icon: "⬡", title: "3,000+ Original Works", sub: "From 350+ disabled artists across India" },
  { icon: "◆", title: "Commission Custom Art",  sub: "End-to-end execution with art curation" },
  { icon: "◈", title: "Corporate Art Decor",   sub: "Artworks that reflect your brand values" },
];

const CORPORATE_CATEGORIES = [
  { label: "Office Interiors",     desc: "Large-format original artworks for lobbies, boardrooms and corridors", accent: "#4f46e5" },
  { label: "Custom Commissions",   desc: "Brief your vision — our artists create it. Fully managed process.",    accent: "#0891b2" },
  { label: "Gift Collections",     desc: "Curated sets of prints and handcrafted goods for corporate gifting.",  accent: "#be123c" },
];

const ALL_PRODUCTS = [
  { id:1,  title:"Radiant Morning",       artist:"Priya Shankar",  price:4999,   size:"Medium", medium:"Oil",     color:"#facc15", category:"Paintings",  disability:"Visually Impaired", accent:"#4f46e5", bg:"linear-gradient(135deg,#1e1a4a,#312e81)" },
  { id:2,  title:"The Wanderer",          artist:"Rajan Mehta",    price:14500,  size:"Large",  medium:"Acrylic", color:"#f97316", category:"Paintings",  disability:"Cerebral Palsy",    accent:"#be123c", bg:"linear-gradient(135deg,#450a0a,#7f1d1d)" },
  { id:3,  title:"Bloom",                 artist:"Divya Kapoor",   price:18499,  size:"Small",  medium:"Digital", color:"#38bdf8", category:"Digital",    disability:"Deaf",              accent:"#0891b2", bg:"linear-gradient(135deg,#082f49,#0c4a6e)" },
  { id:4,  title:"City of Colours",       artist:"Arjun Das",      price:8200,   size:"Large",  medium:"Mural",   color:"#4ade80", category:"Abstract",   disability:"Autism",            accent:"#0f766e", bg:"linear-gradient(135deg,#052e16,#14532d)" },
  { id:5,  title:"Inner Silence",         artist:"Meena Rao",      price:3500,   size:"Small",  medium:"Pastel",  color:"#e879f9", category:"Abstract",   disability:"PTSD",              accent:"#6d28d9", bg:"linear-gradient(135deg,#2e1065,#4c1d95)" },
  { id:6,  title:"Desert Dance",          artist:"Karim Shaikh",   price:22000,  size:"Large",  medium:"Oil",     color:"#fbbf24", category:"Paintings",  disability:"Mobility",          accent:"#92400e", bg:"linear-gradient(135deg,#431407,#78350f)" },
  { id:7,  title:"Fractal Mind",          artist:"Divya Kapoor",   price:6800,   size:"Medium", medium:"Digital", color:"#a78bfa", category:"Digital",    disability:"Deaf",              accent:"#4f46e5", bg:"linear-gradient(135deg,#1e1b4b,#3730a3)" },
  { id:8,  title:"Terracotta Vessel",     artist:"Lakshmi Iyer",   price:2800,   size:"Small",  medium:"Ceramic", color:"#fb923c", category:"Sculpture",  disability:"Arthritis",         accent:"#7c2d12", bg:"linear-gradient(135deg,#431407,#7c2d12)" },
  { id:9,  title:"Monsoon Memory",        artist:"Priya Shankar",  price:11200,  size:"Large",  medium:"Acrylic", color:"#34d399", category:"Paintings",  disability:"Visually Impaired", accent:"#0f766e", bg:"linear-gradient(135deg,#064e3b,#065f46)" },
  { id:10, title:"Sacred Geometry",       artist:"Arjun Das",      price:5500,   size:"Medium", medium:"Digital", color:"#f472b6", category:"Digital",    disability:"Autism",            accent:"#be123c", bg:"linear-gradient(135deg,#4c0519,#881337)" },
  { id:11, title:"Silver Lotus Necklace", artist:"Meena Rao",      price:1800,   size:"Small",  medium:"Silver",  color:"#e2e8f0", category:"Jewellery",  disability:"PTSD",              accent:"#6d28d9", bg:"linear-gradient(135deg,#1e1b4b,#312e81)" },
  { id:12, title:"Resilience",            artist:"Rajan Mehta",    price:31000,  size:"Large",  medium:"Oil",     color:"#fca5a5", category:"Abstract",   disability:"Cerebral Palsy",    accent:"#be123c", bg:"linear-gradient(135deg,#450a0a,#be123c)" },
];

const SIZES    = ["Small", "Medium", "Large"];
const MEDIUMS  = ["Oil", "Acrylic", "Digital", "Pastel", "Ceramic", "Silver", "Mural"];
const CATS     = ["All", "Paintings", "Abstract", "Digital", "Sculpture", "Jewellery"];
const COLORS_SW = ["#facc15","#f97316","#38bdf8","#4ade80","#e879f9","#f472b6","#a78bfa","#fca5a5","#000","#fff"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

/* ──────────────── COMPONENTS ──────────────── */

function ProductCard({ p, onWishlist, wishlisted }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer",
        border: hov ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)",
        transition: "all 0.22s", transform: hov ? "translateY(-4px)" : "none" }}>

      {/* Artwork thumbnail */}
      <div style={{ height: 200, position: "relative", overflow: "hidden", background: p.bg }}>
        {/* Abstract art simulation */}
        <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
          <circle cx="80" cy="60" r="55" fill={p.accent} opacity="0.35"/>
          <circle cx="220" cy="140" r="70" fill={p.color} opacity="0.22"/>
          <rect x="100" y="80" width="100" height="70" rx="8" fill={p.color} opacity="0.18" transform="rotate(-15 150 115)"/>
          <circle cx="150" cy="100" r="30" fill="rgba(255,255,255,0.08)"/>
          <ellipse cx="60" cy="160" rx="40" ry="25" fill={p.accent} opacity="0.2"/>
        </svg>
        {/* Overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.55) 100%)" }}/>

        {/* Wishlist btn */}
        <button onClick={e => { e.stopPropagation(); onWishlist(p.id); }}
          style={{ position:"absolute", top:10, right:10, width:32, height:32, borderRadius:"50%",
            background: wishlisted ? "rgba(239,68,68,0.3)" : "rgba(0,0,0,0.45)",
            border: wishlisted ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(255,255,255,0.15)",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, transition:"all 0.2s" }}>
          {wishlisted ? "♥" : "♡"}
        </button>

        {/* Size badge */}
        <div style={{ position:"absolute", bottom:10, left:10,
          background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.12)", borderRadius:6,
          padding:"3px 8px", fontSize:10, color:"rgba(255,255,255,0.65)",
          fontFamily:"system-ui,sans-serif" }}>{p.size} · {p.medium}</div>
      </div>

      <div style={{ padding:"14px 16px 16px" }}>
        {/* Disability tag */}
        <div style={{ fontSize:10, color:p.accent, fontFamily:"system-ui,sans-serif",
          marginBottom:4, letterSpacing:"0.04em" }}>{p.disability}</div>
        <div style={{ fontFamily:"'Georgia',serif", fontSize:15, fontWeight:700,
          color:"#fff", marginBottom:3 }}>{p.title}</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"system-ui,sans-serif",
          marginBottom:12 }}>by {p.artist}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:17, fontWeight:900,
            color:"#fff" }}>₹{p.price.toLocaleString("en-IN")}</div>
          <button style={{ padding:"6px 16px", borderRadius:100, fontSize:12, fontWeight:700,
            fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.18s",
            background:"rgba(255,255,255,0.9)", color:"#060c1a", border:"none" }}
            onMouseEnter={e => e.currentTarget.style.opacity="0.82"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

function SpotlightCard({ a }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius:16, padding:"20px", cursor:"pointer", transition:"all 0.22s",
        background: hov ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.03)",
        border: hov ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
        backdropFilter:"blur(12px)", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:a.accent, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
          fontWeight:800, color:"#fff", fontFamily:"system-ui,sans-serif" }}>{a.initials}</div>
        <div>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:16, fontWeight:700, color:"#fff" }}>{a.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"system-ui,sans-serif", marginTop:2 }}>{a.city} · {a.disability}</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <span style={{ background:`${a.accent}22`, border:`1px solid ${a.accent}44`,
          color:a.accent, fontSize:10, padding:"3px 10px", borderRadius:20,
          fontFamily:"system-ui,sans-serif", fontWeight:700 }}>{a.tag}</span>
        <span style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)",
          color:"rgba(255,255,255,0.4)", fontSize:10, padding:"3px 10px", borderRadius:20,
          fontFamily:"system-ui,sans-serif" }}>{a.works} works</span>
      </div>
      <button style={{ width:"100%", padding:"9px 0", borderRadius:100, fontSize:12, fontWeight:700,
        fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.18s",
        background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)",
        border:"1px solid rgba(255,255,255,0.1)" }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}>
        View Collection →
      </button>
    </div>
  );
}

/* ──────────────── EXPLORE VIEW ──────────────── */
function ExploreView() {
  return (
    <div>
      {/* 3 feature pills */}
      <div style={{ display:"flex", gap:12, marginBottom:52, flexWrap:"wrap" }}>
        {EXPLORE_FEATURES.map(f => (
          <div key={f.title} style={{ flex:"1 1 220px", borderRadius:14, padding:"20px 22px",
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
            backdropFilter:"blur(12px)", display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:44, height:44, borderRadius:12, flexShrink:0,
              background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.25)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{f.icon}</div>
            <div>
              <div style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff", marginBottom:4 }}>{f.title}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", fontFamily:"system-ui,sans-serif", lineHeight:1.5 }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CORPORATE ART SPLIT (Image 2 style) */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:60 }}>
        {/* Left image panel */}
        <div style={{ borderRadius:20, overflow:"hidden", minHeight:260, position:"relative",
          background:"linear-gradient(135deg,#0c1a3a 0%,#1e1b4b 50%,#082f49 100%)",
          border:"1px solid rgba(255,255,255,0.07)" }}>
          <svg viewBox="0 0 600 260" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
            {/* 3 fake artwork panels side by side */}
            <rect x="20" y="30" width="170" height="200" rx="8" fill="#4f46e5" opacity="0.3"/>
            <circle cx="105" cy="130" r="60" fill="#facc15" opacity="0.2"/>
            <rect x="215" y="30" width="170" height="200" rx="8" fill="#0891b2" opacity="0.3"/>
            <ellipse cx="300" cy="130" rx="55" ry="70" fill="#4ade80" opacity="0.2"/>
            <rect x="410" y="30" width="170" height="200" rx="8" fill="#be123c" opacity="0.3"/>
            <circle cx="495" cy="130" r="50" fill="#f97316" opacity="0.2"/>
            {/* Grid lines */}
            <line x1="210" y1="0" x2="210" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <line x1="405" y1="0" x2="405" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </svg>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 60%,rgba(6,12,26,0.5))" }}/>
        </div>

        {/* Right content panel */}
        <div style={{ borderRadius:20, padding:"36px 38px", display:"flex", flexDirection:"column",
          justifyContent:"center", background:"rgba(255,255,255,0.025)",
          border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(12px)" }}>
          <p style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.14em",
            textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>◆ Corporate Art</p>
          <h3 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(24px,3vw,38px)", fontWeight:900,
            color:"#fff", lineHeight:1.0, letterSpacing:"-0.02em", margin:"0 0 14px" }}>
            Crafting Your Vision,<br/>Creating Unique Artwork.
          </h3>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", fontFamily:"system-ui,sans-serif",
            lineHeight:1.7, margin:"0 0 24px" }}>
            Commission large-format, brand-aligned artworks from our community of disabled artists. Every piece tells a story of resilience and creativity.
          </p>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{ padding:"12px 28px", borderRadius:100, fontSize:13, fontWeight:800,
              fontFamily:"system-ui,sans-serif", cursor:"pointer", background:"rgba(255,255,255,0.9)",
              color:"#060c1a", border:"none", transition:"opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              Explore →
            </button>
            <button style={{ padding:"12px 24px", borderRadius:100, fontSize:13, fontWeight:800,
              fontFamily:"system-ui,sans-serif", cursor:"pointer", background:"transparent",
              color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.18)", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}>
              Commission Art
            </button>
          </div>
        </div>
      </div>

      {/* BROWSE BY COLLECTION */}
      <div style={{ marginBottom:60 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
            color:"#fff", letterSpacing:"-0.025em", margin:0 }}>Browse Collections</h2>
          <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif",
            background:"none", border:"none", color:"rgba(255,255,255,0.38)", cursor:"pointer" }}>View all →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
          {COLLECTIONS.map(c => (
            <div key={c.id} style={{ borderRadius:14, padding:"18px 20px", cursor:"pointer",
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
              backdropFilter:"blur(10px)", display:"flex", justifyContent:"space-between", alignItems:"center",
              transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.065)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
              <div>
                <div style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800,
                  color:"#fff", marginBottom:3 }}>{c.label}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif" }}>{c.count} works</div>
              </div>
              <div style={{ width:36, height:36, borderRadius:10, background:`${c.accent}22`,
                border:`1px solid ${c.accent}44`, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:16, flexShrink:0 }}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* CORPORATE CATEGORIES */}
      <div style={{ marginBottom:60 }}>
        <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
          color:"#fff", letterSpacing:"-0.025em", margin:"0 0 24px" }}>For Corporates</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
          {CORPORATE_CATEGORIES.map(c => (
            <div key={c.label} style={{ borderRadius:16, padding:"24px 26px", position:"relative", overflow:"hidden",
              background:`linear-gradient(135deg,${c.accent}18 0%,rgba(255,255,255,0.02) 100%)`,
              border:`1px solid ${c.accent}28`, backdropFilter:"blur(12px)", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor=`${c.accent}55`}
              onMouseLeave={e => e.currentTarget.style.borderColor=`${c.accent}28`}>
              <div style={{ fontSize:11, color:c.accent, letterSpacing:"0.1em", textTransform:"uppercase",
                fontFamily:"system-ui,sans-serif", marginBottom:10 }}>◆</div>
              <div style={{ fontFamily:"'Georgia',serif", fontSize:20, fontWeight:800,
                color:"#fff", marginBottom:10 }}>{c.label}</div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", fontFamily:"system-ui,sans-serif",
                lineHeight:1.65, margin:"0 0 16px" }}>{c.desc}</p>
              <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif",
                background:"none", border:"none", color:c.accent, cursor:"pointer", padding:0 }}>
                Explore →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ARTIST SPOTLIGHTS */}
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
            color:"#fff", letterSpacing:"-0.025em", margin:0 }}>Artist Spotlights</h2>
          <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif",
            background:"none", border:"none", color:"rgba(255,255,255,0.38)", cursor:"pointer" }}>Meet all artists →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
          {SPOTLIGHTS.map(a => <SpotlightCard key={a.name} a={a} />)}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── SHOP NOW VIEW ──────────────── */
function ShopView() {
  const [selSizes,   setSelSizes]   = useState([]);
  const [selMediums, setSelMediums] = useState([]);
  const [selCat,     setSelCat]     = useState("All");
  const [selColor,   setSelColor]   = useState(null);
  const [priceMax,   setPriceMax]   = useState(35000);
  const [sortBy,     setSortBy]     = useState("Featured");
  const [wishlist,   setWishlist]   = useState([]);
  const [showSort,   setShowSort]   = useState(false);

  const toggleArr = (arr, setArr, val) =>
    setArr(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);
  const toggleWish = id =>
    setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  let filtered = ALL_PRODUCTS.filter(p => {
    const okSize   = selSizes.length   === 0 || selSizes.includes(p.size);
    const okMedium = selMediums.length === 0 || selMediums.includes(p.medium);
    const okCat    = selCat === "All" || p.category === selCat;
    const okPrice  = p.price <= priceMax;
    return okSize && okMedium && okCat && okPrice;
  });
  if (sortBy === "Price: Low to High")  filtered = [...filtered].sort((a,b) => a.price - b.price);
  if (sortBy === "Price: High to Low")  filtered = [...filtered].sort((a,b) => b.price - a.price);

  const FilterSection = ({ label, children }) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", paddingBottom:16, marginBottom:16 }}>
        <button onClick={() => setOpen(o => !o)}
          style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
            background:"none", border:"none", cursor:"pointer", marginBottom: open ? 14 : 0 }}>
          <span style={{ fontFamily:"system-ui,sans-serif", fontSize:13, fontWeight:800, color:"#fff" }}>{label}</span>
          <span style={{ fontSize:16, color:"rgba(255,255,255,0.3)", transform: open ? "rotate(180deg)" : "none",
            transition:"transform 0.2s", display:"inline-block" }}>⌄</span>
        </button>
        {open && children}
      </div>
    );
  };

  return (
    <div style={{ display:"flex", gap:28, alignItems:"flex-start" }}>

      {/* ── LEFT FILTER SIDEBAR ── */}
      <div style={{ width:230, flexShrink:0, position:"sticky", top:100 }}>
        <div style={{ borderRadius:16, padding:"20px", background:"rgba(255,255,255,0.03)",
          border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(12px)" }}>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <span style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff" }}>Filters</span>
            {(selSizes.length || selMediums.length || selCat !== "All") > 0 && (
              <button onClick={() => { setSelSizes([]); setSelMediums([]); setSelCat("All"); setSelColor(null); setPriceMax(35000); }}
                style={{ fontSize:11, fontFamily:"system-ui,sans-serif", background:"none", border:"none",
                  color:"rgba(255,255,255,0.35)", cursor:"pointer", textDecoration:"underline" }}>Clear all</button>
            )}
          </div>

          {/* Price Range */}
          <FilterSection label="Price Range">
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.38)", fontFamily:"system-ui,sans-serif" }}>₹100</span>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.7)", fontFamily:"system-ui,sans-serif", fontWeight:700 }}>₹{priceMax.toLocaleString("en-IN")}</span>
            </div>
            <input type="range" min={500} max={35000} step={500} value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              style={{ width:"100%", accentColor:"#7c3aed", cursor:"pointer" }} />
          </FilterSection>

          {/* Category */}
          <FilterSection label="Category">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {CATS.map(c => (
                <label key={c} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                  <div onClick={() => setSelCat(c)}
                    style={{ width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer", transition:"all 0.15s",
                      background: selCat === c ? "#7c3aed" : "transparent",
                      border: selCat === c ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                  <span style={{ fontSize:13, color: selCat === c ? "#fff" : "rgba(255,255,255,0.48)",
                    fontFamily:"system-ui,sans-serif", cursor:"pointer" }} onClick={() => setSelCat(c)}>{c}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection label="Size">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {SIZES.map(s => (
                <label key={s} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}
                  onClick={() => toggleArr(selSizes, setSelSizes, s)}>
                  <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer", transition:"all 0.15s",
                    background: selSizes.includes(s) ? "#7c3aed" : "transparent",
                    border: selSizes.includes(s) ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                  <span style={{ fontSize:13, color: selSizes.includes(s) ? "#fff" : "rgba(255,255,255,0.48)",
                    fontFamily:"system-ui,sans-serif" }}>{s}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Color swatches */}
          <FilterSection label="Color">
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {COLORS_SW.map(col => (
                <button key={col} onClick={() => setSelColor(c => c === col ? null : col)}
                  style={{ width:28, height:28, borderRadius:"50%", background:col,
                    border: selColor === col ? "3px solid #fff" : col === "#fff" ? "1px solid rgba(255,255,255,0.3)" : "2px solid transparent",
                    cursor:"pointer", transition:"transform 0.15s", transform: selColor === col ? "scale(1.2)" : "none",
                    outline: selColor === col ? "2px solid #7c3aed" : "none", outlineOffset:2 }} />
              ))}
            </div>
          </FilterSection>

          {/* Medium */}
          <FilterSection label="Medium">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {MEDIUMS.map(m => (
                <label key={m} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}
                  onClick={() => toggleArr(selMediums, setSelMediums, m)}>
                  <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer", transition:"all 0.15s",
                    background: selMediums.includes(m) ? "#7c3aed" : "transparent",
                    border: selMediums.includes(m) ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                  <span style={{ fontSize:13, color: selMediums.includes(m) ? "#fff" : "rgba(255,255,255,0.48)",
                    fontFamily:"system-ui,sans-serif" }}>{m}</span>
                </label>
              ))}
            </div>
          </FilterSection>

        </div>
      </div>

      {/* ── RIGHT PRODUCT GRID ── */}
      <div style={{ flex:1, minWidth:0 }}>

        {/* Top bar — result count + sort */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.3)", fontFamily:"system-ui,sans-serif" }}>
            {filtered.length} artwork{filtered.length !== 1 ? "s" : ""}
          </span>
          <div style={{ position:"relative" }}>
            <button onClick={() => setShowSort(o => !o)}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:100,
                fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif", cursor:"pointer",
                background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.6)",
                border:"1px solid rgba(255,255,255,0.1)", transition:"all 0.18s" }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              SORT BY: {sortBy}
            </button>
            {showSort && (
              <div style={{ position:"absolute", right:0, top:"calc(100% + 6px)", zIndex:10,
                borderRadius:12, overflow:"hidden", background:"#0d1e3a",
                border:"1px solid rgba(255,255,255,0.12)", minWidth:200, boxShadow:"0 16px 40px rgba(0,0,0,0.6)" }}>
                {SORT_OPTIONS.map(o => (
                  <button key={o} onClick={() => { setSortBy(o); setShowSort(false); }}
                    style={{ width:"100%", padding:"11px 16px", textAlign:"left", background: sortBy === o ? "rgba(124,58,237,0.2)" : "transparent",
                      border:"none", color: sortBy === o ? "#fff" : "rgba(255,255,255,0.5)",
                      fontSize:13, fontFamily:"system-ui,sans-serif", fontWeight: sortBy === o ? 700 : 400,
                      cursor:"pointer", borderBottom:"1px solid rgba(255,255,255,0.05)", transition:"background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.background= sortBy === o ? "rgba(124,58,237,0.2)" : "transparent"}>
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>⬡</div>
            <p style={{ color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif" }}>No artworks match your filters.</p>
            <button onClick={() => { setSelSizes([]); setSelMediums([]); setSelCat("All"); setPriceMax(35000); }}
              style={{ marginTop:10, background:"none", border:"none", color:"rgba(255,255,255,0.35)",
                cursor:"pointer", textDecoration:"underline", fontSize:13, fontFamily:"system-ui,sans-serif" }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} p={p} onWishlist={toggleWish} wishlisted={wishlist.includes(p.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div style={{ background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight:"100vh", overflowX:"hidden", position:"relative" }}>

      {/* Fixed pinned bg */}
      <div style={{ position:"fixed", inset:0, zIndex:-1,
        background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.55s ease 0.1s forwards;opacity:0}
        input[type=range]{-webkit-appearance:none;height:4px;border-radius:4px;background:rgba(255,255,255,0.1)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#7c3aed;cursor:pointer}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px}
      `}</style>

      {/* STARFIELD */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {STARS.map(s => (
          <div key={s.id} style={{ position:"absolute", top:s.top+"%", left:s.left+"%",
            width:s.size, height:s.size, borderRadius:"50%", background:"#fff",
            "--op":s.op, opacity:s.op, animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
        <div style={{ position:"absolute", top:"5%", left:"10%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"5%", right:"8%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>

        {/* ══════════ HERO BANNER ══════════ */}
        <section className="fu" style={{ padding:"52px 0 44px" }}>
          <div style={{ borderRadius:24, overflow:"hidden", position:"relative", minHeight:220,
            background:"linear-gradient(135deg,#1e1252 0%,#2d1b69 35%,#0c1a3a 70%,#041a2e 100%)",
            border:"1px solid rgba(139,92,246,0.18)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:32, padding:"40px 52px", flexWrap:"wrap" }}>

            {/* Grid overlay */}
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }}/>

            {/* Diamond artworks — right side decoration (Image 1 style) */}
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"38%", overflow:"hidden", pointerEvents:"none" }}>
              <svg viewBox="0 0 400 220" width="400" height="220" style={{ position:"absolute", right:-40, top:-10 }}>
                {[
                  { x:220, y:40,  r:55, c1:"#4f46e5", c2:"#facc15" },
                  { x:310, y:80,  r:48, c1:"#be123c", c2:"#f97316" },
                  { x:240, y:130, r:52, c1:"#0891b2", c2:"#4ade80" },
                  { x:340, y:155, r:44, c1:"#7c2d12", c2:"#e879f9" },
                ].map((d,i) => (
                  <g key={i}>
                    <circle cx={d.x} cy={d.y} r={d.r} fill={d.c1} opacity="0.3"/>
                    <circle cx={d.x} cy={d.y} r={d.r*0.55} fill={d.c2} opacity="0.25"/>
                  </g>
                ))}
                <line x1="220" y1="0" x2="220" y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="310" y1="0" x2="310" y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              </svg>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(10,22,40,1) 0%,transparent 40%)" }}/>
            </div>

            {/* Left text */}
            <div style={{ position:"relative", zIndex:1 }}>
              <p style={{ fontSize:10, color:"rgba(255,255,255,0.38)", letterSpacing:"0.14em",
                textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>
                EmpowerAble · Marketplace
              </p>
              <h1 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,4vw,54px)", fontWeight:900,
                color:"#fff", lineHeight:0.95, letterSpacing:"-0.025em", margin:"0 0 12px" }}>
                Art & Goods by<br/>Disabled Creators.
              </h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", fontFamily:"system-ui,sans-serif",
                lineHeight:1.65, maxWidth:400, margin:0 }}>
                Buy/commission original artworks, handcrafts & prints — every purchase directly supports a disabled artist.
              </p>
            </div>

            {/* Feature bullets (Image 1 middle section) */}
            <div style={{ position:"relative", zIndex:1, display:"flex", gap:20, flexWrap:"wrap" }}>
              {[
                { n:"3,000+",  l:"Original Works" },
                { n:"350+",    l:"Disabled Artists" },
                { n:"100%",    l:"Direct to Creator" },
              ].map(s => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(24px,2.5vw,34px)", fontWeight:900, color:"#fff", lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:5, letterSpacing:"0.1em",
                    textTransform:"uppercase", fontFamily:"system-ui,sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB ── */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:36,
          fontSize:12, fontFamily:"system-ui,sans-serif", color:"rgba(255,255,255,0.28)" }}>
          <span style={{ cursor:"pointer", transition:"color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color="#fff"}
            onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.28)"}>Home</span>
          <span>/</span>
          <span style={{ color:"rgba(255,255,255,0.55)" }}>Marketplace</span>
          {activeTab === "shop" && <><span>/</span><span style={{ color:"rgba(255,255,255,0.55)" }}>Shop Now</span></>}
        </div>

        {/* ══════════ EXPLORE / SHOP NOW TABS ══════════ */}
        <div style={{ marginBottom:40 }}>
          <div style={{ display:"inline-flex", borderRadius:12, overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)" }}>
            {[
              { id:"explore", label:"Explore", icon:"◈" },
              { id:"shop",    label:"Shop Now", icon:"◆" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding:"12px 32px", fontSize:14, fontWeight:800,
                  fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.22s",
                  display:"flex", alignItems:"center", gap:8, border:"none",
                  background: activeTab === tab.id ? "rgba(255,255,255,0.92)" : "transparent",
                  color: activeTab === tab.id ? "#060c1a" : "rgba(255,255,255,0.45)" }}>
                <span style={{ fontSize:14 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ TAB CONTENT ══════════ */}
        {activeTab === "explore" ? <ExploreView /> : <ShopView />}

        {/* ── FOOTER WATERMARK ── */}
        <section style={{ textAlign:"center", paddingBottom:80, borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:56, marginTop:20 }}>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(48px,8vw,108px)", fontWeight:900,
            letterSpacing:"-0.04em", color:"rgba(255,255,255,0.04)", lineHeight:0.85, userSelect:"none" }}>
            EMPOWERABLE
          </div>
          <p style={{ color:"rgba(255,255,255,0.14)", fontSize:11, letterSpacing:"0.18em",
            textTransform:"uppercase", fontFamily:"system-ui,sans-serif", marginTop:-14 }}>
            Art · Commerce · Belonging
          </p>
        </section>
      </div>
    </div>
  );
}