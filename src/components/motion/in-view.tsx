'use client';
import { ReactNode, useRef } from 'react';
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions,
} from 'motion/react';

export type InViewProps = {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: React.ElementType;
};

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Animates to `visible` when the element first enters the viewport.
 *
 * "Once" behaviour belongs in `viewOptions.once` (pass `{ once: true }`), which
 * keeps the hook itself free of state. An earlier version also carried a `once`
 * prop that set React state from `onAnimationComplete`; no caller ever passed it,
 * so it was a dead re-render path.
 */
export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  as = 'div',
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  const MotionComponent = motion[as as keyof typeof motion] as typeof as;

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}
