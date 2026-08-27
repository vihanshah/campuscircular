import { Link, useLocation } from "wouter";
import { Calendar, ShieldCheck } from "lucide-react";
import PillNav from "./PillNav";

export function TopNav() {
  const [location] = useLocation();
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const navItems = [
    { label: "Dashboard", href: "/app" },
    { label: "Discover", href: "/app#discover" },
    { label: "My Resources", href: "/app#resources" },
    { label: "Borrowed", href: "/app#borrowed" },
    { label: "Shared", href: "/app#shared" },
    { label: "Requests", href: "/app#requests" }
  ];

  return (
    <header className="bg-[#FFFDF7]/90 border-b border-[#151515]/08 sticky top-0 z-50 shrink-0 w-full backdrop-blur-md">
      <div className="container max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-[64px]">
          
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-[#FFD928] border border-[#151515]/10 shadow-xs flex items-center justify-center font-black text-sm text-[#151515] group-hover:scale-105 transition-transform">
                ♻
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-[#151515] tracking-tight leading-none uppercase">
                  Campus Circular
                </span>
                <span className="text-[9px] font-bold text-[#151515]/45 tracking-widest uppercase mt-0.5">
                  STUDENT HUB
                </span>
              </div>
            </Link>

            <div className="hidden md:block">
              <PillNav
                items={navItems}
                activeHref={location}
                baseColor="#151515"
                pillColor="#F3EFE6"
                pillTextColor="#151515"
                hoveredPillTextColor="#B92CFF"
                initialLoadAnimation={false}
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#151515]/60 font-semibold bg-[#F3EFE6]/70 px-3 py-1.5 rounded-full border border-[#151515]/06">
              <Calendar className="w-3.5 h-3.5 text-[#151515]/40" />
              <span>{dateStr.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[#151515] bg-[#CDEFEA]/40 px-3 py-1.5 rounded-full border border-[#151515]/08">
              <ShieldCheck className="w-3.5 h-3.5 text-[#151515]" />
              <span>Campus Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FFFDF7] border border-[#151515]/10 p-1 pr-3 rounded-full shadow-xs">
              <div className="w-7 h-7 rounded-full bg-[#B92CFF] text-[#FFFDF7] flex items-center justify-center font-black text-xs border border-white">
                A
              </div>
              <span className="text-xs font-extrabold text-[#151515] hidden sm:inline">
                Alex (CS '25)
              </span>
            </div>

            <div className="md:hidden">
              <PillNav
                items={navItems}
                activeHref={location}
                baseColor="#151515"
                pillColor="#F3EFE6"
                pillTextColor="#151515"
                hoveredPillTextColor="#B92CFF"
                initialLoadAnimation={false}
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
