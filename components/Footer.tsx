import Link from "next/link";
import { Rocket, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">CAMPUS PULSE</span>
              <p className="text-[11px] text-slate-500">
                AI Student Growth Platform &bull; NxtWave Growth Intern Assignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#quiz" className="hover:text-slate-200 transition-colors">
              AI Build DNA Quiz
            </a>
            <a href="#curriculum" className="hover:text-slate-200 transition-colors">
              Workshop Agenda
            </a>
            <a href="#buddy" className="hover:text-slate-200 transition-colors">
              Build Buddy
            </a>
            <a href="#register" className="hover:text-emerald-400 text-emerald-500 font-semibold transition-colors">
              Register Free
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Campus Pulse. Built for the NxtWave Growth Intern assignment.
            Official event dates, logos, and registration integrations use configurable system placeholders.
          </p>
          <p>
            Target: 500 Final-Year Engineers &bull; Total Budget: ₹2,000 &bull; Ethical growth loops only.
          </p>
        </div>
      </div>
    </footer>
  );
}
