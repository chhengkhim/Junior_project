"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Filter,
  Search,
  X,
  Grid3X3,
  List,
} from "lucide-react";
import { ConfessionTableModern } from "./confession-table-modern";
import { ConfessionCards } from "./confession-cards";
import { ConfessionModal } from "./confession-modal";
import { StatsCards } from "./stats-cards";
import { mockConfessions } from "./data/confessions";
import type { Confession, ConfessionStats } from "./types/confession";
import { getTimeFilter } from "./utils/helper";

export default function ConfessionDashboard() {
  const [confessions, setConfessions] = useState<Confession[]>(
    () =>
      mockConfessions.map((confession) => ({
        ...confession,
        userName: confession.email || "Unknown User", // Ensure userName exists
      })) as Confession[]
  );
  const [selectedConfessions, setSelectedConfessions] = useState<number[]>([]);
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const itemsPerPage = 8;

  // Calculate stats with total users
  const stats: ConfessionStats = useMemo(() => {
    const uniqueUsers = new Set(confessions.map((c) => c.userName)).size;
    const today = confessions.filter(
      (c) => getTimeFilter(c.timeConfession) === "today"
    );
    const yesterday = confessions.filter(
      (c) => getTimeFilter(c.timeConfession) === "yesterday"
    );
    const lastWeekend = confessions.filter(
      (c) => getTimeFilter(c.timeConfession) === "lastWeekend"
    );

    return {
      total: confessions.length,
      pending: confessions.filter((c) => c.status === "pending").length,
      approved: confessions.filter((c) => c.status === "approved").length,
      rejected: confessions.filter((c) => c.status === "rejected").length,
      totalUsers: uniqueUsers,
      today: today.length,
      yesterday: yesterday.length,
      lastWeekend: lastWeekend.length,
    };
  }, [confessions]);

  // Filter confessions
  const filteredConfessions = useMemo(() => {
    let filtered = confessions;

    if (activeTab !== "all") {
      filtered = filtered.filter((confession) => {
        const timeCategory = getTimeFilter(confession.timeConfession);
        switch (activeTab) {
          case "today":
            return timeCategory === "today";
          case "yesterday":
            return timeCategory === "yesterday";
          case "lastWeekend":
            return timeCategory === "lastWeekend";
          case "pending":
            return confession.status === "pending";
          case "approved":
            return confession.status === "approved";
          default:
            return true;
        }
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (confession) => confession.status === statusFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (confession) =>
          confession.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          confession.userName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          confession.hashtag.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (confession.adminHashtag &&
            confession.adminHashtag
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (confession.adminComment &&
            confession.adminComment
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [confessions, activeTab, statusFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredConfessions.length / itemsPerPage);
  const paginatedConfessions = filteredConfessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (id: number, status: "approved" | "rejected") => {
    setConfessions((prev) =>
      prev.map((confession) =>
        confession.id === id ? { ...confession, status } : confession
      )
    );
  };

  const handleWarning = (id: number, message: string) => {
    setConfessions((prev) =>
      prev.map((confession) =>
        confession.id === id
          ? { ...confession, hasWarning: true, warningMessage: message }
          : confession
      )
    );
  };

  const handleBan = (id: number, reason: string) => {
    setConfessions((prev) =>
      prev.map((confession) =>
        confession.id === id
          ? { ...confession, isBanned: true, banReason: reason }
          : confession
      )
    );
  };

  const handleBulkApprove = () => {
    setConfessions((prev) =>
      prev.map((confession) =>
        selectedConfessions.includes(confession.id)
          ? { ...confession, status: "approved" as const }
          : confession
      )
    );
    setSelectedConfessions([]);
  };

  const handleBulkReject = () => {
    setConfessions((prev) =>
      prev.map((confession) =>
        selectedConfessions.includes(confession.id)
          ? { ...confession, status: "rejected" as const }
          : confession
      )
    );
    setSelectedConfessions([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedConfessions(paginatedConfessions.map((c) => c.id));
    } else {
      setSelectedConfessions([]);
    }
  };

  const handleView = (confession: Confession) => {
    setSelectedConfession(confession);
    setIsModalOpen(true);
  };

  const tabs = [
    { id: "all", label: "All Confessions", count: stats.total },
    { id: "today", label: "Today", count: stats.today },
    { id: "yesterday", label: "Yesterday", count: stats.yesterday },
    { id: "lastWeekend", label: "Last Weekend", count: stats.lastWeekend },
    { id: "pending", label: "Pending", count: stats.pending },
    { id: "approved", label: "Approved", count: stats.approved },
  ];

  return (
    <div className="min-h-screen animate-page-load">
      {/* Header */}
      <div className="animate-header-slide">
        <div className="mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title Section - now aligned left */}
            <div className="flex flex-col text-left px-4 py-6 space-y-2">
              <h1 className="text-3xl sm:text-2xl lg:text-4xl font-bold text-black">
                Confession Dashboard
              </h1>
              <p className="font-light sm:text-lg text-black">
                Manage and review student confessions
              </p>
            </div>

            {/* Button Section */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="flex-1 sm:flex-none"
              >
                <List className="h-4 w-4 mr-2" />
                Table
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="flex-1 sm:flex-none"
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Cards
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-auto">
        {/* Stats Cards */}
        <div className="mb-6 sm:mb-8 animate-stats-cascade stagger-1">
          <StatsCards stats={stats} />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4 sm:mb-6 animate-fade-in stagger-2">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`whitespace-nowrap py-2 sm:py-3 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                <Badge
                  variant="secondary"
                  className={`text-xs transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </Badge>
              </button>
            ))}
          </nav>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in stagger-3">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search confessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 text-gray-600 bg-white"
                />
              </div>

              {/* Bulk Actions */}
              {selectedConfessions.length > 0 && (
                <div className="flex gap-2 animate-slide-up">
                  <Button
                    size="sm"
                    onClick={handleBulkApprove}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve ({selectedConfessions.length})
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleBulkReject}
                    className="flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject ({selectedConfessions.length})
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 lg:flex-none"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
                    Approved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-content-reveal stagger-4">
          {viewMode === "table" ? (
            <ConfessionTableModern
              confessions={paginatedConfessions}
              selectedConfessions={selectedConfessions}
              onSelectionChange={setSelectedConfessions}
              onSelectAll={handleSelectAll}
              onStatusChange={handleStatusChange}
              onView={handleView}
              onWarning={handleWarning}
              onBan={handleBan}
            />
          ) : (
            <ConfessionCards
              confessions={paginatedConfessions}
              selectedConfessions={selectedConfessions}
              onSelectionChange={setSelectedConfessions}
              onStatusChange={handleStatusChange}
              onView={handleView}
              onWarning={handleWarning}
              onBan={handleBan}
            />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm animate-fade-in stagger-5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2 overflow-x-auto">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                return (
                  <Button
                    key={page}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 p-0 flex-shrink-0 ${
                      isActive ? "bg-black text-white hover:bg-black" : ""
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-500 flex-shrink-0">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-8 h-8 p-0 flex-shrink-0 ${
                      currentPage === totalPages
                        ? "bg-black text-white hover:bg-black"
                        : ""
                    }`}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      <div className="animate-modal-entrance">
        <ConfessionModal
          confession={selectedConfession}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
