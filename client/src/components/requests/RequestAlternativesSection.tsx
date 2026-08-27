import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { SMART_ALTERNATIVES, CampusResource } from "@/lib/discoverData";
import { useLocation } from "wouter";

export const RequestAlternativesSection: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8DEF8] text-[#151515] flex items-center justify-center font-black text-xs">
            <Sparkles className="w-4 h-4 text-[#B92CFF]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#151515] tracking-tight">
              Looking for something similar?
            </h3>
            <p className="text-xs font-semibold text-[#151515]/55">
              Available alternatives for declined or expired requests
            </p>
          </div>
        </div>

        <span className="text-[10px] font-black uppercase tracking-wider bg-[#FDF0A6] text-[#151515] px-2.5 py-1 rounded-full">
          SMART REPLACEMENT
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SMART_ALTERNATIVES.map((alt) => (
          <motion.div
            key={alt.id}
            whileHover={{ y: -2 }}
            className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#151518] text-[#FDF0A6]">
                  ✦ {alt.matchPct}% Match
                </span>
                <span className="text-[10px] font-bold text-[#151515]/60">
                  {alt.distanceKm} km · {alt.priceDisplay}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-[#151515] leading-tight">
                {alt.name}
              </h4>
              <p className="text-xs font-medium text-[#151515]/65 mt-1">
                {alt.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLocation("/discover")}
              className="mt-3 py-2 px-3 rounded-xl bg-[#FFFDF7] border border-[#151515]/10 text-xs font-bold text-[#151515] hover:bg-[#151518] hover:text-white transition-colors flex items-center justify-between"
            >
              <span>View resource →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default RequestAlternativesSection;
