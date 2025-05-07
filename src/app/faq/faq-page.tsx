"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import FaqAccordion from "./faq-accordion"
import FaqCategory from "./faq-category"

export default function FaqPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "counseling", name: "Counseling Services" },
    { id: "support", name: "Support Groups" },
    { id: "resources", name: "Educational Resources" },
    { id: "emergency", name: "Emergency Support" },
  ]

  const faqs = [
    {
      id: 1,
      question: "How do I schedule a counseling appointment?",
      answer:
        "You can schedule a counseling appointment by emailing counseling@paragoniu.edu.kh, calling our office at 017 276477, or visiting the Student Affairs Office on the 2nd floor during business hours (Monday-Friday, 8:00 AM - 5:00 PM).",
      category: "counseling",
    },
    {
      id: 2,
      question: "Is counseling confidential?",
      answer:
        "Yes, all counseling services are strictly confidential. Information shared during sessions will not be disclosed to anyone without your written permission, except in situations where there is a risk of harm to yourself or others, or as required by law.",
      category: "counseling",
    },
    {
      id: 3,
      question: "How much do counseling services cost?",
      answer:
        "Counseling services are provided free of charge to all enrolled Paragon International University students as part of your student services.",
      category: "counseling",
    },
    {
      id: 4,
      question: "How do I join a peer support group?",
      answer:
        "You can join any peer support group by simply showing up at the scheduled time and location. No registration is required. If you have questions before attending, you can email supportgroups@paragoniu.edu.kh for more information.",
      category: "support",
    },
    {
      id: 5,
      question: "Can I start my own support group?",
      answer:
        "Yes! Students are encouraged to start support groups based on specific needs. To start a new group, please contact the Student Affairs Office with your proposal, including the focus of the group, potential meeting times, and how it would benefit students.",
      category: "support",
    },
    {
      id: 6,
      question: "How can I access the educational resources?",
      answer:
        "All educational resources are available online through the university portal. You can also find physical copies of many resources in the Student Affairs Office and the university library. Digital resources can be downloaded directly from our website.",
      category: "resources",
    },
    {
      id: 7,
      question: "Can I contribute to the educational resources?",
      answer:
        "We welcome student contributions to our resource library. If you have created or found a resource that you think would be valuable to other students, please submit it to resources@paragoniu.edu.kh for review.",
      category: "resources",
    },
    {
      id: 8,
      question: "What should I do in a mental health emergency?",
      answer:
        "If you or someone you know is experiencing a mental health emergency, please call the Cambodia Mental Health Hotline at 017 276 477 immediately. If on campus, you can also contact campus security at 017 276477 who can connect you with emergency support services.",
      category: "emergency",
    },
    {
      id: 9,
      question: "Are there mental health services available on weekends?",
      answer:
        "While our office is closed on weekends, emergency support is available 24/7. Call the Cambodia Mental Health Hotline at 017 276 477 for immediate assistance. Additionally, you can access our online resources at any time.",
      category: "emergency",
    },
    {
      id: 10,
      question: "How long are typical counseling sessions?",
      answer:
        "Individual counseling sessions typically last 50 minutes. The frequency of sessions will be determined based on your needs and in consultation with your counselor.",
      category: "counseling",
    },
    {
      id: 11,
      question: "Can international students access all mental health services?",
      answer:
        "Yes, all mental health services are available to all enrolled students, including international students. We also offer an International Student Support Circle specifically designed to address the unique challenges faced by international students.",
      category: "support",
    },
    {
      id: 12,
      question: "How do I provide feedback about the mental health services?",
      answer:
        "We value your feedback! You can provide feedback about our services by completing our anonymous online feedback form, emailing feedback@paragoniu.edu.kh, or speaking directly with the Director of Student Affairs.",
      category: "resources",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
<div className="py-20 bg-gradient-to-b from-slate-50 to-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <span className="inline-block px-4 py-2 bg-[#1d2b7d]/10 text-[#1d2b7d] rounded-full text-base font-semibold mb-6">
        SUPPORT
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1d2b7d] mb-6">
        Frequently Asked Questions
      </h1>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto">
        Find answers to common questions about our mental health services and resources at Paragon International
        University.
      </p>
    </motion.div>

    {/* Search Bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12 max-w-lg mx-auto"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-14 py-3 text-lg border-slate-200 focus:border-[#1d2b7d] focus:ring-[#1d2b7d] rounded-lg"
        />
      </div>
    </motion.div>

    {/* Categories */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => (
          <FaqCategory
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            delay={index * 0.05}
          />
        ))}
      </div>
    </motion.div>

    {/* FAQ Accordions */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      {filteredFaqs.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden divide-y divide-slate-200">
          {filteredFaqs.map((faq, index) => (
            <FaqAccordion key={faq.id} faq={faq} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-2xl font-semibold text-slate-700 mb-4">No questions found</h3>
          <p className="text-lg text-slate-500">
            Try adjusting your search terms or category selection
          </p>
        </div>
      )}
    </motion.div>

    {/* Still Have Questions */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-20 max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-[#1d2b7d] to-[#2a3a9c] rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-[20%] right-[10%] w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-[30%] right-[30%] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </div>
        <div className="p-10 relative z-10">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Still Have Questions?</h3>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              If you could not find the answer you were looking for, please do not hesitate to contact us directly.
            </p>
            <a
              href="mailto:counseling@paragoniu.edu.kh"
              className="inline-flex items-center px-8 py-4 bg-white text-[#1d2b7d] rounded-lg hover:bg-white/90 transition-colors font-medium text-lg"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</div>
  )
}
