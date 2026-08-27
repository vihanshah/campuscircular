import React from "react";
import { motion } from "framer-motion";
import { Camera, Laptop, BookOpen, Music, Tv, Wrench, Dumbbell, Star, ShieldCheck, Clock, Settings, Pause, Play } from "lucide-react";
import { OwnedResource } from "@/lib/itemsData";

interface ResourceOwnerCardProps {
  item: OwnedResource;
  onManage: (item: OwnedResource) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Photography: Camera,
  Electronics: Laptop,
  Books: BookOpen,
  Music: Music,
  Events: Tv,
  Tools: Wrench,
  Sports: Dumbbell,
};

export const ResourceOwnerCard: React.FC<ResourceOwnerCardProps> = ({ item, onManage }) => {
  const IconComp = CATEGORY_ICONS[item.category] || Tv;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative group"
    >
      <div>
        
        {/* Header: Category Badge & Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
            style={{ backgroundColor: item.cardColor }}
          >
            {item.category}
          </span>

          <span
            className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/06 shadow-xs"
            style={{
              backgroundColor: item.statusBg,
              color: item.statusTextColor,
            }}
          >
            ● {item.status}
          </span>
        </div>

        {/* Thumbnail & Name */}
        <div className="flex items-start gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-[#151515]/06 shadow-xs"
            style={{ backgroundColor: item.cardColor }}
          >
            <IconComp className="w-7 h-7 text-[#151515]" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-extrabold text-[#151515] tracking-tight leading-snug group-hover:text-[#B92CFF] transition-colors">
              {item.name}
            </h3>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#151515]/65 mt-1">
              <span className="text-[#151515]">{item.condition} condition</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-[#EAB308] font-extrabold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{item.rating}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Borrowed info if currently borrowed */}
        {item.status === "Currently Borrowed" && item.borrowerName && (
          <div className="bg-[#E8DEF8]/40 border border-[#B92CFF]/20 rounded-2xl p-3 my-2 text-xs font-bold text-[#151515] flex items-center justify-between">
            <span>Borrowed by <strong>{item.borrowerName}</strong></span>
            <span className="text-[10px] text-[#6B21A8] font-mono font-black">Return {item.returnDueDate?.split(",")[0]}</span>
          </div>
        )}

        {/* Financial & Loan Count Box */}
        <div className="bg-[#F8F6F0] rounded-2xl p-3.5 my-3 flex items-center justify-between text-xs border border-[#151515]/06">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-[#151515]/45 uppercase">Rate & Deposit</span>
            <span className="font-extrabold text-[#151515]">{item.priceDisplay} · {item.depositDisplay}</span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[9px] font-bold text-[#151515]/45 uppercase">Successful Loans</span>
            <span className="font-extrabold text-[#15803D]">{item.successfulLoansCount} loans</span>
          </div>
        </div>

      </div>

      {/* Action Bar */}
      <div className="pt-3 border-t border-[#151515]/08 flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#151515]/60">
          Total Earned: <strong className="text-[#151515]">{item.earningsTotal}</strong>
        </span>

        <button
          type="button"
          onClick={() => onManage(item)}
          className="px-5 py-2.5 rounded-xl bg-[#151518] text-white hover:bg-[#B92CFF] transition-all font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Manage →</span>
        </button>
      </div>

    </motion.div>
  );
};

export default ResourceOwnerCard;
