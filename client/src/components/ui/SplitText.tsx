import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 0.5,
  textAlign = 'left',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ');
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  let charIndex = 0;

  return (
    <p
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign }}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="inline-block"
      >
        {words.map((word, wordI) => (
          <span key={wordI} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split('').map((char, charI) => {
              const currentI = charIndex++;
              return (
                <motion.span
                  key={charI}
                  variants={letterVariants}
                  onAnimationComplete={() => {
                    if (currentI === text.replace(/\s/g, '').length - 1 && onLetterAnimationComplete) {
                      onLetterAnimationComplete();
                    }
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </p>
  );
};

export default SplitText;
