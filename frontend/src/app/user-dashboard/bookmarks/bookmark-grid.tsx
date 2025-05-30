"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion, LayoutGroup } from "framer-motion"
import { BookmarkIcon, Trash2, X, Layers, Plus, Check, AlertCircle, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BookmarkCard from "./bookmark-card"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type BookmarkItem = {
  id: string
  title: string
  description: string
  image: string
  source: "medium" | "linkedin" | "other"
  url: string
  group?: string
}

export default function BookmarkGrid() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([])
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [newGroupName, setNewGroupName] = useState("")
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info" | null
    message: string
    description?: string
  }>({ type: null, message: "" })

  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Show notification with auto-dismiss
  const showNotification = (type: "success" | "error" | "info", message: string, description?: string) => {
    setNotification({ type, message, description })

    // Clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    // Set a new timeout to clear the notification
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification({ type: null, message: "" })
    }, 3000)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
    }
  }, [])

  // Load initial bookmarks
  useEffect(() => {
    // In a real app, you would fetch from an API or local storage
    setBookmarks([
      {
        id: "1",
        title: "Why Your App Looks Better in Sketch",
        description: "Exploring rendering differences between Sketch and iOS",
        image: "/placeholder.svg?height=200&width=400",
        source: "medium",
        url: "#",
        group: "Design",
      },
      {
        id: "2",
        title: "What's the deal with Airline logos?",
        description: "Why is it so difficult to reach a consensus on the redesign of airline identities",
        image: "/placeholder.svg?height=200&width=400",
        source: "linkedin",
        url: "#",
        group: "Design",
      },
      {
        id: "3",
        title: "What's the difference between UX and UI design?",
        description: "And some tips for you to get started with both",
        image: "/placeholder.svg?height=200&width=400",
        source: "medium",
        url: "#",
      },
      {
        id: "4",
        title: "Olympic.org's 404 page deserves a gold medal",
        description: "One of the biggest moments at the opening ceremony of the Olympics",
        image: "/placeholder.svg?height=200&width=400",
        source: "linkedin",
        url: "#",
      },
      {
        id: "5",
        title: "Doing the UX",
        description: "Thoughts on describing yourself as a UX designer to peers and clients",
        image: "/placeholder.svg?height=200&width=400",
        source: "medium",
        url: "#",
        group: "UX Research",
      },
      {
        id: "6",
        title: "Crafting custom icons that balance form and function",
        description: "Successful custom icons can have a tangible effect on a platform",
        image: "/placeholder.svg?height=200&width=400",
        source: "linkedin",
        url: "#",
        group: "UX Research",
      },
    ])
  }, [])

  // Get all unique groups
  const groups = Array.from(new Set(bookmarks.map((b) => b.group).filter(Boolean) as string[]))

  const handleToggleSelect = () => {
    setIsSelecting(!isSelecting)
    setSelectedBookmarks([])
  }

  const handleSelectBookmark = (id: string) => {
    setSelectedBookmarks((prev) => (prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    const filteredBookmarks = getFilteredBookmarks()
    const allIds = filteredBookmarks.map((b) => b.id)

    if (selectedBookmarks.length === allIds.length) {
      setSelectedBookmarks([])
    } else {
      setSelectedBookmarks(allIds)
    }
  }

  const handleDeleteSelected = () => {
    const count = selectedBookmarks.length
    setBookmarks((prev) => prev.filter((bookmark) => !selectedBookmarks.includes(bookmark.id)))
    showNotification("error", `${count} bookmark${count > 1 ? "s" : ""} deleted`, "Your bookmarks have been removed")
    setSelectedBookmarks([])
    setIsSelecting(false)
  }

  const handleDeleteOne = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
    showNotification("error", "Bookmark deleted", "Your bookmark has been removed")
  }

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || selectedBookmarks.length === 0) {
      showNotification("error", "Cannot create group", "Please enter a group name and select at least one bookmark")
      return
    }

    setBookmarks((prev) =>
      prev.map((bookmark) => {
        if (selectedBookmarks.includes(bookmark.id)) {
          return { ...bookmark, group: newGroupName }
        }
        return bookmark
      }),
    )

    showNotification(
      "success",
      "Group created",
      `${selectedBookmarks.length} bookmark${selectedBookmarks.length > 1 ? "s" : ""} added to "${newGroupName}"`,
    )

    setNewGroupName("")
    setSelectedBookmarks([])
    setIsSelecting(false)
    setIsGroupDialogOpen(false)
    setActiveGroup(newGroupName)
  }

  const handleFilterByGroup = (group: string | null) => {
    setActiveGroup(group)
    setSelectedBookmarks([])
  }

  const getFilteredBookmarks = () => {
    let filtered = bookmarks

    // Filter by group
    if (activeGroup) {
      filtered = filtered.filter((b) => b.group === activeGroup)
    } else {
      // When "All" is selected, show both grouped and ungrouped bookmarks
      // If you want to show only ungrouped bookmarks when "All" is selected, uncomment the line below
      // filtered = filtered.filter((b) => !b.group)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          (b.group && b.group.toLowerCase().includes(query)),
      )
    }

    return filtered
  }

  const filteredBookmarks = getFilteredBookmarks()

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {notification.type && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="sticky top-4 z-50"
          >
            <Alert
              className={cn(
                "shadow-md border-l-4",
                notification.type === "success" &&
                  "border-l-green-500 bg-green-50 dark:bg-gray-800 dark:border-green-500",
                notification.type === "error" && "border-l-red-500 bg-red-50 dark:bg-gray-800 dark:border-red-500",
                notification.type === "info" && "border-l-blue-500 bg-blue-50 dark:bg-gray-800 dark:border-blue-500",
              )}
            >
              <div className="flex items-start">
                {notification.type === "success" && (
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                )}
                {notification.type === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" />
                )}
                <div>
                  <AlertTitle
                    className={cn(
                      notification.type === "success" && "text-green-800 dark:text-green-300",
                      notification.type === "error" && "text-red-800 dark:text-red-300",
                      notification.type === "info" && "text-blue-800 dark:text-blue-300",
                    )}
                  >
                    {notification.message}
                  </AlertTitle>
                  {notification.description && (
                    <AlertDescription
                      className={cn(
                        "text-sm",
                        notification.type === "success" && "text-green-700 dark:text-green-400",
                        notification.type === "error" && "text-red-700 dark:text-red-400",
                        notification.type === "info" && "text-blue-700 dark:text-blue-400",
                      )}
                    >
                      {notification.description}
                    </AlertDescription>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto -mr-2 h-8 w-8 rounded-full p-0"
                  onClick={() => setNotification({ type: null, message: "" })}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[300px] bg-slate-50 dark:bg-gray-700 border-slate-200 dark:border-slate-600 focus-visible:ring-[#1d2b7d]"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-end">
              {isSelecting ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAll}
                    className="border-slate-300 hover:border-slate-400 bg-green-600 hover:bg-green-800 text-white dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/70 dark:text-slate-200"
                  >
                    {selectedBookmarks.length === filteredBookmarks.length ? "Deselect All" : "Select All"}
                  </Button>
                  <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={selectedBookmarks.length === 0}
                        className="gap-1 border-slate-300 bg-yellow-500 hover:bg-yellow-600 text-white hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/70 dark:text-slate-200 disabled:opacity-50"
                      >
                        <Layers className="h-4 w-4" />
                        <span>Group</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="dark:text-slate-200">Create a new group</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="group-name" className="dark:text-slate-300">
                            Group name
                          </Label>
                          <Input
                            id="group-name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="Enter group name"
                            className="focus-visible:ring-[#1d2b7d] dark:bg-gray-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder:text-slate-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={handleCreateGroup}
                          className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 dark:bg-[#1d2b7d] text-white dark:hover:bg-[#1d2b7d]/90"
                        >
                          Create Group
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDeleteSelected}
                    disabled={selectedBookmarks.length === 0}
                    className="gap-1 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete {selectedBookmarks.length > 0 ? `(${selectedBookmarks.length})` : ""}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleToggleSelect}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleToggleSelect}
                    className="border-slate-300 hover:border-slate-400 bg-green-600 hover:bg-green-800 text-white dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/70 dark:text-slate-200"
                  >
                    Select
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    className="gap-1 bg-[#1d2b7d] text-white hover:bg-[#1d2b7d]/90 dark:bg-[#1d2b7d] dark:hover:bg-[#1d2b7d]/90"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center mt-2">
            <Badge
              variant={activeGroup === null ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                activeGroup === null
                  ? "bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white dark:bg-[#1d2b7d] dark:hover:bg-[#1d2b7d]/90"
                  : "hover:border-[#1d2b7d] hover:text-[#1d2b7d] dark:hover:border-[#1d2b7d] dark:hover:text-[#1d2b7d]",
              )}
              onClick={() => handleFilterByGroup(null)}
            >
              All
            </Badge>
            {groups.map((group) => (
              <Badge
                key={group}
                variant={activeGroup === group ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  activeGroup === group
                    ? "bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white dark:bg-[#1d2b7d] dark:hover:bg-[#1d2b7d]/90"
                    : "hover:border-[#1d2b7d] hover:text-[#1d2b7d] dark:hover:border-[#1d2b7d] dark:hover:text-[#1d2b7d]",
                )}
                onClick={() => handleFilterByGroup(group)}
              >
                {group}
              </Badge>
            ))}
            {groups.length > 0 && <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>}
            <Badge
              variant="outline"
              className="cursor-pointer transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
            >
              <SlidersHorizontal className="h-3 w-3 mr-1" />
              Filter
            </Badge>
          </div>
        </div>
      </div>

      <LayoutGroup>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                isSelecting={isSelecting}
                isSelected={selectedBookmarks.includes(bookmark.id)}
                onSelect={() => handleSelectBookmark(bookmark.id)}
                onDelete={() => handleDeleteOne(bookmark.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {filteredBookmarks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm backdrop-blur-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="bg-[#1d2b7d]/10 dark:bg-[#1d2b7d]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookmarkIcon className="h-10 w-10 text-[#1d2b7d]" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-slate-800 dark:text-slate-200">No bookmarks found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
              {searchQuery
                ? "No bookmarks match your search criteria"
                : activeGroup
                  ? `No bookmarks in the "${activeGroup}" group`
                  : "You haven't saved any bookmarks yet"}
            </p>
            <Button className="mt-6 bg-[#1d2b7d] text-white hover:bg-[#1d2b7d]/90 dark:bg-[#1d2b7d] dark:hover:bg-[#1d2b7d]/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Bookmark
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
