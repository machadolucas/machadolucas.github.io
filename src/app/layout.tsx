import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";
import "@react95/icons/icons.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Machado",
  description:
    "Personal website of Lucas Machado showcasing his story, work, and contact info.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#008080]`}
      >
        {children}
      </body>
    </html>
  );
}
