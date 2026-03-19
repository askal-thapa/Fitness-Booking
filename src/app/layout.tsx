import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingAssistant from "@/components/FloatingAssistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gym Trainer Booking",
  description: "Elevate Your Fitness Journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-off-white text-charcoal">
        {children}
        <FloatingAssistant />
      </body>
    </html>
  );
}
