import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Pulse | Build Your First AI Project in 60 Minutes",
  description:
    "Free Hands-on AI Workshop for Final-Year Engineering Students. Build and deploy a real beginner-friendly AI project in 60 minutes with step-by-step guidance.",
  openGraph: {
    title: "Build Your First AI Project in 60 Minutes | Campus Pulse",
    description: "Free Hands-on AI Workshop for Final-Year Engineering Students. Take the AI Build DNA Quiz and claim your free seat.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
