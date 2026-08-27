import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, ShieldCheck, User, Calendar, Sparkles, ChevronDown, LogOut, Menu, X } from "lucide-react";
import PillNav from "./PillNav";
import { getCurrentLoggedInUser, switchUserSession, DEMO_STUDENTS } from "@/lib/appStore";

export const CampusDeiHeader: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = getCurrentLoggedInUser();

  const navItems = [
    { label: "Dashboard", href: "/app" },
    { label: "Discover", href: "/discover" },
    { label: "My Loans", href: "/loans" },
    { label: "My Requests", href: "/requests" },
    { label: "My Items", href: "/items" },
    { label: "Profile", href: "/profile" },
  ];

  const handleSwitchUser = (studentId: string) => {
    switchUserSession(studentId);
    setShowSwitchMenu(false);
    setMobileMenuOpen(false);
    window.location.reload();
  };

  return (
    <header className="bg-[#0F0F14] text-[#FFFDF7] sticky top-0 z-50 shrink-0 w-full border-b border-white/10 shadow-lg">
      <div className="container max-w-[1380px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-[64px] gap-3">
          {/* Left — Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-9 h-9 rounded-2xl bg-[#FDF0A6] text-[#151515] flex items-center justify-center font-black text-base shadow-[0_4px_12px_rgba(253,240,166,0.3)] group-hover:scale-105 transition-transform">
                ♻
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none">
                  Campus Circular
                </span>
                <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase mt-0.5 hidden sm:block">
                  CAMPUS HUB
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block pl-2">
              <PillNav
                items={navItems}
                activeHref={location}
                baseColor="#181820"
                pillColor="#252530"
                pillTextColor="#FFFDF7"
                hoveredPillTextColor="#FDF0A6"
                initialLoadAnimation={false}
              />
            </div>
          </div>

          {/* Center — Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campus gear, profile, loans... (⌘K)"
              className="w-full bg-[#1A1A22] border border-white/10 rounded-full pl-10 pr-12 py-2 text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FDF0A6] transition-all shadow-inner"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-mono text-white/40">
              ⌘K
            </div>
          </div>

          {/* Right — Notifications, Trust Signal, Switch Student & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative">
            {/* Quick Demo User Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSwitchMenu(!showSwitchMenu)}
                className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FFD928] text-[#151515] text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm hover:bg-[#FFE156] transition-colors cursor-pointer"
                title="Switch Demo Student Account"
              >
                <span>{currentUser.id}</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              {showSwitchMenu && (
                <div className="absolute right-0 top-10 z-50 w-56 bg-[#151518] border border-white/15 rounded-2xl p-2 shadow-2xl space-y-1 text-xs">
                  <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#FFD928] border-b border-white/10 mb-1">
                    Switch Demo Account:
                  </div>
                  {DEMO_STUDENTS.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleSwitchUser(st.id)}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left font-semibold flex items-center justify-between transition-colors ${
                        st.id === currentUser.id
                          ? "bg-[#FFD928] text-[#151515] font-black"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{st.id} · {st.name.split(" ")[0]}</span>
                      <span className="text-[10px] font-mono opacity-60">({st.department.slice(0, 5)})</span>
                    </button>
                  ))}
                  <div className="pt-1 border-t border-white/10">
                    <button
                      onClick={() => {
                        setShowSwitchMenu(false);
                        setLocation("/admin");
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl text-left font-black text-[#B92CFF] hover:bg-[#B92CFF]/20 transition-colors flex items-center justify-between"
                    >
                      <span>Go to Admin Portal</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden xl:flex items-center gap-1.5 bg-[#1A2E2B] border border-[#34D399]/30 px-3 py-1 rounded-full text-xs font-bold text-[#34D399]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Campus Verified</span>
            </div>

            <Link
              href="/profile"
              className="flex items-center gap-2 bg-[#1A1A22] border border-white/10 p-1 sm:pr-3 rounded-full hover:bg-[#252530] transition-colors cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-full text-[#151515] flex items-center justify-center font-black text-xs"
                style={{ backgroundColor: currentUser.avatarBg }}
              >
                {currentUser.avatar}
              </div>
              <div className="flex flex-col text-left hidden sm:flex">
                <span className="text-xs font-bold text-white leading-tight">{currentUser.name}</span>
                <span className="text-[9px] text-white/50 font-medium">
                  {currentUser.department.slice(0, 8)} · {currentUser.handle}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setLocation("/")}
              className="p-1.5 sm:p-2 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-2 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-colors ${
                    location === item.href
                      ? "bg-[#FFD928] text-[#151515] font-black"
                      : "bg-[#181820] text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/70">
              <span className="text-[10px] font-mono text-[#FFD928]">Active User: {currentUser.name} ({currentUser.id})</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLocation("/admin");
                }}
                className="text-[#B92CFF] hover:underline text-xs"
              >
                Admin Portal →
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CampusDeiHeader;
