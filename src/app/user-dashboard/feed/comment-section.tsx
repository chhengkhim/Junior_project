"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

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

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  isExpanded: boolean
  onToggleExpand: () => void
  onAddComment: (postId: string, comment: Comment) => void
  onEditComment: (postId: string, commentId: string, newContent: string) => void
  onDeleteComment: (postId: string, commentId: string) => void
  onLikeComment: (postId: string, commentId: string) => void
  onAddReply: (postId: string, commentId: string, reply: Reply) => void
  onEditReply: (postId: string, commentId: string, replyId: string, newContent: string) => void
  onDeleteReply: (postId: string, commentId: string, replyId: string) => void
  onLikeReply: (postId: string, commentId: string, replyId: string) => void
  formatTimestamp: (timestamp: string) => string
}

export default function CommentSection({
  postId,
  comments,
  isExpanded,
  onToggleExpand,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onAddReply,
  onEditReply,
  onDeleteReply,
  onLikeReply,
  formatTimestamp,
}: CommentSectionProps) {
  const [newCommentText, setNewCommentText] = useState("")
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null)
  const [editReplyText, setEditReplyText] = useState("")
  const [editingCommentIdForReply, setEditingCommentIdForReply] = useState<string | null>(null)
  const [collapsedComments, setCollapsedComments] = useState<Record<string, boolean>>({})

  const commentInputRef = useRef<HTMLInputElement>(null)
  const editInputRef = useRef<HTMLTextAreaElement>(null)
  const replyInputRef = useRef<HTMLInputElement>(null)
  const editReplyInputRef = useRef<HTMLTextAreaElement>(null)

  // Focus the edit input when editing starts
  useEffect(() => {
    if (editingCommentId && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingCommentId])

  // Focus the reply input when replying starts
  useEffect(() => {
    if (replyingToCommentId && replyInputRef.current) {
      replyInputRef.current.focus()
    }
  }, [replyingToCommentId])

  // Focus the edit reply input when editing a reply
  useEffect(() => {
    if (editingReplyId && editReplyInputRef.current) {
      editReplyInputRef.current.focus()
    }
  }, [editingReplyId])

  const handleAddComment = () => {
    if (!newCommentText.trim()) return

    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: "Anonymous User",
      username: "@anonymous",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newCommentText,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    }

    onAddComment(postId, newComment)
    setNewCommentText("")
  }

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditText(comment.content)
  }

  const cancelEditing = () => {
    setEditingCommentId(null)
    setEditText("")
  }

  const saveEdit = (commentId: string) => {
    if (!editText.trim()) return
    onEditComment(postId, commentId, editText)
    setEditingCommentId(null)
  }

  const startReplying = (commentId: string) => {
    setReplyingToCommentId(commentId)
    setReplyText("")
  }

  const cancelReplying = () => {
    setReplyingToCommentId(null)
    setReplyText("")
  }

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return

    const newReply: Reply = {
      id: `r${Date.now()}`,
      user: "Anonymous User",
      username: "@anonymous",
      avatar: "/placeholder.svg?height=40&width=40",
      content: replyText,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }

    onAddReply(postId, commentId, newReply)
    setReplyingToCommentId(null)
    setReplyText("")
  }

  const startEditingReply = (commentId: string, reply: Reply) => {
    setEditingReplyId(reply.id)
    setEditingCommentIdForReply(commentId)
    setEditReplyText(reply.content)
  }

  const cancelEditingReply = () => {
    setEditingReplyId(null)
    setEditingCommentIdForReply(null)
    setEditReplyText("")
  }

  const saveReplyEdit = (commentId: string, replyId: string) => {
    if (!editReplyText.trim()) return
    onEditReply(postId, commentId, replyId, editReplyText)
    setEditingReplyId(null)
    setEditingCommentIdForReply(null)
  }

  const toggleCommentCollapse = (commentId: string) => {
    setCollapsedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="px-4 py-3">
        <h3 className="text-base font-medium mb-3">Comments</h3>

        <div className="space-y-4">
          {comments.slice(0, isExpanded ? undefined : 2).map((comment) => (
            <div key={comment.id} className="animate-fadeIn">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2 animate-fadeIn">
                      <Textarea
                        ref={editInputRef}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white"
                          onClick={() => saveEdit(comment.id)}
                        >
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer"
                        onClick={() => toggleCommentCollapse(comment.id)}
                      >
                        <div className="flex items-center">
                          <span className="font-semibold">{comment.user}</span>
                          <span className="text-xs text-gray-500 ml-1">{comment.username}</span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>

                      <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4">
                        <span>{formatTimestamp(comment.timestamp)}</span>

                        <button
                          className={cn(
                            "flex items-center space-x-1 hover:text-gray-700 transition-colors",
                            comment.isLiked && "text-[#1d2b7d] font-medium",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            onLikeComment(postId, comment.id)
                          }}
                        >
                          <span>Like</span>
                          {comment.likes > 0 && <span>· {comment.likes}</span>}
                        </button>

                        <button
                          className="hover:text-gray-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            startReplying(comment.id)
                          }}
                        >
                          Reply
                        </button>

                        <div className="ml-auto">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                className="hover:text-gray-700 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  startEditing(comment)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDeleteComment(postId, comment.id)
                                }}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Only show replies and reply input if not collapsed */}
                  {!collapsedComments[comment.id] && (
                    <>
                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-2 space-y-3 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-3 animate-fadeIn">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.user} />
                                <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                {editingReplyId === reply.id && editingCommentIdForReply === comment.id ? (
                                  <div className="space-y-2 animate-fadeIn">
                                    <Textarea
                                      ref={editReplyInputRef}
                                      value={editReplyText}
                                      onChange={(e) => setEditReplyText(e.target.value)}
                                      className="min-h-[60px] text-sm"
                                    />
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white"
                                        onClick={() => saveReplyEdit(comment.id, reply.id)}
                                      >
                                        Save
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={cancelEditingReply}>
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2">
                                      <div className="flex items-center">
                                        <span className="font-semibold">{reply.user}</span>
                                        <span className="text-xs text-gray-500 ml-1">{reply.username}</span>
                                      </div>
                                      <p className="text-sm mt-1">{reply.content}</p>
                                    </div>

                                    <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4">
                                      <span>{formatTimestamp(reply.timestamp)}</span>

                                      <button
                                        className={cn(
                                          "flex items-center space-x-1 hover:text-gray-700 transition-colors",
                                          reply.isLiked && "text-[#1d2b7d] font-medium",
                                        )}
                                        onClick={() => onLikeReply(postId, comment.id, reply.id)}
                                      >
                                        <span>Like</span>
                                        {reply.likes > 0 && <span>· {reply.likes}</span>}
                                      </button>

                                      <div className="ml-auto">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button className="hover:text-gray-700 transition-colors">
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end" className="w-[160px]">
                                            <DropdownMenuItem onClick={() => startEditingReply(comment.id, reply)}>
                                              <Pencil className="h-4 w-4 mr-2" />
                                              Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => onDeleteReply(postId, comment.id, reply.id)}
                                              className="text-red-500 focus:text-red-500"
                                            >
                                              <Trash2 className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      {replyingToCommentId === comment.id && (
                        <div className="mt-2 flex items-center space-x-2 pl-6 animate-slideDown">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex items-center space-x-2">
                            <Input
                              ref={replyInputRef}
                              placeholder="Write a reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-full h-9"
                            />
                            <div className="flex space-x-1">
                              <Button
                                size="icon"
                                className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white rounded-full h-9 w-9"
                                onClick={() => handleAddReply(comment.id)}
                                disabled={!replyText.trim()}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full h-9 w-9"
                                onClick={cancelReplying}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {comments.length > 2 && !isExpanded && (
          <Button
            variant="link"
            size="sm"
            className="px-0 mt-2 text-[#1d2b7d] dark:text-[#4a5dc7]"
            onClick={onToggleExpand}
          >
            View all {comments.length} comments
          </Button>
        )}

        <div className="mt-4 flex items-center space-x-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-1 flex items-center space-x-2">
            <Input
              ref={commentInputRef}
              placeholder="Write a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-full h-9"
            />
            <Button
              size="icon"
              className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white rounded-full h-9 w-9"
              onClick={handleAddComment}
              disabled={!newCommentText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
