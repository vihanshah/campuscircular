import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { CampusResource, MOCK_DISCOVER_RESOURCES } from "@/lib/discoverData";

interface AiAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResource: (resource: CampusResource) => void;
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
      // Filter mock results based on query keywords or return top 3 smart matches
      const matched = MOCK_DISCOVER_RESOURCES.slice(0, 3);
      setMatchedResults(matched);
    }, 1200);
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
                  onClick={() => setPrompt(chip)}
                  className="px-2.5 py-1 rounded-full bg-[#F3EFE6] text-[#151515]/80 hover:bg-[#151518] hover:text-white transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !prompt.trim()}
              className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-xs uppercase tracking-wider bg-[#151518] text-white hover:bg-[#B92CFF] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md"
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
            <div className="mt-6 pt-4 border-t border-[#151515]/08 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#151515]">
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                <span>Found 3 AI-Matched Resources Nearby:</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {matchedResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      onSelectResource(res);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 hover:border-[#151515]/20 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FDF0A6] text-[#151515]">
                        ✦ {res.matchPct}% Match
                      </span>
                      <h4 className="text-xs font-bold text-[#151515] mt-1">
                        {res.name}
                      </h4>
                      <span className="text-[10px] text-[#151515]/60 font-medium">
                        {res.distanceKm} km · {res.priceDisplay}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#151515]/40" />
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
