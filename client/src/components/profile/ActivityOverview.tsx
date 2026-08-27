import React from "react";
import { StudentProfile } from "@/lib/profileData";

interface ActivityOverviewProps {
  profile: StudentProfile;
}

export const ActivityOverview: React.FC<ActivityOverviewProps> = ({ profile }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      
      <div className="bg-[#FFFDF7] border border-[#151515]/08 p-4 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#151515]/50">
          Successful Exchanges
        </span>
        <div className="text-3xl font-black text-[#151515] mt-1">
          {profile.successfulExchanges}
        </div>
      </div>

      <div className="bg-[#FFFDF7] border border-[#151515]/08 p-4 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#151515]/50">
          Items Shared
        </span>
        <div className="text-3xl font-black text-[#B92CFF] mt-1">
          {profile.itemsSharedCount}
        </div>
      </div>

      <div className="bg-[#FFFDF7] border border-[#151515]/08 p-4 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#151515]/50">
          Resources Borrowed
        </span>
        <div className="text-3xl font-black text-[#151515] mt-1">
          {profile.resourcesBorrowedCount}
        </div>
      </div>

      <div className="bg-[#FFFDF7] border border-[#151515]/08 p-4 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#15803D]">
          On-time Returns
        </span>
        <div className="text-3xl font-black text-[#15803D] mt-1">
          {profile.ontimeReturnPct}%
        </div>
      </div>

    </div>
  );
};

export default ActivityOverview;
