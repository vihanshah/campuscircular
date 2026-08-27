import React, { useState } from "react";
import { Search, Bell, ShieldCheck, Calendar, Sparkles } from "lucide-react";

export const AdminHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-[#14141B] border-b border-white/10 p-4 lg:px-8 sticky top-0 z-40 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Title & Date */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] mb-0.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Thursday, August 27, 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, Admin 👋
          </h1>

          <p className="text-xs font-medium text-white/60">
            Here's what's happening across your campus community.
          </p>
        </div>

        {/* Top Controls & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative hidden md:flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, users, disputes... (⌘K)"
              className="bg-[#1F1F2C] border border-white/10 rounded-full pl-9 pr-10 py-2 text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00F2FE]"
            />
            <span className="absolute right-3 text-[10px] font-mono text-white/40">⌘K</span>
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#1F1F2C] border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F87171]" />
          </button>

          {/* Admin Profile Dock */}
          <div className="flex items-center gap-2.5 bg-[#1F1F2C] border border-white/10 p-1.5 pr-3.5 rounded-full">
            <div className="w-8 h-8 rounded-full bg-[#B92CFF] text-white flex items-center justify-center font-black text-xs shadow-xs">
              A
            </div>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-xs font-bold text-white leading-tight">Campus Administrator</span>
              <span className="text-[9px] text-[#34D399] font-mono font-bold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 inline" /> Verified Ops
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminHeader;
