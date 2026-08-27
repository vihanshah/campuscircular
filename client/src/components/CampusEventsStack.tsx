import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Clock, ArrowRight, Camera, BookOpen, Music, Plus } from "lucide-react";
import {
  useAppStore,
  getCurrentLoggedInUser,
  sendChatMessageInStore,
  DEFAULT_CHAT_THREADS,
  SharedChatThread,
} from "@/lib/appStore";
import { LiveGearChatModal } from "./chat/LiveGearChatModal";

export const CampusEventsStack: React.FC = () => {
  const store = useAppStore();
  const currentUser = getCurrentLoggedInUser();
  const threads: SharedChatThread[] =
    store.chatThreads && store.chatThreads.length > 0 ? store.chatThreads : DEFAULT_CHAT_THREADS;

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  const handleSendMessage = (threadId: string, text: string) => {
    sendChatMessageInStore(threadId, text);
  };

  const getItemIcon = (badge: string) => {
    if (badge.includes("Camera")) return Camera;
    if (badge.includes("Calculator")) return BookOpen;
    return Music;
  };

  return (
    <>
      <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-[#151515]/10 shadow-[0_10px_32px_rgba(0,0,0,0.04)] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-[#151515] tracking-tight flex items-center gap-2">
            <span>Live Gear Chats</span>
            <span className="text-base font-bold text-[#151515]/50">
              {threads.length} messages
            </span>
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D8FF32] text-[#151515]">
              Active
            </span>

            <button
              type="button"
              onClick={() => setActiveThreadId(threads[0].id)}
              className="px-2.5 py-1 rounded-full bg-[#151518] text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:bg-[#B92CFF] transition-all cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-3 h-3" />
              <span>+ Chat</span>
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {threads.map((thread) => {
            const IconComp = getItemIcon(thread.itemBadge);
            const isYouThread = thread.id === "thread-you";

            return (
              <motion.div
                key={thread.id}
                whileHover={{ x: 3 }}
                onClick={() => setActiveThreadId(thread.id)}
                className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#151515]/06 hover:border-[#151515]/25 hover:shadow-xs transition-all cursor-pointer flex items-start gap-3 group"
              >
                {/* Student Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 border border-[#151515]/10 shadow-xs text-[#151515]"
                  style={{
                    backgroundColor: thread.avatarBg,
                  }}
                >
                  {thread.partnerAvatar}
                </div>

                {/* Message Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#151515] truncate group-hover:text-[#B92CFF] transition-colors">
                      {thread.partnerName}
                    </span>
                    <span className="text-[10px] font-bold text-[#151515]/40 font-mono shrink-0">
                      {thread.lastTime}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#151515]/75 line-clamp-2 mt-1 leading-snug">
                    {thread.lastMessage}
                  </p>

                  {/* Gear Tag */}
                  <div className="inline-flex items-center gap-1 mt-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#FFFDF7] border border-[#151515]/10 text-[#151515]">
                    <IconComp className="w-3 h-3 text-[#B92CFF]" />
                    <span>{thread.itemBadge}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC CHAT MODAL */}
      <LiveGearChatModal
        isOpen={Boolean(activeThreadId)}
        activeThread={activeThread}
        onClose={() => setActiveThreadId(null)}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default CampusEventsStack;
