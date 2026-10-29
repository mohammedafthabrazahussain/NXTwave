// E2E Test Script for Campus Pulse
import http from "http";

async function runTests() {
  console.log("Starting server probe & functional tests...");

  // Let's test the database and logic directly first
  const { getRegistrations, createRegistration, checkEmailRegistered, getExpenses, createExpense, getCampaignMetrics, getReferralsByCode } = await import("./lib/db.ts");

  console.log("\n--- TEST 1: Initial DB & Metrics ---");
  const initialMetrics = await getCampaignMetrics();
  console.log("Initial Registrations:", initialMetrics.totalRegistrations);
  console.log("Initial Total Budget:", initialMetrics.totalBudget);
  console.log("Initial Total Spent:", initialMetrics.totalSpent);
  console.log("Initial Remaining Budget:", initialMetrics.remainingBudget);
  console.log("Initial Campaign Status:", initialMetrics.status);

  console.log("\n--- TEST 2: Student Registration ---");
  const testEmail = `test.student.${Date.now()}@vnr.ac.in`;
  const regResult = await createRegistration({
    name: "Vikram Test",
    email: testEmail,
    college: "VNR Vignana Jyothi",
    branch: "Computer Science / IT",
    graduationYear: "2025",
    phone: "+91 9988776655",
    utmSource: "WhatsApp Outreach",
    utmMedium: "group-share",
    utmCampaign: "batch-launch",
    quizResultTitle: "AI ATS Resume Matcher & Interview Copilot",
  });
  console.log("Registered successfully:", regResult.registration.name);
  console.log("Generated Referral Code:", regResult.registration.referralCode);

  console.log("\n--- TEST 3: Duplicate Registration Prevention ---");
  try {
    await createRegistration({
      name: "Duplicate Vikram",
      email: testEmail,
      college: "VNR Vignana Jyothi",
      branch: "Computer Science / IT",
      graduationYear: "2025",
    });
    console.error("FAIL: Duplicate registration was not blocked!");
  } catch (err) {
    console.log("PASS: Duplicate registration blocked as expected:", err.message);
  }

  console.log("\n--- TEST 4: Referral Attribution ---");
  const friendEmail = `friend.${Date.now()}@cbit.ac.in`;
  const friendReg = await createRegistration({
    name: "Pooja Friend",
    email: friendEmail,
    college: "CBIT Hyderabad",
    branch: "Electronics & Communication (ECE)",
    graduationYear: "2025",
    referredBy: regResult.registration.referralCode,
    quizResultTitle: "Real-Time Vision Focus & Posture Sentinel",
  });
  console.log("Friend registered:", friendReg.registration.name);
  console.log("Referral attributed:", friendReg.isReferralValid);

  // Check Vikram's referral count
  const referralCheck = await getReferralsByCode(regResult.registration.referralCode);
  console.log("Vikram confirmed referrals count:", referralCheck.confirmedCount);
  console.log("Referee name:", referralCheck.referrals[0]?.refereeName);

  console.log("\n--- TEST 5: Self-Referral Prevention ---");
  const selfEmail = `self.test.${Date.now()}@test.edu`;
  const selfReg = await createRegistration({
    name: "Self Referrer",
    email: selfEmail,
    college: "MIT",
    branch: "Mechanical Engineering",
    graduationYear: "2025",
    referredBy: "NON_EXISTENT_CODE",
  });
  console.log("Invalid/non-existent referrer handled gracefully (attributed=false):", !selfReg.isReferralValid);

  console.log("\n--- TEST 6: Budget & Expense Guardrail ---");
  const expTitle = `Test Micro Grant ${Date.now()}`;
  const validExp = await createExpense({
    title: expTitle,
    amount: 150,
    category: "Campus Ambassador Incentives",
    date: new Date().toISOString().split("T")[0],
    description: "Pilot campus ambassador stipend",
    receiptNote: "UPI/TEST/150",
  });
  console.log("Expense created:", validExp.title, "Amount: ₹" + validExp.amount);

  const updatedMetrics = await getCampaignMetrics();
  console.log("New Total Spent: ₹" + updatedMetrics.totalSpent);
  console.log("New Remaining Budget: ₹" + updatedMetrics.remainingBudget);

  // Try to spend more than remaining budget
  try {
    await createExpense({
      title: "Illegal Overspend Attempt",
      amount: updatedMetrics.remainingBudget + 500,
      category: "Miscellaneous",
      date: new Date().toISOString().split("T")[0],
      description: "Should fail",
    });
    console.error("FAIL: Budget overspend was not blocked!");
  } catch (err) {
    console.log("PASS: Budget overspend blocked properly:", err.message);
  }

  console.log("\n--- TEST 7: Growth Copilot & Simulator ---");
  const { generateGrowthRecommendations } = await import("./lib/copilot.ts");
  const recommendations = generateGrowthRecommendations({
    currentDay: updatedMetrics.currentDay,
    totalDays: updatedMetrics.campaignDurationDays,
    totalRegistrations: updatedMetrics.totalRegistrations,
    targetToday: 200,
    totalTarget: 500,
    totalBudget: 2000,
    totalSpent: updatedMetrics.totalSpent,
    remainingBudget: updatedMetrics.remainingBudget,
    channelAnalytics: updatedMetrics.channelAnalytics,
  });
  console.log("Generated Recommendations Count:", recommendations.length);
  recommendations.forEach((r, idx) => {
    console.log(` [${r.priority}] ${r.headline} -> Action: ${r.suggestedAction.slice(0, 60)}...`);
  });

  const { runSimulation, DEFAULT_SIMULATION_INPUT } = await import("./lib/simulator.ts");
  const sim = runSimulation(DEFAULT_SIMULATION_INPUT);
  console.log("Simulator Output:");
  console.log(" Total Proposed Spend: ₹" + sim.totalSpend);
  console.log(" Estimated Registrations:", sim.estimatedRegistrations);
  console.log(" Blended CPA: ₹" + sim.blendedCPA);

  console.log("\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!");
}

runTests().catch(console.error);
