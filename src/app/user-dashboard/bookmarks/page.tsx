"use client"

import { motion } from "framer-motion"
import BookmarkGrid from "./bookmark-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-6 pb-12">
      <div className="max-w-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-[#1d2b7d] dark:text-white">My Bookmarks</h1>
          <p className="text-slate-600 dark:text-slate-400">Save and organize your favorite articles</p>
        </motion.div>

        <BookmarkGrid />
      </div>
    </main>
  )
}
