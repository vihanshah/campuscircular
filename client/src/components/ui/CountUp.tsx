import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  onEnd?: () => void;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = ',',
  decimals = 0,
  prefix = '',
  suffix = '',
  onEnd,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Ease out quad
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = from + (to - from) * easeProgress;
        
        setValue(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setValue(to);
          if (onEnd) onEnd();
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, startWhen, from, to, delay, duration, onEnd]);

  const formattedValue = () => {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue()}
      {suffix}
    </span>
  );
};

export default CountUp;
