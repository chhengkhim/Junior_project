import { MapPin, Clock, Mail, MoreVertical, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo2 from "@/assets/logo8.png"
import ResourceStats from "./resource-stats"
import SupportGroups from "./support-groups"
import CampusMap from "./campus-map"


export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 transform transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-8 md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1d2b7d] mb-4">Need support with your studies?</h2>
              <p className="text-slate-600 mb-6">
                Paragon International University offers a range of support services to help you succeed in your academic
                journey. From counseling services to peer support groups, we are here to help you thrive.
              </p>
              <Link
                href="#book-session"
                className="inline-flex items-center px-6 py-3 bg-[#1d2b7d] text-white rounded-lg hover:bg-[#1d2b7d]/90 transition-colors"
              >
                Book a Counseling Session
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="md:w-2/5 relative min-h-[250px] md:min-h-0">
              <Image src={logo2} alt="mindspeaklogo" fill className="object-contain p-4" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <ResourceStats />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Counseling Services */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2 transform transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-[#1d2b7d]">Student Counseling Services</h2>
                <button className="text-slate-400 hover:text-slate-600" aria-label="More options">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <p className="text-slate-600 mb-6">
                Paragon International University offers confidential counseling services to all enrolled students.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-[#1d2b7d]/10 p-2 rounded-lg mr-4">
                    <MapPin className="h-5 w-5 text-[#1d2b7d]" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Location:</p>
                    <p className="text-slate-600">Student Affairs Office, 2nd Floor</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#1d2b7d]/10 p-2 rounded-lg mr-4">
                    <Clock className="h-5 w-5 text-[#1d2b7d]" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Hours:</p>
                    <p className="text-slate-600">Monday-Friday, 8:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#1d2b7d]/10 p-2 rounded-lg mr-4">
                    <Mail className="h-5 w-5 text-[#1d2b7d]" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Appointment:</p>
                    <p className="text-slate-600">Email counseling@paragoniu.edu.kh</p>
                  </div>
                </div>
              </div>

              <div id="book-session">
                <Link
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-[#1d2b7d] text-white rounded-lg hover:bg-[#1d2b7d]/90 transition-colors"
                >
                  Book a Counseling Session
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Support Groups */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all hover:shadow-md">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-[#1d2b7d]">Peer Support Groups</h2>
                <button className="text-slate-400 hover:text-slate-600" title="More options">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <p className="text-slate-600 mb-6">
                Join student-led support groups to connect with peers facing similar challenges.
              </p>

              <SupportGroups />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 transform transition-all hover:shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#1d2b7d] mb-4">Find Us on Campus</h2>
            <CampusMap />
          </div>
        </div>
      </main>
    </div>
  )
}
