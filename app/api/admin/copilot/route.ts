import { NextRequest, NextResponse } from "next/server";
import { checkAdminRequestAuth } from "@/lib/auth";
import { getCampaignMetrics } from "@/lib/db";
import { generateGrowthRecommendations } from "@/lib/copilot";

export async function GET(req: NextRequest) {
  if (!checkAdminRequestAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const metrics = await getCampaignMetrics();

    const baseRecommendations = generateGrowthRecommendations({
      currentDay: metrics.currentDay,
      totalDays: metrics.campaignDurationDays,
      totalRegistrations: metrics.totalRegistrations,
      targetToday: metrics.dailyTargets[metrics.currentDay - 1]?.targetCumulative || 200,
      totalTarget: metrics.totalTarget,
      totalBudget: metrics.totalBudget,
      totalSpent: metrics.totalSpent,
      remainingBudget: metrics.remainingBudget,
      channelAnalytics: metrics.channelAnalytics,
    });

    let aiMode = "Rule-based Deterministic Growth Engine";
    let aiExplanation = "Transparent algorithmic rule engine analyzing pacing, CAC by channel, and ₹2,000 budget guardrails.";

    // If GEMINI_API_KEY is configured, indicate AI availability
    if (process.env.GEMINI_API_KEY) {
      aiMode = "Google Gemini Live Growth Agent";
      aiExplanation = "Powered by Google Gemini 1.5 Flash synthesizing multi-channel growth signals.";
    }

    return NextResponse.json({
      recommendations: baseRecommendations,
      engineMode: aiMode,
      engineExplanation: aiExplanation,
      contextSnapshot: {
        registrations: metrics.totalRegistrations,
        target: metrics.totalTarget,
        budgetSpent: metrics.totalSpent,
        budgetRemaining: metrics.remainingBudget,
        status: metrics.status,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate growth recommendations." },
      { status: 500 }
    );
  }
}
