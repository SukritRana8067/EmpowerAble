import { useState, useRef } from "react";

const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random()*100, left: Math.random()*100,
  size: Math.random()*2.2+0.5, op: Math.random()*0.65+0.1, dur: Math.random()*4+2,
  delay: Math.random()*4,
}));

/* ─── DATA ─── */
const PROVIDERS = [
  { name: "BlindTech Institute", abbr: "BT" },
  { name: "DeafConnect Academy", abbr: "DC" },
  { name: "Empower Legal",       abbr: "EL" },
  { name: "ADHD Focus Zone",     abbr: "AF" },
  { name: "Mobility & Fitness",  abbr: "MF" },
  { name: "SpeechPath Connect",  abbr: "SP" },
  { name: "Invisible Illness",   abbr: "II" },
  { name: "Autism Alliance",     abbr: "AA" },
];

const POPULAR_COLS = [
  {
    id: "popular", label: "Most popular",
    courses: [
      { id:1,  title:"Screen Reader Mastery: NVDA & VoiceOver",  provider:"BlindTech Institute",  type:"Certificate",    rating:4.8, color:"#4f46e5" },
      { id:2,  title:"ASL: Zero to Conversational",              provider:"DeafConnect Academy",  type:"Specialization", rating:4.9, color:"#0891b2" },
      { id:3,  title:"Disability Rights & the ADA",              provider:"Empower Legal",        type:"Certificate",    rating:4.7, color:"#be123c" },
    ],
  },
  {
    id: "new", label: "Hot new releases",
    courses: [
      { id:4,  title:"ADHD at Work: Productivity Systems",       provider:"ADHD Focus Zone",      type:"Course",         rating:4.7, color:"#92400e" },
      { id:5,  title:"Adaptive Art Therapy",                     provider:"Mobility & Fitness",   type:"Course",         rating:4.9, color:"#7c2d12" },
      { id:6,  title:"AAC Device Training for Non-Speakers",     provider:"SpeechPath Connect",   type:"Specialization", rating:4.9, color:"#0f766e" },
    ],
  },
  {
    id: "trending", label: "Trending now",
    courses: [
      { id:7,  title:"Digital Accessibility & WCAG 2.2",         provider:"BlindTech Institute",  type:"Certificate",    rating:4.9, color:"#4c1d95" },
      { id:8,  title:"CBT & Mindfulness for Disability Anxiety", provider:"Autism Alliance",      type:"Course",         rating:4.8, color:"#164e63" },
      { id:9,  title:"SSI, SSDI & ABLE Accounts Explained",      provider:"Empower Legal",        type:"Course",         rating:4.6, color:"#1e3a5f" },
    ],
  },
];

const CATEGORIES = [
  { icon:"⌨", label:"Assistive Tech" },   { icon:"◉", label:"Communication" },
  { icon:"⚖", label:"Disability Rights" }, { icon:"✦", label:"Mental Wellness" },
  { icon:"◆", label:"Career Growth" },     { icon:"◇", label:"Finance & Benefits" },
  { icon:"⬡", label:"Arts & Creative" },  { icon:"◈", label:"Adaptive Fitness" },
  { icon:"◑", label:"Neurodiversity" },    { icon:"▲", label:"Peer Support" },
];

const STRIP_COURSES = [
  { id:10, title:"Braille Literacy Level 1",              provider:"BlindTech Institute",  type:"Certificate",    rating:4.8, accent:"#4f46e5" },
  { id:11, title:"Wheelchair Sports & Adaptive Fitness",  provider:"Mobility & Fitness",   type:"Course",         rating:4.6, accent:"#0891b2" },
  { id:12, title:"Chronic Pain Management at Work",       provider:"Invisible Illness",    type:"Course",         rating:4.7, accent:"#be123c" },
  { id:13, title:"Dyslexia Tools for Professionals",      provider:"ADHD Focus Zone",      type:"Specialization", rating:4.8, accent:"#0f766e" },
  { id:14, title:"Hearing Loop & Captioning Systems",     provider:"DeafConnect Academy",  type:"Course",         rating:4.9, accent:"#7c2d12" },
];

const CAREERS = [
  { title:"Accessibility Specialist",    jobs:"12,400", salary:"₹8.2L",  color:"#4f46e5", desc:"Audit digital products for WCAG compliance and guide inclusive design decisions." },
  { title:"AT Consultant",               jobs:"6,800",  salary:"₹7.1L",  color:"#0891b2", desc:"Recommend and train users on assistive technology tools and adaptive equipment." },
  { title:"Disability Rights Advocate",  jobs:"4,200",  salary:"₹6.4L",  color:"#be123c", desc:"Support individuals navigating legal protections, accommodations and workplace rights." },
  { title:"Peer Support Specialist",     jobs:"18,700", salary:"₹5.8L",  color:"#0f766e", desc:"Leverage lived experience to guide others through disability-related challenges." },
  { title:"Inclusive Design Lead",       jobs:"9,300",  salary:"₹11.4L", color:"#7c2d12", desc:"Drive accessibility-first product strategy in tech and design agencies." },
];

const TESTIMONIALS = [
  { name:"Priya M.",  initials:"PM", color:"#4f46e5", quote:"The Screen Reader course changed my career. I landed an accessibility role at a top tech firm within 3 months." },
  { name:"James K.",  initials:"JK", color:"#0891b2", quote:"As a late-diagnosed ADHD professional, this was the first productivity system that actually clicked for my brain." },
  { name:"Anika R.",  initials:"AR", color:"#be123c", quote:"EmpowerAble rebuilt my confidence. The ADA course helped me advocate for proper workplace accommodations." },
  { name:"Dev S.",    initials:"DS", color:"#0f766e", quote:"The ASL course brought me closer to the Deaf community. Instructors from within the community — truly authentic." },
];

const FAQS = [
  { q:"Are the courses free?",                              a:"18 of our 24 courses are completely free with a certificate. A few advanced specializations have a small fee. Full fee waivers are available on application." },
  { q:"Are courses accessible to screen readers?",         a:"Every course is built to WCAG 2.2 AA. Transcripts, captions, audio descriptions, and full keyboard navigation are available on all content." },
  { q:"Do I earn a shareable certificate?",                a:"Yes. Completing any certificate course gives you a verified EmpowerAble credential you can share to LinkedIn, download as PDF, or link in resumes." },
  { q:"Can I learn at my own pace?",                       a:"All courses are fully self-paced — no deadlines, no live sessions. Content is designed for the energy levels and varied schedules of disabled learners." },
  { q:"Who creates the courses?",                          a:"Courses are made by community experts, therapists, AT professionals, lawyers, and advocates — many of whom are disabled themselves." },
];

/* ─── HELPERS ─── */
function Stars({ r }) {
  return (
    <span style={{ display:"inline-flex", gap:2, alignItems:"center" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24"
          fill={i <= Math.round(r) ? "#facc15" : "rgba(255,255,255,0.12)"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span style={{ fontSize:11, color:"#facc15", marginLeft:2, fontFamily:"system-ui,sans-serif", fontWeight:700 }}>{r}</span>
    </span>
  );
}

/* ─── POPULAR COL ─── */
function PopularCol({ col }) {
  const [hov, setHov] = useState(null);
  return (
    <div style={{ flex:"1 1 0", minWidth:0, borderRadius:16,
      background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
      backdropFilter:"blur(16px)", overflow:"hidden" }}>
      <button style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 18px", background:"transparent", border:"none", cursor:"pointer",
        borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff" }}>{col.label}</span>
        <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
      {col.courses.map((c, i) => (
        <div key={c.id} onMouseEnter={() => setHov(c.id)} onMouseLeave={() => setHov(null)}
          style={{ display:"flex", gap:12, padding:"14px 18px", cursor:"pointer",
            background: hov === c.id ? "rgba(255,255,255,0.04)" : "transparent", transition:"background 0.15s",
            borderBottom: i < col.courses.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
          <div style={{ width:58, height:58, borderRadius:8, flexShrink:0, background:c.color,
            backgroundImage:"linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 60%)" }} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif", marginBottom:3 }}>{c.provider}</div>
            <div style={{ fontFamily:"system-ui,sans-serif", fontSize:13, fontWeight:700, color:"#fff", lineHeight:1.3, marginBottom:5 }}>{c.title}</div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.26)", fontFamily:"system-ui,sans-serif" }}>{c.type}</span>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.15)" }}>·</span>
              <Stars r={c.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── STRIP CARD ─── */
function StripCard({ c }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flexShrink:0, width:218, borderRadius:12, overflow:"hidden", cursor:"pointer",
        border: hov ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)",
        background:"rgba(255,255,255,0.025)", backdropFilter:"blur(12px)",
        transition:"all 0.22s", transform: hov ? "translateY(-3px)" : "none" }}>
      <div style={{ height:78, background:c.accent,
        backgroundImage:"linear-gradient(135deg,rgba(255,255,255,0.13) 0%,transparent 60%)" }} />
      <div style={{ padding:"12px 14px 15px" }}>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif", marginBottom:4 }}>{c.provider}</div>
        <div style={{ fontFamily:"system-ui,sans-serif", fontSize:13, fontWeight:700, color:"#fff", lineHeight:1.3, marginBottom:8 }}>{c.title}</div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.26)", fontFamily:"system-ui,sans-serif" }}>{c.type}</span>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.15)" }}>·</span>
          <Stars r={c.rating} />
        </div>
      </div>
    </div>
  );
}

/* ─── CAREER CARD ─── */
function CareerCard({ c }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flexShrink:0, width:222, borderRadius:14, overflow:"hidden", cursor:"pointer",
        border: hov ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.06)",
        background: hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        backdropFilter:"blur(14px)", transition:"all 0.22s", transform: hov ? "translateY(-4px)" : "none" }}>
      <div style={{ height:108, background:`linear-gradient(160deg,rgba(10,14,30,0.85) 0%,${c.color}55 100%)`,
        position:"relative", overflow:"hidden" }}>
        <svg viewBox="0 0 222 108" width="222" height="108" style={{ position:"absolute", inset:0 }}>
          <circle cx="111" cy="46" r="24" fill={c.color} opacity="0.22"/>
          <rect x="87" y="70" width="48" height="38" rx="7" fill={c.color} opacity="0.16"/>
          <polygon points="148,90 170,90 159,68" fill={c.color} opacity="0.4"/>
          <circle cx="159" cy="82" r="5" fill={c.color} opacity="0.65"/>
        </svg>
      </div>
      <div style={{ padding:"14px 16px 18px" }}>
        <div style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff", marginBottom:6, lineHeight:1.2 }}>{c.title}</div>
        <p style={{ fontSize:11, color:"rgba(255,255,255,0.34)", lineHeight:1.55, margin:"0 0 12px", fontFamily:"system-ui,sans-serif" }}>{c.desc}</p>
        <div style={{ display:"flex", gap:14 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:"#fff", fontFamily:"system-ui,sans-serif" }}>{c.salary}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.26)", letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif" }}>Avg salary</div>
          </div>
          <div style={{ width:1, background:"rgba(255,255,255,0.08)" }}/>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:"#fff", fontFamily:"system-ui,sans-serif" }}>{c.jobs}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.26)", letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif" }}>Jobs posted</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TESTIMONIAL ─── */
function Testimonial({ t }) {
  return (
    <div style={{ flex:"1 1 200px", minWidth:0, borderRadius:14, padding:"20px",
      background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
      backdropFilter:"blur(12px)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:t.color, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:13,
          fontWeight:800, color:"#fff", fontFamily:"system-ui,sans-serif" }}>{t.initials}</div>
        <span style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:700, color:"#fff" }}>{t.name}</span>
      </div>
      <p style={{ fontFamily:"'Georgia',serif", fontSize:13, color:"rgba(255,255,255,0.48)",
        lineHeight:1.7, margin:0, fontStyle:"italic" }}>"{t.quote}"</p>
    </div>
  );
}

/* ─── FAQ ─── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"18px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left", gap:16 }}>
        <span style={{ fontFamily:"system-ui,sans-serif", fontSize:15, fontWeight:700, color:"#fff" }}>{q}</span>
        <span style={{ fontSize:20, color:"rgba(255,255,255,0.32)", flexShrink:0,
          transition:"transform 0.2s", display:"inline-block", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <p style={{ fontFamily:"system-ui,sans-serif", fontSize:14, color:"rgba(255,255,255,0.44)",
        lineHeight:1.75, margin:"0 0 18px", maxWidth:760 }}>{a}</p>}
    </div>
  );
}

/* ─── SCROLL SECTION WRAPPER ─── */
function ScrollSection({ label, link="Explore all →", children, scrollRef }) {
  return (
    <div style={{ marginBottom:60 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, gap:12 }}>
        <h2 style={{ fontFamily:"system-ui,sans-serif", fontSize:"clamp(18px,2.2vw,24px)", fontWeight:800, color:"#fff", margin:0, letterSpacing:"-0.01em" }}>{label}</h2>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {scrollRef && [[-1,"‹"],[1,"›"]].map(([d,ch]) => (
            <button key={d} onClick={() => scrollRef.current?.scrollBy({ left:d*260, behavior:"smooth" })}
              style={{ width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)",
                cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>{ch}</button>
          ))}
          <button style={{ background:"none", border:"none", color:"rgba(255,255,255,0.42)",
            fontSize:13, fontFamily:"system-ui,sans-serif", fontWeight:700, cursor:"pointer" }}>{link}</button>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ═══════════════ MAIN ═══════════════ */
export default function LearnPage() {
  const stripRef  = useRef(null);
  const careerRef = useRef(null);

  return (
    <div style={{ background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)", minHeight:"100vh", overflowX:"hidden", position:"relative" }}>
      {/* Pinned bg so every scroll position shows the exact same dark navy as Community page */}
      <div style={{ position:"fixed", inset:0, zIndex:-1, background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />
      <style>{`
        .nobar{overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
        .nobar::-webkit-scrollbar{display:none}
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .up{animation:up 0.55s ease forwards}
        input::placeholder{color:rgba(255,255,255,0.28)!important}
      `}</style>

      {/* STARFIELD — identical to Community page */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {STARS.map(s => (
          <div key={s.id} style={{ position:"absolute", top:s.top+"%", left:s.left+"%",
            width:s.size, height:s.size, borderRadius:"50%", background:"#fff",
            "--op":s.op, opacity:s.op,
            animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
        <div style={{ position:"absolute", top:"5%", left:"10%", width:600, height:600, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute", bottom:"5%", right:"8%", width:480, height:480, borderRadius:"50%", pointerEvents:"none", background:"radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)" }}/>
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>

        {/* ════════ HERO — SPLIT BANNERS ════════ */}
        <section className="up" style={{ padding:"48px 0 44px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>

            {/* Left banner */}
            <div style={{ borderRadius:20, minHeight:280, position:"relative", overflow:"hidden",
              background:"linear-gradient(135deg,#1e1252 0%,#2d1b69 40%,#0c1a3a 100%)",
              border:"1px solid rgba(139,92,246,0.2)", display:"flex", alignItems:"flex-end" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.028) 1px,transparent 1px)", backgroundSize:"38px 38px", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", top:-50, right:50, width:220, height:220, borderRadius:"50%", background:"rgba(139,92,246,0.11)", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", top:24, right:18, width:100, height:100, borderRadius:"50%", background:"rgba(99,102,241,0.13)", pointerEvents:"none" }}/>
              <div style={{ position:"relative", padding:"36px 38px" }}>
                <p style={{ fontSize:10, color:"rgba(255,255,255,0.38)", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>EmpowerAble · Learn</p>
                <h1 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,3.5vw,50px)", fontWeight:900, color:"#fff", lineHeight:1.0, letterSpacing:"-0.025em", margin:"0 0 14px" }}>Skills built for<br/>every ability.</h1>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.42)", margin:"0 0 26px", fontFamily:"system-ui,sans-serif", lineHeight:1.65, maxWidth:310 }}>Expert-led courses by disabled educators, advocates, and AT specialists — free for most learners.</p>
                <button style={{ padding:"12px 28px", borderRadius:100, fontSize:14, fontWeight:800, fontFamily:"system-ui,sans-serif", cursor:"pointer", background:"rgba(255,255,255,0.92)", color:"#1e1252", border:"none", display:"inline-flex", alignItems:"center", gap:8, transition:"opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.85"} onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                  Start learning free
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>

            {/* Right banner */}
            <div style={{ borderRadius:20, minHeight:280, position:"relative", overflow:"hidden",
              background:"linear-gradient(135deg,#0a2440 0%,#083a5a 50%,#041a2e 100%)",
              border:"1px solid rgba(8,145,178,0.2)", display:"flex", alignItems:"flex-end" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize:"38px 38px", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", top:-30, right:40, width:180, height:180, borderRadius:"50%", background:"rgba(8,145,178,0.11)", pointerEvents:"none" }}/>
              <div style={{ position:"relative", padding:"36px 38px" }}>
                <p style={{ fontSize:10, color:"rgba(6,182,212,0.55)", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>For Organisations</p>
                <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(24px,3vw,44px)", fontWeight:900, color:"#fff", lineHeight:1.0, letterSpacing:"-0.02em", margin:"0 0 12px" }}>Upskill your team<br/>inclusively.</h2>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.38)", margin:"0 0 26px", fontFamily:"system-ui,sans-serif", lineHeight:1.65, maxWidth:300 }}>Train your workforce on accessibility, disability inclusion, and assistive tech — at scale.</p>
                <button style={{ padding:"12px 28px", borderRadius:100, fontSize:14, fontWeight:800, fontFamily:"system-ui,sans-serif", cursor:"pointer", background:"transparent", color:"rgba(255,255,255,0.75)", border:"1px solid rgba(255,255,255,0.22)", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="rgba(255,255,255,0.75)"; }}>
                  Try for organisations →
                </button>
              </div>
            </div>
          </div>

          {/* 3 Goal cards (Coursera Image 1 bottom row) */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              { icon:"◈", title:"Get certified",         sub:"Earn verified credentials",        accent:"#4f46e5" },
              { icon:"◉", title:"Learn with community",  sub:"Peer-led courses & workshops",     accent:"#0891b2" },
              { icon:"◆", title:"Find adaptive careers", sub:"Jobs matched to your abilities",   accent:"#0f766e" },
            ].map(g => (
              <button key={g.title}
                style={{ borderRadius:14, padding:"18px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:14, transition:"all 0.2s", backdropFilter:"blur(10px)" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}>
                <div style={{ width:42, height:42, borderRadius:10, flexShrink:0, background:`${g.accent}22`, border:`1px solid ${g.accent}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, color:"#fff" }}>{g.icon}</div>
                <div>
                  <div style={{ fontFamily:"system-ui,sans-serif", fontSize:14, fontWeight:800, color:"#fff", marginBottom:2 }}>{g.title}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"system-ui,sans-serif" }}>{g.sub}</div>
                </div>
                <svg style={{ marginLeft:"auto", flexShrink:0 }} width="14" height="14" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            ))}
          </div>
        </section>

        {/* ── PROVIDER LOGOS STRIP ── */}
        <section style={{ marginBottom:52 }}>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.22)", fontFamily:"system-ui,sans-serif", marginBottom:16, letterSpacing:"0.02em" }}>Courses from disability-led organisations and experts</p>
          <div style={{ display:"flex", flexWrap:"wrap", borderTop:"1px solid rgba(255,255,255,0.05)", borderLeft:"1px solid rgba(255,255,255,0.05)" }}>
            {PROVIDERS.map(p => (
              <div key={p.name} style={{ flex:"1 1 140px", padding:"12px 18px", borderRight:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <div style={{ width:24, height:24, borderRadius:5, background:"rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"rgba(255,255,255,0.38)", fontFamily:"system-ui,sans-serif", flexShrink:0 }}>{p.abbr}</div>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)", fontFamily:"system-ui,sans-serif", fontWeight:600, whiteSpace:"nowrap" }}>{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ NEW & POPULAR — 3 COLUMNS (Coursera Image 2) ════════ */}
        <ScrollSection label="New and popular">
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            {POPULAR_COLS.map(col => <PopularCol key={col.id} col={col} />)}
          </div>
        </ScrollSection>

        {/* ── EXPLORE CATEGORIES (Coursera Image 2 bottom) ── */}
        <section style={{ marginBottom:56 }}>
          <h2 style={{ fontFamily:"system-ui,sans-serif", fontSize:"clamp(18px,2.2vw,24px)", fontWeight:800, color:"#fff", margin:"0 0 18px" }}>Explore categories</h2>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c.label}
                style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 17px", borderRadius:100, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"system-ui,sans-serif", whiteSpace:"nowrap", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.52)", border:"1px solid rgba(255,255,255,0.09)", transition:"all 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.09)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="rgba(255,255,255,0.52)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; }}>
                <span style={{ fontFamily:"system-ui", fontSize:14 }}>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* ════════ HORIZONTAL STRIP (Coursera Image 3 — "AI bestsellers" style) ════════ */}
        <ScrollSection label="Most enrolled this month" scrollRef={stripRef}>
          <div className="nobar" ref={stripRef} style={{ display:"flex", gap:14, paddingBottom:4 }}>
            {/* Label tile (like Coursera's "AI bestsellers" leftmost panel) */}
            <div style={{ flexShrink:0, width:196, borderRadius:14, padding:"22px 20px",
              background:"linear-gradient(160deg,#1e1b4b 0%,#3730a3 100%)",
              border:"1px solid rgba(99,102,241,0.25)", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:174 }}>
              <div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.36)", letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif", marginBottom:10 }}>✦ Editor's picks</div>
                <div style={{ fontFamily:"'Georgia',serif", fontSize:20, fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em" }}>Top picks<br/>right now</div>
              </div>
              <button style={{ fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif", background:"rgba(255,255,255,0.1)", border:"none", color:"rgba(255,255,255,0.65)", padding:"7px 14px", borderRadius:100, cursor:"pointer" }}>Explore all →</button>
            </div>
            {STRIP_COURSES.map(c => <StripCard key={c.id} c={c} />)}
          </div>
        </ScrollSection>

        {/* ════════ EXPLORE CAREERS (Coursera Image 3 bottom) ════════ */}
        <ScrollSection label="Explore careers in disability & accessibility" link="Explore all →" scrollRef={careerRef}>
          <div className="nobar" ref={careerRef} style={{ display:"flex", gap:14, paddingBottom:4 }}>
            {CAREERS.map(c => <CareerCard key={c.title} c={c} />)}
          </div>
        </ScrollSection>

        {/* ════════ PROMO BANNERS — 2 wide (Coursera Image 4 top) ════════ */}
        <section style={{ marginBottom:56 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              { kicker:"New courses", title:"Learn Braille — now with interactive tactile exercises", cta:"Enroll now →", bg:"linear-gradient(135deg,#1a0533 0%,#3b0764 50%,#1e1b4b 100%)", border:"rgba(139,92,246,0.2)" },
              { kicker:"Included free", title:"Full certificate programs at zero cost with EmpowerAble Plus", cta:"Learn about Plus →", bg:"linear-gradient(135deg,#042c53 0%,#0c447c 50%,#041628 100%)", border:"rgba(56,189,248,0.14)" },
            ].map(b => (
              <div key={b.title} style={{ borderRadius:16, padding:"28px 30px", background:b.bg, border:`1px solid ${b.border}`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-32, right:-28, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }}/>
                <div style={{ position:"relative" }}>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.32)", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif", marginBottom:8 }}>{b.kicker}</div>
                  <div style={{ fontFamily:"system-ui,sans-serif", fontSize:17, fontWeight:800, color:"#fff", lineHeight:1.25, marginBottom:16, maxWidth:320 }}>{b.title}</div>
                  <button style={{ fontSize:13, fontWeight:700, fontFamily:"system-ui,sans-serif", background:"none", border:"none", color:"rgba(255,255,255,0.58)", cursor:"pointer", padding:0, transition:"color 0.18s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#fff"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.58)"}>{b.cta}</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════ TESTIMONIALS — 4 col (Coursera Image 4 middle) ════════ */}
        <section style={{ marginBottom:60 }}>
          <h2 style={{ fontFamily:"system-ui,sans-serif", fontSize:"clamp(18px,2.2vw,24px)", fontWeight:800, color:"#fff", margin:"0 0 20px" }}>Why learners choose EmpowerAble</h2>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            {TESTIMONIALS.map(t => <Testimonial key={t.name} t={t} />)}
          </div>
        </section>

        {/* ════════ FAQ — accordion (Coursera Image 4 bottom) ════════ */}
        <section style={{ marginBottom:80 }}>
          <h2 style={{ fontFamily:"system-ui,sans-serif", fontSize:"clamp(18px,2.2vw,24px)", fontWeight:800, color:"#fff", margin:"0 0 8px" }}>Frequently asked questions</h2>
          <div style={{ maxWidth:860 }}>
            {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
          </div>
        </section>

        {/* ── FOOTER WATERMARK ── */}
        <section style={{ textAlign:"center", paddingBottom:80, borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:56 }}>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(48px,8vw,108px)", fontWeight:900, letterSpacing:"-0.04em", color:"rgba(255,255,255,0.04)", lineHeight:0.85, userSelect:"none" }}>EMPOWERABLE</div>
          <p style={{ color:"rgba(255,255,255,0.14)", fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif", marginTop:-14 }}>Learn · Grow · Belong</p>
        </section>

      </div>
    </div>
  );
}