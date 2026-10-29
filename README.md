# CAMPUS PULSE — AI-Powered Student Growth Platform

> **NxtWave Growth Intern Assignment Submission**  
> **Challenge:** Drive 500 final-year engineering students to register for the free online workshop, **“Build Your First AI Project in 60 Minutes,”** within 7 days using a strict total budget of **₹2,000**.

---

## 🌟 Live Demo & Architecture Overview

Campus Pulse is an end-to-end growth platform designed with two completely isolated environments:

| Area | Route | Audience | Purpose |
| :--- | :--- | :--- | :--- |
| **Student Platform** | `/` | Public (Students) | Attractive landing page, AI Build DNA Quiz, low-friction registration, and Build Buddy viral referral hub. *Never reveals admin or budget data.* |
| **Admin Login** | `/admin/login` | Campaign Team | Secure credential authentication (`admin` / `nxtwave_growth_2025`). |
| **Admin Command Center** | `/admin` | Campaign Organizer | ₹2,000 budget guardrail tracker, CAC multi-channel attribution, 7-day pacing tracker, Growth Copilot, and Growth Sensitivity Simulator. |

---

## 🚀 Key Standout Features

### 1. 🧬 AI Build DNA Quiz (Student Experience)
- A 60-second interactive 4-step profiler (Branch, Comfort Level, Interests, Output Preference).
- Generates a tailored beginner-friendly AI project recommendation (e.g. *AI ATS Resume Matcher* for CSE, *Real-Time Vision Focus Sentinel* for ECE, *Mechanical Failure Predictor* for Core branches).
- Explains why the project stands out on placement resumes and outlines the exact 60-minute tech stack (Python, Gemini API, Streamlit).
- Direct CTA: **“Build This Project — Register Free”** (pre-configures the registration interest).

### 2. 🤝 Build Buddy Viral Referral Hub (K-Factor Engine)
- Generates unique personalized referral codes and share links for every registrant.
- One-click **WhatsApp Share Button** with high-converting pre-drafted invite copy.
- Confirmed attribution engine with duplicate and self-referral prevention.
- Live **Referral Status Tracker**: students can search their code anytime to view their verified squad count and milestone perks.

### 3. 💰 ₹2,000 Budget & Expense Command Center (Admin Panel)
- Real-time tracking of Total Budget (₹2,000), Spent (₹), and Remaining Balance.
- **Strict Budget Guardrail:** The system rejects any expense entry that would cause cumulative spend to exceed ₹2,000.
- Automatic **80% Utilization Alert** prompting the organizer to freeze creative costs and prioritize zero-cost referral loops.
- Full CRUD expense ledger (Add, Edit, Delete with balance restoration) and 1-click CSV export.

### 4. 🧠 Growth Copilot (Decision Intelligence)
- Dynamic campaign advisor analyzing real-time signals: Pace vs Day 1–7 targets, lowest CAC channels, burn rate, and days remaining.
- Delivers prioritized recommendations with rationale, next actions, and projected student yields.
- Transparent mode indicator: runs on a deterministic rule engine out-of-the-box, with seamless Google Gemini 1.5 Flash API integration when an API key is provided.

### 5. 🎛️ Budget & Growth Sensitivity Simulator
- Interactive sliders allowing organizers to adjust channel spend allocations and test differing CPA assumptions.
- Calculates simulated total spend, budget delta, estimated registrations, target variance, and blended CAC.
- Labeled with explicit estimation disclaimers.

### 6. 📊 1-Click Multi-Dataset CSV Exports
- Downloadable reports for Student Registrations, Audited Expense Ledgers, Channel Performance & CAC, and 7-Day Daily Progress.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router, Server Actions & API Routes)
- **Language:** TypeScript 5 (Strict type safety)
- **Styling:** Tailwind CSS & Glassmorphism design system
- **Visualizations:** Recharts (Area charts for 7-day trajectory, Bar charts for channel CAC)
- **Delight:** Canvas-confetti for celebratory referral triggers
- **Icons:** Lucide React
- **Database Architecture:**
  - **Live Cloud Database:** Ready for Supabase via `@supabase/supabase-js` (SQL schema included with RLS at `supabase/schema.sql`).
  - **Zero-Config Persistent Server DB:** Pre-bundled file-backed atomic JSON store (`data/campus_pulse_db.json`) ensuring full synchronization across browser tabs and devices immediately upon running.

---

## 💻 Quick Start & Local Setup

### Prerequisites
- Node.js 18.x, 20.x, or 22.x
- npm, pnpm, or yarn

### 1. Installation
```bash
git clone <your-repo-url>
cd NXTwave
npm install
```

### 2. Environment Configuration
The application comes pre-configured with working defaults in `.env.local`:
```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=nxtwave_growth_2025
ADMIN_SESSION_SECRET=campus_pulse_secure_session_secret_change_in_production_key_32chars

# Supabase (Optional - uses local persistent store if omitted)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Gemini AI (Optional - rule engine is enabled by default)
# GEMINI_API_KEY=your-gemini-key

# Configurable Official Workshop URL Placeholder
NEXT_PUBLIC_OFFICIAL_REGISTRATION_URL=https://nxtwave.tech/workshops/ai-in-60-mins
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the Student Platform.  
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the Admin Dashboard.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 🚀 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set Environment Variables in Project Settings:
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: `<your-secure-password>`
   - `ADMIN_SESSION_SECRET`: `<random-32-character-secret>`
   - *(Optional)* `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` if using remote Supabase.
4. Click **Deploy**. Vercel will automatically build and host the application globally.

---

## 📋 What is Genuinely Functional vs Demo Mode

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Student Registration** | ✅ 100% Functional | Validates fields, prevents duplicate email signups, generates unique referral codes, captures UTM parameters. |
| **Referral Engine (Build Buddy)** | ✅ 100% Functional | Attributes signups via `?ref=CODE`, increments referrer's verified count, disallows self-referrals, provides live search status. |
| **WhatsApp Viral Share** | ✅ 100% Functional | Dynamic `https://api.whatsapp.com/send` link with pre-filled customized message and user referral link. |
| **₹2,000 Budget Guardrail** | ✅ 100% Functional | Rejects any spend exceeding the ₹2,000 cap; provides add, edit, delete, and real-time balance calculations. |
| **Channel CAC Attribution** | ✅ 100% Functional | Computes true unit acquisition costs by mapping recorded expense categories to logged channel registrations. |
| **Daily 7-Day Plan Editor** | ✅ 100% Functional | Admin can edit daily milestone targets and action notes inline. |
| **CSV Data Export** | ✅ 100% Functional | Generates real-time downloadable CSV files for registrations, expenses, channels, and daily targets. |
| **Growth Copilot** | ✅ 100% Functional | Analyzes live pacing, budget health, and CAC signals via deterministic algorithms (with optional Gemini AI integration). |
| **Official Workshop Integration** | ⚙️ Configurable Placeholder | Points to `NEXT_PUBLIC_OFFICIAL_REGISTRATION_URL`. No fake official endorsement or live webinar token claiming is simulated. |

---

## 👥 Default Admin Credentials
- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `nxtwave_growth_2025`
*(A 1-click "Auto-fill Demo Credentials" button is provided on the login page for effortless reviewer testing).*
