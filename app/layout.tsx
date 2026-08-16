import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "MuscleSync – AI Fitness Platform",
  description: "Anatomy‑aware AI fitness platform for athletes who demand precision and performance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] text-white`}>
        {children}
      </body>
    </html>
  );
}
