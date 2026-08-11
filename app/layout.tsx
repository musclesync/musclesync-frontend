import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MuscleSync – AI Fitness Platform",
  description: "AI-powered fitness tracking, personalized workout plans, and real-time progress monitoring.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
