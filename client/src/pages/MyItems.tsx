import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, Sparkles, Inbox, ShieldCheck, Star } from "lucide-react";
import { CampusDeiHeader } from "@/components/CampusDeiHeader";
import { AppFooter } from "@/components/AppFooter";
import { AddItemModal } from "@/components/items/AddItemModal";
import { useLocation } from "wouter";
import {
  loadAppStore,
  getCurrentLoggedInUser,
  addResourceToStore,
  SharedResource,
  useAppStore,
} from "@/lib/appStore";

export default function MyItems() {
  const [, setLocation] = useLocation();
  const store = useAppStore();
  const currentUser = getCurrentLoggedInUser();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter items owned by the currently logged in student
  const ownedResources = store.resources.filter(
    (r) => r.ownerId === currentUser.id || r.ownerId === currentUser.studentId
  );

  const handleAddItemSubmit = (newItem: any) => {
    addResourceToStore({
      name: newItem.name,
      category: newItem.category,
      description: newItem.description,
      condition: newItem.condition,
      pricePerDay: newItem.pricePerDay,
      depositDisplay: newItem.depositDisplay,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F9] text-[#151515] font-sans selection:bg-[#FFD928] selection:text-[#151515] relative pb-20">
      {/* Top Header */}
      <CampusDeiHeader />

      {/* Main Container */}
      <main className="container max-w-[1380px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8 pb-12">
        {/* PAGE HEADER SECTION */}
        <div className="bg-[#FFFDF7] border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[32px] p-6 sm:p-8 mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E2F1D0] text-[#15803D] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <Package className="w-3.5 h-3.5" />
                <span>Owner & Lender Portal</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#151515] tracking-tight leading-tight">
                My Items
              </h1>

              <p className="text-sm font-semibold text-[#151515]/70 mt-1">
                Equipment & resources owned by <strong className="text-[#151515]">{currentUser.name} ({currentUser.id})</strong>
              </p>
            </div>

            {/* PRIMARY CTA: + Add an item */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#151518] text-[#FDF0A6] hover:bg-[#B92CFF] hover:text-white transition-all font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#FDF0A6]" />
              <span>+ Add an item</span>
            </button>
          </div>

          {/* SUMMARY INDICATORS ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#151515]/08">
            <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#151515]/50 tracking-wider">Listed Items</span>
              <div className="text-2xl font-black text-[#151515] mt-0.5">{ownedResources.length}</div>
            </div>

            <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#151515]/50 tracking-wider">Trust Score</span>
              <div className="text-2xl font-black text-[#34D399] mt-0.5">{currentUser.trustScore}%</div>
            </div>

            <div className="bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#151515]/06">
              <span className="text-[10px] font-black uppercase text-[#151515]/50 tracking-wider">Successful Loans</span>
              <div className="text-2xl font-black text-[#B92CFF] mt-0.5">{currentUser.totalExchanges}</div>
            </div>

            <div className="bg-[#FFD928]/30 p-3.5 rounded-2xl border border-[#151515]/08">
              <span className="text-[10px] font-black uppercase text-[#151515]/70 tracking-wider">Eco Impact</span>
              <div className="text-2xl font-black text-[#151515] mt-0.5">{currentUser.co2SavedKg}kg CO2</div>
            </div>
          </div>
        </div>

        {/* OWNED RESOURCES LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#151515] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#34D399]" />
              <span>Your Listed Resources ({ownedResources.length})</span>
            </h2>
            <span className="text-xs font-bold text-[#151515]/50">
              Only visible to you as Owner ({currentUser.id})
            </span>
          </div>

          {ownedResources.length === 0 ? (
            <div className="p-12 text-center bg-[#FFFDF7] rounded-3xl border border-[#151515]/08 text-sm font-bold text-[#151515]/60 space-y-3">
              <p>You haven't listed any equipment yet as {currentUser.name}.</p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#151518] text-[#FFD928] font-black text-xs uppercase"
              >
                + List Your First Resource Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ownedResources.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-3xl p-5 flex flex-col justify-between relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-[#151515]"
                        style={{ backgroundColor: item.cardColor }}
                      >
                        {item.category}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#D7F3EB] text-[#15803D]">
                        Active Listing
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#151515]">{item.name}</h3>

                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-36 rounded-2xl object-cover border border-[#151515]/08"
                      />
                    )}

                    <p className="text-xs font-semibold text-[#151515]/70 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="bg-[#F8F6F0] p-3 rounded-2xl text-xs space-y-1 font-semibold border border-[#151515]/06">
                      <div className="flex justify-between">
                        <span className="text-[#151515]/60">Location:</span>
                        <span className="font-bold">{item.locationName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#151515]/60">Daily Rate:</span>
                        <span className="font-black text-[#151515]">{item.priceDisplay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#151515]/60">Deposit:</span>
                        <span className="font-black text-[#151515]">{item.depositDisplay}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-[#151515]/06 flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1 text-[#EAB308]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <strong className="text-[#151515]">{item.rating}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setLocation("/requests")}
                      className="px-3.5 py-1.5 rounded-xl bg-[#151518] text-white text-[11px] font-extrabold uppercase hover:bg-[#B92CFF] transition-colors"
                    >
                      View Requests →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ADD ITEM MODAL */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddItem={handleAddItemSubmit}
      />

      <AppFooter />
    </div>
  );
}
