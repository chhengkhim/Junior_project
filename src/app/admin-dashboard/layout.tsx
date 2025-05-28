import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { AdminLayoutClient } from "@/components/admin-layout-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add any scripts here if needed */}
        {/* <script src="https://example.com/some-library.js" async></script> */}
      </head>
      <body className={inter.className}>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  )
}
