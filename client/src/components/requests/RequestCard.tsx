import React from "react";
import { motion } from "framer-motion";
import { Camera, Laptop, BookOpen, Music, Tv, ShieldCheck, Sparkles, Calendar, Clock, ArrowRight, X } from "lucide-react";
import { CampusRequest } from "@/lib/requestsData";

interface RequestCardProps {
  request: CampusRequest;
  onViewDetails: (request: CampusRequest) => void;
  onCancelRequest: (requestId: string) => void;
  onActionClick: (request: CampusRequest) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Photography: Camera,
  Electronics: Laptop,
  Books: BookOpen,
  Music: Music,
  Events: Tv,
};

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onViewDetails,
  onCancelRequest,
  onActionClick,
}) => {
  const IconComp = CATEGORY_ICONS[request.category] || Tv;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 relative group"
    >
      <div>
        
        {/* Header Row: Category Badge & Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
              style={{ backgroundColor: request.cardColor }}
            >
              {request.category}
            </span>

            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#151518] text-[#FDF0A6]">
              ✦ {request.matchPct}% Match
            </span>
          </div>

          <span
            className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/06 shadow-xs"
            style={{
              backgroundColor: request.statusBg,
              color: request.statusTextColor,
            }}
          >
            {request.statusText}
          </span>
        </div>

        {/* Thumbnail & Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-[#151515]/06 shadow-xs"
            style={{ backgroundColor: request.cardColor }}
          >
            <IconComp className="w-6 h-6 text-[#151515]" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-extrabold text-[#151515] tracking-tight leading-snug group-hover:text-[#B92CFF] transition-colors">
              {request.resourceName}
            </h3>

            <div className="flex items-center gap-2 text-xs font-bold text-[#151515]/70 mt-0.5">
              <span>Owner: <strong>{request.ownerName}</strong></span>
              {request.isOwnerVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
              <span>•</span>
              <span className="text-[#151515]/50">Requested {request.requestDate.split(",")[0]}</span>
            </div>
          </div>
        </div>

        {/* Dates & Financials Box */}
        <div className="bg-[#F8F6F0] rounded-2xl p-3.5 my-3 flex items-center justify-between text-xs border border-[#151515]/06">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-[#151515]/45 uppercase">Requested Dates</span>
            <span className="font-extrabold text-[#151515]">{request.requestedDates}</span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[9px] font-bold text-[#151515]/45 uppercase">Daily Rate & Deposit</span>
            <span className="font-extrabold text-[#151515]">{request.priceDisplay} · {request.depositDisplay}</span>
          </div>
        </div>

        {/* EXPLICIT UX NEXT STEP BOX (Signature Requirement!) */}
        <div className="bg-[#FDF0A6]/40 border border-[#151515]/08 rounded-2xl p-3 flex items-start gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-[#151518] text-[#FDF0A6] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
            ➔
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase text-[#151515]/50 tracking-wider">
              NEXT STEP
            </span>
            <span className="font-bold text-[#151515] mt-0.5 leading-snug">
              "{request.nextStepText}"
            </span>
          </div>
        </div>

      </div>

      {/* Action Buttons tailored to status */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#151515]/08">
        
        <button
          type="button"
          onClick={() => onViewDetails(request)}
          className="text-xs font-extrabold text-[#151515]/70 hover:text-[#151515] hover:underline"
        >
          View request details →
        </button>

        <div className="flex items-center gap-2">
          {request.status === "PENDING" && (
            <button
              type="button"
              onClick={() => onCancelRequest(request.id)}
              className="px-4 py-2 rounded-xl bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FF6755] hover:text-white transition-colors text-xs font-bold uppercase"
            >
              Cancel request
            </button>
          )}

          {request.status === "ACCEPTED" && (
            <button
              type="button"
              onClick={() => onActionClick(request)}
              className="px-5 py-2.5 rounded-xl bg-[#151518] text-[#FDF0A6] hover:bg-[#B92CFF] hover:text-white transition-colors text-xs font-black uppercase shadow-xs flex items-center gap-1.5"
            >
              <span>Continue →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {request.status === "AGREEMENT" && (
            <button
              type="button"
              onClick={() => onActionClick(request)}
              className="px-5 py-2.5 rounded-xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors text-xs font-black uppercase shadow-xs flex items-center gap-1.5"
            >
              <span>Review agreement →</span>
            </button>
          )}

          {request.status === "HANDOVER" && (
            <button
              type="button"
              onClick={() => onActionClick(request)}
              className="px-5 py-2.5 rounded-xl bg-[#151518] text-[#D7F3EB] hover:bg-[#34D399] hover:text-[#151515] transition-colors text-xs font-black uppercase shadow-xs flex items-center gap-1.5"
            >
              <span>View handover →</span>
            </button>
          )}

          {request.status === "REJECTED" && (
            <button
              type="button"
              onClick={() => onActionClick(request)}
              className="px-5 py-2.5 rounded-xl bg-[#FDF0A6] text-[#151515] hover:bg-[#FFF3C4] transition-colors text-xs font-extrabold uppercase shadow-xs"
            >
              Find alternatives →
            </button>
          )}
        </div>

      </div>

    </motion.div>
  );
};

export default RequestCard;
