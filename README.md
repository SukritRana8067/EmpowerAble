# EmpowerAble

**A unified digital platform for persons with disabilities — to connect, learn, work, and access opportunities.**

> Built with React · Dark Premium UI · Accessible by design

---

## Overview

EmpowerAble is a full-featured web application that brings together every resource a person with a disability needs in a single, beautifully designed platform. From finding jobs and government schemes to learning new skills and buying art made by disabled creators — EmpowerAble is built *for* the community, *by* thinking about the community first.

The UI follows a consistent dark premium design system: deep navy gradients, twinkling starfield backgrounds, glassmorphism cards, and serif editorial typography — consistent across every page.

---

## Pages & Features

### 🏠 Home / Community — `CommunityPage.jsx`
The landing experience. Users discover disability-specific communities to join, browse featured spaces, and filter by category.

- **Hero section** with massive editorial typography and live "joined" count
- **Featured Spaces** — 3 handpicked community cards (BlindTech Builders, DeafConnect Hub, Wheelchair Warriors)
- **Community Browser** — 12+ communities filterable by category (Visual, Hearing, Mobility, Cognitive, Mental Health, Chronic Illness) with live search
- **Marquee strip** and **CTA banner** to create a new space
- Join / unjoin toggle with state persistence

---

### 📚 Learn — `LearnPage.jsx`
A Coursera-inspired learning marketplace rebuilt in the EmpowerAble design system.

**Layout mirrors Coursera section-by-section:**
| Section | Description |
|---|---|
| Split hero banners | "Skills for every ability" + "Upskill your team inclusively" |
| Provider logos strip | 8 disability-led organisations |
| New & Popular (3-col) | Most Popular · Hot New Releases · Trending Now |
| Explore Categories | 10 category pills |
| Horizontal scroll strip | Editor's picks with ‹ › scroll arrows |
| Explore Careers | Accessibility Specialist, AT Consultant, Rights Advocate, etc. |
| 2-col promo banners | New courses + EmpowerAble Plus |
| Testimonials (4-col) | Learner quotes |
| FAQ accordion | 5 expandable questions |

**24 courses** across Assistive Tech, Communication, Disability Rights, Mental Wellness, Career, Finance, Arts, Adaptive Fitness.

---

### 🎓 Mentorship — `MentorshipPage.jsx`
One-on-one sessions with disabled professionals. Users browse mentors, pick a slot, and book directly.

- **Hero** with search bar (filter by name, skill, disability type)
- **How It Works** — 4-step process panel with watermark step numbers
- **Mentor cards** — avatar with live availability dot, badges, bio expand/collapse, topics, rating, session count, languages, free/paid indicator
- **Filters** — expertise area pills + "Available now only" toggle
- **3-step booking modal:**
  1. 7-day date picker + 8 time slots (with booked slots shown as strikethrough)
  2. Name input + topic quick-pick chips + free-text goal
  3. Full confirmation summary → booking confirmed screen
- **Testimonials** and **Become a Mentor CTA** banner
- **6 mentor profiles** across Tech, Law, Arts, Sports, Psychology, Education

---

### 🛍️ Marketplace — `MarketplacePage.jsx`
Buy and commission original artworks and handcrafted goods from disabled creators. Inspired by Atypical Advantage.

**Two distinct views via Explore / Shop Now tabs:**

**Explore tab:**
- 3 feature highlight cards
- Split Corporate Art panel (image left, CTA right)
- Browse Collections grid (6 categories)
- For Corporates section (Office Interiors, Custom Commissions, Gift Collections)
- Artist Spotlights (4 disabled artist cards)

**Shop Now tab:**
- Sticky left filter sidebar — Price Range slider, Category radio, Size checkboxes, Color swatches, Medium checkboxes
- Right product grid — 12 artworks with generative abstract thumbnails, artist name, disability tag, price, wishlist ♥ toggle
- Sort By dropdown (Featured / Price Low→High / Price High→Low / Newest)
- Live filtering with result count

---

### 📰 News & Schemes — `NewsSchemesPage.jsx`
Stay informed about disability-related news and know your government entitlements.

**News tab** (3-column newspaper layout):
- Left — Latest News vertical list with category color bars
- Centre — Top Story featured card with BREAKING badge + article modal on click
- Right — Trending numbered list + Quick Links panel
- Sub-category filter strip (Policy & Rights / Technology / Sports / Welfare / Education / Health)
- 9 realistic news stories with full article modal

**Schemes tab** (2-column directory):
- 8 government schemes: UDID, NHFDC Loans, Top Class Education Scholarship, DISHA Housing, ADIP Devices, Disability Pension, Rail & Air Concessions, NAPS Apprenticeship
- Expandable cards with Benefits list, Eligibility box, Apply Online link
- Right sidebar: Official Helplines (tap-to-call), How to Apply guide, "Start with UDID" banner
- Category filter strip

---

### 💼 Post Resume — `PostResumePage.jsx`
A 5-step resume builder for PwD job seekers, with an AI profile review before submission.

**5-step form:**
| Step | Fields |
|---|---|
| 1 · Personal Info | Name, email, phone, city, experience, job title, bio |
| 2 · Skills | 20 preset skill chips + custom skill input + selected skills summary |
| 3 · Disability Info | Disability type, UDID number, disability % slider, accommodation needs |
| 4 · Preferences | Work mode, job type, categories, location, salary, joining timeline |
| 5 · Upload & Review | Drag & drop resume + full profile summary table |

**AI Review Flow** (triggered on final submit):
1. **Scanning screen** — animated pulsing orb, 8 sequential check rows with live progress bar
2. **Recommendations screen** — profile score out of 100 (computed from actual form data), colour-coded rec cards (Fix suggested / Pro tip / Looks great), Apply suggestions or Submit anyway
3. **Success screen** — confirmation with trusted employer logos

**Left sidebar** — sticky progress tracker + Quick Tips card  
**Step progress bar** — horizontal with connectors, done/active/future states

---

## Design System

All pages share a consistent visual language:

| Token | Value |
|---|---|
| Background | `linear-gradient(160deg, #060c1a, #0a1628, #0d1e3a, #060c1a)` |
| Starfield | 130 twinkling stars, fixed position, randomised size/opacity/duration |
| Glow orbs | Purple `rgba(99,102,241,0.1)` top-left · Cyan `rgba(8,145,178,0.07)` bottom-right |
| Heading font | `'Georgia', serif` — bold, high letter-spacing |
| Body font | `system-ui, sans-serif` |
| Card bg | `#080f20` (solid, no backdrop-filter to prevent stacking context bugs) |
| Primary accent | `#7c3aed` (purple) |
| Secondary accents | `#0891b2` (cyan) · `#be123c` (red) · `#0f766e` (teal) · `#4f46e5` (indigo) |
| Border | `rgba(255,255,255,0.07)` default · `rgba(255,255,255,0.16)` on hover |
| Hover transform | `translateY(-3px)` to `translateY(-6px)` depending on card size |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (functional components + hooks) |
| Styling | Inline styles (no external CSS library) |
| Animations | CSS keyframes via `<style>` tag injection |
| Icons | Unicode symbols (◈ ⬡ ◆ ◉ ★ ✦) — no icon library dependency |
| Charts / Viz | SVG (hand-coded, inline) |
| State | `useState`, `useEffect`, `useRef` — no external state library |
| Routing | Designed as individual page components — plug into React Router |

---

## Project Structure

```
empowerable/
├── src/
│   ├── pages/
│   │   ├── CommunityPage.jsx       # Home & community discovery
│   │   ├── LearnPage.jsx           # Course marketplace
│   │   ├── MentorshipPage.jsx      # Mentor booking
│   │   ├── MarketplacePage.jsx     # Art & goods shop
│   │   ├── NewsSchemesPage.jsx     # News & government schemes
│   │   └── PostResumePage.jsx      # Resume builder + AI review
│   └── App.jsx                     # Router entry point
├── public/
└── README.md
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/empowerable.git
cd empowerable

# Install dependencies
npm install

# Start development server
npm run dev
```

### Routing setup (React Router v6)

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommunityPage   from "./pages/CommunityPage";
import LearnPage       from "./pages/LearnPage";
import MentorshipPage  from "./pages/MentorshipPage";
import MarketplacePage from "./pages/MarketplacePage";
import NewsSchemesPage from "./pages/NewsSchemesPage";
import PostResumePage  from "./pages/PostResumePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<CommunityPage />}   />
        <Route path="/learn"       element={<LearnPage />}        />
        <Route path="/mentorship"  element={<MentorshipPage />}  />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/news"        element={<NewsSchemesPage />} />
        <Route path="/jobs/resume" element={<PostResumePage />}  />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Navigation Structure

```
EmpowerAble
├── Home          → CommunityPage
├── Explore       → (dropdown)
├── Jobs          → (dropdown)
│   └── Post Resume → PostResumePage
├── Learn         → (dropdown)
│   ├── Courses   → LearnPage
│   └── Mentorship → MentorshipPage
├── Community     → CommunityPage
├── Marketplace   → MarketplacePage
└── News & Schemes → NewsSchemesPage
```

---

## Key Implementation Notes

**No `backdropFilter` on interactive containers**  
CSS `backdrop-filter` creates a new compositing layer that can sit above sibling DOM elements, intercepting pointer events. All interactive card containers use solid `#080f20` backgrounds instead.

**Star field is `position: fixed`**  
Stars are rendered once in a fixed layer (z-index: 0) so they don't scroll with content and don't affect layout flow.

**AI Review is fully frontend**  
The AI scanning animation and recommendations are deterministic — computed from the user's actual form data (bio length, skill count, UDID presence, etc.). No API call is made. The check timings are simulated with `setInterval`.

**No blocking validation**  
Form fields marked `(required)` are advisory only. The Continue button always advances. Validation feedback is delivered through the AI recommendations screen after step 5.

---

## Accessibility Notes

EmpowerAble is built *for* the disability community, so accessibility is taken seriously:

- Semantic button elements for all interactive controls
- Keyboard-navigable forms (Enter to submit custom skills, tab order preserved)
- Colour contrast ratios maintained for text on dark backgrounds
- No reliance on colour alone to convey meaning (icons + text labels always paired)
- Focus-visible outlines preserved (no `outline: none` without replacement)
- ARIA labels to be added in production build

---

## Contributing

Contributions are welcome! Please open an issue before submitting a pull request for major changes.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit with a descriptive message
git commit -m "feat: add screen reader support to MentorshipPage booking modal"

# Push and open a PR
git push origin feature/your-feature-name
```

---

## Roadmap

- [ ] Backend integration (Node.js / Supabase)
- [ ] Authentication (login, profile persistence)
- [ ] Real-time mentor availability (WebSockets)
- [ ] Live news feed via RSS/API
- [ ] Government scheme eligibility checker (form-based)
- [ ] Marketplace payment integration (Razorpay)
- [ ] Mobile app (React Native)
- [ ] Full WCAG 2.2 audit and remediation
- [ ] Multi-language support (Hindi, Tamil, Telugu)

---

## License

MIT License — see `LICENSE` for details.

---

<p align="center">
  Built with care for the disability community · EmpowerAble 2026
</p>
