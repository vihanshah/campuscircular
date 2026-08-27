import React from 'react';
import { motion } from 'framer-motion';

export interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className = '',
  delay = 0.08,
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.35,
            delay: index * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedList;
