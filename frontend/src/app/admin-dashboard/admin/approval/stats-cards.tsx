"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Clock, CheckCircle, Users } from "lucide-react"
import { useEffect, useState } from "react"
import type { ConfessionStats } from "./types/confession"

interface StatsCardsProps {
  stats: ConfessionStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const [animatedValues, setAnimatedValues] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    totalUsers: 0,
  })

  const [animatedPercentages, setAnimatedPercentages] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    totalUsers: 0,
  })

  useEffect(() => {
    const duration = 2500 // 2.5 seconds for smoother animation
    const steps = 100 // More steps for smoother counting
    const stepDuration = duration / steps

    const targetPercentages = {
      total: stats.total > 0 ? Math.round((stats.total / (stats.total || 1)) * 100) : 0,
      pending: stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0,
      approved: stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0,
      totalUsers: 100, // Always 100% for total users
    }

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / steps, 1) // Ensure we don't exceed 1

      // Use easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setAnimatedValues({
        total: Math.round(stats.total * easeOutQuart),
        pending: Math.round(stats.pending * easeOutQuart),
        approved: Math.round(stats.approved * easeOutQuart),
        totalUsers: Math.round(stats.totalUsers * easeOutQuart),
      })

      setAnimatedPercentages({
        total: Math.round(targetPercentages.total * easeOutQuart),
        pending: Math.round(targetPercentages.pending * easeOutQuart),
        approved: Math.round(targetPercentages.approved * easeOutQuart),
        totalUsers: Math.round(targetPercentages.totalUsers * easeOutQuart),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValues(stats)
        setAnimatedPercentages(targetPercentages)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [stats])

  const cards = [
    {
      title: "Total Confessions",
      value: animatedValues.total,
      percentage: animatedPercentages.total,
      subtitle: `Confessions this week: ${Math.floor(stats.total * 0.3)}`,
      icon: MessageSquare,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      progressColor: "stroke-blue-500",
      delay: "0ms",
    },
    {
      title: "Pending Review",
      value: animatedValues.pending,
      percentage: animatedPercentages.pending,
      subtitle: `Awaiting review: ${stats.pending}`,
      icon: Clock,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      progressColor: "stroke-orange-500",
      delay: "200ms",
    },
    {
      title: "Approved",
      value: animatedValues.approved,
      percentage: animatedPercentages.approved,
      subtitle: `Approved this week: ${Math.floor(stats.approved * 0.8)}`,
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      progressColor: "stroke-green-500",
      delay: "400ms",
    },
    {
      title: "Total Users",
      value: animatedValues.totalUsers,
      percentage: animatedPercentages.totalUsers,
      subtitle: `Active users: ${Math.floor(stats.totalUsers * 0.7)}`,
      icon: Users,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      progressColor: "stroke-purple-500",
      delay: "600ms",
    },
  ]

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        const circumference = 2 * Math.PI * 16 // radius = 16
        const strokeDasharray = circumference
        const strokeDashoffset = circumference - (card.percentage / 100) * circumference

        return (
          <Card
            key={card.title}
            className="relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 animate-slide-up group"
            style={{ animationDelay: card.delay }}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {/* Icon and Percentage */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${card.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.iconColor}`} />
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          className={card.progressColor}
                          strokeWidth="2"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          style={{
                            transition: "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-bold ${card.iconColor} transition-all duration-300`}>
                          {card.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title and Value */}
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">{card.value}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                </div>
              </div>
            </CardContent>

            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
          </Card>
        )
      })}
    </div>
  )
}
