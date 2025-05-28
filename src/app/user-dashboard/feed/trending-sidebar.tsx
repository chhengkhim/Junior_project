"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, TrendingUp, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import user from "@/assets/user.jpg"
import logo8 from "@/assets/logo8.png"

export default function TrendingSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("trending")

  // Enable independent scrolling only when hovering over the sidebar
  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const handleMouseEnter = () => {
      sidebar.style.overflowY = "auto"
    }

    const handleMouseLeave = () => {
      sidebar.style.overflowY = "hidden"
    }

    sidebar.addEventListener("mouseenter", handleMouseEnter)
    sidebar.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      sidebar.removeEventListener("mouseenter", handleMouseEnter)
      sidebar.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={sidebarRef} className="h-[calc(100vh-100px)] custom-scrollbar pr-2 sidebar">
      <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="trending">
            <TrendingUp className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Trending</span>
          </TabsTrigger>
          <TabsTrigger value="events">
            <CalendarDays className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="news">
            <Newspaper className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">News</span>
          </TabsTrigger>
        </TabsList>

        {/* Trending Topics */}
        <TabsContent value="trending" className="space-y-4">
          <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-[#1d2b7d]">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-400 font-medium mr-3">{index + 1}</span>
                      <div>
                        <Link href="#" className="font-medium hover:text-[#1d2b7d] transition-colors">
                          #{topic.tag}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{topic.posts} posts</p>
                      </div>
                    </div>
                    <TrendingUp className={`h-4 w-4 ${index < 3 ? "text-green-500" : "text-gray-400"}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-[#1d2b7d]">Who to Follow</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {whoToFollow.map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={person.avatar || user.src}
                        alt={person.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-xs text-gray-500">{person.username}</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events */}
        <TabsContent value="events" className="space-y-4">
          <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-[#1d2b7d]">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {events.map((event, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="relative aspect-[16/9] mb-3 overflow-hidden rounded-md">
                      <Image
                        src={user.src}
                        alt={event.title}
                        width={300}
                        height={169}
                        className="object-cover w-full transition-transform hover:scale-105 duration-300"
                      />
                      <Badge className="absolute top-2 right-2 bg-[#1d2b7d]">{event.type}</Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {event.date}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{event.description}</p>
                    <Button className="w-full bg-[#1d2b7d] hover:bg-[#1d2b7d]/90 text-white">Interested</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* News */}
        <TabsContent value="news" className="space-y-4">
          <Card className="shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-lg font-semibold text-[#1d2b7d]">Campus News</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {news.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    {item.image && (
                      <div className="relative aspect-[16/9] mb-3 overflow-hidden rounded-md">
                        <Image
                          src={logo8.src}
                          alt={item.title}
                          width={300}
                          height={169}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      {item.source} • {item.date}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.summary}</p>
                    <Button variant="link" className="px-0 text-[#1d2b7d] mt-1">
                      Read more
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const trendingTopics = [
  { tag: "examweek", posts: 128 },
  { tag: "campuslife", posts: 95 },
  { tag: "dormstories", posts: 87 },
  { tag: "professorquotes", posts: 76 },
  { tag: "studyabroad", posts: 62 },
]

const whoToFollow = [
  { name: "Jane Smith", username: "@janesmith", avatar: user.src },
  { name: "Robert Chen", username: "@robertchen", avatar: user.src },
  { name: "Priya Patel", username: "@priyapatel", avatar: user.src },
]

const events = [
  {
    title: "Spring Festival",
    date: "May 20, 2023",
    type: "Social",
    description: "Annual spring celebration with music, food, and activities on the main campus.",
    image: "/placeholder.svg?height=169&width=300",
  },
  {
    title: "Career Fair",
    date: "June 5, 2023",
    type: "Career",
    description: "Connect with top employers and explore internship and job opportunities.",
    image: "/placeholder.svg?height=169&width=300",
  },
  {
    title: "Tech Hackathon",
    date: "June 12, 2023",
    type: "Academic",
    description: "24-hour coding competition with prizes for the most innovative solutions.",
    image: "/placeholder.svg?height=169&width=300",
  },
]

const news = [
  {
    title: "University Announces New Research Grant",
    date: "May 15, 2023",
    source: "Campus News",
    summary: "The university has received a $5 million grant to fund research in renewable energy technologies.",
    image: "/placeholder.svg?height=169&width=300",
  },
  {
    title: "Library Hours Extended During Finals Week",
    date: "May 12, 2023",
    source: "Student Services",
    summary: "The main library will remain open 24/7 during the final examination period to accommodate student needs.",
    image: "/placeholder.svg?height=169&width=300",
  },
  {
    title: "Basketball Team Advances to Championships",
    date: "May 10, 2023",
    source: "Athletics Department",
    summary: "Our university basketball team has advanced to the national championships after a thrilling victory.",
    image: "/placeholder.svg?height=169&width=300",
  },
]
