import React from "react";
import { motion } from "framer-motion";
import { Leaf, RefreshCw, Users, Wallet } from "lucide-react";
import { StudentProfile } from "@/lib/profileData";

interface ImpactSectionProps {
  profile: StudentProfile;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ profile }) => {
  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#E2F1D0] text-[#15803D] flex items-center justify-center">
            <Leaf className="w-4 h-4" />
          </div>
          <h3 className="text-xl font-black text-[#151515] tracking-tight">
            Your impact
          </h3>
        </div>

        <span className="text-[10px] font-black uppercase tracking-wider bg-[#E2F1D0] text-[#15803D] px-2.5 py-1 rounded-full">
          SUSTAINABILITY
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-1.5">
          <div className="w-7 h-7 rounded-xl bg-[#151518] text-[#FDF0A6] flex items-center justify-center">
            <RefreshCw className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#151515]">
            {profile.resourcesCirculatingCount}
          </div>
          <div className="text-xs font-bold text-[#151515]/75 leading-snug">
            Resources kept in circulation
          </div>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-1.5">
          <div className="w-7 h-7 rounded-xl bg-[#FFD928] text-[#151515] flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#151515]">
            {profile.studentsHelpedCount}
          </div>
          <div className="text-xs font-bold text-[#151515]/75 leading-snug">
            Students helped
          </div>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-1.5">
          <div className="w-7 h-7 rounded-xl bg-[#D7F3EB] text-[#15803D] flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#15803D]">
            {profile.estimatedSavingsDisplay}
          </div>
          <div className="text-xs font-bold text-[#151515]/75 leading-snug">
            Estimated savings generated
          </div>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-1.5">
          <div className="w-7 h-7 rounded-xl bg-[#E2F1D0] text-[#15803D] flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5" />
          </div>
          <div className="text-xl font-black text-[#151515] tracking-tight">
            Zero Waste
          </div>
          <div className="text-xs font-bold text-[#151515]/75 leading-snug">
            Reduced unnecessary purchases
          </div>
        </div>

      </div>

      <p className="text-xs font-bold text-[#151515]/65 italic text-center pt-1">
        "Every share keeps useful resources moving through campus."
      </p>

    </div>
  );
};

export default ImpactSection;
