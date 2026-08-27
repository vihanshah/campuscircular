import React, { useState } from "react";
import { Settings, Bell, Lock, User, LogOut, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

interface SettingsPanelProps {
  onEditProfile: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onEditProfile }) => {
  const [, setLocation] = useLocation();
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  const handleSignOut = () => {
    sessionStorage.clear();
    setLocation("/");
  };

  const handleNotificationClick = () => {
    setNoticeMsg("Notification preferences updated!");
    setTimeout(() => setNoticeMsg(null), 1800);
  };

  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-6 sm:p-7 space-y-4">
      
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-[#151515]" />
        <h3 className="text-xl font-black text-[#151515] tracking-tight">
          Account Settings
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-extrabold text-[#151515]">
        <button
          type="button"
          onClick={onEditProfile}
          className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 hover:bg-[#151518] hover:text-white transition-colors flex items-center gap-2 text-left"
        >
          <User className="w-4 h-4 text-[#B92CFF]" />
          <span>Personal Information</span>
        </button>

        <button
          type="button"
          onClick={handleNotificationClick}
          className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 hover:bg-[#151518] hover:text-white transition-colors flex items-center gap-2 text-left"
        >
          <Bell className="w-4 h-4 text-[#FDF0A6]" />
          <span>Notifications & Alerts</span>
        </button>

        <button
          type="button"
          onClick={() => setNoticeMsg("Privacy settings verified.")}
          className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 hover:bg-[#151518] hover:text-white transition-colors flex items-center gap-2 text-left"
        >
          <Lock className="w-4 h-4 text-[#34D399]" />
          <span>Privacy & Security</span>
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="p-3.5 rounded-2xl bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FF6755] hover:text-white transition-colors flex items-center gap-2 text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {noticeMsg && (
        <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3 rounded-2xl text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{noticeMsg}</span>
        </div>
      )}

    </div>
  );
};

export default SettingsPanel;
