"use client";
import type { HTMLMotionProps, Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type React from 'react';

type AnimatedWrapperProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
  staggerChildren?: number; 
  amount?: number | "some" | "all" | undefined;
};

const commonVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className,
  animationType,
  delay = 0,
  duration = 0.5,
  staggerChildren,
  initial,
  whileInView,
  variants,
  transition,
  viewport,
  amount = 0.2, // Default trigger amount
  ...props
}) => {
  const selectedVariants = animationType ? commonVariants[animationType] : variants;

  return (
    <motion.div
      className={className}
      initial={initial ?? (selectedVariants ? "hidden" : undefined)}
      whileInView={whileInView ?? (selectedVariants ? "visible" : undefined)}
      variants={selectedVariants}
      transition={transition ?? { duration, delay, staggerChildren, type: "spring", stiffness: 100, damping: 20 }}
      viewport={viewport ?? { once: true, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
