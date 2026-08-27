import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Pause, Play, Trash2, Edit3, CheckCircle2, ShieldCheck } from "lucide-react";
import { OwnedResource } from "@/lib/itemsData";

interface ManageItemModalProps {
  item: OwnedResource | null;
  onClose: () => void;
  onTogglePause: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
}

export const ManageItemModal: React.FC<ManageItemModalProps> = ({
  item,
  onClose,
  onTogglePause,
  onRemoveItem,
}) => {
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  if (!item) return null;

  const handlePause = () => {
    onTogglePause(item.id);
    setNoticeMsg(item.status === "Paused" ? "Listing resumed & active on campus!" : "Listing paused!");
    setTimeout(() => {
      setNoticeMsg(null);
      onClose();
    }, 1200);
  };

  const handleRemove = () => {
    onRemoveItem(item.id);
    setNoticeMsg("Resource removed from your items.");
    setTimeout(() => {
      setNoticeMsg(null);
      onClose();
    }, 1200);
  };

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
            <span
              className="text-xs font-black uppercase px-3 py-1 rounded-full text-[#151515]"
              style={{ backgroundColor: item.cardColor }}
            >
              {item.category}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-2xl font-black text-[#151515] tracking-tight">{item.name}</h3>

          <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#151515]/06 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="font-bold text-[#151515]/60">Status:</span>
              <span className="font-black text-[#151515]">● {item.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#151515]/60">Condition:</span>
              <span className="font-black text-[#151515]">{item.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#151515]/60">Pricing:</span>
              <span className="font-black text-[#151515]">{item.priceDisplay} · {item.depositDisplay}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#151515]/60">Successful Loans:</span>
              <span className="font-black text-[#15803D]">{item.successfulLoansCount} loans</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-[#151515]/60">Total Earnings:</span>
              <span className="font-black text-[#151515]">{item.earningsTotal}</span>
            </div>
          </div>

          {noticeMsg ? (
            <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3 rounded-2xl text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{noticeMsg}</span>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handlePause}
                className="w-full py-3 rounded-2xl bg-[#F8F6F0] border border-[#151515]/10 text-[#151515] hover:bg-[#151518] hover:text-white transition-colors text-xs font-black uppercase flex items-center justify-center gap-2"
              >
                {item.status === "Paused" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                <span>{item.status === "Paused" ? "Resume Listing" : "Pause Listing"}</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="w-full py-3 rounded-2xl bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FF6755] hover:text-white transition-colors text-xs font-black uppercase flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove Item</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ManageItemModal;
