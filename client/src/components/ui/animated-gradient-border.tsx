import React, { CSSProperties, ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';

export interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number; // Duration in seconds
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: '#584827',
  secondary: '#c7a03c',
  accent: '#f9de90'
};

const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 5,
  gradientColors = defaultGradientColors,
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  borderWidth = 2,
  borderRadius = 16,
  style = {},
  ...props
}) => {
  const conicBg = `conic-gradient(from 0deg, ${gradientColors.primary} 0%, ${gradientColors.secondary} 30%, ${gradientColors.accent} 50%, ${gradientColors.secondary} 70%, ${gradientColors.primary} 100%)`;

  return (
    <div
      className="relative overflow-hidden group"
      style={{
        borderRadius: `${borderRadius}px`,
        padding: `${borderWidth}px`,
        ...style,
      }}
      {...props}
    >
      {/* Rotating Conic Gradient Layer */}
      <motion.div
        className="absolute inset-[-200%] pointer-events-none"
        style={{
          background: conicBg,
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: animationSpeed,
          ease: "linear",
        }}
      />

      {/* Inner Content Card */}
      <div
        className={`relative z-10 w-full h-full ${className}`}
        style={{
          backgroundColor: backgroundColor,
          borderRadius: `${Math.max(0, borderRadius - borderWidth)}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export { BorderRotate };

