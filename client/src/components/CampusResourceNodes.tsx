import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Camera, Laptop, BookOpen, Music, Tv, Plus, ArrowUpRight, X, FolderPlus, Sparkles } from "lucide-react";
import { BRAND_COLORS } from "@/lib/theme";

interface GearFolder {
  id: string;
  title: string;
  categoryParam: string;
  count: string;
  itemsPreview: string;
  bgColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INITIAL_FOLDERS: GearFolder[] = [
  {
    id: "creative",
    title: "Creative & Cameras",
    categoryParam: "Photography",
    count: "14 ITEMS",
    itemsPreview: "Sony 4K, Shure Mic, Tripod...",
    bgColor: BRAND_COLORS.pastelYellow,
    textColor: "#151515",
    icon: Camera,
  },
  {
    id: "tech",
    title: "Tech & Laptops",
    categoryParam: "Electronics",
    count: "8 ITEMS",
    itemsPreview: "MacBook Pro M2, iPad Pro...",
    bgColor: BRAND_COLORS.pastelLavender,
    textColor: "#151515",
    icon: Laptop,
  },
  {
    id: "academic",
    title: "Academic & Books",
    categoryParam: "Books",
    count: "22 ITEMS",
    itemsPreview: "Calculators, AI Textbooks...",
    bgColor: BRAND_COLORS.pastelMint,
    textColor: "#151515",
    icon: BookOpen,
  },
  {
    id: "music",
    title: "Music & Audio",
    categoryParam: "Music",
    count: "6 ITEMS",
    itemsPreview: "Acoustic Guitar, Bose QC...",
    bgColor: BRAND_COLORS.pastelCoral,
    textColor: "#151515",
    icon: Music,
  },
  {
    id: "events",
    title: "Events & Outdoor",
    categoryParam: "Events",
    count: "12 ITEMS",
    itemsPreview: "4K Projectors, Rackets...",
    bgColor: BRAND_COLORS.pastelLime,
    textColor: "#151515",
    icon: Tv,
  },
];

const PASTEL_COLOR_OPTIONS = [
  { label: "Yellow", value: BRAND_COLORS.pastelYellow },
  { label: "Lavender", value: BRAND_COLORS.pastelLavender },
  { label: "Mint", value: BRAND_COLORS.pastelMint },
  { label: "Coral", value: BRAND_COLORS.pastelCoral },
  { label: "Lime", value: BRAND_COLORS.pastelLime },
  { label: "Blue", value: BRAND_COLORS.pastelBlue },
];

export const CampusResourceNodes: React.FC = () => {
  const [, setLocation] = useLocation();
  const [folders, setFolders] = useState<GearFolder[]>(INITIAL_FOLDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New folder form state
  const [folderTitle, setFolderTitle] = useState("");
  const [folderPreview, setFolderPreview] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Electronics");
  const [selectedColor, setSelectedColor] = useState<string>(BRAND_COLORS.pastelBlue);

  const handleFolderClick = (folder: GearFolder) => {
    setLocation(`/discover?category=${encodeURIComponent(folder.categoryParam)}`);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderTitle.trim()) return;

    const newFolder: GearFolder = {
      id: `folder-${Date.now()}`,
      title: folderTitle.trim(),
      categoryParam: selectedCategory,
      count: "0 ITEMS",
      itemsPreview: folderPreview.trim() || "Custom gear collection...",
      bgColor: selectedColor,
      textColor: "#151515",
      icon: Laptop,
    };

    setFolders((prev) => [...prev, newFolder]);
    setIsModalOpen(false);
    setFolderTitle("");
    setFolderPreview("");
  };

  return (
    <>
      <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-7 border border-[#151515]/08 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#151515] tracking-tight flex items-center gap-2">
              <span>Gear Folders & Categories</span>
              <span className="text-lg">📁</span>
            </h2>
            <p className="text-xs font-medium text-[#151515]/55 mt-0.5">
              Organized campus equipment collections ready to borrow
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-[#F3EFE6] text-[#151515] hover:bg-[#151515] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Folder</span>
          </button>
        </div>

        {/* Aesthetic Soft Pastel Folder Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => {
            const IconComp = folder.icon;

            return (
              <motion.div
                key={folder.id}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFolderClick(folder)}
                className="p-5 rounded-3xl border border-[#151515]/06 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] group"
                style={{
                  backgroundColor: folder.bgColor,
                  color: folder.textColor,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-black/05 flex items-center justify-center border border-black/08">
                    <IconComp className="w-4 h-4 text-[#151515]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-black/06 text-[#151515]/80 px-2.5 py-0.5 rounded-full">
                    {folder.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold tracking-tight leading-snug flex items-center justify-between text-[#151515]">
                    <span>{folder.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#151515]" />
                  </h3>
                  <p className="text-xs font-medium text-[#151515]/70 mt-1">
                    {folder.itemsPreview}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CREATE NEW FOLDER MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#151515]/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[32px] p-6 sm:p-8 max-w-md w-full relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFD928] text-[#151515] flex items-center justify-center">
                    <FolderPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#151515]">Create Gear Folder</h3>
                    <p className="text-xs font-semibold text-[#151515]/60">Organize your campus equipment</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-[#151515]/40 hover:text-[#151515]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                    Folder Title
                  </label>
                  <input
                    type="text"
                    value={folderTitle}
                    onChange={(e) => setFolderTitle(e.target.value)}
                    placeholder="e.g. Gaming & VR Gear"
                    className="w-full bg-[#FFFDF7] border border-[#151515]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#FFD928] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                    Item Preview Summary
                  </label>
                  <input
                    type="text"
                    value={folderPreview}
                    onChange={(e) => setFolderPreview(e.target.value)}
                    placeholder="e.g. PS5, Meta Quest 3, Controllers..."
                    className="w-full bg-[#FFFDF7] border border-[#151515]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#FFD928] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                    Target Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-[#151515]/15 rounded-2xl px-4 py-3 text-sm font-semibold text-[#151515] focus:outline-none focus:ring-2 focus:ring-[#FFD928] transition-all cursor-pointer"
                  >
                    <option value="Electronics">Electronics & Laptops</option>
                    <option value="Photography">Photography & Video</option>
                    <option value="Books">Books & Calculators</option>
                    <option value="Music">Music & Instruments</option>
                    <option value="Events">Events & Projectors</option>
                    <option value="Sports">Sports & Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#151515]/80 mb-1.5">
                    Theme Color
                  </label>
                  <div className="flex gap-2">
                    {PASTEL_COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => setSelectedColor(c.value)}
                        className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.value ? "border-[#151515] scale-110 shadow-sm" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.value }}
                      >
                        {selectedColor === c.value && <span className="text-xs font-black">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm uppercase bg-[#151515] text-[#FFFDF7] hover:bg-[#B92CFF] transition-colors shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD928]" />
                  <span>Create Folder →</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampusResourceNodes;
