"use client";

import { BellRing, ChevronDown, Menu, X, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import logolight from "@/assets/logo8.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypingAnimation } from "./magicui/typing-animation";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  // Remove scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen, isMobile]);

  const logoSrc = logolight;

  return (
    <>
      <header className="sticky top-4 z-50 flex h-16 items-center border-b md:ml-[16.5rem] mx-4 bg-white px-4 shadow-md shadow-[#212121]/20 rounded-2xl">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
            <Button
              variant="ghost"
              size="icon"
              className="bg-white text-[#1D1D1D] rounded-full relative"
            >
              <BellRing className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="flex items-center gap-2 px-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden sm:inline-block">
                      Pisethsambo Phok
                    </span>
                    <Avatar className="h-8 w-8 border-2 border-indigo-100">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#FFF] text-[#1D1D1D] border-white"
              >
                <DropdownMenuItem
                  asChild
                  className="focus:bg-[#1d2b7d] focus:text-white"
                >
                  <Link href="/profile">
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="flex items-center justify-between focus:bg-[#1d2b7d] focus:text-white">
                  <span>Lang: English</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuItem>
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
      <div className="fixed left-0 top-0 bottom-0 w-64 hidden md:block overflow-hidden">
        <Sidebar logoSrc={logoSrc.src} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden overflow-hidden">
          <Sidebar
            onItemClick={() => setIsSidebarOpen(false)}
            logoSrc={logoSrc.src}
          />
        </div>
      )}
    </>
  );
}