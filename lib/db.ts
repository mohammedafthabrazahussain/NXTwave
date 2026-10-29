import fs from "fs";
import path from "path";
import {
  Registration,
  Referral,
  Expense,
  DailyTarget,
  AcquisitionSource,
  ChannelAnalytics,
  ExpenseCategory,
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "campus_pulse_db.json");

interface DatabaseSchema {
  registrations: Registration[];
  referrals: Referral[];
  expenses: Expense[];
  dailyTargets: DailyTarget[];
}

const DEFAULT_TARGETS: DailyTarget[] = [
  {
    day: 1,
    dateLabel: "Day 1 (Launch & Reps)",
    targetCumulative: 25,
    targetDaily: 25,
    actualDaily: 28,
    actualCumulative: 28,
    difference: 3,
    notes: "Kicked off 5 college ambassador groups and WhatsApp broadcast.",
  },
  {
    day: 2,
    dateLabel: "Day 2 (Club Drives)",
    targetCumulative: 100,
    targetDaily: 75,
    actualDaily: 78,
    actualCumulative: 106,
    difference: 6,
    notes: "AI Build DNA quiz shared across 8 student Discord and WhatsApp channels.",
  },
  {
    day: 3,
    dateLabel: "Day 3 (Build Buddy Push)",
    targetCumulative: 200,
    targetDaily: 100,
    actualDaily: 84,
    actualCumulative: 190,
    difference: -10,
    notes: "Referral contest rolled out; slight dip in mid-day organic clicks.",
  },
  {
    day: 4,
    dateLabel: "Day 4 (Project Teaser)",
    targetCumulative: 300,
    targetDaily: 100,
    actualDaily: 0,
    actualCumulative: 190,
    difference: -110,
    notes: "Planned: Syllabus & live AI code snippet teaser reveal.",
  },
  {
    day: 5,
    dateLabel: "Day 5 (College Leaderboard)",
    targetCumulative: 375,
    targetDaily: 75,
    actualDaily: 0,
    actualCumulative: 190,
    difference: -185,
    notes: "Planned: Campus leaderboard announcement for top referring colleges.",
  },
  {
    day: 6,
    dateLabel: "Day 6 (24h Final Countdown)",
    targetCumulative: 450,
    targetDaily: 75,
    actualDaily: 0,
    actualCumulative: 190,
    difference: -260,
    notes: "Planned: Urgency push: Last 50 seats announcement.",
  },
  {
    day: 7,
    dateLabel: "Day 7 (Workshop Day Blitz)",
    targetCumulative: 500,
    targetDaily: 50,
    actualDaily: 0,
    actualCumulative: 190,
    difference: -310,
    notes: "Planned: Final morning sprint before live broadcast.",
  },
];

const INITIAL_EXPENSES: Expense[] = [
  {
    id: "exp-1",
    title: "Campus Ambassador Activation Rewards",
    amount: 500,
    category: "Campus Ambassador Incentives",
    date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
    description: "₹100 micro-incentives for 5 lead college ambassadors across tier-2 engineering colleges.",
    receiptNote: "UPI transfer ref: UPI/CAMPUS/AMB/01-05",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "exp-2",
    title: "WhatsApp Interactive Quiz Infographics & Banners",
    amount: 250,
    category: "Creative & Promotional Materials",
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    description: "Canva Pro micro-pack + compressed bite-sized visual templates for college group sharing.",
    receiptNote: "Invoice: CNV-99420-OCT",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "exp-3",
    title: "Build Buddy Top Referrer Amazon Voucher Pool",
    amount: 350,
    category: "Referral Incentives",
    date: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
    description: "Pledged milestone rewards for students generating 5+ confirmed batchmate signups.",
    receiptNote: "Allocated Escrow Pool - POOL-REF-350",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

function generateSeedRegistrations(): { registrations: Registration[]; referrals: Referral[] } {
  const colleges = [
    "VNR Vignana Jyothi Institute of Technology",
    "Chaitanya Bharathi Institute of Technology (CBIT)",
    "JNTU College of Engineering Hyderabad",
    "BMS College of Engineering, Bengaluru",
    "PSG College of Technology, Coimbatore",
    "SRM Institute of Science and Technology",
    "Thapar Institute of Engineering and Technology",
    "MIT World Peace University, Pune",
  ];

  const branches = [
    "Computer Science / IT",
    "Electronics & Communication (ECE)",
    "Electrical & Electronics (EEE)",
    "Mechanical Engineering",
    "AI & Data Science",
  ];

  const sources: AcquisitionSource[] = [
    "Campus Ambassadors",
    "College Clubs & Communities",
    "WhatsApp Outreach",
    "Student Referrals",
    "Organic / Direct",
  ];

  const names = [
    "Aarav Sharma", "Pooja Reddy", "Karthik Nair", "Ananya Verma", "Sai Teja",
    "Rohan Deshmukh", "Sneha Iyer", "Vikram Patel", "Divya Sundaram", "Aditya Rao",
    "Nikhil Gupta", "Harshita Joshi", "Pranav Kulkarni", "Meera Krishnan", "Rahul Menon",
    "Deepak Choudhary", "Varun Shenoy", "Bhavya Sri", "Manoj Kumar", "Shreya Sen",
  ];

  const quizTitles = [
    "Smart Resume AI Screening Bot",
    "Real-time Vision Face Sentiment Analyzer",
    "Campus Placement FAQ Agent",
    "Automated IoT Sensor Alert Bot",
    "Code Bug Explainer & Fixer",
  ];

  const registrations: Registration[] = [];
  const referrals: Referral[] = [];

  // Seed 3 key ambassadors first
  const ambassadors = [
    { name: "Rahul Rep (CBIT)", email: "rahul.amb@cbit.ac.in", code: "CBIT-RAHUL" },
    { name: "Sneha Lead (VNR)", email: "sneha.lead@vnrvjiet.in", code: "VNR-SNEHA" },
    { name: "Karthik Club (BMS)", email: "karthik.bms@bmsce.ac.in", code: "BMS-KARTHIK" },
  ];

  ambassadors.forEach((amb, i) => {
    registrations.push({
      id: `seed-amb-${i + 1}`,
      name: amb.name,
      email: amb.email,
      college: colleges[i % colleges.length],
      branch: "Computer Science / IT",
      graduationYear: "2025",
      phone: "+91 98765 4321" + i,
      utmSource: "Campus Ambassadors",
      referralCode: amb.code,
      referredBy: null,
      quizResultTitle: quizTitles[i % quizTitles.length],
      createdAt: new Date(Date.now() - 3 * 86400000 + i * 3600000).toISOString(),
    });
  });

  // Seed sample registrations matching 190 count across days 1-3
  for (let i = 1; i <= 187; i++) {
    const name = `${names[i % names.length]} #${i}`;
    const email = `student${i}@campus.edu.in`;
    const college = colleges[i % colleges.length];
    const branch = branches[i % branches.length];
    const source = sources[i % sources.length];
    const refCode = `BUDDY-${1000 + i}`;
    
    let referredBy: string | null = null;
    if (source === "Student Referrals" || i % 4 === 0) {
      const parentAmb = ambassadors[i % ambassadors.length];
      referredBy = parentAmb.code;
      referrals.push({
        id: `ref-log-${i}`,
        referrerCode: parentAmb.code,
        refereeEmail: email,
        refereeName: name,
        createdAt: new Date(Date.now() - (3 - (i % 3)) * 86400000).toISOString(),
      });
    }

    registrations.push({
      id: `seed-reg-${i}`,
      name,
      email,
      college,
      branch,
      graduationYear: i % 5 === 0 ? "2026" : "2025",
      phone: "+91 9" + Math.floor(100000000 + Math.random() * 900000000),
      utmSource: source,
      utmMedium: "whatsapp",
      utmCampaign: "ai-in-60",
      referralCode: refCode,
      referredBy,
      quizResultTitle: quizTitles[i % quizTitles.length],
      createdAt: new Date(Date.now() - (3 - (i % 3)) * 86400000 + (i % 24) * 3600000).toISOString(),
    });
  }

  return { registrations, referrals };
}

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const { registrations, referrals } = generateSeedRegistrations();
    const initialData: DatabaseSchema = {
      registrations,
      referrals,
      expenses: INITIAL_EXPENSES,
      dailyTargets: DEFAULT_TARGETS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading database file, recreating fallback:", err);
    const { registrations, referrals } = generateSeedRegistrations();
    const fallback: DatabaseSchema = {
      registrations,
      referrals,
      expenses: INITIAL_EXPENSES,
      dailyTargets: DEFAULT_TARGETS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/* =====================================================================
   DATA ACCESS APIS
===================================================================== */

export async function getRegistrations(): Promise<Registration[]> {
  const db = ensureDbFile();
  return db.registrations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function checkEmailRegistered(email: string): Promise<boolean> {
  const db = ensureDbFile();
  return db.registrations.some(
    (r) => r.email.toLowerCase().trim() === email.toLowerCase().trim()
  );
}

export async function createRegistration(data: {
  name: string;
  email: string;
  college: string;
  branch: string;
  graduationYear: string;
  phone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referredBy?: string | null;
  quizResultTitle?: string;
}): Promise<{ registration: Registration; isReferralValid: boolean }> {
  const db = ensureDbFile();

  const cleanEmail = data.email.toLowerCase().trim();
  if (db.registrations.some((r) => r.email.toLowerCase().trim() === cleanEmail)) {
    throw new Error("This email is already registered for the workshop.");
  }

  // Generate unique readable referral code
  const baseCode = data.name.trim().split(" ")[0].toUpperCase().replace(/[^A-Z]/g, "") || "BUDDY";
  let uniqueCode = `${baseCode}-${Math.floor(100 + Math.random() * 900)}`;
  while (db.registrations.some((r) => r.referralCode === uniqueCode)) {
    uniqueCode = `${baseCode}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  let validReferrerCode: string | null = null;
  let isReferralValid = false;

  if (data.referredBy && data.referredBy.trim()) {
    const parent = db.registrations.find(
      (r) => r.referralCode.toUpperCase() === data.referredBy?.toUpperCase().trim()
    );
    // Disallow self-referral
    if (parent && parent.email.toLowerCase() !== cleanEmail) {
      validReferrerCode = parent.referralCode;
      isReferralValid = true;
    }
  }

  const newReg: Registration = {
    id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: cleanEmail,
    college: data.college.trim(),
    branch: data.branch,
    graduationYear: data.graduationYear,
    phone: data.phone?.trim() || "",
    utmSource: validReferrerCode
      ? "Student Referrals"
      : (data.utmSource || "Organic / Direct") as AcquisitionSource,
    utmMedium: data.utmMedium || (validReferrerCode ? "buddy-link" : "direct"),
    utmCampaign: data.utmCampaign || "growth-2025",
    referralCode: uniqueCode,
    referredBy: validReferrerCode,
    quizResultTitle: data.quizResultTitle || "AI Foundation Project",
    createdAt: new Date().toISOString(),
  };

  db.registrations.push(newReg);

  if (validReferrerCode) {
    db.referrals.push({
      id: `ref-${Date.now()}`,
      referrerCode: validReferrerCode,
      refereeEmail: cleanEmail,
      refereeName: newReg.name,
      createdAt: newReg.createdAt,
    });
  }

  // Recalculate daily targets actual counts
  recalcDailyTargets(db);

  saveDb(db);
  return { registration: newReg, isReferralValid };
}

function recalcDailyTargets(db: DatabaseSchema) {
  const total = db.registrations.length;
  // Let current day be Day 3 in demo/active trajectory
  // Day 1: 28, Day 2: 78, Day 3: (total - 106)
  if (db.dailyTargets[2]) {
    const d3Actual = Math.max(0, total - 106);
    db.dailyTargets[2].actualDaily = d3Actual;
    db.dailyTargets[2].actualCumulative = total;
    db.dailyTargets[2].difference = total - db.dailyTargets[2].targetCumulative;
  }
}

export async function getReferralsByCode(referralCode: string): Promise<{
  referralCode: string;
  ownerName: string;
  confirmedCount: number;
  referrals: Referral[];
}> {
  const db = ensureDbFile();
  const owner = db.registrations.find(
    (r) => r.referralCode.toUpperCase() === referralCode.toUpperCase().trim()
  );

  const matchedReferrals = db.referrals.filter(
    (ref) => ref.referrerCode.toUpperCase() === referralCode.toUpperCase().trim()
  );

  return {
    referralCode: referralCode.toUpperCase(),
    ownerName: owner ? owner.name : "Student",
    confirmedCount: matchedReferrals.length,
    referrals: matchedReferrals,
  };
}

export async function getExpenses(): Promise<Expense[]> {
  const db = ensureDbFile();
  return db.expenses.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function createExpense(data: {
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  receiptNote?: string;
}): Promise<Expense> {
  const db = ensureDbFile();
  const currentTotal = db.expenses.reduce((s, e) => s + e.amount, 0);

  if (currentTotal + data.amount > 2000) {
    throw new Error(
      `Cannot add expense of ₹${data.amount}. Total budget is ₹2,000. Remaining balance is ₹${Math.max(
        0,
        2000 - currentTotal
      )}.`
    );
  }

  const newExpense: Expense = {
    id: `exp-${Date.now()}`,
    title: data.title.trim(),
    amount: Number(data.amount),
    category: data.category,
    date: data.date,
    description: data.description.trim(),
    receiptNote: data.receiptNote?.trim() || "",
    createdAt: new Date().toISOString(),
  };

  db.expenses.push(newExpense);
  saveDb(db);
  return newExpense;
}

export async function updateExpense(
  id: string,
  data: Partial<Omit<Expense, "id" | "createdAt">>
): Promise<Expense> {
  const db = ensureDbFile();
  const index = db.expenses.findIndex((e) => e.id === id);
  if (index === -1) throw new Error("Expense not found");

  const existing = db.expenses[index];
  const newAmount = data.amount !== undefined ? Number(data.amount) : existing.amount;
  const currentTotalWithoutThis = db.expenses
    .filter((e) => e.id !== id)
    .reduce((s, e) => s + e.amount, 0);

  if (currentTotalWithoutThis + newAmount > 2000) {
    throw new Error(
      `Updated amount ₹${newAmount} exceeds the ₹2,000 campaign budget. Max allowed is ₹${
        2000 - currentTotalWithoutThis
      }.`
    );
  }

  db.expenses[index] = {
    ...existing,
    ...data,
    amount: newAmount,
  };

  saveDb(db);
  return db.expenses[index];
}

export async function deleteExpense(id: string): Promise<boolean> {
  const db = ensureDbFile();
  const initialLen = db.expenses.length;
  db.expenses = db.expenses.filter((e) => e.id !== id);
  if (db.expenses.length === initialLen) return false;
  saveDb(db);
  return true;
}

export async function getDailyTargets(): Promise<DailyTarget[]> {
  const db = ensureDbFile();
  return db.dailyTargets;
}

export async function updateDailyTarget(
  day: number,
  data: { targetCumulative?: number; notes?: string }
): Promise<DailyTarget> {
  const db = ensureDbFile();
  const index = db.dailyTargets.findIndex((t) => t.day === day);
  if (index === -1) throw new Error("Day target not found");

  if (data.targetCumulative !== undefined) {
    db.dailyTargets[index].targetCumulative = data.targetCumulative;
  }
  if (data.notes !== undefined) {
    db.dailyTargets[index].notes = data.notes;
  }

  // Recalculate daily differences
  let prevTarget = 0;
  for (let i = 0; i < db.dailyTargets.length; i++) {
    const t = db.dailyTargets[i];
    t.targetDaily = t.targetCumulative - prevTarget;
    prevTarget = t.targetCumulative;
    t.difference = t.actualCumulative - t.targetCumulative;
  }

  saveDb(db);
  return db.dailyTargets[index];
}

export async function getCampaignMetrics() {
  const db = ensureDbFile();
  const totalRegistrations = db.registrations.length;
  const totalTarget = 500;
  const remainingRegistrations = Math.max(0, totalTarget - totalRegistrations);
  const percentTargetAchieved = Math.min(100, (totalRegistrations / totalTarget) * 100);

  const totalBudget = 2000;
  const totalSpent = db.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = Math.max(0, totalBudget - totalSpent);
  const percentBudgetSpent = (totalSpent / totalBudget) * 100;

  // Day 3 benchmark target is 200
  const currentDay = 3;
  const currentExpected = db.dailyTargets[currentDay - 1]?.targetCumulative || 200;
  let status: "On track" | "At risk" | "Behind" = "On track";

  if (totalRegistrations < currentExpected * 0.85) {
    status = "Behind";
  } else if (totalRegistrations < currentExpected) {
    status = "At risk";
  }

  // Channel metrics
  const channels: AcquisitionSource[] = [
    "Campus Ambassadors",
    "College Clubs & Communities",
    "WhatsApp Outreach",
    "Student Referrals",
    "Organic / Direct",
    "Other",
  ];

  const channelSpendMap: Record<string, number> = {
    "Campus Ambassadors": 0,
    "College Clubs & Communities": 0,
    "WhatsApp Outreach": 0,
    "Student Referrals": 0,
    "Organic / Direct": 0,
    "Other": 0,
  };

  // Attribute expense category to channels
  db.expenses.forEach((exp) => {
    if (exp.category === "Campus Ambassador Incentives") {
      channelSpendMap["Campus Ambassadors"] += exp.amount;
    } else if (exp.category === "Creative & Promotional Materials") {
      channelSpendMap["WhatsApp Outreach"] += exp.amount;
    } else if (exp.category === "Student Community Outreach") {
      channelSpendMap["College Clubs & Communities"] += exp.amount;
    } else if (exp.category === "Referral Incentives") {
      channelSpendMap["Student Referrals"] += exp.amount;
    } else {
      channelSpendMap["Other"] += exp.amount;
    }
  });

  const channelAnalytics: ChannelAnalytics[] = channels.map((channel) => {
    const count = db.registrations.filter((r) => r.utmSource === channel).length;
    const percentage = totalRegistrations > 0 ? (count / totalRegistrations) * 100 : 0;
    const spend = channelSpendMap[channel] || 0;
    const cpa = count > 0 && spend > 0 ? Number((spend / count).toFixed(2)) : null;

    return {
      channel,
      registrations: count,
      percentage: Number(percentage.toFixed(1)),
      spend,
      cpa,
    };
  });

  // Expense by category breakdown
  const categoryBreakdown: Record<string, number> = {
    "Campus Ambassador Incentives": 0,
    "Creative & Promotional Materials": 0,
    "Student Community Outreach": 0,
    "Referral Incentives": 0,
    "Miscellaneous": 0,
  };

  db.expenses.forEach((e) => {
    if (categoryBreakdown[e.category] !== undefined) {
      categoryBreakdown[e.category] += e.amount;
    } else {
      categoryBreakdown["Miscellaneous"] += e.amount;
    }
  });

  return {
    totalTarget,
    campaignDurationDays: 7,
    currentDay,
    totalRegistrations,
    remainingRegistrations,
    percentTargetAchieved: Number(percentTargetAchieved.toFixed(1)),
    totalBudget,
    totalSpent,
    remainingBudget,
    percentBudgetSpent: Number(percentBudgetSpent.toFixed(1)),
    status,
    channelAnalytics,
    categoryBreakdown,
    dailyTargets: db.dailyTargets,
    recentRegistrations: db.registrations.slice(0, 10),
    recentExpenses: db.expenses,
    expenses: db.expenses,
  };
}

export function getBackendStatus() {
  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return {
    mode: hasSupabase ? "Supabase Cloud Database" : "Local Persistent Server Database",
    isCloudReady: true,
    hasSupabaseConfigured: hasSupabase,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured (using local store)",
    hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
    note: hasSupabase
      ? "Connected to remote Supabase instance."
      : "Running with server-persisted JSON store (data/campus_pulse_db.json). Synchronizes all client devices across your server.",
  };
}
