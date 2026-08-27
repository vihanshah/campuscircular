import React from "react";
import { Activity, Plus, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import { MOCK_RECENT_ACTIVITY, RecentActivityLog } from "@/lib/adminData";

const ICON_MAP: Record<RecentActivityLog["iconType"], any> = {
  listing: Plus,
  completed: CheckCircle2,
  overdue: AlertTriangle,
  dispute: Scale,
};

export const RecentActivityTimeline: React.FC = () => {
  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#00F2FE]" />
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Recent activity
          </h3>
        </div>

        <span className="text-[10px] font-mono text-white/40">LIVE LOG</span>
      </div>

      <div className="space-y-3">
        {MOCK_RECENT_ACTIVITY.map((act) => {
          const IconComp = ICON_MAP[act.iconType];
          return (
            <div
              key={act.id}
              className="p-3.5 rounded-2xl bg-[#232332] border border-white/06 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-white/10 text-[#00F2FE] flex items-center justify-center shrink-0 font-bold">
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-extrabold text-white">{act.title}</div>
                  <div className="text-[#101015]/60 text-white/60 font-semibold mt-0.5">{act.description}</div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-white/40 whitespace-nowrap shrink-0">
                {act.timestamp}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RecentActivityTimeline;
