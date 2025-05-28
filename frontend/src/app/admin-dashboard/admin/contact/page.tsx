"use client"

import { useState, useMemo } from "react"
import { Search, Calendar, TrendingUp, Users, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageTable } from "./message-table"
import { MessageCards } from "./message-cards"
import { MessageDetail } from "./message-detail"
import { mockMessages } from "./lib/mock-data"
import { filterMessages, sortMessages } from "./lib/utils"
import type { Message, ViewMode, SortOption } from "./types/message"
import Image from "next/image"
import user from "@/assets/admin.png"
import { TypingAnimation } from "@/components/magicui/typing-animation"


export default function ContactAdminDashboard() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("table")

  // Filter and sort messages
  const filteredAndSortedMessages = useMemo(() => {
    const filtered = filterMessages(messages, searchQuery, statusFilter)
    return sortMessages(filtered, sortBy)
  }, [messages, searchQuery, statusFilter, sortBy])

  const updateMessageStatus = (messageId: number, newStatus: Message["status"]) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg)))

    if (selectedMessage?.id === messageId) {
      setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    read: messages.filter((m) => m.status === "read").length,
    resolved: messages.filter((m) => m.status === "resolved").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 rounded-2xl shadow-lg border bg-white/80 backdrop-blur-xl border-white/20 text-slate-900">
              <div className="p-2 bg-black rounded-xl shadow-lg">
                <div className="p-2 bg-black rounded-xl shadow-lg">
                  <Image
                    src={user}
                    alt="Admin Icon"
                    width={30}
                    height={30}
                    className="h-7 w-7 sm:h-6 sm:w-6"
                  />
                </div>
              </div>
              <TypingAnimation className="text-xl sm:text-2xl font-bold bg-black bg-clip-text text-transparent">
                Contact Management
              </TypingAnimation>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
            Manage customer contact form submissions efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-xl shadow-slate-200/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.total}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-xl shadow-slate-200/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.unread}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-xl shadow-slate-200/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.read}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600">Read</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-xl bg-white/70 backdrop-blur-xl shadow-slate-200/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.resolved}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-xl shadow-slate-200/50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search messages, senders, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-0 shadow-lg focus:shadow-xl transition-all duration-500 rounded-xl bg-white/80 text-slate-900 placeholder:text-slate-500 focus:bg-white"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40 h-12 border-0 shadow-lg rounded-xl bg-white/80 text-slate-900">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-full sm:w-40 h-12 border-0 shadow-lg rounded-xl bg-white/80 text-slate-900">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Tabs
                  value={viewMode}
                  onValueChange={(value) => setViewMode(value as ViewMode)}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="w-full sm:w-auto h-12 border-0 shadow-lg rounded-xl bg-white/80">
                    <TabsTrigger
                      value="table"
                      className="flex-1 sm:flex-none px-6 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-black data-[state=active]:to-black data-[state=active]:text-white text-slate-700"
                    >
                      Table
                    </TabsTrigger>
                    <TabsTrigger
                      value="cards"
                      className="flex-1 sm:flex-none px-6 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-black data-[state=active]:to-black data-[state=active]:text-white text-slate-700"
                    >
                      Cards
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <Card className="border-0 shadow-xl overflow-hidden bg-white/70 backdrop-blur-xl shadow-slate-200/50">
          <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50/50 border-slate-200/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg sm:text-xl font-semibold text-slate-900">
                Messages ({filteredAndSortedMessages.length})
              </CardTitle>
              {stats.unread > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
                  {stats.unread} unread
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[70vh] overflow-hidden">
              {viewMode === "table" ? (
                <MessageTable
                  messages={filteredAndSortedMessages}
                  onMessageSelect={setSelectedMessage}
                  onStatusUpdate={(messageId: number, status: "unread" | "read" | "resolved") =>
                    updateMessageStatus(messageId, status)
                  }
                />
              ) : (
                <MessageCards messages={filteredAndSortedMessages} onMessageSelect={setSelectedMessage} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail Dialog */}
        <MessageDetail
          message={selectedMessage}
          open={!!selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onStatusUpdate={(messageId: number, status: Message["status"]) => updateMessageStatus(messageId, status)}
        />
      </div>
    </div>
  )
}
