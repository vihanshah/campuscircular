import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ShieldCheck, X, Phone, Calendar } from "lucide-react";
import { CampusRequest } from "@/lib/requestsData";

interface HandoverModalProps {
  request: CampusRequest | null;
  onClose: () => void;
}

export const HandoverModal: React.FC<HandoverModalProps> = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-md w-full relative space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D7F3EB] text-[#15803D] flex items-center justify-center font-black text-xs">
                📍
              </div>
              <h3 className="text-xl font-black text-[#151515] tracking-tight">
                Handover Details
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

          <div className="space-y-1">
            <h4 className="text-lg font-black text-[#151515]">{request.resourceName}</h4>
            <div className="text-xs text-[#151515]/70 font-semibold">
              Owner: <strong>{request.ownerName}</strong> ({request.ownerTrustScore} Trust Score)
            </div>
          </div>

          <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#B92CFF] shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-[#151515]">Scheduled Time:</span>
                <div className="font-bold text-[#151515] text-sm mt-0.5">
                  {request.handoverTime || "Tomorrow · 2:00 PM"}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-[#151515]/08">
              <MapPin className="w-4 h-4 text-[#151515] shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-[#151515]">Location:</span>
                <div className="font-bold text-[#151515] text-sm mt-0.5">
                  {request.handoverLocation}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-colors font-black text-xs uppercase shadow-md"
          >
            Got it, thanks! →
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HandoverModal;
