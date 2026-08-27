"use client"
import { useEffect, useState } from "react"

function useCountUp(end: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasStarted])

  return { value: count + suffix, start: () => setHasStarted(true), hasStarted }
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  const clarity = useCountUp(94, 2000, "%")
  const stress = useCountUp(78, 2000, "%")
  const streaks = useCountUp(15, 2000, "k+")
  const reflections = useCountUp(50, 2000, "k+")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          clarity.start()
          stress.start()
          streaks.start()
          reflections.start()
        }
      },
      { threshold: 0.2 },
    )

    const section = document.getElementById("stats-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section id="stats-section" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#faf8f5] border-y border-[#e8e4df]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">VERIFIED STUDENT OUTCOMES</p>
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#1a1a1a]">
            Measurable impact on student well-being
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div
            className={`text-center transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-light text-[#1a1a1a] mb-2 text-4xl sm:text-6xl font-serif">{clarity.value}</p>
            <p className="text-xs text-neutral-600 uppercase font-mono tracking-wider">Report Higher Mental Clarity</p>
          </div>

          <div
            className={`text-center transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-light text-emerald-700 mb-2 text-4xl sm:text-6xl font-serif">{stress.value}</p>
            <p className="text-xs text-neutral-600 uppercase font-mono tracking-wider">Stress Reduction in 14 Days</p>
          </div>

          <div
            className={`text-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-light text-orange-600 mb-2 text-4xl sm:text-6xl font-serif">{streaks.value}</p>
            <p className="text-xs text-neutral-600 uppercase font-mono tracking-wider">Active Habit Streaks</p>
          </div>

          <div
            className={`text-center transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-light text-purple-700 mb-2 text-4xl sm:text-6xl font-serif">{reflections.value}</p>
            <p className="text-xs text-neutral-600 uppercase font-mono tracking-wider">Daily Encrypted Reflections</p>
          </div>
        </div>
      </div>
    </section>
  )
}
