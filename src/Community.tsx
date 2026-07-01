import { useState, useEffect, useRef } from "react";

const CATEGORIES = ["All", "Visual", "Hearing", "Mobility", "Cognitive", "Mental Health", "Chronic Illness"];

const FEATURED = [
  { id: 1, name: "VisionTech Collective", category: "Visual", members: 12400, online: 342, desc: "Visually impaired devs, designers & tech enthusiasts. Assistive tools, career paths, and pure innovation.", emoji: "👁️", gradient: "linear-gradient(135deg,#4f46e5,#7c3aed,#1e1b4b)", accent: "#7c3aed", joined: false },
  { id: 2, name: "Hearing Access Hub", category: "Hearing", members: 28900, online: 891, desc: "The largest deaf & HoH community online. Sign language, captioning tools, advocacy, and joyful culture.", emoji: "🤲", gradient: "linear-gradient(135deg,#0e7490,#0891b2,#083344)", accent: "#0891b2", joined: false },
  { id: 3, name: "Mobility Access Network", category: "Mobility", members: 9700, online: 214, desc: "Travel hacks, accessible venue reviews, adaptive sports, and daily life wins for wheelchair users.", emoji: "♿", gradient: "linear-gradient(135deg,#be123c,#e11d48,#4c0519)", accent: "#e11d48", joined: false },
];

const COMMUNITIES = [
  { id: 4,  name: "ADHD Support Space",         category: "Cognitive",        members: 31200, online: 1024, desc: "Productivity systems & shame-free support for ADHD brains.", emoji: "⚡", joined: false },
  { id: 5,  name: "Autism Community Network",  category: "Cognitive",        members: 44500, online: 1532, desc: "Celebrating neurodiversity — late-diagnosed to parents, all welcome.", emoji: "🌈", joined: false },
  { id: 6,  name: "Chronic Pain Support Circle", category: "Chronic Illness",  members: 19800, online: 673,  desc: "Fibromyalgia, EDS, CRPS. Real talk about pain management and hope.", emoji: "💪", joined: false },
  { id: 7,  name: "Low Vision Community",      category: "Visual",           members: 7200,  online: 189,  desc: "Magnification tools, reading tips, and emotional support.", emoji: "🔍", joined: false },
  { id: 8,  name: "Speech & Communication Hub",category: "Cognitive",        members: 5400,  online: 98,   desc: "AAC devices and therapy resources for speech & language differences.", emoji: "🗣️", joined: false },
  { id: 9,  name: "Mental Wellness & Disability", category: "Mental Health",    members: 22300, online: 788,  desc: "Navigating disability with anxiety. Gentle, non-judgmental conversations.", emoji: "🌿", joined: false },
  { id: 10, name: "Deaf Sports Community",     category: "Hearing",          members: 8100,  online: 201,  desc: "Deaflympics fans, local deaf sports clubs, all levels welcome.", emoji: "🏅", joined: false },
  { id: 11, name: "Adaptive Fitness Network", category: "Mobility",         members: 14600, online: 430,  desc: "Adaptive fitness, seated yoga, wheelchair sports and beyond.", emoji: "🏋️", joined: false },
  { id: 12, name: "Invisible Conditions Network", category: "Chronic Illness",  members: 37000, online: 1102, desc: "For those whose disabilities aren't always visible. Solidarity here.", emoji: "🫧", joined: false },
  { id: 13, name: "Trauma Support Space",     category: "Mental Health",    members: 16700, online: 511,  desc: "Trauma-informed, peer-led support for disability-related PTSD.", emoji: "🕊️", joined: false },
  { id: 14, name: "Dyslexia Support Network", category: "Cognitive",        members: 11200, online: 345,  desc: "Tools, fonts and strategies for dyslexic learners and professionals.", emoji: "📚", joined: false },
  { id: 15, name: "Limb Difference Community",category: "Mobility",         members: 6800,  online: 176,  desc: "Amputees sharing life, prosthetics, and pure resilience.", emoji: "🦾", joined: false },
];

const CAT_COLORS = {
  Visual:           { bg: "rgba(124,58,237,0.18)",  border: "rgba(124,58,237,0.4)",  text: "#c4b5fd" },
  Hearing:          { bg: "rgba(8,145,178,0.18)",   border: "rgba(8,145,178,0.4)",   text: "#67e8f9" },
  Mobility:         { bg: "rgba(225,29,72,0.18)",   border: "rgba(225,29,72,0.4)",   text: "#fda4af" },
  Cognitive:        { bg: "rgba(234,179,8,0.18)",   border: "rgba(234,179,8,0.4)",   text: "#fde047" },
  "Mental Health":  { bg: "rgba(34,197,94,0.18)",   border: "rgba(34,197,94,0.4)",   text: "#86efac" },
  "Chronic Illness":{ bg: "rgba(236,72,153,0.18)",  border: "rgba(236,72,153,0.4)",  text: "#f9a8d4" },
};

const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random()*100, left: Math.random()*100,
  size: Math.random()*2.2+0.5, op: Math.random()*0.65+0.1, dur: Math.random()*4+2,
}));

function fmt(n) { return n >= 1000 ? (n/1000).toFixed(1)+"k" : String(n); }

function Badge({ cat }) {
  const c = CAT_COLORS[cat] || { bg:"rgba(255,255,255,0.1)", border:"rgba(255,255,255,0.2)", text:"#fff" };
  return (
    <span style={{ background: c.bg, border:`1px solid ${c.border}`, color: c.text,
      fontSize: 11, padding: "2px 9px", borderRadius: 20, fontFamily:"system-ui,sans-serif", letterSpacing:"0.04em", whiteSpace:"nowrap" }}>
      {cat}
    </span>
  );
}

function FeaturedCard({ c, onJoin }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ borderRadius:24, overflow:"hidden", cursor:"pointer",
        border: hov?"1px solid rgba(255,255,255,0.22)":"1px solid rgba(255,255,255,0.07)",
        background:"rgba(255,255,255,0.03)", backdropFilter:"blur(20px)",
        transition:"all 0.35s ease", transform: hov?"translateY(-5px)":"none" }}>
      <div style={{ height:110, background:c.gradient, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:50, opacity:0.4 }}>{c.emoji}</div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:50,
          background:"linear-gradient(to bottom,transparent,rgba(8,16,32,0.98))" }} />
      </div>
      <div style={{ padding:"0 20px 22px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginTop:-12, marginBottom:12 }}>
          <div style={{ width:50, height:50, borderRadius:14, background:"rgba(255,255,255,0.08)",
            border:"3px solid rgba(8,16,32,1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>
            {c.emoji}
          </div>
          <button onClick={()=>onJoin(c.id)} style={{ marginTop:18, padding:"6px 20px", borderRadius:100, fontSize:13,
            fontWeight:700, fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.2s",
            background: c.joined?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.93)",
            color: c.joined?"rgba(255,255,255,0.45)":"#080e1c",
            border: c.joined?"1px solid rgba(255,255,255,0.18)":"none" }}>
            {c.joined ? "✓ Joined" : "Join"}
          </button>
        </div>
        <div style={{ fontFamily:"'Georgia',serif", fontSize:19, fontWeight:700, color:"#fff", marginBottom:6 }}>{c.name}</div>
        <Badge cat={c.category} />
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, lineHeight:1.65, margin:"10px 0 14px", fontFamily:"system-ui,sans-serif" }}>{c.desc}</p>
        <div style={{ display:"flex", gap:16, fontSize:12, color:"rgba(255,255,255,0.3)", fontFamily:"system-ui,sans-serif" }}>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
            {fmt(c.online)} online
          </span>
          <span>👥 {fmt(c.members)}</span>
        </div>
      </div>
    </div>
  );
}

function CommunityCard({ c, onJoin }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ borderRadius:14, padding:"16px 18px", cursor:"pointer",
        border: hov?"1px solid rgba(255,255,255,0.16)":"1px solid rgba(255,255,255,0.06)",
        background: hov?"rgba(255,255,255,0.065)":"rgba(255,255,255,0.025)",
        backdropFilter:"blur(12px)", transition:"all 0.22s ease",
        transform: hov?"translateY(-2px)":"none" }}>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
        <div style={{ width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.07)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
          {c.emoji}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:4 }}>
            <div style={{ fontFamily:"'Georgia',serif", fontSize:15, color:"#fff", fontWeight:700 }}>{c.name}</div>
            <button onClick={()=>onJoin(c.id)} style={{ flexShrink:0, padding:"4px 14px", borderRadius:100,
              fontSize:12, fontWeight:700, fontFamily:"system-ui,sans-serif", cursor:"pointer", transition:"all 0.2s",
              background: c.joined?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.1)",
              color: c.joined?"rgba(255,255,255,0.38)":"rgba(255,255,255,0.85)",
              border:"1px solid rgba(255,255,255,0.1)" }}>
              {c.joined?"Joined":"+ Join"}
            </button>
          </div>
          <Badge cat={c.category} />
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, lineHeight:1.55, margin:"8px 0", fontFamily:"system-ui,sans-serif" }}>{c.desc}</p>
          <div style={{ display:"flex", gap:12, fontSize:11, color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif" }}>
            <span style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
              {fmt(c.online)}
            </span>
            <span>{fmt(c.members)} members</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunitySection() {
  const [search, setSearch]     = useState("");
  const [cat, setCat]           = useState("All");
  const [featured, setFeatured] = useState(FEATURED);
  const [comms, setComms]       = useState(COMMUNITIES);

  const joinFeatured = id => setFeatured(p => p.map(c => c.id===id ? {...c, joined:!c.joined} : c));
  const joinComm     = id => setComms(p     => p.map(c => c.id===id ? {...c, joined:!c.joined} : c));

  const filtFeat = featured.filter(c =>
    (cat==="All" || c.category===cat) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );
  const filtComm = comms.filter(c =>
    (cat==="All" || c.category===cat) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const catCounts = CATEGORIES.reduce((a,k) => {
    a[k] = k==="All" ? COMMUNITIES.length+FEATURED.length
      : [...COMMUNITIES,...FEATURED].filter(c=>c.category===k).length;
    return a;
  }, {});

  const totalJoined = [...featured,...comms].filter(c=>c.joined).length;

  return (
    <div style={{ background:"linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight:"100vh", overflowX:"hidden" }}>

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(38px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .fu0{animation:fadeUp 0.75s ease 0.1s forwards;opacity:0}
        .fu1{animation:fadeUp 0.75s ease 0.28s forwards;opacity:0}
        .fu2{animation:fadeUp 0.75s ease 0.44s forwards;opacity:0}
        .fu3{animation:fadeUp 0.75s ease 0.6s forwards;opacity:0}
        .fu4{animation:fadeUp 0.75s ease 0.76s forwards;opacity:0}
        .floatY{animation:floatY 2.4s ease-in-out infinite}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px}
      `}</style>

      {/* Fixed starfield */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {STARS.map(s=>(
          <div key={s.id} style={{ position:"absolute", top:s.top+"%", left:s.left+"%",
            width:s.size, height:s.size, borderRadius:"50%", background:"#fff",
            "--op":s.op, opacity:s.op, animation:`twinkle ${s.dur}s ease-in-out ${Math.random()*4}s infinite` }} />
        ))}
        <div style={{ position:"absolute", top:"5%", left:"10%", width:600, height:600, borderRadius:"50%", pointerEvents:"none",
          background:"radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:"5%", right:"8%", width:480, height:480, borderRadius:"50%", pointerEvents:"none",
          background:"radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)" }} />
      </div>

      {/* ════════ HERO ════════ */}
      <section style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex",
        flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"80px 24px 60px", textAlign:"center" }}>

        <div className="fu0" style={{ display:"inline-flex", alignItems:"center", gap:8,
          padding:"7px 20px", borderRadius:100, border:"1px solid rgba(255,255,255,0.13)",
          background:"rgba(255,255,255,0.04)", backdropFilter:"blur(10px)",
          color:"rgba(255,255,255,0.5)", fontSize:12, marginBottom:36,
          fontFamily:"system-ui,sans-serif", letterSpacing:"0.1em", textTransform:"uppercase" }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80" }} />
          {totalJoined > 0 ? `${totalJoined} communities joined` : "Find your community"}
        </div>

        {/* MASSIVE HERO TEXT */}
        <h1 className="fu1" style={{ fontFamily:"'Georgia',serif",
          fontSize:"clamp(56px, 10vw, 140px)", fontWeight:900,
          lineHeight:0.88, letterSpacing:"-0.035em", color:"#fff", margin:"0 0 28px" }}>
          FIND YOUR
          <br />
          <span style={{ WebkitTextStroke:"2px rgba(255,255,255,0.22)", color:"transparent" }}>
            COMMUNITY.
          </span>
        </h1>

        <p className="fu2" style={{ fontSize:"clamp(16px,2vw,21px)", color:"rgba(255,255,255,0.42)",
          maxWidth:540, lineHeight:1.65, margin:"0 auto 52px", fontFamily:"system-ui,sans-serif" }}>
          A unified space for disabled people to connect, grow, and belong — organized by ability, interest, and cause.
        </p>

        <div className="fu3" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#communities" style={{ padding:"15px 38px", borderRadius:100, fontSize:16, fontWeight:800,
            fontFamily:"system-ui,sans-serif", cursor:"pointer", textDecoration:"none",
            background:"#fff", color:"#0a1628", display:"inline-block", transition:"opacity 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Explore Communities
          </a>
          <button style={{ padding:"15px 38px", borderRadius:100, fontSize:16, fontWeight:800,
            fontFamily:"system-ui,sans-serif", cursor:"pointer",
            background:"transparent", color:"rgba(255,255,255,0.7)",
            border:"1px solid rgba(255,255,255,0.22)", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.color="#fff"}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.7)"}}>
            Create a Space +
          </button>
        </div>

        {/* Stats */}
        <div className="fu4" style={{ marginTop:72, display:"flex", gap:56, justifyContent:"center", flexWrap:"wrap" }}>
          {[["16","Communities"],["250k+","Members"],["5k+","Online Now"]].map(([n,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(34px,4vw,52px)", fontWeight:900, color:"#fff", lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:7,
                letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"system-ui,sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* scroll arrow */}
        <div className="floatY" style={{ marginTop:60, opacity:0.25 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* ════════ MARQUEE STRIP ════════ */}
      <div style={{ position:"relative", zIndex:1, overflow:"hidden",
        borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)",
        padding:"18px 0", background:"rgba(255,255,255,0.02)" }}>
        <div style={{ display:"flex", animation:"marquee 28s linear infinite", width:"max-content" }}>
          {[...CATEGORIES.slice(1),...CATEGORIES.slice(1)].map((c,i)=>(
            <span key={i} style={{ fontFamily:"'Georgia',serif", fontSize:15, fontWeight:700,
              color:"rgba(255,255,255,0.22)", whiteSpace:"nowrap", padding:"0 28px",
              letterSpacing:"0.06em", textTransform:"uppercase" }}>
              {c} <span style={{ color:"rgba(255,255,255,0.1)", marginLeft:6 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ SPLIT SECTION ════════ */}
      <section style={{ position:"relative", zIndex:1, padding:"100px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:40, alignItems:"center" }}>
          <div>
            <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(38px,5.5vw,82px)",
              fontWeight:900, lineHeight:0.88, color:"#fff", letterSpacing:"-0.03em", margin:"0 0 20px" }}>
              SPACES FOR<br />
              <span style={{ color:"rgba(129,140,248,0.85)" }}>EVERY</span><br />
              ABILITY.
            </h2>
          </div>
          <div>
            <p style={{ fontSize:18, color:"rgba(255,255,255,0.42)", lineHeight:1.72,
              fontFamily:"system-ui,sans-serif", margin:"0 0 24px" }}>
              Whether you're visually impaired, deaf, neurodivergent, or living with chronic illness — there's a space built for you. Not as an afterthought. As the whole point.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {CATEGORIES.slice(1).map(c=><Badge key={c} cat={c} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FEATURED ════════ */}
      <section style={{ position:"relative", zIndex:1, padding:"0 24px 80px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ marginBottom:44 }}>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", letterSpacing:"0.15em",
              textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>
              ✦ Handpicked
            </p>
            <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(44px,6vw,96px)",
              fontWeight:900, letterSpacing:"-0.035em", color:"#fff", lineHeight:0.88, margin:0 }}>
              FEATURED<br />SPACES
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {featured.map(c=><FeaturedCard key={c.id} c={c} onJoin={joinFeatured} />)}
          </div>
        </div>
      </section>

      {/* ════════ COMMUNITY BROWSER ════════ */}
      <section id="communities" style={{ position:"relative", zIndex:1, padding:"0 24px 80px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          {/* Heading */}
          <div style={{ marginBottom:40 }}>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", letterSpacing:"0.15em",
              textTransform:"uppercase", fontFamily:"system-ui,sans-serif", margin:"0 0 10px" }}>
              Browse all
            </p>
            <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(44px,6vw,96px)",
              fontWeight:900, letterSpacing:"-0.035em", color:"#fff", lineHeight:0.88, margin:0 }}>
              ALL<br />COMMUNITIES
            </h2>
          </div>

          {/* Search + filters */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center", marginBottom:36 }}>
            <div style={{ position:"relative", flex:"1 1 260px" }}>
              <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", opacity:0.3 }}
                width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search communities..."
                style={{ width:"100%", boxSizing:"border-box", padding:"13px 16px 13px 42px",
                  borderRadius:100, background:"rgba(255,255,255,0.06)", backdropFilter:"blur(12px)",
                  border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontSize:14,
                  fontFamily:"system-ui,sans-serif", outline:"none", transition:"border-color 0.2s" }}
                onFocus={e=>e.target.style.borderColor="rgba(255,255,255,0.28)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"} />
              {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:16,
                top:"50%", transform:"translateY(-50%)", background:"none", border:"none",
                color:"rgba(255,255,255,0.35)", cursor:"pointer", fontSize:14 }}>✕</button>}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CATEGORIES.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{ padding:"10px 18px", borderRadius:100,
                  fontSize:13, cursor:"pointer", fontFamily:"system-ui,sans-serif", fontWeight:700,
                  transition:"all 0.18s", background: cat===c?"#fff":"rgba(255,255,255,0.05)",
                  color: cat===c?"#0a1628":"rgba(255,255,255,0.45)",
                  border: cat===c?"none":"1px solid rgba(255,255,255,0.08)" }}>
                  {c}&nbsp;<span style={{ opacity:0.45, fontWeight:400 }}>{catCounts[c]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtComm.length===0 ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
              <p style={{ color:"rgba(255,255,255,0.28)", fontFamily:"system-ui,sans-serif" }}>No communities match.</p>
              <button onClick={()=>{setSearch("");setCat("All")}} style={{ marginTop:10, background:"none",
                border:"none", color:"rgba(255,255,255,0.35)", cursor:"pointer",
                textDecoration:"underline", fontSize:13, fontFamily:"system-ui,sans-serif" }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:12 }}>
              {filtComm.map(c=><CommunityCard key={c.id} c={c} onJoin={joinComm} />)}
            </div>
          )}
        </div>
      </section>

      {/* ════════ CTA BANNER ════════ */}
      <section style={{ position:"relative", zIndex:1, padding:"0 24px 80px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ borderRadius:32, position:"relative", overflow:"hidden",
            background:"linear-gradient(135deg,#1e1b4b 0%,#3730a3 45%,#6d28d9 80%,#7e22ce 100%)",
            padding:"64px 56px", display:"flex", alignItems:"center",
            justifyContent:"space-between", gap:32, flexWrap:"wrap" }}>
            <div style={{ position:"absolute", top:-50, right:100, width:180, height:180,
              borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-70, right:24, width:260, height:260,
              borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
            <div style={{ position:"relative" }}>
              <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(30px,4vw,62px)",
                fontWeight:900, color:"#fff", lineHeight:0.92, letterSpacing:"-0.025em", margin:"0 0 16px" }}>
                HAVE A COMMUNITY<br />TO SHARE?
              </h2>
              <p style={{ color:"rgba(255,255,255,0.5)", fontSize:17, fontFamily:"system-ui,sans-serif",
                margin:0, maxWidth:420, lineHeight:1.65 }}>
                Build your own space for disabled people. Create channels, set your own culture, and grow something meaningful.
              </p>
            </div>
            <button style={{ flexShrink:0, position:"relative", padding:"18px 42px", borderRadius:100,
              fontSize:17, fontWeight:800, fontFamily:"system-ui,sans-serif", cursor:"pointer",
              background:"#fff", color:"#1e1b4b", border:"none", transition:"transform 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              Get Your Space Ready →
            </button>
          </div>
        </div>
      </section>

      {/* ════════ WATERMARK FOOTER TEXT ════════ */}
      <section style={{ position:"relative", zIndex:1, textAlign:"center", padding:"40px 24px 100px" }}>
        <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(52px,9vw,130px)", fontWeight:900,
          letterSpacing:"-0.04em", color:"rgba(255,255,255,0.05)", lineHeight:0.85,
          margin:"0 auto", userSelect:"none", pointerEvents:"none" }}>
          EMPOWERABLE
        </h2>
        <p style={{ position:"relative", marginTop:-32, color:"rgba(255,255,255,0.22)", fontSize:12,
          fontFamily:"system-ui,sans-serif", letterSpacing:"0.18em", textTransform:"uppercase" }}>
          Community · Connection · Opportunity
        </p>
      </section>
    </div>
  );
} 