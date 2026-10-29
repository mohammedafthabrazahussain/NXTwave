"use client";

import { Sparkles, Calendar, Clock, Laptop, ShieldCheck, ArrowRight, Code2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/60">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-6 animate-pulse-subtle">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>NxtWave Growth Intern Mission &bull; Free Live Engineering Workshop</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Build Your First AI Project in{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
            60 Minutes.
          </span>
        </h1>

        {/* Subtitle Tailored for Final-Year Engineers */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Stop watching passive tutorials. Learn by coding live: build, test, and deploy a real
          portfolio-ready AI web application from scratch—crafted to make your placement resume stand out.
        </p>

        {/* Workshop Key Highlights Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Saturday &bull; 6:00 PM IST (Placeholder)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>60 Minutes Live Code-Along</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Laptop className="w-4 h-4 text-purple-400" />
            <span>No Heavy GPU Needed</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free Entry (₹0 Fee)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#quiz"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition-all text-base group"
          >
            <Sparkles className="w-5 h-5 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <span>Find My Match: AI DNA Quiz</span>
            <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold flex items-center justify-center gap-2 transition-all text-base"
          >
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>Skip to Direct Registration</span>
          </a>
        </div>

        {/* Social Proof & WhatsApp Notice */}
        <div className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Tailored for Final-Year CSE, ECE, EEE, Mechanical & Civil Engineers. Mobile & WhatsApp friendly.</span>
        </div>
      </div>
    </section>
  );
}
