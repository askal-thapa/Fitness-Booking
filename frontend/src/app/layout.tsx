import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingAssistant from "@/components/FloatingAssistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Gym Trainer Booking",
  description: "Elevate Your Fitness Journey",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="font-sans min-h-full flex flex-col bg-charcoal text-off-white overflow-x-hidden">
        <Providers>
            {children}
            <FloatingAssistant />
            <Toaster position="bottom-right" theme="dark" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
