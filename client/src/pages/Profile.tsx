import React, { useState } from "react";
import { motion } from "framer-motion";
import { CampusDeiHeader } from "@/components/CampusDeiHeader";
import { AppFooter } from "@/components/AppFooter";
import { MOCK_STUDENT_PROFILE, StudentProfile } from "@/lib/profileData";
import { getCurrentUser } from "@/lib/userStore";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { TrustScoreCard } from "@/components/profile/TrustScoreCard";
import { ActivityOverview } from "@/components/profile/ActivityOverview";
import { CommunityFeedbackSection } from "@/components/profile/CommunityFeedbackSection";
import { BorrowLendTabs } from "@/components/profile/BorrowLendTabs";
import { ImpactSection } from "@/components/profile/ImpactSection";
import { VerificationCard } from "@/components/profile/VerificationCard";
import { SettingsPanel } from "@/components/profile/SettingsPanel";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

import { getCurrentLoggedInUser } from "@/lib/appStore";

export default function Profile() {
  const currentUser = getCurrentLoggedInUser();
  const [profile, setProfile] = useState<StudentProfile>(() => ({
    ...MOCK_STUDENT_PROFILE,
    name: currentUser.name,
    username: currentUser.handle,
    email: currentUser.email,
    major: currentUser.department,
    year: currentUser.year,
    avatarInitial: currentUser.avatar,
    avatarBg: currentUser.avatarBg,
    trustScore: currentUser.trustScore,
    successfulExchangesCount: currentUser.totalExchanges,
    onTimeReturnRatePct: currentUser.onTimeReturnPct,
    co2SavedKg: currentUser.co2SavedKg,
    moneySavedRupees: currentUser.moneySavedRupees,
  }));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const scrollToSettings = () => {
    const el = document.getElementById("settings-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#151515] font-sans selection:bg-[#FFD928] selection:text-[#151515] relative pb-20">
      
      {/* Top Navigation */}
      <CampusDeiHeader />

      {/* Main Profile Container */}
      <main className="container max-w-[1380px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8 pb-12 space-y-8">
        
        {/* EDITORIAL PROFILE HEADER */}
        <ProfileHeader
          profile={profile}
          onEditProfile={() => setIsEditModalOpen(true)}
          onOpenSettings={scrollToSettings}
        />

        {/* TRUST SCORE & ACTIVITY OVERVIEW GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 Cols): Trust Score & Activity */}
          <div className="lg:col-span-7 space-y-8">
            <TrustScoreCard profile={profile} />
            <ActivityOverview profile={profile} />
            <CommunityFeedbackSection />
            <BorrowLendTabs />
          </div>

          {/* Right Column (5 Cols): Impact, Verification & Settings */}
          <div className="lg:col-span-5 space-y-8">
            <ImpactSection profile={profile} />
            <VerificationCard />
            <div id="settings-section">
              <SettingsPanel onEditProfile={() => setIsEditModalOpen(true)} />
            </div>
          </div>

        </div>

      </main>

      {/* INTERACTIVE EDIT PROFILE MODAL */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        profile={profile}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      <AppFooter />
    </div>
  );
}
