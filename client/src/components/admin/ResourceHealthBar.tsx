import React from "react";
import { Package, CheckCircle2 } from "lucide-react";

export const ResourceHealthBar: React.FC = () => {
  const stats = [
    { label: "Available", count: 842, pct: 67.5, color: "#34D399" },
    { label: "Borrowed", count: 286, pct: 22.9, color: "#00F2FE" },
    { label: "Pending", count: 74, pct: 5.9, color: "#FDF0A6" },
    { label: "Paused", count: 46, pct: 3.7, color: "#9CA3AF" },
  ];

  return (
    <div className="bg-[#1A1A24] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[#00F2FE]" />
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Resource health & distribution
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-white/50">1,248 Total Listed</span>
      </div>

      {/* Distribution Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#232332] rounded-full overflow-hidden flex">
          {stats.map((s) => (
            <div
              key={s.label}
              style={{ width: `${s.pct}%`, backgroundColor: s.color }}
              className="h-full transition-all"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#232332] p-3 rounded-2xl border border-white/06">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs font-bold text-white/70">{s.label}</span>
              </div>
              <div className="text-xl font-black text-white">{s.count}</div>
              <div className="text-[10px] font-mono text-white/40">{s.pct}% of total</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories Strip */}
      <div className="pt-3 border-t border-white/08 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-white/60">
        <span>Top Categories:</span>
        <div className="flex flex-wrap gap-2">
          {["Photography (34%)", "Electronics (28%)", "Books (18%)", "Sports (12%)", "Music (8%)"].map((cat) => (
            <span key={cat} className="px-2.5 py-1 rounded-full bg-[#232332] border border-white/08 text-white/80 text-[11px] font-bold">
              {cat}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ResourceHealthBar;
