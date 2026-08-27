import React from "react";
import { Filter, RotateCcw, ShieldCheck, MapPin, Check, X } from "lucide-react";

export interface FilterState {
  availability: string;
  distance: string;
  condition: string;
  price: string;
  trust: string;
}

interface DiscoverFilterPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  onCloseMobileDrawer?: () => void;
  isMobileDrawer?: boolean;
}

export const DiscoverFilterPanel: React.FC<DiscoverFilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  onCloseMobileDrawer,
  isMobileDrawer = false,
}) => {
  return (
    <div className={`bg-[#FFFDF7] border border-[#151515]/08 rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-6 ${isMobileDrawer ? 'w-full' : ''}`}>
      
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#151515]/08">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#151515]" />
          <h3 className="text-base font-black text-[#151515] tracking-tight uppercase">
            Filter Resources
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-bold text-[#151515]/60 hover:text-[#B92CFF] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear filters</span>
          </button>

          {isMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="p-1 text-[#151515]/50 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* AVAILABILITY */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-2">
          Availability
        </label>
        <div className="space-y-1.5">
          {["Any", "Available now", "Available on selected date"].map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange("availability", opt)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                filters.availability === opt
                  ? "bg-[#151518] text-white border-transparent shadow-xs"
                  : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06 hover:border-[#151515]/20"
              }`}
            >
              <span>{opt}</span>
              {filters.availability === opt && <Check className="w-3.5 h-3.5 text-[#FDF0A6]" />}
            </label>
          ))}
        </div>
      </div>

      {/* DISTANCE */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-2">
          Distance Radius
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {["Any", "Under 1 km", "Under 3 km", "Under 5 km"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => onFilterChange("distance", opt)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                filters.distance === opt
                  ? "bg-[#151518] text-white border-transparent shadow-xs"
                  : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06 hover:border-[#151515]/20"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* CONDITION */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-2">
          Condition
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {["Any", "New", "Excellent", "Good"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => onFilterChange("condition", opt)}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                filters.condition === opt
                  ? "bg-[#151518] text-white border-transparent shadow-xs"
                  : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06 hover:border-[#151515]/20"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-2">
          Daily Price
        </label>
        <div className="space-y-1.5">
          {["Any", "Free", "Under ₹100/day", "Under ₹250/day"].map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange("price", opt)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                filters.price === opt
                  ? "bg-[#151518] text-white border-transparent shadow-xs"
                  : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06 hover:border-[#151515]/20"
              }`}
            >
              <span>{opt}</span>
              {filters.price === opt && <Check className="w-3.5 h-3.5 text-[#FDF0A6]" />}
            </label>
          ))}
        </div>
      </div>

      {/* TRUST */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-2">
          Community Trust Level
        </label>
        <div className="space-y-1.5">
          {["Any", "Verified owners", "High trust only"].map((opt) => (
            <label
              key={opt}
              onClick={() => onFilterChange("trust", opt)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                filters.trust === opt
                  ? "bg-[#151518] text-white border-transparent shadow-xs"
                  : "bg-[#F8F6F0] text-[#151515]/75 border-[#151515]/06 hover:border-[#151515]/20"
              }`}
            >
              <span>{opt}</span>
              {filters.trust === opt && <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DiscoverFilterPanel;
