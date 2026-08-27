import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Laptop, 
  BookOpen, 
  Music, 
  Tv, 
  Dumbbell, 
  Wrench, 
  Sparkles, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Check,
  Clock,
  X
} from "lucide-react";
import { CampusResource } from "@/lib/discoverData";
import { BRAND_COLORS } from "@/lib/theme";

interface ResourceCardProps {
  resource: CampusResource;
  onSelect?: (resource: CampusResource) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Photography: Camera,
  Electronics: Laptop,
  Books: BookOpen,
  Music: Music,
  Sports: Dumbbell,
  Events: Tv,
  Tools: Wrench,
  Creative: Sparkles,
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelect }) => {
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const IconComp = CATEGORY_ICONS[resource.category] || Sparkles;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] rounded-3xl p-5 flex flex-col justify-between relative group overflow-hidden"
    >
      <div>
        
        {/* Top Header Row: Category Badge & Smart Match % Chip */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-[#151515]"
              style={{ backgroundColor: resource.cardColor }}
            >
              {resource.category}
            </span>

            <span className="text-[10px] font-bold text-[#151515]/70 bg-[#F3EFE6] px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              <span>Available</span>
            </span>
          </div>

          {/* Signature Smart Match % Badge */}
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowMatchDetails(true)}
              onMouseLeave={() => setShowMatchDetails(false)}
              onClick={() => setShowMatchDetails(!showMatchDetails)}
              className="px-2.5 py-1 rounded-full bg-[#151518] text-[#FDF0A6] text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs hover:bg-[#B92CFF] hover:text-white transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#FDF0A6]" />
              <span>✦ {resource.matchPct}% Match</span>
            </button>

            {/* Smart Match Breakdown Dropdown */}
            <AnimatePresence>
              {showMatchDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute right-0 top-8 z-30 w-56 bg-[#151518] text-white p-3 rounded-2xl shadow-xl border border-white/10 text-[11px] space-y-1.5 pointer-events-none"
                >
                  <div className="font-extrabold text-[#FDF0A6] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FDF0A6]" />
                    <span>Why {resource.matchPct}% Match?</span>
                  </div>
                  {resource.matchReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-white/80 font-medium leading-tight">
                      <Check className="w-3 h-3 text-[#34D399] shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnail Illustration & Title Box */}
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-[#151515]/06 shadow-xs"
            style={{ backgroundColor: resource.cardColor }}
          >
            <IconComp className="w-6 h-6 text-[#151515]" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-base font-extrabold text-[#151515] tracking-tight leading-snug group-hover:text-[#B92CFF] transition-colors">
              {resource.name}
            </h3>

            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#151515]/65 font-semibold">
              <span className="flex items-center gap-0.5 text-[#EAB308]">
                <Star className="w-3 h-3 fill-current" />
                <strong className="text-[#151515]">{resource.rating}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-[#151515]">
                <MapPin className="w-3 h-3 text-[#151515]/40" />
                <span>{resource.distanceKm} km ({resource.locationName})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Condition & Description */}
        <p className="text-xs font-medium text-[#151515]/75 line-clamp-2 mb-3 leading-relaxed">
          {resource.description}
        </p>

        {/* Owner & Pricing Bar */}
        <div className="bg-[#F8F6F0] rounded-2xl p-3 mb-4 flex items-center justify-between text-xs border border-[#151515]/06">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#151518] text-white flex items-center justify-center font-black text-[10px]">
              {resource.ownerAvatar}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-[#151515]/45 uppercase leading-none">Owner</span>
              <span className="font-extrabold text-[#151515] flex items-center gap-1 mt-0.5">
                <span>{resource.ownerName.split(" ")[0]}</span>
                {resource.isOwnerVerified && <ShieldCheck className="w-3 h-3 text-[#34D399]" />}
              </span>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-sm font-black text-[#151515] leading-none">
              {resource.priceDisplay}
            </span>
            <span className="text-[10px] text-[#151515]/50 font-medium mt-0.5">
              {resource.depositDisplay}
            </span>
          </div>
        </div>

      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => onSelect && onSelect(resource)}
        className="w-full py-3 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-all duration-150 flex items-center justify-center gap-2 shadow-xs"
      >
        <span>View resource →</span>
      </button>

    </motion.div>
  );
};

export default ResourceCard;
