"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function TrendChart() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const data = [
    { day: "Mon", users: 120, confessions: 45, engagement: 78 },
    { day: "Tue", users: 145, confessions: 52, engagement: 82 },
    { day: "Wed", users: 98, confessions: 38, engagement: 65 },
    { day: "Thu", users: 167, confessions: 61, engagement: 89 },
    { day: "Fri", users: 189, confessions: 73, engagement: 95 },
    { day: "Sat", users: 134, confessions: 48, engagement: 71 },
    { day: "Sun", users: 156, confessions: 58, engagement: 84 },
  ]

  const maxUsers = Math.max(...data.map((d) => d.users))
  const maxConfessions = Math.max(...data.map((d) => d.confessions))

  const getPath = (values: number[], max: number) => {
    const points = values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100
        const y = 100 - (value / max) * 80
        return `${x},${y}`
      })
      .join(" ")
    return `M ${points}`
  }

  const userPath = getPath(
    data.map((d) => d.users),
    maxUsers,
  )
  const confessionPath = getPath(
    data.map((d) => d.confessions),
    maxConfessions,
  )

  return (
    <div className="w-full h-80 relative">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Weekly Activity Overview</h3>
          <p className="text-sm text-slate-500">User activity and confession trends</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <span className="text-sm text-slate-600">Active Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
            <span className="text-sm text-slate-600">Confessions</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-48 bg-gradient-to-br from-slate-50/50 to-blue-50/50 rounded-2xl p-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          {[0, 25, 50, 75, 100].map((y) => (
            <div key={y} className="absolute left-0 right-0 border-t border-slate-300" style={{ top: `${y}%` }} />
          ))}
          {data.map((_, index) => (
            <div
              key={index}
              className="absolute top-0 bottom-0 border-l border-slate-300"
              style={{ left: `${(index / (data.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* SVG Chart */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Area fills */}
          <defs>
            <linearGradient id="userGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
            </linearGradient>
            <linearGradient id="confessionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
            </linearGradient>
          </defs>

          {/* User area */}
          <motion.path
            d={`${userPath} L 100,100 L 0,100 Z`}
            fill="url(#userGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Confession area */}
          <motion.path
            d={`${confessionPath} L 100,100 L 0,100 Z`}
            fill="url(#confessionGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />

          {/* User line */}
          <motion.path
            d={userPath}
            stroke="url(#userLineGradient)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Confession line */}
          <motion.path
            d={confessionPath}
            stroke="url(#confessionLineGradient)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Line gradients */}
          <defs>
            <linearGradient id="userLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="confessionLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100
            const userY = 100 - (point.users / maxUsers) * 80
            const confessionY = 100 - (point.confessions / maxConfessions) * 80

            return (
              <g key={index}>
                {/* User point */}
                <motion.circle
                  cx={x}
                  cy={userY}
                  r={hoveredPoint === index ? "1.5" : "1"}
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                  whileHover={{ scale: 1.5 }}
                  onHoverStart={() => setHoveredPoint(index)}
                  onHoverEnd={() => setHoveredPoint(null)}
                  className="cursor-pointer"
                />

                {/* Confession point */}
                <motion.circle
                  cx={x}
                  cy={confessionY}
                  r={hoveredPoint === index ? "1.5" : "1"}
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.3 }}
                  whileHover={{ scale: 1.5 }}
                  onHoverStart={() => setHoveredPoint(index)}
                  onHoverEnd={() => setHoveredPoint(null)}
                  className="cursor-pointer"
                />
              </g>
            )
          })}
        </svg>

        {/* Interactive tooltips */}
        {hoveredPoint !== null && (
          <motion.div
            className="absolute bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 pointer-events-none z-10 border border-white/20"
            style={{
              left: `${(hoveredPoint / (data.length - 1)) * 100}%`,
              top: "10%",
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-semibold text-slate-800 mb-2">{data[hoveredPoint].day}</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs text-slate-600">Users: {data[hoveredPoint].users}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-slate-600">Confessions: {data[hoveredPoint].confessions}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-xs text-slate-600">Engagement: {data[hoveredPoint].engagement}%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Day labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {data.map((point, index) => (
            <motion.div
              key={index}
              className="text-xs text-slate-500 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 2 }}
            >
              {point.day}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <div className="text-2xl font-bold text-slate-800">{data.reduce((sum, d) => sum + d.users, 0)}</div>
          <div className="text-sm text-slate-600">Total Weekly Users</div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7 }}
        >
          <div className="text-2xl font-bold text-slate-800">{data.reduce((sum, d) => sum + d.confessions, 0)}</div>
          <div className="text-sm text-slate-600">Total Confessions</div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9 }}
        >
          <div className="text-2xl font-bold text-slate-800">
            {Math.round(data.reduce((sum, d) => sum + d.engagement, 0) / data.length)}%
          </div>
          <div className="text-sm text-slate-600">Avg Engagement</div>
        </motion.div>
      </div>
    </div>
  )
}
