"use client";

import {
  Share2,
  Download,
  Award,
  Zap,
  TrendingUp,
  BarChart2,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { ChannelAnalytics } from "@/types";

interface ChannelAnalyticsViewProps {
  channels: ChannelAnalytics[];
  totalRegistrations: number;
}

export default function ChannelAnalyticsView({
  channels = [],
  totalRegistrations = 0,
}: ChannelAnalyticsViewProps) {
  const handleExportCSV = () => {
    window.open("/api/admin/export?type=channels", "_blank");
  };

  const chartData = channels.map((c) => ({
    name: c.channel.replace(" & Communities", "").replace("Ambassadors", "Ambs"),
    registrations: c.registrations,
    spend: c.spend,
    cpa: c.cpa,
  }));

  const COLORS = ["#6366f1", "#10b981", "#8b5cf6", "#f59e0b", "#06b6d4", "#64748b"];

  const topChannel = [...channels].sort((a, b) => b.registrations - a.registrations)[0];
  const lowestCac = [...channels]
    .filter((c) => c.cpa !== null && c.cpa > 0)
    .sort((a, b) => (a.cpa || 999) - (b.cpa || 999))[0];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Share2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Growth Channel Acquisition &amp; CAC Attribution
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time Multi-Touch Attribution &bull; True Cost Per Registration (CAC)
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export Channel Analytics (CSV)</span>
          </button>
        </div>

        {/* Insight Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">
                Volume Driver (#1 Channel)
              </span>
              <div className="text-base font-bold text-white mt-0.5">
                {topChannel?.channel || "N/A"}: {topChannel?.registrations || 0} Signups ({topChannel?.percentage}%)
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Highest gross student acquisition across the engineering cohorts.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                Capital Efficiency Winner (Lowest CAC)
              </span>
              <div className="text-base font-bold text-white mt-0.5">
                {lowestCac ? `${lowestCac.channel}: ₹${lowestCac.cpa?.toFixed(2)} / Student` : "Organic / Free"}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Yielding maximum registrations per rupee spent. Primary target for capital re-allocation.
              </p>
            </div>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="mt-8">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            Registrations by Channel
          </h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="registrations" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Acquisition Channel</th>
                <th className="py-3 px-3 text-right">Registrations</th>
                <th className="py-3 px-3 text-right">% Contribution</th>
                <th className="py-3 px-3 text-right">Attributed Spend</th>
                <th className="py-3 px-3 text-right">Cost Per Reg (CAC)</th>
                <th className="py-3 px-3 text-center">Efficiency Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {channels.map((c, i) => (
                <tr key={c.channel} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span>{c.channel}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-indigo-300">
                    {c.registrations}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300">
                    {c.percentage}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {c.spend > 0 ? `₹${c.spend}` : "₹0 (Organic)"}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                    {c.cpa !== null ? `₹${c.cpa.toFixed(2)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {c.cpa !== null && c.cpa <= 3.5 ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                        Ultra Efficient
                      </span>
                    ) : c.cpa !== null && c.cpa <= 6 ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold">
                        Optimal
                      </span>
                    ) : c.spend === 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                        Zero Spend
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                        Monitor
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-[11px] text-slate-500">
          * Note: Measurements are computed directly from database-logged UTM parameters and approved expense vouchers.
        </div>
      </div>
    </div>
  );
}
