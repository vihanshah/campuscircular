import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ArrowRight, X } from "lucide-react";
import { StudentReview, MOCK_COMMUNITY_REVIEWS } from "@/lib/profileData";

export const CommunityFeedbackSection: React.FC = () => {
  const [showAllModal, setShowAllModal] = useState(false);

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#B92CFF]" />
          <h3 className="text-xl font-black text-[#151515] tracking-tight">
            Community feedback
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="text-xs font-extrabold text-[#151515] hover:text-[#B92CFF] flex items-center gap-1 transition-colors"
        >
          <span>View all reviews ({MOCK_COMMUNITY_REVIEWS.length}) →</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MOCK_COMMUNITY_REVIEWS.map((rev) => (
          <motion.div
            key={rev.id}
            whileHover={{ y: -2 }}
            className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-[#EAB308]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <p className="text-xs font-semibold text-[#151515]/85 italic leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-2 border-t border-[#151515]/08 flex items-center justify-between text-[11px] font-bold text-[#151515]/60">
              <span>— {rev.authorName}</span>
              <span className="font-mono text-[10px]">{rev.dateAgo}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ALL REVIEWS MODAL */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#151515]">All Student Reviews</h3>
                <button
                  type="button"
                  onClick={() => setShowAllModal(false)}
                  className="p-1 text-[#151515]/40 hover:text-[#151515]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_COMMUNITY_REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#EAB308]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-[#151515]/50">{rev.dateAgo}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#151515] italic">"{rev.comment}"</p>
                    <div className="text-[11px] font-bold text-[#151515]/60">— {rev.authorName} ({rev.authorRole})</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CommunityFeedbackSection;
