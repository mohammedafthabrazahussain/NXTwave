"use client";

import { CheckCircle2, Terminal, Code2, Rocket, HelpCircle } from "lucide-react";

export default function WorkshopHighlights() {
  const steps = [
    {
      time: "00 — 10 MIN",
      title: "AI Stack Demystified",
      desc: "Understand LLM APIs, prompt architecture, and how modern startups build AI apps in 2025 without buying expensive GPUs.",
      icon: Terminal,
      color: "from-blue-500 to-indigo-500",
    },
    {
      time: "10 — 35 MIN",
      title: "Hands-on Live Code-Along",
      desc: "Write Python scripts line-by-line: connect to Google Gemini API, extract intelligence, and build your core AI logic.",
      icon: Code2,
      color: "from-indigo-500 to-purple-500",
    },
    {
      time: "35 — 50 MIN",
      title: "Interactive Web UI in 20 Lines",
      desc: "Wrap your backend with Streamlit. Add user input boxes, real-time result cards, and dynamic visualizations effortlessly.",
      icon: Rocket,
      color: "from-purple-500 to-emerald-500",
    },
    {
      time: "50 — 60 MIN",
      title: "1-Click Cloud Deployment & Resume Bullets",
      desc: "Deploy your app to a live public URL. Learn how to format the project on your resume so technical recruiters notice you.",
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const faqs = [
    {
      q: "Is this workshop truly 100% free?",
      a: "Yes! There are no hidden charges, paywalls, or upsells. The live session, boilerplate code, and starter templates are completely free for all engineering students.",
    },
    {
      q: "I only know basic Python or C. Can I still follow along?",
      a: "Absolutely. The session is specifically engineered for beginners. Every line of code is typed and explained live. You'll receive ready-to-run GitHub starter templates before the call.",
    },
    {
      q: "Will I get the project source code and deployment link?",
      a: "Yes. By the end of 60 minutes, you will have your own running web application deployed on a shareable link to add to your LinkedIn profile and resume.",
    },
    {
      q: "Can non-CSE branches (ECE, EEE, Mech, Civil) attend?",
      a: "Definitely! AI applications are transforming hardware, automation, and manufacturing. Take the AI Build DNA Quiz above to see projects specifically tailored for core engineering disciplines.",
    },
  ];

  return (
    <section id="curriculum" className="py-16 md:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Agenda Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>The 60-Minute Blueprint</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Happens During the 60 Minutes?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Zero slides-only boredom. Pure hands-on construction from an empty file to a published AI web app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <div className="text-[11px] font-mono font-bold text-indigo-400 mb-3 tracking-wider">
                    {s.time}
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${s.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-left"
              >
                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                  <span className="text-indigo-400">Q.</span>
                  {f.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
