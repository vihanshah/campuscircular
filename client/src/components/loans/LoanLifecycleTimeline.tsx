import React from "react";
import { Check, Clock, AlertTriangle, AlertCircle, Sparkles } from "lucide-react";
import { LoanLifecycleStep, LifecycleStage } from "@/lib/loansData";

interface LoanLifecycleTimelineProps {
  lifecycle: LoanLifecycleStep[];
  dueDaysRemaining?: number;
  isOverdue?: boolean;
  overdueDays?: number;
}

export const LoanLifecycleTimeline: React.FC<LoanLifecycleTimelineProps> = ({
  lifecycle,
  dueDaysRemaining = 2,
  isOverdue = false,
  overdueDays = 1,
}) => {
  return (
    <div className="space-y-4">
      
      {/* Alert Warning Strip (Overdue or Due Soon alert) */}
      {isOverdue ? (
        <div className="bg-[#FEE2E2] border border-[#FF6755]/30 text-[#151515] p-3 rounded-2xl flex items-center justify-between text-xs font-black">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF6755] text-white flex items-center justify-center font-black text-xs shrink-0">
              !
            </div>
            <span>Overdue by {overdueDays} day(s)! Please return immediately to avoid penalties.</span>
          </div>
          <span className="bg-[#FF6755] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
            URGENT
          </span>
        </div>
      ) : dueDaysRemaining <= 2 ? (
        <div className="bg-[#FDF0A6] border border-[#151515]/10 text-[#151515] p-3 rounded-2xl flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#151515] shrink-0" />
            <span>⚠ Return due in <strong>{dueDaysRemaining} days</strong>. Plan drop-off with owner.</span>
          </div>
          <span className="bg-[#151518] text-[#FDF0A6] px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase">
            Due Soon
          </span>
        </div>
      ) : null}

      {/* 9-Stage Connected Visual Timeline Bar */}
      <div className="bg-[#F8F6F0] border border-[#151515]/06 rounded-2xl p-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[620px] relative">
          
          {/* Background Connecting Bar */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#151515]/15 pointer-events-none z-0" />

          {lifecycle.map((step, idx) => {
            return (
              <div
                key={step.stage}
                className="flex flex-col items-center text-center relative z-10 space-y-1.5 flex-1"
              >
                {/* Node Icon Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all shadow-xs ${
                    step.isCurrent
                      ? "bg-[#151518] text-[#FDF0A6] border-white ring-4 ring-[#B92CFF]/30 scale-110"
                      : step.isCompleted
                      ? "bg-[#34D399] text-[#151515] border-[#151515]/10"
                      : "bg-[#FFFDF7] text-[#151515]/30 border-[#151515]/15"
                  }`}
                >
                  {step.isCompleted ? (
                    <Check className="w-4 h-4 text-[#151515] stroke-[3]" />
                  ) : step.isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-[#FDF0A6] animate-ping" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Step Title Label */}
                <span
                  className={`text-[10px] font-black uppercase tracking-wider ${
                    step.isCurrent
                      ? "text-[#151518] font-extrabold"
                      : step.isCompleted
                      ? "text-[#151515]"
                      : "text-[#151515]/40"
                  }`}
                >
                  {step.label}
                </span>

                {/* Timestamp if available */}
                {step.timestamp && (
                  <span className="text-[9px] font-mono text-[#151515]/50 font-bold whitespace-nowrap">
                    {step.timestamp.split(",")[0]}
                  </span>
                )}
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};

export default LoanLifecycleTimeline;
