import { NextRequest, NextResponse } from "next/server";
import { checkAdminRequestAuth } from "@/lib/auth";
import { getCampaignMetrics, getBackendStatus } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
  }

  try {
    const metrics = await getCampaignMetrics();
    const backendStatus = getBackendStatus();

    return NextResponse.json({
      ...metrics,
      backendStatus,
    });
  } catch (err: any) {
    console.error("Error fetching admin metrics:", err);
    return NextResponse.json(
      { error: "Failed to load campaign metrics." },
      { status: 500 }
    );
  }
}
