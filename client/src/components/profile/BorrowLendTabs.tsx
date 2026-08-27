import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";
import { ProfileExchangeHistoryItem, MOCK_PROFILE_HISTORY } from "@/lib/profileData";
import { useLocation } from "wouter";

export const BorrowLendTabs: React.FC = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"Borrowing" | "Lending">("Borrowing");

  const filteredItems = MOCK_PROFILE_HISTORY.filter((item) => item.type === activeTab);

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-xl font-black text-[#151515] tracking-tight">
          Exchange Activity History
        </h3>

        {/* Switcher */}
        <div className="bg-[#F8F6F0] p-1.5 rounded-full flex items-center border border-[#151515]/06 shrink-0">
          {(["Borrowing", "Lending"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#151518] text-[#FDF0A6] shadow-xs"
                    : "text-[#151515]/60 hover:text-[#151515]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full text-[#151515]"
                style={{ backgroundColor: item.cardColor }}
              >
                {item.category}
              </span>

              <div className="space-y-0.5">
                <div className="text-sm font-extrabold text-[#151515]">
                  {item.resourceName}
                </div>
                <div className="text-xs text-[#151515]/60 font-semibold flex items-center gap-2">
                  <span>{item.status}</span>
                  <span>•</span>
                  <span>{item.dateRange}</span>
                  {item.loanCount && <span>• {item.loanCount} loans completed</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-black text-[#EAB308]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{item.rating}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BorrowLendTabs;
