import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
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
        <div className="flex flex-col h-screen">
          {/* Fixed Navbar */}
          <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800">
            <Navbar />
          </div>

          {/* Main content with sidebar and scrollable main */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Left */}
            <div className="w-0 md:w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
              <Sidebar />
            </div>

            {/* Main content - Center */}
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
              <div className="container mx-auto px-4 py-6 max-w-7xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
