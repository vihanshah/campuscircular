import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check, Sparkles, HeartHandshake } from "lucide-react";
import { StudentProfile } from "@/lib/profileData";

interface TrustScoreCardProps {
  profile: StudentProfile;
}

export const TrustScoreCard: React.FC<TrustScoreCardProps> = ({ profile }) => {
  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-5">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#B92CFF]" />
          <h3 className="text-xl font-black text-[#151515] tracking-tight">
            Campus Trust Score
          </h3>
        </div>

        <span className="text-[10px] font-black uppercase tracking-wider bg-[#E2F1D0] text-[#15803D] px-2.5 py-1 rounded-full">
          HIGH TRUST
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#F8F6F0] p-5 rounded-2xl border border-[#151515]/06">
        
        {/* Ring / Gauge Visualization */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#151515"
              strokeWidth="8"
              opacity="0.1"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#B92CFF"
              strokeWidth="8"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 * (1 - profile.trustScore / 100) }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-[#151515] leading-none">
              {profile.trustScore}
            </span>
            <span className="text-[9px] font-extrabold uppercase text-[#151515]/50 tracking-wider mt-0.5">
              Score
            </span>
          </div>
        </div>

        {/* Breakdown Checkmarks */}
        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#151515]">
            <Check className="w-4 h-4 text-[#34D399] shrink-0 stroke-[3]" />
            <span>Identity verified via official college domain (.edu)</span>
          </div>

          <div className="flex items-center gap-2 font-bold text-[#151515]">
            <Check className="w-4 h-4 text-[#34D399] shrink-0 stroke-[3]" />
            <span>{profile.successfulExchanges} successful gear exchanges completed</span>
          </div>

          <div className="flex items-center gap-2 font-bold text-[#151515]">
            <Check className="w-4 h-4 text-[#34D399] shrink-0 stroke-[3]" />
            <span>{profile.ontimeReturnPct}% on-time return track record</span>
          </div>

          <div className="flex items-center gap-2 font-bold text-[#151515]">
            <Check className="w-4 h-4 text-[#34D399] shrink-0 stroke-[3]" />
            <span>{profile.unresolvedDisputes} unresolved disputes or damage claims</span>
          </div>
        </div>

      </div>

      <p className="text-xs font-semibold text-[#151515]/65 italic leading-relaxed">
        💡 Your Trust Score reflects successful exchanges, timely returns, ratings and responsible borrowing within your campus community.
      </p>

    </div>
  );
};

export default TrustScoreCard;
