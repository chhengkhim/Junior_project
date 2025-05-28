"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Clock, Eye, ExternalLink, MoreHorizontal, X, AlertTriangle, Ban, ImageIcon, User } from "lucide-react"
import Image from "next/image"
import type { Confession } from "./types/confession"
import { getStatusColor, getFeelingEmoji, formatDate } from "./utils/helper"

interface ConfessionCardsProps {
  confessions: Confession[]
  selectedConfessions: number[]
  onSelectionChange: (ids: number[]) => void
  onStatusChange: (id: number, status: "approved" | "rejected") => void
  onView: (confession: Confession) => void
  onWarning: (id: number, message: string) => void
  onBan: (id: number, reason: string) => void
}

export function ConfessionCards({
  confessions,
  selectedConfessions,
  onStatusChange,
  onView,
  onWarning,
  onBan,
}: ConfessionCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {confessions.map((confession, index) => {
        const dateInfo = formatDate(confession.timeConfession)
        const isSelected = selectedConfessions.includes(confession.id)

        return (
          <Card
            key={confession.id}
            className={`rounded-xl border text-card-foreground p-6 bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up overflow-hidden ${
              isSelected ? "ring-2 ring-blue-500 border-blue-300" : ""
            } ${confession.hasWarning ? "border-yellow-300" : ""} ${confession.isBanned ? "border-red-300" : ""}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              {/* Image Header */}
              {confession.image && (
                <div className="relative rounded-xl h-50 w-full overflow-hidden">
                  <Image
                    src={confession.image || "/placeholder.svg"}
                    width="400"
                    height="300"
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    alt="Confession image"
                    onClick={() => onView(confession)}
                  />
                  <div className="absolute top-3 right-3">
                    <Checkbox checked={isSelected} className="bg-white/80 border-white" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className={`${getStatusColor(confession.status)} shadow-sm`}>
                      {confession.status.charAt(0).toUpperCase() + confession.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="p-4 space-y-4">
                {/* Header without image */}
                {!confession.image && (
                  <div className="flex items-center justify-between">
                    <Checkbox checked={isSelected} />
                    <Badge className={`${getStatusColor(confession.status)} shadow-sm`}>
                      {confession.status.charAt(0).toUpperCase() + confession.status.slice(1)}
                    </Badge>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        <User className="h-5 w-5" />
                      </div>
                      {confession.hasWarning && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-2 w-2 text-white" />
                        </div>
                      )}
                      {confession.isBanned && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <Ban className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{confession.userName}</h3>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(confession)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {confession.status !== "approved" && (
                        <DropdownMenuItem
                          className="text-green-600"
                          onClick={() => onStatusChange(confession.id, "approved")}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      {confession.status !== "rejected" && (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onStatusChange(confession.id, "rejected")}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-yellow-600"
                        onClick={() => onWarning(confession.id, "Content requires review")}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Send Warning
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onBan(confession.id, "Inappropriate content")}
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 line-clamp-3">{confession.description}</p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFeelingEmoji(confession.feeling)}</span>
                    <span className="text-gray-600">{confession.feeling}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{dateInfo.relative}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {confession.image && (
                      <div className="flex items-center gap-1 text-green-600">
                        <ImageIcon className="h-3 w-3" />
                        <span className="text-xs">Image</span>
                      </div>
                    )}
                    {confession.link && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <ExternalLink className="h-3 w-3" />
                        <span className="text-xs">Link</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onView(confession)} className="text-xs px-3 py-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
