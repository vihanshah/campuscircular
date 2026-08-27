import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, X, ArrowRight, ShieldCheck } from "lucide-react";
import { CampusResource } from "@/lib/discoverData";

interface CampusMapViewProps {
  resources: CampusResource[];
  onSelectResource: (resource: CampusResource) => void;
}

function resolveBuildingCoords(res: CampusResource, index: number): { xPct: number; yPct: number } {
  if (res.mapCoords && (res.mapCoords.xPct !== 50 || res.mapCoords.yPct !== 50)) {
    return res.mapCoords;
  }

  const loc = (res.locationName || "").toLowerCase();
  const cat = (res.category || "").toLowerCase();

  // Offset multiplier per index to prevent pin overlap
  const offsetX = (index % 3) * 4 - 4;
  const offsetY = Math.floor(index / 3) * 4 - 2;

  if (loc.includes("tech") || loc.includes("cs") || loc.includes("design") || cat.includes("electronics")) {
    return { xPct: 24 + offsetX, yPct: 26 + offsetY };
  }
  if (loc.includes("eng") || loc.includes("robotics") || loc.includes("block b") || cat.includes("tools") || cat.includes("books")) {
    return { xPct: 60 + offsetX, yPct: 24 + offsetY };
  }
  if (loc.includes("arts") || loc.includes("media") || loc.includes("radio") || cat.includes("photography") || cat.includes("creative") || cat.includes("events")) {
    return { xPct: 32 + offsetX, yPct: 74 + offsetY };
  }
  if (loc.includes("sport") || loc.includes("gym") || cat.includes("sports")) {
    return { xPct: 78 + offsetX, yPct: 68 + offsetY };
  }

  return { xPct: 48 + offsetX, yPct: 48 + offsetY };
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({ resources, onSelectResource }) => {
  const [selectedPin, setSelectedPin] = useState<CampusResource | null>(resources[0] || null);

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
      
      {/* Map Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#151518] text-[#FDF0A6] flex items-center justify-center font-black text-xs">
            📍
          </div>
          <div>
            <h3 className="text-base font-black text-[#151515] tracking-tight">
              Interactive TSEC Campus Map
            </h3>
            <p className="text-[11px] text-[#151515]/55 font-medium">
              Click pins to inspect resources nearby
            </p>
          </div>
        </div>

        <div className="text-xs font-bold text-[#151515]/60 bg-[#F3EFE6] px-3 py-1 rounded-full border border-[#151515]/10">
          {resources.length} Pins Active
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full aspect-[16/9] bg-[#F4F1E8] border border-[#151515]/10 rounded-2xl overflow-hidden select-none">
        
        {/* Campus Map Vector Lines & Zones */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1000 600" fill="none">
          {/* Roads & Pathways */}
          <path d="M 100 300 Q 500 200 900 350" stroke="#151515" strokeWidth="24" strokeLinecap="round" />
          <path d="M 350 100 L 350 500" stroke="#151515" strokeWidth="18" />
          <path d="M 650 100 L 650 500" stroke="#151515" strokeWidth="18" />
          
          {/* Building Outlines */}
          <rect x="180" y="120" width="140" height="90" rx="12" fill="#151515" opacity="0.15" />
          <rect x="520" y="100" width="160" height="100" rx="12" fill="#151515" opacity="0.15" />
          <rect x="240" y="380" width="150" height="110" rx="12" fill="#151515" opacity="0.15" />
          <rect x="700" y="320" width="180" height="130" rx="12" fill="#151515" opacity="0.15" />
        </svg>

        {/* Building Labels */}
        <div className="absolute top-[18%] left-[20%] text-[10px] font-black uppercase text-[#151515]/50 tracking-wider bg-white/70 px-2 py-0.5 rounded-md border border-[#151515]/10">
          Tech Hub / CS Dept
        </div>
        <div className="absolute top-[14%] left-[54%] text-[10px] font-black uppercase text-[#151515]/50 tracking-wider bg-white/70 px-2 py-0.5 rounded-md border border-[#151515]/10">
          Eng Block B
        </div>
        <div className="absolute top-[68%] left-[26%] text-[10px] font-black uppercase text-[#151515]/50 tracking-wider bg-white/70 px-2 py-0.5 rounded-md border border-[#151515]/10">
          Arts & Media Wing
        </div>
        <div className="absolute top-[60%] left-[72%] text-[10px] font-black uppercase text-[#151515]/50 tracking-wider bg-white/70 px-2 py-0.5 rounded-md border border-[#151515]/10">
          Sports Complex
        </div>

        {/* Resource Pins on Map */}
        {resources.map((res, index) => {
          const isSelected = selectedPin?.id === res.id;
          const coords = resolveBuildingCoords(res, index);

          return (
            <motion.button
              key={res.id}
              onClick={() => setSelectedPin(res)}
              whileHover={{ scale: 1.25, zIndex: 40 }}
              whileTap={{ scale: 0.9 }}
              className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${coords.xPct}%`,
                top: `${coords.yPct}%`,
              }}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shadow-md border-2 transition-all ${
                  isSelected
                    ? "bg-[#151518] text-[#FDF0A6] border-white ring-4 ring-[#B92CFF]/40 scale-110"
                    : "bg-[#FFFDF7] text-[#151515] border-[#151515]/20 hover:bg-[#FDF0A6]"
                }`}
                style={{
                  backgroundColor: isSelected ? "#151518" : res.cardColor,
                }}
              >
                <span>📍</span>
              </div>

              {/* Pin Label Pill */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#151518] text-white text-[9px] font-extrabold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none z-50 border border-white/20">
                {res.name.substring(0, 18)}...
              </div>
            </motion.button>
          );
        })}

        {/* Selected Pin Floating Popup Card */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-84 bg-[#FFFDF7] border border-[#151515]/10 rounded-2xl p-4 shadow-2xl z-40"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
                  style={{ backgroundColor: selectedPin.cardColor }}
                >
                  {selectedPin.category}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedPin(null)}
                  className="text-[#151515]/40 hover:text-[#151515]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-sm font-extrabold text-[#151515] leading-snug">
                {selectedPin.name}
              </h4>

              <div className="flex items-center justify-between text-xs text-[#151515]/70 font-semibold my-2">
                <span>📍 {selectedPin.distanceKm} km ({selectedPin.locationName})</span>
                <span className="font-extrabold text-[#151515]">{selectedPin.priceDisplay}</span>
              </div>

              <button
                type="button"
                onClick={() => onSelectResource(selectedPin)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>View Resource Details →</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};

export default CampusMapView;
