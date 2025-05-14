import type { Metadata } from "next"
import SocialFeed from "./social-feed"
import TrendingSidebar from "./trending-sidebar"

export const metadata: Metadata = {
  title: "Anonymous Social Feed",
  description: "Share your thoughts and images anonymously",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Social Feed</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <SocialFeed />
          </div>

          <div className="hidden lg:block lg:col-span-4 sticky top-6 self-start max-h-[calc(100vh-100px)] overflow-hidden">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
