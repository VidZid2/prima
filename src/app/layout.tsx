import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mokoto = localFont({
  src: "./fonts/mokoto.ttf",
  variable: "--font-mokoto",
  display: "swap",
});

const clearSans = localFont({
  src: [
    { path: "./fonts/ClearSans-Light.woff", weight: "300", style: "normal" },
    { path: "./fonts/ClearSans-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/ClearSans-Medium.woff", weight: "500", style: "normal" },
    { path: "./fonts/ClearSans-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-clear-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://primadigital.com'),
  title: {
    default: "PRIMA Digital Technology Solutions",
    template: "%s | PRIMA",
  },
  description: "Your Goals, Our Mission. PRIMA delivers custom IT Development solutions to scale, innovate and lead.",
  openGraph: {
    title: "PRIMA Digital Technology Solutions",
    description: "Your Goals, Our Mission. PRIMA delivers custom IT Development solutions.",
    url: "https://primadigital.com",
    siteName: "PRIMA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIMA Digital Technology Solutions",
    description: "Your Goals, Our Mission. PRIMA delivers custom IT Development solutions.",
  },
};

import { SmoothScrolling } from "@/components/smooth-scrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.JSX.Element | React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clearSans.variable} ${mokoto.variable} antialiased dark scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-black text-foreground overflow-x-hidden">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
