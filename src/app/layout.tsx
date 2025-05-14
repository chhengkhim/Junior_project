import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Loading from "@/components/loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%MSU | MindSpeak Uniconfess",
    default: "MindSpeak Uniconfess",
  },
  description:
    "Welcome to our MindSpeak Uniconfess. Emergency Help - A Safe and Anonymous Support Feature for Students in Need",
  keywords: [
    "Mental Health",
    "Student Support",
    "Emergency Help",
    "Anonymous",
    "Educational Platform",
    "Well-being",
  ],
  icons: {
    icon: [
      {
        href: "/logo9.png",
        url: "/logo9.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased 
          bg-white text-black 
          dark:bg-gray-900 dark:text-white
        `}
      >
        <Loading />
        <div className="flex min-h-screen">
          {/* Navbar component already contains the sidebar */}
          <Navbar />
          
          {/* Main content area with proper padding for sidebar */}
          <main className="flex-1 pt-20 md:pl-64">
            <div className="p-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
