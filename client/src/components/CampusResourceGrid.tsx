import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, 
  Camera, 
  BookOpen, 
  Music, 
  Tv, 
  Mic, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Check
} from "lucide-react";
import { BRAND_COLORS } from "@/lib/theme";
import { ResourceDetailsModal } from "@/components/discover/ResourceDetailsModal";
import { GooeyNav } from "@/components/ui/GooeyNav";

interface ResourceCard {
  id: string;
  name: string;
  category: "Tech" | "Creative" | "Academic" | "Music" | "Events";
  location: string;
  distance: string;
  owner: string;
  ownerBadge: string;
  status: "Available" | "Reserved";
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  tagColor: string;
  deposit: string;
  maxDays: string;
}

const RESOURCES: ResourceCard[] = [
  {
    id: "sony-camera",
    name: "Sony Alpha A7 IV Camera",
    category: "Creative",
    location: "Photography Club · Arts Block",
    distance: "2.1 km",
    owner: "Maya (Film Guild)",
    ownerBadge: "Top Lender",
    status: "Available",
    icon: Camera,
    accentColor: BRAND_COLORS.pastelLavender, // Soft Lavender #E8DEF8
    tagColor: "#F3E8FF",
    deposit: "Free with ID",
    maxDays: "3 Days",
  },
  {
    id: "projector",
    name: "HD 4K Portable Projector",
    category: "Events",
    location: "Media Lab · Student Center",
    distance: "1.2 km",
    owner: "Film Guild Exec",
    ownerBadge: "Verified Club",
    status: "Available",
    icon: Tv,
    accentColor: BRAND_COLORS.pastelLime, // Soft Sage #E2F1D0
    tagColor: "#ECFCCB",
    deposit: "Free with ID",
    maxDays: "2 Days",
  },
  {
    id: "macbook-pro",
    name: "MacBook Pro M2 (16GB)",
    category: "Tech",
    location: "CS Dept · Tech Hub",
    distance: "0.5 km",
    owner: "Dev (CS '25)",
    ownerBadge: "Verified Student",
    status: "Available",
    icon: Laptop,
    accentColor: BRAND_COLORS.pastelYellow, // Soft Butter Yellow #FDF0A6
    tagColor: "#FEF08A",
    deposit: "Free with ID",
    maxDays: "5 Days",
  },
  {
    id: "calculator",
    name: "Scientific Calculator & AI Texts",
    category: "Academic",
    location: "Engineering Block B",
    distance: "0.8 km",
    owner: "Sarah (Math Honor)",
    ownerBadge: "Honor Student",
    status: "Available",
    icon: BookOpen,
    accentColor: BRAND_COLORS.pastelMint, // Soft Mint #D7F3EB
    tagColor: "#CCFBF1",
    deposit: "Free with ID",
    maxDays: "7 Days",
  },
  {
    id: "guitar",
    name: "Yamaha F310 Acoustic Guitar",
    category: "Music",
    location: "Student Community · Dorm B",
    distance: "1.8 km",
    owner: "Chris (Music Club)",
    ownerBadge: "Active Member",
    status: "Available",
    icon: Music,
    accentColor: BRAND_COLORS.pastelCoral, // Soft Coral #FEE2E2
    tagColor: "#FEE2E2",
    deposit: "Free with ID",
    maxDays: "4 Days",
  },
  {
    id: "shure-mic",
    name: "Shure SM7B Studio Podcast Mic",
    category: "Creative",
    location: "Campus Radio Station",
    distance: "1.4 km",
    owner: "Radio Exec",
    ownerBadge: "Station Manager",
    status: "Available",
    icon: Mic,
    accentColor: BRAND_COLORS.pastelLavender,
    tagColor: "#F3E8FF",
    deposit: "Free with ID",
    maxDays: "2 Days",
  },
];

const CATEGORIES = ["All", "Tech", "Creative", "Academic", "Music", "Events"] as const;

export const CampusResourceGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<ResourceCard | null>(null);
  const [borrowedSuccess, setBorrowedSuccess] = useState<string | null>(null);

  const filteredResources = activeCategory === "All"
    ? RESOURCES
    : RESOURCES.filter((r) => r.category === activeCategory);

  const handleBorrowClick = (item: ResourceCard) => {
    setSelectedItem(item);
  };

  const handleConfirmBorrow = () => {
    if (selectedItem) {
      setBorrowedSuccess(`Borrow request for ${selectedItem.name} submitted successfully!`);
      setTimeout(() => {
        setBorrowedSuccess(null);
        setSelectedItem(null);
      }, 2000);
    }
  };

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7">
      
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#151515] tracking-tight">
            Resources You Might Need
          </h2>
          <p className="text-xs font-medium text-[#151515]/55 mt-0.5">
            Verified equipment available for loan across campus today
          </p>
        </div>

        {/* GooeyNav Category Filters */}
        <div>
          <GooeyNav
            items={CATEGORIES.map((cat) => ({ id: cat, label: cat === "All" ? "ALL" : cat.toUpperCase() }))}
            initialActiveIndex={Math.max(0, CATEGORIES.indexOf(activeCategory as any))}
            onSelect={(index, item) => {
              setActiveCategory(item.id || CATEGORIES[index]);
            }}
            particleCount={12}
            animationTime={500}
          />
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => {
          const IconComp = res.icon;

          return (
            <motion.div
              key={res.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-[#FFFDF7] border border-[#151515]/06 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] rounded-3xl p-5 flex flex-col justify-between relative group overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
                    style={{ backgroundColor: res.tagColor }}
                  >
                    {res.category}
                  </span>

                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#E2F1D0] text-[#151515]">
                    ✓ {res.status}
                  </span>
                </div>

                <div className="flex items-start gap-3.5 mb-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-[#151515]/06"
                    style={{ backgroundColor: res.accentColor }}
                  >
                    <IconComp className="w-5 h-5 text-[#151515]" />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-base font-extrabold text-[#151515] tracking-tight leading-snug group-hover:text-[#B92CFF] transition-colors">
                      {res.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#151515]/65 font-medium mt-1">
                      <MapPin className="w-3 h-3 text-[#151515]/40 shrink-0" />
                      <span>{res.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F3EFE6]/70 rounded-2xl p-3 my-3 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#151515]/50 uppercase">Owner</span>
                    <span className="font-extrabold text-[#151515]">{res.owner}</span>
                  </div>

                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-[#151515]/50 uppercase">Max Term</span>
                    <span className="font-extrabold text-[#151515]">{res.maxDays}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleBorrowClick(res)}
                className="w-full py-3 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider bg-[#151515] text-[#FFFDF7] hover:bg-[#FDF0A6] hover:text-[#151515] transition-all duration-150 flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Borrow →</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* UNIFIED RESOURCE DETAILS & BORROW REQUEST + AGREEMENT MODAL */}
      <ResourceDetailsModal
        resource={
          selectedItem
            ? {
                id: selectedItem.id,
                name: selectedItem.name,
                category: selectedItem.category === "Tech" ? "Electronics" : (selectedItem.category as any),
                availability: "Available now",
                isAvailableNow: true,
                distanceKm: parseFloat(selectedItem.distance) || 0.8,
                locationName: selectedItem.location,
                condition: "Excellent",
                rating: 4.9,
                ownerName: selectedItem.owner,
                ownerAvatar: selectedItem.owner.charAt(0),
                isOwnerVerified: true,
                ownerTrustScore: "High Trust",
                pricePerDay: selectedItem.category === "Creative" ? 120 : 0,
                priceDisplay: selectedItem.category === "Creative" ? "₹120/day" : "Free",
                depositDisplay: selectedItem.deposit,
                matchPct: 96,
                matchReasons: ["Available immediately", `${selectedItem.distance} away`, "Verified campus lender"],
                description: `${selectedItem.name} available for campus borrowing from ${selectedItem.owner}. Includes all standard accessories.`,
                cardColor: selectedItem.accentColor,
                mapCoords: { xPct: 50, yPct: 50 },
              }
            : null
        }
        onClose={() => setSelectedItem(null)}
      />

    </div>
  );
};

export default CampusResourceGrid;
