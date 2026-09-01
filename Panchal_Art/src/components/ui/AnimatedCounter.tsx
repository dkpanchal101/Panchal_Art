import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "1,000+", "40+", "500+", "4.9", "98.6%"
  className?: string;
  duration?: number; // in seconds
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className = '',
  duration = 1.8
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and prefix/suffix
    const match = value.match(/([^\d.]*)([\d,.]+)([^\d.]*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const rawNumberStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNumber = parseFloat(rawNumberStr);

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const hasDecimal = rawNumberStr.includes('.');
    const decimalPlaces = hasDecimal ? (rawNumberStr.split('.')[1]?.length || 0) : 0;
    const hasComma = match[2].includes(',');

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Fast start, smooth deceleration curve (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = targetNumber * easeProgress;

      let formattedNumber: string;
      if (hasDecimal) {
        formattedNumber = currentNumber.toFixed(decimalPlaces);
      } else {
        formattedNumber = Math.floor(currentNumber).toString();
      }

      if (hasComma) {
        const parts = formattedNumber.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNumber = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
