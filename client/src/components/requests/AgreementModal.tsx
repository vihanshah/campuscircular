import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check, X, FileText, CheckCircle2 } from "lucide-react";
import { CampusRequest } from "@/lib/requestsData";

interface AgreementModalProps {
  request: CampusRequest | null;
  onClose: () => void;
  onConfirmAgreement: (requestId: string) => void;
}

export const AgreementModal: React.FC<AgreementModalProps> = ({
  request,
  onClose,
  onConfirmAgreement,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!request) return null;

  const handleConfirm = () => {
    if (!agreed) return;
    setConfirmed(true);
    setTimeout(() => {
      onConfirmAgreement(request.id);
      setConfirmed(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#B92CFF]" />
              <h3 className="text-xl font-black text-[#151515] tracking-tight">
                Borrowing Agreement
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-2 text-xs">
            <h4 className="font-extrabold text-[#151515] text-sm">{request.resourceName}</h4>
            <div className="text-[#151515]/75">Owner: <strong>{request.ownerName}</strong></div>
            <div className="text-[#151515]/75">Dates: <strong>{request.requestedDates}</strong></div>
            <div className="text-[#151515]/75">Total: <strong>{request.totalDisplay}</strong></div>

            <div className="pt-2 border-t border-[#151515]/10 space-y-1 font-medium text-[#151515]">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Return gear in identical condition at agreed deadline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Security deposit released upon owner inspection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Student verification (.edu) protection applied</span>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs font-bold text-[#151515] select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#151515]/30 text-[#151518] focus:ring-[#B92CFF]"
            />
            <span>I have read and agree to the Campus Circular borrowing terms & conditions.</span>
          </label>

          {confirmed ? (
            <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Agreement confirmed! Handover scheduled.</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-[#F8F6F0] text-[#151515] font-bold text-xs uppercase hover:bg-[#E8E4DA]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!agreed}
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-2xl bg-[#151518] text-white hover:bg-[#B92CFF] disabled:opacity-40 transition-all font-black text-xs uppercase shadow-md"
              >
                Confirm Agreement →
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AgreementModal;
