import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Calendar, Clock, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";
import { LoanLifecycleTimeline } from "./LoanLifecycleTimeline";

interface FeaturedLoanCardProps {
  loan: CampusLoan;
  onViewDetails: (loan: CampusLoan) => void;
  onReturn: (loan: CampusLoan) => void;
}

export const FeaturedLoanCard: React.FC<FeaturedLoanCardProps> = ({
  loan,
  onViewDetails,
  onReturn,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_rgba(0,0,0,0.06)] rounded-[32px] p-6 sm:p-8 space-y-6 relative overflow-hidden"
    >
      
      {/* Featured Header Pill Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 bg-[#E8DEF8] text-[#151515] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Primary Active Loan</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
          <span className="text-xs font-black uppercase text-[#151515]">
            ● {loan.status}
          </span>
        </div>
      </div>

      {/* Main Loan Details Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-start gap-4 flex-1">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 border border-[#151515]/08 shadow-xs"
            style={{ backgroundColor: loan.cardColor }}
          >
            <Camera className="w-8 h-8 text-[#151515]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#F8F6F0] px-2.5 py-0.5 rounded-full text-[#151515]">
              {loan.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
              {loan.resourceName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#151515]/70 pt-0.5">
              <span className="flex items-center gap-1">
                <span>Borrowed from:</span>
                <strong className="text-[#151515]">{loan.ownerName}</strong>
                {loan.isOwnerVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#151515]/40" />
                <span>{loan.distanceKm} km ({loan.locationName})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Summary Badge */}
        <div className="bg-[#F8F6F0] border border-[#151515]/06 p-4 rounded-2xl text-right shrink-0 w-full md:w-auto">
          <div className="text-xl font-black text-[#151515] leading-none">
            {loan.priceDisplay}
          </div>
          <div className="text-xs text-[#151515]/60 font-semibold mt-1">
            {loan.depositDisplay}
          </div>
        </div>

      </div>

      {/* Embedded 9-Stage Connected Lifecycle Timeline */}
      <LoanLifecycleTimeline
        lifecycle={loan.lifecycle}
        dueDaysRemaining={loan.dueDaysRemaining}
        isOverdue={loan.isOverdue}
      />

      {/* Action Bar */}
      <div className="pt-4 border-t border-[#151515]/08 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <div className="flex items-center gap-2 text-xs font-bold text-[#151515]/70">
          <Calendar className="w-4 h-4 text-[#151515]/40" />
          <span>Borrowed: <strong>{loan.borrowedDate}</strong> · Due: <strong>{loan.dueDate}</strong></span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onViewDetails(loan)}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-[#F8F6F0] border border-[#151515]/10 text-xs font-extrabold uppercase tracking-wider text-[#151515] hover:bg-[#151518] hover:text-white transition-all"
          >
            View loan details →
          </button>

          <button
            type="button"
            onClick={() => onReturn(loan)}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-all font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <span>Return resource →</span>
          </button>
        </div>

      </div>

    </motion.div>
  );
};

export default FeaturedLoanCard;
