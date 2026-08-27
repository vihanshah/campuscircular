import React from "react";
import { ShieldCheck, Check } from "lucide-react";

export const VerificationCard: React.FC = () => {
  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-3">
      
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-[#34D399]" />
        <h3 className="text-xl font-black text-[#151515] tracking-tight">
          Verification
        </h3>
      </div>

      <div className="bg-[#D7F3EB]/50 border border-[#34D399]/30 rounded-2xl p-4 space-y-2 text-xs font-bold text-[#151515]">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-[#15803D] stroke-[3]" />
          <span>College identity verified (.edu domain)</span>
        </div>

        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-[#15803D] stroke-[3]" />
          <span>Student account verified</span>
        </div>
      </div>

    </div>
  );
};

export default VerificationCard;
