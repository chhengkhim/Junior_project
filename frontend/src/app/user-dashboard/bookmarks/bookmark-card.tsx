"use client"

import { motion } from "framer-motion"
import { Share2, Trash, BookmarkIcon, ExternalLink, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import type { BookmarkItem } from "./bookmark-grid"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface BookmarkCardProps {
  bookmark: BookmarkItem
  isSelecting: boolean
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
}

export default function BookmarkCard({ bookmark, isSelecting, isSelected, onSelect, onDelete }: BookmarkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const sourceIcon = {
    medium: (
      <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-md">
        <span className="font-serif font-bold">M</span>
      </div>
    ),
    linkedin: (
      <div className="bg-[#0077b5] text-white w-6 h-6 flex items-center justify-center rounded-md">
        <span className="font-sans font-bold">in</span>
      </div>
    ),
    other: (
      <div className="bg-gray-500 text-white w-6 h-6 flex items-center justify-center rounded-md">
        <span className="font-sans font-bold">?</span>
      </div>
    ),
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="h-full"
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "h-full overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border-slate-200 dark:border-slate-700",
          isSelected 
            ? "ring-2 ring-[#1d2b7d] dark:ring-[#3d4b9d] ring-offset-2 dark:ring-offset-gray-900 shadow-lg" 
            : "hover:shadow-xl hover:border-[#1d2b7d]/30 dark:hover:border-[#3d4b9d]/50"
        )}
      >
        <div className="relative overflow-hidden">
          <Link href={bookmark.url} className={cn(isSelecting && "pointer-events-none")}>
            <div className="overflow-hidden h-48 relative">
              <Image
                src={bookmark.image || "/placeholder.svg?height=200&width=400"}
                alt={bookmark.title}
                width={400}
                height={200}
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  isHovered ? "scale-110 blur-[1px] brightness-90" : "scale-100"
                )}
              />
              
              {/* Overlay gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300",
                isHovered && "opacity-100"
              )} />
              
              {/* View button that appears on hover */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="sm" 
                  className="bg-white/90 hover:bg-white text-[#1d2b7d] border border-[#1d2b7d]/20 shadow-md"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Article
                </Button>
              </motion.div>
            </div>
          </Link>
          
          {isSelecting && (
            <motion.div 
              className="absolute top-3 left-3 z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect()}
                className="h-5 w-5 border-2 border-white bg-white/80 backdrop-blur-sm data-[state=checked]:bg-[#1d2b7d] data-[state=checked]:text-white shadow-md"
              />
            </motion.div>
          )}
          
          {bookmark.group && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-[#1d2b7d]/90 hover:bg-[#1d2b7d] text-white text-xs backdrop-blur-sm shadow-md transition-all duration-300 font-medium">
                {bookmark.group}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <Link href={bookmark.url} className={cn(isSelecting && "pointer-events-none")}>
            <h3 className="font-semibold text-lg line-clamp-2 mb-2 text-slate-800 dark:text-slate-200 group-hover:text-[#1d2b7d] transition-colors">
              {bookmark.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{bookmark.description}</p>
          </Link>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {sourceIcon[bookmark.source]}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {bookmark.source === "medium" ? "Medium" : bookmark.source === "linkedin" ? "LinkedIn" : "Other"}
            </span>
          </div>
          
          <div className="flex gap-1">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Like</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </motion.div>
            
            {isSelecting ? (
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600"
                  onClick={onDelete}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600"
                >
                  <BookmarkIcon className="h-4 w-4 fill-current" />
                  <span className="sr-only">Bookmarked</span>
                </Button>
              </motion.div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
