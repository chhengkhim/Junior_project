"use client"

import { Calendar, Archive, Star, User } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Message } from "./types/message"
import { STATUS_COLORS } from "./lib/constants"
import { formatDate, getInitials } from "./lib/utils"

type MessageStatus = "unread" | "read" | "resolved";

interface MessageDetailProps {
  message: Message | null;
  open: boolean;
  onClose: () => void;
  onStatusUpdate: (messageId: number, status: MessageStatus) => void;
}

export function MessageDetail({ message, open, onClose, onStatusUpdate }: MessageDetailProps) {
  if (!message) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-0 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-xl">
        <DialogHeader className="border-b pb-6 rounded-t-2xl border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/30">
          <div className="flex items-start justify-between p-6">
            <div className="space-y-3">
              <DialogTitle className="text-xl sm:text-2xl font-bold pr-8 text-slate-900">{message.subject}</DialogTitle>
              <DialogDescription className="flex items-center gap-4">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 shadow-lg ring-white">
                  <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white">
                    {getInitials(message.senderName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold text-slate-700">{message.senderName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{message.senderEmail}</span>
                </div>
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${STATUS_COLORS[message.status]} font-semibold shadow-lg`}>{message.status}</Badge>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Message Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm rounded-lg p-3 bg-slate-50 text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Received {formatDate(message.receivedDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Contact Form Submission</span>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <div className="rounded-lg p-6 border bg-gradient-to-r from-slate-50 to-white border-slate-200 text-slate-700">
                  <p className="whitespace-pre-wrap leading-relaxed">{message.message}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Separator className="bg-slate-200" />
              <div className="flex flex-wrap gap-3">
                <Select value={message.status} onValueChange={(value) => onStatusUpdate(message.id, value as MessageStatus)}>
                  <SelectTrigger className="w-40 bg-white border-slate-200 text-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-white border-slate-200 text-slate-900">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" className="bg-white border-slate-200 text-slate-900">
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
