"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-6xl bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50"
      >
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Panel */}
          <motion.div
            variants={leftPanelVariants}
            className="lg:w-1/2 relative bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800 p-8 flex flex-col justify-between"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/40 to-transparent"></div>
              <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 400 200" fill="none">
                <path
                  d="M0 120C50 100 100 80 150 90C200 100 250 70 300 80C350 90 400 60 400 60V200H0V120Z"
                  fill="rgba(0,0,0,0.3)"
                />
                <path
                  d="M0 140C60 120 120 100 180 110C240 120 300 90 360 100C380 105 400 95 400 95V200H0V140Z"
                  fill="rgba(0,0,0,0.2)"
                />
              </svg>
            </div>

            {/* Header */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center justify-between"
              >
                <div className="text-white font-bold text-2xl tracking-wider">MINDSPPEAK</div>
                <Button
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to website
                </Button>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative z-10 text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Welcome Back,
                <br />
                Ready to Continue?
              </h1>

              {/* Navigation Dots */}
              <div className="flex justify-center lg:justify-start space-x-2 mt-8">
                {[0, 1, 2].map((dot, index) => (
                  <motion.div
                    key={dot}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                    className={`w-2 h-2 rounded-full ${index === 1 ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <motion.div variants={rightPanelVariants} className="lg:w-1/2 p-8 lg:p-12 bg-slate-900/80 backdrop-blur-sm">
            <motion.div variants={itemVariants} className="max-w-md mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
                <p className="text-slate-400">
                  Don&#39;t have an account?{" "}
                  <motion.a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign up
                  </motion.a>
                </p>
              </div>

              {/* Form */}
              <motion.form variants={containerVariants} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Email */}
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email" className="text-slate-300 mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="password" className="text-slate-300">
                      Password
                    </Label>
                    <motion.a
                      href="#"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Forgot password?
                    </motion.a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </motion.div>

                {/* Remember Me */}
                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    className="border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label htmlFor="remember" className="text-slate-300 text-sm">
                    Remember me for 30 days
                  </Label>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Sign in
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900/80 text-slate-400">Or continue with</span>
                  </div>
                </motion.div>

                {/* Social Buttons */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Apple
                  </Button>
                </motion.div>

                {/* Additional Options */}
                <motion.div variants={itemVariants} className="text-center pt-4">
                  <p className="text-slate-400 text-sm">
                    Having trouble signing in?{" "}
                    <motion.a
                      href="#"
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get help
                    </motion.a>
                  </p>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
