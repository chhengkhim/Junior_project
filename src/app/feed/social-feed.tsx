"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, ChevronLeft, ChevronRight, MapPin, ImageIcon, LinkIcon, Smile, Hash, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import CommentSection from "./comment-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import user from "@/assets/user.jpg"
import logo8 from "@/assets/logo8.png"

// Define interfaces first to ensure type consistency
interface Reply {
  id: string
  user: string
  username: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

interface Comment {
  id: string
  user: string
  username: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies: Reply[]
}

interface Post {
  id: string
  user: string
  username: string
  avatar: string
  verified: boolean
  content: string
  hashtags: string[]
  feeling: string
  location: string
  link: string
  images: string[]
  likes: number
  comments: Comment[]
  timestamp: string
  isLiked: boolean
  isBookmarked: boolean
}

// Feelings options
const feelingOptions = [
  "happy",
  "excited",
  "grateful",
  "relaxed",
  "loved",
  "accomplished",
  "productive",
  "motivated",
  "inspired",
  "curious",
  "thoughtful",
  "calm",
  "blessed",
  "thankful",
  "hopeful",
  "proud",
  "content",
  "amused",
  "optimistic",
  "energetic",
]

// Sample data for initial posts
const initialPosts: Post[] = [
  {
    id: "1",
    user: "Alan Patterson",
    username: "@alanpatterson",
    avatar: user.src,
    verified: true,
    content:
      "Just had an amazing breakfast meeting with @annaferguson and @davebishop! We discussed some exciting new ideas for our upcoming project. The coffee was fantastic too! 😊",
    hashtags: ["#networking", "#breakfast", "#collaboration", "#newproject"],
    feeling: "excited",
    location: "Downtown Café, New York",
    link: "",
    images: [user.src],
    likes: 42,
    comments: [
      {
        id: "c1",
        user: "Jane Smith",
        username: "@janesmith",
        avatar: user.src,
        content: "Looks like you had a great time! Can't wait to hear more about the project.",
        timestamp: "2023-05-14T10:30:00Z",
        likes: 5,
        isLiked: false,
        replies: [],
      },
      {
        id: "c2",
        user: "Dave Bishop",
        username: "@davebishop",
        avatar: user.src,
        content: "It was great meeting up! Looking forward to our next session.",
        timestamp: "2023-05-14T11:15:00Z",
        likes: 3,
        isLiked: false,
        replies: [],
      },
    ],
    timestamp: "2023-05-14T09:00:00Z",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    user: "Sarah Johnson",
    username: "@sarahjohnson",
    avatar: user.src,
    verified: false,
    content: "Working on my thesis all night. The library is so peaceful at 2 AM!",
    hashtags: ["#gradschool", "#thesis", "#latenight"],
    feeling: "productive",
    location: "University Library",
    link: "",
    images: [user.src],
    likes: 28,
    comments: [
      {
        id: "c3",
        user: "Taylor Smith",
        username: "@taylorsmith",
        avatar: user.src,
        content: "Don't forget to take breaks!",
        timestamp: "2023-05-13T22:45:00Z",
        likes: 1,
        isLiked: false,
        replies: [
          {
            id: "r1",
            user: "Sarah Johnson",
            username: "@sarahjohnson",
            avatar: "/placeholder.svg?height=40&width=40",
            content: "Thanks for the reminder! Just had some coffee.",
            timestamp: "2023-05-13T23:00:00Z",
            likes: 0,
            isLiked: false,
          },
        ],
      },
    ],
    timestamp: "2023-05-13T21:30:00Z",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "3",
    user: "Michael Chen",
    username: "@michaelchen",
    avatar: user.src,
    verified: true,
    content:
      "Just launched our new product! After months of hard work, it's finally live. Check it out and let me know what you think!",
    hashtags: ["#productlaunch", "#startup", "#tech"],
    feeling: "excited",
    location: "Tech Hub, San Francisco",
    link: "https://example.com/newproduct",
    images: [user.src],
    likes: 156,
    comments: [
      {
        id: "c4",
        user: "Jamie Lee",
        username: "@jamielee",
        avatar: user.src,
        content: "Congratulations! The product looks amazing!",
        timestamp: "2023-05-12T14:20:00Z",
        likes: 8,
        isLiked: false,
        replies: [],
      },
      {
        id: "c5",
        user: "Casey Wong",
        username: "@caseywong",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Just tried it out. Great work!",
        timestamp: "2023-05-12T15:10:00Z",
        likes: 2,
        isLiked: false,
        replies: [],
      },
    ],
    timestamp: "2023-05-12T13:45:00Z",
    isLiked: false,
    isBookmarked: false,
  },
]

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const [postContent, setPostContent] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({})
  // Removed unused selectedImage state
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkInput, setLinkInput] = useState("")
  const [showHashtagInput, setShowHashtagInput] = useState(false)
  const [hashtagInput, setHashtagInput] = useState("")
  const [showFeelingInput, setShowFeelingInput] = useState(false)
  const [feelingInput, setFeelingInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load posts from localStorage on initial render
  useEffect(() => {
    const savedPosts = localStorage.getItem("anonymousFeedPosts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("anonymousFeedPosts", JSON.stringify(posts))
  }, [posts])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleNewPost = () => {
    if (!postContent.trim() && !imagePreview && !linkInput) return

    // Extract hashtags from content
    const contentHashtags = (postContent.match(/#\w+/g) || []).map((tag) => tag.trim())

    // Add manually entered hashtags if they don't already exist in content
    const manualHashtags = hashtagInput
      .split(" ")
      .filter((tag) => tag.trim().startsWith("#"))
      .map((tag) => tag.trim())

    // Combine and remove duplicates
    const allHashtags = Array.from(new Set([...contentHashtags, ...manualHashtags]))

    const newPost: Post = {
      id: Date.now().toString(),
      user: "Anonymous User",
      username: "@anonymous",
      avatar: user.src,
      verified: false,
      content: postContent,
      hashtags: allHashtags,
      feeling: feelingInput,
      location: "",
      link: linkInput,
      images: imagePreview ? [imagePreview] : [],
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
      isLiked: false,
      isBookmarked: false,
    }

    setPosts([newPost, ...posts])

    // Reset all form fields
    setPostContent("")
    setSelectedImage(null)
    setImagePreview(null)
    setLinkInput("")
    setHashtagInput("")
    setFeelingInput("")
    setShowLinkInput(false)
    setShowHashtagInput(false)
    setShowFeelingInput(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  const toggleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          }
        }
        return post
      }),
    )
  }

  const sharePost = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (post) {
      navigator.clipboard.writeText(`https://anonymous-social.example/post/${postId}`)
      alert("Link copied to clipboard!")
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  const nextImage = (postId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % totalImages,
    }))
  }

  const prevImage = (postId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + totalImages) % totalImages,
    }))
  }

  const handleAddComment = (postId: string, comment: Comment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          }
        }
        return post
      }),
    )
  }

  const handleEditComment = (postId: string, commentId: string, newContent: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  content: newContent,
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment.id !== commentId),
          }
        }
        return post
      }),
    )
  }

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                const isLiked = !comment.isLiked
                return {
                  ...comment,
                  isLiked,
                  likes: isLiked ? comment.likes + 1 : comment.likes - 1,
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  const handleAddReply = (postId: string, commentId: string, reply: Reply) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, reply],
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  const handleEditReply = (postId: string, commentId: string, replyId: string, newContent: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                      return {
                        ...reply,
                        content: newContent,
                      }
                    }
                    return reply
                  }),
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  const handleDeleteReply = (postId: string, commentId: string, replyId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: comment.replies.filter((reply) => reply.id !== replyId),
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  const handleLikeReply = (postId: string, commentId: string, replyId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) => {
                    if (reply.id === replyId) {
                      const isLiked = !reply.isLiked
                      return {
                        ...reply,
                        isLiked,
                        likes: isLiked ? reply.likes + 1 : reply.likes - 1,
                      }
                    }
                    return reply
                  }),
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.src} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                className="w-full border-0 focus-visible:ring-0 resize-none p-0 text-base bg-transparent"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />

              {imagePreview && (
                <div className="relative mt-2 w-full max-w-xs">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Link Input */}
              {showLinkInput && (
                <div className="mt-3 space-y-2 animate-slideDown">
                  <Label htmlFor="link-input">Add a link</Label>
                  <Input
                    id="link-input"
                    placeholder="https://example.com"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              )}

              {/* Hashtag Input */}
              {showHashtagInput && (
                <div className="mt-3 space-y-2 animate-slideDown">
                  <Label htmlFor="hashtag-input">Add hashtags (separate with spaces)</Label>
                  <Input
                    id="hashtag-input"
                    placeholder="#awesome #social"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              )}

              {/* Feeling Input */}
              {showFeelingInput && (
                <div className="mt-3 space-y-2 animate-slideDown">
                  <Label htmlFor="feeling-input">How are you feeling?</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {feelingOptions.map((feeling) => (
                      <Button
                        key={feeling}
                        variant={feelingInput === feeling ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "text-xs capitalize",
                          feelingInput === feeling && "bg-[#1d2b7d] hover:bg-[#1d2b7d]/90",
                        )}
                        onClick={() => setFeelingInput(feeling)}
                      >
                        {feeling}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Photo</span>
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              <Button
                variant={showLinkInput ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  showLinkInput && "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                )}
                onClick={() => setShowLinkInput(!showLinkInput)}
              >
                <LinkIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Link</span>
              </Button>
              <Button
                variant={showFeelingInput ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  showFeelingInput && "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                )}
                onClick={() => setShowFeelingInput(!showFeelingInput)}
              >
                <Smile className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Feeling</span>
              </Button>
              <Button
                variant={showHashtagInput ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  showHashtagInput && "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                )}
                onClick={() => setShowHashtagInput(!showHashtagInput)}
              >
                <Hash className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Hashtag</span>
              </Button>
            </div>
            <Button
              className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white"
              size="sm"
              onClick={handleNewPost}
              disabled={!postContent.trim() && !imagePreview && !linkInput}
            >
              <Send className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Post</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => {
        const currentIndex = currentImageIndex[post.id] || 0

        return (
          <Card
            key={post.id}
            className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
          >
            <CardHeader className="flex flex-row items-start p-4 space-y-0">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src={logo8.src} alt={post.user} />
                  <AvatarFallback>{post.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold">{post.user}</span>
                    {post.verified && (
                      <svg className="h-4 w-4 ml-1 text-[#1d2b7d]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center">
                    <span>{post.username}</span>
                    <span className="mx-1">•</span>
                    <span>{formatTimestamp(post.timestamp)}</span>
                    {post.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {post.location}
                        </span>
                      </>
                    )}
                    {post.feeling && (
                      <>
                        <span className="mx-1">•</span>
                        <span>Feeling {post.feeling}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto rounded-full h-8 w-8">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => sharePost(post.id)}>Share</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleBookmark(post.id)}>
                    {post.isBookmarked ? "Remove bookmark" : "Bookmark"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="p-0">
              {post.content && (
                <div className="px-4 py-2 text-base">
                  {post.content}

                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-blue-500 hover:underline truncate"
                    >
                      {post.link}
                    </a>
                  )}
                </div>
              )}

              {post.hashtags.length > 0 && (
                <div className="px-4 pb-3 flex flex-wrap gap-1">
                  {post.hashtags.map((tag, i) => (
                    <span key={i} className="text-blue-500 hover:underline cursor-pointer text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.images.length > 0 && (
                <div className="relative">
                  <div className="overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={post.images[currentIndex] || "/placeholder.svg"}
                      alt="Post content"
                      width={800}
                      height={500}
                      className="w-full object-cover"
                    />
                  </div>

                  {post.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
                        onClick={() => prevImage(post.id, post.images.length)}
                      >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Previous image</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
                        onClick={() => nextImage(post.id, post.images.length)}
                      >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Next image</span>
                      </Button>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                        {post.images.map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              "w-2 h-2 rounded-full transition-colors",
                              index === currentIndex ? "bg-white" : "bg-white/50",
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="px-4 py-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center space-x-1 px-2",
                      post.isLiked ? "text-[#1d2b7d]" : "text-gray-600 dark:text-gray-400",
                    )}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart
                      className={cn("h-5 w-5 transition-transform", post.isLiked && "fill-current like-animation")}
                    />
                    <span>{post.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 px-2 text-gray-600 dark:text-gray-400"
                    onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments.length}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1 px-2 text-gray-600 dark:text-gray-400"
                    onClick={() => sharePost(post.id)}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("px-2", post.isBookmarked ? "text-[#1d2b7d]" : "text-gray-600 dark:text-gray-400")}
                  onClick={() => toggleBookmark(post.id)}
                >
                  <Bookmark
                    className={cn("h-5 w-5 transition-transform", post.isBookmarked && "fill-current animate-pop")}
                  />
                </Button>
              </div>

              {(post.comments.length > 0 || activeCommentId === post.id) && (
                <CommentSection
                  postId={post.id}
                  comments={post.comments}
                  isExpanded={activeCommentId === post.id}
                  onToggleExpand={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                  onAddComment={handleAddComment}
                  onEditComment={handleEditComment}
                  onDeleteComment={handleDeleteComment}
                  onLikeComment={handleLikeComment}
                  onAddReply={handleAddReply}
                  onEditReply={handleEditReply}
                  onDeleteReply={handleDeleteReply}
                  onLikeReply={handleLikeReply}
                  formatTimestamp={formatTimestamp}
                />
              )}
            </CardContent>
          </Card>
        )
      })}

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No posts yet</p>
          <p className="text-sm mt-2">Be the first to share something!</p>
        </div>
      )}
    </div>
  )
}
function setSelectedImage(image: File | null) {
  // This function sets the selected image for preview or resets it to null
  if (image) {
    console.log("Image selected:", image.name);
  } else {
    console.log("Image selection cleared.");
  }
}

