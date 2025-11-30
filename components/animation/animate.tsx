
"use client";
// components/Animate.tsx
import { motion } from "framer-motion";
import { forwardRef } from "react";
import type {
  MotionProps,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";
import type { ReactNode, Ref } from "react";

// Define animation variants
const variants = {
  fadeIn: {
    inactive: { opacity: 0 },
    active: { opacity: 1, transition: { duration: 1.5 } },
  },
  fadeInUp: {
    inactive: { opacity: 0, y: 50 },
    active: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  },
  fadeInDown: {
    inactive: { opacity: 0, y: -50 },
    active: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  },
  fadeInLeft: {
    inactive: { opacity: 0, x: -50 },
    active: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  },
  fadeInRight: {
    inactive: { opacity: 0, x: 50 },
    active: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  },
  slideInUp: {
    inactive: { y: 100, opacity: 0 },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  },
  slideInDown: {
    inactive: { y: -100, opacity: 0 },
    active: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  },
  scaleIn: {
    inactive: { scale: 0.8, opacity: 0 },
    active: { scale: 1, opacity: 1, transition: { duration: 1.5 } },
  },
  bounce: {
    inactive: { scale: 0, opacity: 0 },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 5.5,
      },
    },
  },
  rotateIn: {
    inactive: { rotate: -180, opacity: 0 },
    active: {
      rotate: 0,
      opacity: 1,
      transition: { duration: 1.5 },
    },
  },
} as const;

// Define the valid animation types
type AnimationType = keyof typeof variants;

// Define props interface
interface AnimateProps extends MotionProps {
  children?: ReactNode;
  className?: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  threshold?: number;
  // Updated to match MotionProps' whileInView type
  whileInView?: TargetAndTransition | VariantLabels | undefined;
  whileHover?: MotionProps["whileHover"];
  whileTap?: MotionProps["whileTap"];
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  variants?: MotionProps["variants"];
  transition?: MotionProps["transition"];
  viewport?: MotionProps["viewport"];
}

// Create the reusable animation component
const Animate = forwardRef(
  (
    {
      children,
      className,
      type = "slideInUp",
      delay = 600,
      duration,
      triggerOnce = true,
      threshold = 0.1,
      whileInView = "active", // Default changed to match expected type
      whileHover,
      whileTap,
      initial = "inactive",
      animate = "visible",
      exit,
      variants: customVariants,
      transition: customTransition,
      viewport,
      ...props
    }: AnimateProps,
    ref: Ref<HTMLDivElement>
  ) => {
    // Get the appropriate variants
    const animationVariants =
      customVariants || variants[type] || variants.slideInDown;

    // Create transition object
    const transition = customTransition || {
      delay,
      ...(duration && { duration }),
    };

    // Configure viewport options
    const viewportOptions = {
      once: triggerOnce,
      amount: threshold,
      ...(viewport && viewport),
    };

    return (
      <motion.div
        className={className}
        ref={ref}
        initial={initial}
        animate={animate}
        exit={exit}
        variants={animationVariants}
        transition={transition}
        whileInView={whileInView} // Use the prop directly
        viewport={viewportOptions} // Viewport options always applied
        whileHover={whileHover}
        whileTap={whileTap}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Animate.displayName = "Animate";

export default Animate;
