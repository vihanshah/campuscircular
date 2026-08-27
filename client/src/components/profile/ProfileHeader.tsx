import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Edit3, Settings, Sparkles } from "lucide-react";
import { StudentProfile } from "@/lib/profileData";

interface ProfileHeaderProps {
  profile: StudentProfile;
  onEditProfile: () => void;
  onOpenSettings: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEditProfile,
  onOpenSettings,
}) => {
  return (
    <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-6 sm:p-8 relative overflow-hidden space-y-6">
      
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* User Info */}
        <div className="flex items-start sm:items-center gap-4">
          {/* Large Avatar */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center font-black text-2xl sm:text-3xl border border-[#151515]/10 shadow-xs shrink-0"
            style={{ backgroundColor: profile.avatarBg, color: "#151515" }}
          >
            {profile.avatarInitial}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-4xl font-black text-[#151515] tracking-tight">
                {profile.name}
              </h1>

              <span className="inline-flex items-center gap-1 bg-[#D7F3EB] text-[#15803D] border border-[#34D399]/30 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Campus Verified</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#151515]/70">
              {profile.major} · {profile.year} · <strong className="text-[#151515]">{profile.campus}</strong>
            </p>

            <p className="text-xs italic font-medium text-[#151515]/60 max-w-md pt-0.5">
              "{profile.bio}"
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onEditProfile}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/10 text-[#151515] hover:bg-[#151518] hover:text-white transition-all text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>

      </div>

      {/* Trust & Reputation Strip inside Header */}
      <div className="pt-4 border-t border-[#151515]/08 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#FDF0A6]/40 border border-[#151515]/06 px-3.5 py-1.5 rounded-2xl">
            <Sparkles className="w-4 h-4 text-[#854D0E]" />
            <span className="text-xs font-extrabold text-[#151515]">
              <strong className="text-sm font-black">{profile.trustScore}</strong> Trust Score
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F8F6F0] border border-[#151515]/06 px-3.5 py-1.5 rounded-2xl text-xs font-bold text-[#151515]">
            <span className="flex items-center gap-0.5 text-[#EAB308]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <strong className="text-sm font-black">{profile.averageRating}</strong>
            </span>
            <span className="text-[#151515]/50">({profile.reviewCount} reviews)</span>
          </div>
        </div>

        <span className="text-xs font-bold text-[#151515]/60 italic">
          "Trusted member of the Campus Circular community."
        </span>

      </div>

    </div>
  );
};

export default ProfileHeader;
