"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    // Show success message
    alert("Your message has been sent. We'll get back to you soon!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b rounded-2xl from-[#0d3895] to-[#ffff] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white max-w-3xl mx-auto text-lg">
            Have questions about our community guidelines? Need clarification on a specific rule? Our support team is
            here to help you understand and navigate our educational community standards.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Contact Information */}
            <div className="bg-[#1d2b7d] text-white p-8 md:p-12 md:w-2/5 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="mb-8 opacity-90">
                  Our dedicated support team is ready to assist you with any questions about our community rules and
                  guidelines.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-4" />
                    <div>
                      <p>+1 (855) 172-76477</p>
                      <p>+1 (855) 172-76477</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-4" />
                    <p>mindspeak@paragoniu.edu.kh</p>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-4" />
                    <p>PhnomPenh, CAMBODIA</p>
                  </div>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#162058] rounded-full -mr-32 -mb-32 opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#162058] rounded-full -mr-16 -mt-16 opacity-30"></div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12 md:w-3/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#1d2b7d] focus:outline-none"
                      placeholder="Pisethsambo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#1d2b7d] focus:outline-none"
                      placeholder="pisethsambo@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-500 mb-1">
                    Your Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#1d2b7d] focus:outline-none"
                    placeholder="I need help understanding a guideline"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-[#1d2b7d] focus:outline-none resize-none"
                      placeholder="Write here your message"
                    ></textarea>
                    <div className="absolute bottom-3 right-3 w-6 h-6 text-yellow-500 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.24 2.52v-.08L10.05 0l2.81 2.43v.08l-2.81 2.44-2.81-2.43zm5.54 3.37v-.08l2.82-2.44 2.81 2.43v.09l-2.81 2.43-2.82-2.43zm-5.54 8.96v-.08l2.81-2.44 2.81 2.44v.08l-2.81 2.43-2.81-2.43zm-5.53-4.48v-.09l2.81-2.43 2.81 2.43v.09l-2.81 2.43-2.81-2.43zm16.61 0v-.09l2.81-2.43 2.81 2.43v.09l-2.81 2.43-2.81-2.43z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-[#1d2b7d] hover:bg-white hover:text-[#1d2b7d] border text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
