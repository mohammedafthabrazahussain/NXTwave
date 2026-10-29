"use client";

import { useState } from "react";
import {
  IndianRupee,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  Download,
  Receipt,
  PieChart as PieIcon,
  ShieldAlert,
  Check,
} from "lucide-react";
import { Expense, ExpenseCategory } from "@/types";

interface BudgetTrackerProps {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  percentSpent: number;
  categoryBreakdown: Record<string, number>;
  expenses: Expense[];
  onRefresh: () => void;
}

export default function BudgetTracker({
  totalBudget = 2000,
  totalSpent = 0,
  remainingBudget = 2000,
  percentSpent = 0,
  categoryBreakdown = {},
  expenses = [],
  onRefresh,
}: BudgetTrackerProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState<ExpenseCategory>("Campus Ambassador Incentives");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [receiptNote, setReceiptNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories: ExpenseCategory[] = [
    "Campus Ambassador Incentives",
    "Creative & Promotional Materials",
    "Student Community Outreach",
    "Referral Incentives",
    "Miscellaneous",
  ];

  const openAddModal = () => {
    setTitle("");
    setAmount("");
    setCategory("Campus Ambassador Incentives");
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setReceiptNote("");
    setError(null);
    setEditingExpense(null);
    setShowAddModal(true);
  };

  const openEditModal = (exp: Expense) => {
    setEditingExpense(exp);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDate(exp.date);
    setDescription(exp.description);
    setReceiptNote(exp.receiptNote || "");
    setError(null);
    setShowAddModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setError("Please specify an amount greater than ₹0.");
      return;
    }

    // Client-side guardrail check
    if (!editingExpense && numAmount > remainingBudget) {
      setError(
        `Budget Guardrail Exceeded: You cannot spend ₹${numAmount}. Only ₹${remainingBudget} remains out of the ₹2,000 budget cap.`
      );
      return;
    }

    if (editingExpense) {
      const remainingWithoutThis = remainingBudget + editingExpense.amount;
      if (numAmount > remainingWithoutThis) {
        setError(
          `Updated amount ₹${numAmount} exceeds available ₹${remainingWithoutThis}.`
        );
        return;
      }
    }

    setLoading(true);

    try {
      const url = editingExpense
        ? `/api/admin/expenses/${editingExpense.id}`
        : "/api/admin/expenses";
      const method = editingExpense ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: numAmount,
          category,
          date,
          description,
          receiptNote,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save expense.");

      setShowAddModal(false);
      onRefresh();
    } catch (err: any) {
      setError(err.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, expTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${expTitle}"? Budget will be restored.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/expenses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete.");
      onRefresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleExportCSV = () => {
    window.open("/api/admin/export?type=expenses", "_blank");
  };

  const isNearLimit = remainingBudget <= 400 && remainingBudget > 0;
  const isExhausted = remainingBudget <= 0;

  return (
    <div className="space-y-6">
      {/* Budget Summary Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <IndianRupee className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">
                  ₹2,000 Campaign Budget Command
                </h3>
                <p className="text-xs text-slate-400">
                  Strict Capital Allocation &bull; Zero Spending Silently Exceeding Policy
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Export Expense Ledger (CSV)</span>
            </button>

            <button
              onClick={openAddModal}
              disabled={isExhausted}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Warning Banners */}
        {isNearLimit && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Budget Warning:</strong> Only ₹{remainingBudget} remaining! You have spent {percentSpent}% of the ₹2,000 campaign allocation.
            </span>
          </div>
        )}

        {isExhausted && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong>Budget Cap Reached:</strong> ₹2,000 has been completely utilized. No further expenses can be logged without modifying prior allocations.
            </span>
          </div>
        )}

        {/* 3 Metric Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total Authorized Budget</span>
            <div className="text-2xl font-black text-white">₹{totalBudget.toLocaleString("en-IN")}</div>
            <span className="text-[11px] text-slate-500">Strict Cap for 7-Day Campaign</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Total Recorded Spend</span>
            <div className="text-2xl font-black text-amber-400">₹{totalSpent.toLocaleString("en-IN")}</div>
            <span className="text-[11px] text-amber-400/80 font-medium">
              {percentSpent}% Budget Utilized
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Remaining Available Balance</span>
            <div className="text-2xl font-black text-emerald-400">
              ₹{remainingBudget.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-emerald-400/80 font-medium">
              ₹{(remainingBudget / 4).toFixed(0)}/day runway for Days 4-7
            </span>
          </div>
        </div>

        {/* Utilization Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>Budget Depletion: ₹{totalSpent} of ₹2,000</span>
            <span className={percentSpent > 80 ? "text-amber-400" : "text-emerald-400"}>
              {percentSpent}% Spent
            </span>
          </div>
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentSpent > 90
                  ? "bg-red-500"
                  : percentSpent > 75
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min(100, percentSpent)}%` }}
            />
          </div>
        </div>

        {/* Category Breakdown Chips */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
            <PieIcon className="w-3.5 h-3.5 text-indigo-400" />
            Spend Breakdown by Category
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const catSpend = categoryBreakdown[cat] || 0;
              const catShare = totalSpent > 0 ? ((catSpend / totalSpent) * 100).toFixed(0) : 0;
              return (
                <div
                  key={cat}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80"
                >
                  <div className="text-[11px] text-slate-400 truncate" title={cat}>
                    {cat}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">₹{catSpend}</div>
                  <div className="text-[10px] text-indigo-400 font-medium mt-0.5">
                    {catShare}% of spend
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expense History Ledger */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Expense History Ledger ({expenses.length} Entries)</span>
            </h4>
            <p className="text-xs text-slate-400">
              Transparent log of every rupee disbursed with purpose &amp; audit notes.
            </p>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="py-10 text-center text-slate-500 text-xs">
            No expenses logged yet. Click &ldquo;Add Expense&rdquo; above to record your first entry.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Title &amp; Purpose</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Receipt / Ref</th>
                  <th className="py-3 px-3 text-right">Amount (₹)</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-300 whitespace-nowrap">
                      {exp.date}
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-semibold text-white">{exp.title}</div>
                      <div className="text-[11px] text-slate-400 truncate" title={exp.description}>
                        {exp.description}
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 border border-slate-700 text-slate-300">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px] font-mono">
                      {exp.receiptNote || "—"}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-amber-400 text-sm whitespace-nowrap">
                      ₹{exp.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(exp)}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                          title="Edit Expense"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id, exp.title)}
                          className="p-1.5 rounded-lg hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete Expense"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Add or Edit Expense */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">
              {editingExpense ? "Edit Expense Entry" : "Record New Campaign Expense"}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Budget Cap: ₹2,000 &bull; Currently Remaining:{" "}
              <strong className="text-emerald-400">
                ₹{editingExpense ? remainingBudget + editingExpense.amount : remainingBudget}
              </strong>
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/30 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Expense Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Ambassador Activation Incentives"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={editingExpense ? remainingBudget + editingExpense.amount : remainingBudget}
                    placeholder="e.g. 350"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Purpose / Description *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Explain why this spend was made and expected growth output..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Receipt / Proof Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI Ref / Invoice # / Pledged Pool ID"
                  value={receiptNote}
                  onChange={(e) => setReceiptNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingExpense ? "Update Expense" : "Confirm Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
