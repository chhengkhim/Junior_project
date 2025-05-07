"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import user from "@/assets/user.jpg"
import { Bell, BookOpen, Edit, Lock, LogOut, MessageSquare, Settings, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Form states
  const [userData, setUserData] = useState({
    name: "Pisethsambo Phok",
    email: "pisethsambo@gmail.com",
    bio: "Educational psychology student with a passion for community building and peer learning. I believe in creating supportive learning environments where everyone can thrive.",
    avatar: "/placeholder.svg?height=200&width=200",
    joinDate: "September 2023",
  })

  const [preferences, setPreferences] = useState({
    showProfile: true,
    allowMessages: true,
    emailNotifications: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  const [settingsData, setSettingsData] = useState({
    language: "English",
    largerText: false,
    reduceMotion: false,
  })

  // Handle form changes
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggleChange = (setting: string, stateUpdater: React.Dispatch<React.SetStateAction<any>>) => {
    stateUpdater((prev: Record<string, boolean>) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSecurityData((prev) => ({ ...prev, [name]: value }))
  }

  // Form submission handlers
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving profile data
    setTimeout(() => {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
      setIsEditing(false)
    }, 500)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate passwords
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (securityData.newPassword.length < 8) {
      alert("Password must be at least 8 characters!")
      return
    }

    // Simulate password update
    alert("Password updated successfully!")
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: securityData.twoFactorEnabled,
    })
  }

  const handleLogout = () => {
    // Simulate logout
    alert("You have been logged out.")
    router.push("/")
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "activity", label: "Activity", icon: <BookOpen className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Lock className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Your profile has been updated.</span>
              </motion.div>
            )}

            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleProfileSubmit}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                  <motion.button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[#1d2b7d] hover:text-[#162058] font-medium flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? "Cancel" : "Edit"}
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleUserDataChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg focus:border-[#1d2b7d] focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                      <Input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserDataChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg focus:border-[#1d2b7d] focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
                      <Textarea
                        name="bio"
                        rows={5}
                        value={userData.bio}
                        onChange={handleUserDataChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg focus:border-[#1d2b7d] focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                      ></Textarea>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <motion.div
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.button
                      type="submit"
                      className="bg-[#1d2b7d] hover:bg-[#162058] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Preferences</h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-[#1d2b7d] mr-3" />
                    <span>Show my profile to other members</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.showProfile}
                      onChange={() => handleToggleChange("showProfile", setPreferences)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-[#1d2b7d] mr-3" />
                    <span>Allow direct messages</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.allowMessages}
                      onChange={() => handleToggleChange("allowMessages", setPreferences)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 text-[#1d2b7d] mr-3" />
                    <span>Email notifications for new messages</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.emailNotifications}
                      onChange={() => handleToggleChange("emailNotifications", setPreferences)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )
      case "activity":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Activity Center</h3>
              <div className="p-8 text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-[#1d2b7d]/10 rounded-full mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                >
                  <BookOpen className="w-8 h-8 text-[#1d2b7d]" />
                </motion.div>
                <motion.h4
                  className="text-lg font-medium text-gray-800 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Activity Tracking Coming Soon
                </motion.h4>
                <motion.p
                  className="text-gray-600 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  We are working on a comprehensive activity tracking system to help you monitor your engagement with our
                  educational community.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Future Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="border border-dashed border-gray-300 rounded-lg p-4 text-center"
                  whileHover={{ scale: 1.03, borderColor: "#1d2b7d" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1d2b7d]/10 rounded-full mb-3">
                    <MessageSquare className="w-6 h-6 text-[#1d2b7d]" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-1">Post & Comment History</h4>
                  <p className="text-sm text-gray-500">Track all your contributions</p>
                </motion.div>
                <motion.div
                  className="border border-dashed border-gray-300 rounded-lg p-4 text-center"
                  whileHover={{ scale: 1.03, borderColor: "#1d2b7d" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1d2b7d]/10 rounded-full mb-3">
                    <Shield className="w-6 h-6 text-[#1d2b7d]" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-1">Achievement Badges</h4>
                  <p className="text-sm text-gray-500">Earn badges for your participation</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )
      case "notifications":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleToggleChange("emailNotifications", setNotificationSettings)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div>
                    <p className="font-medium text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.pushNotifications}
                      onChange={() => handleToggleChange("pushNotifications", setNotificationSettings)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div>
                    <p className="font-medium text-gray-800">Comment Notifications</p>
                    <p className="text-sm text-gray-500">Get notified when someone comments on your posts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationSettings.commentNotifications}
                      onChange={() => handleToggleChange("commentNotifications", setNotificationSettings)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Notifications</h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div className="bg-[#1d2b7d]/10 p-2 rounded-full mr-4">
                    <Bell className="w-5 h-5 text-[#1d2b7d]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Community Guidelines Updated</p>
                    <p className="text-sm text-gray-500">
                      Please review the latest changes to our community guidelines.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div className="bg-[#1d2b7d]/10 p-2 rounded-full mr-4">
                    <Bell className="w-5 h-5 text-[#1d2b7d]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Welcome to the Community</p>
                    <p className="text-sm text-gray-500">Thank you for joining our educational community platform.</p>
                    <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )
      case "security":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Current Password</label>
                  <Input
                    type="password"
                    name="currentPassword"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    className="w-full px-4 py-2 border rounded-lg focus:border-[#1d2b7d] focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">New Password</label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={securityData.newPassword}
                    onChange={handleSecurityChange}
                    className="w-full px-4 py-2 border rounded-lg focus:border-[#1d2b7d] focus:outline-none"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Confirm New Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={securityData.confirmPassword}
                    onChange={handleSecurityChange}
                    className="w-full px-4 py-2 border rounded-lg focus:border-[#1d2b7d] focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    type="submit"
                    className="bg-[#1d2b7d] hover:bg-[#162058] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Update Password
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
              <p className="text-gray-600 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">Enable 2FA</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <Input
                    type="checkbox"
                    className="sr-only peer"
                    checked={securityData.twoFactorEnabled}
                    onChange={() => handleToggleChange("twoFactorEnabled", setSecurityData)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                </label>
              </div>
              <AnimatePresence>
                {securityData.twoFactorEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm text-gray-600">
                      Two-factor authentication is enabled. You will receive a verification code via email when signing
                      in.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Actions</h3>
              <div className="space-y-4">
                <motion.button
                  onClick={() => alert("You've been logged out from all devices.")}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)", x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Log out from all devices</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) {
                      alert("Your account has been deactivated.")
                      router.push("/")
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                  whileHover={{ backgroundColor: "rgba(254, 226, 226, 0.5)", x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-red-500">Deactivate account</span>
                  </div>
                  <span className="text-red-400">→</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )
      case "settings":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              className="bg-white rounded-xl shadow-md p-6"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Accessibility</h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div>
                    <p className="font-medium text-gray-800">Larger Text</p>
                    <p className="text-sm text-gray-500">Increase text size for better readability</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settingsData.largerText}
                      onChange={() => handleToggleChange("largerText", setSettingsData)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
                <motion.div
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                >
                  <div>
                    <p className="font-medium text-gray-800">Reduce Motion</p>
                    <p className="text-sm text-gray-500">Minimize animations throughout the interface</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settingsData.reduceMotion}
                      onChange={() => handleToggleChange("reduceMotion", setSettingsData)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d2b7d]"></div>
                  </label>
                </motion.div>
              </div>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={() => alert("Preferences saved successfully!")}
                  className="bg-[#1d2b7d] hover:bg-[#162058] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Preferences
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="h-32 bg-gradient-to-r from-[#1d2b7d] to-[#2a3d99]"></div>
          <div className="px-6 py-4 md:px-8 md:py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <motion.div
                className="relative -mt-16 mb-4 md:mb-0 md:mr-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white">
                  <Image
                    src={user}
                    alt={userData.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <motion.button
                  onClick={() => alert("Profile picture upload will be available in a future update.")}
                  className="absolute bottom-0 right-0 bg-[#1d2b7d] text-white p-1 rounded-full"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
              </motion.div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                    <p className="text-gray-500">Joined {userData.joinDate}</p>
                  </motion.div>
                  <motion.div
                    className="mt-4 md:mt-0 flex space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#1d2b7d] hover:bg-[#162058] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-6 border-t pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-700">{userData.bio}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            className="md:w-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left border-l-4 transition-all ${
                    activeTab === tab.id
                      ? "border-[#1d2b7d] bg-[#1d2b7d]/5 text-[#1d2b7d]"
                      : "border-transparent hover:bg-gray-50 text-gray-700"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 text-left border-l-4 border-transparent hover:bg-gray-50 text-red-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ x: 5 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="md:w-3/4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
