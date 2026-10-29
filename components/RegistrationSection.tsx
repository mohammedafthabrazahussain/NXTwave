"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Share2,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface RegistrationSectionProps {
  selectedProjectTitle?: string;
}

export default function RegistrationSection({
  selectedProjectTitle,
}: RegistrationSectionProps) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    branch: "Computer Science / IT",
    graduationYear: "2025",
    phone: "",
  });

  const [referredByCode, setReferredByCode] = useState<string | null>(null);
  const [utmSource, setUtmSource] = useState<string>("Organic / Direct");
  const [utmMedium, setUtmMedium] = useState<string>("");
  const [utmCampaign, setUtmCampaign] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    name: string;
    email: string;
    referralCode: string;
    referralLink: string;
    quizResultTitle?: string;
    officialWorkshopUrl?: string;
    referralAttributed?: boolean;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferredByCode(ref.toUpperCase());
    }

    const source = searchParams.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
    const medium = searchParams.get("utm_medium");
    if (medium) setUtmMedium(medium);
    const campaign = searchParams.get("utm_campaign");
    if (campaign) setUtmCampaign(campaign);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referredBy: referredByCode,
          utmSource,
          utmMedium,
          utmCampaign,
          quizResultTitle: selectedProjectTitle || "AI Foundation Project",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register. Please check details.");
      }

      setRegistrationSuccess({
        name: data.registration.name,
        email: data.registration.email,
        referralCode: data.registration.referralCode,
        referralLink: data.registration.referralLink,
        quizResultTitle: data.registration.quizResultTitle,
        officialWorkshopUrl: data.officialWorkshopUrl,
        referralAttributed: data.referralAttributed,
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore confetti errors in older engines
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!registrationSuccess) return;
    navigator.clipboard.writeText(registrationSuccess.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = registrationSuccess
    ? `Hey! I just registered for the free workshop: "Build Your First AI Project in 60 Minutes". Take the AI Build DNA quiz and pair up with me using my invite link:\n${registrationSuccess.referralLink}`
    : "";

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <section id="register" className="py-16 md:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Cost &bull; Instant Confirmation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reserve Your Free Seat
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            Workshop: <strong className="text-white">“Build Your First AI Project in 60 Minutes”</strong>.
            Tailored for final-year engineering students.
          </p>
        </div>

        {/* Form Container or Success View */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          {/* Active Referral Attribution Pill */}
          {referredByCode && !registrationSuccess && (
            <div className="mb-6 p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center gap-3 text-xs sm:text-sm text-indigo-300">
              <Users className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span>You were invited with Build Buddy code: </span>
                <span className="font-mono font-bold text-white bg-indigo-900/80 px-2 py-0.5 rounded border border-indigo-500/40">
                  {referredByCode}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Both you and your friend will receive the bonus AI Project Starter Pack upon registration.
                </p>
              </div>
            </div>
          )}

          {/* Quiz project match badge if quiz was completed */}
          {selectedProjectTitle && !registrationSuccess && (
            <div className="mb-6 p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center gap-3 text-xs sm:text-sm text-purple-300">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <span>Selected Project: </span>
                <strong className="text-white">{selectedProjectTitle}</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pre-configured from your AI Build DNA Quiz answers.
                </p>
              </div>
            </div>
          )}

          {!registrationSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  College or Personal Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@college.edu.in or personal email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Used as unique identifier to prevent duplicate registration &amp; send live access code.
                </span>
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Engineering College Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chaitanya Bharathi Institute of Technology"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Branch and Graduation Year in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Engineering Branch *
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    <option value="Computer Science / IT">Computer Science / IT</option>
                    <option value="Electronics & Communication (ECE)">Electronics &amp; Communication (ECE)</option>
                    <option value="Electrical & Electronics (EEE)">Electrical &amp; Electronics (EEE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="AI & Data Science">AI &amp; Data Science</option>
                    <option value="Other Engineering">Other Engineering Branch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Graduation Year *
                  </label>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) =>
                      setFormData({ ...formData, graduationYear: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    <option value="2025">2025 (Final Year)</option>
                    <option value="2026">2026 (Pre-Final Year)</option>
                    <option value="2024">2024 (Recent Graduate)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Optional WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  WhatsApp Number (Optional for SMS / Link Reminder)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-indigo-600 to-indigo-500 hover:from-emerald-400 hover:to-indigo-400 text-white font-bold text-base shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Reserving Free Seat...
                    </span>
                  ) : (
                    <>
                      <span>Confirm Free Workshop Registration (₹0)</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-2">
                By registering, you consent to receive workshop reminders and starter code updates.
                Your data is stored securely. No spam, ever.
              </p>
            </form>
          ) : (
            /* =========================================================
               POST-REGISTRATION SUCCESS & BUILD BUDDY REFERRAL SYSTEM
            ========================================================= */
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-slate-800">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Registration Confirmed, {registrationSuccess.name}!
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                  You are registered for <span className="text-emerald-400 font-semibold">“Build Your First AI Project in 60 Minutes”</span>.
                </p>
                {registrationSuccess.referralAttributed && (
                  <p className="text-xs text-indigo-300 mt-2 font-medium">
                    ✨ Your registration was successfully linked to your friend&apos;s Build Buddy invite!
                  </p>
                )}
              </div>

              {/* Build Buddy Referral Feature Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-500/30">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Build Buddy Viral Referral Hub</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  Code Together: Invite Batchmates &amp; Unlock AI Starter Perks
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  Share your unique referral link with your college WhatsApp groups or friends.
                  When they register with your code, they join your squad, and you both get the
                  pre-workshop GitHub boilerplate code!
                </p>

                {/* Referral Code Box */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Your Referral Code
                    </span>
                    <span className="font-mono font-bold text-indigo-300 text-sm sm:text-base">
                      {registrationSuccess.referralCode}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Referral URL display */}
                <div className="text-[11px] font-mono text-slate-400 truncate bg-slate-950/80 p-2 rounded border border-slate-800/80 mb-5">
                  {registrationSuccess.referralLink}
                </div>

                {/* WhatsApp Share Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp &bull; Invite Classmates</span>
                </a>
              </div>

              {/* Configurable Official Registration System Note */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300">
                    Official Workshop Platform Synchronization:
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Configured Placeholder
                  </span>
                </div>
                <p>
                  Your registration is logged and tracked in the Campus Pulse Growth Engine.
                  To mirror your seat directly onto the official NxtWave broadcast host:
                </p>
                <a
                  href={
                    registrationSuccess.officialWorkshopUrl ||
                    "https://nxtwave.tech/workshops/ai-in-60-mins"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium underline"
                >
                  <span>Open Official NxtWave Workshop Ticket Placeholder</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
