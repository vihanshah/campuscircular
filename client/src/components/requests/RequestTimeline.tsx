import React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import { RequestLifecycleStep } from "@/lib/requestsData";

interface RequestTimelineProps {
  lifecycle: RequestLifecycleStep[];
}

export const RequestTimeline: React.FC<RequestTimelineProps> = ({ lifecycle }) => {
  return (
    <div className="bg-[#F8F6F0] border border-[#151515]/06 rounded-2xl p-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between min-w-[480px] relative">
        
        {/* Connecting Line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#151515]/15 pointer-events-none z-0" />

        {lifecycle.map((step, idx) => (
          <div
            key={step.stage}
            className="flex flex-col items-center text-center relative z-10 space-y-1 flex-1"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all ${
                step.isCurrent
                  ? "bg-[#151518] text-[#FDF0A6] border-white ring-4 ring-[#B92CFF]/30 scale-110"
                  : step.isCompleted
                  ? "bg-[#34D399] text-[#151515] border-[#151515]/10"
                  : "bg-[#FFFDF7] text-[#151515]/30 border-[#151515]/15"
              }`}
            >
              {step.isCompleted ? (
                <Check className="w-3.5 h-3.5 text-[#151515] stroke-[3]" />
              ) : step.isCurrent ? (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FDF0A6] animate-ping" />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>

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

            {step.timestamp && (
              <span className="text-[8px] font-mono text-[#151515]/50 font-bold whitespace-nowrap">
                {step.timestamp.split(",")[0]}
              </span>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default RequestTimeline;
