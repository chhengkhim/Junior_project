"use client"

import { motion } from "framer-motion"
import { Download, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ResourceCardProps {
  resource: {
    title: string
    description: string
    image: string
    category: string
    downloadUrl: string
    delay: number
  }
  isVisible: boolean
}

export default function ResourceCard({ resource, isVisible }: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: resource.delay + 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full transform transition-all duration-300 group-hover:shadow-md">
        <div className="relative h-48">
          <Image
            src={resource.image || "/placeholder.svg"}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded text-xs font-medium">
              {resource.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#1d2b7d] transition-colors">
            {resource.title}
          </h3>
          <p className="text-slate-600 text-sm mb-4">{resource.description}</p>
          <div className="flex justify-between items-center">
            <Link href="#" className="text-[#1d2b7d] font-medium text-sm flex items-center hover:underline">
              Read Article
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <motion.a
              href={resource.downloadUrl}
              download
              className="text-slate-500 hover:text-[#1d2b7d] transition-colors p-2 rounded-full hover:bg-slate-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
