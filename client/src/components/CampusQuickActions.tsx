import React from "react";
import { useLocation } from "wouter";
import { Search, PlusCircle, Bookmark, Inbox, ArrowUpRight } from "lucide-react";
import { BRAND_COLORS } from "@/lib/theme";

interface QuickActionProps {
  onActionClick?: (action: string) => void;
}

export const CampusQuickActions: React.FC<QuickActionProps> = ({ onActionClick }) => {
  const [, setLocation] = useLocation();

  const actions = [
    {
      id: "find",
      title: "Find a Resource",
      desc: "Browse laptops, DSLR cameras, textbooks & lab gear available now.",
      icon: Search,
      bgColor: "#FFD928", // Yellow
      textColor: "#151515",
      badge: "1,248 Items",
      route: "/discover",
    },
    {
      id: "share",
      title: "Share a Resource",
      desc: "List gear you don't use every day to help your campus circle.",
      icon: PlusCircle,
      bgColor: "#B92CFF", // Purple
      textColor: "#FFFDF7",
      badge: "+100 Eco Pts",
      route: "/items",
    },
    {
      id: "borrowed",
      title: "My Borrowed Items",
      desc: "Track return due dates, extend loans, or request drop-offs.",
      icon: Bookmark,
      bgColor: "#CDEFEA", // Mint
      textColor: "#151515",
      badge: "2 Active",
      route: "/loans",
    },
    {
      id: "requests",
      title: "Manage Requests",
      desc: "Review incoming student requests for your shared equipment.",
      icon: Inbox,
      bgColor: "#FF6755", // Coral
      textColor: "#FFFDF7",
      badge: "3 Pending",
      route: "/requests",
    },
  ];

  const handleClick = (act: typeof actions[0]) => {
    if (onActionClick) {
      onActionClick(act.id);
    }
    setLocation(act.route);
  };

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] rounded-[32px] p-6 sm:p-7">
      
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#151515] tracking-tight">
            Quick Actions
          </h2>
          <p className="text-xs font-semibold text-[#151515]/55 mt-0.5">
            Everything you need to exchange gear across campus
          </p>
        </div>
        <span className="text-xs font-black text-[#151515] bg-[#D8FF32] border border-[#151515]/15 px-3 py-1 rounded-full uppercase">
          HUB
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => {
          const IconComp = act.icon;

          return (
            <div
              key={act.id}
              onClick={() => handleClick(act)}
              className="group cursor-pointer p-4 rounded-2xl border border-[#151515]/08 bg-[#FFFDF7] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: act.bgColor, color: act.textColor }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#F3EFE6] text-[#151515]">
                    {act.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-[#151515] tracking-tight flex items-center justify-between group-hover:text-[#B92CFF] transition-colors">
                  <span>{act.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-xs font-medium text-[#151515]/65 mt-1 leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#151515]/08 flex items-center text-xs font-black text-[#151515]">
                <span>Open action →</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CampusQuickActions;
