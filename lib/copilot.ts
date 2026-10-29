import { GrowthCopilotRecommendation, ChannelAnalytics } from "@/types";

interface CampaignContext {
  currentDay: number;
  totalDays: number;
  totalRegistrations: number;
  targetToday: number;
  totalTarget: number;
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  channelAnalytics: ChannelAnalytics[];
}

export function generateGrowthRecommendations(
  ctx: CampaignContext
): GrowthCopilotRecommendation[] {
  const recommendations: GrowthCopilotRecommendation[] = [];
  const daysLeft = Math.max(1, ctx.totalDays - ctx.currentDay);
  const remainingRegistrations = Math.max(0, ctx.totalTarget - ctx.totalRegistrations);
  const runRateRequired = Math.ceil(remainingRegistrations / daysLeft);
  const paceRatio = ctx.totalRegistrations / Math.max(1, ctx.targetToday);

  // 1. Pacing and Target Analysis
  if (paceRatio < 0.9) {
    recommendations.push({
      id: "rec-pacing-behind",
      priority: "HIGH",
      headline: `Pace Warning: Registrations are ${Math.round((1 - paceRatio) * 100)}% behind Day ${ctx.currentDay} Target`,
      reason: `Current count is ${ctx.totalRegistrations} vs target of ${ctx.targetToday}. To hit 500 registrations by Day 7, you need ~${runRateRequired} registrations/day across remaining ${daysLeft} days.`,
      suggestedAction:
        "Mobilize your top 5 campus ambassadors with a 24-hour sprint challenge: offer an additional ₹50 milestone voucher for every 10 verified registrations they secure today.",
      projectedImpact: "+45 to +60 immediate registrations within 24 hours at ~₹1.80/reg.",
      category: "outreach",
    });
  } else if (paceRatio >= 1.0) {
    recommendations.push({
      id: "rec-pacing-strong",
      priority: "OPPORTUNITY",
      headline: `Strong Momentum: Tracking ${Math.round((paceRatio - 1) * 100)}% Ahead of Daily Schedule`,
      reason: `You have reached ${ctx.totalRegistrations} registrations against the planned ${ctx.targetToday}. The initial organic and WhatsApp loops are converting smoothly.`,
      suggestedAction:
        "Preserve remaining budget for Days 5-6. Introduce the 'Build Buddy Leaderboard' to capitalize on early virality without incurring extra promotional costs.",
      projectedImpact: "Maintains compounding peer virality while protecting ₹900+ reserve capital.",
      category: "referral",
    });
  }

  // 2. Channel CAC & Efficiency Analysis
  const sortedChannels = [...ctx.channelAnalytics].sort((a, b) => b.registrations - a.registrations);
  const topChannel = sortedChannels[0];
  const lowestCacChannel = [...ctx.channelAnalytics]
    .filter((c) => c.cpa !== null && c.cpa > 0)
    .sort((a, b) => (a.cpa || 999) - (b.cpa || 999))[0];

  if (lowestCacChannel && lowestCacChannel.cpa !== null) {
    recommendations.push({
      id: "rec-channel-efficiency",
      priority: "HIGH",
      headline: `Scale High-Efficiency Channel: '${lowestCacChannel.channel}' (CAC ₹${lowestCacChannel.cpa.toFixed(2)})`,
      reason: `'${lowestCacChannel.channel}' is yielding the lowest acquisition cost across the campaign, driving ${lowestCacChannel.registrations} registrations (${lowestCacChannel.percentage}% of total).`,
      suggestedAction:
        `Reallocate ₹250 from unspent general promotional budget into '${lowestCacChannel.channel}' micro-incentives and direct student community broadcasts.`,
      projectedImpact: `Estimated +65 to +80 additional signups at an effective CAC under ₹3.50.`,
      category: "channel",
    });
  }

  // 3. Referral Engine Optimization
  const referralChannel = ctx.channelAnalytics.find((c) => c.channel === "Student Referrals");
  const referralShare = referralChannel ? referralChannel.percentage : 0;

  if (referralShare < 25) {
    recommendations.push({
      id: "rec-referral-boost",
      priority: "MEDIUM",
      headline: "Activate the Build Buddy Viral Loop",
      reason: `Student referrals currently contribute ${referralShare}% of registrations. Top growth campaigns in college tech communities typically generate 35-45% through peer loops.`,
      suggestedAction:
        "Update the post-registration WhatsApp share copy to emphasize project pairing: 'Register with my link so we can pair-program the AI ATS resume matcher together this weekend.'",
      projectedImpact: "Boosts viral coefficient (K-factor) from ~0.22 to >0.45.",
      category: "referral",
    });
  }

  // 4. Budget Runway and Safety Guardrails
  const dailyBudgetAllowance = ctx.remainingBudget / daysLeft;
  if (ctx.remainingBudget < 500 && daysLeft > 2) {
    recommendations.push({
      id: "rec-budget-alert",
      priority: "WARNING",
      headline: `Budget Guardrail: ₹${ctx.remainingBudget} Remaining for ${daysLeft} Days`,
      reason: `You have spent ₹${ctx.totalSpent} (₹${Math.round((ctx.totalSpent / ctx.totalBudget) * 100)}% of the total ₹2,000 cap). Available burn is ₹${Math.floor(dailyBudgetAllowance)}/day.`,
      suggestedAction:
        "Freeze all paid creative design expenses immediately. Channel 100% of the remaining ₹" +
        ctx.remainingBudget +
        " exclusively into guaranteed performance-linked referral micro-incentives.",
      projectedImpact: "Prevents budget overshoot while guaranteeing maximum student acquisition return per rupee.",
      category: "budget",
    });
  } else {
    recommendations.push({
      id: "rec-budget-healthy",
      priority: "OPPORTUNITY",
      headline: `Budget Health: ₹${ctx.remainingBudget} Remaining (Utilization: ${Math.round((ctx.totalSpent / ctx.totalBudget) * 100)}%)`,
      reason: `Budget pacing is disciplined at ₹${Math.floor(ctx.totalSpent / ctx.currentDay)}/day. You have sufficient headroom for the Day 6 final urgency campaign.`,
      suggestedAction:
        "Hold ₹400 in reserve for the Day 6 'Last 24 Hours / Final 50 Seats' push across college WhatsApp announcement channels.",
      projectedImpact: "Secures final closing spike without risking over-budget penalty.",
      category: "budget",
    });
  }

  return recommendations;
}
