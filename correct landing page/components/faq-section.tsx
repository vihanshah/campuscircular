"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does Mentebloom calculate my Academic Stress Score?",
    answer:
      "Our Academic Stress Engine calculates a 0–100 strain index using a multi-factor formula: (Estimated Study Hours × Subject Difficulty Multiplier × Deadline Urgency Weight). Tasks due within 24 hours receive a 2.1x urgency multiplier, while overdue tasks scale up to 2.5x, giving you an honest look at impending deadlines so you can balance study sessions effectively.",
  },
  {
    question: "Is my personal mood and journal data kept private?",
    answer:
      "Yes, absolutely. Mentebloom operates with a privacy-first local architecture. Your mood logs, reflection journal entries, habit checklists, and hydration records are persisted securely inside your device's browser storage (Zustand LocalStorage/SessionStorage) with optional encryption. We do not sell your personal reflections or track your thoughts.",
  },
  {
    question: "What is the MoodGate check-in and how does it help?",
    answer:
      "MoodGate is a mindful transition overlay powered by an interactive WebGL raymarching sine-plasma shader. When you start your day, it invites you to pause, identify your emotional state (Sad, Low, Neutral, Good, Great), select contributing factors, and receive a tailored motivational quote before heading into your academic dashboard.",
  },
  {
    question: "Are the counselors in the directory certified?",
    answer:
      "Yes. All psychologists and psychiatrists listed in Mentebloom's Consultation directory hold verified post-graduate clinical credentials (M.Phil / Ph.D. from premier institutes like NIMHANS, AIIMS, CIP) and are registered with the Rehabilitation Council of India (RCI). You can book confidential 1-on-1 consultations directly.",
  },
  {
    question: "How does the 4-4-4 Box Breathing exercise work?",
    answer:
      "Box breathing (4s Inhale, 4s Hold, 4s Exhale, 2s Rest) stimulates the vagus nerve to rapidly lower heart rate and reduce cortisol spikes caused by exam pressure or panic. Practicing 3 to 5 cycles restores mental focus and stabilizes the autonomic nervous system.",
  },
  {
    question: "Can I use Mentebloom on my phone or tablet?",
    answer:
      "Yes! Mentebloom is fully responsive with touch-optimized controls, swipeable habit calendars, and floating mobile navigation drawers designed specifically for 320px–480px smartphones up to 4K desktop screens.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#faf8f5]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8e4df]/60 border border-[#d8d3cb] text-xs font-mono font-medium text-neutral-700 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            CLEAR ANSWERS
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal mb-4 font-serif text-[#1a1a1a]">
            Frequently asked questions
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Everything you need to know about Mentebloom's privacy, stress calculations, and mental wellness tools.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-[#e8e4df] rounded-2xl px-5 sm:px-6 data-[state=open]:border-neutral-400 transition-all shadow-2xs"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-neutral-900 hover:no-underline py-4 sm:py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 pb-5 leading-relaxed text-xs sm:text-sm font-sans">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
