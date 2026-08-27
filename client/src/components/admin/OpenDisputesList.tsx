import React from "react";
import { motion } from "framer-motion";
import { Scale, ArrowRight } from "lucide-react";
import { OpenDispute } from "@/lib/adminData";

interface OpenDisputesListProps {
  disputes: OpenDispute[];
  onReviewDispute: (dispute: OpenDispute) => void;
}

export const OpenDisputesList: React.FC<OpenDisputesListProps> = ({ disputes, onReviewDispute }) => {
  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#F87171]" />
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Open disputes
          </h3>
        </div>
        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-[#F87171]/20 text-[#F87171]">
          {disputes.length} PENDING
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {disputes.map((d) => (
          <motion.div
            key={d.id}
            whileHover={{ y: -2 }}
            className="bg-[#232332] border border-white/06 rounded-2xl p-4 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: d.statusBg, color: d.statusTextColor }}
                >
                  {d.issueType}
                </span>
                <span className="text-[10px] font-mono text-white/40">{d.timeAgo}</span>
              </div>

              <h4 className="text-sm font-extrabold text-white leading-tight mb-1">
                {d.resourceName}
              </h4>

              <div className="text-xs text-white/60 font-semibold mb-2">
                <span>{d.borrowerName}</span> vs <span>{d.ownerName}</span>
              </div>

              <p className="text-xs text-white/70 italic leading-relaxed line-clamp-2">
                "{d.description}"
              </p>
            </div>

            <button
              type="button"
              onClick={() => onReviewDispute(d)}
              className="w-full py-2 rounded-xl bg-[#14141B] hover:bg-[#F87171] text-white transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Review dispute →</span>
            </button>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default OpenDisputesList;
