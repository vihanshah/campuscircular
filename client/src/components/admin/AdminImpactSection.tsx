import React from "react";
import { Leaf, RefreshCw, Users, Wallet, Recycle } from "lucide-react";

export const AdminImpactSection: React.FC = () => {
  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-[#34D399]" />
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Campus impact
          </h3>
        </div>

        <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-[#34D399]/20 text-[#34D399] px-2.5 py-1 rounded-full">
          SUSTAINABILITY METRICS
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 space-y-1">
          <div className="w-7 h-7 rounded-xl bg-[#00F2FE]/20 text-[#00F2FE] flex items-center justify-center mb-1">
            <RefreshCw className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">1,248</div>
          <div className="text-xs font-semibold text-white/70">Resources Circulating</div>
        </div>

        <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 space-y-1">
          <div className="w-7 h-7 rounded-xl bg-[#FFD928]/20 text-[#FFD928] flex items-center justify-center mb-1">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">3,842</div>
          <div className="text-xs font-semibold text-white/70">Successful Exchanges</div>
        </div>

        <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 space-y-1">
          <div className="w-7 h-7 rounded-xl bg-[#34D399]/20 text-[#34D399] flex items-center justify-center mb-1">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-[#34D399]">₹18.6L</div>
          <div className="text-xs font-semibold text-white/70">Student Savings</div>
        </div>

        <div className="bg-[#232332] p-4 rounded-2xl border border-white/06 space-y-1">
          <div className="w-7 h-7 rounded-xl bg-[#B92CFF]/20 text-[#B92CFF] flex items-center justify-center mb-1">
            <Recycle className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">4.8 tonnes</div>
          <div className="text-xs font-semibold text-white/70">Estimated Waste Avoided</div>
        </div>

      </div>

      <p className="text-xs font-bold text-white/60 italic text-center pt-1">
        "Campus Circular is keeping useful resources in circulation."
      </p>

    </div>
  );
};

export default AdminImpactSection;
