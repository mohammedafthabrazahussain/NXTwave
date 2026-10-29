"use client";

import {
  Users,
  Target,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DailyTarget } from "@/types";

interface CampaignOverviewProps {
  metrics: {
    totalTarget: number;
    campaignDurationDays: number;
    currentDay: number;
    totalRegistrations: number;
    remainingRegistrations: number;
    percentTargetAchieved: number;
    status: "On track" | "At risk" | "Behind";
    dailyTargets: DailyTarget[];
    totalBudget: number;
    totalSpent: number;
    remainingBudget: number;
  };
}

export default function CampaignOverview({ metrics }: CampaignOverviewProps) {
  const chartData = metrics.dailyTargets.map((d) => ({
    name: `Day ${d.day}`,
    target: d.targetCumulative,
    actual: d.actualCumulative,
  }));

  const statusColors = {
    "On track": "bg-emerald-950/80 border-emerald-500/40 text-emerald-300",
    "At risk": "bg-amber-950/80 border-amber-500/40 text-amber-300",
    Behind: "bg-red-950/80 border-red-500/40 text-red-300",
  };

  const statusIcons = {
    "On track": CheckCircle2,
    "At risk": Clock,
    Behind: AlertTriangle,
  };

  const StatusIcon = statusIcons[metrics.status] || CheckCircle2;

  return (
    <div className="space-y-6">
      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registrations */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Registrations</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {metrics.totalRegistrations}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-300 mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{metrics.percentTargetAchieved}% of 500 Goal</span>
          </div>
        </div>

        {/* Remaining to Goal */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Remaining to Goal</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {metrics.remainingRegistrations}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Needed across {Math.max(1, metrics.campaignDurationDays - metrics.currentDay)} days left
          </div>
        </div>

        {/* Campaign Schedule & Day */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Campaign Day</span>
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            Day {metrics.currentDay}{" "}
            <span className="text-sm font-normal text-slate-500">/ 7 Days</span>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Target Pace: ~72 regs/day
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Campaign Health</span>
            <StatusIcon className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-1">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-bold ${statusColors[metrics.status]}`}
            >
              <StatusIcon className="w-4 h-4" />
              <span>{metrics.status}</span>
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Evaluated vs Day {metrics.currentDay} Benchmark
          </div>
        </div>
      </div>

      {/* Target Progress Bar & Trajectory Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              7-Day Registration Pacing Trajectory
            </h3>
            <p className="text-xs text-slate-400">
              Comparing Planned Milestone Trajectory vs Real Recorded Signups
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-500/30 border border-indigo-400" />
              <span className="text-slate-300">Target Trajectory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-400" />
              <span className="text-slate-300">Actual Signups</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>Overall Progress: {metrics.totalRegistrations} / 500 Students</span>
            <span className="text-emerald-400">{metrics.percentTargetAchieved}% Achieved</span>
          </div>
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.percentTargetAchieved)}%` }}
            />
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 520]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="target"
                name="Planned Target"
                stroke="#818cf8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorTarget)"
              />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual Registrations"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorActual)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
