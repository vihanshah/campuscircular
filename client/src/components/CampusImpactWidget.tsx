import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, RefreshCw, Sparkles, HeartHandshake, Coins, X, CheckCircle2, Award, TreePine } from "lucide-react";
import { COMMUNITY_STATS } from "@/lib/theme";

export const CampusImpactWidget: React.FC = () => {
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-5">
        {/* COMMUNITY IMPACT PROOF WIDGET */}
        <div className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[32px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B92CFF]" />
              <h3 className="text-lg font-black text-[#151515] tracking-tight">
                Community Impact
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsProofModalOpen(true)}
              className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#FFD928] text-[#151515] hover:bg-[#FFE66D] transition-colors cursor-pointer shadow-xs"
            >
              Proof
            </button>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => setIsProofModalOpen(true)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F3EFE6]/70 border border-[#151515]/06 hover:border-[#151515]/20 hover:bg-[#F3EFE6] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#B92CFF] text-[#FFFDF7] flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  ♻
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#151515]">{COMMUNITY_STATS.shared} Resources</span>
                  <span className="text-[10px] font-medium text-[#151515]/60">Shared on campus</span>
                </div>
              </div>
              <span className="text-xs font-black text-[#B92CFF]">Active</span>
            </div>

            <div
              onClick={() => setIsProofModalOpen(true)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F3EFE6]/70 border border-[#151515]/06 hover:border-[#151515]/20 hover:bg-[#F3EFE6] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFD928] text-[#151515] flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  🤝
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#151515]">{COMMUNITY_STATS.exchanges} Exchanges</span>
                  <span className="text-[10px] font-medium text-[#151515]/60">Completed on time</span>
                </div>
              </div>
              <span className="text-xs font-black text-[#151515]">100% Trust</span>
            </div>

            <div
              onClick={() => setIsProofModalOpen(true)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F3EFE6]/70 border border-[#151515]/06 hover:border-[#151515]/20 hover:bg-[#F3EFE6] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FF6755] text-[#FFFDF7] flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  💰
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#151515]">{COMMUNITY_STATS.saved} Saved</span>
                  <span className="text-[10px] font-medium text-[#151515]/60">Total student savings</span>
                </div>
              </div>
              <span className="text-xs font-black text-[#FF6755]">Eco Impact</span>
            </div>
          </div>
        </div>

        {/* VERIFIED CAMPUS COMMUNITY TRUST WIDGET */}
        <div className="bg-[#CDEFEA]/40 border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[32px] p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#151515] text-[#D8FF32] flex items-center justify-center text-sm font-black shrink-0 mt-0.5">
              ✓
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-black text-[#151515] leading-tight">
                Verified Campus Community
              </h4>
              <p className="text-xs font-medium text-[#151515]/70 leading-relaxed mt-1">
                Your college identity (.edu) keeps all equipment exchanges trusted, safe, and accountable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMMUNITY IMPACT PROOF MODAL */}
      <AnimatePresence>
        {isProofModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#151515]/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsProofModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_24px_60px_rgba(0,0,0,0.2)] rounded-[32px] p-6 sm:p-8 max-w-md w-full relative overflow-hidden space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#D8FF32] text-[#151515] flex items-center justify-center font-black">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#151515]">Impact & Trust Proof</h3>
                    <p className="text-xs font-semibold text-[#151515]/60">Verified campus sustainability metrics</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProofModalOpen(false)}
                  className="p-1.5 text-[#151515]/40 hover:text-[#151515] hover:bg-[#F3EFE6] rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metrics Breakdown List */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#E8DEF8]/40 border border-[#B92CFF]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#B92CFF] text-white flex items-center justify-center font-bold text-sm">
                      ♻
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#151515]">1,248 Active Gear Listings</div>
                      <div className="text-[10px] text-[#151515]/60 font-medium">98.4% student equipment utilization</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#B92CFF]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#FDF0A6]/40 border border-[#FFD928]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFD928] text-[#151515] flex items-center justify-center font-bold text-sm">
                      🤝
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#151515]">842 Verified On-Time Returns</div>
                      <div className="text-[10px] text-[#151515]/60 font-medium">Zero lost or unreturned items</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#151515]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#FEE2E2]/50 border border-[#FF6755]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FF6755] text-white flex items-center justify-center font-bold text-sm">
                      💰
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#151515]">₹2.4 Lakhs Total Savings</div>
                      <div className="text-[10px] text-[#151515]/60 font-medium">Average ₹3,800 saved per student</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#FF6755]" />
                </div>

                <div className="p-4 rounded-2xl bg-[#D7F3EB] border border-[#34D399]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#15803D] text-white flex items-center justify-center font-bold text-sm">
                      <TreePine className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#151515]">45kg CO2 Offset Per Student</div>
                      <div className="text-[10px] text-[#151515]/60 font-medium">Zero electronic waste protocol</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsProofModalOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-[#151515] text-[#FFFDF7] font-extrabold text-xs uppercase tracking-wider hover:bg-[#B92CFF] transition-all text-center shadow-md cursor-pointer"
              >
                Close Proof Panel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampusImpactWidget;
