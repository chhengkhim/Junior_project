"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ImageIcon, Link2, MapPin, Hash, Smile, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface CreatePostProps {
  onPostCreated: (post: {
    id: number
    author: {
      name: string
      username: string
      avatar: string
      timeAgo: string
    }
    content: string
    hashtags: string[]
    image?: string
    likes: number
    comments: number
    shares: number
    bookmarked: boolean
    liked: boolean
    commentsList: { id: number; author: string; content: string; timeAgo: string }[]
    location?: string
    mood?: string
    postType: "image" | "link" | "text"
  }) => void
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [currentHashtag, setCurrentHashtag] = useState("")
  const [feeling, setFeeling] = useState("")
  const [location, setLocation] = useState("")
  const [url, setUrl] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [showFeelingInput, setShowFeelingInput] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Common feelings/moods
  const commonFeelings = [
    "Happy",
    "Excited",
    "Grateful",
    "Relaxed",
    "Inspired",
    "Tired",
    "Sad",
    "Anxious",
    "Hopeful",
    "Proud",
  ]

  const handleAddHashtag = () => {
    if (currentHashtag.trim() && !hashtags.includes(currentHashtag.trim())) {
      setHashtags([...hashtags, currentHashtag.trim()])
      setCurrentHashtag("")
    }
  }

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    URL.revokeObjectURL(newImages[index])
    newImages.splice(index, 1)
    setImages(newImages)
  }


  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) return

    const newPost = {
      id: Date.now(),
      author: {
        name: "Current User",
        username: "@currentuser",
        avatar: "/placeholder.svg?height=40&width=40",
        timeAgo: "Just now",
      },
      content: content,
      hashtags: hashtags,
      image: images.length > 0 ? images[0] : undefined,
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarked: false,
      liked: false,
      commentsList: [],
      location: location || undefined,
      mood: feeling || undefined,
      postType: images.length > 0 ? "image" : url ? "link" : "text",
    }

    onPostCreated(newPost as {
      id: number
      author: {
        name: string
        username: string
        avatar: string
        timeAgo: string
      }
      content: string
      hashtags: string[]
      image?: string
      likes: number
      comments: number
      shares: number
      bookmarked: boolean
      liked: boolean
      commentsList: { id: number; author: string; content: string; timeAgo: string }[]
      location?: string
      mood?: string
      postType: "image" | "link" | "text"
    })

    // Reset form
    setContent("")
    setHashtags([])
    setFeeling("")
    setLocation("")
    setUrl("")
    setImages([])
    setShowUrlInput(false)
    setShowLocationInput(false)
    setShowFeelingInput(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-3 sm:p-4 mb-6"
    >
      <div className="flex space-x-2 sm:space-x-3">
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your profile" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[60px] sm:min-h-[80px] text-sm sm:text-base resize-none border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          />

          {/* Image preview area */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Uploaded preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Hashtags display */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 text-xs sm:text-sm">
              {hashtags.map((tag, index) => (
                <div key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center">
                  #{tag}
                  <Button onClick={() => handleRemoveHashtag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* URL input */}
          <AnimatePresence>
            {showUrlInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex space-x-2 overflow-hidden"
              >
                <Input
                  type="url"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 text-sm h-8 sm:h-9"
                />
                <Button variant="ghost" size="icon" onClick={() => setShowUrlInput(false)}>
                  <X size={18} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Location input */}
          <AnimatePresence>
            {showLocationInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex space-x-2 overflow-hidden"
              >
                <Input
                  type="text"
                  placeholder="Add your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 text-sm h-8 sm:h-9"
                />
                <Button variant="ghost" size="icon" onClick={() => setShowLocationInput(false)}>
                  <X size={18} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feeling/mood input */}
          <AnimatePresence>
            {showFeelingInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex space-x-2 mb-2">
                  <Input
                    type="text"
                    placeholder="How are you feeling?"
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    className="flex-1 text-sm h-8 sm:h-9"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setShowFeelingInput(false)}>
                    <X size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {commonFeelings.map((feel) => (
                    <Button key={feel} variant="outline" size="sm" className="text-xs" onClick={() => setFeeling(feel)}>
                      {feel}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hashtag input */}
          <AnimatePresence>
            {currentHashtag && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex space-x-2 overflow-hidden"
              >
                <Input
                  type="text"
                  placeholder="Add hashtag (without #)"
                  value={currentHashtag}
                  onChange={(e) => setCurrentHashtag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddHashtag()
                    }
                  }}
                  className="flex-1 text-sm h-8 sm:h-9"
                />
                <Button variant="ghost" onClick={handleAddHashtag}>
                  Add
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t gap-y-2">
            <div className="flex flex-wrap gap-1">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <Button
                variant="ghost"
                size="sm"
                className="p-1 sm:p-2 h-8 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">Photo</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-1 sm:p-2 h-8 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                onClick={() => setShowUrlInput(!showUrlInput)}
              >
                <Link2 size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">Link</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-1 sm:p-2 h-8 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                onClick={() => setShowLocationInput(!showLocationInput)}
              >
                <MapPin size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">Location</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-1 sm:p-2 h-8 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                onClick={() => setShowFeelingInput(!showFeelingInput)}
              >
                <Smile size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">Feeling</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-1 sm:p-2 h-8 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                onClick={() => setCurrentHashtag(currentHashtag ? "" : " ")}
              >
                <Hash size={16} className="sm:mr-1" />
                <span className="hidden sm:inline">Hashtag</span>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 sm:p-2 h-8 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                  >
                    <Smile size={16} className="sm:mr-1" />
                    <span className="hidden sm:inline">Emoji</span>
                  </Button>
                </PopoverTrigger>
              </Popover>
            </div>

            <Button
              onClick={handleSubmit}
              className={cn(
                "bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base h-8 sm:h-9 px-3 sm:px-4",
                !content.trim() && images.length === 0 && "opacity-50 cursor-not-allowed",
              )}
              disabled={!content.trim() && images.length === 0}
            >
              <Send size={16} className="sm:mr-2" />
              <span className="hidden xs:inline">Post</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
