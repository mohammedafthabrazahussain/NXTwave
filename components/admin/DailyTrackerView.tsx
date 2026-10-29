"use client";

import { useState } from "react";
import { Calendar, Download, Edit3, Check, X, Info } from "lucide-react";
import { DailyTarget } from "@/types";

interface DailyTrackerViewProps {
  targets: DailyTarget[];
  onRefresh: () => void;
}

export default function DailyTrackerView({ targets = [], onRefresh }: DailyTrackerViewProps) {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editTargetCumulative, setEditTargetCumulative] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleStartEdit = (t: DailyTarget) => {
    setEditingDay(t.day);
    setEditTargetCumulative(t.targetCumulative);
    setEditNotes(t.notes || "");
  };

  const handleCancelEdit = () => {
    setEditingDay(null);
  };

  const handleSaveEdit = async (day: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/targets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          targetCumulative: Number(editTargetCumulative),
          notes: editNotes,
        }),
      });

      if (!res.ok) throw new Error("Failed to update target.");
      setEditingDay(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || "Failed to update daily plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    window.open("/api/admin/export?type=daily", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">
                  7-Day Campaign Execution Tracker
                </h3>
                <p className="text-xs text-slate-400">
                  Target Trajectory: 25 &rarr; 100 &rarr; 200 &rarr; 300 &rarr; 375 &rarr; 450 &rarr; 500
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export 7-Day Plan (CSV)</span>
          </button>
        </div>

        {/* Planning Assumption Disclaimer */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            <strong>Planning Assumption Notice:</strong> The trajectory (25, 100, 200, 300, 375, 450, 500) represents an operational staging model to guide growth actions, not a guaranteed projection. You can edit targets and log daily actions directly below.
          </span>
        </div>

        {/* 7-Day Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Day &amp; Focus Phase</th>
                <th className="py-3 px-3 text-right">Target (Daily)</th>
                <th className="py-3 px-3 text-right">Target (Cumulative)</th>
                <th className="py-3 px-3 text-right">Actual (Daily)</th>
                <th className="py-3 px-3 text-right">Actual (Cumulative)</th>
                <th className="py-3 px-3 text-right">Variance</th>
                <th className="py-3 px-3">Actions &amp; Growth Notes</th>
                <th className="py-3 px-3 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {targets.map((t) => {
                const isEditing = editingDay === t.day;
                const isPositive = t.difference >= 0;
                return (
                  <tr key={t.day} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 font-mono text-[11px] font-bold flex items-center justify-center border border-indigo-500/30">
                          D{t.day}
                        </span>
                        <span>{t.dateLabel}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right text-slate-300 font-mono">
                      {t.targetDaily}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-white">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editTargetCumulative}
                          onChange={(e) => setEditTargetCumulative(Number(e.target.value))}
                          className="w-20 px-2 py-1 rounded bg-slate-950 border border-indigo-500 text-white text-right text-xs"
                        />
                      ) : (
                        t.targetCumulative
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono text-emerald-300">
                      {t.actualDaily > 0 ? t.actualDaily : "—"}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-400">
                      {t.actualCumulative > 0 ? t.actualCumulative : "—"}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-semibold whitespace-nowrap">
                      {t.actualCumulative > 0 ? (
                        <span className={isPositive ? "text-emerald-400" : "text-amber-400"}>
                          {isPositive ? `+${t.difference}` : t.difference}
                        </span>
                      ) : (
                        <span className="text-slate-600">Upcoming</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-slate-300 max-w-xs">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full px-2 py-1 rounded bg-slate-950 border border-indigo-500 text-white text-xs"
                        />
                      ) : (
                        <span className="text-slate-400 text-[11px]">{t.notes}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      {isEditing ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleSaveEdit(t.day)}
                            disabled={loading}
                            className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(t)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                          title="Edit Day Plan"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
