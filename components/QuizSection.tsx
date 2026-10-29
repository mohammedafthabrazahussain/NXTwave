"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS, getRecommendedProject, QuizResult } from "@/lib/quizEngine";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Layers,
  Clock,
  Award,
  Zap,
} from "lucide-react";

interface QuizSectionProps {
  onSelectProject?: (projectTitle: string) => void;
}

export default function QuizSection({ onSelectProject }: QuizSectionProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const question = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (value: string) => {
    const updatedAnswers = { ...answers, [question.id]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed all questions, compute recommendation
      const rec = getRecommendedProject(updatedAnswers);
      setResult(rec);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleClaimProject = () => {
    if (result && onSelectProject) {
      onSelectProject(result.title);
    }
    // Scroll to registration form
    const elem = document.getElementById("register");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="quiz" className="py-16 md:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Profiler</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Build DNA Quiz
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Answer 4 quick questions. Our recommendation engine matches your branch &amp; skill level
            with the highest-impact beginner AI project you can build in 60 minutes.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl shadow-black/40 relative overflow-hidden">
          {!result ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-indigo-400 uppercase tracking-wider">
                    Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% completed</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                    style={{
                      width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Header */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {question.question}
                </h3>
                <p className="text-sm text-slate-400">{question.subtitle}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(option.value)}
                      className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10"
                          : "bg-slate-950/50 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-100 text-sm sm:text-base flex items-center justify-between">
                          <span>{option.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        {option.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-normal">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back / Navigation button */}
              {currentStep > 0 && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    &larr; Previous Question
                  </button>
                  <span className="text-[11px] text-slate-500">
                    Rule-based Recommendation Engine &bull; Zero login required
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Result Card */
            <div className="animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Recommended Project For You
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {result.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {result.timeEstimate}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">
                    {result.difficulty}
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm sm:text-base text-indigo-200 font-medium mb-3 italic">
                &ldquo;{result.tagline}&rdquo;
              </p>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {result.description}
              </p>

              {/* Why For You Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Why This Boosts Your Placement Profile
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                  {result.whyForYou}
                </p>
              </div>

              {/* What You Will Learn in 60 Mins */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  What You Will Learn in 60 Minutes
                </h4>
                <ul className="space-y-2">
                  {result.whatYouWillLearn.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Tailored Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={handleClaimProject}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm sm:text-base transition-all group"
                >
                  <span>Build This Project — Register Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
