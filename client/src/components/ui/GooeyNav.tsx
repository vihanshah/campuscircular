import React, { useRef, useEffect, useState } from 'react';

export interface GooeyNavItem {
  label: string;
  href?: string;
  id?: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  onSelect?: (index: number, item: GooeyNavItem) => void;
}

export const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  onSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  // Sync activeIndex if initialActiveIndex prop changes
  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };
  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, #B92CFF)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index, items[index]);
    }
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach((p) => filterRef.current!.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget;
      if (activeIndex === index) return;
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index, items[index]);
      }
      updateEffectPosition(liEl);
      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll('.particle');
        particles.forEach((p) => filterRef.current!.removeChild(p));
      }
      if (textRef.current) {
        textRef.current.classList.remove('active');
        void textRef.current.offsetWidth;
        textRef.current.classList.add('active');
      }
      if (filterRef.current) {
        makeParticles(filterRef.current);
      }
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, items]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
            --color-1: #151518;
            --color-2: #B92CFF;
            --color-3: #FFD928;
            --color-4: #34D399;
          }
          .dark {
            --color-1: #00F2FE;
            --color-2: #FFD928;
            --color-3: #34D399;
            --color-4: #B92CFF;
          }
          .gooey-nav-container .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .gooey-nav-container .effect.text {
            color: #151515;
            transition: color 0.3s ease;
          }
          .dark .gooey-nav-container .effect.text {
            color: #FFFFFF;
          }
          .gooey-nav-container .effect.text.active {
            color: #FFFDF7;
          }
          .dark .gooey-nav-container .effect.text.active {
            color: #0F0F14;
          }
          .gooey-nav-container .effect.filter {
            filter: blur(5px) contrast(40) blur(0);
            mix-blend-mode: normal;
          }
          .gooey-nav-container .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: #151518;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .dark .gooey-nav-container .effect.filter::after {
            background: #00F2FE;
          }
          .gooey-nav-container .effect.active::after {
            animation: goo-pill 0.3s ease both;
          }
          @keyframes goo-pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .gooey-nav-container .particle,
          .gooey-nav-container .point {
            display: block;
            opacity: 0;
            width: 14px;
            height: 14px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .gooey-nav-container .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 7px);
            left: calc(50% - 7px);
            animation: goo-particle calc(var(--time)) ease 1 -350ms;
          }
          .gooey-nav-container .point {
            background: var(--color);
            opacity: 1;
            animation: goo-point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes goo-particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes goo-point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .gooey-nav-container li.goo-active {
            color: #FFFDF7 !important;
          }
          .dark .gooey-nav-container li.goo-active {
            color: #0F0F14 !important;
          }
          .gooey-nav-container li.goo-active::after {
            opacity: 1;
            transform: scale(1);
          }
          .gooey-nav-container li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: #151518;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          .dark .gooey-nav-container li::after {
            background: #00F2FE;
          }
        `}
      </style>
      <div className="relative gooey-nav-container overflow-x-auto no-scrollbar py-1" ref={containerRef}>
        <nav className="flex relative w-max" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul
            ref={navRef}
            className="flex gap-2 list-none p-0 m-0 relative z-[3]"
          >
            {items.map((item, index) => {
              const isSelected = activeIndex === index;
              return (
                <li
                  key={item.id || item.label || index}
                  onClick={(e) => handleClick(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  tabIndex={0}
                  className={`rounded-full relative cursor-pointer font-extrabold text-xs uppercase tracking-wider px-4 py-2 transition-all duration-300 ease ${
                    isSelected
                      ? 'goo-active bg-[#151518] text-[#FFFDF7] dark:bg-[#00F2FE] dark:text-[#0F0F14] shadow-xs'
                      : 'bg-[#F3EFE6] text-[#151515]/75 hover:text-[#151515] hover:bg-[#E8E4DA] dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20'
                  }`}
                >
                  <a
                    href={item.href || '#'}
                    onClick={(e) => e.preventDefault()}
                    className="outline-none inline-block whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;
