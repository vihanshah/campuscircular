import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Filter, 
  MapPin, 
  List, 
  Map, 
  ChevronDown, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  X
} from "lucide-react";
import { CampusDeiHeader } from "@/components/CampusDeiHeader";
import { AppFooter } from "@/components/AppFooter";
import { MOCK_DISCOVER_RESOURCES, CampusResource } from "@/lib/discoverData";
import { ResourceCard } from "@/components/discover/ResourceCard";
import { DiscoverFilterPanel, FilterState } from "@/components/discover/DiscoverFilterPanel";
import { CampusMapView } from "@/components/discover/CampusMapView";
import { SmartAlternatives } from "@/components/discover/SmartAlternatives";
import { EmptyState } from "@/components/discover/EmptyState";
import { AiAssistModal } from "@/components/discover/AiAssistModal";
import { ResourceDetailsModal } from "@/components/discover/ResourceDetailsModal";
import { loadAppStore } from "@/lib/appStore";

const CATEGORIES = [
  { id: "All", label: "All" },
  { id: "Photography", label: "📷 Photography" },
  { id: "Electronics", label: "💻 Electronics" },
  { id: "Books", label: "📚 Books" },
  { id: "Music", label: "🎸 Music" },
  { id: "Sports", label: "🏏 Sports" },
  { id: "Events", label: "🎤 Events" },
  { id: "Tools", label: "🛠 Tools" },
  { id: "Creative", label: "🎨 Creative" },
];

const SORT_OPTIONS = [
  "Best Match",
  "Nearest",
  "Lowest Price",
  "Highest Rated",
  "Recently Added"
] as const;

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    try {
      const cat = new URLSearchParams(window.location.search).get("category");
      return cat || "All";
    } catch {
      return "All";
    }
  });
  const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]>("Best Match");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  React.useEffect(() => {
    try {
      const cat = new URLSearchParams(window.location.search).get("category");
      if (cat) {
        setSelectedCategory(cat);
      }
    } catch {}
  }, [window.location.search]);
  const [selectedResource, setSelectedResource] = useState<CampusResource | null>(null);
  const [borrowSuccessMsg, setBorrowSuccessMsg] = useState<string | null>(null);

  // Initial Filter State
  const [filters, setFilters] = useState<FilterState>({
    availability: "Any",
    distance: "Any",
    condition: "Any",
    price: "Any",
    trust: "Any",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      availability: "Any",
      distance: "Any",
      condition: "Any",
      price: "Any",
      trust: "Any",
    });
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // Filtered & Sorted Resource Calculation
  const filteredResources = useMemo(() => {
    const store = loadAppStore();
    const allResources = store.resources;
    return allResources.filter((res) => {
      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = res.name.toLowerCase().includes(q);
        const matchesCategory = res.category.toLowerCase().includes(q);
        const matchesDesc = res.description.toLowerCase().includes(q);
        const matchesOwner = res.ownerName.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesOwner) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "All" && res.category !== selectedCategory) {
        return false;
      }

      // Availability
      if (filters.availability === "Available now" && !res.isAvailableNow) {
        return false;
      }

      // Distance
      if (filters.distance === "Under 1 km" && res.distanceKm > 1.0) return false;
      if (filters.distance === "Under 3 km" && res.distanceKm > 3.0) return false;
      if (filters.distance === "Under 5 km" && res.distanceKm > 5.0) return false;

      // Condition
      if (filters.condition !== "Any" && res.condition !== filters.condition) return false;

      // Price
      if (filters.price === "Free" && res.pricePerDay !== 0) return false;
      if (filters.price === "Under ₹100/day" && res.pricePerDay > 100) return false;
      if (filters.price === "Under ₹250/day" && res.pricePerDay > 250) return false;

      // Trust
      if (filters.trust === "Verified owners" && !res.isOwnerVerified) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "Nearest") return a.distanceKm - b.distanceKm;
      if (sortBy === "Lowest Price") return a.pricePerDay - b.pricePerDay;
      if (sortBy === "Highest Rated") return b.rating - a.rating;
      // Default: Best Match
      return b.matchPct - a.matchPct;
    });
  }, [searchQuery, selectedCategory, filters, sortBy]);

  const handleRequestBorrow = () => {
    if (selectedResource) {
      setBorrowSuccessMsg(`Borrow request for ${selectedResource.name} sent to ${selectedResource.ownerName}!`);
      setTimeout(() => {
        setBorrowSuccessMsg(null);
        setSelectedResource(null);
      }, 2400);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#151515] font-sans selection:bg-[#FFD928] selection:text-[#151515] relative pb-20">
      
      {/* Top Header */}
      <CampusDeiHeader />

      {/* Main Discover Layout Container */}
      <main className="container max-w-[1380px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8 pb-12">
        
        {/* PAGE HEADER SECTION */}
        <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-6 sm:p-8 mb-8 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#E8DEF8] text-[#151515] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Resource Network</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#151515] tracking-tight leading-tight">
              Discover resources
            </h1>

            <p className="text-sm sm:text-base font-semibold text-[#151515]/70 max-w-xl leading-relaxed">
              Find what you need nearby, quickly, and from people across your campus.
            </p>
          </div>

          {/* SEARCH BAR & AI ASSIST ENTRY POINT */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-3">
            
            {/* Search Input Box */}
            <div className="flex-1 relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#151515]/40">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cameras, laptops, books, projectors..."
                className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl pl-12 pr-28 py-3.5 text-sm font-semibold text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#151518] transition-all shadow-xs"
              />
              <button
                type="button"
                className="absolute right-2 px-4 py-2 rounded-xl bg-[#151518] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#B92CFF] transition-colors"
              >
                Search
              </button>
            </div>

            {/* ✨ Describe what you need Button (AI Smart Assistant Entry Point) */}
            <button
              type="button"
              onClick={() => setShowAiModal(true)}
              className="px-5 py-3.5 rounded-2xl bg-[#FDF0A6] text-[#151515] hover:bg-[#FFF3C4] border border-[#151515]/10 transition-all font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#151515]" />
              <span>✨ Describe what you need</span>
            </button>

          </div>

          {/* CATEGORY NAV HORIZONTAL PILLS */}
          <div className="mt-6 pt-5 border-t border-[#151515]/08 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? "bg-[#151518] text-[#FFFDF7] shadow-xs"
                      : "bg-[#F3EFE6] text-[#151515]/75 hover:text-[#151515] hover:bg-[#E8E4DA]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* RESULTS BAR & CONTROLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          
          <div className="flex items-center gap-3">
            <span className="text-base font-black text-[#151515]">
              {filteredResources.length} resources available
            </span>
            {selectedCategory !== "All" && (
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#E8DEF8] text-[#151515]">
                Category: {selectedCategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            
            {/* Mobile Filter Sheet Trigger Button */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden px-4 py-2 rounded-full bg-[#FFFDF7] border border-[#151515]/10 text-xs font-bold text-[#151515] flex items-center gap-1.5 shadow-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-[#FFFDF7] border border-[#151515]/10 px-3 py-1.5 rounded-full shadow-xs text-xs font-bold text-[#151515]">
              <span className="text-[#151515]/50 uppercase text-[10px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-extrabold focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* List / Map View Toggle */}
            <div className="bg-[#FFFDF7] border border-[#151515]/10 p-1 rounded-full flex items-center shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1 transition-all ${
                  viewMode === "list"
                    ? "bg-[#151518] text-white"
                    : "text-[#151515]/60 hover:text-[#151515]"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1 transition-all ${
                  viewMode === "map"
                    ? "bg-[#151518] text-white"
                    : "text-[#151515]/60 hover:text-[#151515]"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>

          </div>

        </div>

        {/* MAIN DISCOVER CONTENT GRID (Desktop Left Filter + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* Desktop Left Filter Panel */}
          <div className="hidden lg:block sticky top-24">
            <DiscoverFilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Right Main Results View */}
          <div className="space-y-8">
            
            {viewMode === "map" ? (
              <CampusMapView
                resources={filteredResources}
                onSelectResource={(res) => setSelectedResource(res)}
              />
            ) : (
              <>
                {filteredResources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResources.map((res) => (
                      <ResourceCard
                        key={res.id}
                        resource={res}
                        onSelect={(r) => setSelectedResource(r)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    onClearFilters={handleClearFilters}
                    onSelectResource={(r) => setSelectedResource(r)}
                  />
                )}
              </>
            )}

            {/* Smart Alternatives Recommendation Strip */}
            <SmartAlternatives
              onSelectResource={(r) => setSelectedResource(r)}
            />

          </div>

        </div>

      </main>

      {/* MOBILE FILTER DRAWER SHEET */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-sm bg-[#FFFDF7] h-full overflow-y-auto p-4"
            >
              <DiscoverFilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onCloseMobileDrawer={() => setShowMobileFilters(false)}
                isMobileDrawer
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI ASSIST MODAL */}
      <AiAssistModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onSelectResource={(res) => setSelectedResource(res)}
      />

      {/* RESOURCE DETAILS & BORROW REQUEST + AGREEMENT FLOW MODAL */}
      <ResourceDetailsModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      <AppFooter />
    </div>
  );
}
