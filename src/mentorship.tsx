import { useState, useRef, useEffect } from "react";

/* ──────────────── STARS (matching site) ──────────────── */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.65 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── DATA ──────────────── */
const EXPERTISE_AREAS = [
  "All", "Assistive Tech", "Career Growth", "Mental Wellness",
  "Disability Rights", "Entrepreneurship", "Education & Research",
  "Arts & Creative", "Sports & Fitness",
];

const MENTORS = [
  {
    id: 1, name: "Dr. Ananya Krishnan", role: "Accessibility Lead · Google India",
    disability: "Visually Impaired", expertise: ["Assistive Tech", "Career Growth"],
    topics: ["Screen readers", "Tech careers", "WCAG auditing", "Interview prep"],
    rating: 4.9, sessions: 214, bio: "Blind since 18, I've spent 11 years building accessible products at scale. I help disabled techies land roles at top companies and navigate corporate accessibility work.",
    available: true, nextSlot: "Today, 4 PM", lang: ["English", "Tamil"],
    accent: "#4f46e5", initials: "AK", sessionLen: 45, price: "Free",
    badges: ["Top Mentor", "Verified"],
  },
  {
    id: 2, name: "Rajiv Menon", role: "Disability Rights Lawyer · Supreme Court",
    disability: "Cerebral Palsy", expertise: ["Disability Rights"],
    topics: ["Workplace accommodations", "RPWD Act", "Legal aid", "RTI filings"],
    rating: 4.8, sessions: 187, bio: "I've argued over 40 disability-rights cases. Whether it's an employer refusing accommodation or a school denying enrolment — I'll walk you through your options.",
    available: true, nextSlot: "Tomorrow, 10 AM", lang: ["English", "Malayalam", "Hindi"],
    accent: "#be123c", initials: "RM", sessionLen: 60, price: "Free",
    badges: ["Verified", "Pro Bono"],
  },
  {
    id: 3, name: "Priya Venkat", role: "Founder · DeafDesign Studio",
    disability: "Deaf (HoH)", expertise: ["Arts & Creative", "Entrepreneurship"],
    topics: ["Design entrepreneurship", "Deaf culture", "ASL communication", "Freelancing"],
    rating: 4.9, sessions: 96, bio: "Deaf-owned design studio with clients across 12 countries. I mentor Deaf creatives on building businesses that don't need to hide who they are.",
    available: false, nextSlot: "Fri, 2 PM", lang: ["ASL", "English"],
    accent: "#0891b2", initials: "PV", sessionLen: 30, price: "Free",
    badges: ["Community Favourite"],
  },
  {
    id: 4, name: "Karan Malhotra", role: "Paralympic Sprinter & Coach",
    disability: "Limb Difference (below-knee)", expertise: ["Sports & Fitness"],
    topics: ["Adaptive sports", "Prosthetics for athletes", "Mental resilience", "Paralympic pathway"],
    rating: 5.0, sessions: 62, bio: "National record holder, now coaching the next generation of Para athletes. I believe disability is a different ability — and sport proves it every day.",
    available: true, nextSlot: "Today, 6 PM", lang: ["English", "Hindi"],
    accent: "#0f766e", initials: "KM", sessionLen: 45, price: "Free",
    badges: ["Top Mentor", "Athlete"],
  },
  {
    id: 5, name: "Dr. Meera Pillai", role: "Clinical Psychologist · NIMHANS",
    disability: "Chronic Illness (MS)", expertise: ["Mental Wellness"],
    topics: ["Disability grief", "Chronic illness coping", "CBT basics", "Workplace mental health"],
    rating: 4.8, sessions: 341, bio: "Diagnosed with MS at 29 while completing my PhD. I now specialise in helping people process chronic diagnosis, workplace stress, and disability identity.",
    available: true, nextSlot: "Thursday, 11 AM", lang: ["English", "Kannada"],
    accent: "#7c2d12", initials: "MP", sessionLen: 50, price: "Free",
    badges: ["Verified", "Most Booked"],
  },
  {
    id: 6, name: "Aditya Sharma", role: "Educator & Research Fellow · IIT Delhi",
    disability: "Autism Spectrum", expertise: ["Education & Research"],
    topics: ["Neurodiverse learning", "Academic accommodations", "Research careers", "STEM with autism"],
    rating: 4.7, sessions: 73, bio: "Autistic researcher who got a PhD when everyone said I couldn't. I help neurodiverse students navigate academia, get accommodations, and believe in their work.",
    available: false, nextSlot: "Sat, 3 PM", lang: ["English", "Hindi"],
    accent: "#6d28d9", initials: "AS", sessionLen: 60, price: "Free",
    badges: ["Researcher"],
  },
];

const TESTIMONIALS = [
  { name: "Sneha R.", mentor: "Dr. Ananya Krishnan", text: "One session changed everything. She gave me a roadmap to break into tech as a visually impaired developer — specific, honest, and real.", accent: "#4f46e5" },
  { name: "Rohan D.", mentor: "Dr. Meera Pillai",  text: "I finally had someone who understood chronic illness from the inside. Not just clinical advice — genuine understanding. That made all the difference.", accent: "#7c2d12" },
  { name: "Lakshmi P.", mentor: "Rajiv Menon",     text: "My employer denied my WFH request citing my disability. After 30 minutes with Rajiv, I knew exactly what legal steps to take. I won.", accent: "#be123c" },
];

const STATS = [
  { n: "120+", l: "Active Mentors" },
  { n: "3,800+", l: "Sessions Completed" },
  { n: "94%", l: "Satisfaction Rate" },
  { n: "Free", l: "Always" },
];

/* ──────────────── BOOKING MODAL ──────────────── */
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:30 AM", "1:00 PM",
  "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM",
];
const DATES = (() => {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() + i);
    return { label: days[d.getDay()], date: d.getDate(), month: months[d.getMonth()], key: i };
  });
})();

function BookingModal({ mentor, onClose }) {
  const [step,   setStep]   = useState(1); // 1=pick slot, 2=details, 3=confirm
  const [selDay, setSelDay] = useState(0);
  const [selTime,setSelTime]= useState(null);
  const [topic,  setTopic]  = useState("");
  const [name,   setName]   = useState("");
  const [goal,   setGoal]   = useState("");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const canAdvance = step === 1 ? selTime !== null : (name.trim().length > 0 && goal.trim().length > 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(4,8,20,0.88)", backdropFilter: "blur(6px)" }} />

      {/* Modal */}
      <div style={{ position: "relative", width: "min(580px, 94vw)", borderRadius: 24,
        background: "#080f20", border: "1px solid rgba(139,92,246,0.2)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8)", zIndex: 1, overflow: "hidden" }}>

        {/* Top mentor bar */}
        <div style={{ padding: "22px 28px", borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: mentor.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif" }}>
            {mentor.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "#fff" }}>{mentor.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", marginTop: 2 }}>{mentor.role}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
            borderRadius: 100, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 11, color: "#86efac", fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>Free · {mentor.sessionLen} min</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        {/* Step indicator */}
        <div style={{ padding: "16px 28px 0", display: "flex", gap: 6 }}>
          {["Pick a slot", "Your details", "Confirm"].map((l, i) => (
            <div key={l} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
              <div style={{ width: "100%", height: 3, borderRadius: 99, transition: "background 0.3s",
                background: i < step ? mentor.accent : i === step - 1 ? `${mentor.accent}88` : "rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: 10, fontFamily: "system-ui,sans-serif", fontWeight: 700,
                color: i === step - 1 ? "#fff" : "rgba(255,255,255,0.28)", letterSpacing: "0.04em" }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 28px", maxHeight: "65vh", overflowY: "auto" }}>

          {booked ? (
            /* ── SUCCESS ── */
            <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
                background: `${mentor.accent}22`, border: `2px solid ${mentor.accent}55`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>✓</div>
              <h3 style={{ fontFamily: "'Georgia',serif", fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>Session Booked!</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif", lineHeight: 1.7, marginBottom: 20 }}>
                Your session with <strong style={{ color: "#fff" }}>{mentor.name}</strong> is confirmed for{" "}
                <strong style={{ color: "#fff" }}>{DATES[selDay].label} {DATES[selDay].date} {DATES[selDay].month}</strong> at{" "}
                <strong style={{ color: "#fff" }}>{selTime}</strong>.<br/>You'll receive a meeting link by email.
              </p>
              <div style={{ padding: "14px 18px", borderRadius: 12, background: `${mentor.accent}12`,
                border: `1px solid ${mentor.accent}25`, marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Session details</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "system-ui,sans-serif", lineHeight: 1.7 }}>
                  <b style={{ color: "#fff" }}>Topic:</b> {topic || "Open discussion"}<br/>
                  <b style={{ color: "#fff" }}>Goal:</b> {goal}
                </div>
              </div>
              <button onClick={onClose} style={{ padding: "11px 32px", borderRadius: 100, fontSize: 13, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none" }}>
                Done
              </button>
            </div>
          ) : step === 1 ? (
            /* ── STEP 1: SLOT PICKER ── */
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif", marginBottom: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>Choose a date</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {DATES.map((d, i) => (
                  <button key={i} onClick={() => setSelDay(i)}
                    style={{ flex: 1, padding: "10px 4px", borderRadius: 12, cursor: "pointer", transition: "all 0.18s",
                      background: selDay === i ? mentor.accent : "rgba(255,255,255,0.04)",
                      border: selDay === i ? `1px solid ${mentor.accent}` : "1px solid rgba(255,255,255,0.08)",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <span style={{ fontSize: 9, color: selDay === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.label}</span>
                    <span style={{ fontSize: 16, fontWeight: 900, color: selDay === i ? "#fff" : "rgba(255,255,255,0.6)", fontFamily: "'Georgia',serif" }}>{d.date}</span>
                    <span style={{ fontSize: 9, color: selDay === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)", fontFamily: "system-ui,sans-serif" }}>{d.month}</span>
                  </button>
                ))}
              </div>

              <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif", marginBottom: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>Available time slots</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {TIME_SLOTS.map(t => {
                  const disabled = t === "9:00 AM" || t === "1:00 PM"; // simulate booked
                  return (
                    <button key={t} onClick={() => !disabled && setSelTime(t)} disabled={disabled}
                      style={{ padding: "10px 4px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                        fontFamily: "system-ui,sans-serif", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.18s",
                        background: selTime === t ? mentor.accent : disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                        border: selTime === t ? `1px solid ${mentor.accent}` : disabled ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(255,255,255,0.1)",
                        color: selTime === t ? "#fff" : disabled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.6)",
                        textDecoration: disabled ? "line-through" : "none" }}>
                      {t}
                    </button>
                  );
                })}
              </div>
              {selTime && (
                <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, background: `${mentor.accent}15`, border: `1px solid ${mentor.accent}30`, fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "system-ui,sans-serif" }}>
                  ✦ Selected: <strong style={{ color: "#fff" }}>{DATES[selDay].label} {DATES[selDay].date} {DATES[selDay].month}, {selTime}</strong> · {mentor.sessionLen} min
                </div>
              )}
            </div>
          ) : step === 2 ? (
            /* ── STEP 2: DETAILS ── */
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Your name</div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Priya Sharma"
                  style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: 10,
                    fontSize: 14, fontFamily: "system-ui,sans-serif", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)", color: "#fff", outline: "none" }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Topic to discuss (optional)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  {mentor.topics.map(t => (
                    <button key={t} onClick={() => setTopic(t)}
                      style={{ padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700,
                        fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.15s",
                        background: topic === t ? `${mentor.accent}30` : "rgba(255,255,255,0.04)",
                        border: topic === t ? `1px solid ${mentor.accent}70` : "1px solid rgba(255,255,255,0.08)",
                        color: topic === t ? "#fff" : "rgba(255,255,255,0.45)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>What do you hope to gain from this session?</div>
                <textarea value={goal} onChange={e => setGoal(e.target.value)}
                  placeholder="Share a bit about where you are and what kind of guidance would help you most..."
                  style={{ width: "100%", boxSizing: "border-box", minHeight: 90, padding: "12px 16px",
                    borderRadius: 10, fontSize: 13, fontFamily: "system-ui,sans-serif", resize: "vertical",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", outline: "none", lineHeight: 1.6 }} />
              </div>
            </div>
          ) : (
            /* ── STEP 3: CONFIRM ── */
            <div>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
                {[
                  { label: "Mentor",    value: mentor.name },
                  { label: "Date",      value: `${DATES[selDay].label} ${DATES[selDay].date} ${DATES[selDay].month}` },
                  { label: "Time",      value: selTime },
                  { label: "Duration",  value: `${mentor.sessionLen} minutes` },
                  { label: "Topic",     value: topic || "Open discussion" },
                  { label: "Your Goal", value: goal },
                  { label: "Cost",      value: "Free" },
                ].map((r, i) => (
                  <div key={r.label} style={{ display: "flex", gap: 16, padding: "12px 18px",
                    borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif", fontWeight: 700, minWidth: 80 }}>{r.label}</span>
                    <span style={{ fontSize: 13, color: "#fff", fontFamily: "system-ui,sans-serif" }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.18)", fontSize: 12, color: "rgba(134,239,172,0.85)", fontFamily: "system-ui,sans-serif", lineHeight: 1.6 }}>
                ✓ A meeting link will be sent to your registered email 30 minutes before the session.
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        {!booked && (
          <div style={{ padding: "16px 28px 24px", borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)" }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)}
                style={{ padding: "10px 22px", borderRadius: 100, fontSize: 13, fontWeight: 700,
                  fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "transparent",
                  color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.18s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
                ← Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => canAdvance && setStep(s => s + 1)}
                style={{ padding: "11px 28px", borderRadius: 100, fontSize: 13, fontWeight: 800,
                  fontFamily: "system-ui,sans-serif", cursor: canAdvance ? "pointer" : "default",
                  background: canAdvance ? mentor.accent : "rgba(255,255,255,0.08)",
                  color: canAdvance ? "#fff" : "rgba(255,255,255,0.25)", border: "none",
                  transition: "all 0.2s", opacity: 1 }}>
                {step === 1 ? "Continue →" : "Review Booking →"}
              </button>
            ) : (
              <button onClick={() => setBooked(true)}
                style={{ padding: "11px 28px", borderRadius: 100, fontSize: 13, fontWeight: 800,
                  fontFamily: "system-ui,sans-serif", cursor: "pointer", border: "none",
                  background: `linear-gradient(135deg,${mentor.accent},${mentor.accent}bb)`,
                  color: "#fff", boxShadow: `0 0 24px ${mentor.accent}55`, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                ✓ Confirm Booking
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────── MENTOR CARD ──────────────── */
function MentorCard({ m, onBook }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer",
        background: hov ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
        border: hov ? `1px solid ${m.accent}44` : "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.25s", transform: hov ? "translateY(-5px)" : "none",
        display: "flex", flexDirection: "column" }}>

      {/* Accent top strip */}
      <div style={{ height: 4, background: `linear-gradient(90deg,${m.accent},${m.accent}66)`, flexShrink: 0 }} />

      <div style={{ padding: "22px 22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header row */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${m.accent},${m.accent}88)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "system-ui,sans-serif",
              boxShadow: `0 0 20px ${m.accent}44` }}>
              {m.initials}
            </div>
            {m.available && (
              <div style={{ position: "absolute", bottom: 2, right: 2, width: 12, height: 12,
                borderRadius: "50%", background: "#4ade80", border: "2px solid #080f20",
                boxShadow: "0 0 8px rgba(74,222,128,0.6)" }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Georgia',serif", fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{m.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif", lineHeight: 1.4 }}>{m.role}</div>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {m.badges.map(b => (
            <span key={b} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, fontWeight: 700,
              fontFamily: "system-ui,sans-serif", background: `${m.accent}20`, border: `1px solid ${m.accent}40`,
              color: m.accent }}>{b}</span>
          ))}
          <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, fontWeight: 700,
            fontFamily: "system-ui,sans-serif", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
            {m.disability}
          </span>
        </div>

        {/* Bio */}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", fontFamily: "system-ui,sans-serif",
          lineHeight: 1.65, margin: "0 0 14px",
          display: "-webkit-box", WebkitLineClamp: expanded ? "none" : 3,
          WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {m.bio}
        </p>
        <button onClick={e => { e.stopPropagation(); setExpanded(p => !p); }}
          style={{ fontSize: 11, color: `${m.accent}cc`, fontFamily: "system-ui,sans-serif",
            background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
            marginBottom: 14, fontWeight: 700 }}>
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>

        {/* Topics */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {m.topics.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 6, fontFamily: "system-ui,sans-serif",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)" }}>{t}</span>
          ))}
          {m.topics.length > 3 && (
            <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 6, fontFamily: "system-ui,sans-serif",
              color: "rgba(255,255,255,0.25)" }}>+{m.topics.length - 3} more</span>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 18, paddingTop: 14,
          borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <div style={{ fontFamily: "'Georgia',serif", fontSize: 17, fontWeight: 900, color: "#fff" }}>{m.rating}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Rating</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)" }} />
          <div>
            <div style={{ fontFamily: "'Georgia',serif", fontSize: 17, fontWeight: 900, color: "#fff" }}>{m.sessions}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Sessions</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)" }} />
          <div>
            <div style={{ fontFamily: "'Georgia',serif", fontSize: 17, fontWeight: 900, color: "#fff" }}>{m.sessionLen}m</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Session</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#4ade80", fontFamily: "system-ui,sans-serif" }}>FREE</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>Always</div>
          </div>
        </div>

        {/* Languages */}
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif", marginBottom: 16 }}>
          🌐 {m.lang.join(" · ")}
        </div>

        {/* Availability + CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.available ? "#4ade80" : "rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: 11, fontFamily: "system-ui,sans-serif",
                color: m.available ? "#86efac" : "rgba(255,255,255,0.3)", fontWeight: 700 }}>
                {m.available ? "Available now" : "Next available"}
              </span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif", marginTop: 2 }}>
              {m.nextSlot}
            </div>
          </div>
          <button onClick={() => onBook(m)}
            style={{ padding: "9px 22px", borderRadius: 100, fontSize: 13, fontWeight: 800,
              fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.18s",
              background: m.available ? m.accent : "rgba(255,255,255,0.06)",
              color: m.available ? "#fff" : "rgba(255,255,255,0.45)",
              border: m.available ? "none" : "1px solid rgba(255,255,255,0.1)",
              boxShadow: m.available ? `0 0 20px ${m.accent}44` : "none" }}
            onMouseEnter={e => m.available && (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            {m.available ? "Book Session" : "Schedule →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── HOW IT WORKS ──────────────── */
function HowItWorks() {
  const steps = [
    { n:"01", icon:"◈", title:"Browse Mentors",     desc:"Filter by expertise, disability type, language, or availability. Every mentor is a verified PwD professional." },
    { n:"02", icon:"⬡", title:"Pick a Time Slot",   desc:"Choose from real-time availability. Sessions range from 30–60 minutes. Fully free, always." },
    { n:"03", icon:"◆", title:"Share Your Goal",    desc:"Tell your mentor what you need — a quick 2-line note is enough. No forms, no formalities." },
    { n:"04", icon:"◉", title:"Connect & Grow",     desc:"Join via the meeting link. Ask anything. Every conversation is private and confidential." },
  ];
  return (
    <div style={{ marginBottom: 72 }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 10px" }}>Simple by design</p>
        <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", margin: 0, lineHeight: 0.9 }}>How it works</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 2 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ position: "relative", padding: "28px 24px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Step number watermark */}
            <div style={{ fontFamily: "'Georgia',serif", fontSize: 64, fontWeight: 900, lineHeight: 1,
              color: "rgba(255,255,255,0.04)", position: "absolute", top: 16, right: 18, userSelect: "none" }}>
              {s.n}
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 12, marginBottom: 16,
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {s.icon}
            </div>
            <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{s.title}</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            {/* Connector arrow */}
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)",
                zIndex: 2, fontSize: 16, color: "rgba(255,255,255,0.12)", fontWeight: 900 }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function MentorshipPage() {
  const [activeExpertise, setExpertise] = useState("All");
  const [showAvailableOnly, setAvailOnly] = useState(false);
  const [search, setSearch]           = useState("");
  const [bookingMentor, setBooking]   = useState(null);

  const filtered = MENTORS.filter(m => {
    const matchE = activeExpertise === "All" || m.expertise.includes(activeExpertise);
    const matchA = !showAvailableOnly || m.available;
    const matchS = !search || m.name.toLowerCase().includes(search.toLowerCase())
      || m.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
      || m.disability.toLowerCase().includes(search.toLowerCase());
    return matchE && matchA && matchS;
  });

  return (
    <div style={{ background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)",
      minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      <div style={{ position: "fixed", inset: 0, zIndex: -1,
        background: "linear-gradient(160deg,#060c1a 0%,#0a1628 40%,#0d1e3a 75%,#060c1a 100%)" }} />

      <style>{`
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.25)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .fu0{animation:fadeUp 0.6s ease 0.05s forwards;opacity:0}
        .fu1{animation:fadeUp 0.6s ease 0.2s forwards;opacity:0}
        .fu2{animation:fadeUp 0.6s ease 0.35s forwards;opacity:0}
        .fu3{animation:fadeUp 0.6s ease 0.5s forwards;opacity:0}
        .floatY{animation:floatY 3s ease-in-out infinite}
        input::placeholder{color:rgba(255,255,255,0.25)!important}
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
        <div style={{ position: "absolute", top: "5%", left: "10%", width: 600, height: 600, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: 480, height: 480, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle,rgba(8,145,178,0.07) 0%,transparent 70%)" }} />
      </div>

      {bookingMentor && <BookingModal mentor={bookingMentor} onClose={() => setBooking(null)} />}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* ══════════ HERO ══════════ */}
        <section style={{ padding: "60px 0 52px", textAlign: "center" }}>

          {/* pill */}
          <div className="fu0" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px",
            borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: "system-ui,sans-serif", marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa" }} />
            EmpowerAble · Learn · Mentorship
          </div>

          <h1 className="fu1" style={{ fontFamily: "'Georgia',serif",
            fontSize: "clamp(52px,9vw,130px)", fontWeight: 900,
            lineHeight: 0.85, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 12px" }}>
            FIND YOUR
            <br />
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)", color: "transparent" }}>MENTOR.</span>
          </h1>

          <p className="fu2" style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(255,255,255,0.4)",
            maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.7, fontFamily: "system-ui,sans-serif" }}>
            One-on-one sessions with disabled professionals who've been where you are.
            Real guidance. No jargon. Always free.
          </p>

          {/* Search bar */}
          <div className="fu3" style={{ maxWidth: 580, margin: "0 auto 48px" }}>
            <div style={{ display: "flex", borderRadius: 14, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", paddingLeft: 18, flexShrink: 0 }}>
                <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, skill, or disability type…"
                style={{ flex: 1, padding: "15px 14px", background: "transparent", border: "none",
                  color: "#fff", fontSize: 14, fontFamily: "system-ui,sans-serif", outline: "none" }} />
              {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", paddingRight: 14, fontSize: 16 }}>×</button>}
            </div>
          </div>

          {/* Stats */}
          <div className="fu3" style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {STATS.map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 6, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="floatY" style={{ marginTop: 52, opacity: 0.25 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </section>

        {/* ══════════ HOW IT WORKS ══════════ */}
        <HowItWorks />

        {/* ══════════ MENTOR BROWSER ══════════ */}
        <section style={{ marginBottom: 80 }}>

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 8px" }}>◈ Meet the community</p>
              <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(34px,5vw,72px)", fontWeight: 900,
                letterSpacing: "-0.03em", color: "#fff", lineHeight: 0.88, margin: 0 }}>
                OUR<br/>MENTORS
              </h2>
            </div>
            {/* Available toggle */}
            <button onClick={() => setAvailOnly(p => !p)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 100,
                fontSize: 13, fontWeight: 700, fontFamily: "system-ui,sans-serif", cursor: "pointer",
                transition: "all 0.2s",
                background: showAvailableOnly ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
                border: showAvailableOnly ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.09)",
                color: showAvailableOnly ? "#86efac" : "rgba(255,255,255,0.45)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: showAvailableOnly ? "#4ade80" : "rgba(255,255,255,0.2)", transition: "background 0.2s" }} />
              Available now only
            </button>
          </div>

          {/* Expertise filter pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {EXPERTISE_AREAS.map(e => (
              <button key={e} onClick={() => setExpertise(e)}
                style={{ padding: "9px 17px", borderRadius: 100, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", fontFamily: "system-ui,sans-serif", whiteSpace: "nowrap",
                  transition: "all 0.18s",
                  background: activeExpertise === e ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.04)",
                  color: activeExpertise === e ? "#0a1628" : "rgba(255,255,255,0.45)",
                  border: activeExpertise === e ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                {e}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif", marginBottom: 20 }}>
            {filtered.length} mentor{filtered.length !== 1 ? "s" : ""}
            {search && <span> matching "<span style={{ color: "rgba(255,255,255,0.5)" }}>{search}</span>"</span>}
          </div>

          {/* Mentor grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>◈</div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif" }}>No mentors match your filters.</p>
              <button onClick={() => { setSearch(""); setExpertise("All"); setAvailOnly(false); }}
                style={{ marginTop: 10, background: "none", border: "none", color: "rgba(255,255,255,0.35)",
                  cursor: "pointer", textDecoration: "underline", fontSize: 13, fontFamily: "system-ui,sans-serif" }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 18 }}>
              {filtered.map(m => <MentorCard key={m.id} m={m} onBook={setBooking} />)}
            </div>
          )}
        </section>

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 8px" }}>Real conversations</p>
            <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900,
              color: "#fff", letterSpacing: "-0.025em", margin: 0 }}>What mentees say</h2>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ flex: "1 1 280px", borderRadius: 16, padding: "24px 26px",
                background: "#080f20", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 32, color: `${t.accent}44`, fontFamily: "'Georgia',serif",
                  lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ fontFamily: "'Georgia',serif", fontSize: 14, color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.75, margin: "0 0 18px", fontStyle: "italic" }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14,
                  borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: t.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "system-ui,sans-serif" }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif" }}>Session with {t.mentor}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ BECOME A MENTOR CTA ══════════ */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ borderRadius: 28, position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg,#1e1b4b 0%,#3730a3 40%,#6d28d9 80%,#7e22ce 100%)",
            padding: "60px 56px", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 32, flexWrap: "wrap",
            border: "1px solid rgba(139,92,246,0.25)" }}>
            <div style={{ position: "absolute", top: -60, right: 120, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, right: 30, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 12px" }}>◆ Share your journey</p>
              <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,56px)", fontWeight: 900,
                color: "#fff", lineHeight: 0.9, letterSpacing: "-0.025em", margin: "0 0 16px" }}>
                BECOME A<br/>MENTOR.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, fontFamily: "system-ui,sans-serif",
                margin: 0, maxWidth: 400, lineHeight: 1.65 }}>
                Your experience — career pivots, legal battles, diagnoses, athletic wins — can change someone's life. Apply to join our mentor community.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", flexShrink: 0 }}>
              <button style={{ padding: "16px 40px", borderRadius: 100, fontSize: 16, fontWeight: 800,
                fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "#fff",
                color: "#1e1b4b", border: "none", transition: "transform 0.2s, opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Apply to Mentor →
              </button>
              <button style={{ padding: "14px 40px", borderRadius: 100, fontSize: 15, fontWeight: 700,
                fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "transparent",
                color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.18)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                Learn how mentoring works
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER WATERMARK ── */}
        <section style={{ textAlign: "center", paddingBottom: 80, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 56 }}>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(48px,8vw,110px)", fontWeight: 900,
            letterSpacing: "-0.04em", color: "rgba(255,255,255,0.04)", lineHeight: 0.85, userSelect: "none" }}>
            EMPOWERABLE
          </div>
          <p style={{ color: "rgba(255,255,255,0.14)", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "system-ui,sans-serif", marginTop: -16 }}>
            Guide · Grow · Connect
          </p>
        </section>

      </div>
    </div>
  );
}