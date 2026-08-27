import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check, X, ArrowRight, Inbox, CheckCircle2 } from "lucide-react";
import { IncomingBorrowRequest } from "@/lib/itemsData";

interface IncomingRequestsSectionProps {
  requests: IncomingBorrowRequest[];
  onAccept: (reqId: string) => void;
  onDecline: (reqId: string) => void;
}

export const IncomingRequestsSection: React.FC<IncomingRequestsSectionProps> = ({
  requests,
  onAccept,
  onDecline,
}) => {
  const [selectedReq, setSelectedReq] = useState<IncomingBorrowRequest | null>(null);
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  if (requests.length === 0) return null;

  const handleAction = (type: "accept" | "decline") => {
    if (!selectedReq) return;
    if (type === "accept") {
      onAccept(selectedReq.id);
      setActionDoneMsg(`Accepted borrow request from ${selectedReq.requesterName}!`);
    } else {
      onDecline(selectedReq.id);
      setActionDoneMsg(`Declined request from ${selectedReq.requesterName}.`);
    }

    setTimeout(() => {
      setActionDoneMsg(null);
      setSelectedReq(null);
    }, 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="w-5 h-5 text-[#B92CFF]" />
          <h3 className="text-xl font-black text-[#151515] tracking-tight">
            Requests for your items
          </h3>
        </div>
        <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDF0A6] text-[#151515]">
          {requests.length} Pending
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {requests.map((req) => (
          <motion.div
            key={req.id}
            whileHover={{ y: -2 }}
            className="bg-[#FFFDF7] border border-[#151515]/08 rounded-3xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[#151515]">
                  {req.resourceName}
                </span>
                <span className="text-[10px] font-mono text-[#151515]/50 font-bold">
                  {req.requestDate}
                </span>
              </div>

              <div className="flex items-center gap-2.5 my-2">
                <div className="w-8 h-8 rounded-full bg-[#151518] text-[#FDF0A6] flex items-center justify-center font-black text-xs shrink-0">
                  {req.requesterAvatar}
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-extrabold text-[#151515] flex items-center gap-1">
                    <span>{req.requesterName} wants to borrow this</span>
                    {req.isRequesterVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
                  </span>
                  <span className="text-[10px] text-[#151515]/60 font-semibold">
                    Trust Score: {req.requesterTrustScore}/100 · Dates: {req.requestedDates}
                  </span>
                </div>
              </div>

              <p className="text-xs font-medium text-[#151515]/75 italic leading-relaxed">
                "{req.purposeNotes}"
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedReq(req)}
              className="w-full py-2.5 rounded-2xl bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-colors text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Review request →</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* REVIEW REQUEST MODAL */}
      <AnimatePresence>
        {selectedReq && (
          <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-md w-full relative space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-[#FDF0A6] text-[#151515]">
                  Incoming Borrow Request
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="p-1 text-[#151515]/40 hover:text-[#151515]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h4 className="text-xl font-black text-[#151515]">{selectedReq.resourceName}</h4>

              <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-[#151515]/60">Requester:</span>
                  <span className="font-black text-[#151515] flex items-center gap-1">
                    <span>{selectedReq.requesterName}</span>
                    {selectedReq.isRequesterVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#151515]/60">Trust Score:</span>
                  <span className="font-black text-[#151515]">{selectedReq.requesterTrustScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#151515]/60">Dates:</span>
                  <span className="font-black text-[#151515]">{selectedReq.requestedDates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#151515]/60">Stated Purpose:</span>
                  <span className="font-bold text-[#151515]">{selectedReq.purposeNotes}</span>
                </div>
              </div>

              {actionDoneMsg ? (
                <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{actionDoneMsg}</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleAction("decline")}
                    className="flex-1 py-3 rounded-2xl font-bold text-xs uppercase bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FF6755] hover:text-white transition-colors"
                  >
                    Decline
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAction("accept")}
                    className="flex-1 py-3 rounded-2xl font-black text-xs uppercase bg-[#151518] text-white hover:bg-[#34D399] hover:text-[#151515] transition-colors shadow-md"
                  >
                    Accept Request ✓
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IncomingRequestsSection;
