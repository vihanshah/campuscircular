"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    name: "Ananya Roy",
    role: "Computer Science @ IIT Bombay",
    content: "The Subject Stress Engine completely changed how I organize exam season. Seeing my strain score drop as I finished high-urgency tasks gave me so much peace of mind.",
    avatar: "AR",
    rating: 5,
    tag: "Academic Stress",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Clinical Psychologist (Ph.D. NIMHANS)",
    content: "I recommend Mentebloom to my student clients. The WebGL mood check-in makes daily emotional reflection intuitive, and keeping data local respects client privacy.",
    avatar: "PS",
    rating: 5,
    tag: "Clinical Care",
  },
  {
    name: "Siddharth Verma",
    role: "Electrical Engineering @ BITS Pilani",
    content: "The 30-day habit matrix and rotating streak border kept me on track with meditation and sleep during placement season. 28-day streak and counting!",
    avatar: "SV",
    rating: 5,
    tag: "Habits & Streaks",
  },
]

const testimonials2 = [
  {
    name: "Maya Kapoor",
    role: "Pre-Med Student @ Stanford",
    content: "The 4-4-4 box breathing widget before organic chemistry exams is my secret weapon. The whole editorial design feels like a calm sanctuary.",
    avatar: "MK",
    rating: 5,
    tag: "Guided Breathwork",
  },
  {
    name: "Rohan Mukherjee",
    role: "Graduate Researcher @ IISc",
    content: "Having sleep correlation and water tracking side-by-side with my research workload revealed that 7.5 hours of sleep directly boosted my problem-solving clarity.",
    avatar: "RM",
    rating: 5,
    tag: "Biometrics & Sleep",
  },
  {
    name: "Sneha Patel",
    role: "Architecture Final Year @ DTU",
    content: "The daily journal sentiment analysis is wonderful. It helps me acknowledge when I'm burnt out and need a 10-minute soundscape reset.",
    avatar: "SP",
    rating: 5,
    tag: "Sentiment Journal",
  },
]

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#faf8f5] text-[#1a1a1a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8e4df]/60 border border-[#d8d3cb] text-xs font-mono font-medium text-neutral-700 mb-4">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            TESTED & TRUSTED BY STUDENTS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#1a1a1a]">
            Stories of balance, focus & resilience
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-600">
            Hear how thousands of students and certified psychologists use Mentebloom daily.
          </p>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e8e4df] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#faf8f5] border border-[#e8e4df] text-neutral-600 font-semibold">
                    {t.tag}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed italic font-serif mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#e8e4df]/60">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs font-mono">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-mono">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials2.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e8e4df] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#faf8f5] border border-[#e8e4df] text-neutral-600 font-semibold">
                    {t.tag}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed italic font-serif mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#e8e4df]/60">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-xs font-mono">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-mono">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
