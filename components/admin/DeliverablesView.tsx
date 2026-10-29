"use client";

import { useState } from "react";
import {
  FileText,
  Lightbulb,
  Video,
  DollarSign,
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
} from "lucide-react";

export default function DeliverablesView() {
  const [activeTab, setActiveTab] = useState<"strategy" | "budget" | "ai" | "demo">("strategy");

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTab("strategy")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "strategy"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>1. Growth Strategy (500 Regs / 7 Days)</span>
        </button>

        <button
          onClick={() => setActiveTab("budget")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "budget"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>2. ₹2,000 Budget Workflow</span>
        </button>

        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "ai"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. AI-Learning Logs (Prompt &rarr; Code)</span>
        </button>

        <button
          onClick={() => setActiveTab("demo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "demo"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>4. 3-Minute Demo Pitch Script</span>
        </button>
      </div>

      {/* TAB 1: GROWTH STRATEGY */}
      {activeTab === "strategy" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Target className="w-4 h-4" />
              <span>Assignment Growth Blueprint</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              7-Day Growth Strategy: 500 Final-Year Engineers on ₹2,000 Budget
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Achieving 500 engineering student registrations in 7 days on an austere ₹2,000 budget
              rules out expensive paid performance ads (Meta/Google CAC in India tech student education is ₹45-₹80+).
              Instead, our strategy deploys a high-leverage <strong>Product-Led Viral Growth Model</strong> driven by:
              1) The AI Build DNA Quiz (activating curiosity and relevance), 2) Campus Ambassador Micro-Incentives,
              and 3) The Build Buddy Peer Referral Loop (K-factor target: 0.35 - 0.45).
            </p>
          </div>

          {/* Unit Math */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Unit Economics &amp; Blended Acquisition Math
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div>
                <span className="text-slate-500 block">Total Budget:</span>
                <strong className="text-white text-sm">₹2,000</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Target Registrations:</span>
                <strong className="text-white text-sm">500 Students</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Allowable Blended CAC:</span>
                <strong className="text-emerald-400 text-sm">₹4.00 / student</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Target Viral K-Factor:</span>
                <strong className="text-indigo-400 text-sm">&gt; 0.38</strong>
              </div>
            </div>
          </div>

          {/* Day by Day Plan */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Day-by-Day Operational Staging Roadmap
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 1</span>
                <div>
                  <strong className="text-white text-sm">Campus Launch &amp; Ambassador Activation (Goal: 25 Regs)</strong>
                  <p className="text-slate-300 mt-1">
                    Onboard 5 top college representatives across prominent engineering colleges (CBIT, VNR, BMSCE, PSG, Thapar).
                    Disburse ₹100 micro-incentive to each for launching the official announcement in class WhatsApp groups.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 2</span>
                <div>
                  <strong className="text-white text-sm">College Coding Clubs &amp; AI Quiz Drive (Goal: 100 Cumulative)</strong>
                  <p className="text-slate-300 mt-1">
                    Partner with student leads at IEEE, CSI, and Google Developer Student Clubs.
                    Share the interactive <strong>AI Build DNA Quiz</strong> link so students discover domain-specific project matches.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 3</span>
                <div>
                  <strong className="text-white text-sm">Build Buddy Referral Engine Kickoff (Goal: 200 Cumulative)</strong>
                  <p className="text-slate-300 mt-1">
                    Activate the peer referral incentive pool (₹350). Every registered student receives their personalized
                    WhatsApp share button. Hitting 3 referrals unlocks the priority Q&amp;A room and boilerplate GitHub starter pack.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 4</span>
                <div>
                  <strong className="text-white text-sm">Project Code Teaser &amp; Resume Impact Reveal (Goal: 300 Cumulative)</strong>
                  <p className="text-slate-300 mt-1">
                    Post a 30-second Loom/Canva video demonstrating the AI ATS Resume Analyzer Streamlit app.
                    Highlight the exact placement resume bullet point students will earn in 60 minutes.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 5</span>
                <div>
                  <strong className="text-white text-sm">Inter-College Leaderboard &amp; Weekend Blitz (Goal: 375 Cumulative)</strong>
                  <p className="text-slate-300 mt-1">
                    Publish the live college tally in WhatsApp groups. Foster healthy inter-college competition
                    between branches to secure their college badge.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 6</span>
                <div>
                  <strong className="text-white text-sm">Final 24-Hour Seat Lock &amp; Urgency Countdown (Goal: 450 Cumulative)</strong>
                  <p className="text-slate-300 mt-1">
                    Deploy scarcity triggers: &ldquo;Last 50 Free Seats Remaining Before Registration Closes&rdquo;.
                    Direct WhatsApp reminder blasts sent to student clubs.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span className="w-14 shrink-0 font-bold font-mono text-indigo-400">Day 7</span>
                <div>
                  <strong className="text-white text-sm">Live Workshop Day Morning Sprint (Goal: 500 Cumulative)</strong>
                  <p className="text-slate-300 mt-1">
                    Final morning reminder push with setup instructions (Python 3.11 / VS Code).
                    Cross the 500 student finish line before closing the live Zoom/YouTube stream room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BUDGET WORKFLOW */}
      {activeTab === "budget" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Financial Discipline &amp; Accounting</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Documented ₹2,000 Budget Plan &amp; Expense Tracking Workflow
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Every single rupee must be accounted for with clear acquisition attribution, proof notes,
              and strict limits preventing budget overshoots.
            </p>
          </div>

          {/* Allocation Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Budget Category</th>
                  <th className="py-2.5 px-3 text-right">Planned Cap</th>
                  <th className="py-2.5 px-3 text-right">% of Total</th>
                  <th className="py-2.5 px-3">Strategic Purpose &amp; Expected Deliverable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Campus Ambassador Incentives</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">₹700</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">35%</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    Direct performance micro-vouchers (₹100 x 7 leads) tied to achieving &ge;25 registrations per campus.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Student Referral Incentives</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">₹500</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">25%</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    Build Buddy milestone escrow pool (₹100 Amazon vouchers awarded to top 5 student referrers).
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">College Community Outreach</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">₹400</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">20%</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    Sponsorship of mini-quizzes / coding challenges inside college tech club Discord and WhatsApp hubs.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Creative &amp; Promotional Materials</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">₹250</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">12.5%</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    Canva Pro short subscription / high-converting WhatsApp carousel assets &amp; mobile banners.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-white">Emergency Contingency Reserve</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">₹150</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">7.5%</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    Buffer capital reserved for Day 6 final sprint boost if pacing falls behind.
                  </td>
                </tr>
                <tr className="bg-slate-950 font-bold">
                  <td className="py-3 px-3 text-white">TOTAL CAMPAIGN BUDGET</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 text-sm">₹2,000</td>
                  <td className="py-3 px-3 text-right text-emerald-400">100%</td>
                  <td className="py-3 px-3 text-slate-300">Strictly Enforced Hard Cap</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Workflow Guardrails */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Enforced Budget Rules in Campus Pulse Platform:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Hard Cap Enforcement:</strong> The API rejects any expense entry whose addition would push total spend past ₹2,000.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Proactive 80% Utilization Alert:</strong> When remaining budget drops to &le;₹400, a persistent amber warning prompts the admin to freeze non-essential creative spend.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Audit Trail &amp; Export:</strong> Every disbursement requires a purpose note and receipt/reference ID, exportable in 1 click to CSV for management audit.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: AI LEARNING EXAMPLES */}
      {activeTab === "ai" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Prompt &rarr; AI Suggestion &rarr; Implemented Code</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              AI-Learning Examples: How AI Accelerated Product Decision Making
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Demonstrating active human-AI collaboration where AI generated recommendations,
              which were critically analyzed and transformed into production features.
            </p>
          </div>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Example 1: Reducing Landing Page Drop-off with Interactive Personalization
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Feature: AI Build DNA Quiz
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">Prompt:</span>
                <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded border border-slate-800">
                  &ldquo;Final-year engineering students from non-CS branches often think AI workshops aren&apos;t relevant to them. How can we make a 60-minute workshop irresistible across ECE, EEE, and Mechanical without creating 5 separate landing pages?&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">AI Suggestion:</span>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  AI suggested generating 4 dynamic quizzes that output tailored certificates. It proposed asking 10 questions about mathematics, Python proficiency, and hardware specs.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">What I Changed &amp; Implemented:</span>
                <p className="text-xs text-slate-200 bg-emerald-950/20 p-2.5 rounded border border-emerald-500/30">
                  A 10-question quiz causes severe mobile drop-off on WhatsApp. I refined it down to a crisp <strong>4-question DNA Wizard (60 seconds)</strong> that maps directly to high-demand placement capstone themes (ATS Resume Matcher for CS, Focus Vision Sentinel for ECE, Failure Predictor for Mech). I wired the output CTA to auto-fill the registration form.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Example 2: Designing Low-Cost Referral Loops on a ₹2,000 Budget
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Feature: Build Buddy Viral Engine
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">Prompt:</span>
                <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded border border-slate-800">
                  &ldquo;I have a ₹2,000 budget for 500 registrations. Paid ads cost ₹50/lead. How can I design a viral referral mechanism where students invite friends without burning all budget on rewards?&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">AI Suggestion:</span>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  AI suggested offering ₹50 UPI cashback to every student who refers a friend.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">What I Changed &amp; Implemented:</span>
                <p className="text-xs text-slate-200 bg-emerald-950/20 p-2.5 rounded border border-emerald-500/30">
                  ₹50 per referral would exhaust the ₹2,000 budget after just 40 signups! Instead, I implemented a <strong>tiered non-monetary + milestone reward structure</strong>: 1 friend = instant GitHub boilerplate access (₹0 cost), 3 friends = priority Q&amp;A room (₹0 cost), and 5+ friends = qualification for a capped ₹100 Amazon voucher pool (₹350 total escrow). This achieved an effective referral CAC under ₹2.20!
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Example 3: Building Real-time Campaign Decision Intelligence
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Feature: Growth Copilot &amp; Sensitivity Simulator
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">Prompt:</span>
                <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded border border-slate-800">
                  &ldquo;Write an AI campaign optimizer that predicts whether a student growth campaign will succeed and tells the organizer what to do daily.&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-1">AI Suggestion:</span>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  AI suggested a generic black-box LLM prompt that hallucinated forecasts and claimed guaranteed 100% conversion rates.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">What I Changed &amp; Implemented:</span>
                <p className="text-xs text-slate-200 bg-emerald-950/20 p-2.5 rounded border border-emerald-500/30">
                  I rejected black-box simulated guarantees. I built a <strong>deterministic Growth Copilot</strong> that mathematically cross-references current registrations vs the Day 1-7 trajectory benchmarks, calculates true channel CAC from recorded expenses, and issues concrete re-allocation advice (e.g. shift ₹250 to WhatsApp). I also added the interactive Sensitivity Simulator with prominent estimate disclaimers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DEMO SCRIPT */}
      {activeTab === "demo" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Video className="w-4 h-4" />
              <span>Assignment Presentation Guide</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              3-Minute Video Pitch &amp; Live Walkthrough Demo Script
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Use this structured script to present Campus Pulse to the NxtWave evaluation panel in under 180 seconds.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Act 1 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-indigo-400 font-bold">
                <span className="uppercase tracking-wider">Act 1: The Challenge &amp; Student Experience</span>
                <span className="font-mono">0:00 &mdash; 0:45 (45 sec)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Speaker:</strong> &ldquo;Hello everyone! Today I&apos;m presenting <em>Campus Pulse</em>—an AI-powered student growth platform built for the NxtWave Growth Intern assignment. Our challenge: get 500 final-year engineering students to register for our free workshop, &apos;Build Your First AI Project in 60 Minutes&apos;, within 7 days, using just ₹2,000 total budget.
                <br /><br />
                Rather than building a static landing page, we engineered a connected growth flywheel. As a student visits the site on mobile or WhatsApp, they see zero fluff—immediate clarity that the session is 100% free, beginner-friendly, and geared towards placement resumes.&rdquo;
              </p>
            </div>

            {/* Act 2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="uppercase tracking-wider">Act 2: The Two Growth Superpowers (Quiz &amp; Build Buddy)</span>
                <span className="font-mono">0:45 &mdash; 1:30 (45 sec)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Speaker:</strong> &ldquo;Notice our first standout feature: the <strong>AI Build DNA Quiz</strong>. Instead of asking students to register blindly, it asks 4 quick questions about their branch and interests, instantly recommending a tailored capstone project—like an ATS Resume Matcher for CSE or a Vision Alert Sentinel for ECE.
                <br /><br />
                One click on &apos;Build This Project&apos; takes them into our fast registration form with duplicate prevention. Upon submitting—celebratory confetti fires—and our second growth superpower activates: the <strong>Build Buddy Referral System</strong>. Every student gets a personalized code and 1-click WhatsApp share button. By referring friends, they unlock starter code templates and voucher qualifications. Best of all, they can query their live referral status anytime.&rdquo;
              </p>
            </div>

            {/* Act 3 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span className="uppercase tracking-wider">Act 3: Admin Command Center &amp; The ₹2,000 Budget Guardrail</span>
                <span className="font-mono">1:30 &mdash; 2:15 (45 sec)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Speaker:</strong> &ldquo;Now let&apos;s flip to the private admin dashboard at <code>/admin</code>. Here, the campaign organizer has total situational awareness. We track progress against our 500 target along a 7-day milestone curve.
                <br /><br />
                Most importantly, take a look at our <strong>₹2,000 Budget &amp; Expense Tracker</strong>. Our backend strictly enforces that spending cannot silently exceed the ₹2,000 cap. It calculates remaining balance in real-time, fires warning banners when approaching the threshold, categorizes every rupee, and exports the entire audit ledger to CSV with 1 click.&rdquo;
              </p>
            </div>

            {/* Act 4 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-purple-400 font-bold">
                <span className="uppercase tracking-wider">Act 4: Growth Copilot, Simulator &amp; Conclusion</span>
                <span className="font-mono">2:15 &mdash; 3:00 (45 sec)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Speaker:</strong> &ldquo;Finally, our standout innovation: <strong>Growth Copilot</strong>. It evaluates daily pace, identifies our lowest CAC acquisition channel—like Student Referrals at ₹2.20—and recommends immediate high-leverage tactical moves.
                <br /><br />
                Along with our interactive <strong>Budget &amp; Growth Simulator</strong>, organizers can stress-test different capital reallocations before spending a single rupee. Campus Pulse combines measurable growth engineering, ethical peer loops, and tight financial discipline to turn ₹2,000 into 500 registered future engineers. Thank you!&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
