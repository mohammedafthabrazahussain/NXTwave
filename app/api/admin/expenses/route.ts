import { NextRequest, NextResponse } from "next/server";
import { checkAdminRequestAuth } from "@/lib/auth";
import { getExpenses, createExpense } from "@/lib/db";
import { ExpenseCategory } from "@/types";

export async function GET(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const expenses = await getExpenses();
    const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
    const remainingBudget = Math.max(0, 2000 - totalSpent);

    return NextResponse.json({
      expenses,
      totalBudget: 2000,
      totalSpent,
      remainingBudget,
      percentSpent: Number(((totalSpent / 2000) * 100).toFixed(1)),
      warning:
        remainingBudget <= 300
          ? `Budget Warning: Only ₹${remainingBudget} remaining! Approach spending with caution.`
          : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to retrieve expenses." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, amount, category, date, description, receiptNote } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Expense title is required." }, { status: 400 });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid expense amount greater than ₹0." },
        { status: 400 }
      );
    }

    const validCategories: ExpenseCategory[] = [
      "Campus Ambassador Incentives",
      "Creative & Promotional Materials",
      "Student Community Outreach",
      "Referral Incentives",
      "Miscellaneous",
    ];

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(", ")}` },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json({ error: "Date is required." }, { status: 400 });
    }

    if (!description || !description.trim()) {
      return NextResponse.json({ error: "Purpose or description is required." }, { status: 400 });
    }

    const created = await createExpense({
      title,
      amount: numericAmount,
      category,
      date,
      description,
      receiptNote,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Expense of ₹${numericAmount} logged successfully.`,
        expense: created,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to record expense." },
      { status: 400 }
    );
  }
}
