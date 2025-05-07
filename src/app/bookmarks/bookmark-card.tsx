"use client"

import { motion } from "framer-motion"
import { Share2, Trash, BookmarkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo8 from "@/assets/logo8.png"
import Link from "next/link"
import type { BookmarkItem } from "./bookmark-grid"
import { Badge } from "@/components/ui/badge"

interface BookmarkCardProps {
  bookmark: BookmarkItem
  isSelecting: boolean
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
}

export default function BookmarkCard({ bookmark, isSelecting, isSelected, onSelect, onDelete }: BookmarkCardProps) {
  const sourceIcon = {
    medium: (
      <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded">
        <span className="font-serif font-bold">M</span>
      </div>
    ),
    linkedin: (
      <div className="bg-[#0077b5] text-white w-6 h-6 flex items-center justify-center rounded">
        <span className="font-sans font-bold">in</span>
      </div>
    ),
    other: (
      <div className="bg-gray-500 text-white w-6 h-6 flex items-center justify-center rounded">
        <span className="font-sans font-bold">?</span>
      </div>
    ),
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="h-full"
      whileHover={{ y: -5 }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden transition-all duration-200 hover:shadow-lg",
          isSelected ? "ring-2 ring-purple-500 ring-offset-2" : "hover:border-purple-200",
        )}
      >
        <div className="relative overflow-hidden group">
          <Link href={bookmark.url} className={cn(isSelecting && "pointer-events-none")}>
            <div className="overflow-hidden">
              <Image
                src={logo8|| "/placeholder.svg"}
                alt={bookmark.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
          {isSelecting && (
            <div className="absolute top-3 left-3 z-10">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect()}
                className="h-5 w-5 border-2 border-white dark:bg-gray-100 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
              />
            </div>
          )}
          {bookmark.group && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-purple-500/80 text-white text-xs backdrop-blur-sm">{bookmark.group}</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <Link href={bookmark.url} className={cn(isSelecting && "pointer-events-none")}>
            <h3 className="font-semibold text-lg line-clamp-2 mb-2 text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors">
              {bookmark.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{bookmark.description}</p>
          </Link>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {sourceIcon[bookmark.source]}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {bookmark.source === "medium" ? "Medium" : bookmark.source === "linkedin" ? "LinkedIn" : "Other"}
            </span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            {isSelecting ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 dark:hover:bg-red-900/20"
                onClick={onDelete}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-purple-500 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20"
              >
                <BookmarkIcon className="h-4 w-4 fill-current" />
                <span className="sr-only">Bookmarked</span>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
