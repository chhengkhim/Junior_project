"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Download, BookOpen, ArrowRight, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ResourceCard from "./resource-card"
import DownloadableResource from "./downloadable-resource"
import { Input } from "@/components/ui/input"
import logo9 from "@/assets/logo9.png"


export default function EducationalResources() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("articles")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("educational-resources")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const resources = [
    {
      title: "Understanding Anxiety",
      description: "Learn about the symptoms, causes, and management strategies for anxiety.",
      image: "/images/anxiety.jpg",
      category: "Mental Health",
      downloadUrl: "/resources/understanding-anxiety.pdf",
      delay: 0,
    },
    {
      title: "Coping with Academic Stress",
      description: "Strategies to manage the pressures of university life and academic expectations.",
      image: "/images/academic-stress.jpg",
      category: "Stress Management",
      downloadUrl: "/resources/academic-stress.pdf",
      delay: 0.1,
    },
    {
      title: "Building Resilience",
      description: "Develop skills to bounce back from challenges and grow stronger through adversity.",
      image: "/images/resilience.jpg",
      category: "Personal Growth",
      downloadUrl: "/resources/building-resilience.pdf",
      delay: 0.2,
    },
    {
      title: "Mindfulness Practices",
      description: "Simple mindfulness techniques to reduce stress and improve mental wellbeing.",
      image: "/images/mindfulness.jpg",
      category: "Wellness",
      downloadUrl: "/resources/mindfulness-practices.pdf",
      delay: 0.3,
    },
  ]

  const downloadableResources = [
    {
      title: "Anxiety Workbook",
      description: "Interactive exercises to manage anxiety",
      fileSize: "2.4 MB",
      fileType: "PDF",
      downloadUrl: "/resources/anxiety-workbook.pdf",
      icon: "/images/pdf-icon.png",
      delay: 0,
    },
    {
      title: "Stress Management Guide",
      description: "Comprehensive guide to managing stress",
      fileSize: "3.1 MB",
      fileType: "PDF",
      downloadUrl: "/resources/stress-management.pdf",
      icon: "/images/pdf-icon.png",
      delay: 0.1,
    },
    {
      title: "Mindfulness Audio Sessions",
      description: "Guided meditation audio files",
      fileSize: "15.8 MB",
      fileType: "ZIP",
      downloadUrl: "/resources/mindfulness-audio.zip",
      icon: "/images/zip-icon.png",
      delay: 0.2,
    },
    {
      title: "Sleep Improvement Guide",
      description: "Techniques for better sleep quality",
      fileSize: "4.2 MB",
      fileType: "PDF",
      downloadUrl: "/resources/sleep-guide.pdf",
      icon: "/images/pdf-icon.png",
      delay: 0.3,
    },
  ]

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDownloads = downloadableResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div id="educational-resources" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#1d2b7d]/10 text-[#1d2b7d] rounded-full text-sm font-medium mb-4">
            RESOURCES
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d2b7d] mb-4">Educational Resources</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Learn more about mental health through these educational materials designed specifically for university
            students.
          </p>
        </motion.div>

        {/* Featured Resource Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#1d2b7d] to-[#2a3a9c] rounded-2xl overflow-hidden relative">
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
                    FEATURED RESOURCE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Mental Health Toolkit for University Students
                  </h2>
                  <p className="text-white/80 mb-6">
                    A comprehensive collection of resources, worksheets, and guides to support your mental wellbeing
                    throughout your academic journey. Developed by mental health professionals specifically for
                    university students.
                  </p>
                  <a
                    href="/resources/mental-health-toolkit.pdf"
                    download
                    className="inline-flex items-center px-6 py-3 bg-white text-[#1d2b7d] rounded-lg hover:bg-white/90 transition-colors font-medium"
                  >
                    Download Now
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
                    className="relative w-48 h-48 md:w-64 md:h-64"
                  >
                    <Image
                      src={logo9}
                      alt="Mental Health Toolkit"
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 border-slate-200 focus:border-[#1d2b7d] focus:ring-[#1d2b7d] rounded-lg"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab("articles")}
              className={`px-6 py-2 font-medium text-sm rounded-full transition-all ${
                activeTab === "articles"
                  ? "bg-[#1d2b7d] text-white shadow-sm"
                  : "text-slate-600 hover:text-[#1d2b7d] hover:bg-slate-50"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab("downloads")}
              className={`px-6 py-2 font-medium text-sm rounded-full transition-all ${
                activeTab === "downloads"
                  ? "bg-[#1d2b7d] text-white shadow-sm"
                  : "text-slate-600 hover:text-[#1d2b7d] hover:bg-slate-50"
              }`}
            >
              Downloads
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2 font-medium text-sm rounded-full transition-all ${
                activeTab === "videos"
                  ? "bg-[#1d2b7d] text-white shadow-sm"
                  : "text-slate-600 hover:text-[#1d2b7d] hover:bg-slate-50"
              }`}
            >
              Videos
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Articles Tab */}
          {activeTab === "articles" && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} isVisible={isVisible} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-slate-700 mb-2">No articles found</h3>
                  <p className="text-slate-500">Try adjusting your search terms</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Downloads Tab */}
          {activeTab === "downloads" && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#1d2b7d]" />
                  Downloadable Resources
                </h3>
                {filteredDownloads.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDownloads.map((resource, index) => (
                      <DownloadableResource key={index} resource={resource} isVisible={isVisible} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-slate-700 mb-2">No downloads found</h3>
                    <p className="text-slate-500">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden p-6"
            >
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-[#1d2b7d]" />
                Video Resources
              </h3>
              <p className="text-slate-600 mb-6">Coming soon! Video resources are currently being developed.</p>
              <div className="bg-slate-50 rounded-lg p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h4 className="text-lg font-medium text-slate-700 mb-2">Video Content Coming Soon</h4>
                <p className="text-slate-500 max-w-md mx-auto">
                  Our team is currently developing video content on mental health topics. Check back soon for updates.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="#"
            className="inline-flex items-center px-6 py-3 bg-[#1d2b7d]/10 text-[#1d2b7d] rounded-lg hover:bg-[#1d2b7d]/20 transition-colors font-medium"
          >
            View All Resources
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
