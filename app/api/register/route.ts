import { NextRequest, NextResponse } from "next/server";
import { createRegistration, checkEmailRegistered } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      college,
      branch,
      graduationYear,
      phone,
      utmSource,
      utmMedium,
      utmCampaign,
      referredBy,
      quizResultTitle,
    } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid college or personal email address." },
        { status: 400 }
      );
    }

    if (!college || typeof college !== "string" || college.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your engineering college name." },
        { status: 400 }
      );
    }

    if (!branch) {
      return NextResponse.json(
        { error: "Please select your engineering branch." },
        { status: 400 }
      );
    }

    if (!graduationYear) {
      return NextResponse.json(
        { error: "Please select your graduation year." },
        { status: 400 }
      );
    }

    // Duplicate check
    const isAlready = await checkEmailRegistered(email.trim());
    if (isAlready) {
      return NextResponse.json(
        {
          error: "You are already registered with this email! Check your inbox or search for your referral code.",
          alreadyRegistered: true,
        },
        { status: 409 }
      );
    }

    const { registration, isReferralValid } = await createRegistration({
      name,
      email,
      college,
      branch,
      graduationYear,
      phone,
      utmSource: utmSource || (referredBy ? "Student Referrals" : "Organic / Direct"),
      utmMedium,
      utmCampaign,
      referredBy: referredBy || null,
      quizResultTitle,
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const referralLink = `${origin}/?ref=${registration.referralCode}`;

    return NextResponse.json(
      {
        success: true,
        message: "Registration confirmed! You're booked for the live 60-minute AI workshop.",
        registration: {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          referralCode: registration.referralCode,
          referralLink,
          quizResultTitle: registration.quizResultTitle,
        },
        referralAttributed: isReferralValid,
        officialWorkshopUrl:
          process.env.NEXT_PUBLIC_OFFICIAL_REGISTRATION_URL ||
          "https://nxtwave.tech/workshops/ai-in-60-mins",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to complete registration. Please try again." },
      { status: 500 }
    );
  }
}
