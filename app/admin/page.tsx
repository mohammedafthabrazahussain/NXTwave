"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import CampaignOverview from "@/components/admin/CampaignOverview";
import BudgetTracker from "@/components/admin/BudgetTracker";
import ChannelAnalyticsView from "@/components/admin/ChannelAnalyticsView";
import DailyTrackerView from "@/components/admin/DailyTrackerView";
import GrowthCopilotView from "@/components/admin/GrowthCopilotView";
import SimulatorView from "@/components/admin/SimulatorView";
import DeliverablesView from "@/components/admin/DeliverablesView";
import {
  LayoutDashboard,
  IndianRupee,
  Share2,
  Calendar,
  Sparkles,
  Sliders,
  FileCheck,
  Download,
  RefreshCw,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "budget" | "channels" | "daily" | "copilot" | "simulator" | "deliverables" | "export"
  >("overview");

  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/api/admin/metrics");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to load metrics");

      const data = await res.json();
      setMetrics(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message || "Failed to load admin metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a12] flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs font-medium">Authenticating &amp; syncing campaign data...</span>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-[#070a12] flex flex-col items-center justify-center text-slate-300 p-4">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center max-w-md">
          <h3 className="text-lg font-bold text-white mb-2">Error Loading Dashboard</h3>
          <p className="text-xs text-red-400 mb-4">{error || "Could not retrieve metrics"}</p>
          <button
            onClick={fetchMetrics}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Campaign Overview", icon: LayoutDashboard },
    { id: "budget", label: "₹2,000 Budget & Expenses", icon: IndianRupee },
    { id: "channels", label: "Channel CAC & Analytics", icon: Share2 },
    { id: "daily", label: "7-Day Tracker", icon: Calendar },
    { id: "copilot", label: "Growth Copilot", icon: Sparkles, badge: "AI" },
    { id: "simulator", label: "Budget & Growth Simulator", icon: Sliders },
    { id: "deliverables", label: "Assignment Deliverables", icon: FileCheck, badge: "NxtWave" },
    { id: "export", label: "Data Exports", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col">
      <AdminHeader backendStatus={metrics.backendStatus} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-[11px] shrink-0 pl-4">
            <button
              onClick={fetchMetrics}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <span className="hidden lg:inline">Synced {lastUpdated}</span>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <CampaignOverview
            metrics={{
              totalTarget: metrics.totalTarget,
              campaignDurationDays: metrics.campaignDurationDays,
              currentDay: metrics.currentDay,
              totalRegistrations: metrics.totalRegistrations,
              remainingRegistrations: metrics.remainingRegistrations,
              percentTargetAchieved: metrics.percentTargetAchieved,
              status: metrics.status,
              dailyTargets: metrics.dailyTargets,
              totalBudget: metrics.totalBudget,
              totalSpent: metrics.totalSpent,
              remainingBudget: metrics.remainingBudget,
            }}
          />
        )}

        {/* Tab 2: Budget & Expenses */}
        {activeTab === "budget" && (
          <BudgetTracker
            totalBudget={metrics.totalBudget}
            totalSpent={metrics.totalSpent}
            remainingBudget={metrics.remainingBudget}
            percentSpent={metrics.percentBudgetSpent}
            categoryBreakdown={metrics.categoryBreakdown}
            expenses={metrics.recentExpenses || []}
            onRefresh={fetchMetrics}
          />
        )}

        {/* Tab 3: Channels */}
        {activeTab === "channels" && (
          <ChannelAnalyticsView
            channels={metrics.channelAnalytics || []}
            totalRegistrations={metrics.totalRegistrations}
          />
        )}

        {/* Tab 4: 7-Day Daily Tracker */}
        {activeTab === "daily" && (
          <DailyTrackerView
            targets={metrics.dailyTargets || []}
            onRefresh={fetchMetrics}
          />
        )}

        {/* Tab 5: Growth Copilot */}
        {activeTab === "copilot" && <GrowthCopilotView />}

        {/* Tab 6: Simulator */}
        {activeTab === "simulator" && <SimulatorView />}

        {/* Tab 7: Deliverables */}
        {activeTab === "deliverables" && <DeliverablesView />}

        {/* Tab 8: Data Exports */}
        {activeTab === "export" && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-400" />
                <span>Admin Campaign Data Export Hub</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Download structured CSV files for registration records, expense ledgers, channel performance, and 7-day milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Student Registrations</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete list of registered students, college, branch, referral attribution &amp; timestamps.
                  </p>
                </div>
                <a
                  href="/api/admin/export?type=registrations"
                  target="_blank"
                  className="mt-4 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Registrations CSV</span>
                </a>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Expense Ledger (₹2,000 Cap)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Audited list of all disbursements, categories, amounts, purpose notes, and receipt references.
                  </p>
                </div>
                <a
                  href="/api/admin/export?type=expenses"
                  target="_blank"
                  className="mt-4 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Expenses CSV</span>
                </a>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Channel Analytics &amp; CAC</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Acquisition channels, registration counts, percentage contribution, spend and unit CAC.
                  </p>
                </div>
                <a
                  href="/api/admin/export?type=channels"
                  target="_blank"
                  className="mt-4 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Channels CSV</span>
                </a>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">7-Day Trajectory Plan</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Milestone plan (25 &rarr; 500), actual counts, variances, and logged daily actions.
                  </p>
                </div>
                <a
                  href="/api/admin/export?type=daily"
                  target="_blank"
                  className="mt-4 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download 7-Day Plan CSV</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
