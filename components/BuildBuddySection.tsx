"use client";

import { useState } from "react";
import { Users, Search, CheckCircle2, Award, Gift, ArrowRight } from "lucide-react";

export default function BuildBuddySection() {
  const [searchCode, setSearchCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buddyData, setBuddyData] = useState<{
    referralCode: string;
    ownerName: string;
    confirmedCount: number;
    milestoneBadge: string;
    referrals: { id: string; maskedName: string; createdAt: string }[];
  } | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/referral/${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Referral code not found. Please double check.");
      }

      setBuddyData(data);
    } catch (err: any) {
      setError(err.message || "Failed to find referral data.");
      setBuddyData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="buddy" className="py-16 md:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Community Virality</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build Buddy Referral Hub
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Everything is better when you build with peers. Track your confirmed squad registrations,
            unlock exclusive repo templates, and claim your peer badges.
          </p>
        </div>

        {/* Milestone Cards Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                1 Confirmed Friend
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">Project Starter Pack</h4>
              <p className="text-xs text-slate-400 mt-1">
                Pre-configured GitHub repository with boilerplate Python code &amp; Streamlit templates.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                3 Confirmed Friends
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">Priority Q&amp;A Room</h4>
              <p className="text-xs text-slate-400 mt-1">
                Fast-track live placement doubt clarification session with the senior AI engineer.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                5+ Friends
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">Gold Ambassador</h4>
              <p className="text-xs text-slate-400 mt-1">
                Guaranteed ₹100 Amazon Voucher pool qualification &amp; official certificate recommendation.
              </p>
            </div>
          </div>
        </div>

        {/* Live Lookup Tool */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2">
            Check Your Referral Score &amp; Confirmed Signups
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Enter the referral code you received upon registration (e.g., <code className="text-indigo-300">RAHUL-482</code> or <code className="text-indigo-300">CBIT-RAHUL</code>).
          </p>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter your referral code (e.g. BUDDY-1001)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Status</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs">
              {error}
            </div>
          )}

          {buddyData && (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Referral Squad Leader:</span>
                  <div className="font-bold text-white text-base">
                    {buddyData.ownerName}{" "}
                    <span className="text-xs font-mono text-indigo-400">
                      ({buddyData.referralCode})
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Confirmed Batchmates:</span>
                  <div className="text-2xl font-black text-emerald-400">
                    {buddyData.confirmedCount}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400">Current Milestone Status:</span>
                <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>{buddyData.milestoneBadge}</span>
                </div>
              </div>

              {buddyData.referrals.length > 0 && (
                <div>
                  <span className="text-xs text-slate-400 block mb-2">
                    Verified Batchmate Registrations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {buddyData.referrals.map((ref) => (
                      <div
                        key={ref.id}
                        className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-slate-200">{ref.maskedName}</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Confirmed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
