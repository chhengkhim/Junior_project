"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  AtSign,
  Check,
  Eye,
  EyeOff,
  Github,
  ChromeIcon as Google,
  Lock,
  LogIn,
  User,
  X,
} from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Form validation states
  const [validations, setValidations] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  })

  // Handle form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData((prev) => ({ ...prev, [name]: value }))

    // Validate on change
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      setValidations((prev) => ({ ...prev, email: emailRegex.test(value) || value === "" }))
    } else if (name === "password") {
      setValidations((prev) => ({
        ...prev,
        password: value.length >= 8 || value === "",
        confirmPassword: value === signupData.confirmPassword || signupData.confirmPassword === "",
      }))
    } else if (name === "confirmPassword") {
      setValidations((prev) => ({ ...prev, confirmPassword: value === signupData.password || value === "" }))
    }

    setError("")
  }

  // Handle form submissions
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(loginData.email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    // Validate password
    if (loginData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setLoading(false)
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate successful login
      setSuccess("Login successful! Redirecting...")

      // Redirect after successful login
      setTimeout(() => {
        router.push("/profile")
      }, 1500)
    } catch (err) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate name
    if (signupData.name.trim().length < 2) {
      setError("Please enter your name")
      setValidations((prev) => ({ ...prev, name: false }))
      setLoading(false)
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupData.email)) {
      setError("Please enter a valid email address")
      setValidations((prev) => ({ ...prev, email: false }))
      setLoading(false)
      return
    }

    // Validate password
    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setValidations((prev) => ({ ...prev, password: false }))
      setLoading(false)
      return
    }

    // Validate password confirmation
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match")
      setValidations((prev) => ({ ...prev, confirmPassword: false }))
      setLoading(false)
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, simulate successful signup
      setSuccess("Account created successfully! Redirecting...")

      // Redirect after successful signup
      setTimeout(() => {
        router.push("/profile")
      }, 1500)
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Social login handlers
  const handleGoogleLogin = () => {
    alert("Google login will be implemented in a future update")
  }

  const handleGithubLogin = () => {
    alert("GitHub login will be implemented in a future update")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto h-16 w-16 rounded-full bg-[#1d2b7d]/10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="h-8 w-8 text-[#1d2b7d]" />
          </motion.div>
          <motion.h2
            className="mt-6 text-3xl font-extrabold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isLogin ? "Welcome back" : "Create your account"}
          </motion.h2>
          <motion.p
            className="mt-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {isLogin ? "Sign in to your account to continue" : "Join our educational community today"}
          </motion.p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Form Toggle */}
          <div className="flex rounded-md shadow-sm mb-6">
            <motion.button
              className={`w-1/2 py-2 text-sm font-medium rounded-l-md focus:outline-none ${
                isLogin ? "bg-[#1d2b7d] text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsLogin(true)}
              whileHover={!isLogin ? { backgroundColor: "#f3f4f6" } : {}}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className={`w-1/2 py-2 text-sm font-medium rounded-r-md focus:outline-none ${
                !isLogin ? "bg-[#1d2b7d] text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsLogin(false)}
              whileHover={isLogin ? { backgroundColor: "#f3f4f6" } : {}}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login-form"
                className="space-y-6"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1d2b7d] focus:border-[#1d2b7d]"
                      placeholder="you@example.com"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#1d2b7d] focus:border-[#1d2b7d]"
                      placeholder="••••••••"
                      whileFocus={{ scale: 1.01 }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#1d2b7d] focus:ring-[#1d2b7d] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="#" className="font-medium text-[#1d2b7d] hover:text-[#162058]">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-[#1d2b7d] hover:bg-[#162058] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        Sign in
                        <span className="absolute right-3 inset-y-0 flex items-center">
                          <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                        </span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup-form"
                className="space-y-6"
                onSubmit={handleSignupSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={signupData.name}
                      onChange={handleSignupChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        validations.name ? "border-gray-300" : "border-red-500"
                      } rounded-md focus:outline-none focus:ring-[#1d2b7d] focus:border-[#1d2b7d]`}
                      placeholder="John Doe"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        validations.email ? "border-gray-300" : "border-red-500"
                      } rounded-md focus:outline-none focus:ring-[#1d2b7d] focus:border-[#1d2b7d]`}
                      placeholder="you@example.com"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className={`block w-full pl-10 pr-10 py-2 border ${
                        validations.password ? "border-gray-300" : "border-red-500"
                      } rounded-md focus:outline-none focus:ring-[#1d2b7d] focus:border-[#1d2b7d]`}
                      placeholder="••••••••"
                      whileFocus={{ scale: 1.01 }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <motion.input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        validations.confirmPassword ? "border-gray-300" : "border-red-500"
                      } rounded-md focus:outline-none focus:ring-[#1d2b7d] focus:border-[#1d2b7d]`}
                      placeholder="••••••••"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#1d2b7d] focus:ring-[#1d2b7d] border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{" "}
                    <Link href="/rules" className="font-medium text-[#1d2b7d] hover:text-[#162058]">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/rules" className="font-medium text-[#1d2b7d] hover:text-[#162058]">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-[#1d2b7d] hover:bg-[#162058] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        Create account
                        <span className="absolute right-3 inset-y-0 flex items-center">
                          <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                        </span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social Login Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                whileHover={{ scale: 1.03, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Google className="h-5 w-5 text-red-500" />
                <span className="ml-2">Google</span>
              </motion.button>

              <motion.button
                onClick={handleGithubLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                whileHover={{ scale: 1.03, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="h-5 w-5 text-gray-900" />
                <span className="ml-2">GitHub</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} Educational Community. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/rules" className="text-[#1d2b7d] hover:text-[#162058]">
              Rules
            </Link>
            <Link href="/contact" className="text-[#1d2b7d] hover:text-[#162058]">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
