import { NextRequest, NextResponse } from "next/server";
import { checkAdminRequestAuth } from "@/lib/auth";
import { updateExpense, deleteExpense } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = params.id;
    const body = await req.json();

    const updated = await updateExpense(id, body);
    return NextResponse.json({
      success: true,
      message: "Expense updated successfully.",
      expense: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update expense." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = params.id;
    const ok = await deleteExpense(id);
    if (!ok) {
      return NextResponse.json({ error: "Expense not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Expense deleted successfully. Budget allocation restored.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete expense." },
      { status: 400 }
    );
  }
}
