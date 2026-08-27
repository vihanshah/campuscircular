import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotateX?: number;
  maxRotateY?: number;
  scaleOnHover?: number;
  glareOpacity?: number;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  maxRotateX = 12,
  maxRotateY = 12,
  scaleOnHover = 1.02,
  glareOpacity = 0.15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 25 });
  const y = useSpring(0, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(y, [-0.5, 0.5], [maxRotateX, -maxRotateX]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxRotateY, maxRotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-3xl cursor-pointer ${className}`}
    >
      {children}

      {/* Subtle Glare Layer */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: glareOpacity }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 transition-opacity"
        />
      )}
    </motion.div>
  );
};

export default TiltedCard;
