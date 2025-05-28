"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimation,
  useInView,
  AnimationControls,
} from "framer-motion";
import profile from "@/assets/user.jpg";
import logo from "@/assets/logo9.png"

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
      "Creates intuitive user experiences with a keen eye for detail. Specializes in translating complex requirements into elegant, user-friendly designs that drive engagement and satisfaction. With over 8 years of experience in the industry, Alex has helped numerous startups and established companies refine their digital products.",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-24 px-4 overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="tree-pattern"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
              patternTransform="scale(2) rotate(0)"
            >
              <path
                d="M50,5 L50,95 M30,20 L50,40 M70,20 L50,40 M20,50 L50,80 M80,50 L50,80"
                stroke="#1d2b7d"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tree-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#1d2b7d]/10 text-[#1d2b7d] dark:bg-[#1d2b7d]/30 dark:text-[#a3aee2] rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#1d2b7d] dark:text-white">
              <span className="relative">
                The Minds Behind
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-[#1d2b7d]/20 dark:bg-[#1d2b7d]/40 z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
              <span className="text-[#1d2b7d] dark:text-[#a3aee2]">
                {" "}
                MindSpeak
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our team works together like branches of a tree, connected and
            supporting each other to create an exceptional platform for
            university students.
          </motion.p>
        </motion.div>

        {/* Tree structure */}
        <div className="relative">
          {/* Root node */}
          <motion.div
            className="w-20 h-20 rounded-full animate-bounce bg-[#1d2b7d] mx-auto flex items-center justify-center shadow-lg shadow-[#1d2b7d]/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Image src={logo} alt="Icon" className="w-25 h-25 object-contain" />
          </motion.div>

          {/* Main trunk */}
          <motion.div
            className="w-1 bg-[#1d2b7d] mx-auto h-24"
            initial={{ height: 0 }}
            animate={{ height: 96 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>

          {/* First level branch */}
          <div className="relative">
            <TeamMemberBranch
              member={teamMembers[0]}
              index={0}
              controls={controls}
              isRoot={true}
            />

            {/* Second level branches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-[#1d2b7d] h-16"></div>
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-[#1d2b7d]"></div>
              <div className="absolute top-16 left-[10%] w-1 bg-[#1d2b7d] h-16"></div>
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 bg-[#1d2b7d] h-16"></div>
              <div className="absolute top-16 left-[90%] w-1 bg-[#1d2b7d] h-16"></div>

              {teamMembers.slice(1).map((member, idx) => (
                <TeamMemberBranch
                  key={member.id}
                  member={member}
                  index={idx + 1}
                  controls={controls}
                  isRoot={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TeamMemberBranchProps {
  member: TeamMember;
  index: number;
  controls: AnimationControls;
  isRoot: boolean;
}

function TeamMemberBranch({
  member,
  index,
  controls,
  isRoot,
}: TeamMemberBranchProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={`${isRoot ? "mx-auto max-w-md" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Card with enhanced styling */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          whileHover={{
            y: -8,
            transition: { duration: 0.3 },
          }}
        >
          {/* Card background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f5f7ff] dark:from-gray-800 dark:to-gray-900 z-0"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1d2b7d]/5 dark:bg-[#1d2b7d]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1d2b7d]/5 dark:bg-[#1d2b7d]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

          {/* Card content wrapper */}
          <div className="relative z-10 shadow-2xl shadow-[#1d2b7d]/10">
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#1d2b7d] to-[#3d4cad]"></div>

            <div className="flex flex-col overflow-hidden">
              {/* Image container */}
              <div className="relative w-full h-64 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#1d2b7d] via-[#1d2b7d]/70 to-transparent z-10"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: isHovered ? 0.8 : 0.6 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <Image
                    src={member.image === "profile" ? profile : member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Leaf decoration */}
                <motion.div
                  className="absolute top-4 right-4 z-20"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isHovered ? 15 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L12 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 2H22V8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                {/* Member info overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 transform translate-y-0">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-white text-[#1d2b7d] font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                      {member.number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {member.name}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mt-1">
                        {member.role}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white dark:bg-gray-800">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {member.description}
                </p>

                {/* Divider with leaf pattern */}
                <div className="relative h-px w-full bg-slate-200 dark:bg-slate-700 my-5">
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#1d2b7d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="dark:stroke-[#a3aee2]"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="#1d2b7d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="dark:stroke-[#a3aee2]"
                      />
                    </svg>
                  </div>
                </div>

                {/* Social links with enhanced styling */}
                <div className="flex justify-center space-x-4">
                  {[0, 1, 2].map((i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#f5f7ff] dark:bg-gray-700 flex items-center justify-center text-[#1d2b7d] dark:text-[#a3aee2] shadow-md hover:shadow-lg hover:bg-[#1d2b7d] hover:text-white dark:hover:bg-[#1d2b7d] dark:hover:text-white transition-all duration-300"
                      whileHover={{
                        y: -5,
                        transition: {
                          duration: 0.2,
                          type: "spring",
                          stiffness: 400,
                        },
                      }}
                    >
                      {i === 0 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1d2b7d]/10 to-transparent"></div>
          </div>

          {/* Animated highlight on hover */}
          <motion.div
            className="absolute inset-0 border-2 border-[#1d2b7d] rounded-2xl z-20 opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
