"use client";

import EducationalResources from "./educational-resources";
import Image from "next/image";
import logo9 from "@/assets/logo9.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <EducationalResources />
      </main>

      <footer className="bg-[#1d2b7d] rounded-3xl text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-4">
              <Image
                src={logo9}
                alt="Paragon International University"
                width={180}
                height={60}
                className="object-contain animate-pulse drop-shadow-x"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/80">
                © 2025 Paragon International University
              </p>
              <p className="text-white/60 text-sm">All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
