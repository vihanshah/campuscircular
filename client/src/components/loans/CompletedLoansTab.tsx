import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";

interface CompletedLoansTabProps {
  completedLoans: CampusLoan[];
  onViewDetails: (loan: CampusLoan) => void;
}

export const CompletedLoansTab: React.FC<CompletedLoansTabProps> = ({
  completedLoans,
  onViewDetails,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-[#151515] tracking-tight">
          Completed Loan History
        </h3>
        <span className="text-xs font-bold text-[#151515]/50">
          {completedLoans.length} Loans Returned
        </span>
      </div>

      <div className="space-y-3">
        {completedLoans.map((loan) => (
          <motion.div
            key={loan.id}
            whileHover={{ x: 2 }}
            className="bg-[#FFFDF7] border border-[#151515]/08 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-black shrink-0">
                ✓
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#151515]">
                    {loan.resourceName}
                  </span>
                  <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                    Returned
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#151515]/65 font-medium">
                  <span>Owner: <strong>{loan.ownerName}</strong></span>
                  <span>•</span>
                  <span>{loan.borrowedDate} – {loan.dueDate}</span>
                  {loan.ratingGiven && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-[#EAB308] font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Rated {loan.ratingGiven}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onViewDetails(loan)}
              className="px-4 py-2 rounded-xl bg-[#F8F6F0] text-[#151515] hover:bg-[#151518] hover:text-white transition-colors text-xs font-extrabold uppercase shrink-0 self-end sm:self-center"
            >
              Details →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompletedLoansTab;
