"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import Image from "next/image"

interface DownloadableResourceProps {
  resource: {
    title: string
    description: string
    fileSize: string
    fileType: string
    downloadUrl: string
    icon: string
    delay: number
  }
  isVisible: boolean
}

export default function DownloadableResource({ resource, isVisible }: DownloadableResourceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: resource.delay + 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="border border-slate-100 rounded-lg p-4 hover:border-[#1d2b7d]/20 hover:bg-slate-50 transition-all"
    >
      <div className="flex items-start">
        <div className="mr-4 relative w-12 h-12">
          <Image
            src={resource.icon || "/placeholder.svg"}
            alt={resource.fileType}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-slate-900">{resource.title}</h4>
          <p className="text-slate-600 text-sm">{resource.description}</p>
          <div className="flex items-center mt-2 text-xs text-slate-500">
            <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-slate-600 mr-2">
              {resource.fileType}
            </span>
            <span>{resource.fileSize}</span>
          </div>
        </div>
        <motion.a
          href={resource.downloadUrl}
          download
          className="bg-[#1d2b7d]/10 hover:bg-[#1d2b7d]/20 text-[#1d2b7d] p-2 rounded-lg transition-colors flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-5 w-5" />
        </motion.a>
      </div>
    </motion.div>
  )
}
