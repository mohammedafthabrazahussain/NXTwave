import { SimulationInput, SimulationResult } from "@/types";

export const DEFAULT_SIMULATION_INPUT: SimulationInput = {
  ambassadorSpend: 700,
  creativeSpend: 250,
  communitySpend: 400,
  referralSpend: 500,
  miscSpend: 150,
  ambassadorCPA: 4.5, // ₹4.5 per registration
  creativeCPA: 3.2,   // ₹3.2 per registration (infographics driving WhatsApp shares)
  communityCPA: 3.8,  // ₹3.8 per registration via club partnerships
  referralCPA: 2.2,   // ₹2.2 per registration via viral buddy incentives
  miscCPA: 5.0,
};

export function runSimulation(input: SimulationInput): SimulationResult {
  const totalSpend =
    input.ambassadorSpend +
    input.creativeSpend +
    input.communitySpend +
    input.referralSpend +
    input.miscSpend;

  const budgetDelta = 2000 - totalSpend;

  const regsAmbassador =
    input.ambassadorCPA > 0 ? Math.round(input.ambassadorSpend / input.ambassadorCPA) : 0;
  const regsCreative =
    input.creativeCPA > 0 ? Math.round(input.creativeSpend / input.creativeCPA) : 0;
  const regsCommunity =
    input.communityCPA > 0 ? Math.round(input.communitySpend / input.communityCPA) : 0;
  const regsReferral =
    input.referralCPA > 0 ? Math.round(input.referralSpend / input.referralCPA) : 0;
  const regsMisc = input.miscCPA > 0 ? Math.round(input.miscSpend / input.miscCPA) : 0;

  // Add baseline organic word-of-mouth conversion (estimated ~45-60 students with zero media cost)
  const organicBaseline = 50;

  const estimatedRegistrations =
    regsAmbassador + regsCreative + regsCommunity + regsReferral + regsMisc + organicBaseline;

  const targetDelta = estimatedRegistrations - 500;
  const blendedCPA =
    estimatedRegistrations > 0 ? Number((totalSpend / estimatedRegistrations).toFixed(2)) : 0;

  return {
    totalSpend,
    budgetDelta,
    estimatedRegistrations,
    targetDelta,
    blendedCPA,
    channelBreakdown: [
      {
        channel: "Campus Ambassadors",
        spend: input.ambassadorSpend,
        cpa: input.ambassadorCPA,
        estimatedRegs: regsAmbassador,
      },
      {
        channel: "Creative & Visual Pack",
        spend: input.creativeSpend,
        cpa: input.creativeCPA,
        estimatedRegs: regsCreative,
      },
      {
        channel: "College Clubs & Communities",
        spend: input.communitySpend,
        cpa: input.communityCPA,
        estimatedRegs: regsCommunity,
      },
      {
        channel: "Student Referral Incentives",
        spend: input.referralSpend,
        cpa: input.referralCPA,
        estimatedRegs: regsReferral,
      },
      {
        channel: "Emergency / Misc Reserve",
        spend: input.miscSpend,
        cpa: input.miscCPA,
        estimatedRegs: regsMisc,
      },
      {
        channel: "Organic Word-of-Mouth Baseline",
        spend: 0,
        cpa: 0,
        estimatedRegs: organicBaseline,
      },
    ],
  };
}
