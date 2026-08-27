import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Clock, ArrowRight, Camera, BookOpen, Music, Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/userStore";
import { LiveGearChatModal, ChatThread } from "./chat/LiveGearChatModal";

export const CampusEventsStack: React.FC = () => {
  const currentUser = getCurrentUser();

  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: "thread-jordan",
      partnerName: "Jordan (Film Guild)",
      partnerRole: "Film Guild Exec",
      partnerAvatar: "J",
      avatarBg: "#FFD928",
      itemBadge: "Sony 4K Camera",
      handoverLocation: "Media Lab · TSEC Campus",
      lastMessage: "... finish filming with the Sony Alpha 4K camera today, ready for drop-off at Media Lab by 2pm!",
      lastTime: "14:00 Today",
      messages: [
        {
          id: "m1",
          sender: "partner",
          text: "Hey! I'm finishing filming with the Sony Alpha 4K camera today, ready for drop-off at Media Lab by 2pm!",
          timestamp: "14:00 Today",
        },
        {
          id: "m2",
          sender: "you",
          text: "Awesome! I'll be near the Media Lab after my 1:30 PM lecture.",
          timestamp: "14:05 Today",
        },
      ],
    },
    {
      id: "thread-you",
      partnerName: "Engineering Lab Admin",
      partnerRole: "Lab Tech",
      partnerAvatar: currentUser.avatar || "S",
      avatarBg: currentUser.avatarBg || "#B92CFF",
      itemBadge: "Scientific Calculator",
      handoverLocation: "Engineering Block B",
      lastMessage: "Confirmed! Returning Scientific Calculator to Engineering Block B right after my lecture.",
      lastTime: "1h ago",
      messages: [
        {
          id: "m3",
          sender: "you",
          text: "Confirmed! Returning Scientific Calculator to Engineering Block B right after my lecture.",
          timestamp: "1h ago",
        },
        {
          id: "m4",
          sender: "partner",
          text: "Thanks! Drop it off at Counter 3 with the lab assistant.",
          timestamp: "55m ago",
        },
      ],
    },
    {
      id: "thread-alex",
      partnerName: "Alex Rivera (Cinema Guild)",
      partnerRole: "Cinema Lead",
      partnerAvatar: "A",
      avatarBg: "#FF6755",
      itemBadge: "Acoustic Guitar",
      handoverLocation: "Student Center",
      lastMessage: "... meet tomorrow at Student Center to pick up the Yamaha Acoustic Guitar for Friday Jam session!",
      lastTime: "3h ago",
      messages: [
        {
          id: "m5",
          sender: "partner",
          text: "Hey! Let me know if you can meet tomorrow at Student Center to pick up the Yamaha Acoustic Guitar for Friday Jam session!",
          timestamp: "3h ago",
        },
        {
          id: "m6",
          sender: "you",
          text: "Sounds great! Is 4:00 PM fine?",
          timestamp: "2h ago",
        },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  const handleSendMessage = (threadId: string, text: string) => {
    const nowTime = "Just now";

    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id !== threadId) return thread;

        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: "you" as const,
          text,
          timestamp: nowTime,
        };

        return {
          ...thread,
          lastMessage: text,
          lastTime: nowTime,
          messages: [...thread.messages, newMsg],
        };
      })
    );

    // Simulate smart automated peer response after 1.2s
    setTimeout(() => {
      setThreads((prevThreads) =>
        prevThreads.map((thread) => {
          if (thread.id !== threadId) return thread;

          const partnerFirstName = thread.partnerName.split(" ")[0];
          const autoReplies = [
            `Sounds great! See you at ${thread.handoverLocation}.`,
            `Got it! Let me know when you reach there.`,
            `Perfect! Thanks for coordinating.`,
          ];
          const replyText = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          const replyMsg = {
            id: `reply-${Date.now()}`,
            sender: "partner" as const,
            text: replyText,
            timestamp: "Just now",
          };

          return {
            ...thread,
            lastMessage: replyText,
            lastTime: "Just now",
            messages: [...thread.messages, replyMsg],
          };
        })
      );
    }, 1200);
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

        {/* Messages List (Matches Reference Image Screen 1) */}
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
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 border border-[#151515]/10 shadow-xs"
                  style={{
                    backgroundColor: thread.avatarBg,
                    color: isYouThread ? "#FFFDF7" : "#151515",
                  }}
                >
                  {thread.partnerAvatar}
                </div>

                {/* Message Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#151515] truncate group-hover:text-[#B92CFF] transition-colors">
                      {isYouThread ? `You (${currentUser.name})` : thread.partnerName}
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
