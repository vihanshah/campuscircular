import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Scale, UserCheck, Flag, ArrowRight } from "lucide-react";
import { AttentionItemData } from "@/lib/adminData";

interface AttentionPanelProps {
  items: AttentionItemData[];
  onReviewItem: (type: AttentionItemData["type"]) => void;
}

const ICON_MAP = {
  overdue: AlertTriangle,
  dispute: Scale,
  verification: UserCheck,
  flagged: Flag,
};

export const AttentionPanel: React.FC<AttentionPanelProps> = ({ items, onReviewItem }) => {
  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F87171]/20 text-[#F87171] flex items-center justify-center font-bold">
            ⚠
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Needs your attention
            </h3>
            <p className="text-xs text-white/50 font-medium">
              Actionable items requiring administrator intervention
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/30 px-3 py-1 rounded-full">
          4 HIGH PRIORITY
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => {
          const IconComp = ICON_MAP[item.type];
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className="bg-[#232332] border border-white/08 hover:border-[#00F2FE]/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: item.badgeBg,
                      color: item.badgeTextColor,
                    }}
                  >
                    {item.badgeText}
                  </span>

                  <IconComp className="w-4 h-4 text-white/40" />
                </div>

                <h4 className="text-base font-extrabold text-white tracking-tight">
                  {item.title}
                </h4>

                <p className="text-xs text-white/60 font-medium mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onReviewItem(item.type)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#14141B] hover:bg-[#00F2FE] text-white hover:text-[#0F0F14] transition-all text-xs font-black uppercase tracking-wider flex items-center justify-between shadow-xs"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default AttentionPanel;
