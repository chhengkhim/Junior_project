"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  MessageSquare,
  Heart,
  TrendingUp,
  Search,
  Eye,
  Ban,
  Mail,
  Calendar,
  MoreHorizontal,
  UserCheck,
  UserX,
  Activity,
  Sparkles,
  RefreshCw,
  Filter,
  ArrowUpDown,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AnimatedProgressCircle } from "./progress-circle"
import { AnimatedCounter } from "./animated-counter"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { TrendChart } from "./trend-chart"

interface User {
  id: number
  name: string
  email: string
  avatar: string
  totalLikes: number
  totalComments: number
  totalPosts: number
  joinDate: string
  lastActive: string
  status: "active" | "inactive" | "banned"
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [timeFilter, setTimeFilter] = useState("week")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("likes")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock user data - replace with real API calls
  const users: User[] = useMemo(() => [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 2847,
      totalComments: 1234,
      totalPosts: 89,
      joinDate: "2023-01-15",
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 1923,
      totalComments: 876,
      totalPosts: 67,
      joinDate: "2023-02-20",
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 3421,
      totalComments: 1567,
      totalPosts: 124,
      joinDate: "2022-11-08",
      lastActive: "5 minutes ago",
      status: "active",
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "d.rodriguez@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 756,
      totalComments: 432,
      totalPosts: 34,
      joinDate: "2023-06-12",
      lastActive: "3 days ago",
      status: "inactive",
    },
    {
      id: 5,
      name: "Lisa Park",
      email: "lisa.park@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 4123,
      totalComments: 2341,
      totalPosts: 156,
      joinDate: "2022-08-03",
      lastActive: "1 hour ago",
      status: "active",
    },
    {
      id: 6,
      name: "James Thompson",
      email: "j.thompson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 234,
      totalComments: 123,
      totalPosts: 12,
      joinDate: "2023-09-15",
      lastActive: "1 week ago",
      status: "banned",
    },
    {
      id: 7,
      name: "Anna Kowalski",
      email: "anna.k@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 1876,
      totalComments: 934,
      totalPosts: 78,
      joinDate: "2023-03-22",
      lastActive: "4 hours ago",
      status: "active",
    },
    {
      id: 8,
      name: "Roberto Silva",
      email: "r.silva@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      totalLikes: 2156,
      totalComments: 1087,
      totalPosts: 92,
      joinDate: "2022-12-10",
      lastActive: "30 minutes ago",
      status: "active",
    },
  ], [])
  const userStats = {
    totalUsers: users.length,
    newUsers: users.filter((u) => new Date(u.joinDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    activeUsers: users.filter((u) => u.status === "active").length,
    userGrowth: 12.5,
  }

  const confessionStats = {
    totalConfessions: users.reduce((sum, user) => sum + user.totalPosts, 0),
    newConfessions: 89,
    avgDaily: 45,
    confessionGrowth: 8.3,
  }

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesStatus
    })

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "likes":
          return b.totalLikes - a.totalLikes
        case "comments":
          return b.totalComments - a.totalComments
        case "posts":
          return b.totalPosts - a.totalPosts
        case "name":
          return a.name.localeCompare(b.name)
        case "joinDate":
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [users, searchTerm, statusFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleUserAction = (userId: number, action: string) => {
    console.log(`Action ${action} for user ${userId}`)
    // Implement user actions here
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for users:`, selectedUsers)
    // Implement bulk actions here
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 md:mb-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </motion.div>
                <TypingAnimation className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-black bg-clip-text text-transparent">
                  Mindspeak Analytics Hub
                </TypingAnimation>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center gap-2 text-slate-600"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-medium">Live Data • Updated 2 minutes ago</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <RefreshCw size={12} className="text-slate-400" />
                </motion.div>
              </motion.div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Enhanced User Analytics Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 md:mb-6"
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <motion.h2
              className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              User Analytics
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Total Users Card */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-3 md:p-4 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <motion.div
                      className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <Users size={16} className="md:w-5 md:h-5 text-blue-600" />
                    </motion.div>
                    <div className="w-8 h-8 md:w-10 md:h-10">
                      <AnimatedProgressCircle value={85} color="#3b82f6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Total Users</p>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter
                        value={userStats.totalUsers}
                        className="text-lg md:text-2xl font-bold text-slate-800"
                      />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="text-emerald-500 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrendingUp size={8} />+{userStats.userGrowth}%
                      </motion.span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Active: {userStats.activeUsers}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* New Users Card */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-3 md:p-4 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <motion.div
                      className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <TrendingUp size={16} className="md:w-5 md:h-5 text-emerald-600" />
                    </motion.div>
                    <div className="w-8 h-8 md:w-10 md:h-10">
                      <AnimatedProgressCircle value={22} color="#10b981" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">New Users</p>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter
                        value={userStats.newUsers}
                        className="text-lg md:text-2xl font-bold text-slate-800"
                      />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-emerald-500 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrendingUp size={8} />
                        +15%
                      </motion.span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">This {timeFilter}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Total Confessions Card */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-3 md:p-4 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <motion.div
                      className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MessageSquare size={16} className="md:w-5 md:h-5 text-purple-600" />
                    </motion.div>
                    <div className="w-8 h-8 md:w-10 md:h-10">
                      <AnimatedProgressCircle value={68} color="#8b5cf6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Total Confessions</p>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter
                        value={confessionStats.totalConfessions}
                        className="text-lg md:text-2xl font-bold text-slate-800"
                      />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        className="text-emerald-500 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrendingUp size={8} />+{confessionStats.confessionGrowth}%
                      </motion.span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Avg daily: {confessionStats.avgDaily}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Total Engagement Card */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-3 md:p-4 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <motion.div
                      className="p-2 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl shadow-lg"
                      whileHover={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <Heart size={16} className="md:w-5 md:h-5 text-rose-600" />
                    </motion.div>
                    <div className="w-8 h-8 md:w-10 md:h-10">
                      <AnimatedProgressCircle value={12} color="#f97316" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium">Total Engagement</p>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter
                        value={users.reduce((sum, user) => sum + user.totalLikes + user.totalComments, 0)}
                        className="text-lg md:text-2xl font-bold text-slate-800"
                      />
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 }}
                        className="text-emerald-500 text-xs font-semibold flex items-center gap-1"
                      >
                        <TrendingUp size={8} />
                        +5%
                      </motion.span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Likes + Comments</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Trend Chart Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 md:mb-6"
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              Activity Trends
            </motion.h2>
          </div>

          <Card className="p-3 md:p-4 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
            <TrendChart />
          </Card>
        </motion.div>

        {/* Enhanced User Management Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3 md:mb-4">
            <motion.h2
              className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              User Management
            </motion.h2>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <AnimatePresence>
                {selectedUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-1 sm:flex-none"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg w-full sm:w-auto"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                          >
                            <span className="hidden sm:inline">Bulk Actions </span>({selectedUsers.length})
                          </motion.div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white/90 backdrop-blur-sm">
                        <DropdownMenuItem onClick={() => handleBulkAction("activate")}>
                          <UserCheck size={16} className="mr-2" />
                          Activate Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction("deactivate")}>
                          <UserX size={16} className="mr-2" />
                          Deactivate Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction("ban")}>
                          <Ban size={16} className="mr-2" />
                          Ban Users
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Filters and Search */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-3 mb-3 md:mb-4 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Search size={14} className="text-slate-400" />
                    </motion.div>
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 border-white/20 focus:bg-white/80 transition-all duration-300 text-sm h-9"
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-36 bg-white/50 border-white/20 text-sm h-9">
                      <ArrowUpDown size={14} className="mr-1" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="likes">Most Likes</SelectItem>
                      <SelectItem value="comments">Most Comments</SelectItem>
                      <SelectItem value="posts">Most Posts</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="joinDate">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-28 bg-white/50 border-white/20 text-sm h-9">
                      <Filter size={14} className="mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Users Table */}
          <Card className="bg-white/80 backdrop-blur-xl border-white/30 shadow-2xl overflow-hidden">
            {/* Mobile Card View */}
            <div className="block lg:hidden">
              <div className="p-3 space-y-3">
                <AnimatePresence>
                  {paginatedUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <motion.input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user.id])
                              } else {
                                setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                              }
                            }}
                            className="rounded border-slate-300 w-4 h-4"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          />
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                            <Avatar className="w-12 h-12 ring-2 ring-white/60 shadow-lg">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white font-bold">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                            </div>
                            <p className="text-xs text-slate-600 mb-1">{user.email}</p>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar size={10} />
                              Joined {new Date(user.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="icon" className="hover:bg-slate-100 h-8 w-8 rounded-full">
                                <MoreHorizontal size={14} />
                              </Button>
                            </motion.div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                            <DropdownMenuItem onClick={() => handleUserAction(user.id, "view")}>
                              <Eye size={14} className="mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction(user.id, "message")}>
                              <Mail size={14} className="mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleUserAction(user.id, "deactivate")}>
                                <UserX size={14} className="mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleUserAction(user.id, "activate")}>
                                <UserCheck size={14} className="mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleUserAction(user.id, "ban")} className="text-red-600">
                              <Ban size={14} className="mr-2" />
                              Ban User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-3 border border-pink-100">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart size={12} className="text-pink-600" />
                            <span className="text-xs font-semibold text-slate-700">Likes</span>
                          </div>
                          <span className="text-lg font-bold text-slate-800">{user.totalLikes.toLocaleString()}</span>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-3 border border-blue-100">
                          <div className="flex items-center gap-2 mb-1">
                            <MessageSquare size={12} className="text-blue-600" />
                            <span className="text-xs font-semibold text-slate-700">Comments</span>
                          </div>
                          <span className="text-lg font-bold text-slate-800">
                            {user.totalComments.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl px-3 py-2 border border-purple-100">
                          <span className="text-xs text-slate-600 font-medium">Posts: </span>
                          <span className="text-sm font-bold text-slate-800">{user.totalPosts}</span>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "inactive"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="capitalize font-semibold text-xs px-2 py-1"
                          >
                            {user.status}
                          </Badge>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Table View - Compact */}
            <div className="hidden lg:block p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(paginatedUsers.map((u) => u.id))
                            } else {
                              setSelectedUsers([])
                            }
                          }}
                          className="rounded border-slate-300 w-4 h-4"
                        />
                      </th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">User</th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">Contact</th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">Likes</th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">Comments</th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">Posts</th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">Status</th>
                      <th className="text-left py-3 px-3 font-bold text-slate-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {paginatedUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 transition-all duration-300"
                        >
                          <td className="py-3 px-3">
                            <motion.input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, user.id])
                                } else {
                                  setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                                }
                              }}
                              className="rounded border-slate-300 w-4 h-4"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                                <Avatar className="w-10 h-10 ring-2 ring-white/60 shadow-lg">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white font-bold text-sm">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                              <div>
                                <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                                <div className="text-xs text-slate-500">Last: {user.lastActive}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                <Mail size={12} className="text-slate-500" />
                                <span className="truncate max-w-[150px]">{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Calendar size={10} />
                                {new Date(user.joinDate).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <motion.div
                              className="flex items-center gap-2 bg-gradient-to-r from-pink-50 to-rose-100 rounded-xl px-3 py-2 border border-pink-200"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Heart size={12} className="text-pink-600" />
                              <span className="font-bold text-slate-800 text-sm">
                                {user.totalLikes.toLocaleString()}
                              </span>
                            </motion.div>
                          </td>
                          <td className="py-3 px-3">
                            <motion.div
                              className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-100 rounded-xl px-3 py-2 border border-blue-200"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <MessageSquare size={12} className="text-blue-600" />
                              <span className="font-bold text-slate-800 text-sm">
                                {user.totalComments.toLocaleString()}
                              </span>
                            </motion.div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-xl px-3 py-2 text-center border border-purple-200">
                              <span className="font-bold text-slate-800 text-sm">{user.totalPosts}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                              <Badge
                                variant={
                                  user.status === "active"
                                    ? "default"
                                    : user.status === "inactive"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="capitalize font-bold text-xs px-3 py-1"
                              >
                                {user.status}
                              </Badge>
                            </motion.div>
                          </td>
                          <td className="py-3 px-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-slate-100 rounded-full h-8 w-8"
                                  >
                                    <MoreHorizontal size={16} />
                                  </Button>
                                </motion.div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, "view")}>
                                  <Eye size={14} className="mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, "message")}>
                                  <Mail size={14} className="mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                {user.status === "active" ? (
                                  <DropdownMenuItem onClick={() => handleUserAction(user.id, "deactivate")}>
                                    <UserX size={14} className="mr-2" />
                                    Deactivate
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleUserAction(user.id, "activate")}>
                                    <UserCheck size={14} className="mr-2" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => handleUserAction(user.id, "ban")}
                                  className="text-red-600"
                                >
                                  <Ban size={14} className="mr-2" />
                                  Ban User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Pagination with Black Background */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 md:p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-xs md:text-sm text-slate-600 font-medium">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-black text-white border-black hover:bg-gray-800 font-semibold px-3 h-8 text-xs"
                  >
                    Previous
                  </Button>
                </motion.div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <motion.div
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 p-0 text-xs font-bold ${
                            currentPage === page
                              ? "bg-black text-white border-black"
                              : "bg-black text-white border-black hover:bg-gray-800"
                          }`}
                        >
                          {page}
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-black text-white border-black hover:bg-gray-800 font-semibold px-3 h-8 text-xs"
                  >
                    Next
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
