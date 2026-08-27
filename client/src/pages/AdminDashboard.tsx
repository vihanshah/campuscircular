import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MetricCardsRow } from "@/components/admin/MetricCardsRow";
import { AttentionPanel } from "@/components/admin/AttentionPanel";
import { ExchangeActivityChart } from "@/components/admin/ExchangeActivityChart";
import { ActiveExchangesTable } from "@/components/admin/ActiveExchangesTable";
import { OpenDisputesList } from "@/components/admin/OpenDisputesList";
import { ResourceHealthBar } from "@/components/admin/ResourceHealthBar";
import { AdminImpactSection } from "@/components/admin/AdminImpactSection";
import { RecentActivityTimeline } from "@/components/admin/RecentActivityTimeline";
import { AdminModals } from "@/components/admin/AdminModals";

// Modular Admin Tab Components
import { AdminUsersTab } from "@/components/admin/AdminUsersTab";
import { AdminResourcesTab } from "@/components/admin/AdminResourcesTab";
import { AdminExchangesTab } from "@/components/admin/AdminExchangesTab";
import { AdminLoansTab } from "@/components/admin/AdminLoansTab";
import { AdminOverdueTab } from "@/components/admin/AdminOverdueTab";
import { AdminDisputesTab } from "@/components/admin/AdminDisputesTab";
import { AdminSettlementsTab } from "@/components/admin/AdminSettlementsTab";
import { AdminImpactTab } from "@/components/admin/AdminImpactTab";
import { AdminSettingsTab } from "@/components/admin/AdminSettingsTab";

import {
  MOCK_ATTENTION_ITEMS,
  MOCK_ACTIVE_EXCHANGES,
  MOCK_OPEN_DISPUTES,
  AttentionItemData,
  OpenDispute,
} from "@/lib/adminData";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Modal States
  const [activeModal, setActiveModal] = useState<AttentionItemData["type"] | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<OpenDispute | null>(null);

  const handleReviewAttentionItem = (type: AttentionItemData["type"]) => {
    setActiveModal(type);
  };

  const handleReviewDispute = (dispute: OpenDispute) => {
    setSelectedDispute(dispute);
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] text-white flex flex-col md:flex-row font-sans selection:bg-[#00F2FE] selection:text-[#0F0F14]">
      {/* Admin Sidebar */}
      <AdminSidebar activeTab={activeTab} onTabSelect={(tab) => setActiveTab(tab)} />

      {/* Main Operational Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader />

        {/* Main Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1440px] mx-auto w-full">
          {/* 1. USERS TAB */}
          {activeTab === "users" && <AdminUsersTab />}

          {/* 2. RESOURCES TAB */}
          {activeTab === "resources" && <AdminResourcesTab />}

          {/* 3. EXCHANGES TAB */}
          {activeTab === "exchanges" && <AdminExchangesTab />}

          {/* 3B. ACTIVE LOANS TAB */}
          {activeTab === "loans" && <AdminLoansTab />}

          {/* 4. OVERDUE TAB */}
          {activeTab === "overdue" && <AdminOverdueTab />}

          {/* 5. DISPUTES TAB */}
          {activeTab === "disputes" && <AdminDisputesTab />}

          {/* 6. SETTLEMENTS TAB */}
          {activeTab === "settlements" && <AdminSettlementsTab />}

          {/* 7. CAMPUS IMPACT TAB */}
          {activeTab === "impact" && <AdminImpactTab />}

          {/* 8. SETTINGS TAB */}
          {activeTab === "settings" && <AdminSettingsTab />}

          {/* 9. OVERVIEW DASHBOARD (Default view) */}
          {activeTab === "overview" && (
            <>
              {/* Key Metrics Row */}
              <MetricCardsRow />

              {/* Needs Your Attention (High Priority Panel) */}
              <AttentionPanel
                items={MOCK_ATTENTION_ITEMS}
                onReviewItem={handleReviewAttentionItem}
              />

              {/* 7-Day Exchange Activity Chart & Resource Health */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <ExchangeActivityChart />
                </div>
                <div className="lg:col-span-5">
                  <ResourceHealthBar />
                </div>
              </div>

              {/* Active Exchanges Table */}
              <ActiveExchangesTable
                exchanges={MOCK_ACTIVE_EXCHANGES}
                onViewAll={() => setActiveTab("loans")}
              />

              {/* Open Disputes & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <OpenDisputesList
                    disputes={MOCK_OPEN_DISPUTES}
                    onReviewDispute={handleReviewDispute}
                  />
                </div>
                <div className="lg:col-span-5">
                  <RecentActivityTimeline />
                </div>
              </div>

              {/* Campus Impact Summary */}
              <AdminImpactSection />
            </>
          )}
        </main>
      </div>

      {/* Interactive Operations Modals */}
      <AdminModals
        activeModal={activeModal}
        selectedDispute={selectedDispute}
        onClose={() => {
          setActiveModal(null);
          setSelectedDispute(null);
        }}
      />
    </div>
  );
}
