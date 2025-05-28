"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import POS from "@/assets/logo8.png";
import logo from "@/assets/user.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, keepLoggedIn });
  };

  return (
    <div className="flex animate-slide-up min-h-screen w-full items-center justify-center bg-gradient-to-tr from-teal-400 via-slate-100 to-teal-400 p-4">
      <Card className="relative w-full hover:shadow-teal-400  shadow-gray-600 max-w-5xl overflow-hidden rounded-3xl border-none shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Login Form */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="mb-8 flex items-center space-x-4">
                <Image
                  src={logo}
                  alt="POS System Logo"
                  width={80}
                  height={80}
                />
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    POS-SYSTEM
                  </h1>
                  <p className="mt-1 text-sm text-black">
                    Welcome to POS-SYSTEM management
                  </p>
                </div>
              </div>

              <CardHeader className="px-0 pt-6">
                <h2 className="text-2xl underline font-semibold leading-tight text-gray-900">
                  Login
                </h2>
              </CardHeader>

              <CardContent className="px-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="pl-10 h-11 border-gray-200 bg-gray-50/50 focus-visible:ring-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 h-11 border-gray-200 bg-gray-50/50 focus-visible:ring-white"
                        required
                      />
                    </div>
                  </div>

                  <Link href="/user-dashboard/feed">
                    <Button
                      type="submit"
                      className="w-full h-11 bg-teal-600 hover:bg-teal-500 text-white transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span>Log in</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden md:block">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-50"></div>
              <div className="relative flex h-full items-center justify-center p-8">
                <div className="rounded-2xl bg-white/80 p-2 shadow-xl backdrop-blur-sm">
                  <Image
                    src={POS || "/placeholder.svg"}
                    alt="POS System Illustration"
                    width={500}
                    height={500}
                    className="h-auto max-w-full rounded-xl object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
