"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import user from "@/assets/user.jpg"
import logo from "@/assets/logo8.png"

export default function CrisisCenters() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("crisis-centers")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const centers = [
    {
      name: "Khmer-Soviet Friendship Hospital",
      address: "St 271, Phnom Penh",
      phone: "023 883 710",
      image: logo,
      delay: 0,
    },
    {
      name: "Calmette Hospital",
      address: "3 Monivong Blvd (93), Phnom Penh",
      phone: "023 426 948",
      image: logo,
      delay: 0.1,
    },
    {
      name: "TPO Cambodia",
      address: "#2&4, Corner of St 494 & 497, Sangkat Phsar Deum Thkov, Khan Chamkarmon, Phnom Penh",
      phone: "023 63 66 991 / 023 63 66 992",
      image: logo,
      delay: 0.2,
    },
    {
      name: "Mental Health Support Center",
      address: "Phnom Penh",
      phone: "023 XXX XXX",
      image: logo,
      delay: 0.3,
    },
  ]

  return (
    <div id="crisis-centers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {centers.map((center, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: center.delay }}
          className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
        >
          <div className="relative h-48">
            <Image
              src={center.image || user.src}
              alt={center.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d2b7d]/90 to-transparent" />
          </div>

          <div className="p-5">
            <h3 className="font-bold text-lg text-[#1d2b7d] mb-3">{center.name}</h3>
            <div className="flex items-start mb-2 text-sm text-slate-600">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#1d2b7d]" />
              <span>{center.address}</span>
            </div>
            <div className="flex items-center mb-4 text-sm text-slate-600">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-[#1d2b7d]" />
              <span>{center.phone}</span>
            </div>
            <button className="w-full py-2 border border-[#1d2b7d] text-[#1d2b7d] rounded-lg hover:bg-[#1d2b7d]/5 transition-colors flex items-center justify-center">
              <span>Get Directions</span>
              <ExternalLink className="ml-2 h-3 w-3" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
