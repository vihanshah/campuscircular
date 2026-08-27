import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, MapPin, Calendar, Clock, AlertCircle, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { CampusLoan } from "@/lib/loansData";
import { LoanLifecycleTimeline } from "./LoanLifecycleTimeline";

interface LoanDetailsModalProps {
  loan: CampusLoan | null;
  onClose: () => void;
  onReturn: (loan: CampusLoan) => void;
  onReportIssue: (loan: CampusLoan) => void;
}

export const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({
  loan,
  onClose,
  onReturn,
  onReportIssue,
}) => {
  if (!loan) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-2xl w-full relative my-8 max-h-[90vh] overflow-y-auto space-y-6"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-black uppercase px-3 py-1 rounded-full text-[#151515]"
                style={{ backgroundColor: loan.cardColor }}
              >
                {loan.category}
              </span>
              <span className="text-xs font-black uppercase text-[#151515] bg-[#F8F6F0] px-3 py-1 rounded-full border border-[#151515]/06">
                ● {loan.status}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
              {loan.resourceName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#151515]/70 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#151515]/40" />
                <span>{loan.locationName} ({loan.distanceKm} km)</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#151515]/40" />
                <span>{loan.borrowedDate} – {loan.dueDate}</span>
              </span>
            </div>
          </div>

          {/* Connected 9-Stage Lifecycle Timeline */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/60 mb-2">
              Borrowing Lifecycle Status
            </h4>
            <LoanLifecycleTimeline
              lifecycle={loan.lifecycle}
              dueDaysRemaining={loan.dueDaysRemaining}
              isOverdue={loan.isOverdue}
            />
          </div>

          {/* Condition & Owner Trust Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Condition at Handover */}
            <div className="bg-[#F8F6F0] border border-[#151515]/06 p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/70">
                Condition at Handover
              </h4>
              <div className="text-base font-extrabold text-[#151515]">
                {loan.conditionAtHandover} Condition
              </div>
              <div className="space-y-1 text-xs font-medium text-[#151515]/80">
                {loan.conditionNotes.map((note, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#34D399] shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Trust Score */}
            <div className="bg-[#F8F6F0] border border-[#151515]/06 p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/70">
                Owner Trust & Verification
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#151518] text-white flex items-center justify-center font-black text-xs">
                  {loan.ownerAvatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-[#151515] flex items-center gap-1">
                    <span>{loan.ownerName}</span>
                    {loan.isOwnerVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
                  </span>
                  <span className="text-[10px] text-[#151515]/60 font-bold">
                    ★ {loan.ownerRating} · Trust Score: {loan.ownerTrustScore}/100
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Financial Breakdown */}
          <div className="bg-[#FFFDF7] border border-[#151515]/10 p-4 rounded-2xl space-y-2 text-xs">
            <h4 className="font-black text-[#151515] uppercase tracking-wider text-[11px] mb-2">
              Financial Breakdown & Security Deposit
            </h4>
            <div className="flex justify-between font-medium text-[#151515]/75">
              <span>Daily Rate:</span>
              <span className="font-black text-[#151515]">{loan.priceDisplay}</span>
            </div>
            <div className="flex justify-between font-medium text-[#151515]/75">
              <span>Refundable Security Deposit:</span>
              <span className="font-black text-[#151515]">{loan.depositDisplay}</span>
            </div>
            <div className="flex justify-between font-medium text-[#151515]/75">
              <span>Campus Platform Fee:</span>
              <span className="font-black text-[#34D399]">{loan.platformFeeDisplay}</span>
            </div>
            <div className="pt-2 border-t border-[#151515]/10 flex justify-between font-black text-sm text-[#151515]">
              <span>Total Handover Amount:</span>
              <span>{loan.totalPaidDisplay}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <button
              type="button"
              onClick={() => onReportIssue(loan)}
              className="text-xs font-bold text-[#FF6755] hover:underline flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Report an issue</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-[#F8F6F0] text-[#151515] hover:bg-[#E8E4DA] font-bold text-xs uppercase"
              >
                Close
              </button>
              
              {loan.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onReturn(loan);
                  }}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors font-black text-xs uppercase shadow-md"
                >
                  Return resource →
                </button>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoanDetailsModal;
