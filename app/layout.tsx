import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VSLA Connect — Community Financial Inclusion & Digital Savings Ledger",
  description:
    "VSLA Connect by Finovate Malawi empowers village savings and loans associations with digital share tracking, micro-loan management, AI-powered credit scoring, and peer governance tools.",
  keywords: "VSLA, village savings, malawi, financial inclusion, micro-loans, community banking",
  authors: [{ name: "Finovate Malawi" }],
  openGraph: {
    title: "VSLA Connect",
    description: "Digital financial inclusion for Village Savings & Loans Associations",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

import { FloatingLandingChat } from '@/components/organisms/FloatingLandingChat/FloatingLandingChat';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950">
        {children}
        <FloatingLandingChat />
      </body>
    </html>
  );
}
