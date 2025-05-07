"use client";

import Image from "next/image";
import logo8 from "@/assets/logo8.png";
import type React from "react"
import TrendingPost from "./trending-post"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-50">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendingPost />
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
            Comments
            <span className="text-sm font-normal text-gray-500 hover:underline cursor-pointer">See all</span>
          </h2>
          <div className="space-y-4">
            <CommentCard
              name="Sarah Johnson"
              time="2 hours ago"
              comment="This is such an insightful post! I've been thinking about this topic a lot lately."
              likes={24}
            />
            <CommentCard
              name="Michael Chen"
              time="3 hours ago"
              comment="Great points! I'd love to discuss this further sometime."
              likes={18}
            />
            <CommentCard
              name="Priya Patel"
              time="5 hours ago"
              comment="I completely agree with your perspective. The coffee shop you mentioned is one of my favorites too!"
              likes={32}
            />
            <CommentCard
              name="James Wilson"
              time="6 hours ago"
              comment="This resonates with me so much. Thanks for sharing your thoughts on this!"
              likes={15}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

interface CommentCardProps {
  name: string
  time: string
  comment: string
  likes: number
}

function CommentCard({ name, time, comment, likes }: CommentCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <Image src={logo8} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-2">{comment}</p>
      <div className="flex items-center text-gray-500 text-sm">
        <button className="flex items-center gap-1 hover:text-rose-500 transition-colors duration-200">
          <HeartIcon className="w-4 h-4" />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
