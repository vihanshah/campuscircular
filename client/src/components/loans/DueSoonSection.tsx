import React from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";

interface DueSoonSectionProps {
  dueSoonLoans: CampusLoan[];
  onReturn: (loan: CampusLoan) => void;
  onViewDetails: (loan: CampusLoan) => void;
}

export const DueSoonSection: React.FC<DueSoonSectionProps> = ({
  dueSoonLoans,
  onReturn,
  onViewDetails,
}) => {
  if (dueSoonLoans.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-[#151515]" />
        <h3 className="text-xl font-black text-[#151515] tracking-tight">
          Due soon
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dueSoonLoans.map((loan) => (
          <motion.div
            key={loan.id}
            whileHover={{ y: -2 }}
            className="bg-[#FFF9E6] border border-[#FFD928]/40 rounded-3xl p-5 shadow-[0_6px_20px_rgba(255,217,40,0.08)] flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#151518] text-[#FDF0A6]">
                  ⚠ Return in {loan.dueDaysRemaining} day(s)
                </span>

                <span className="text-xs font-mono font-bold text-[#151515]/60">
                  Due {loan.dueDate.split(",")[0]}
                </span>
              </div>

              <h4 className="text-base font-black text-[#151515] leading-snug">
                {loan.resourceName}
              </h4>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#151515]/75 mt-1">
                <span>Owner: <strong>{loan.ownerName}</strong></span>
                {loan.isOwnerVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
                <span>•</span>
                <span>{loan.locationName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#151515]/10">
              <button
                type="button"
                onClick={() => onViewDetails(loan)}
                className="flex-1 py-2.5 rounded-2xl bg-[#FFFDF7] border border-[#151515]/10 text-xs font-extrabold uppercase text-[#151515] hover:bg-[#151518] hover:text-white transition-colors"
              >
                View →
              </button>
              <button
                type="button"
                onClick={() => onReturn(loan)}
                className="flex-1 py-2.5 rounded-2xl bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-colors text-xs font-black uppercase shadow-xs"
              >
                Return resource →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DueSoonSection;
