import React from "react";
import { useLocation } from "wouter";
import { Bookmark, Clock, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { BRAND_COLORS } from "@/lib/theme";

export const CampusBorrowingActivity: React.FC = () => {
  const [, setLocation] = useLocation();

  const activeBorrows = [
    {
      id: "canon-camera",
      name: "Canon EOS Rebel DSLR",
      dueDays: "3 days",
      dueDate: "Aug 30, 2026",
      owner: "Media Lab",
      status: "Due Soon",
      color: "#FFD928",
    },
    {
      id: "calculator-fx",
      name: "Casio FX-991EX Calculator",
      dueDays: "6 days",
      dueDate: "Sep 02, 2026",
      owner: "Eng Block B",
      status: "Active",
      color: "#CDEFEA",
    },
  ];

  return (
    <div className="space-y-5">
      {/* YOUR CIRCULAR ACTIVITY KPI PANEL */}
      <div className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[32px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-[#151515] tracking-tight">
            Your Circular Activity
          </h3>
          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#CDEFEA] text-[#151515]">
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            onClick={() => setLocation("/loans")}
            className="bg-[#F3EFE6]/70 p-3.5 rounded-2xl cursor-pointer hover:bg-[#FDF0A6]/40 hover:scale-102 transition-all duration-200 group"
          >
            <span className="text-[10px] font-bold text-[#151515]/50 uppercase group-hover:text-[#151515]">Borrowed</span>
            <div className="text-2xl font-black text-[#151515] mt-0.5 flex items-center justify-between">
              <span>2 Items</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#151515]" />
            </div>
          </div>

          <div
            onClick={() => setLocation("/items")}
            className="bg-[#F3EFE6]/70 p-3.5 rounded-2xl cursor-pointer hover:bg-[#E8DEF8]/50 hover:scale-102 transition-all duration-200 group"
          >
            <span className="text-[10px] font-bold text-[#151515]/50 uppercase group-hover:text-[#151515]">Shared</span>
            <div className="text-2xl font-black text-[#B92CFF] mt-0.5 flex items-center justify-between">
              <span>1 Item</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#B92CFF]" />
            </div>
          </div>

          <div
            onClick={() => setLocation("/requests")}
            className="bg-[#F3EFE6]/70 p-3.5 rounded-2xl cursor-pointer hover:bg-[#FEE2E2]/60 hover:scale-102 transition-all duration-200 group"
          >
            <span className="text-[10px] font-bold text-[#151515]/50 uppercase group-hover:text-[#151515]">Pending</span>
            <div className="text-2xl font-black text-[#151515] mt-0.5 flex items-center justify-between">
              <span>3 Requests</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#151515]" />
            </div>
          </div>

          <div
            onClick={() => setLocation("/profile")}
            className="bg-[#FFD928]/30 p-3.5 rounded-2xl cursor-pointer hover:bg-[#FFD928]/60 hover:scale-102 transition-all duration-200 group"
          >
            <span className="text-[10px] font-bold text-[#151515]/70 uppercase">Saved</span>
            <div className="text-2xl font-black text-[#151515] mt-0.5 flex items-center justify-between">
              <span>₹4,500</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#151515]" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setLocation("/profile")}
          className="text-[11px] font-bold text-[#151515]/60 text-center bg-[#FFFDF7] border border-[#151515]/08 py-2 rounded-2xl cursor-pointer hover:bg-[#F3EFE6] transition-colors"
        >
          💡 You've saved 45kg CO2 by reusing campus gear!
        </div>
      </div>

      {/* CURRENTLY BORROWED ITEMS */}
      <div className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[32px] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-[#151515] tracking-tight">
            Currently Borrowed
          </h3>
          <span className="text-xs font-bold text-[#151515]/50">2 Active</span>
        </div>

        <div className="space-y-3">
          {activeBorrows.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFDF7] border border-[#151515]/08 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between hover:border-[#151515]/20 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#151515] leading-tight">
                  {item.name}
                </span>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-[#151515]/65">
                  <Clock className="w-3 h-3 text-[#151515]/40" />
                  <span>
                    Due in <strong className="text-[#FF6755] font-black">{item.dueDays}</strong> ({item.dueDate})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLocation("/loans")}
                className="px-3.5 py-2 rounded-xl text-[11px] font-black uppercase bg-[#151515] text-[#FFFDF7] hover:bg-[#B92CFF] transition-all shrink-0 shadow-xs cursor-pointer active:scale-95"
              >
                Return →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusBorrowingActivity;
