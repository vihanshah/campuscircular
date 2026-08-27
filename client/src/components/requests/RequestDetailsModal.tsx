import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, MapPin, Calendar, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { CampusRequest } from "@/lib/requestsData";
import { RequestTimeline } from "./RequestTimeline";

interface RequestDetailsModalProps {
  request: CampusRequest | null;
  onClose: () => void;
  onActionClick: (request: CampusRequest) => void;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  onClose,
  onActionClick,
}) => {
  if (!request) return null;

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
                style={{ backgroundColor: request.cardColor }}
              >
                {request.category}
              </span>
              <span
                className="text-xs font-black uppercase px-3 py-1 rounded-full border border-black/06 shadow-xs"
                style={{
                  backgroundColor: request.statusBg,
                  color: request.statusTextColor,
                }}
              >
                {request.statusText}
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
            <div className="inline-flex items-center gap-1 text-xs font-black text-[#151518] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#B92CFF]" />
              <span>✦ {request.matchPct}% Smart Match Score</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight">
              {request.resourceName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#151515]/70 mt-1">
              <span>Owner: <strong>{request.ownerName}</strong> ({request.ownerTrustScore}/100 Trust Score)</span>
              <span>•</span>
              <span>Dates: <strong>{request.requestedDates}</strong></span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/60 mb-2">
              Request Lifecycle Progress
            </h4>
            <RequestTimeline lifecycle={request.lifecycle} />
          </div>

          {/* Explicit Next Step Box */}
          <div className="bg-[#FDF0A6]/40 border border-[#151515]/10 rounded-2xl p-4 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#151518] text-[#FDF0A6] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
              ➔
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black uppercase text-[#151515]/60 tracking-wider">
                CURRENT NEXT STEP
              </span>
              <span className="font-extrabold text-sm text-[#151515] mt-0.5">
                "{request.nextStepText}"
              </span>
            </div>
          </div>

          {/* Purpose & Financial Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#151515]/60">
                Stated Purpose & Handover
              </h4>
              <p className="text-xs font-medium text-[#151515]/80">
                "{request.purposeNotes}"
              </p>
              <div className="text-xs font-bold text-[#151515] pt-1">
                📍 Location: {request.handoverLocation}
              </div>
            </div>

            <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-1.5 text-xs">
              <h4 className="font-black text-[#151515] uppercase tracking-wider text-[10px]">
                Financial Summary
              </h4>
              <div className="flex justify-between">
                <span>Daily Rate:</span>
                <span className="font-extrabold text-[#151515]">{request.priceDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span>Refundable Deposit:</span>
                <span className="font-extrabold text-[#151515]">{request.depositDisplay}</span>
              </div>
              <div className="flex justify-between text-[#34D399] font-bold">
                <span>Campus Platform Fee:</span>
                <span>{request.platformFeeDisplay}</span>
              </div>
              <div className="pt-2 border-t border-[#151515]/10 flex justify-between font-black text-sm text-[#151515]">
                <span>Total:</span>
                <span>{request.totalDisplay}</span>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-[#F8F6F0] text-[#151515] font-bold text-xs uppercase hover:bg-[#E8E4DA]"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onActionClick(request);
              }}
              className="px-6 py-3 rounded-2xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors font-black text-xs uppercase shadow-md"
            >
              Take Action →
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RequestDetailsModal;
