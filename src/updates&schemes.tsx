import { useState } from "react";

/* ──────────────── STARS ──────────────── */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.65 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── NEWS DATA ──────────────── */
const NEWS_CATS = ["All", "Policy & Rights", "Technology", "Sports", "Welfare", "Education", "Health"];

const FEATURED_NEWS = {
  id: 1, cat: "Policy & Rights",
  title: "Cabinet Clears Revised RPWD Rules: 5% Government Jobs Now Reserved for PwDs",
  summary: "The Union Cabinet on Saturday approved sweeping amendments to the Rights of Persons with Disabilities Act, mandating a 5% reservation in central government posts and requiring all public buildings to achieve full accessibility compliance by December 2026.",
  time: "2 hours ago", readTime: "4 min read", breaking: true,
  accent: "#4f46e5",
  tags: ["RPWD Act", "Reservation", "Government Jobs"],
};

const LATEST_NEWS = [
  { id:2,  cat:"Technology",    title:"IIT Madras Launches Free AI-Powered Sign Language Translator App",           summary:"The app converts spoken Hindi and English into ISL in real time, with offline support for 12 regional languages.",           time:"12 min ago",  accent:"#0891b2" },
  { id:3,  cat:"Sports",        title:"Sheetal Devi Wins Gold at Para Archery World Cup — Becomes Youngest Ever",    summary:"The armless archer from Jammu shot a world-record score of 703 to claim India's 14th gold of the season.",                time:"28 min ago",  accent:"#0f766e" },
  { id:4,  cat:"Welfare",       title:"PM Vishwakarma Scheme Expanded to Include Deaf Artisans Across 18 States",   summary:"The government announced ₹15,000 crore in additional funding, with sign-language accessible enrolment portals.",             time:"1 hr ago",    accent:"#be123c" },
  { id:5,  cat:"Education",     title:"UGC Makes Scribes Mandatory for All PwD Students in University Exams",       summary:"The new directive covers central and state universities, with provisions for accessible digital exam formats by 2025.",        time:"2 hrs ago",   accent:"#6d28d9" },
  { id:6,  cat:"Health",        title:"AIIMS Delhi Opens India's First Dedicated Spinal Cord Rehab Ward for PwDs",  summary:"The 80-bed ward includes adaptive sports therapy, occupational rehab, and assistive device training programmes.",             time:"3 hrs ago",   accent:"#7c2d12" },
  { id:7,  cat:"Policy & Rights","title":"Supreme Court Orders Mandatory Captioning on All OTT Platforms by June",    summary:"The landmark ruling covers Netflix, Prime Video, JioCinema and 14 other platforms streaming in India.",                    time:"5 hrs ago",   accent:"#0891b2" },
  { id:8,  cat:"Technology",    title:"Microsoft India Rolls Out Adaptive Controller Support for 200+ Mobile Games",  summary:"The initiative, in partnership with 6 Indian studios, includes haptic feedback and eye-tracking integration.",               time:"6 hrs ago",   accent:"#4f46e5" },
  { id:9,  cat:"Education",     title:"NCERT to Introduce Disability Awareness Module in Class 6–8 Curriculum",       summary:"The module covers disability history, etiquette, and the stories of 10 disabled Indian achievers across fields.",            time:"8 hrs ago",   accent:"#0f766e" },
];

const TRENDING = [
  { rank:1, title:"#RPWD2026 — social media erupts as new rules take effect",          cat:"Policy & Rights" },
  { rank:2, title:"Sheetal Devi's gold sparks calls for PwD sports scholarship fund",  cat:"Sports" },
  { rank:3, title:"AAC app downloads cross 1 million in 48 hours after viral post",   cat:"Technology" },
  { rank:4, title:"Delhi HC to hear accessible transport PIL next Monday",             cat:"Policy & Rights" },
  { rank:5, title:"NIMHANS study: 68% of PwDs report untreated mental health needs",  cat:"Health" },
];

/* ──────────────── SCHEMES DATA ──────────────── */
const SCHEME_CATS = ["All", "Employment", "Education", "Financial Aid", "Healthcare", "Housing", "Travel", "Entrepreneurship"];

const SCHEMES = [
  {
    id:1, name:"UDID — Unique Disability ID Card", ministry:"Ministry of Social Justice & Empowerment",
    cat:"Financial Aid", status:"Active", updated:"Mar 2026",
    summary:"A single, nationally portable digital identity card for persons with disabilities. Provides access to all government schemes, reservations, and concessions without needing separate proofs.",
    benefits:["Single ID replaces 12+ documents","Online application — no office visit","Linked to 34 central schemes","Smart card with QR code"],
    eligibility:"Any Indian citizen with 40%+ disability certified by a government doctor.",
    link:"udid.co.in", accent:"#4f46e5", icon:"◈", flagship:true,
  },
  {
    id:2, name:"NHFDC Loan Scheme", ministry:"National Handicapped Finance & Dev. Corp.",
    cat:"Entrepreneurship", status:"Active", updated:"Jan 2026",
    summary:"Concessional loans up to ₹50 lakh for persons with disabilities to start or expand a business. Interest rates as low as 5% p.a. with flexible repayment up to 10 years.",
    benefits:["Loans ₹10,000 – ₹50 lakh","Interest: 5%–8% p.a.","Repayment up to 10 years","Collateral waived up to ₹1 lakh"],
    eligibility:"PwD with 40%+ disability. Age 18–55. Annual family income ≤ ₹3 lakh (rural) / ₹5 lakh (urban).",
    link:"nhfdc.nic.in", accent:"#0891b2", icon:"◇", flagship:true,
  },
  {
    id:3, name:"Scholarship for Top Class Education", ministry:"Ministry of Social Justice & Empowerment",
    cat:"Education", status:"Active", updated:"Feb 2026",
    summary:"Full scholarship covering tuition, hostel, books, and a monthly stipend for PwD students pursuing education in 240 notified premier institutions including IITs, IIMs, NITs, and AIIMS.",
    benefits:["Full fee reimbursement","₹3,000/month stipend","Laptop & stationery grant","Coaching support"],
    eligibility:"PwD with 40%+ disability. Admitted to a notified institution. Family income ≤ ₹8 lakh/year.",
    link:"scholarships.gov.in", accent:"#0f766e", icon:"⬡", flagship:false,
  },
  {
    id:4, name:"DISHA — Disability Inclusion Scheme for Housing Assistance",
    ministry:"Ministry of Housing & Urban Affairs",
    cat:"Housing", status:"Active", updated:"Apr 2026",
    summary:"Interest subsidy of 3–6% on home loans for PwD borrowers under PMAY, along with mandatory ground-floor unit allotment and barrier-free design compliance for all new housing projects.",
    benefits:["3–6% interest subsidy","Ground-floor priority allotment","Accessible design mandate","Linked with PMAY"],
    eligibility:"PwD with 40%+ disability. First-time homebuyer. PMAY-eligible income slab.",
    link:"pmaymis.gov.in", accent:"#be123c", icon:"◆", flagship:false,
  },
  {
    id:5, name:"ADIP — Assistive Device Scheme", ministry:"Ministry of Social Justice & Empowerment",
    cat:"Healthcare", status:"Active", updated:"Nov 2025",
    summary:"Free provision of high-quality assistive devices — hearing aids, wheelchairs, Braille kits, prosthetics, white canes, and more — through Artificial Limbs Manufacturing Corporation (ALIMCO).",
    benefits:["Free devices up to ₹20,000 value","Devices replaced every 5 years","60+ device types covered","Camp-based distribution across India"],
    eligibility:"PwD with 40%+ disability. Monthly income ≤ ₹20,000 (₹22,500 for children).",
    link:"alimco.in", accent:"#6d28d9", icon:"◉", flagship:false,
  },
  {
    id:6, name:"Indira Gandhi National Disability Pension", ministry:"Ministry of Rural Development",
    cat:"Financial Aid", status:"Active", updated:"Jan 2026",
    summary:"Monthly pension of ₹300 (central share) for severely disabled persons living below the poverty line, credited directly to the beneficiary's bank account via DBT.",
    benefits:["₹300+/month (+ state top-up)","Direct bank transfer","No renewal required","Linked to Aadhaar"],
    eligibility:"Age 18–79. Severe disability (80%+). Below Poverty Line card holder.",
    link:"nsap.nic.in", accent:"#7c2d12", icon:"◈", flagship:false,
  },
  {
    id:7, name:"Rail & Air Concession for PwDs", ministry:"Ministry of Railways / Civil Aviation",
    cat:"Travel", status:"Active", updated:"Dec 2025",
    summary:"Up to 75% concession on rail tickets across all classes for persons with disabilities. Separate airline concessions of 50% on base fare available with Air India on domestic routes.",
    benefits:["25–75% rail fare concession","50% airline fare concession (Air India)","Free companion ticket (severe cases)","Priority boarding"],
    eligibility:"UDID card holder or disability certificate from registered medical authority.",
    link:"indianrailways.gov.in", accent:"#0891b2", icon:"◆", flagship:false,
  },
  {
    id:8, name:"NAPS — National Apprenticeship for PwDs", ministry:"Ministry of Skill Development",
    cat:"Employment", status:"Active", updated:"Mar 2026",
    summary:"Stipend-supported apprenticeship placements in 500+ industries with mandatory accessibility compliance. Government reimburses 25% of stipend to employer to incentivise PwD hiring.",
    benefits:["₹5,000–₹9,000/month stipend","1–3 year placements","Certificate from NCVT","Conversion to full-time encouraged"],
    eligibility:"PwD aged 14–35 with minimum Class 8 education.",
    link:"apprenticeshipindia.gov.in", accent:"#0f766e", icon:"⬡", flagship:false,
  },
];

/* ──────────────── SMALL COMPONENTS ──────────────── */
function CatBadge({ cat, accent }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "system-ui,sans-serif",
      letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px",
      borderRadius: 20, background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}>
      {cat}
    </span>
  );
}

function TimeStamp({ t }) {
  return <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif" }}>{t}</span>;
}

/* ──────────────── NEWS COMPONENTS ──────────────── */
function FeaturedArticle({ article, onRead }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onRead(article)}
      style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer",
        border: hov ? `1px solid ${article.accent}55` : "1px solid rgba(255,255,255,0.08)",
        background: "#080f20", transition: "all 0.25s", transform: hov ? "translateY(-3px)" : "none" }}>

      {/* Hero image placeholder — abstract editorial */}
      <div style={{ height: 280, position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg,${article.accent}44 0%,rgba(6,12,26,0.9) 100%)` }}>
        <svg viewBox="0 0 800 280" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <rect x="0" y="0" width="800" height="280" fill={`${article.accent}08`}/>
          {/* Parliament / government building silhouette */}
          <rect x="300" y="140" width="200" height="140" fill={`${article.accent}18`} rx="4"/>
          <rect x="340" y="100" width="120" height="180" fill={`${article.accent}22`} rx="4"/>
          <rect x="370" y="70" width="60" height="210" fill={`${article.accent}28`} rx="4"/>
          <rect x="390" y="50" width="20" height="40" fill={`${article.accent}55`} rx="2"/>
          <rect x="260" y="180" width="60" height="100" fill={`${article.accent}15`} rx="3"/>
          <rect x="480" y="180" width="60" height="100" fill={`${article.accent}15`} rx="3"/>
          {/* Columns */}
          {[0,1,2,3,4,5,6].map(i => <rect key={i} x={320+i*26} y={120} width={10} height={160} fill={`${article.accent}20`} rx="2"/>)}
          <line x1="0" y1="279" x2="800" y2="279" stroke={`${article.accent}30`} strokeWidth="1"/>
        </svg>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 40%,#080f20 100%)" }}/>
        {article.breaking && (
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 6,
            background: "#dc2626", borderRadius: 6, padding: "4px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "blink 1s ease-in-out infinite" }}/>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em" }}>BREAKING</span>
          </div>
        )}
      </div>

      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <CatBadge cat={article.cat} accent={article.accent} />
          <TimeStamp t={article.time} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif" }}>· {article.readTime}</span>
        </div>
        <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900,
          color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
          {article.title}
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif",
          lineHeight: 1.7, margin: "0 0 16px" }}>{article.summary}</p>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {article.tags.map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 6, fontFamily: "system-ui,sans-serif",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.38)" }}>#{t.replace(/ /g,"")}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsRow({ item, onRead }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onRead(item)}
      style={{ padding: "16px 0", cursor: "pointer", transition: "all 0.18s",
        borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Color dot */}
        <div style={{ width: 3, borderRadius: 3, alignSelf: "stretch", flexShrink: 0,
          background: hov ? item.accent : "rgba(255,255,255,0.1)", transition: "background 0.2s", minHeight: 52 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <CatBadge cat={item.cat} accent={item.accent} />
            <TimeStamp t={item.time} />
          </div>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: 15, fontWeight: 700,
            color: hov ? "#fff" : "rgba(255,255,255,0.85)", lineHeight: 1.35,
            marginBottom: 5, transition: "color 0.18s" }}>
            {item.title}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif",
            lineHeight: 1.6, margin: 0,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {item.summary}
          </p>
        </div>
      </div>
    </div>
  );
}

function TrendingItem({ item, rank }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "all 0.15s" }}>
      <div style={{ fontFamily: "'Georgia',serif", fontSize: 22, fontWeight: 900, lineHeight: 1,
        color: "rgba(255,255,255,0.07)", flexShrink: 0, minWidth: 28 }}>
        {String(rank).padStart(2,"0")}
      </div>
      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif",
          marginBottom: 4, fontWeight: 700 }}>{item.cat}</div>
        <div style={{ fontSize: 13, fontFamily: "system-ui,sans-serif", fontWeight: 700,
          color: hov ? "#fff" : "rgba(255,255,255,0.65)", lineHeight: 1.4, transition: "color 0.15s" }}>
          {item.title}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── ARTICLE MODAL ──────────────── */
function ArticleModal({ article, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-start",
      justifyContent: "center", paddingTop: 60, overflowY: "auto" }}>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(4,8,20,0.92)", backdropFilter: "blur(8px)" }} />
      <div style={{ position: "relative", width: "min(720px,94vw)", borderRadius: 24,
        background: "#080f20", border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8)", zIndex: 1, marginBottom: 60, overflow: "hidden" }}>
        <div style={{ height: 6, background: `linear-gradient(90deg,${article.accent},${article.accent}66)` }} />
        <div style={{ padding: "28px 36px 36px" }}>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 6, background: "none",
            border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: 13,
            fontFamily: "system-ui,sans-serif", marginBottom: 24, padding: 0 }}>
            ← Back to News
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <CatBadge cat={article.cat} accent={article.accent} />
            <TimeStamp t={article.time} />
            {article.readTime && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif" }}>· {article.readTime}</span>}
          </div>
          <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 900,
            color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            {article.title}
          </h1>
          <div style={{ width: "100%", height: 220, borderRadius: 14, overflow: "hidden", marginBottom: 24,
            background: `linear-gradient(135deg,${article.accent}33 0%,rgba(6,12,26,0.9) 100%)` }}>
            <svg viewBox="0 0 700 220" width="100%" height="100%">
              <rect x="250" y="60" width="200" height="160" fill={`${article.accent}18`} rx="4"/>
              <rect x="290" y="30" width="120" height="190" fill={`${article.accent}22`} rx="4"/>
              {[0,1,2,3,4].map(i => <rect key={i} x={280+i*28} y={80} width={12} height={140} fill={`${article.accent}20`} rx="2"/>)}
              <line x1="0" y1="219" x2="700" y2="219" stroke={`${article.accent}30`} strokeWidth="1"/>
            </svg>
          </div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif",
            lineHeight: 1.8, marginBottom: 20 }}>{article.summary}</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif",
            lineHeight: 1.8, marginBottom: 20 }}>
            Sources within the government confirmed that the announcement follows months of advocacy from disability rights groups including the National Platform for the Rights of the Disabled (NPRD) and the Disability Rights Alliance India. Implementation timelines and monitoring mechanisms are expected to be released within 30 days.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif",
            lineHeight: 1.8, margin: 0 }}>
            Disability rights organisations have largely welcomed the move while calling for strict enforcement mechanisms and independent oversight committees. Legal experts note that effective implementation will require coordination across at least 14 central ministries and all state governments.
          </p>
          {article.tags && (
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 24 }}>
              {article.tags.map(t => (
                <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 6, fontFamily: "system-ui,sans-serif",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.38)" }}>#{t.replace(/ /g,"")}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────── SCHEME CARD ──────────────── */
function SchemeCard({ s }) {
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 18, overflow: "hidden", transition: "all 0.25s",
        border: hov ? `1px solid ${s.accent}44` : "1px solid rgba(255,255,255,0.07)",
        background: "#080f20", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ height: 4, background: `linear-gradient(90deg,${s.accent},${s.accent}55)` }} />
      <div style={{ padding: "20px 22px 22px" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: `${s.accent}20`,
            border: `1px solid ${s.accent}35`, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "system-ui,sans-serif",
                padding: "2px 9px", borderRadius: 20, background: "rgba(74,222,128,0.12)",
                border: "1px solid rgba(74,222,128,0.25)", color: "#86efac" }}>
                ● {s.status}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "system-ui,sans-serif",
                padding: "2px 9px", borderRadius: 20, background: `${s.accent}18`,
                border: `1px solid ${s.accent}35`, color: s.accent }}>{s.cat}</span>
              {s.flagship && (
                <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "system-ui,sans-serif",
                  padding: "2px 9px", borderRadius: 20, background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.25)", color: "#fde68a" }}>★ Flagship</span>
              )}
            </div>
            <h3 style={{ fontFamily: "'Georgia',serif", fontSize: 16, fontWeight: 900,
              color: "#fff", margin: 0, lineHeight: 1.25 }}>{s.name}</h3>
          </div>
        </div>

        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif",
          marginBottom: 10 }}>{s.ministry} · Updated {s.updated}</div>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif",
          lineHeight: 1.65, margin: "0 0 14px",
          display: "-webkit-box", WebkitLineClamp: expanded ? "none" : 3,
          WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {s.summary}
        </p>

        {expanded && (
          <div style={{ marginBottom: 14 }}>
            {/* Benefits */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>Key Benefits</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {s.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: s.accent, fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Eligibility */}
            <div style={{ padding: "12px 14px", borderRadius: 10, background: `${s.accent}0e`,
              border: `1px solid ${s.accent}25`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: s.accent, fontFamily: "system-ui,sans-serif",
                letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>Eligibility</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif",
                lineHeight: 1.6, margin: 0 }}>{s.eligibility}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setExpanded(p => !p)}
            style={{ fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", color: s.accent,
              background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            {expanded ? "Show less ↑" : "Learn more ↓"}
          </button>
          <a href={`https://${s.link}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 100,
              fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", textDecoration: "none",
              background: `${s.accent}20`, border: `1px solid ${s.accent}40`, color: s.accent,
              transition: "all 0.18s" }}
            onMouseEnter={e => { e.currentTarget.style.background = `${s.accent}35`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${s.accent}20`; }}>
            Apply Online ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── SCHEME HELPLINE CARD ──────────────── */
function HelplineCard() {
  return (
    <div style={{ borderRadius: 16, padding: "22px 24px", background: "#080f20",
      border: "1px solid rgba(255,255,255,0.08)", marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif",
        letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Official Helplines</div>
      {[
        { name: "Disability Helpline",      number: "1800-11-4515", hours: "Mon–Sat, 9AM–5PM",  accent: "#4f46e5" },
        { name: "NHFDC Loan Queries",       number: "0120-2403612", hours: "Mon–Fri, 10AM–5PM", accent: "#0891b2" },
        { name: "UDID Card Support",        number: "1800-111-222", hours: "24×7",               accent: "#0f766e" },
        { name: "Disability Pension",       number: "1800-180-1551",hours: "Mon–Sat, 9AM–5PM",  accent: "#be123c" },
      ].map(h => (
        <div key={h.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "system-ui,sans-serif", marginBottom: 2 }}>{h.name}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif" }}>{h.hours}</div>
          </div>
          <a href={`tel:${h.number}`}
            style={{ fontSize: 13, fontWeight: 800, color: h.accent, fontFamily: "system-ui,sans-serif",
              textDecoration: "none", padding: "5px 12px", borderRadius: 100,
              background: `${h.accent}15`, border: `1px solid ${h.accent}30` }}>
            {h.number}
          </a>
        </div>
      ))}
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function NewsSchemesPage() {
  const [mainTab,    setMainTab]    = useState("news");    // "news" | "schemes"
  const [newsCat,    setNewsCat]    = useState("All");
  const [schemeCat,  setSchemeCat]  = useState("All");
  const [readArticle,setRead]       = useState(null);

  const filteredNews = LATEST_NEWS.filter(n => newsCat === "All" || n.cat === newsCat);
  const filteredSchemes = SCHEMES.filter(s => schemeCat === "All" || s.cat === schemeCat);

  return (
    <div style={{ background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      <div style={{ position: "fixed", inset: 0, zIndex: -1,
        background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.55s ease 0.05s forwards;opacity:0}
        .tab-in{animation:fadeUp 0.35s ease forwards;opacity:0}
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
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 600, height: 600, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)" }}/>
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: 480, height: 480, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)" }}/>
      </div>

      {readArticle && <ArticleModal article={readArticle} onClose={() => setRead(null)} />}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ══════════ MASTHEAD (newspaper-style) ══════════ */}
        <section className="fu" style={{ padding: "48px 0 0", textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 0 }}>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em",
            textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 10px" }}>
            EmpowerAble · Informed & Empowered
          </p>
          <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(38px,6vw,86px)", fontWeight: 900,
            color: "#fff", letterSpacing: "-0.04em", lineHeight: 0.88, margin: "0 0 8px" }}>
            NEWS &amp; SCHEMES
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif",
            margin: "0 0 28px" }}>
            Stay informed. Know your rights. Access what's yours.
          </p>

          {/* ── MAIN TABS ── */}
          <div style={{ display: "inline-flex", borderRadius: 14, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)",
            marginBottom: -1 }}>
            {[
              { id: "news",    label: "Latest News",       icon: "◉" },
              { id: "schemes", label: "Government Schemes", icon: "◆" },
            ].map(t => (
              <button key={t.id} onClick={() => setMainTab(t.id)}
                style={{ padding: "13px 36px", fontSize: 14, fontWeight: 800, fontFamily: "system-ui,sans-serif",
                  cursor: "pointer", transition: "all 0.22s", display: "flex", alignItems: "center", gap: 8,
                  border: "none", borderBottom: mainTab === t.id ? "2px solid #a78bfa" : "2px solid transparent",
                  background: mainTab === t.id ? "rgba(255,255,255,0.06)" : "transparent",
                  color: mainTab === t.id ? "#fff" : "rgba(255,255,255,0.38)" }}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        </section>

        {/* ══════════ NEWS TAB ══════════ */}
        {mainTab === "news" && (
          <div className="tab-in">
            {/* Sub-category strip */}
            <div style={{ display: "flex", gap: 0, overflowX: "auto", padding: "0",
              borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 36 }}>
              {NEWS_CATS.map(c => (
                <button key={c} onClick={() => setNewsCat(c)}
                  style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                    fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.18s",
                    background: "transparent", border: "none",
                    borderBottom: newsCat === c ? "2px solid #a78bfa" : "2px solid transparent",
                    color: newsCat === c ? "#fff" : "rgba(255,255,255,0.38)" }}>
                  {c}
                </button>
              ))}
            </div>

            {/* ── 3-COLUMN NEWSPAPER LAYOUT ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", gap: 28 }}>

              {/* LEFT: Latest news list */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.35)",
                    fontFamily: "system-ui,sans-serif", letterSpacing: "0.12em", textTransform: "uppercase",
                    whiteSpace: "nowrap" }}>Latest News</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                </div>
                {(newsCat === "All" ? LATEST_NEWS : filteredNews).slice(0, 5).map(item => (
                  <NewsRow key={item.id} item={item} onRead={setRead} />
                ))}
              </div>

              {/* CENTER: Featured article */}
              <div>
                {(newsCat === "All" || FEATURED_NEWS.cat === newsCat) && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                      <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.35)",
                        fontFamily: "system-ui,sans-serif", letterSpacing: "0.12em", textTransform: "uppercase",
                        whiteSpace: "nowrap" }}>Top Story</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                    </div>
                    <FeaturedArticle article={FEATURED_NEWS} onRead={setRead} />
                  </div>
                )}
                {/* More stories below */}
                {(newsCat === "All" ? LATEST_NEWS : filteredNews).slice(5).map(item => (
                  <NewsRow key={item.id} item={item} onRead={setRead} />
                ))}
              </div>

              {/* RIGHT: Trending + quick links */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                  <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.35)",
                    fontFamily: "system-ui,sans-serif", letterSpacing: "0.12em", textTransform: "uppercase",
                    whiteSpace: "nowrap" }}>Trending</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
                </div>
                <div style={{ borderRadius: 16, padding: "16px 18px", background: "#080f20",
                  border: "1px solid rgba(255,255,255,0.07)", marginBottom: 20 }}>
                  {TRENDING.map(t => <TrendingItem key={t.rank} item={t} rank={t.rank} />)}
                </div>

                {/* Quick links panel */}
                <div style={{ borderRadius: 16, padding: "18px 20px", background: "#080f20",
                  border: "1px solid rgba(255,255,255,0.07)", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)",
                    fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase",
                    marginBottom: 14 }}>Quick Links</div>
                  {[
                    { label: "File RTI for Disability Rights", accent: "#4f46e5" },
                    { label: "Check Scheme Eligibility",       accent: "#0891b2" },
                    { label: "Download UDID Application",      accent: "#0f766e" },
                    { label: "Locate Nearest ALIMCO Camp",     accent: "#be123c" },
                    { label: "Find PwD Employment Cell",       accent: "#6d28d9" },
                  ].map(l => (
                    <button key={l.label}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                        width: "100%", padding: "10px 0", background: "none", border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
                        textAlign: "left", transition: "all 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.paddingLeft = "6px"}
                      onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif",
                        fontWeight: 700 }}>{l.label}</span>
                      <span style={{ color: l.accent, fontSize: 14 }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ SCHEMES TAB ══════════ */}
        {mainTab === "schemes" && (
          <div className="tab-in">
            {/* Sub-category strip */}
            <div style={{ display: "flex", gap: 0, overflowX: "auto",
              borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 36 }}>
              {SCHEME_CATS.map(c => (
                <button key={c} onClick={() => setSchemeCat(c)}
                  style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
                    fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.18s",
                    background: "transparent", border: "none",
                    borderBottom: schemeCat === c ? "2px solid #a78bfa" : "2px solid transparent",
                    color: schemeCat === c ? "#fff" : "rgba(255,255,255,0.38)" }}>
                  {c}
                </button>
              ))}
            </div>

            {/* 2-column layout: schemes + sidebar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>

              {/* LEFT: Scheme grid */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 900,
                    color: "#fff", letterSpacing: "-0.025em", margin: 0 }}>
                    {schemeCat === "All" ? "All Schemes" : schemeCat}
                  </h2>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif" }}>
                    {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
                  {filteredSchemes.map(s => <SchemeCard key={s.id} s={s} />)}
                </div>
              </div>

              {/* RIGHT: Sidebar */}
              <div>
                <HelplineCard />

                {/* How to apply guide */}
                <div style={{ borderRadius: 16, padding: "20px 22px", background: "#080f20",
                  border: "1px solid rgba(255,255,255,0.08)", marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                    letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>How to Apply</div>
                  {[
                    { n:"1", tip:"Get a UDID card — it's the master key to almost every scheme." },
                    { n:"2", tip:"Visit the official website linked on each scheme card." },
                    { n:"3", tip:"Carry your UDID, Aadhaar, income certificate, and bank passbook." },
                    { n:"4", tip:"Most schemes accept online applications — no office visit needed." },
                  ].map(s => (
                    <div key={s.n} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: "rgba(139,92,246,0.15)",
                        border: "1px solid rgba(139,92,246,0.25)", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#a78bfa",
                        fontFamily: "system-ui,sans-serif" }}>{s.n}</div>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                        lineHeight: 1.6, margin: 0 }}>{s.tip}</p>
                    </div>
                  ))}
                </div>

                {/* Flagship banner */}
                <div style={{ borderRadius: 16, padding: "20px 22px",
                  background: "linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(8,145,178,0.1) 100%)",
                  border: "1px solid rgba(79,70,229,0.2)" }}>
                  <div style={{ fontSize: 18, marginBottom: 8 }}>◈</div>
                  <div style={{ fontFamily: "'Georgia',serif", fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
                    Start with UDID
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
                    lineHeight: 1.6, margin: "0 0 14px" }}>
                    A single card unlocks 34 central government schemes, rail & air concessions, and reservation benefits.
                  </p>
                  <a href="https://udid.co.in" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px",
                      borderRadius: 100, fontSize: 12, fontWeight: 800, fontFamily: "system-ui,sans-serif",
                      textDecoration: "none", background: "#4f46e5", color: "#fff",
                      transition: "opacity 0.18s" }}>
                    Apply for UDID ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FOOTER WATERMARK ── */}
        <section style={{ textAlign: "center", paddingBottom: 80, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 56, marginTop: 60 }}>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(48px,8vw,110px)", fontWeight: 900,
            letterSpacing: "-0.04em", color: "rgba(255,255,255,0.04)", lineHeight: 0.85, userSelect: "none" }}>
            EMPOWERABLE
          </div>
          <p style={{ color: "rgba(255,255,255,0.14)", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "system-ui,sans-serif", marginTop: -16 }}>
            Informed · Empowered · Included
          </p>
        </section>

      </div>
    </div>
  );
}