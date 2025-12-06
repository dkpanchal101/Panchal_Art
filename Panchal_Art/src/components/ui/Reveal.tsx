import React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  once?: boolean;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  yOffset = 20,
  once = true,
}) => {
  const controls = useAnimation();
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const [hasBeenInView, setHasBeenInView] = React.useState(false);

  React.useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasBeenInView(true);
            controls.start('visible');
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, once]);

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;



