"use client"
import { useEffect, useState, useRef } from "react"
import { TextEffect } from "@/components/ui/text-effect"
import SpecularButton from "./ui/SpecularButton"

const VIDEO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/af7687fd-f2ad-4f2a-96f0-b56fa7d3769c-08wERpo5U1sktxs1vcRsJW9ueslNZv.mp4"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ultra-smooth entrance trigger
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure autoplay starts smoothly without stutter
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoReady(true))
        .catch(() => {
          // If autoPlay was blocked, mark ready to show background
          setIsVideoReady(true)
        })
    }

    // High-frequency RAF loop for seamless looping without onTimeUpdate frame stutter
    let rafId: number
    const checkLoop = () => {
      if (video.duration && video.currentTime >= video.duration - 0.75) {
        video.currentTime = 0.05
      }
      rafId = requestAnimationFrame(checkLoop)
    }
    rafId = requestAnimationFrame(checkLoop)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section className="h-[100svh] w-full max-h-[100svh] relative overflow-hidden bg-black select-none">
      {/* Background Video Layer with smooth fade-in */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-out ${isVideoReady ? "opacity-100" : "opacity-0"}`}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setIsVideoReady(true)}
          className="h-full w-full object-cover scale-[1.05] transform-gpu pointer-events-none will-change-transform"
          src={VIDEO_URL}
        />
      </div>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex h-full flex-col items-center px-4 sm:px-6 pointer-events-none">
        
        {/* Brand Title */}
        <div
          className={`pt-6 sm:pt-8 transition-all duration-1000 cubic-bezier(0.16,1,0.3,1) delay-[300ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <span className="text-lg sm:text-xl font-light tracking-widest text-white select-none">
            mentebloom
          </span>
        </div>

        {/* Center Headline & CTA */}
        <div className="flex w-full flex-1 flex-col items-center justify-center pb-8 sm:pb-12">
          <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center">
            
            <div className="px-2">
              <TextEffect
                per="line"
                as="h1"
                preset="slide"
                className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.15] sm:leading-[1.2] tracking-tight text-white select-none drop-shadow-sm will-change-transform"
                segmentWrapperClassName="overflow-hidden block"
                trigger={isVisible}
                delay={0.4}
              >
                {`Your Daily Wellness\nJourney Starts Here`}
              </TextEffect>
            </div>

            <div
              className={`mt-[8vh] sm:mt-[16vh] md:mt-[22vh] lg:mt-[28vh] pointer-events-auto transition-all duration-1000 cubic-bezier(0.16,1,0.3,1) delay-[1000ms] ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"
              }`}
            >
              <SpecularButton
                size="lg"
                radius={20}
                tint="#ffffff"
                tintOpacity={0.1}
                blur={12}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#888888"
                intensity={1.2}
                shineSize={15}
                shineFade={40}
                thickness={1.5}
                speed={0.35}
                followMouse={true}
                proximity={250}
                autoAnimate={true}
              >
                Get Started
              </SpecularButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
