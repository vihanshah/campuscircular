import React from "react";
import { motion } from "framer-motion";
import { Tv, Camera, Laptop, BookOpen, Music, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";

interface LoanCardProps {
  loan: CampusLoan;
  onViewDetails: (loan: CampusLoan) => void;
  onReturn: (loan: CampusLoan) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Photography: Camera,
  Electronics: Laptop,
  Books: BookOpen,
  Music: Music,
  Events: Tv,
};

export const LoanCard: React.FC<LoanCardProps> = ({ loan, onViewDetails, onReturn }) => {
  const IconComp = CATEGORY_ICONS[loan.category] || Tv;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] rounded-3xl p-5 flex flex-col justify-between relative group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
            style={{ backgroundColor: loan.cardColor }}
          >
            {loan.category}
          </span>

          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#E2F1D0] text-[#151515]">
            ● {loan.status}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-[#151515]/06 shadow-xs"
            style={{ backgroundColor: loan.cardColor }}
          >
            <IconComp className="w-5 h-5 text-[#151515]" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-base font-extrabold text-[#151515] tracking-tight leading-snug group-hover:text-[#B92CFF] transition-colors">
              {loan.resourceName}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-[#151515]/65 font-medium mt-0.5">
              <Clock className="w-3 h-3 text-[#151515]/40" />
              <span>Return in <strong>{loan.dueDaysRemaining} days</strong> ({loan.dueDate.split(",")[0]})</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F8F6F0] rounded-2xl p-3 my-3 flex items-center justify-between text-xs border border-[#151515]/06">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-[#151515]/45 uppercase">Owner</span>
            <span className="font-extrabold text-[#151515] flex items-center gap-1">
              <span>{loan.ownerName}</span>
              {loan.isOwnerVerified && <ShieldCheck className="w-3 h-3 text-[#34D399]" />}
            </span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[9px] font-bold text-[#151515]/45 uppercase">Price</span>
            <span className="font-extrabold text-[#151515]">{loan.priceDisplay}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[#151515]/08">
        <button
          type="button"
          onClick={() => onViewDetails(loan)}
          className="flex-1 py-2.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/10 text-xs font-extrabold uppercase text-[#151515] hover:bg-[#151518] hover:text-white transition-colors"
        >
          View →
        </button>
        <button
          type="button"
          onClick={() => onReturn(loan)}
          className="flex-1 py-2.5 rounded-2xl bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-colors text-xs font-black uppercase shadow-xs"
        >
          Return →
        </button>
      </div>
    </motion.div>
  );
};

export default LoanCard;
