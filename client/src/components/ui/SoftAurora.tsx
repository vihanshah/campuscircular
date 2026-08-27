import React from 'react';
import { motion } from 'framer-motion';

export interface SoftAuroraProps {
  className?: string;
  colors?: string[];
  opacity?: number;
}

export const SoftAurora: React.FC<SoftAuroraProps> = ({
  className = '',
  colors = ['#FFD928', '#B92CFF', '#00F2FE', '#FF6755'],
  opacity = 0.18,
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          opacity,
          background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 70%, transparent 100%)`,
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, -90, 0],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          opacity: opacity * 0.8,
          background: `radial-gradient(circle, ${colors[2]} 0%, ${colors[3]} 70%, transparent 100%)`,
        }}
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl"
      />
    </div>
  );
};

export default SoftAurora;
