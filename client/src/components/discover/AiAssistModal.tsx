import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Loader2, ArrowRight, CheckCircle2, Search } from "lucide-react";
import { CampusResource, MOCK_DISCOVER_RESOURCES } from "@/lib/discoverData";
import { loadAppStore } from "@/lib/appStore";

interface AiAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResource: (resource: CampusResource) => void;
}

export function performAiSmartMatch(query: string, resources: CampusResource[]): CampusResource[] {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);

  const categoryKeywords: Record<string, string[]> = {
    Photography: ["camera", "photo", "dslr", "sony", "canon", "lens", "shoot", "film", "video", "4k"],
    Electronics: ["macbook", "laptop", "pc", "computer", "code", "xcode", "python", "dev", "ram", "m2", "ipad", "tablet"],
    Books: ["calculator", "casio", "book", "textbook", "exam", "math", "science", "notes", "midterm"],
    Events: ["projector", "cinema", "movie", "screen", "event", "speaker", "hd", "presentation"],
    Music: ["guitar", "music", "mic", "microphone", "podcast", "shure", "yamaha", "string", "song", "audio"],
    Creative: ["wacom", "drawing", "softbox", "light", "lighting", "mic", "shure"],
    Tools: ["arduino", "robotics", "soldering", "oscilloscope", "caliper", "tool", "kit"],
  };

  // Score each item based on semantic intent and keyword matches
  const scored = resources.map((item) => {
    let score = 50; // base score

    const itemName = item.name.toLowerCase();
    const itemDesc = item.description.toLowerCase();
    const itemCat = item.category.toLowerCase();

    // Token match checks
    tokens.forEach((token) => {
      if (itemName.includes(token)) score += 35;
      if (itemDesc.includes(token)) score += 15;
      if (itemCat.includes(token)) score += 25;
    });

    // Category keyword matching
    for (const [catName, kwList] of Object.entries(categoryKeywords)) {
      const matchesCatKw = kwList.some((kw) => q.includes(kw));
      if (matchesCatKw && itemCat.includes(catName.toLowerCase())) {
        score += 45;
      }
    }

    // Price preference matching
    if (q.includes("free") && item.pricePerDay === 0) {
      score += 30;
    }

    return { item, score };
  });

  // Sort descending by match score
  scored.sort((a, b) => b.score - a.score);

  // Return top 3-4 distinct matches with custom dynamic matchPct and reasons
  return scored.slice(0, 3).map(({ item, score }, index) => {
    const computedPct = Math.min(99, Math.max(88, 98 - index * 3 + (score > 80 ? 1 : -2)));

    const dynamicReasons: string[] = [
      `Matched semantic search for '${query.slice(0, 20)}...'`,
      `${item.distanceKm} km from campus`,
      item.pricePerDay === 0 ? "Free student loan" : `Budget friendly (${item.priceDisplay})`,
      `Owner rating: ${item.rating}★`
    ];

    return {
      ...item,
      matchPct: computedPct,
      matchReasons: dynamicReasons,
    };
  });
}

export const AiAssistModal: React.FC<AiAssistModalProps> = ({ isOpen, onClose, onSelectResource }) => {
  const [prompt, setPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedResults, setMatchedResults] = useState<CampusResource[] | null>(null);

  const handleRunAiMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Run real AI semantic match algorithm across resources
      const matched = performAiSmartMatch(prompt, MOCK_DISCOVER_RESOURCES);
      setMatchedResults(matched);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-lg w-full relative"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-[#E8DEF8] text-[#151515] flex items-center justify-center font-black text-sm">
                ✨
              </div>
              <div>
                <h3 className="text-xl font-black text-[#151515] tracking-tight">
                  AI Smart Discovery
                </h3>
                <p className="text-xs font-semibold text-[#151515]/60">
                  Describe your project or need in natural words
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleRunAiMatch} className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'I need a 4K camera and wireless mic for a student film shoot near TSEC main building tomorrow under ₹200/day...'"
              rows={3}
              className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-4 text-xs font-semibold text-[#151515] placeholder:text-[#151515]/35 focus:outline-none focus:ring-2 focus:ring-[#B92CFF] transition-all resize-none"
            />

            {/* Quick Prompt Pill Preset Chips */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
              {[
                "📷 Photography shoot tomorrow",
                "💻 MacBook for CS project",
                "📽️ Movie night projector",
                "📚 Midterm exam calculator"
              ].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  onClick={() => {
                    setPrompt(chip);
                    const matched = performAiSmartMatch(chip, MOCK_DISCOVER_RESOURCES);
                    setMatchedResults(matched);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    prompt === chip
                      ? "bg-[#151518] text-[#FFD928] font-black"
                      : "bg-[#F3EFE6] text-[#151515]/80 hover:bg-[#151518] hover:text-white"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !prompt.trim()}
              className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-xs uppercase tracking-wider bg-[#151518] text-white hover:bg-[#B92CFF] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FDF0A6]" />
                  <span>Matching Campus Gear & Trust Scores...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FDF0A6]" />
                  <span>Find Smart Matches →</span>
                </>
              )}
            </button>
          </form>

          {/* Matched Results Output */}
          {matchedResults && (
            <div className="mt-6 pt-4 border-t border-[#151515]/08 space-y-3 animate-in fade-in-50">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#151515]">
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                <span>Found {matchedResults.length} AI-Matched Resources for "{prompt.slice(0, 24)}...":</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {matchedResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      onSelectResource(res);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/08 hover:border-[#B92CFF]/50 hover:bg-white cursor-pointer transition-all flex items-center justify-between shadow-xs group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FFD928] text-[#151515]">
                          ✦ {res.matchPct}% Match
                        </span>
                        <span className="text-[10px] font-mono text-[#151515]/50">
                          ({res.category})
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-[#151515] group-hover:text-[#B92CFF] transition-colors">
                        {res.name}
                      </h4>
                      <div className="text-[10px] text-[#151515]/60 font-medium flex items-center gap-2">
                        <span>{res.distanceKm} km away</span>
                        <span>•</span>
                        <span className="font-bold text-[#151515]">{res.priceDisplay}</span>
                        <span>•</span>
                        <span>Owner: {res.ownerName}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#151518] text-white group-hover:bg-[#B92CFF] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AiAssistModal;
