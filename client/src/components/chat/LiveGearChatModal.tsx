import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Camera,
  BookOpen,
  Music,
  MapPin,
  ShieldCheck,
  CheckCheck,
  Sparkles,
  Paperclip,
  Smile,
} from "lucide-react";
import { getCurrentUser } from "@/lib/userStore";

export interface ChatMessageItem {
  id: string;
  sender: "you" | "partner";
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  partnerName: string;
  partnerRole: string;
  partnerAvatar: string;
  avatarBg: string;
  itemBadge: string;
  handoverLocation: string;
  lastMessage: string;
  lastTime: string;
  messages: ChatMessageItem[];
}

interface LiveGearChatModalProps {
  isOpen: boolean;
  activeThread: ChatThread | null;
  onClose: () => void;
  onSendMessage: (threadId: string, text: string) => void;
}

export const LiveGearChatModal: React.FC<LiveGearChatModalProps> = ({
  isOpen,
  activeThread,
  onClose,
  onSendMessage,
}) => {
  const currentUser = getCurrentUser();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  if (!isOpen || !activeThread) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(activeThread.id, inputText.trim());
    setInputText("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#151515]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.94, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 20 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] rounded-[32px] w-full max-w-lg my-auto relative overflow-hidden flex flex-col h-[620px] max-h-[85vh] text-[#151515]"
        >
          {/* HEADER */}
          <div className="bg-[#FFFDF7] border-b border-[#151515]/08 px-5 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border border-[#151515]/10 shadow-xs text-[#151515] shrink-0"
                style={{ backgroundColor: activeThread.avatarBg }}
              >
                {activeThread.partnerAvatar}
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-[#151515] truncate">
                    {activeThread.partnerName}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#151515]/60">
                  <span className="text-[#B92CFF] font-extrabold">{activeThread.itemBadge}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#151515]/40" />
                    <span>{activeThread.handoverLocation}</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#151515]/40 hover:text-[#151515] hover:bg-[#F3EFE6] rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="p-5 overflow-y-auto space-y-3.5 flex-1 bg-[#F8F6F0]/60">
            {/* Handover Info Banner */}
            <div className="bg-[#FFFDF7] border border-[#151515]/08 p-3 rounded-2xl text-[11px] font-medium text-[#151515]/70 text-center space-y-1">
              <span className="font-extrabold text-[#151515]">🔒 Verified Campus Exchange Chat</span>
              <p>Handover location: <strong>{activeThread.handoverLocation}</strong></p>
            </div>

            {activeThread.messages.map((msg) => {
              const isMe = msg.sender === "you";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-xs ${
                      isMe
                        ? "bg-[#151518] text-[#FFFDF7] rounded-tr-xs"
                        : "bg-[#FFFDF7] text-[#151515] border border-[#151515]/08 rounded-tl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-1 mt-1 px-1 text-[10px] font-mono text-[#151515]/40">
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#34D399]" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM FOOTER */}
          <form
            onSubmit={handleSend}
            className="bg-[#FFFDF7] border-t border-[#151515]/08 px-4 py-3 shrink-0 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeThread.partnerName.split(" ")[0]}...`}
              className="flex-1 bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl px-4 py-2.5 text-xs font-semibold text-[#151515] placeholder:text-[#151515]/40 focus:outline-none focus:ring-2 focus:ring-[#FFD928] transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-xl transition-all shadow-xs ${
                inputText.trim()
                  ? "bg-[#151518] text-[#FFFDF7] hover:bg-[#B92CFF] cursor-pointer active:scale-95"
                  : "bg-[#151518]/20 text-white/40 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveGearChatModal;
