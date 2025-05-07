"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo8 from "@/assets/logo8.png"

export default function TrendingPost() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(145)
  const [bookmarked, setBookmarked] = useState(false)
  const [commentCount] = useState(36)
  const [shareCount] = useState(12)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden w-full max-w-5xl mx-auto bg-white">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-gray-100">
                <AvatarImage src={logo8.src} alt="@mindspeak" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-gray-900">Alan Patterson</h3>
                  <svg className="h-4 w-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">@alanpatterson • 2 hours ago</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>Downtown Café, New York</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-3 w-3" />
                  <span>Feeling Excited</span>
                </div>
              </div>
            </div>
            <Button className="text-gray-500 hover:text-gray-700 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-800 mb-3">
              Just had an amazing breakfast meeting with <span className="text-sky-500">@annaferguson</span> and{" "}
              <span className="text-sky-500">@davebishop</span>! We discussed some exciting new ideas for our upcoming
              project. The coffee was fantastic too! 😊
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-sky-50 text-sky-600 hover:bg-sky-100">
                #networking
              </Badge>
              <Badge variant="secondary" className="bg-sky-50 text-sky-600 hover:bg-sky-100">
                #breakfast
              </Badge>
              <Badge variant="secondary" className="bg-sky-50 text-sky-600 hover:bg-sky-100">
                #collaboration
              </Badge>
              <Badge variant="secondary" className="bg-sky-50 text-sky-600 hover:bg-sky-100">
                #newproject
              </Badge>
            </div>
            <div className="rounded-lg overflow-hidden bg-gray-100 mb-3">
              <Image
                src={logo8.src}
                width={500}
                height={300}
                alt="Post image"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
            <motion.button
              className={`flex items-center gap-2 ${liked ? "text-rose-500" : "text-gray-500"} hover:text-rose-500 transition-colors`}
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-rose-500" : ""}`} />
              <span>{likeCount}</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{commentCount}</span>
            </motion.button>

            <motion.button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="h-5 w-5" />
              <span>{shareCount}</span>
            </motion.button>

            <motion.button
              className={`${bookmarked ? "text-yellow-500" : "text-gray-500"} hover:text-yellow-500 transition-colors`}
              onClick={handleBookmark}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-yellow-500" : ""}`} />
            </motion.button>
          </div>

          {/* Quick Comment */}
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full py-2 px-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
