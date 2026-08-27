import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Sparkles } from "lucide-react";
import { MOCK_ACTIVITY_CHART_DATA } from "@/lib/adminData";

export const ExchangeActivityChart: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState("Thu");
  const activeData = MOCK_ACTIVITY_CHART_DATA.find((d) => d.day === selectedDay) || MOCK_ACTIVITY_CHART_DATA[3];

  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#00F2FE] tracking-wider block mb-0.5">
            EXCHANGE ACTIVITY
          </span>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            7-Day Campus Volume
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-[#232332] p-1 rounded-full border border-white/06">
          {MOCK_ACTIVITY_CHART_DATA.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                selectedDay === d.day
                  ? "bg-[#00F2FE] text-[#0F0F14] shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-[#232332] p-4 sm:p-5 rounded-2xl border border-white/06 space-y-4">
        
        <div className="flex items-end justify-between h-40 gap-2 pt-4 px-2">
          {MOCK_ACTIVITY_CHART_DATA.map((d) => {
            const isSelected = d.day === selectedDay;
            const heightPct = Math.min(100, Math.max(20, (d.requests / 120) * 100));

            return (
              <div
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-full flex items-end justify-center h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`w-full max-w-[28px] rounded-t-xl transition-all ${
                      isSelected
                        ? "bg-gradient-to-t from-[#FFD928] to-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                        : "bg-white/15 group-hover:bg-white/30"
                    }`}
                  />
                </div>

                <span
                  className={`text-[10px] font-mono font-bold ${
                    isSelected ? "text-[#00F2FE]" : "text-white/40"
                  }`}
                >
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Day Stats Breakdown */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/08 text-center">
          <div className="bg-[#1A1A24] p-2.5 rounded-xl border border-white/06">
            <span className="text-[9px] font-mono text-white/50 block">BORROW REQUESTS</span>
            <span className="text-base font-black text-[#00F2FE]">{activeData.requests}</span>
          </div>

          <div className="bg-[#1A1A24] p-2.5 rounded-xl border border-white/06">
            <span className="text-[9px] font-mono text-white/50 block">ACCEPTED</span>
            <span className="text-base font-black text-[#34D399]">{activeData.accepted}</span>
          </div>

          <div className="bg-[#1A1A24] p-2.5 rounded-xl border border-white/06">
            <span className="text-[9px] font-mono text-white/50 block">COMPLETED</span>
            <span className="text-base font-black text-[#B92CFF]">{activeData.completed}</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ExchangeActivityChart;
