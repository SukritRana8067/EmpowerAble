import { useState } from "react";

/* ──────────────── STARS ──────────────── */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.65 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── DATA ──────────────── */
const JOB_CATEGORIES = [
  { id: "c1", label: "Technology & IT",        count: 214, accent: "#4f46e5" },
  { id: "c2", label: "Customer Service",        count: 178, accent: "#0891b2" },
  { id: "c3", label: "Finance & Accounting",    count: 132, accent: "#0f766e" },
  { id: "c4", label: "Back-Office Operations",  count: 96,  accent: "#be123c" },
  { id: "c5", label: "Digital Marketing",       count: 74,  accent: "#7c2d12" },
  { id: "c6", label: "Manufacturing & Ops",     count: 58,  accent: "#6d28d9" },
];

const SPOTLIGHTS = [
  { name: "Infosys BPM",       sector: "IT Services",    jobs: 34, city: "Bangalore", accent: "#4f46e5", initials: "IB", tag: "Tech" },
  { name: "HDFC Bank",         sector: "Banking",         jobs: 21, city: "Mumbai",    accent: "#0f766e", initials: "HD", tag: "Finance" },
  { name: "Amazon India",      sector: "E-Commerce",      jobs: 47, city: "Hyderabad", accent: "#0891b2", initials: "AM", tag: "Ops" },
  { name: "Accenture",         sector: "Consulting",      jobs: 29, city: "Pune",      accent: "#be123c", initials: "AC", tag: "BPO" },
];

const ALL_JOBS = [
  { id:1,  title:"Software Tester (Manual)",       company:"Infosys BPM",     location:"Bangalore", type:"Full-time",  salary:"₹4–6 LPA",  category:"Technology & IT",       disability:"All PwDs",      accent:"#4f46e5",  bg:"linear-gradient(135deg,#1e1a4a,#312e81)", tag:"Tech",      exp:"0–2 yrs", mode:"Remote" },
  { id:2,  title:"Data Entry & Annotation",        company:"Amazon India",    location:"Hyderabad", type:"Part-time",  salary:"₹2–3 LPA",  category:"Technology & IT",       disability:"Visually Impaired", accent:"#0891b2", bg:"linear-gradient(135deg,#082f49,#0c4a6e)", tag:"Data",     exp:"0–1 yr",  mode:"Remote" },
  { id:3,  title:"KYC & AML Analyst",              company:"HDFC Bank",       location:"Mumbai",    type:"Full-time",  salary:"₹5–8 LPA",  category:"Finance & Accounting",  disability:"Mobility",      accent:"#0f766e",  bg:"linear-gradient(135deg,#052e16,#14532d)", tag:"Finance",   exp:"1–3 yrs", mode:"Hybrid" },
  { id:4,  title:"Email & Chat Support",           company:"Concentrix",      location:"Delhi",     type:"Full-time",  salary:"₹3–4 LPA",  category:"Customer Service",      disability:"Hearing Impaired", accent:"#be123c", bg:"linear-gradient(135deg,#450a0a,#7f1d1d)", tag:"Support",  exp:"0–2 yrs", mode:"Hybrid" },
  { id:5,  title:"Payroll & HR Data Mgmt",         company:"Accenture",       location:"Pune",      type:"Full-time",  salary:"₹4–7 LPA",  category:"Back-Office Operations", disability:"All PwDs",     accent:"#6d28d9",  bg:"linear-gradient(135deg,#2e1065,#4c1d95)", tag:"HR",        exp:"1–3 yrs", mode:"On-site" },
  { id:6,  title:"Digital Marketing Exec",         company:"Zomato",          location:"Gurugram",  type:"Full-time",  salary:"₹4–6 LPA",  category:"Digital Marketing",     disability:"All PwDs",      accent:"#92400e",  bg:"linear-gradient(135deg,#431407,#78350f)", tag:"Marketing", exp:"1–2 yrs", mode:"Remote" },
  { id:7,  title:"Web & App Tester (WCAG)",        company:"TCS",             location:"Chennai",   type:"Contract",   salary:"₹3–5 LPA",  category:"Technology & IT",       disability:"Visually Impaired", accent:"#4f46e5", bg:"linear-gradient(135deg,#1e1b4b,#3730a3)", tag:"Tech",    exp:"0–2 yrs", mode:"Remote" },
  { id:8,  title:"Transaction Reconciliation",     company:"Wipro BPS",       location:"Kolkata",   type:"Full-time",  salary:"₹3–5 LPA",  category:"Finance & Accounting",  disability:"Mobility",      accent:"#0f766e",  bg:"linear-gradient(135deg,#064e3b,#065f46)", tag:"Finance",   exp:"1–3 yrs", mode:"Hybrid" },
  { id:9,  title:"CRM & Order Processing",         company:"Flipkart",        location:"Bangalore", type:"Full-time",  salary:"₹3–4 LPA",  category:"Customer Service",      disability:"All PwDs",      accent:"#0891b2",  bg:"linear-gradient(135deg,#082f49,#0c4a6e)", tag:"Support",   exp:"0–2 yrs", mode:"Hybrid" },
  { id:10, title:"Invoice Processing (AP/AR)",     company:"Genpact",         location:"Noida",     type:"Full-time",  salary:"₹4–6 LPA",  category:"Finance & Accounting",  disability:"All PwDs",      accent:"#be123c",  bg:"linear-gradient(135deg,#4c0519,#881337)", tag:"Finance",   exp:"1–2 yrs", mode:"On-site" },
  { id:11, title:"Cloud & IT Ops Support",         company:"IBM India",       location:"Hyderabad", type:"Full-time",  salary:"₹6–9 LPA",  category:"Technology & IT",       disability:"Mobility",      accent:"#4f46e5",  bg:"linear-gradient(135deg,#1e1a4a,#312e81)", tag:"Tech",      exp:"2–4 yrs", mode:"Remote" },
  { id:12, title:"Manufacturing Quality Ops",      company:"Bosch India",     location:"Nashik",    type:"Full-time",  salary:"₹3–5 LPA",  category:"Manufacturing & Ops",   disability:"Hearing Impaired", accent:"#7c2d12", bg:"linear-gradient(135deg,#431407,#7c2d12)", tag:"Ops",      exp:"1–3 yrs", mode:"On-site" },
];

const WORK_MODES  = ["Remote", "Hybrid", "On-site"];
const EXP_OPTIONS = ["0–1 yr", "0–2 yrs", "1–2 yrs", "1–3 yrs", "2–4 yrs"];
const CATS        = ["All", "Technology & IT", "Customer Service", "Finance & Accounting", "Back-Office Operations", "Digital Marketing", "Manufacturing & Ops"];
const SORT_OPTIONS = ["Relevance", "Newest First", "Salary: High to Low", "Salary: Low to High"];
const DISABILITY_FILTERS = ["All PwDs", "Visually Impaired", "Hearing Impaired", "Mobility", "Cerebral Palsy", "Autism"];

/* ──────────────── JOB CARD ──────────────── */
function JobCard({ j, saved, onSave }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer",
        border: hov ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)",
        transition: "all 0.22s", transform: hov ? "translateY(-4px)" : "none" }}>

      {/* Color banner */}
      <div style={{ height: 90, position: "relative", overflow: "hidden", background: j.bg }}>
        <svg viewBox="0 0 300 90" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
          <circle cx="260" cy="20" r="60" fill={j.accent} opacity="0.25"/>
          <circle cx="40"  cy="70" r="45" fill="rgba(255,255,255,0.06)"/>
          <rect x="110" y="20" width="80" height="60" rx="6" fill={j.accent} opacity="0.12" transform="rotate(-15 150 50)"/>
        </svg>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.5) 100%)" }}/>

        {/* Mode badge */}
        <div style={{ position:"absolute", top:10, left:12,
          background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.13)", borderRadius:6,
          padding:"3px 10px", fontSize:10, color:"rgba(255,255,255,0.7)",
          fontFamily:"system-ui,sans-serif", fontWeight:700 }}>{j.mode}</div>

        {/* Save btn */}
        <button onClick={e => { e.stopPropagation(); onSave(j.id); }}
          style={{ position:"absolute", top:8, right:10, width:30, height:30, borderRadius:"50%",
            background: saved ? "rgba(99,102,241,0.3)" : "rgba(0,0,0,0.45)",
            border: saved ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.15)",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, transition:"all 0.2s", color: saved ? "#818cf8" : "rgba(255,255,255,0.5)" }}>
          {saved ? "★" : "☆"}
        </button>

        {/* Type badge bottom-right */}
        <div style={{ position:"absolute", bottom:8, right:10,
          background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.1)", borderRadius:6,
          padding:"2px 8px", fontSize:10, color:"rgba(255,255,255,0.55)",
          fontFamily:"system-ui,sans-serif" }}>{j.type}</div>
      </div>

      <div style={{ padding:"14px 16px 16px" }}>
        <div style={{ fontSize:10, color:j.accent, fontFamily:"system-ui,sans-serif", marginBottom:3, letterSpacing:"0.05em", fontWeight:700 }}>{j.disability}</div>
        <div style={{ fontFamily:"'Georgia',serif", fontSize:15, fontWeight:700, color:"#fff", marginBottom:3, lineHeight:1.3 }}>{j.title}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"system-ui,sans-serif", marginBottom:10 }}>
          {j.company} · {j.location}
        </div>

        {/* Tags row */}
        <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
          <span style={{ background:`${j.accent}22`, border:`1px solid ${j.accent}44`, color:j.accent,
            fontSize:10, padding:"2px 8px", borderRadius:20, fontFamily:"system-ui,sans-serif", fontWeight:700 }}>{j.tag}</span>
          <span style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)",
            color:"rgba(255,255,255,0.38)", fontSize:10, padding:"2px 8px", borderRadius:20, fontFamily:"system-ui,sans-serif" }}>{j.exp}</span>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:15, fontWeight:900, color:"#fff" }}>{j.salary}</div>
          <button style={{ padding:"6px 16px", borderRadius:100, fontSize:12, fontWeight:700,
            fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.18s",
            background:"rgba(255,255,255,0.9)", color:"#060c1a", border:"none" }}
            onMouseEnter={e => e.currentTarget.style.opacity="0.82"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>
            Apply →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── EMPLOYER CARD ──────────────── */
function EmployerCard({ e }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius:16, padding:"20px", cursor:"pointer", transition:"all 0.22s",
        background: hov ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.03)",
        border: hov ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
        backdropFilter:"blur(12px)", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:e.accent, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:14,
          fontWeight:800, color:"#fff", fontFamily:"system-ui,sans-serif" }}>{e.initials}</div>
        <div>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:16, fontWeight:700, color:"#fff" }}>{e.name}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"system-ui,sans-serif", marginTop:2 }}>{e.city} · {e.sector}</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <span style={{ background:`${e.accent}22`, border:`1px solid ${e.accent}44`, color:e.accent,
          fontSize:10, padding:"3px 10px", borderRadius:20, fontFamily:"system-ui,sans-serif", fontWeight:700 }}>{e.tag}</span>
        <span style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)",
          color:"rgba(255,255,255,0.4)", fontSize:10, padding:"3px 10px", borderRadius:20,
          fontFamily:"system-ui,sans-serif" }}>{e.jobs} open roles</span>
      </div>
      <button style={{ width:"100%", padding:"9px 0", borderRadius:100, fontSize:12, fontWeight:700,
        fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.18s",
        background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)",
        border:"1px solid rgba(255,255,255,0.1)" }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}>
        View All Jobs →
      </button>
    </div>
  );
}

/* ──────────────── EXPLORE VIEW ──────────────── */
function ExploreView({ onBrowse }) {
  return (
    <div>
      {/* 3 feature pills */}
      <div style={{ display:"flex", gap:12, marginBottom:52, flexWrap:"wrap" }}>
        {[
          { icon:"⬡", title:"2,400+ Open Roles",      sub:"From 180+ inclusive employers across India" },
          { icon:"◆", title:"Disability-First Hiring", sub:"Every listing is PwD-verified & accessible" },
          { icon:"◈", title:"Resume & Career Support",  sub:"Free tools to help you land the right job" },
        ].map(f => (
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

      {/* EMPLOYER SPOTLIGHT SPLIT */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:60 }}>
        <div style={{ borderRadius:20, overflow:"hidden", minHeight:260, position:"relative",
          background:"linear-gradient(135deg,#0c1a3a 0%,#1e1b4b 50%,#082f49 100%)",
          border:"1px solid rgba(255,255,255,0.07)" }}>
          <svg viewBox="0 0 600 260" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
            {[
              { x:90,  y:130, r:55, c:"#4f46e5" },
              { x:220, y:80,  r:48, c:"#0891b2" },
              { x:340, y:150, r:52, c:"#0f766e" },
              { x:470, y:100, r:44, c:"#be123c" },
            ].map((d,i)=>(
              <g key={i}>
                <circle cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity="0.28"/>
                <circle cx={d.x} cy={d.y} r={d.r*0.5} fill="#fff" opacity="0.07"/>
              </g>
            ))}
          </svg>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 60%,rgba(6,12,26,0.5))" }}/>
          <div style={{ position:"absolute", bottom:20, left:20 }}>
            <div style={{ fontFamily:"'Georgia',serif", fontSize:22, fontWeight:900, color:"rgba(255,255,255,0.12)", letterSpacing:"-0.03em" }}>180+</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", fontFamily:"system-ui,sans-serif", letterSpacing:"0.1em", textTransform:"uppercase" }}>Inclusive Employers</div>
          </div>
        </div>

        <div style={{ borderRadius:20, padding:"36px 38px", display:"flex", flexDirection:"column",
          justifyContent:"center", background:"rgba(255,255,255,0.025)",
          border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(12px)" }}>
          <p style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.14em",
            textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>◆ Inclusive Hiring</p>
          <h3 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(22px,3vw,36px)", fontWeight:900,
            color:"#fff", lineHeight:1.05, letterSpacing:"-0.02em", margin:"0 0 14px" }}>
            Jobs Designed<br/>Around You.
          </h3>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", fontFamily:"system-ui,sans-serif",
            lineHeight:1.7, margin:"0 0 24px" }}>
            Every role is accessibility-vetted. Filter by your disability type, preferred work mode, and experience level to find jobs that fit.
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={onBrowse} style={{ padding:"12px 28px", borderRadius:100, fontSize:13, fontWeight:800,
              fontFamily:"system-ui,sans-serif", cursor:"pointer", background:"rgba(255,255,255,0.9)",
              color:"#060c1a", border:"none", transition:"opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              Browse Jobs →
            </button>
            <button style={{ padding:"12px 24px", borderRadius:100, fontSize:13, fontWeight:800,
              fontFamily:"system-ui,sans-serif", cursor:"pointer", background:"transparent",
              color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.18)", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}>
              Upload Resume
            </button>
          </div>
        </div>
      </div>

      {/* BROWSE BY CATEGORY */}
      <div style={{ marginBottom:60 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
            color:"#fff", letterSpacing:"-0.025em", margin:0 }}>Browse by Category</h2>
          <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif",
            background:"none", border:"none", color:"rgba(255,255,255,0.38)", cursor:"pointer" }}>View all →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
          {JOB_CATEGORIES.map(c => (
            <div key={c.id} style={{ borderRadius:14, padding:"18px 20px", cursor:"pointer",
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
              backdropFilter:"blur(10px)", display:"flex", justifyContent:"space-between", alignItems:"center",
              transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.065)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
              <div>
                <div style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff", marginBottom:3 }}>{c.label}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif" }}>{c.count} open roles</div>
              </div>
              <div style={{ width:36, height:36, borderRadius:10, background:`${c.accent}22`,
                border:`1px solid ${c.accent}44`, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:16, flexShrink:0 }}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* JOB TYPES CATEGORIES */}
      <div style={{ marginBottom:60 }}>
        <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
          color:"#fff", letterSpacing:"-0.025em", margin:"0 0 24px" }}>Job Types Available</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
          {[
            { label:"Remote & WFH Roles",   desc:"Work from anywhere — no commute barriers. Full-time, part-time and freelance options.", accent:"#4f46e5" },
            { label:"Govt. & PSU Jobs",      desc:"Reserved-category openings from government departments and public sector enterprises.", accent:"#0891b2" },
            { label:"Internships & Training",desc:"Skill-building entry points with stipends, designed for fresh PwD graduates.",          accent:"#be123c" },
          ].map(c => (
            <div key={c.label} style={{ borderRadius:16, padding:"24px 26px", position:"relative", overflow:"hidden",
              background:`linear-gradient(135deg,${c.accent}18 0%,rgba(255,255,255,0.02) 100%)`,
              border:`1px solid ${c.accent}28`, backdropFilter:"blur(12px)", cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor=`${c.accent}55`}
              onMouseLeave={e => e.currentTarget.style.borderColor=`${c.accent}28`}>
              <div style={{ fontSize:11, color:c.accent, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif", marginBottom:10 }}>◆</div>
              <div style={{ fontFamily:"'Georgia',serif", fontSize:20, fontWeight:800, color:"#fff", marginBottom:10 }}>{c.label}</div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.38)", fontFamily:"system-ui,sans-serif", lineHeight:1.65, margin:"0 0 16px" }}>{c.desc}</p>
              <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif", background:"none", border:"none", color:c.accent, cursor:"pointer", padding:0 }}>Explore →</button>
            </div>
          ))}
        </div>
      </div>

      {/* TOP EMPLOYERS */}
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(26px,3vw,40px)", fontWeight:900,
            color:"#fff", letterSpacing:"-0.025em", margin:0 }}>Top Inclusive Employers</h2>
          <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif",
            background:"none", border:"none", color:"rgba(255,255,255,0.38)", cursor:"pointer" }}>All employers →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
          {SPOTLIGHTS.map(e => <EmployerCard key={e.name} e={e} />)}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── JOB LISTINGS VIEW ──────────────── */
function JobsView() {
  const [selModes,    setSelModes]    = useState([]);
  const [selCat,      setSelCat]      = useState("All");
  const [selDis,      setSelDis]      = useState("All PwDs");
  const [expMax,      setExpMax]      = useState(4);
  const [sortBy,      setSortBy]      = useState("Relevance");
  const [saved,       setSaved]       = useState([]);
  const [showSort,    setShowSort]    = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleArr = (arr, setArr, val) =>
    setArr(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);
  const toggleSave = id =>
    setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  let filtered = ALL_JOBS.filter(j => {
    const okMode = selModes.length === 0 || selModes.includes(j.mode);
    const okCat  = selCat === "All" || j.category === selCat;
    const okDis  = selDis === "All PwDs" || j.disability === selDis || j.disability === "All PwDs";
    const okQ    = !searchQuery || j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
    return okMode && okCat && okDis && okQ;
  });
  const parseSal = s => parseFloat(s.replace(/[^\d.]/g, ' ').trim().split(/\s+/)[0]) || 0;
  if (sortBy === "Salary: High to Low") filtered = [...filtered].sort((a,b) => parseSal(b.salary) - parseSal(a.salary));
  if (sortBy === "Salary: Low to High") filtered = [...filtered].sort((a,b) => parseSal(a.salary) - parseSal(b.salary));
  if (sortBy === "Newest First") filtered = [...filtered].sort((a,b) => b.id - a.id);

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
    <div>
      {/* Search bar */}
      <div style={{ marginBottom:24, position:"relative" }}>
        <div style={{ display:"flex", gap:10, alignItems:"center",
          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:14, padding:"12px 18px", backdropFilter:"blur(12px)" }}>
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search job titles, companies, skills..."
            style={{ flex:1, background:"none", border:"none", outline:"none", color:"#fff",
              fontSize:14, fontFamily:"system-ui,sans-serif" }} />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}
              style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", cursor:"pointer", fontSize:18, lineHeight:1 }}>×</button>
          )}
        </div>
      </div>

      <div style={{ display:"flex", gap:28, alignItems:"flex-start" }}>

        {/* ── FILTER SIDEBAR ── */}
        <div style={{ width:230, flexShrink:0, position:"sticky", top:100 }}>
          <div style={{ borderRadius:16, padding:"20px", background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(12px)" }}>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <span style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff" }}>Filters</span>
              {(selModes.length || selCat !== "All" || selDis !== "All PwDs") > 0 && (
                <button onClick={() => { setSelModes([]); setSelCat("All"); setSelDis("All PwDs"); setExpMax(4); }}
                  style={{ fontSize:11, fontFamily:"system-ui,sans-serif", background:"none", border:"none",
                    color:"rgba(255,255,255,0.35)", cursor:"pointer", textDecoration:"underline" }}>Clear all</button>
              )}
            </div>

            {/* Disability Type */}
            <FilterSection label="Disability Type">
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {DISABILITY_FILTERS.map(d => (
                  <label key={d} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                    <div onClick={() => setSelDis(d)}
                      style={{ width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer", transition:"all 0.15s",
                        background: selDis === d ? "#7c3aed" : "transparent",
                        border: selDis === d ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                    <span style={{ fontSize:13, color: selDis === d ? "#fff" : "rgba(255,255,255,0.48)",
                      fontFamily:"system-ui,sans-serif", cursor:"pointer" }} onClick={() => setSelDis(d)}>{d}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Category */}
            <FilterSection label="Job Category">
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {CATS.map(c => (
                  <label key={c} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                    <div onClick={() => setSelCat(c)}
                      style={{ width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer", transition:"all 0.15s",
                        background: selCat === c ? "#7c3aed" : "transparent",
                        border: selCat === c ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                    <span style={{ fontSize:12, color: selCat === c ? "#fff" : "rgba(255,255,255,0.45)",
                      fontFamily:"system-ui,sans-serif", cursor:"pointer", lineHeight:1.3 }} onClick={() => setSelCat(c)}>{c}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Work Mode */}
            <FilterSection label="Work Mode">
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {WORK_MODES.map(m => (
                  <label key={m} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}
                    onClick={() => toggleArr(selModes, setSelModes, m)}>
                    <div style={{ width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer", transition:"all 0.15s",
                      background: selModes.includes(m) ? "#7c3aed" : "transparent",
                      border: selModes.includes(m) ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)" }} />
                    <span style={{ fontSize:13, color: selModes.includes(m) ? "#fff" : "rgba(255,255,255,0.48)",
                      fontFamily:"system-ui,sans-serif" }}>{m}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Experience */}
            <FilterSection label="Max Experience">
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.38)", fontFamily:"system-ui,sans-serif" }}>0 yrs</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.7)", fontFamily:"system-ui,sans-serif", fontWeight:700 }}>{expMax} yrs</span>
              </div>
              <input type="range" min={1} max={10} step={1} value={expMax}
                onChange={e => setExpMax(Number(e.target.value))}
                style={{ width:"100%", accentColor:"#7c3aed", cursor:"pointer" }} />
            </FilterSection>

          </div>
        </div>

        {/* ── JOB GRID ── */}
        <div style={{ flex:1, minWidth:0 }}>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.3)", fontFamily:"system-ui,sans-serif" }}>
              {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
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
                SORT: {sortBy}
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
              <p style={{ color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif" }}>No jobs match your filters.</p>
              <button onClick={() => { setSelModes([]); setSelCat("All"); setSelDis("All PwDs"); setSearchQuery(""); }}
                style={{ marginTop:10, background:"none", border:"none", color:"rgba(255,255,255,0.35)",
                  cursor:"pointer", textDecoration:"underline", fontSize:13, fontFamily:"system-ui,sans-serif" }}>Clear filters</button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
              {filtered.map(j => (
                <JobCard key={j.id} j={j} onSave={toggleSave} saved={saved.includes(j.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function BrowseJobsPage() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div style={{ background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight:"100vh", overflowX:"hidden", position:"relative" }}>

      <div style={{ position:"fixed", inset:0, zIndex:-1,
        background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.55s ease 0.1s forwards;opacity:0}
        input[type=range]{-webkit-appearance:none;height:4px;border-radius:4px;background:rgba(255,255,255,0.1)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#7c3aed;cursor:pointer}
        input[type=text],input:not([type]){background:none;outline:none}
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
            border:"1px solid rgba(139,92,246,0.18)", display:"flex", alignItems:"center",
            justifyContent:"space-between", gap:32, padding:"40px 52px", flexWrap:"wrap" }}>

            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }}/>

            {/* Right side decoration */}
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"38%", overflow:"hidden", pointerEvents:"none" }}>
              <svg viewBox="0 0 400 220" width="400" height="220" style={{ position:"absolute", right:-40, top:-10 }}>
                {[
                  { x:220, y:40,  r:55, c1:"#4f46e5", c2:"#facc15" },
                  { x:310, y:80,  r:48, c1:"#0891b2", c2:"#4ade80" },
                  { x:240, y:140, r:52, c1:"#0f766e", c2:"#e879f9" },
                  { x:345, y:160, r:44, c1:"#be123c", c2:"#f97316" },
                ].map((d,i) => (
                  <g key={i}>
                    <circle cx={d.x} cy={d.y} r={d.r} fill={d.c1} opacity="0.3"/>
                    <circle cx={d.x} cy={d.y} r={d.r*0.55} fill={d.c2} opacity="0.22"/>
                  </g>
                ))}
              </svg>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(10,22,40,1) 0%,transparent 40%)" }}/>
            </div>

            <div style={{ position:"relative", zIndex:1 }}>
              <p style={{ fontSize:10, color:"rgba(255,255,255,0.38)", letterSpacing:"0.14em",
                textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>
                EmpowerAble · Jobs
              </p>
              <h1 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,4vw,52px)", fontWeight:900,
                color:"#fff", lineHeight:0.95, letterSpacing:"-0.025em", margin:"0 0 12px" }}>
                Jobs for People<br/>with Disabilities.
              </h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", fontFamily:"system-ui,sans-serif",
                lineHeight:1.65, maxWidth:400, margin:0 }}>
                Curated, accessibility-verified roles from inclusive employers — filtered for your disability type, skills, and preferred work mode.
              </p>
            </div>

            <div style={{ position:"relative", zIndex:1, display:"flex", gap:20, flexWrap:"wrap" }}>
              {[
                { n:"2,400+", l:"Open Roles" },
                { n:"180+",   l:"Employers" },
                { n:"100%",   l:"PwD Verified" },
              ].map(s => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(22px,2.5vw,32px)", fontWeight:900, color:"#fff", lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:5, letterSpacing:"0.1em",
                    textTransform:"uppercase", fontFamily:"system-ui,sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BREADCRUMB */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:36,
          fontSize:12, fontFamily:"system-ui,sans-serif", color:"rgba(255,255,255,0.28)" }}>
          <span style={{ cursor:"pointer", transition:"color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color="#fff"}
            onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.28)"}>Home</span>
          <span>/</span>
          <span style={{ color:"rgba(255,255,255,0.55)" }}>Jobs</span>
          {activeTab === "listings" && <><span>/</span><span style={{ color:"rgba(255,255,255,0.55)" }}>All Listings</span></>}
        </div>

        {/* TABS */}
        <div style={{ marginBottom:40 }}>
          <div style={{ display:"inline-flex", borderRadius:12, overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)" }}>
            {[
              { id:"explore",  label:"Explore",     icon:"◈" },
              { id:"listings", label:"Browse Jobs",  icon:"◆" },
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

        {/* TAB CONTENT */}
        {activeTab === "explore" ? <ExploreView onBrowse={() => setActiveTab("listings")} /> : <JobsView />}

        {/* FOOTER */}
        <section style={{ textAlign:"center", paddingBottom:80, borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:56, marginTop:20 }}>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(48px,8vw,108px)", fontWeight:900,
            letterSpacing:"-0.04em", color:"rgba(255,255,255,0.04)", lineHeight:0.85, userSelect:"none" }}>
            EMPOWERABLE
          </div>
          <p style={{ color:"rgba(255,255,255,0.14)", fontSize:11, letterSpacing:"0.18em",
            textTransform:"uppercase", fontFamily:"system-ui,sans-serif", marginTop:-14 }}>
            Work · Dignity · Belonging
          </p>
        </section>
      </div>
    </div>
  );
}