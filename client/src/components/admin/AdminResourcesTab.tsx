import React, { useState } from "react";
import { Package, Search, Filter, Trash2, Eye, ShieldCheck, Plus, CheckCircle2, PauseCircle, PlayCircle } from "lucide-react";
import { loadAppStore, saveAppStore, SharedResource, useAppStore } from "@/lib/appStore";

export const AdminResourcesTab: React.FC = () => {
  const store = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const resources = store.resources;

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.ownerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "All" || res.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDeleteResource = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove listing "${name}" from the campus directory?`)) {
      const updated = {
        ...store,
        resources: store.resources.filter((r) => r.id !== id),
      };
      saveAppStore(updated);
    }
  };

  const handleToggleAvailability = (id: string) => {
    const updatedResources = store.resources.map((r) => {
      if (r.id === id) {
        return { ...r, isAvailable: !r.isAvailable, isAvailableNow: !r.isAvailable };
      }
      return r;
    });
    const updated = { ...store, resources: updatedResources };
    saveAppStore(updated);
  };

  return (
    <div className="space-y-6 text-white font-sans">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1A1A24] p-6 rounded-3xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00F2FE] mb-1">
            <Package className="w-4 h-4" />
            <span>Campus Resource Inventory</span>
          </div>
          <h2 className="text-2xl font-black text-white">All Listed Equipment ({resources.length})</h2>
          <p className="text-xs font-semibold text-white/60 mt-0.5">
            Admin Management: Review, pause, or remove student-listed equipment across campus.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-white/70">
          <span className="bg-[#00F2FE]/10 text-[#00F2FE] px-3.5 py-1.5 rounded-full border border-[#00F2FE]/30 font-mono">
            {resources.filter((r) => r.isAvailable).length} Available Now
          </span>
        </div>
      </div>

      {/* SEARCH & CATEGORY FILTERS */}
      <div className="bg-[#1A1A24] p-4 rounded-2xl border border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by resource name, owner (CC1007), or location..."
            className="w-full pl-10 pr-4 py-2 bg-[#0F0F14] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00F2FE]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto shrink-0">
          {["All", "Photography", "Electronics", "Books", "Music", "Events"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? "bg-[#00F2FE] text-[#0F0F14]"
                  : "bg-white/05 text-white/70 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RESOURCES TABLE */}
      <div className="bg-[#1A1A24] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F0F14] border-b border-white/10 text-[11px] font-mono font-black uppercase text-white/50 tracking-wider">
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Owner (Student ID)</th>
                <th className="p-4">Rate & Deposit</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/06 font-semibold">
              {filteredResources.map((res) => (
                <tr key={res.id} className="hover:bg-white/04 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {res.imageUrl ? (
                        <img
                          src={res.imageUrl}
                          alt={res.name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-[#151515]"
                          style={{ backgroundColor: res.cardColor }}
                        >
                          📦
                        </div>
                      )}
                      <div>
                        <div className="font-extrabold text-white">{res.name}</div>
                        <div className="text-[10px] text-white/50">{res.condition} condition</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-[#151515]"
                      style={{ backgroundColor: res.cardColor }}
                    >
                      {res.category}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-extrabold text-white">{res.ownerName}</div>
                    <div className="text-[10px] font-mono text-[#00F2FE]">{res.ownerId}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-black text-[#FFD928]">{res.priceDisplay}</div>
                    <div className="text-[10px] text-white/50">{res.depositDisplay}</div>
                  </td>

                  <td className="p-4 text-white/80">{res.locationName}</td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase ${
                        res.isAvailable
                          ? "bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {res.isAvailable ? "Active" : "Paused"}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(res.id)}
                      className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      title={res.isAvailable ? "Pause Listing" : "Activate Listing"}
                    >
                      {res.isAvailable ? <PauseCircle className="w-4 h-4 text-amber-400" /> : <PlayCircle className="w-4 h-4 text-emerald-400" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteResource(res.id, res.name)}
                      className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Resource"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminResourcesTab;
