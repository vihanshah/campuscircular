import React from "react";
import { motion } from "framer-motion";
import { SearchX, RotateCcw, Sparkles } from "lucide-react";
import { CampusResource, SMART_ALTERNATIVES } from "@/lib/discoverData";

interface EmptyStateProps {
  onClearFilters: () => void;
  onSelectResource: (resource: CampusResource) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters, onSelectResource }) => {
  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-8 sm:p-12 text-center space-y-6">
      
      <div className="w-16 h-16 rounded-full bg-[#FEE2E2] text-[#151515] flex items-center justify-center text-3xl mx-auto shadow-xs">
        🔍
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-2xl font-black text-[#151515] tracking-tight">
          Nothing matches those filters.
        </h3>
        <p className="text-sm font-medium text-[#151515]/65">
          Try widening your distance, price, or category search criteria to see available equipment across campus.
        </p>
      </div>

      <button
        type="button"
        onClick={onClearFilters}
        className="px-6 py-3 rounded-full bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Clear filters & Reset search</span>
      </button>

      {/* Suggested Alternatives Preview */}
      <div className="pt-8 border-t border-[#151515]/08 text-left">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/60 mb-4">
          Recommended Campus Gear Nearby:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SMART_ALTERNATIVES.map((alt) => (
            <div
              key={alt.id}
              onClick={() => onSelectResource(alt)}
              className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 hover:border-[#151515]/20 cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FDF0A6] text-[#151515]">
                  ✦ {alt.matchPct}% Match
                </span>
                <h5 className="text-sm font-bold text-[#151515] mt-1">
                  {alt.name}
                </h5>
                <span className="text-xs text-[#151515]/60">
                  {alt.distanceKm} km · {alt.priceDisplay}
                </span>
              </div>
              <span className="text-xs font-black text-[#151515]">View →</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default EmptyState;
