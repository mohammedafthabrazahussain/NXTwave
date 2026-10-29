"use client";

import Link from "next/link";
import { Sparkles, Shield, Rocket, UserCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">CAMPUS PULSE</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Student Growth & Skill Acceleration Platform
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <a
            href="#quiz"
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-indigo-400 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Build DNA Quiz</span>
          </a>

          <a
            href="#curriculum"
            className="hidden sm:block text-slate-300 hover:text-indigo-400 transition-colors"
          >
            What You Build
          </a>

          <a
            href="#buddy"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Build Buddy</span>
          </a>

          <a
            href="#register"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium shadow-md shadow-indigo-600/25 transition-all text-xs sm:text-sm active:scale-95"
          >
            Register Free
          </a>

          <div className="h-4 w-px bg-slate-800 hidden md:block" />

          <Link
            href="/admin/login"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 px-2.5 py-1.5 rounded-md transition-colors"
            title="Campaign Organizer Access"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline">Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
