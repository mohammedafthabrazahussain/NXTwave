import { NextRequest, NextResponse } from "next/server";
import { checkAdminRequestAuth } from "@/lib/auth";
import { getDailyTargets, updateDailyTarget } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const targets = await getDailyTargets();
    return NextResponse.json({ targets });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch daily targets." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { day, targetCumulative, notes } = await req.json();
    if (!day || day < 1 || day > 7) {
      return NextResponse.json({ error: "Valid day (1-7) is required." }, { status: 400 });
    }

    const updated = await updateDailyTarget(day, {
      targetCumulative: targetCumulative !== undefined ? Number(targetCumulative) : undefined,
      notes,
    });

    return NextResponse.json({
      success: true,
      message: `Day ${day} plan updated successfully.`,
      target: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update target." },
      { status: 400 }
    );
  }
}
