"use client";

import { useState } from "react";
import {
  Sliders,
  RotateCcw,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Info,
  DollarSign,
  Users,
} from "lucide-react";
import { runSimulation, DEFAULT_SIMULATION_INPUT } from "@/lib/simulator";
import { SimulationInput } from "@/types";

export default function SimulatorView() {
  const [params, setParams] = useState<SimulationInput>(DEFAULT_SIMULATION_INPUT);

  const simulation = runSimulation(params);

  const handleReset = () => {
    setParams(DEFAULT_SIMULATION_INPUT);
  };

  const handleSpendChange = (field: keyof SimulationInput, val: number) => {
    setParams((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const isOverBudget = simulation.budgetDelta < 0;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Sliders className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Budget &amp; Growth Sensitivity Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Hypothetical Resource Rebalancing &bull; Estimate Registrations Under Differing CPA Assumptions
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Default Assumptions</span>
          </button>
        </div>

        {/* Estimation Notice Disclaimer */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Simulation &amp; Estimate Disclaimer:</strong> All model calculations are hypothetical scenarios for strategic sensitivity planning. These projections do not guarantee actual student registration volumes.
          </span>
        </div>

        {/* Live Simulation KPI Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Simulated Total Spend</span>
            <div
              className={`text-2xl font-black ${
                isOverBudget ? "text-red-400" : "text-white"
              }`}
            >
              ₹{simulation.totalSpend}
            </div>
            <span
              className={`text-[11px] font-medium block mt-1 ${
                isOverBudget ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {isOverBudget
                ? `Exceeds Budget by ₹${Math.abs(simulation.budgetDelta)}!`
                : `₹${simulation.budgetDelta} Remaining from ₹2,000`}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Simulated Registrations</span>
            <div className="text-2xl font-black text-indigo-300">
              {simulation.estimatedRegistrations}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Target: 500 (
              {simulation.targetDelta >= 0 ? (
                <span className="text-emerald-400 font-semibold">+{simulation.targetDelta} Surplus</span>
              ) : (
                <span className="text-amber-400 font-semibold">{simulation.targetDelta} Shortfall</span>
              )}
              )
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Simulated Blended CAC</span>
            <div className="text-2xl font-black text-emerald-400">
              ₹{simulation.blendedCPA.toFixed(2)}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Per student registered
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Target Achievement</span>
            <div className="text-2xl font-black text-purple-400">
              {((simulation.estimatedRegistrations / 500) * 100).toFixed(0)}%
            </div>
            <span className="text-[11px] text-purple-400/80 font-medium block mt-1">
              500 Student Goal
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Adjust Spend Allocations &amp; Channel Cost Assumptions
          </h4>

          {/* Ambassador Channel */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
              <span className="font-bold text-white">Campus Ambassador Incentives</span>
              <div className="flex items-center gap-4 text-slate-300">
                <span>
                  Allocated: <strong className="text-amber-400">₹{params.ambassadorSpend}</strong>
                </span>
                <span>
                  Est. CPA: <strong className="text-indigo-300">₹{params.ambassadorCPA}</strong>
                </span>
                <span>
                  Est. Yield:{" "}
                  <strong className="text-emerald-400">
                    {Math.round(params.ambassadorSpend / params.ambassadorCPA)} signups
                  </strong>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400">Spend Slider (₹)</label>
                <input
                  type="range"
                  min={0}
                  max={1500}
                  step={50}
                  value={params.ambassadorSpend}
                  onChange={(e) => handleSpendChange("ambassadorSpend", Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Estimated Cost per Signup (₹)</label>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={0.5}
                  value={params.ambassadorCPA}
                  onChange={(e) => handleSpendChange("ambassadorCPA", Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Student Referral Channel */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
              <span className="font-bold text-white">Build Buddy Student Referral Rewards</span>
              <div className="flex items-center gap-4 text-slate-300">
                <span>
                  Allocated: <strong className="text-amber-400">₹{params.referralSpend}</strong>
                </span>
                <span>
                  Est. CPA: <strong className="text-indigo-300">₹{params.referralCPA}</strong>
                </span>
                <span>
                  Est. Yield:{" "}
                  <strong className="text-emerald-400">
                    {Math.round(params.referralSpend / params.referralCPA)} signups
                  </strong>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400">Spend Slider (₹)</label>
                <input
                  type="range"
                  min={0}
                  max={1200}
                  step={50}
                  value={params.referralSpend}
                  onChange={(e) => handleSpendChange("referralSpend", Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Estimated Cost per Signup (₹)</label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.2}
                  value={params.referralCPA}
                  onChange={(e) => handleSpendChange("referralCPA", Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* College Community Outreach */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
              <span className="font-bold text-white">College Clubs &amp; Community Outreach</span>
              <div className="flex items-center gap-4 text-slate-300">
                <span>
                  Allocated: <strong className="text-amber-400">₹{params.communitySpend}</strong>
                </span>
                <span>
                  Est. CPA: <strong className="text-indigo-300">₹{params.communityCPA}</strong>
                </span>
                <span>
                  Est. Yield:{" "}
                  <strong className="text-emerald-400">
                    {Math.round(params.communitySpend / params.communityCPA)} signups
                  </strong>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400">Spend Slider (₹)</label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={params.communitySpend}
                  onChange={(e) => handleSpendChange("communitySpend", Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Estimated Cost per Signup (₹)</label>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.5}
                  value={params.communityCPA}
                  onChange={(e) => handleSpendChange("communityCPA", Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Creative Materials */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
              <span className="font-bold text-white">Creative &amp; WhatsApp Visual Pack</span>
              <div className="flex items-center gap-4 text-slate-300">
                <span>
                  Allocated: <strong className="text-amber-400">₹{params.creativeSpend}</strong>
                </span>
                <span>
                  Est. CPA: <strong className="text-indigo-300">₹{params.creativeCPA}</strong>
                </span>
                <span>
                  Est. Yield:{" "}
                  <strong className="text-emerald-400">
                    {Math.round(params.creativeSpend / params.creativeCPA)} signups
                  </strong>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400">Spend Slider (₹)</label>
                <input
                  type="range"
                  min={0}
                  max={800}
                  step={50}
                  value={params.creativeSpend}
                  onChange={(e) => handleSpendChange("creativeSpend", Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Estimated Cost per Signup (₹)</label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={params.creativeCPA}
                  onChange={(e) => handleSpendChange("creativeCPA", Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Output Table */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Simulated Channel Contribution Summary
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Channel Name</th>
                  <th className="py-2.5 px-3 text-right">Proposed Spend</th>
                  <th className="py-2.5 px-3 text-right">Assumed CPA</th>
                  <th className="py-2.5 px-3 text-right">Estimated Registrations</th>
                  <th className="py-2.5 px-3 text-right">% Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {simulation.channelBreakdown.map((ch) => (
                  <tr key={ch.channel} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-medium text-white">{ch.channel}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                      ₹{ch.spend}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-indigo-300">
                      {ch.cpa > 0 ? `₹${ch.cpa}` : "Free"}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                      {ch.estimatedRegs}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400">
                      {(
                        (ch.estimatedRegs /
                          Math.max(1, simulation.estimatedRegistrations)) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
