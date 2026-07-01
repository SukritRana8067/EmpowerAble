import { useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NGO from "./NGO";
import Community from "./Community";
import Upskill from "./Upskill";
import ShopProducts from "./Shop_Products";
import SellProducts from "./Sell_products";
import Jobs from "./Browse_Jobs";
import PostResume from "./Post_Resume";
import ChatBotWidget from "./ChatbotWidget";
import MentorshipPage from "./mentorship";
import NewsSchemesPage from "./updates&schemes";

// ─── Dropdown data ───────────────────────────────────────────────────────────

const NAV_DROPDOWNS: Record<string, {
  icon: React.ReactNode;
  label: string;
  desc: string;
  to?: string;
}[]> = {
  Jobs: [
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Browse Jobs",
      desc: "Find roles suited for you",
      to: "/jobs",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: "Resume+",
      desc: "Let employers find you",
      to: "/resume",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      label: "Hiring Process",
      desc: "Hire people with desired skills",
    },
  ],

  Learn: [
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: "UpSkill Yourself",
      desc: "Learn at your own pace",
      to: "/upskill",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      ),
      label: "Workshops",
      desc: "Online workshops for upskilling and learning",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Mentorship",
      desc: "Connect with a mentor",
      to: "/mentorship",
    },
  ],

  Marketplace: [
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      label: "Shop Products",
      desc: "Buy the products you like",
      to: "/shop-products",
    },
    {
      icon: (
        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      label: "Sell Your Work",
      desc: "List services or products",
      to: "/sell-products",
    },
  ],
};

// ─── Reusable Dropdown Panel ──────────────────────────────────────────────────

function DropdownPanel({
  items,
  footerLabel,
}: {
  items: typeof NAV_DROPDOWNS[string];
  footerLabel: string;
}) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-1 z-50">
      <div
        className="w-72 rounded-2xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
        }}
      >
        <div
          className="rounded-2xl p-2 shadow-2xl"
          style={{
            background: "rgba(13, 13, 13, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="px-3 pt-2 pb-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-semibold">
              Browse
            </p>
          </div>

          <div className="flex flex-col gap-0.5">
            {items.map((item, i) =>
              item.to ? (
                <Link
                  key={i}
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150"
                  style={{ background: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 leading-tight">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              ) : (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
                  style={{ background: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 leading-tight">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="px-3 pt-3 pb-2">
            <div
              className="w-full rounded-xl px-3 py-2.5 text-center text-xs font-medium text-white/60 hover:text-white/90 transition-colors cursor-pointer"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {footerLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

function Layout() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState("disabled");

  const location = useLocation();
  const isDarkPage =
    location.pathname === "/community" ||
    location.pathname === "/ngo" ||
    location.pathname === "/shop-products" ||
    location.pathname === "/upskill" ||
    location.pathname === "/sell-products" ||
    location.pathname === "/jobs" ||
    location.pathname === "/resume" ||
    location.pathname === "/mentorship" ||
    location.pathname === "/updates-schemes";

  const homeContent = (
    <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40">
      <h1
        className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2px] max-w-6xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Empowering{" "}
        <em className="not-italic text-muted-foreground">abilities</em>{" "}
        through connection, skills, and opportunity.
      </h1>

      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8">
        A unified platform connecting persons with disabilities to NGOs, skill
        development programs, and meaningful employment.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-12">
        {/* ✅ UPDATED: Clicking 'Get Started' opens the Login/Signup modal */}
        <button 
          onClick={() => {
            setTab("signup");
            setOpen(true);
          }}
          className="liquid-glass rounded-full px-10 py-4"
        >
          Get Started
        </button>
        <Link
          to="/ngo"
          className="border border-border rounded-full px-10 py-4 hover:bg-white/10 transition"
        >
          Explore NGOs
        </Link>
      </div>
    </section>
  );

  return (
    <div
      className="relative min-h-screen text-foreground overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* VIDEO */}
      {!isDarkPage && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
      )}

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">

        {/* ✅ UPDATED: Logo wrapped in Link to land back to home */}
        <Link
          to="/"
          className="text-3xl tracking-tight cursor-pointer"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          EmpowerAble<sup className="text-xs">®</sup>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium">

          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground transition"
            }
          >
            Home
          </NavLink>

          {/* Explore */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 select-none">
              <span>Explore</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 translate-y-1 z-50">
              <div
                className="w-72 rounded-2xl p-[1px]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
                }}
              >
                <div
                  className="rounded-2xl p-2 shadow-2xl"
                  style={{
                    background: "rgba(13, 13, 13, 0.95)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                  }}
                >
                  <div className="px-3 pt-2 pb-3">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-semibold">
                      Browse
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <Link
                      to="/ngo"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150"
                      style={{ background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90 leading-tight">NGOs</p>
                        <p className="text-xs text-white/40 mt-0.5">Find organisations near you</p>
                      </div>
                    </Link>

                    <Link
                      to="/updates-schemes"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150"
                      style={{ background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90 leading-tight">Updates & Schemes</p>
                        <p className="text-xs text-white/40 mt-0.5">News & government benefits</p>
                      </div>
                    </Link>

                    <div
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
                      style={{ background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90 leading-tight">Accessibility Help</p>
                        <p className="text-xs text-white/40 mt-0.5">Tools & resources for you</p>
                      </div>
                    </div>

                    <div className="mx-3 my-1.5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

                    <div
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
                      style={{ background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90 leading-tight">Opportunities</p>
                        <p className="text-xs text-white/40 mt-0.5">Jobs, grants & programs</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pt-3 pb-2">
                    <div
                      className="w-full rounded-xl px-3 py-2.5 text-center text-xs font-medium text-white/60 hover:text-white/90 transition-colors cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      View all resources
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 select-none">
              <span>Jobs</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <DropdownPanel items={NAV_DROPDOWNS.Jobs} footerLabel="Browse all jobs" />
          </div>

          {/* Learn */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 select-none">
              <span>Learn</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <DropdownPanel items={NAV_DROPDOWNS.Learn} footerLabel="View all courses" />
          </div>

          {/* Community */}
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground transition-colors duration-200"
            }
          >
            Community
          </NavLink>

          {/* Marketplace */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 select-none">
              <span>Marketplace</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <DropdownPanel items={NAV_DROPDOWNS.Marketplace} footerLabel="Go to marketplace" />
          </div>

        </div>

        {/* Login */}
        <button
          onClick={() => {
            setTab("login");
            setOpen(true);
          }}
          className="liquid-glass rounded-full px-6 py-2.5"
        >
          Login
        </button>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={homeContent} />
        <Route path="/ngo" element={<NGO />} />
        <Route path="/community" element={<Community />} />
        <Route path="/upskill" element={<Upskill />} />
        <Route path="/shop-products" element={<ShopProducts />} />
        <Route path="/sell-products" element={<SellProducts />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resume" element={<PostResume />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/updates-schemes" element={<NewsSchemesPage />} />
      </Routes>

      {/* LOGIN MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-8 rounded-3xl liquid-glass border border-white/10 shadow-2xl">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-5 text-muted-foreground"
            >
              {"\u2715"}
            </button>

            <h2
              className="text-3xl mb-6 text-center"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            <div className="flex bg-white/5 rounded-full p-1 mb-6">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-2 rounded-full ${tab === "login" ? "bg-white text-black" : "text-muted-foreground"}`}
              >
                Login
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 py-2 rounded-full ${tab === "signup" ? "bg-white text-black" : "text-muted-foreground"}`}
              >
                Sign Up
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {["disabled", "ngo", "company"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-xl text-xs ${role === r ? "bg-white text-black" : "bg-white/5 text-muted-foreground"}`}
                >
                  {r === "disabled" ? "Disabled" : r === "ngo" ? "NGO" : "Company"}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
              />
              {tab === "signup" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                />
              )}
              <button className="liquid-glass py-3 rounded-full">
                {tab === "login" ? "Login" : "Create Account"}
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              {tab === "login" ? (
                <>
                  New here?{" "}
                  <span
                    onClick={() => setTab("signup")}
                    className="text-white underline cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setTab("login")}
                    className="text-white underline cursor-pointer"
                  >
                    Login
                  </span>
                </>
              )}
            </p>

          </div>
        </div>
      )}

      {/* ✅ CHATBOT — fixed bottom-right, renders on every page */}
      <ChatBotWidget />

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}