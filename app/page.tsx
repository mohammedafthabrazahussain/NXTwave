"use client";

import { useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuizSection from "@/components/QuizSection";
import RegistrationSection from "@/components/RegistrationSection";
import BuildBuddySection from "@/components/BuildBuddySection";
import WorkshopHighlights from "@/components/WorkshopHighlights";
import Footer from "@/components/Footer";

export default function StudentHomePage() {
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <QuizSection onSelectProject={(title) => setSelectedProjectTitle(title)} />

        <Suspense fallback={
          <div className="py-20 text-center text-slate-500">
            Loading registration system...
          </div>
        }>
          <RegistrationSection selectedProjectTitle={selectedProjectTitle} />
        </Suspense>

        <BuildBuddySection />

        <WorkshopHighlights />
      </main>

      <Footer />
    </div>
  );
}
