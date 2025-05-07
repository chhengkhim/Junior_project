"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import profile from "@/assets/user.jpg";

interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "member1",
    number: "01",
    name: "Sochesda Thoeun",
    role: "Lead Team",
    description:
      "Creates intuitive user experiences with a keen eye for detail. Specializes in translating complex requirements into elegant, user-friendly designs that drive engagement and satisfaction. With over 8 years of experience in the industry, Alex has helped numerous startups and established companies refine their digital products.",
    image: "profile",
  },
  {
    id: "member2",
    number: "02",
    name: "Pisethsambo Phok",
    role: "Frontend Developer & Design",
    description:
      "Architects robust solutions with cutting-edge technologies. Brings extensive experience in full-stack development and a passion for clean, maintainable code that scales with business needs. Jamie has led development teams on projects ranging from e-commerce platforms to complex data visualization tools, always focusing on performance and user experience.",
    image: "profile",
  },
  {
    id: "member3",
    number: "03",
    name: "Se Chanmoniroth",
    role: "Backend Developer",
    description:
      "Crafts compelling narratives that resonate with target audiences. Leverages data-driven insights to develop marketing campaigns that drive brand awareness and customer acquisition. Taylor's background in psychology and digital marketing has helped clients across various industries establish strong market positions and achieve sustainable growth.",
    image: "profile",
  },
  {
    id: "member4",
    number: "04",
    name: "Sotheara Em",
    role: "Community & Marketing",
    description:
      "Ensures seamless execution of projects from start to finish. Coordinates cross-functional teams and optimizes workflows to deliver exceptional results on time and within budget. Jordan's methodical approach to project management and resource allocation has been instrumental in maintaining high quality standards while meeting aggressive deadlines.",
    image: "profile",
  },
];

export default function TeamSection() {
  return (
    <div className="relative min-h-screen w-full dark:bg-gray-900 bg-white text-[#1d2b7d] dark:text-white py-16 px-4 md:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl text-[#1d2b7d] dark:text-green-400 font-bold mb-6 bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 leading-tight">
            Our Talented Team Behind
            <span className="text-red-500 font-bold"> MindSpeak</span>
          </h1>
        </motion.div>

        <div className="space-y-32 md:space-y-64">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isEven={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TeamMemberCardProps {
  member: TeamMember;
  isEven: boolean;
}

function TeamMemberCard({ member, isEven }: TeamMemberCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: false, amount: 0.2 });
  const contentControls = useAnimation();

  useEffect(() => {
    if (isContentInView) {
      contentControls.start("visible");
    }
  }, [contentControls, isContentInView]);

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
      {/* Static Image */}
      <div
        className={`w-full md:w-1/2 ${isEven ? "md:order-2" : "md:order-1"}`}
      >
        <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl brightness-125 dark:hover:shadow-[#1d2b7d]">
          <Image
            src={member.image === "profile" ? profile : member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
        </div>
      </div>

      {/* Animated Content */}
      <motion.div
        ref={contentRef}
        initial="hidden"
        animate={contentControls}
        variants={contentVariants}
        className={`w-full md:w-1/2 ${
          isEven ? "md:order-1" : "md:order-2"
        } md:self-center`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold text-emerald-400">
              {member.number}
            </span>
            <div>
              <h3 className="text-3xl font-bold">{member.name}</h3>
              <p className="text-xl text-blue-400 mt-1">{member.role}</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-white text-lg font-light leading-relaxed">
            {member.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
