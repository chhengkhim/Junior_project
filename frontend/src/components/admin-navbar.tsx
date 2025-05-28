"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Menu,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/admin.png";
import { TypingAnimation } from "./magicui/typing-animation";

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
  sidebarCollapsed: boolean;
}

export function Navbar({
  onMenuClick,
  isMobile,
  sidebarCollapsed,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-black/70 backdrop-blur-xl border-b border-white/20 px-4 lg:px-8",
        scrolled ? "shadow-md" : "",
        isMobile ? "pl-4" : sidebarCollapsed ? "pl-24" : "pl-[288px]"
      )}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu size={20} />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Image src={logo} alt="Admin Logo" width={24} height={24} />
            </div>
            <TypingAnimation className="font-bold text-gray-800 dark:text-gray-200 text-sm">
              ADMIN DASHBOARD
            </TypingAnimation>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-white/70 dark:bg-black/50 backdrop-blur-sm shadow-lg hover:bg-white/90 dark:hover:bg-black/70 transition-all duration-300 rounded-xl border border-white/30"
              >
                <Bell size={18} className="text-gray-600 dark:text-gray-200" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg"
                >
                  3
                </motion.span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 bg-white/90 dark:bg-zinc-900 backdrop-blur-xl border border-white/30 shadow-2xl rounded-xl p-2"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/30" />
              <DropdownMenuItem className="hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition duration-200 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                🔔 You have a new message!
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition duration-200 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                ✅ Backup completed
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition duration-200 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                ⚠️ Low disk space
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-auto px-3 bg-white/70 dark:bg-black/50 backdrop-blur-sm shadow-lg hover:bg-white/90 dark:hover:bg-black/70 transition-all duration-300 rounded-xl border border-white/30"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-10 ring-2 ring-white/50">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <Image
                      src={logo}
                      alt="Admin Logo"
                      width={30}
                      height={24}
                    />
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      Admin
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Administrator
                    </span>
                  </div>
                  <ChevronDown size={16} className="text-gray-400 ml-1" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-white/90 dark:bg-zinc-900 backdrop-blur-xl border border-white/30 shadow-2xl rounded-xl"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal px-4 py-3 text-gray-800 dark:text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">David Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@company.com
                  </p>
                </div>
              </DropdownMenuLabel>
              {/* Dark Mode Toggle */}
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-4 py-3 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg mx-2 my-1"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-3 h-4 w-4" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="mr-3 h-4 w-4" />
                    <span>Dark Mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/30" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 focus:text-red-600 rounded-lg mx-2 my-1"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}