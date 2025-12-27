'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import ToolIcon from './ToolIcon';
import { checkProximity } from '@/lib/utils';

type InteractiveChestProps = {
  onUnlockComplete: () => void;
  skipAnimation?: boolean;
};

export default function InteractiveChest({
  onUnlockComplete,
  skipAnimation = false,
}: InteractiveChestProps) {
  const [isUnlocked, setIsUnlocked] = useState(skipAnimation);
  const [showTools, setShowTools] = useState(skipAnimation);
  const [isMobile, setIsMobile] = useState(false);

  const keyRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const chestRef = useRef<HTMLDivElement>(null);

  // Initial key position in bottom-left corner (will be set in useEffect)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Key starts at 0,0 relative to its fixed position (left-100px, bottom-150px)
  // No need for additional positioning since it's fixed

  useEffect(() => {
    if (skipAnimation) {
      onUnlockComplete();
    }
  }, [skipAnimation, onUnlockComplete]);

  const handleDragEnd = () => {
    if (!keyRef.current || !lockRef.current || isUnlocked) return;

    const keyRect = keyRef.current.getBoundingClientRect();
    const lockRect = lockRef.current.getBoundingClientRect();

    if (checkProximity(keyRect, lockRect, 50)) {
      handleUnlock();
    } else {
      // Return key to original position (bottom-left - 0,0 relative to fixed position)
      x.set(0);
      y.set(0);
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setShowTools(true);
      setTimeout(() => {
        onUnlockComplete();
      }, 1500);
    }, 300);
  };

  const handleChestTap = () => {
    if (!isUnlocked && isMobile) {
      handleUnlock();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Key - Desktop only, positioned in bottom-left, disappears when unlocked */}
      {!isMobile && !isUnlocked && (
        <motion.div
          ref={keyRef}
          drag
          dragConstraints={{ 
            left: typeof window !== 'undefined' ? -window.innerWidth / 2 : -500, 
            right: typeof window !== 'undefined' ? window.innerWidth / 2 : 500, 
            top: typeof window !== 'undefined' ? -window.innerHeight / 2 : -500, 
            bottom: typeof window !== 'undefined' ? window.innerHeight / 2 : 500 
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x, y, rotate }}
          className="fixed left-[100px] bottom-[150px] cursor-grab active:cursor-grabbing z-20"
          whileDrag={{ scale: 1.1 }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600"
          >
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </motion.div>
      )}

      {/* Chest Container */}
      <div className="relative flex items-center justify-center">

        {/* Chest */}
        <div
          ref={chestRef}
          onClick={handleChestTap}
          className={`relative ${!isUnlocked && isMobile ? 'cursor-pointer' : ''}`}
        >
          {/* Fixed container size to prevent position shift */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="relative flex items-center justify-center"
            style={{ width: '320px', height: '250px' }}
          >
            {/* Closed chest - always rendered, opacity controlled */}
            <motion.div
              animate={{ 
                opacity: isUnlocked ? 0 : 1,
                scale: isUnlocked ? 0.95 : 1,
              }}
              transition={{ 
                duration: 0.4,
                ease: 'easeInOut'
              }}
              className="absolute"
              style={{ 
                width: '320px', 
                height: '195px',
                pointerEvents: isUnlocked ? 'none' : 'auto',
              }}
            >
              <img
                src="/closed_chest.svg"
                alt="Closed chest"
                className="w-full h-full"
                style={{ width: '320px', height: '195px' }}
              />
            </motion.div>
            
            {/* Open chest - always rendered, opacity controlled */}
            <motion.div
              animate={{ 
                opacity: isUnlocked ? 1 : 0,
                scale: isUnlocked ? 1 : 0.95,
              }}
              transition={{ 
                duration: 0.4,
                ease: 'easeInOut'
              }}
              className="absolute"
              style={{ 
                width: '320px', 
                height: '250px',
                pointerEvents: !isUnlocked ? 'none' : 'auto',
              }}
            >
              <img
                src="/open_chest.svg"
                alt="Open chest"
                className="w-full h-full"
                style={{ width: '320px', height: '250px' }}
              />
            </motion.div>
            
            {/* Invisible lock area for collision detection */}
            {!isMobile && !isUnlocked && (
              <div
                ref={lockRef}
                className="absolute"
                style={{
                  left: '50%',
                  top: '46%',
                  width: '19px',
                  height: '13px',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Tools that spill out - positioned below chest, within chest width */}
      <AnimatePresence>
        {showTools && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mt-4"
            style={{ width: '320px' }}
          >
            <ToolIcon type="figma" delay={0.1} />
            <ToolIcon type="code" delay={0.2} />
            <ToolIcon type="film" delay={0.3} />
            <ToolIcon type="protractor" delay={0.4} />
            <ToolIcon type="pen" delay={0.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

