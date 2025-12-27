'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GearCard from './GearCard';
import { GearItem } from '@/lib/gear-data';

type GearRowProps = {
  items: GearItem[];
  title?: string;
};

export default function GearRow({ items, title }: GearRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 224; // w-56 = 224px (14rem) including gap
    const gap = 16; // gap-4 = 16px
    const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
    
    // Update scroll state after animation
    setTimeout(checkScrollability, 300);
  };
  
  // Check scrollability on mount and when items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(checkScrollability, 100);
      window.addEventListener('resize', checkScrollability);
      return () => window.removeEventListener('resize', checkScrollability);
    }
  }, [items]);

  return (
    <div className="relative">
      {title && (
        <div className="flex items-baseline justify-between mb-6 px-3.5 sm:px-4">
          <h2 className="text-[16px] font-medium text-black">{title}</h2>
        </div>
      )}
      
      <div className="relative">
        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onScroll={checkScrollability}
          onLoad={checkScrollability}
          className="flex gap-3 sm:gap-4 overflow-x-auto px-3.5 sm:px-4 pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item) => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>

        {/* Right arrow button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-colors z-10"
            aria-label="Scroll right"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Left arrow button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-colors z-10"
            aria-label="Scroll left"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

