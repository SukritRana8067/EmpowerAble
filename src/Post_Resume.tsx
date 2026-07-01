import { useState, useRef, useEffect } from "react";

/* ──────────────── STARS ──────────────── */
const STARS = Array.from({ length: 110 }, (_, i) => ({
  id: i, top: Math.random() * 100, left: Math.random() * 100,
  size: Math.random() * 2.2 + 0.5, op: Math.random() * 0.6 + 0.1,
  dur: Math.random() * 4 + 2, delay: Math.random() * 4,
}));

/* ──────────────── CONSTANTS ──────────────── */
const SKILL_OPTIONS = [
  "Microsoft Excel", "Data Entry", "Python", "SQL", "Customer Support",
  "Digital Marketing", "Content Writing", "Tally", "Salesforce CRM",
  "Manual Testing", "WCAG / Accessibility", "Payroll Management",
  "Accounting", "Email Support", "Java", "Graphic Design",
  "Power BI", "SAP", "HR Operations", "Inventory Management",
];
const DISABILITY_TYPES = [
  "Visually Impaired", "Hearing Impaired", "Mobility / Orthopedic",
  "Cerebral Palsy", "Autism Spectrum", "Intellectual Disability",
  "Speech & Language", "Chronic Illness", "Prefer not to say",
];
const WORK_MODES  = ["Remote", "Hybrid", "On-site", "Open to All"];
const JOB_TYPES   = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const EXP_LEVELS  = ["Fresher (0 yrs)", "0–1 yr", "1–3 yrs", "3–5 yrs", "5+ yrs"];
const LOCATIONS   = ["Bangalore", "Mumbai", "Delhi / NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Anywhere in India"];
const CATEGORIES  = ["Technology & IT", "Customer Service", "Finance & Accounting", "Back-Office Operations", "Digital Marketing", "Manufacturing & Ops", "HR & Admin", "Healthcare Support"];

const STEPS = [
  { id: 1, label: "Personal Info",   icon: "◈", desc: "Basic details & contact" },
  { id: 2, label: "Skills",          icon: "⬡", desc: "What you bring to the table" },
  { id: 3, label: "Disability Info", icon: "◆", desc: "Helps us match better roles" },
  { id: 4, label: "Preferences",     icon: "◉", desc: "Your ideal work setup" },
  { id: 5, label: "Upload & Review", icon: "★", desc: "Final review & submit" },
];

const TRUSTED_LOGOS = [
  { name: "Infosys BPM", initials: "IB", accent: "#4f46e5" },
  { name: "HDFC Bank",   initials: "HD", accent: "#0f766e" },
  { name: "Amazon",      initials: "AM", accent: "#0891b2" },
  { name: "Accenture",   initials: "AC", accent: "#be123c" },
  { name: "TCS",         initials: "TC", accent: "#6d28d9" },
  { name: "Wipro BPS",   initials: "WB", accent: "#92400e" },
];

/* ─── AI SCAN CHECKS ─── */
const AI_CHECKS = [
  { id: "bio",        label: "Analysing professional bio",           dur: 900  },
  { id: "skills",     label: "Matching skills to market demand",     dur: 1100 },
  { id: "disability", label: "Verifying accessibility preferences",  dur: 800  },
  { id: "prefs",      label: "Checking job preference alignment",    dur: 950  },
  { id: "grammar",    label: "Running language & grammar check",     dur: 700  },
  { id: "match",      label: "Scoring employer compatibility",       dur: 1200 },
  { id: "ats",        label: "ATS keyword optimisation scan",        dur: 1050 },
  { id: "complete",   label: "Generating recommendations",           dur: 600  },
];

/* ─── AI RECOMMENDATIONS ─── */
function buildRecs(merged) {
  const recs = [];
  if (!merged.bio || merged.bio.length < 60)
    recs.push({ type: "warning", icon: "✍", title: "Strengthen Your Bio",        body: "Add 2–3 sentences about your strengths and career goals. Profiles with a 80+ character bio receive 2× more recruiter views.", field: "Bio" });
  if ((merged.skills || []).length < 5)
    recs.push({ type: "warning", icon: "⬡", title: "Add More Skills",             body: "You've listed fewer than 5 skills. Candidates with 8+ skills are matched to 60% more job openings. Try adding Excel, Communication or relevant tools.", field: "Skills" });
  if (!merged.udid)
    recs.push({ type: "tip",     icon: "🔖", title: "Upload UDID Certificate",    body: "Adding your UDID number unlocks reserved-category roles and doubles interview callbacks from government & PSU employers.", field: "Disability Info" });
  if (!(merged.workModes || []).length)
    recs.push({ type: "warning", icon: "◉", title: "Set Work Mode Preferences",  body: "Specifying remote/hybrid preference helps filter roles that suit your accessibility needs. Remote roles have 3× more PwD openings.", field: "Preferences" });
  if (!merged.salary)
    recs.push({ type: "tip",     icon: "◇", title: "Add Expected Salary",        body: "Profiles with a salary range get prioritised in employer searches. It also helps ensure you're not matched to underpaying roles.", field: "Preferences" });
  if ((merged.accommodations || []).length === 0)
    recs.push({ type: "tip",     icon: "♿", title: "Specify Accommodations",     body: "Let employers know what you need — screen reader, flexible hours, wheelchair access. This ensures only the right roles reach you.", field: "Disability Info" });
  recs.push({ type: "success", icon: "✓", title: "Profile Looks Good", body: "Your contact info and location are complete. Recruiters can reach you directly. Keep your phone notifications on!", field: "Personal Info" });
  return recs;
}

/* ──────────────── SMALL HELPERS ──────────────── */
function Label({ children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)",
      fontFamily: "system-ui,sans-serif", letterSpacing: "0.07em",
      textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );
}

function FInput({ placeholder, value, onChange, type = "text" }) {
  const [focus, setFocus] = useState(false);
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px",
        borderRadius: 10, fontSize: 14, fontFamily: "system-ui,sans-serif",
        background: "rgba(255,255,255,0.05)",
        border: focus ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.1)",
        color: "#fff", outline: "none", transition: "border 0.18s" }} />
  );
}

function FSelect({ value, onChange, options, placeholder }) {
  const [focus, setFocus] = useState(false);
  return (
    <select value={value} onChange={onChange}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px",
        borderRadius: 10, fontSize: 14, fontFamily: "system-ui,sans-serif",
        background: "#0d1e3a",
        border: focus ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.1)",
        color: value ? "#fff" : "rgba(255,255,255,0.3)", outline: "none",
        cursor: "pointer", transition: "border 0.18s", appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "calc(100% - 14px) center" }}>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o} style={{ background: "#0d1e3a", color: "#fff" }}>{o}</option>)}
    </select>
  );
}

function ToggleChip({ label, selected, onClick, accent = "#7c3aed" }) {
  return (
    <button onClick={onClick}
      style={{ padding: "8px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700,
        fontFamily: "system-ui,sans-serif", cursor: "pointer", transition: "all 0.18s",
        background: selected ? `${accent}33` : "rgba(255,255,255,0.04)",
        border: selected ? `1px solid ${accent}88` : "1px solid rgba(255,255,255,0.1)",
        color: selected ? "#fff" : "rgba(255,255,255,0.45)" }}>
      {selected && <span style={{ marginRight: 5, fontSize: 10 }}>✓</span>}
      {label}
    </button>
  );
}

/* ──────────────── STEP PROGRESS BAR ──────────────── */
function StepBar({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 52 }}>
      {STEPS.map((s, i) => {
        const done   = s.id < current;
        const active = s.id === current;
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: done ? 14 : 16, fontWeight: 800, transition: "all 0.3s",
                background: done ? "#7c3aed" : active ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                border: done ? "2px solid #7c3aed" : active ? "2px solid rgba(124,58,237,0.8)" : "2px solid rgba(255,255,255,0.1)",
                color: done ? "#fff" : active ? "#a78bfa" : "rgba(255,255,255,0.25)" }}>
                {done ? "✓" : s.icon}
              </div>
              <div style={{ fontSize: 10, fontWeight: active ? 800 : 500, whiteSpace: "nowrap",
                fontFamily: "system-ui,sans-serif", letterSpacing: "0.04em",
                color: active ? "#fff" : done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}>
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, marginBottom: 22, marginLeft: 4, marginRight: 4,
                background: done ? "#7c3aed" : "rgba(255,255,255,0.07)", transition: "background 0.3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────── SECTION HEADING ──────────────── */
function SectionHeading({ icon, accent, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0,
        background: `${accent}22`, border: `1px solid ${accent}44`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
      <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900,
        color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>{children}</h2>
    </div>
  );
}

/* ──────────────── STEPS 1–5 ──────────────── */
function Step1({ data, setData }) {
  const set = (k, v) => setData(p => ({ ...p, [k]: v }));
  return (
    <div>
      <SectionHeading icon="◈" accent="#4f46e5">Personal Information</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div><Label>First Name (required)</Label><FInput placeholder="Priya" value={data.firstName} onChange={e => set("firstName", e.target.value)} /></div>
        <div><Label>Last Name (required)</Label><FInput placeholder="Sharma" value={data.lastName} onChange={e => set("lastName", e.target.value)} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div><Label>Email Address (required)</Label><FInput placeholder="priya@email.com" type="email" value={data.email} onChange={e => set("email", e.target.value)} /></div>
        <div><Label>Phone Number (required)</Label><FInput placeholder="+91 98765 43210" type="tel" value={data.phone} onChange={e => set("phone", e.target.value)} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div><Label>City / Location (required)</Label><FSelect placeholder="Select city" value={data.city} onChange={e => set("city", e.target.value)} options={LOCATIONS} /></div>
        <div><Label>Experience Level (required)</Label><FSelect placeholder="Select experience" value={data.exp} onChange={e => set("exp", e.target.value)} options={EXP_LEVELS} /></div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Label>Current / Desired Job Title</Label>
        <FInput placeholder="e.g. Data Entry Executive, Software Tester" value={data.jobTitle} onChange={e => set("jobTitle", e.target.value)} />
      </div>
      <div>
        <Label>Short Bio (optional)</Label>
        <textarea placeholder="Tell employers about yourself, your strengths, and what kind of role you're looking for..."
          value={data.bio} onChange={e => set("bio", e.target.value)}
          style={{ width: "100%", boxSizing: "border-box", minHeight: 100, padding: "12px 16px",
            borderRadius: 10, fontSize: 14, fontFamily: "system-ui,sans-serif", resize: "vertical",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", outline: "none", lineHeight: 1.6 }} />
      </div>
    </div>
  );
}

function Step2({ data, setData }) {
  const [custom, setCustom] = useState("");
  const toggle = skill => setData(p => ({
    ...p, skills: p.skills.includes(skill) ? p.skills.filter(s => s !== skill) : [...p.skills, skill],
  }));
  const addCustom = () => {
    const t = custom.trim();
    if (t && !data.skills.includes(t)) { setData(p => ({ ...p, skills: [...p.skills, t] })); setCustom(""); }
  };
  const ACCENT_MAP = { "Python": "#4f46e5", "SQL": "#0891b2", "Java": "#be123c", "Power BI": "#0f766e", "SAP": "#6d28d9", "Salesforce CRM": "#0891b2", "WCAG / Accessibility": "#4f46e5" };
  return (
    <div>
      <SectionHeading icon="⬡" accent="#0891b2">Skills & Expertise</SectionHeading>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif", lineHeight: 1.6, marginBottom: 24 }}>
        Select all skills that apply. These help match you to the right roles.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
        {SKILL_OPTIONS.map(s => <ToggleChip key={s} label={s} selected={data.skills.includes(s)} onClick={() => toggle(s)} accent={ACCENT_MAP[s] || "#7c3aed"} />)}
      </div>
      <div style={{ marginBottom: 20 }}>
        <Label>Add a custom skill</Label>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustom()}
            placeholder="Type a skill and press Enter or Add"
            style={{ flex: 1, padding: "12px 16px", borderRadius: 10, fontSize: 14, fontFamily: "system-ui,sans-serif",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", outline: "none" }} />
          <button onClick={addCustom}
            style={{ padding: "12px 22px", borderRadius: 10, fontSize: 13, fontWeight: 800, fontFamily: "system-ui,sans-serif",
              cursor: "pointer", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa", transition: "all 0.18s" }}>
            + Add
          </button>
        </div>
      </div>
      {data.skills.length > 0 && (
        <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {data.skills.length} skill{data.skills.length !== 1 ? "s" : ""} selected
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.skills.map(s => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.35)", color: "#c4b5fd", fontSize: 12, padding: "4px 12px", borderRadius: 20, fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>
                {s}<span onClick={() => toggle(s)} style={{ cursor: "pointer", fontSize: 14, color: "rgba(196,181,253,0.5)", lineHeight: 1 }}>×</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step3({ data, setData }) {
  const set = (k, v) => setData(p => ({ ...p, [k]: v }));
  return (
    <div>
      <SectionHeading icon="◆" accent="#0f766e">Disability & Accessibility</SectionHeading>
      <div style={{ display: "flex", gap: 12, padding: "14px 18px", borderRadius: 12, background: "rgba(8,145,178,0.08)", border: "1px solid rgba(8,145,178,0.2)", marginBottom: 32 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif", lineHeight: 1.65, margin: 0 }}>
          This information is <strong style={{ color: "rgba(255,255,255,0.7)" }}>only shared with employers you apply to</strong>, and helps match you with roles that have the right accommodations.
        </p>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Label>Type of Disability (required)</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {DISABILITY_TYPES.map(d => <ToggleChip key={d} label={d} selected={data.disabilityType === d} onClick={() => set("disabilityType", d)} accent="#0f766e" />)}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Label>Disability Certificate Number (optional)</Label>
        <FInput placeholder="e.g. UDID-XX-XXXXX-XXXX" value={data.udid} onChange={e => set("udid", e.target.value)} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", marginTop: 6 }}>
          Providing UDID helps employers verify eligibility for reserved-category roles.
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Label>Percentage of Disability (if known)</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <input type="range" min={0} max={100} step={5} value={data.disabilityPct} onChange={e => set("disabilityPct", Number(e.target.value))}
            style={{ flex: 1, accentColor: "#0f766e", cursor: "pointer" }} />
          <div style={{ minWidth: 48, textAlign: "center", fontFamily: "'Georgia',serif", fontSize: 18, fontWeight: 900, color: "#fff" }}>{data.disabilityPct}%</div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Label>Workplace Accommodations Needed (optional)</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["Screen Reader Software", "Sign Language Interpreter", "Wheelchair Access", "Flexible Work Hours", "Remote / WFH", "Ergonomic Setup", "None Required"].map(a => (
            <ToggleChip key={a} label={a} selected={(data.accommodations || []).includes(a)}
              onClick={() => setData(p => ({ ...p, accommodations: (p.accommodations || []).includes(a) ? (p.accommodations || []).filter(x => x !== a) : [...(p.accommodations || []), a] }))}
              accent="#0891b2" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data, setData }) {
  const set = (k, v) => setData(p => ({ ...p, [k]: v }));
  const toggleArr = (k, v) => setData(p => ({ ...p, [k]: (p[k] || []).includes(v) ? (p[k] || []).filter(x => x !== v) : [...(p[k] || []), v] }));
  return (
    <div>
      <SectionHeading icon="◉" accent="#be123c">Job Preferences</SectionHeading>
      <div style={{ marginBottom: 28 }}>
        <Label>Preferred Work Mode</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {WORK_MODES.map(m => <ToggleChip key={m} label={m} selected={(data.workModes || []).includes(m)} onClick={() => toggleArr("workModes", m)} accent="#be123c" />)}
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <Label>Job Type</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {JOB_TYPES.map(t => <ToggleChip key={t} label={t} selected={(data.jobTypes || []).includes(t)} onClick={() => toggleArr("jobTypes", t)} accent="#6d28d9" />)}
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <Label>Preferred Job Categories</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {CATEGORIES.map(c => <ToggleChip key={c} label={c} selected={(data.categories || []).includes(c)} onClick={() => toggleArr("categories", c)} accent="#0891b2" />)}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div><Label>Preferred Location</Label><FSelect placeholder="Select location" value={data.prefLocation} onChange={e => set("prefLocation", e.target.value)} options={LOCATIONS} /></div>
        <div><Label>Expected Salary (LPA)</Label><FSelect placeholder="Select range" value={data.salary} onChange={e => set("salary", e.target.value)} options={["Below ₹2 LPA", "₹2–4 LPA", "₹4–6 LPA", "₹6–9 LPA", "₹9–12 LPA", "₹12+ LPA"]} /></div>
      </div>
      <div>
        <Label>Open to Immediate Joining?</Label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Yes — immediately", "Within 15 days", "Within 30 days", "Need 60+ days"].map(o => (
            <ToggleChip key={o} label={o} selected={data.joining === o} onClick={() => set("joining", o)} accent="#0f766e" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step5({ pdata }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const handleDrop = e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); };
  const rows = [
    { label: "Name",       value: `${pdata.firstName || "—"} ${pdata.lastName || ""}`.trim() || "—" },
    { label: "Email",      value: pdata.email || "—" },
    { label: "Phone",      value: pdata.phone || "—" },
    { label: "Location",   value: pdata.city || "—" },
    { label: "Experience", value: pdata.exp || "—" },
    { label: "Job Title",  value: pdata.jobTitle || "—" },
    { label: "Skills",     value: (pdata.skills || []).length > 0 ? `${pdata.skills.length} selected` : "—" },
    { label: "Disability", value: pdata.disabilityType || "—" },
    { label: "Work Mode",  value: (pdata.workModes || []).join(", ") || "—" },
    { label: "Salary",     value: pdata.salary || "—" },
  ];
  return (
    <div>
      <SectionHeading icon="★" accent="#f59e0b">Upload Resume & Review</SectionHeading>
      <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
        onClick={() => fileRef.current.click()}
        style={{ borderRadius: 16, padding: "36px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.22s", marginBottom: 32,
          background: dragging ? "rgba(124,58,237,0.12)" : file ? "rgba(15,118,110,0.08)" : "rgba(255,255,255,0.025)",
          border: dragging ? "2px dashed rgba(124,58,237,0.7)" : file ? "2px dashed rgba(15,118,110,0.5)" : "2px dashed rgba(255,255,255,0.1)" }}>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
        {file ? (
          <>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📄</div>
            <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{file.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif" }}>{(file.size / 1024).toFixed(0)} KB · Click to change</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.4 }}>⬆</div>
            <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>Drag & drop your resume here</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif", marginBottom: 14 }}>PDF, DOC, or DOCX · max 5 MB</div>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "system-ui,sans-serif", color: "#a78bfa", padding: "6px 18px", borderRadius: 100, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>Browse Files</span>
          </>
        )}
      </div>
      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif", letterSpacing: "0.07em", textTransform: "uppercase" }}>Profile Summary</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>{r.label}</span>
            <span style={{ fontSize: 13, color: r.value === "—" ? "rgba(255,255,255,0.2)" : "#fff", fontFamily: "system-ui,sans-serif", maxWidth: "60%", textAlign: "right" }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   AI SCANNING SCREEN
────────────────────────────────────────────────── */
function AIScanScreen({ onDone }) {
  const [completedChecks, setCompleted] = useState([]);
  const [currentIdx, setCurrentIdx]     = useState(0);
  const [scanDone, setScanDone]         = useState(false);
  const [progress, setProgress]         = useState(0);

  useEffect(() => {
    let idx = 0;
    let elapsed = 0;
    const total = AI_CHECKS.reduce((s, c) => s + c.dur, 0);

    const runCheck = () => {
      if (idx >= AI_CHECKS.length) { setScanDone(true); setProgress(100); setTimeout(onDone, 900); return; }
      setCurrentIdx(idx);
      const dur = AI_CHECKS[idx].dur;
      const tickMs = 40;
      let ticked = 0;
      const ticker = setInterval(() => {
        ticked += tickMs;
        elapsed += tickMs;
        setProgress(Math.min(99, Math.round((elapsed / total) * 100)));
        if (ticked >= dur) { clearInterval(ticker); setCompleted(p => [...p, AI_CHECKS[idx].id]); idx++; runCheck(); }
      }, tickMs);
    };
    runCheck();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px 20px 60px" }}>
      <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 36px", isolation: "isolate" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", inset: -i * 20, borderRadius: "50%",
            border: `1px solid rgba(124,58,237,${0.3 - i * 0.08})`,
            pointerEvents: "none",
            animation: `pulseRing 2.2s ease-out ${i * 0.55}s infinite` }} />
        ))}
        <div style={{ width: 120, height: 120, borderRadius: "50%", position: "relative",
          background: "linear-gradient(135deg,#4f46e5,#7c3aed,#0891b2)",
          boxShadow: "0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(8,145,178,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 38, animation: scanDone ? "none" : "spinSlow 3s linear infinite" }}>
            {scanDone ? "✓" : "◈"}
          </div>
        </div>
      </div>
      <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 900,
        color: "#fff", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
        {scanDone ? "Analysis Complete!" : "AI Reviewing Your Profile"}
      </h2>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif", marginBottom: 36 }}>
        {scanDone ? "Preparing your personalised recommendations…" : "Running a full profile check to maximise your chances of getting hired."}
      </p>
      <div style={{ maxWidth: 480, margin: "0 auto 36px", borderRadius: 99,
        height: 6, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 99, transition: "width 0.1s linear",
          background: "linear-gradient(90deg,#4f46e5,#7c3aed,#0891b2)",
          width: `${progress}%`, boxShadow: "0 0 12px rgba(124,58,237,0.6)" }} />
      </div>
      <div style={{ maxWidth: 420, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {AI_CHECKS.map((c, i) => {
          const done    = completedChecks.includes(c.id);
          const running = currentIdx === i && !done;
          return (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
              borderRadius: 10, transition: "all 0.3s",
              background: done ? "rgba(15,118,110,0.1)" : running ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.02)",
              border: done ? "1px solid rgba(15,118,110,0.25)" : running ? "1px solid rgba(124,58,237,0.28)" : "1px solid rgba(255,255,255,0.05)",
              opacity: i > currentIdx + 1 ? 0.35 : 1 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800,
                background: done ? "rgba(15,118,110,0.3)" : running ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.05)",
                border: done ? "1px solid rgba(15,118,110,0.5)" : running ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.1)",
                color: done ? "#34d399" : running ? "#a78bfa" : "rgba(255,255,255,0.2)",
                animation: running ? "pulseOpacity 1s ease-in-out infinite" : "none" }}>
                {done ? "✓" : running ? "◈" : "○"}
              </div>
              <span style={{ fontSize: 13, fontFamily: "system-ui,sans-serif", fontWeight: done || running ? 700 : 400,
                color: done ? "#6ee7b7" : running ? "#c4b5fd" : "rgba(255,255,255,0.3)" }}>
                {c.label}
              </span>
              {running && (
                <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "#a78bfa",
                      animation: `dotBounce 0.8s ease-in-out ${d * 0.15}s infinite` }} />
                  ))}
                </div>
              )}
              {done && <span style={{ marginLeft: "auto", fontSize: 11, color: "#34d399", fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>Done</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   AI RECOMMENDATIONS SCREEN
────────────────────────────────────────────────── */
function AIRecommendationsScreen({ merged, onAccept, onSubmitAnyway }) {
  const recs = buildRecs(merged);
  const warnings  = recs.filter(r => r.type === "warning");
  const tips      = recs.filter(r => r.type === "tip");
  const successes = recs.filter(r => r.type === "success");

  const scoreBase = 55
    + (merged.bio?.length > 60 ? 10 : 0)
    + ((merged.skills || []).length >= 5 ? 12 : 0)
    + (merged.udid ? 8 : 0)
    + ((merged.workModes || []).length ? 8 : 0)
    + (merged.salary ? 7 : 0);
  const score = Math.min(100, scoreBase);
  const scoreColor = score >= 80 ? "#34d399" : score >= 60 ? "#facc15" : "#f87171";

  const RecCard = ({ rec }) => {
    const cols = {
      warning: { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.22)",  iconBg: "rgba(239,68,68,0.15)",  iconC: "#f87171",  label: "Fix suggested" },
      tip:     { bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.22)", iconBg: "rgba(251,191,36,0.12)", iconC: "#fbbf24",  label: "Pro tip" },
      success: { bg: "rgba(15,118,110,0.08)", border: "rgba(15,118,110,0.22)", iconBg: "rgba(15,118,110,0.15)", iconC: "#34d399",  label: "Looks great" },
    };
    const c = cols[rec.type];
    return (
      <div style={{ borderRadius: 14, padding: "18px 20px", background: c.bg, border: `1px solid ${c.border}` }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: c.iconBg,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{rec.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, fontWeight: 800, color: "#fff" }}>{rec.title}</span>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "system-ui,sans-serif",
                fontWeight: 700, background: c.iconBg, color: c.iconC }}>{c.label}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif", marginLeft: "auto" }}>→ {rec.field}</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif", lineHeight: 1.65, margin: 0 }}>{rec.body}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0,
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 24,
          boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}>◈</div>
        <div>
          <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 900,
            color: "#fff", margin: "0 0 4px", letterSpacing: "-0.02em" }}>AI Profile Recommendations</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif", margin: 0 }}>
            Based on analysis of 10,000+ successful PwD profiles
          </p>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center", flexShrink: 0,
          padding: "12px 20px", borderRadius: 14, background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontFamily: "'Georgia',serif", fontSize: 32, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Profile Score</div>
        </div>
      </div>

      <div style={{ marginBottom: 32, padding: "16px 20px", borderRadius: 12,
        background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif", fontWeight: 700 }}>Profile Completeness</span>
          <span style={{ fontSize: 12, color: scoreColor, fontFamily: "system-ui,sans-serif", fontWeight: 800 }}>{score}/100</span>
        </div>
        <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.07)" }}>
          <div style={{ height: "100%", borderRadius: 99, width: `${score}%`, transition: "width 1s ease",
            background: score >= 80 ? "linear-gradient(90deg,#059669,#34d399)" : score >= 60 ? "linear-gradient(90deg,#d97706,#facc15)" : "linear-gradient(90deg,#b91c1c,#f87171)",
            boxShadow: `0 0 12px ${scoreColor}66` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "system-ui,sans-serif" }}>0</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "system-ui,sans-serif" }}>Apply improvements to reach 100</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "system-ui,sans-serif" }}>100</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {warnings.length > 0 && (
          <>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
              ✕ {warnings.length} fix{warnings.length !== 1 ? "es" : ""} suggested
            </div>
            {warnings.map((r, i) => <RecCard key={i} rec={r} />)}
          </>
        )}
        {tips.length > 0 && (
          <>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>
              ✦ {tips.length} pro tip{tips.length !== 1 ? "s" : ""}
            </div>
            {tips.map((r, i) => <RecCard key={i} rec={r} />)}
          </>
        )}
        {successes.map((r, i) => <RecCard key={i} rec={r} />)}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <button onClick={onSubmitAnyway}
          style={{ padding: "13px 28px", borderRadius: 100, fontSize: 13, fontWeight: 800,
            fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "transparent",
            color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}>
          Submit anyway
        </button>
        <button onClick={onAccept}
          style={{ padding: "13px 32px", borderRadius: 100, fontSize: 13, fontWeight: 800,
            fontFamily: "system-ui,sans-serif", cursor: "pointer", border: "none",
            background: "linear-gradient(135deg,#7c3aed,#0891b2)", color: "#fff",
            boxShadow: "0 0 24px rgba(124,58,237,0.4)", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          ✓ Apply suggestions & go back to edit
        </button>
      </div>
    </div>
  );
}

/* ──────────────── SUCCESS SCREEN ──────────────── */
function SuccessScreen({ name }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px",
        background: "rgba(15,118,110,0.2)", border: "2px solid rgba(15,118,110,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>✓</div>
      <h2 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 900,
        color: "#fff", letterSpacing: "-0.025em", margin: "0 0 14px" }}>Resume Posted!</h2>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui,sans-serif",
        lineHeight: 1.7, maxWidth: 480, margin: "0 auto 36px" }}>
        {name ? `Great work, ${name}!` : "Great work!"} Your profile is now visible to 180+ inclusive employers. You'll get notified when a recruiter views your resume or a matching job is posted.
      </p>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Visible to employers like</div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          {TRUSTED_LOGOS.map(l => (
            <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, background: `${l.accent}15`, border: `1px solid ${l.accent}30` }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: l.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff", fontFamily: "system-ui,sans-serif" }}>{l.initials}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)", fontFamily: "system-ui,sans-serif" }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button style={{ padding: "14px 32px", borderRadius: 100, fontSize: 14, fontWeight: 800, fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "rgba(255,255,255,0.9)", color: "#060c1a", border: "none" }}>Browse Matching Jobs →</button>
        <button style={{ padding: "14px 28px", borderRadius: 100, fontSize: 14, fontWeight: 800, fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}>Edit Profile</button>
      </div>
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function PostResumePage() {
  const [step,    setStep]   = useState(1);
  const [screen,  setScreen] = useState("form"); // "form" | "scanning" | "recommendations" | "success"

  const [personal,   setPersonal]   = useState({ firstName: "", lastName: "", email: "", phone: "", city: "", exp: "", jobTitle: "", bio: "" });
  const [skillsData, setSkillsData] = useState({ skills: [] });
  const [disData,    setDisData]    = useState({ disabilityType: "", udid: "", disabilityPct: 40, accommodations: [] });
  const [prefData,   setPrefData]   = useState({ workModes: [], jobTypes: [], categories: [], prefLocation: "", salary: "", joining: "" });

  const merged = { ...personal, ...skillsData, ...disData, ...prefData };

  const goNext = () => {
    if (step < 5) setStep(s => s + 1);
    else setScreen("scanning");
  };

  const goBack = () => {
    if (screen === "recommendations") { setScreen("form"); }
    else if (step > 1) setStep(s => s - 1);
  };

  return (
    <div style={{ background: "linear-gradient(160deg,#060c1a 0%,#081424 40%,#0b1a30 75%,#060c1a 100%)", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      <style>{`
        @keyframes twinkle    { 0%,100%{opacity:var(--op)} 50%{opacity:calc(var(--op)*0.2)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseRing  { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.9);opacity:0} }
        @keyframes spinSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes dotBounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes pulseOpacity { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideIn    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* FIX: use animation-fill-mode "both" so the element starts invisible
           via the keyframe (not an inline style) and stays visible after.
           This prevents a transparent overlay from blocking button clicks. */
        .fu       { animation: fadeUp  0.5s  ease 0.05s both; }
        .step-in  { animation: slideIn 0.35s ease       both; }
        .ai-in    { animation: slideIn 0.5s  ease 0.1s  both; }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22) !important; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 4px; background: rgba(255,255,255,0.1); }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #7c3aed; cursor: pointer; box-shadow: 0 0 0 3px rgba(124,58,237,0.2); }
        select option { background: #0d1e3a; color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* STARFIELD */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {STARS.map(s => (
          <div key={s.id} style={{ position: "absolute", top: s.top + "%", left: s.left + "%",
            width: s.size, height: s.size, borderRadius: "50%", background: "#fff",
            "--op": s.op, opacity: s.op, animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
        <div style={{ position: "absolute", top: "15%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "3%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* HERO */}
        {(screen === "form" || screen === "recommendations") && (
          <section className="fu" style={{ padding: "52px 0 40px" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", position: "relative",
              background: "linear-gradient(135deg,#130d3b 0%,#1a1250 35%,#0a1628 70%,#041520 100%)",
              border: "1px solid rgba(139,92,246,0.16)", padding: "38px 52px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", margin: "0 0 10px" }}>EmpowerAble · Career</p>
                <h1 style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.025em", margin: "0 0 12px" }}>Post Your Resume.<br />Get Hired.</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", fontFamily: "system-ui,sans-serif", lineHeight: 1.65, maxWidth: 420, margin: 0 }}>Build your disability-inclusive profile in 5 simple steps. 180+ employers are actively hiring PwDs.</p>
              </div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[{ n: "180+", l: "Employers Hiring" }, { n: "5 min", l: "To Complete" }, { n: "Free", l: "Always" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BREADCRUMB */}
        {screen !== "success" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 12, fontFamily: "system-ui,sans-serif", color: "rgba(255,255,255,0.28)" }}>
            <span>Home</span>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Post Resume</span>
            {screen === "scanning" && <><span>/</span><span style={{ color: "rgba(139,92,246,0.9)" }}>AI Review</span></>}
            {screen === "recommendations" && <><span>/</span><span style={{ color: "rgba(139,92,246,0.9)" }}>Recommendations</span></>}
          </div>
        )}

        {/* SCANNING SCREEN */}
        {screen === "scanning" && (
          <div className="ai-in" style={{ borderRadius: 24, padding: "20px 40px 40px",
            background: "#080f20", border: "1px solid rgba(139,92,246,0.2)", marginBottom: 80 }}>
            <AIScanScreen onDone={() => setScreen("recommendations")} />
          </div>
        )}

        {/* RECOMMENDATIONS SCREEN */}
        {screen === "recommendations" && (
          <div className="ai-in" style={{ borderRadius: 24, padding: "36px 40px",
            background: "#080f20", border: "1px solid rgba(139,92,246,0.2)", marginBottom: 80 }}>
            <AIRecommendationsScreen
              merged={merged}
              onAccept={() => { setStep(1); setScreen("form"); }}
              onSubmitAnyway={() => setScreen("success")}
            />
          </div>
        )}

        {/* SUCCESS SCREEN */}
        {screen === "success" && <SuccessScreen name={personal.firstName} />}

        {/* FORM SCREEN */}
        {screen === "form" && (
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 28, paddingBottom: 80 }}>

            {/* LEFT SIDEBAR */}
            <div style={{ position: "sticky", top: 100, height: "fit-content" }}>
              <div style={{ borderRadius: 16, padding: "20px", marginBottom: 16, background: "#080f20", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Your Progress</div>
                {STEPS.map(s => {
                  const done   = s.id < step;
                  const active = s.id === step;
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, opacity: s.id > step ? 0.35 : 1, transition: "opacity 0.2s" }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginTop: 2,
                        background: done ? "#7c3aed" : active ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.04)",
                        border: done ? "2px solid #7c3aed" : active ? "2px solid rgba(124,58,237,0.6)" : "2px solid rgba(255,255,255,0.1)",
                        color: done ? "#fff" : active ? "#a78bfa" : "rgba(255,255,255,0.3)" }}>
                        {done ? "✓" : s.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, fontWeight: active ? 800 : 600, marginBottom: 2,
                          color: active ? "#fff" : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif" }}>{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ borderRadius: 14, padding: "18px 20px", background: "linear-gradient(135deg,rgba(124,58,237,0.1) 0%,rgba(8,145,178,0.06) 100%)", border: "1px solid rgba(124,58,237,0.18)" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#a78bfa", fontFamily: "system-ui,sans-serif", marginBottom: 10 }}>💡 Quick Tips</div>
                {["Use a professional photo if possible", "Add at least 5 skills to improve matches", "UDID certificate doubles your interview calls", "Remote roles get 3× more PwD applicants"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "rgba(167,139,250,0.5)", fontSize: 10, marginTop: 2, flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "system-ui,sans-serif", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM PANEL */}
            <div>
              <StepBar current={step} />
              {/* KEY FIX: no inline opacity:0 on this div — the .step-in class handles
                  the fade-in via animation-fill-mode:both so it never blocks clicks */}
              <div className="step-in" key={step} style={{ borderRadius: 20, padding: "36px 40px", background: "#080f20", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 20 }}>
                {step === 1 && <Step1 data={personal}   setData={setPersonal}   />}
                {step === 2 && <Step2 data={skillsData}  setData={setSkillsData} />}
                {step === 3 && <Step3 data={disData}     setData={setDisData}    />}
                {step === 4 && <Step4 data={prefData}    setData={setPrefData}   />}
                {step === 5 && <Step5 pdata={merged} />}
              </div>

              {/* NAV BUTTONS */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {step > 1 ? (
                  <button onClick={goBack}
                    style={{ padding: "12px 28px", borderRadius: 100, fontSize: 13, fontWeight: 800, fontFamily: "system-ui,sans-serif", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                    ← Back
                  </button>
                ) : <div />}

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {STEPS.map(s => (
                      <div key={s.id} style={{ width: s.id === step ? 18 : 6, height: 6, borderRadius: 3, transition: "all 0.25s",
                        background: s.id < step ? "#7c3aed" : s.id === step ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.12)" }} />
                    ))}
                  </div>

                  {step < 5 ? (
                    <button onClick={goNext}
                      style={{ padding: "12px 32px", borderRadius: 100, fontSize: 13, fontWeight: 800,
                        fontFamily: "system-ui,sans-serif", cursor: "pointer",
                        background: "rgba(255,255,255,0.92)", color: "#060c1a",
                        border: "none", transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                      Continue →
                    </button>
                  ) : (
                    <button onClick={goNext}
                      style={{ padding: "12px 36px", borderRadius: 100, fontSize: 13, fontWeight: 800,
                        fontFamily: "system-ui,sans-serif", cursor: "pointer", border: "none",
                        background: "linear-gradient(135deg,#7c3aed,#0891b2)", color: "#fff",
                        boxShadow: "0 0 24px rgba(124,58,237,0.4)", transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                      ◈ Run AI Review & Submit
                    </button>
                  )}
                </div>
              </div>

              {(step === 3 || step === 4) && (
                <div style={{ textAlign: "center", marginTop: 14 }}>
                  <button onClick={() => setStep(s => s + 1)}
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "system-ui,sans-serif", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    Skip this step for now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        {screen !== "success" && (
          <section style={{ textAlign: "center", paddingBottom: 80, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 56, marginTop: 20 }}>
            <div style={{ fontFamily: "'Georgia',serif", fontSize: "clamp(48px,8vw,108px)", fontWeight: 900, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.04)", lineHeight: 0.85, userSelect: "none" }}>EMPOWERABLE</div>
            <p style={{ color: "rgba(255,255,255,0.14)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", marginTop: -14 }}>Work · Dignity · Belonging</p>
          </section>
        )}
      </div>
    </div>
  );
}