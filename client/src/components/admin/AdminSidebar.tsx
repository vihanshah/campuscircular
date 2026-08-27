import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Package,
  Repeat,
  Clock,
  AlertTriangle,
  Scale,
  CreditCard,
  Leaf,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { loadAppStore } from "@/lib/appStore";

interface AdminSidebarProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabSelect }) => {
  const [, setLocation] = useLocation();
  const store = loadAppStore();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const userCount = store.users.length;
  const resourceCount = store.resources.length;
  const activeLoansCount = store.loans.length;

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users, badge: `${userCount}` },
    { id: "resources", label: "Resources", icon: Package, badge: `${resourceCount}` },
    { id: "exchanges", label: "Exchanges", icon: Repeat },
    { id: "loans", label: "Active Loans", icon: Clock, badge: `${activeLoansCount}` },
    { id: "overdue", label: "Overdue", icon: AlertTriangle, badge: "2", badgeColor: "#F87171" },
    { id: "disputes", label: "Disputes", icon: Scale, badge: "2", badgeColor: "#F87171" },
    { id: "settlements", label: "Settlements", icon: CreditCard },
    { id: "impact", label: "Campus Impact", icon: Leaf },
  ];

  const handleSignOut = () => {
    sessionStorage.clear();
    setLocation("/");
  };

  const handleSelectTab = (id: string) => {
    onTabSelect(id);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      {/* MOBILE BAR (Shown on small screens < md) */}
      <div className="md:hidden bg-[#0F0F14] border-b border-white/10 p-3.5 flex items-center justify-between sticky top-0 z-50 text-[#FFFDF7]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#00F2FE] text-[#0F0F14] flex items-center justify-center font-black text-sm">
            ♻
          </div>
          <span className="font-extrabold text-sm text-white tracking-tight">
            Campus Circular Admin
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2 rounded-xl bg-white/05 hover:bg-white/10 text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
        >
          {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Menu</span>
        </button>
      </div>

      {/* MOBILE EXPANDABLE DRAWER */}
      {mobileDrawerOpen && (
        <div className="md:hidden bg-[#0F0F14] border-b border-white/10 p-4 space-y-2 z-50 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#00F2FE] text-[#0F0F14] font-extrabold"
                      : "bg-[#181820] text-white/80 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black bg-white/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs font-bold">
            <button
              onClick={() => handleSelectTab("settings")}
              className="text-white/60 hover:text-white"
            >
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Shown on md+ screens) */}
      <aside className="hidden md:flex w-64 bg-[#0F0F14] border-r border-white/10 flex-col justify-between p-4 shrink-0 min-h-screen text-[#FFFDF7]">
        <div className="space-y-6">
          {/* Brand Header */}
          <Link href="/" className="flex items-center gap-3 px-2 py-1 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-[#00F2FE] text-[#0F0F14] flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(0,242,254,0.3)] group-hover:scale-105 transition-transform">
              ♻
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-white tracking-tight leading-none">
                Campus Circular
              </span>
              <span className="text-[10px] font-mono font-bold text-[#00F2FE] uppercase tracking-widest mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 inline" /> Admin Console
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#00F2FE] text-[#0F0F14] shadow-[0_0_20px_rgba(0,242,254,0.25)] font-extrabold"
                      : "text-white/70 hover:text-white hover:bg-white/06"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#0F0F14]" : "text-white/60"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
                        isActive
                          ? "bg-[#0F0F14] text-[#00F2FE]"
                          : "bg-white/10 text-white"
                      }`}
                      style={item.badgeColor ? { backgroundColor: item.badgeColor, color: "#FFF" } : undefined}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Footer Actions */}
        <div className="pt-4 border-t border-white/10 space-y-1">
          <button
            type="button"
            onClick={() => onTabSelect("settings")}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/06 transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4 text-white/60" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
