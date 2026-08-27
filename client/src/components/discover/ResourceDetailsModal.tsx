import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  Check,
} from "lucide-react";
import { CampusResource } from "@/lib/discoverData";
import { CampusRequest } from "@/lib/requestsData";
import { BorrowRequestModal } from "./BorrowRequestModal";

interface ResourceDetailsModalProps {
  resource: CampusResource | null;
  onClose: () => void;
}

export const ResourceDetailsModal: React.FC<ResourceDetailsModalProps> = ({
  resource,
  onClose,
}) => {
  const [, setLocation] = useLocation();
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CampusRequest | null>(null);

  if (!resource) return null;

  const handleBorrowClick = () => {
    setIsBorrowModalOpen(true);
  };

  const handleRequestSubmitted = (request: CampusRequest) => {
    setIsBorrowModalOpen(false);
    setSubmittedRequest(request);
  };

  const handleViewMyRequest = () => {
    onClose();
    setLocation("/requests");
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[#151515]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isBorrowModalOpen) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.93, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 15 }}
            className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] rounded-[32px] w-full max-w-xl my-auto relative overflow-hidden flex flex-col max-h-[85vh] text-[#151515]"
          >
            {/* STICKY HEADER */}
            <div className="bg-[#FFFDF7] border-b border-[#151515]/08 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-black uppercase px-3 py-1 rounded-full text-[#151515]"
                  style={{ backgroundColor: resource.cardColor }}
                >
                  {resource.category}
                </span>
                <span className="text-xs font-bold text-[#151515]/60 bg-[#F3EFE6] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                  <span>{resource.availability}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#151515]/40 hover:text-[#151515] hover:bg-[#F3EFE6] rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCROLLABLE CONTENT BODY */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-[#151515]">
              {/* Smart Match Banner */}
              <div className="flex items-center gap-2 text-xs font-black text-[#151518] bg-[#FDF0A6]/40 p-2.5 rounded-xl border border-[#FFD928]/30">
                <Sparkles className="w-4 h-4 text-[#B92CFF]" />
                <span>✦ {resource.matchPct}% Smart Match for your campus profile</span>
              </div>

              {/* Title & Ratings */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#151515] tracking-tight leading-tight">
                  {resource.name}
                </h2>

                <div className="flex items-center gap-3 mt-2 text-xs font-bold text-[#151515]/70">
                  <span className="flex items-center gap-1 text-[#EAB308]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <strong className="text-[#151515]">{resource.rating}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#151515]/40" />
                    <span>{resource.distanceKm} km ({resource.locationName})</span>
                  </span>
                </div>
              </div>

              {/* Image / Thumbnail Preview */}
              {resource.imageUrl && (
                <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#151515]/10 shadow-xs shrink-0">
                  <img
                    src={resource.imageUrl}
                    alt={resource.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <p className="text-xs font-medium text-[#151515]/80 leading-relaxed">
                {resource.description}
              </p>

              {/* Resource Details Grid */}
              <div className="bg-[#F8F6F0] p-4 rounded-2xl space-y-2.5 text-xs border border-[#151515]/06">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#151515]/60">Owner:</span>
                  <span className="font-black text-[#151515] flex items-center gap-1">
                    <span>{resource.ownerName}</span>
                    {resource.isOwnerVerified && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#151515]/60">Condition:</span>
                  <span className="font-extrabold text-[#151515]">{resource.condition}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#151515]/60">Daily Rate:</span>
                  <span className="font-black text-[#151515]">{resource.priceDisplay}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#151515]/60">Deposit:</span>
                  <span className="font-black text-[#151515]">{resource.depositDisplay}</span>
                </div>
              </div>

              {/* POST-SUBMISSION CONFIRMATION INSIDE SCROLL BODY */}
              {submittedRequest && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#D7F3EB] border border-[#34D399]/40 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center gap-2 text-[#15803D] font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                    <span>✓ Request sent</span>
                  </div>

                  <p className="text-xs font-bold text-[#151515] leading-relaxed">
                    "Your request has been sent to {resource.ownerName.split(" ")[0]}."
                  </p>

                  <div className="bg-[#FFFDF7] p-3.5 rounded-xl space-y-2 text-xs border border-[#151515]/06">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#151515]/60">Status:</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FFD928] text-[#151515]">
                        ● Awaiting approval
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#151515]/60">Requested:</span>
                      <span className="font-extrabold text-[#151515] font-mono">
                        {submittedRequest.requestedDates}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-[#151515]/70 pt-1 border-t border-[#151515]/06">
                      Next step: "Wait for the owner to accept your request."
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleViewMyRequest}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-[#151518] text-white hover:bg-[#B92CFF] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>View My Request →</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* STICKY FOOTER ACTION BAR */}
            {!submittedRequest && (
              <div className="bg-[#FFFDF7] border-t border-[#151515]/08 px-6 py-4 shrink-0 sticky bottom-0 z-20 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleBorrowClick}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Borrow this →</span>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* BORROW REQUEST + AGREEMENT MODAL */}
      <BorrowRequestModal
        isOpen={isBorrowModalOpen}
        resource={resource}
        onClose={() => setIsBorrowModalOpen(false)}
        onRequestSubmitted={handleRequestSubmitted}
      />
    </>
  );
};

export default ResourceDetailsModal;
