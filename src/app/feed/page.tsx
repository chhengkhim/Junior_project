"use client"

import Image from "next/image"
import profile from "@/assets/user.jpg"
import { motion } from "framer-motion"
import SocialFeed from "./social-feed"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] w-auto">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column - Social Feed (spans 2 columns on larger screens) */}
          <div className="md:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Feed</h2>
              <SocialFeed />
            </motion.div>
          </div>

          {/* Right Column - Map and Trending */}
          <div className="space-y-4 sticky top-4 h-fit">
            {/* Map Section */}
            <motion.div
              className="bg-white rounded-2xl shadow p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg text-center text-[#1d2b7d] font-bold mb-4">
                Paragon International University
              </h2>
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.573492944942!2d104.89540667544009!3d11.582402688619704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517bf7757d23%3A0x965c34888684bf1!2sParagon%20International%20University!5e0!3m2!1sen!2skh!4v1746371390273!5m2!1sen!2skh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Trending Section */}
            <motion.div
              className="bg-white rounded-2xl shadow p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">What is trending</h2>
                <div className="flex items-center gap-4">
                  <button className="text-blue-500 text-sm">See all</button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <Image
                    src={profile || "/placeholder.svg"}
                    alt="US Flag"
                    width={60}
                    height={60}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 mb-1">Government</p>
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      US Federal government and 48 states file antitrust lawsuits
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <Image
                    src={profile || "/placeholder.svg"}
                    alt="Elon Musk"
                    width={60}
                    height={60}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 mb-1">Celebrities</p>
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      Elon Musk is net worth surpasses $150B amid Tesla rally
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <Image
                    src={profile || "/placeholder.svg"}
                    alt="Concert"
                    width={60}
                    height={60}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 mb-1">Trending in India</p>
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      Justin Bieber leaves India after Mumbai concert
                    </h3>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Image
                    src={profile || "/placeholder.svg"}
                    alt="Concert"
                    width={60}
                    height={60}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 mb-1">Trending in India</p>
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      Justin Bieber leaves India after Mumbai concert
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}