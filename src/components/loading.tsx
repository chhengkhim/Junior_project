"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo9.png";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // ⏩ Increased speed
      });
    }, 80); // ⏩ Faster interval

    const progressTimer = setTimeout(() => {
      if (progress >= 100) {
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 600); // Slightly shorter fade-out
      }
    }, 2000); // ⏩ Shorter total duration

    return () => {
      clearInterval(interval);
      clearTimeout(progressTimer);
    };
  }, [progress]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] transition-opacity duration-1000 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Geometric background */}
      <div className="absolute inset-0 bg-[#1d2b7d] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#2a3c99] rounded-bl-full opacity-20 transform -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-[#101745] rounded-tr-full opacity-30 transform translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
              style={{
                top: `${20 * i + 10}%`,
                left: 0,
                right: 0,
                animation: `scanLine 5s linear infinite ${i * 1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        <div className="relative mb-12 brightness-125">
          <div className="w-40 h-40 animate-pulse brightness-125 relative mb-4 mx-auto">
            <div
              className="absolute inset-0 border-4 border-white opacity-20 rounded-full animate-spin"
              style={{ animationDuration: "12s" }}
            />
            <div
              className="absolute inset-2 border-2 border-dashed border-white opacity-10 rounded-full animate-spin"
              style={{
                animationDuration: "16s",
                animationDirection: "reverse",
              }}
            />
            <div className="absolute inset-4 flex items-center justify-center">
              <Image
                width={150}
                height={150}
                alt="logo"
                src={logo}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="w-full px-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-mono text-white opacity-70">
              LOADING
            </span>
            <span className="text-xs font-mono text-white opacity-70">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 bg-[#ffff]/20 rounded overflow-hidden flex">
            {[...Array(20)].map((_, i) => (
              <div
                key={`segment-${i}`}
                className="h-full transition-colors duration-500 ease-out border-r border-[#ffff]/20"
                style={{
                  width: "5%",
                  backgroundColor:
                    progress >= (i + 1) * 5 ? "#ffff" : "transparent",
                  boxShadow:
                    progress >= (i + 1) * 5
                      ? "0 0 10px rgba(74, 255, 218, 0.5)"
                      : "none",
                }}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-lg font-mono text-white inline-flex overflow-hidden whitespace-nowrap">
              <span className="text-[#4affda]">&gt;</span>
              <span className="ml-2 animate-typewriter">Welcome to MSU...</span>
              <span className="animate-blink ml-1">_</span>
            </h3>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 3s steps(30) infinite alternate;
        }

        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </div>
  );
}