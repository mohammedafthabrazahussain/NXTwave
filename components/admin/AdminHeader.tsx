"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, LogOut, ExternalLink, Database } from "lucide-react";

interface AdminHeaderProps {
  backendStatus?: {
    mode: string;
    hasSupabaseConfigured: boolean;
    note: string;
  };
}

export default function AdminHeader({ backendStatus }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="border-b border-slate-800 bg-[#0b0f19] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">CAMPUS PULSE</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Organizer Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              500 Registrations &bull; 7 Days &bull; ₹2,000 Budget Command Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Backend Status Pill */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              backendStatus?.hasSupabaseConfigured
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                : "bg-indigo-950/60 border-indigo-500/30 text-indigo-300"
            }`}
            title={backendStatus?.note}
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              {backendStatus?.hasSupabaseConfigured ? "Supabase Cloud DB" : "Local Server DB (Synced)"}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Live Student Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-950/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
