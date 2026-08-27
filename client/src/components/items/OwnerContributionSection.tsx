import React from "react";
import { motion } from "framer-motion";
import { Sparkles, HeartHandshake, Wallet, Users, RefreshCw } from "lucide-react";

export const OwnerContributionSection: React.FC = () => {
  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#B92CFF]" />
          <h3 className="text-xl font-black text-[#151515] tracking-tight">
            Your contribution to campus
          </h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider bg-[#E2F1D0] text-[#15803D] px-2.5 py-1 rounded-full">
          COMMUNITY IMPACT
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06">
          <div className="w-7 h-7 rounded-xl bg-[#FFD928] text-[#151515] flex items-center justify-center mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#151515]">14</div>
          <div className="text-xs font-semibold text-[#151515]/65">Successful Loans</div>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06">
          <div className="w-7 h-7 rounded-xl bg-[#CDEFEA] text-[#151515] flex items-center justify-center mb-2">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#151515]">₹5,200</div>
          <div className="text-xs font-semibold text-[#151515]/65">Earned & Saved</div>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06">
          <div className="w-7 h-7 rounded-xl bg-[#E8DEF8] text-[#151515] flex items-center justify-center mb-2">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#151515]">23</div>
          <div className="text-xs font-semibold text-[#151515]/65">Students Helped</div>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06">
          <div className="w-7 h-7 rounded-xl bg-[#E2F1D0] text-[#15803D] flex items-center justify-center mb-2">
            <RefreshCw className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#151515]">8</div>
          <div className="text-xs font-semibold text-[#151515]/65">Resources in Motion</div>
        </div>
      </div>

    </div>
  );
};

export default OwnerContributionSection;
