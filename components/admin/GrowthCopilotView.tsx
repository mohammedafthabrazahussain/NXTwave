"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { GrowthCopilotRecommendation } from "@/types";

export default function GrowthCopilotView() {
  const [recommendations, setRecommendations] = useState<GrowthCopilotRecommendation[]>([]);
  const [engineMode, setEngineMode] = useState<string>("Deterministic Growth Engine");
  const [engineExplanation, setEngineExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/copilot");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch copilot insights.");
      setRecommendations(data.recommendations || []);
      setEngineMode(data.engineMode);
      setEngineExplanation(data.engineExplanation);
    } catch (err: any) {
      setError(err.message || "Failed to load Copilot.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const priorityColors = {
    HIGH: "bg-red-950/80 border-red-500/40 text-red-300",
    WARNING: "bg-amber-950/80 border-amber-500/40 text-amber-300",
    OPPORTUNITY: "bg-emerald-950/80 border-emerald-500/40 text-emerald-300",
    MEDIUM: "bg-indigo-950/80 border-indigo-500/40 text-indigo-300",
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Growth Copilot</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI &bull; Real-time Decision Support
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Multi-signal campaign advisor synthesizing pace, channel CAC, and remaining ₹2,000 capital.
              </p>
            </div>
          </div>

          <button
            onClick={fetchRecommendations}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Re-analyze Campaign Signals</span>
          </button>
        </div>

        {/* Engine Transparency Notice */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>
              Active Analysis Engine: <strong className="text-white">{engineMode}</strong>
            </span>
          </div>
          <div className="text-[11px] text-slate-400 italic">
            {engineExplanation}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/30 text-red-200 text-xs">
          {error}
        </div>
      )}

      {/* Recommendations Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <span>Synthesizing multi-channel growth data...</span>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          All campaign metrics currently balanced. No high-priority alerts triggered.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                      priorityColors[rec.priority]
                    }`}
                  >
                    {rec.priority} PRIORITY
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 capitalize">
                    {rec.category} signal
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  {rec.headline}
                </h4>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-3.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Analysis &amp; Metric Context
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{rec.reason}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Recommended Next Action
                  </span>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec.suggestedAction}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Projected Impact:</span>
                <span className="text-emerald-400 font-semibold">{rec.projectedImpact}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
