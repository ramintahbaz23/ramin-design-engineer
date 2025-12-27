'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './PlayerButton.module.css';

export default function PlayerButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimation();

  // Attempt to play audio programmatically
  const attemptPlay = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }
    } catch (error) {
      // Autoplay was blocked
      setAutoplayBlocked(true);
      setIsPlaying(false);
    }
  };

  // Auto-play after 2s delay on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      attemptPlay();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Breathing animation when playing
  useEffect(() => {
    if (isPlaying && !isPressed) {
      controls.start({
        scale: [1, 1.02, 1],
        y: 0,
        boxShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.08), inset 0 -12px 18px rgba(0, 0, 0, 0.82)',
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    } else {
      // Stop breathing when paused or pressed
      controls.stop();
      controls.set({
        scale: 1,
        y: 0,
        boxShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.08), inset 0 -12px 18px rgba(0, 0, 0, 0.82)',
      });
    }
  }, [isPlaying, isPressed, controls]);

  const handlePlayPause = async () => {
    try {
      if (!isPlaying) {
        if (audioRef.current) {
          await audioRef.current.play();
        }
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
      }
    } catch (error) {
      setAutoplayBlocked(true);
      setIsPlaying(false);
    }
  };

  const handlePointerDown = () => {
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  // Variants for button states
  const buttonVariants = {
    rest: {
      y: 0,
      boxShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.08), inset 0 -12px 18px rgba(0, 0, 0, 0.82)',
    },
    hover: {
      y: -1,
      scale: 1.01,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
      },
    },
    pressed: {
      y: 2,
      scale: 0.98,
      boxShadow: 'inset 0 4px 4px rgba(0, 0, 0, 0.5), inset 0 -8px 12px rgba(0, 0, 0, 0.9)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 20,
      },
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Hidden audio element */}
        <audio ref={audioRef} loop style={{ display: 'none' }}>
          {/* In a real implementation, add src attribute */}
        </audio>

        {/* Button housing with 3-layer construction */}
        <div className={`${styles.housing} ${isPlaying ? styles.playing : ''}`}>
          <motion.button
            className={`${styles.btn} ${isPlaying ? styles.playing : ''}`}
            onClick={handlePlayPause}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            variants={buttonVariants}
            initial="rest"
            animate={isPressed ? 'pressed' : isPlaying ? controls : 'rest'}
            whileHover={!isPressed && !isPlaying ? 'hover' : undefined}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {/* Play icon - CSS triangle */}
            <span className={`${styles.icon} ${styles.iconPlay}`}></span>
            
            {/* Pause icon - CSS bars */}
            <span className={`${styles.icon} ${styles.iconPause}`}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </span>
          </motion.button>
        </div>

        {/* "Tap to play" helper - shown when autoplay is blocked */}
        {autoplayBlocked && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 -translate-x-1/2 -top-12 text-xs text-gray-400 whitespace-nowrap pointer-events-none"
          >
            Tap to play
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* 
 * DEBUG VALUES TO TWEAK:
 * 
 * Housing thickness:
 *   - .housing::before inset: 28px (increase = thinner ring, decrease = thicker ring)
 * 
 * Cavity depth:
 *   - .housing::after inset: 44px (increase = smaller cavity, decrease = larger cavity)
 *   - .housing::after box-shadow inset blur: 10px, 3px, 1px (increase blur = softer edge, decrease = sharper)
 *   - .housing::after box-shadow inset opacity: 0.88, 0.9, 0.95 (increase = darker/harder occlusion)
 * 
 * Icon size:
 *   - .icon-play border-left: 58px (triangle width)
 *   - .icon-play border-top/bottom: 36px (triangle height)
 *   - .icon-pause .bar width: 18px (pause bar width)
 *   - .icon-pause .bar height: 82px (pause bar height)
 *   - .icon-pause gap: 20px (space between bars)
 */


