"use client"
import { useState, useRef } from "react"
import logo8 from "@/assets/logo8.png"
import user from "@/assets/user.jpg"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  ImageIcon,
  Send,
  Smile,
  Bookmark,
  Calendar,
  MapPin,
  Link2,
  Music,
  Video,
  FileText,
  Award,
  ThumbsUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import CreatePost from "./create-post"
import { useEffect as reactUseEffect } from "react";

// Sample data for posts with more content variety
const initialPosts: {
  id: number
  author: {
    name: string
    username: string
    avatar: string
    timeAgo: string
    verified?: boolean
  }
  content: string
  hashtags: string[]
  image?: string
  likes: number
  comments: number
  shares: number
  bookmarked: boolean
  liked: boolean
  commentsList: {
    id: number
    author: string
    username: string
    avatar: string
    content: string
    timeAgo: string
    likes: number
  }[]
  location?: string
  mood?: string
  activity?: string
  postType?: "text" | "image" | "link" | "event" | "video" | "music" | "document" | "achievement"
}[] = [
  {
    id: 1,
    author: {
      name: "Alan Patterson",
      username: "@alanpatterson",
      avatar: logo8.src,
      timeAgo: "2 hours ago",
      verified: true,
    },
    content:
      "Just had an amazing breakfast meeting with @annaferguson and @davebishop! We discussed some exciting new ideas for our upcoming project. The coffee was fantastic too! 😊",
    hashtags: ["networking", "breakfast", "collaboration", "newproject"],
    image: logo8.src,
    likes: 145,
    comments: 36,
    shares: 12,
    bookmarked: false,
    liked: false,
    location: "Downtown Café, New York",
    mood: "Excited",
    commentsList: [
      {
        id: 101,
        author: "Jane Smith",
        username: "@janesmith",
        avatar: logo8.src,
        content: "Looks like you had a great time! Can't wait to hear more about the project.",
        timeAgo: "1 hour ago",
        likes: 5,
      },
      {
        id: 102,
        author: "Dave Bishop",
        username: "@davebishop",
        avatar: logo8.src,
        content: "It was great meeting up! Looking forward to our next session.",
        timeAgo: "45 minutes ago",
        likes: 3,
      },
    ],
    postType: "image",
  },
  {
    id: 2,
    author: {
      name: "Pierre Rushman",
      username: "@pierrerushman",
      avatar: logo8.src,
      timeAgo: "4 hours ago",
    },
    content:
      "Just finished working on an exciting new design project. The client loved it! Here's a sneak peek of what we've been working on for the past month. What do you think?",
    hashtags: ["design", "uidesign", "creativework", "portfolio"],
    image: logo8.src,
    likes: 223,
    comments: 47,
    shares: 18,
    bookmarked: true,
    liked: true,
    commentsList: [
      {
        id: 201,
        author: "Sarah Johnson",
        username: "@sarahjohnson",
        avatar: logo8.src,
        content: "This looks amazing! Love the color palette you chose.",
        timeAgo: "3 hours ago",
        likes: 12,
      },
      {
        id: 202,
        author: "Michael Chen",
        username: "@michaelchen",
        avatar: logo8.src,
        content: "Incredible work as always! The attention to detail is impressive.",
        timeAgo: "2 hours ago",
        likes: 8,
      },
      {
        id: 203,
        author: "Emma Wilson",
        username: "@emmawilson",
        avatar: logo8.src,
        content: "Can't wait to see the full project! The teaser looks promising.",
        timeAgo: "1 hour ago",
        likes: 5,
      },
    ],
    postType: "image",
  },
  {
    id: 3,
    author: {
      name: "Sophia Rodriguez",
      username: "@sophiarodriguez",
      avatar: logo8.src,
      timeAgo: "Yesterday",
      verified: true,
    },
    content:
      "Just announced! Our annual tech conference will be held on June 15-17 at the Convention Center. Early bird tickets are now available. Don't miss out on three days of inspiring talks, workshops, and networking opportunities!",
    hashtags: ["techconference", "events", "networking", "earlybird"],
    likes: 89,
    comments: 23,
    shares: 45,
    bookmarked: false,
    liked: false,
    commentsList: [
      {
        id: 301,
        author: "Robert Lee",
        username: "@robertlee",
        avatar: logo8.src,
        content: "Already got my tickets! Looking forward to it.",
        timeAgo: "20 hours ago",
        likes: 3,
      },
    ],
    postType: "event",
  },
  {
    id: 4,
    author: {
      name: "Marcus Johnson",
      username: "@marcusjohnson",
      avatar: logo8.src,
      timeAgo: "2 days ago",
    },
    content:
      "Check out this interesting article on the future of AI in healthcare. It discusses how machine learning algorithms are being used to improve diagnostic accuracy and patient outcomes.",
    hashtags: ["ai", "healthcare", "technology", "machinelearning"],
    image: user.src,
    likes: 112,
    comments: 18,
    shares: 34,
    bookmarked: true,
    liked: false,
    commentsList: [],
    postType: "link",
  },
  {
    id: 5,
    author: {
      name: "Elena Kowalski",
      username: "@elenakowalski",
      avatar: logo8.src,
      timeAgo: "3 days ago",
      verified: true,
    },
    content:
      "Just released my new music track 'Digital Dreams'! It's a blend of electronic and ambient sounds that I've been working on for months. Give it a listen and let me know what you think!",
    hashtags: ["newmusic", "electronic", "ambient", "producer"],
    likes: 342,
    comments: 57,
    shares: 89,
    bookmarked: false,
    liked: true,
    commentsList: [
      {
        id: 501,
        author: "DJ Maximus",
        username: "@djmaximus",
        avatar: logo8.src,
        content: "This is fire! Love the synth work around the 2:30 mark.",
        timeAgo: "2 days ago",
        likes: 15,
      },
      {
        id: 502,
        author: "Music Lover",
        username: "@musiclover",
        avatar: logo8.src,
        content: "Been on repeat all day! When's the album dropping?",
        timeAgo: "2 days ago",
        likes: 8,
      },
    ],
    postType: "music",
  },
  {
    id: 6,
    author: {
      name: "Carlos Mendez",
      username: "@carlosmendez",
      avatar: logo8.src,
      timeAgo: "4 days ago",
    },
    content:
      "Just completed my first marathon! 26.2 miles in 3:45:22. All those months of training finally paid off. Thanks to everyone who supported me along the way!",
    hashtags: ["marathon", "running", "fitness", "achievement"],
    image: user.src,
    likes: 487,
    comments: 92,
    shares: 45,
    bookmarked: true,
    liked: true,
    location: "Boston Marathon",
    mood: "Accomplished",
    commentsList: [
      {
        id: 601,
        author: "Runner Friend",
        username: "@runnerfriend",
        avatar: logo8.src,
        content: "Amazing time for your first marathon! So proud of you!",
        timeAgo: "3 days ago",
        likes: 24,
      },
    ],
    postType: "achievement",
  },
  {
    id: 7,
    author: {
      name: "Priya Sharma",
      username: "@priyasharma",
      avatar: logo8.src,
      timeAgo: "5 days ago",
    },
    content:
      "Just uploaded my latest tutorial on advanced React patterns. Learn how to build scalable and maintainable components with custom hooks, context, and more!",
    hashtags: ["react", "javascript", "webdevelopment", "tutorial"],
    likes: 256,
    comments: 43,
    shares: 78,
    bookmarked: false,
    liked: false,
    commentsList: [
      {
        id: 701,
        author: "Code Enthusiast",
        username: "@codeenthusiast",
        avatar: logo8.src,
        content: "Your tutorials are always so clear and helpful. Thanks!",
        timeAgo: "4 days ago",
        likes: 12,
      },
    ],
    postType: "video",
  },
  {
    id: 8,
    author: {
      name: "Alex Thompson",
      username: "@alexthompson",
      avatar: logo8.src,
      timeAgo: "1 week ago",
      verified: true,
    },
    content:
      "Just published my research paper on sustainable urban planning. It explores innovative approaches to creating eco-friendly cities that prioritize both environmental health and quality of life.",
    hashtags: ["research", "urbanplanning", "sustainability", "environment"],
    image: logo8.src,
    likes: 189,
    comments: 37,
    shares: 64,
    bookmarked: true,
    liked: false,
    commentsList: [
      {
        id: 801,
        author: "Urban Planner",
        username: "@urbanplanner",
        avatar: logo8.src,
        content: "Fascinating research! Would love to discuss your findings further.",
        timeAgo: "6 days ago",
        likes: 9,
      },
    ],
    postType: "document",
  },
]

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts)
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({})
  const [showComments, setShowComments] = useState<Record<number, boolean>>({})
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState(4) // Initially show 4 posts
  const feedRef = useRef<HTMLDivElement>(null)

  // Load more posts as user scrolls
  const loadMorePosts = () => {
    // Add 2 more posts at a time
    setVisiblePosts((prev) => Math.min(prev + 2, posts.length))
  }

  // Handle post liking with animation
  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      }),
    )
  }

  // Handle post bookmarking
  const handleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )
  }

  // Toggle comments visibility
  const toggleComments = (postId: number) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  // Add comment to post
  const addComment = (postId: number) => {
    if (!commentInputs[postId] || commentInputs[postId].trim() === "") return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now(),
            author: "Current User",
            username: "@currentuser",
            avatar: "/placeholder.svg?height=32&width=32",
            content: commentInputs[postId],
            timeAgo: "Just now",
            likes: 0,
          }
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...(post.commentsList || []), newComment],
          }
        }
        return post
      }),
    )

    // Clear the comment input
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: "",
    }))
  }

  // Share post
  const sharePost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shares + 1,
          }
        }
        return post
      }),
    )
    alert(`Sharing post ${postId}! In a real app, this would open a share dialog.`)
  }

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }

    // Check if we're near the bottom of the page to load more posts
    const scrollPosition = window.innerHeight + window.scrollY
    const pageHeight = document.documentElement.scrollHeight

    if (scrollPosition >= pageHeight - 800 && visiblePosts < posts.length) {
      loadMorePosts()
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [visiblePosts, posts.length])

  // Get post icon based on type
  const getPostTypeIcon = (type?: string) => {
    switch (type) {
      case "link":
        return <Link2 className="w-4 h-4" />
      case "event":
        return <Calendar className="w-4 h-4" />
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "music":
        return <Music className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "achievement":
        return <Award className="w-4 h-4" />
      default:
        return null
    }
  }

  // Handle new post creation
  const handlePostCreated = (newPost: (typeof initialPosts)[number]) => {
    setPosts([newPost, ...posts])
    setVisiblePosts((prev) => prev + 1) // Ensure the new post is visible
  }

  // Post card animation variants
  const postCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  // Like button animation variants
  const likeButtonVariants = {
    liked: { scale: [1, 1.3, 1], transition: { duration: 0.5 } },
    unliked: { scale: 1 },
  }

  return (
    <div className="max-w-4xl mx-auto rounded-2xl space-y-8 px-4 py-8" ref={feedRef}>
      {/* Create post component */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CreatePost
          onPostCreated={(post: {
            id: number
            author: {
              name: string
              username: string
              avatar: string
              timeAgo: string
              verified?: boolean
            }
            content: string
            hashtags: string[]
            image?: string
            likes: number
            comments: number
            shares: number
            bookmarked: boolean
            liked: boolean
            commentsList: {
              id: number
              author: string
              username: string
              avatar: string
              content: string
              timeAgo: string
              likes: number
            }[]
            location?: string
            mood?: string
            activity?: string
            postType?: "text" | "image" | "link" | "event" | "video" | "music" | "document" | "achievement"
          }) => handlePostCreated(post)}
        />
      </motion.div>

      {/* Posts feed */}
      <div className="space-y-8">
        <AnimatePresence>
          {posts.slice(0, visiblePosts).map((post, index) => (
            <motion.div
              key={post.id}
              custom={index}
              variants={postCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layoutId={`post-${post.id}`}
              className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden transform transition-all hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Avatar className="w-14 h-14 border-2 border-gray-100">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-lg">{post.author.name}</h3>
                        {post.author.verified && (
                          <motion.svg
                            className="w-5 h-5 ml-1 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </motion.svg>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span>{post.author.username}</span>
                        <span>•</span>
                        <span>{post.author.timeAgo}</span>
                        {post.postType && (
                          <>
                            <span>•</span>
                            <span className="flex items-center">{getPostTypeIcon(post.postType)}</span>
                          </>
                        )}
                      </div>
                      {(post.location || post.mood) && (
                        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                          {post.location && (
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {post.location}
                            </span>
                          )}
                          {post.mood && (
                            <>
                              {post.location && <span>•</span>}
                              <span className="flex items-center">
                                <Smile className="w-3 h-3 mr-1" />
                                Feeling {post.mood}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" className="text-gray-500 p-1 h-auto rounded-full hover:bg-gray-100">
                          <MoreVertical size={20} />
                        </Button>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0">
                      <div className="space-y-0">
                        <Button
                          variant="ghost"
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-none justify-start"
                        >
                          Save post
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-none justify-start"
                        >
                          Hide post
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-none justify-start"
                        >
                          Report post
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mt-4">
                  <p className="text-gray-800 whitespace-pre-line text-base leading-relaxed">{post.content}</p>
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.hashtags.map((tag) => (
                        <motion.a
                          key={tag}
                          href="#"
                          className="text-blue-500 text-sm hover:underline bg-blue-50 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.05, backgroundColor: "#e0f2fe" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          #{tag}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>

                {post.image && (
                  <motion.div
                    className="mt-4"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={post.image || "/placeholder.svg"}
                      width={800}
                      height={500}
                      alt="Post image"
                      className="w-full rounded-lg object-cover max-h-[600px]"
                    />
                  </motion.div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-b py-3">
                  <div className="flex items-center space-x-8">
                    <motion.div variants={likeButtonVariants} animate={post.liked ? "liked" : "unliked"}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center space-x-2 p-2 h-auto rounded-lg text-base",
                          post.liked ? "text-red-500" : "text-gray-500 hover:text-red-500",
                        )}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          size={20}
                          fill={post.liked ? "currentColor" : "none"}
                          className={post.liked ? "animate-heartbeat" : ""}
                        />
                        <span className="font-medium">{post.likes}</span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 text-gray-500 p-2 h-auto rounded-lg hover:text-blue-500 text-base"
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageCircle size={20} />
                        <span className="font-medium">{post.comments}</span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 text-gray-500 p-2 h-auto rounded-lg hover:text-green-500 text-base"
                        onClick={() => sharePost(post.id)}
                      >
                        <Share2 size={20} />
                        <span className="font-medium">{post.shares}</span>
                      </Button>
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "text-gray-500 p-2 h-auto rounded-lg",
                        post.bookmarked ? "text-yellow-500" : "hover:text-yellow-500",
                      )}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <Bookmark size={20} fill={post.bookmarked ? "currentColor" : "none"} />
                    </Button>
                  </motion.div>
                </div>

                {/* Comments section */}
                <AnimatePresence>
                  {showComments[post.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="mt-5 pt-3"
                    >
                      <h4 className="font-medium text-base mb-4">Comments</h4>

                      {/* Comment list */}
                      {post.commentsList && post.commentsList.length > 0 ? (
                        <div className="space-y-4 mb-4">
                          {post.commentsList.map((comment, commentIndex) => (
                            <motion.div
                              key={comment.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: commentIndex * 0.1,
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className="flex space-x-3"
                            >
                              <Avatar className="w-10 h-10 border border-gray-200">
                                <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-50 rounded-lg p-3 flex-1">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500 ml-1">{comment.username}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                                <div className="flex items-center mt-2 space-x-3">
                                  <motion.button
                                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <ThumbsUp size={12} className="mr-1" />
                                    <span>Like</span>
                                  </motion.button>
                                  <motion.button
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Reply
                                  </motion.button>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Heart size={12} className="mr-1" />
                                    {comment.likes}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
                      )}

                      {/* Add comment */}
                      <div className="flex space-x-3">
                        <Avatar className="w-10 h-10 border border-gray-200">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your profile" />
                          <AvatarFallback>CU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex">
                          <Input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentInputs[post.id] || ""}
                            onChange={(e) =>
                              setCommentInputs({
                                ...commentInputs,
                                [post.id]: e.target.value,
                              })
                            }
                            className="flex-1 text-sm rounded-r-none focus:ring-2 focus:ring-blue-500/30 border-gray-200"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addComment(post.id)
                              }
                            }}
                          />
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => addComment(post.id)}
                              className="rounded-l-none bg-blue-500 hover:bg-blue-600 text-white"
                              size="sm"
                            >
                              <Send size={16} />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {visiblePosts < posts.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
              <span className="text-gray-500">Loading more posts...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed right-8 bottom-8 z-50"
          >
            <motion.button
              onClick={scrollToTop}
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg p-4 h-14 w-14 flex items-center justify-center"
              aria-label="Scroll to top"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-up"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
function useEffect(callback: () => () => void, dependencies: number[]) {
  reactUseEffect(callback, dependencies);
}

