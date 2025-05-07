"use client"
import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import CreatePost from "./create-post"

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
  postType?: "text" | "image" | "link" | "event"
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
    image: user.src,
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
]

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts)
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({})
  const [showComments, setShowComments] = useState<Record<number, boolean>>({})
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle post liking
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
  }, [])

  // Get post icon based on type
  const getPostTypeIcon = (type?: string) => {
    switch (type) {
      case "link":
        return <Link2 className="w-4 h-4" />
      case "event":
        return <Calendar className="w-4 h-4" />
      case "image":
        return <ImageIcon className="w-4 h-4" />
      default:
        return null
    }
  }

  // Handle new post creation
  const handlePostCreated = (newPost: typeof initialPosts[number]) => {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="max-w-3xl mx-auto rounded-2xl space-y-6 px-4 py-6">
      {/* Create post component */}
      <CreatePost
        onPostCreated={(post: {
          id: number;
          author: {
            name: string;
            username: string;
            avatar: string;
            timeAgo: string;
            verified?: boolean;
          };
          content: string;
          hashtags: string[];
          image?: string;
          likes: number;
          comments: number;
          shares: number;
          bookmarked: boolean;
          liked: boolean;
          commentsList: {
            id: number;
            author: string;
            username: string;
            avatar: string;
            content: string;
            timeAgo: string;
            likes: number;
          }[];
          location?: string;
          mood?: string;
          activity?: string;
          postType?: "text" | "image" | "link" | "event";
        }) => handlePostCreated(post)}
      />

      {/* Posts feed */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">{post.author.name}</h3>
                      {post.author.verified && (
                        <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
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
                    <Button variant="ghost" className="text-gray-500 p-1 h-auto rounded-full hover:bg-gray-100">
                      <MoreVertical size={20} />
                    </Button>
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

              <div className="mt-3">
                <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.hashtags.map((tag) => (
                      <a key={tag} href="#" className="text-blue-500 text-sm hover:underline">
                        #{tag}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {post.image && (
                <div className="mt-3">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt="Post image"
                    className="w-full rounded-lg object-cover max-h-[500px]"
                  />
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-b py-2">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center space-x-1 p-1 h-auto rounded-lg",
                      post.liked ? "text-red-500" : "text-gray-500 hover:text-red-500",
                    )}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart size={18} fill={post.liked ? "currentColor" : "none"} />
                    <span>{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-gray-500 p-1 h-auto rounded-lg hover:text-blue-500"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-gray-500 p-1 h-auto rounded-lg hover:text-green-500"
                    onClick={() => sharePost(post.id)}
                  >
                    <Share2 size={18} />
                    <span>{post.shares}</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-gray-500 p-1 h-auto rounded-lg",
                    post.bookmarked ? "text-yellow-500" : "hover:text-yellow-500",
                  )}
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark size={18} fill={post.bookmarked ? "currentColor" : "none"} />
                </Button>
              </div>

              {/* Comments section */}
              {showComments[post.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-3"
                >
                  <h4 className="font-medium text-sm mb-3">Comments</h4>

                  {/* Comment list */}
                  {post.commentsList && post.commentsList.length > 0 ? (
                    <div className="space-y-3 mb-3">
                      {post.commentsList.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex space-x-2"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-50 rounded-lg p-2 flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500 ml-1">{comment.username}</span>
                              </div>
                              <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                            <div className="flex items-center mt-1 space-x-2">
                              <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
                              <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
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
                    <p className="text-sm text-gray-500 mb-3">No comments yet</p>
                  )}

                  {/* Add comment */}
                  <div className="flex space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your profile" />
                      <AvatarFallback>CU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex">
                      <Input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        className="flex-1 text-sm rounded-r-none focus:ring-1 focus:ring-primary/20"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addComment(post.id)
                          }
                        }}
                      />
                      <Button
                        onClick={() => addComment(post.id)}
                        className="rounded-l-none bg-blue-500 hover:bg-blue-600 text-white"
                        size="sm"
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-6 bottom-6"
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg p-3 h-12 w-12 flex items-center justify-center"
            aria-label="Scroll to top"
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
          </Button>
        </motion.div>
      )}
    </div>
  )
}
