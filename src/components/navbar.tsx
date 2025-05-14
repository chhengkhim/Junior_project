"use client"

import { BellRing, ChevronDown, BookOpen } from 'lucide-react'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import logolight from "@/assets/logo8.png"
import logodark from "@/assets/logo9.png"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TypingAnimation } from "./magicui/typing-animation"
//import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  const { theme, systemTheme } = useTheme() //, setTheme
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  // Remove scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isSidebarOpen, isMobile])
  
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? systemTheme : theme

  if (!mounted) return null // Prevents mismatch during SSR

  const logoSrc = currentTheme === "dark" ? logodark : logolight
  
  // Only close sidebar when X button is clicked
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 right-0 z-50 h-16 md:left-64 left-0 bg-white dark:bg-gray-900 px-4 shadow-md shadow-[#212121]/20 rounded-2xl mx-4 mt-4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden relative z-10 transition-transform duration-300 ease-in-out"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'opacity-0' : 'opacity-100'} top-3`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isSidebarOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'}`}></span>
              </div>
            </Button>

            <div className="flex items-center gap-2">
              {isMobile && (
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-15 w-auto"
                  priority
                />
              )}
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#1d2b7d] hidden md:block" />
                <TypingAnimation className="text-lg font-bold text-[#1d2b7d] hidden md:inline-block uppercase">
                  MindSpeak Uniconfess
                </TypingAnimation>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="bg-white text-[#1D1D1D] rounded-full relative">
              <BellRing className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="flex items-center gap-2 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden sm:inline-block">Pisethsambo Phok</span>
                    <Avatar className="h-8 w-8 border-2 border-indigo-100">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#FFF] text-[#1D1D1D] border-white">
                <DropdownMenuItem asChild className="focus:bg-[#1d2b7d] focus:text-white">
                  <Link href="/profile">
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="flex items-center justify-between focus:bg-[#1d2b7d] focus:text-white">
                  <span>Lang: English</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuItem>
                {/* Darkmode
                <DropdownMenuItem className="flex items-center justify-between focus:bg-[#1d2b7d] focus:text-white">
                  <span>Dark Mode</span>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </DropdownMenuItem>
                */}
                <DropdownMenuSeparator className="bg-white" />
                <DropdownMenuItem className="focus:bg-[#1d2b7d] focus:text-white">
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 hidden md:block z-40">
        <Sidebar logoSrc={logoSrc.src} />
      </div>

      {/* Mobile Sidebar Overlay with animation */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={handleCloseSidebar}
      />

      {/* Mobile Sidebar with animation */}
      <div 
        className={`fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          logoSrc={logoSrc.src}
          isMobile={true}
          isOpen={true}
          onToggle={handleCloseSidebar}
        />
      </div>
    </>
  )
}
