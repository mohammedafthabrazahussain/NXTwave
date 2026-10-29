import { NextRequest, NextResponse } from "next/server";
import { getReferralsByCode } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    if (!code) {
      return NextResponse.json({ error: "Referral code required." }, { status: 400 });
    }

    const data = await getReferralsByCode(code);

    // Sanitize referee info for student privacy
    const sanitizedReferrals = data.referrals.map((r) => {
      const parts = r.refereeName.split(" ");
      const maskedName =
        parts.length > 1
          ? `${parts[0]} ${parts[1][0]}.`
          : parts[0];
      return {
        id: r.id,
        maskedName,
        createdAt: r.createdAt,
      };
    });

    return NextResponse.json({
      referralCode: data.referralCode,
      ownerName: data.ownerName,
      confirmedCount: data.confirmedCount,
      milestoneBadge:
        data.confirmedCount >= 5
          ? "Gold Ambassador (Unlocked ₹100 Voucher)"
          : data.confirmedCount >= 3
          ? "Silver Builder (Priority Q&A Seat)"
          : data.confirmedCount >= 1
          ? "Bronze Buddy (Exclusive Project Source Code)"
          : "Kickstart: Invite your first friend",
      referrals: sanitizedReferrals,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch referral details." },
      { status: 500 }
    );
  }
}
