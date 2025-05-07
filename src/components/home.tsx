"use client";

import { useRef } from "react";
import Image from "next/image";
import image1 from "@/assets/image1.jpg";
import mindspeak from "@/assets/mindspeak.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Users,
  MessageSquare,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen brightness-110 dark:to-gray-900">
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <MainGoalSection />
        <CTASection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mt-7 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left content */}
        <motion.div
          className="space-y-8 text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Badge
              variant="outline"
              className="rounded-full px-5 py-1.5 text-sm bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 inline-block backdrop-blur-sm shadow-sm"
            >
              <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-600 inline-block animate-pulse"></span>
              Welcome to MindSpeak
            </Badge>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl sm:text-5xl lg:text-6xl text-[#1d2b7d] dark:text-green-400 font-bold tracking-tight leading-tight bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
          >
            WELCOME TO PIU <br /> MIND SPEAK.
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-gray-600 dark:text-white max-w-lg mx-auto md:mx-0 text-base sm:text-lg"
          >
            A safe haven for expressing mental struggles and sharing
            experiences. You are not alone in your journey.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex justify-center md:justify-start items-center gap-4"
          >
            <Button className="rounded-full text-white group relative overflow-hidden px-8 py-6 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <span className="relative z-10">Read Stories</span>
              <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>

            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-medium text-white bg-green-500 hover:bg-green-600 hover:text-white dark:bg-green-500 dark:hover:bg-green-600 transition-all duration-300"
            >
              Join Now
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right content - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="relative w-full"
        >
          {/* Floating rating box */}
          <div className="absolute -top-8 right-4 bg-white dark:bg-gray-800 rounded-xl px-5 py-3 text-sm font-medium shadow-md border border-gray-100 dark:border-gray-700 z-10">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full font-extrabold bg-green-500"></div>
              <span>Healthcare Professionals With Mind Speak</span>
            </div>
          </div>

          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-gray-700 hover:brightness-105 border-gray-700 dark:hover:shadow-gray-300">
            <Image
              src={mindspeak || "/placeholder.svg"}
              alt="Creative professional"
              width={600}
              height={700}
              className="object-cover w-full h-auto rounded-3xl transform hover:scale-105 transition-transform duration-700 brightness-110"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: (
        <ShieldCheck className="h-6 w-6 text-green-600 bg-green dark:text-green-600" />
      ),
      title: "100% Anonymous",
      description:
        "Your identity is completely protected. We don't track IP addresses or require any personal information.",
    },
    {
      number: "02",
      icon: (
        <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-600" />
      ),
      title: "Express Yourself",
      description:
        "Share your thoughts, feelings, and experiences without fear of judgment or consequences.",
    },
    {
      number: "03",
      icon: <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      title: "University Community",
      description:
        "Connect with fellow students who understand your unique university experience and challenges.",
    },
    {
      number: "04",
      icon: (
        <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-600" />
      ),
      title: "Safe Environment",
      description:
        "All confessions are moderated to ensure a respectful and supportive community.",
    },
  ];

  return (
    <section className="py-24 dark:bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-5 py-1.5 text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Why Choose UniConfess
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text dark:text-green-400 text-[#1d2b7d] bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400">
            A Safe Space for University Students
          </h2>
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-lg">
            UniConfess provides a platform for students to share their authentic
            experiences anonymously, creating a supportive community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md dark:hover:shadow-white/20 hover:shadow-blue-400/20 hover:shadow-xl border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:translate-y-[-5px]">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="text-5xl font-bold text-[#1d2b7d] dark:text-teal-400">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-white">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-blue-600 dark:text-teal-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MainGoalSection() {
  // Scroll animation references
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 dark:bg-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text dark:text-green-400 text-[#1d2b7d] bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400"
            >
              Let&#39;s know about our main goal
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 dark:text-white text-lg"
            >
              We provide comprehensive healthcare information about our
              services, treatments, and preventive care. This ensures that
              patients can make informed decisions about their health and
              receive the best possible care.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6"
            >
              {[
                "Providing Accessible Information",
                "Building Trust",
                "Enhancing Patient Engagement",
                "Community Involvement",
                "Promoting Health Education",
                "Security and Privacy",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-1 group-hover:bg-blue-600 transition-colors duration-300">
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl blur-xl opacity-70"></div>
            <motion.div
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl dark:hover:shadow-gray-300 shadow-gray-700 "
            >
              <Image
                src={image1}
                alt="Doctor with stethoscope"
                width={500}
                height={500}
                className="w-full rounded-3xl brightness-110"
              />

              {/* Floating Element */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg px-4 py-2 text-sm font-medium border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Healthcare Professionals</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-[#1d2b7d] to-[#1d2b7d] dark:from-[#1d2b7d] dark:to-[#1d2b7d] rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
            </div>

            <div className="p-10 md:p-16 text-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
              >
                Ready to Share Your Story?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg"
              >
                Join thousands of students who have found relief, connection,
                and community through anonymous confessions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <Button
                  className="rounded-full bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base font-medium shadow-lg hover:shadow-white/20 transition-all duration-300"
                  asChild
                >
                  <Link href="/express">
                    Express Feelings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full hover:text-blue-700 border-white/30 bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base font-medium shadow-lg hover:shadow-white/20 transition-all duration-300"
                  asChild
                >
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
