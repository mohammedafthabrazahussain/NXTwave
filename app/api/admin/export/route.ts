import { NextRequest, NextResponse } from "next/server";
import { checkAdminRequestAuth } from "@/lib/auth";
import { getRegistrations, getExpenses, getDailyTargets, getCampaignMetrics } from "@/lib/db";

function escapeCSV(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "registrations";

  try {
    let csvData = "";
    let filename = `campus_pulse_${type}_${new Date().toISOString().split("T")[0]}.csv`;

    if (type === "registrations") {
      const regs = await getRegistrations();
      const headers = [
        "Registration ID",
        "Student Name",
        "Email",
        "College",
        "Branch",
        "Graduation Year",
        "Phone",
        "Acquisition Source",
        "Referral Code",
        "Referred By",
        "AI Quiz Recommendation",
        "Registration Timestamp",
      ];
      const rows = regs.map((r) => [
        escapeCSV(r.id),
        escapeCSV(r.name),
        escapeCSV(r.email),
        escapeCSV(r.college),
        escapeCSV(r.branch),
        escapeCSV(r.graduationYear),
        escapeCSV(r.phone || "N/A"),
        escapeCSV(r.utmSource),
        escapeCSV(r.referralCode),
        escapeCSV(r.referredBy || "Direct"),
        escapeCSV(r.quizResultTitle || "N/A"),
        escapeCSV(r.createdAt),
      ]);
      csvData = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    } else if (type === "expenses") {
      const expenses = await getExpenses();
      const headers = [
        "Expense ID",
        "Title",
        "Amount (INR)",
        "Category",
        "Date",
        "Purpose / Description",
        "Receipt Note",
        "Created At",
      ];
      const rows = expenses.map((e) => [
        escapeCSV(e.id),
        escapeCSV(e.title),
        escapeCSV(e.amount),
        escapeCSV(e.category),
        escapeCSV(e.date),
        escapeCSV(e.description),
        escapeCSV(e.receiptNote || "None"),
        escapeCSV(e.createdAt),
      ]);
      csvData = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    } else if (type === "channels") {
      const metrics = await getCampaignMetrics();
      const headers = [
        "Acquisition Channel",
        "Registrations",
        "Percentage Contribution (%)",
        "Attributed Spend (INR)",
        "Cost Per Registration / CAC (INR)",
      ];
      const rows = metrics.channelAnalytics.map((c) => [
        escapeCSV(c.channel),
        escapeCSV(c.registrations),
        escapeCSV(c.percentage),
        escapeCSV(c.spend),
        escapeCSV(c.cpa !== null ? c.cpa : "N/A"),
      ]);
      csvData = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    } else if (type === "daily") {
      const targets = await getDailyTargets();
      const headers = [
        "Day",
        "Milestone Label",
        "Target Daily",
        "Target Cumulative",
        "Actual Daily",
        "Actual Cumulative",
        "Variance (+/-)",
        "Campaign Notes / Actions Taken",
      ];
      const rows = targets.map((t) => [
        escapeCSV(t.day),
        escapeCSV(t.dateLabel),
        escapeCSV(t.targetDaily),
        escapeCSV(t.targetCumulative),
        escapeCSV(t.actualDaily),
        escapeCSV(t.actualCumulative),
        escapeCSV(t.difference),
        escapeCSV(t.notes),
      ]);
      csvData = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
    } else {
      return NextResponse.json({ error: "Invalid export type." }, { status: 400 });
    }

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to export CSV." },
      { status: 500 }
    );
  }
}
