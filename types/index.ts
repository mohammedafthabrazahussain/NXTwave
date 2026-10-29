export type EngineeringBranch =
  | "Computer Science / IT"
  | "Electronics & Communication (ECE)"
  | "Electrical & Electronics (EEE)"
  | "Mechanical Engineering"
  | "Civil Engineering"
  | "AI & Data Science"
  | "Other Engineering";

export type AcquisitionSource =
  | "Campus Ambassadors"
  | "College Clubs & Communities"
  | "WhatsApp Outreach"
  | "Student Referrals"
  | "Organic / Direct"
  | "Other";

export type ExpenseCategory =
  | "Campus Ambassador Incentives"
  | "Creative & Promotional Materials"
  | "Student Community Outreach"
  | "Referral Incentives"
  | "Miscellaneous";

export interface Registration {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: EngineeringBranch | string;
  graduationYear: string;
  phone?: string;
  utmSource: AcquisitionSource | string;
  utmMedium?: string;
  utmCampaign?: string;
  referralCode: string;
  referredBy?: string | null;
  quizResultTitle?: string;
  createdAt: string;
}

export interface Referral {
  id: string;
  referrerCode: string;
  refereeEmail: string;
  refereeName: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  receiptNote?: string;
  createdAt: string;
}

export interface DailyTarget {
  day: number; // 1 to 7
  dateLabel: string;
  targetCumulative: number;
  targetDaily: number;
  actualDaily: number;
  actualCumulative: number;
  difference: number;
  notes: string;
}

export interface ChannelAnalytics {
  channel: AcquisitionSource;
  registrations: number;
  percentage: number;
  spend: number;
  cpa: number | null; // Cost per acquisition in ₹
}

export interface GrowthCopilotRecommendation {
  id: string;
  priority: "HIGH" | "MEDIUM" | "OPPORTUNITY" | "WARNING";
  headline: string;
  reason: string;
  suggestedAction: string;
  projectedImpact: string;
  category: "budget" | "channel" | "referral" | "outreach";
}

export interface SimulationInput {
  ambassadorSpend: number;
  creativeSpend: number;
  communitySpend: number;
  referralSpend: number;
  miscSpend: number;
  ambassadorCPA: number;
  creativeCPA: number;
  communityCPA: number;
  referralCPA: number;
  miscCPA: number;
}

export interface SimulationResult {
  totalSpend: number;
  budgetDelta: number; // difference from 2000
  estimatedRegistrations: number;
  targetDelta: number; // difference from 500
  blendedCPA: number;
  channelBreakdown: {
    channel: string;
    spend: number;
    estimatedRegs: number;
    cpa: number;
  }[];
}
