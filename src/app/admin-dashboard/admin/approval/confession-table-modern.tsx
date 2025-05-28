"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Check,
  Eye,
  ExternalLink,
  MoreHorizontal,
  X,
  AlertTriangle,
  Ban,
  ImageIcon,
} from "lucide-react"
import Image from "next/image"
import type { Confession } from "./types/confession"
import { getStatusColor, getFeelingEmoji, formatDate } from "./utils/helper"

interface ConfessionTableModernProps {
  confessions: Confession[]
  selectedConfessions: number[]
  onSelectionChange: (ids: number[]) => void
  onSelectAll: (checked: boolean) => void
  onStatusChange: (id: number, status: "approved" | "rejected") => void
  onView: (confession: Confession) => void
  onWarning: (id: number, message: string) => void
  onBan: (id: number, reason: string) => void
}

export function ConfessionTableModern({
  confessions,
  selectedConfessions,
  onSelectionChange,
  onSelectAll,
  onStatusChange,
  onView,
  onWarning,
  onBan,
}: ConfessionTableModernProps) {
  const allSelected = confessions.length > 0 && selectedConfessions.length === confessions.length
  const someSelected = selectedConfessions.length > 0 && selectedConfessions.length < confessions.length

  const handleSelectConfession = (id: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedConfessions, id])
    } else {
      onSelectionChange(selectedConfessions.filter((selectedId) => selectedId !== id))
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm animate-fade-in">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
              <TableHead className="w-12 px-6 py-4">
                <Checkbox
                  checked={allSelected}
                  ref={(el) => {
                    if (el instanceof HTMLInputElement) el.indeterminate = someSelected
                  }}
                  onCheckedChange={onSelectAll}
                  className="border-gray-300"
                />
              </TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">
                <div className="flex items-center gap-1">
                  User name
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4 hidden md:table-cell">Image</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4 hidden lg:table-cell">Description</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4 hidden sm:table-cell">Link</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4 hidden md:table-cell">Feeling</TableHead>
              <TableHead className="font-semibold text-gray-700 px-6 py-4 hidden lg:table-cell">Date</TableHead>
              <TableHead className="w-12 px-6 py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {confessions.map((confession, index) => {
              const dateInfo = formatDate(confession.timeConfession)
              const isSelected = selectedConfessions.includes(confession.id)

              return (
                <TableRow
                  key={confession.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 animate-slide-up ${
                    isSelected ? "bg-blue-50" : ""
                  } ${confession.hasWarning ? "bg-yellow-50" : ""} ${confession.isBanned ? "bg-red-50" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="px-6 py-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectConfession(confession.id, checked as boolean)}
                      className="border-gray-300"
                    />
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900">{confession.userName}</div>
                        <div className="text-sm text-gray-500">{confession.category}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 hidden md:table-cell">
                    {confession.image ? (
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={confession.image || "/placeholder.svg"}
                            width="48"
                            height="48"
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                            alt="Confession image"
                            onClick={() => onView(confession)}
                          />
                        </div>
                        <span className="text-sm text-green-600 font-medium">Yes</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-sm">No</span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="px-6 py-4 hidden lg:table-cell">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-700 line-clamp-2">{confession.description}</p>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 hidden sm:table-cell">
                    {confession.link ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm font-medium">Yes</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No</span>
                    )}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <Badge className={`${getStatusColor(confession.status)} text-xs font-medium px-3 py-1`}>
                      {confession.status.charAt(0).toUpperCase() + confession.status.slice(1)}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getFeelingEmoji(confession.feeling)}</span>
                      <span className="text-sm text-gray-600">{confession.feeling}</span>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 hidden lg:table-cell">
                    <div className="text-sm text-gray-600">
                      <div>{dateInfo.date}</div>
                      <div className="text-xs text-gray-400">{dateInfo.time}</div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
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
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
