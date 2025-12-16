'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageData {
  src: string;
  alt: string;
  id: string;
}

interface PhotoBoomProps {
  images: ImageData[];
}

export default function PhotoBoom({ images }: PhotoBoomProps) {
  const [exploded, setExploded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const explosionOriginRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (exploded) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!exploded) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // If images are exploded, return them to stacked state when mouse leaves
    if (exploded) {
      setExploded(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    explosionOriginRef.current = { x, y };
    setMousePosition({ x, y });
    setExploded(!exploded);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (!exploded) {
      explosionOriginRef.current = { x, y };
      setExploded(true);
    }
    setMousePosition({ x, y });
  };

  const getExplodedPosition = (index: number, total: number, imageWidth: number) => {
    // Calculate positions with natural overlap and slight variations
    // Images arranged left to right with slight tilts and vertical offsets
    const overlap = 60; // Amount of overlap between images
    const spacing = imageWidth - overlap; // Spacing between image centers
    const totalWidth = (total - 1) * spacing; // Total width of the group
    const startX = -totalWidth / 2; // Start position to center the group
    
    // Add slight vertical variation for natural scattered look
    const verticalVariation = [-15, 10, -8, 15, -12]; // Slight up/down offsets
    const yOffset = verticalVariation[index] || 0;
    
    // Add slight horizontal variation for more natural spacing
    const horizontalVariation = [0, 5, -3, 8, -5];
    const xVariation = horizontalVariation[index] || 0;
    
    return {
      x: startX + (index * spacing) - imageWidth / 2 + xVariation,
      y: yOffset,
      rotation: (index % 2 === 0 ? -3 : 2) + (index * 0.5), // Alternate tilt directions with slight variation
    };
  };

  const getPeekOffset = (index: number, total: number) => {
    // Apply subtle movement to all images in different directions
    if (!isHovering || exploded) return { x: 0, y: 0 };
    
    // Define different directions for each image
    // Each image moves in a different direction: right, left, up-right, down-left, etc.
    const directions = [
      { x: 1, y: 0 },      // Index 0: right
      { x: -1, y: 0 },     // Index 1: left
      { x: 0.7, y: -0.7 }, // Index 2: up-right
      { x: -0.7, y: 0.7 }, // Index 3: down-left
      { x: 0, y: -1 },     // Index 4: up (if more images)
      { x: 0, y: 1 },      // Index 5: down (if more images)
    ];
    
    // Get direction for this image, or use a calculated angle if more images
    const direction = directions[index] || (() => {
      // For images beyond the predefined directions, spread them in a circle
      const angle = (index / total) * Math.PI * 2;
      return { x: Math.cos(angle), y: Math.sin(angle) };
    })();
    
    // More visible movement to show the animation clearly
    const peekAmount = 18; // Increased movement amount for more satisfying effect
    
    return {
      x: direction.x * peekAmount,
      y: direction.y * peekAmount,
    };
  };

  // Reset on escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && exploded) {
        setExploded(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [exploded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden"
      onTouchMove={handleTouch}
      onTouchEnd={handleTouch}
    >
      <motion.div
        className={exploded ? "relative w-full h-full flex items-center justify-center cursor-pointer" : "relative cursor-pointer"}
        style={!exploded ? { width: 'min(200px, 40vw)', height: 'min(250px, 50vw)' } : { minHeight: '100%', padding: '0px' }}
        onMouseMove={!exploded ? handleMouseMove : undefined}
        onMouseEnter={!exploded ? handleMouseEnter : undefined}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {images.map((image, index) => {
          const imageWidth = 200;
          const baseOffset = index * -5;
          const peekOffset = getPeekOffset(index, images.length);
          const isFrontImage = index === 0;
          
          // Calculate positions based on state
          let targetX, targetY, targetRotate;
          
          if (exploded) {
            const { x, y, rotation } = getExplodedPosition(index, images.length, imageWidth);
            // Both states use left: 50%, top: 50%, so transforms are relative to center
            // Stacked images are centered at approximately y = -125
            // Exploded images should maintain same vertical center, with small variations
            // y from getExplodedPosition is just the variation (e.g., -15, 10, -8)
            // So we add it to the stacked center position
            targetX = x;
            targetY = -125 + y; // Maintain vertical center (-125), add small variation
            targetRotate = rotation;
          } else {
            // When stacked, images are centered, transform relative to center
            // baseOffset creates the stacked effect (negative values move up/left)
            // The -125 centers them vertically (half of 250px height)
            targetX = baseOffset + peekOffset.x - 100; // -100 to account for half width (200/2)
            targetY = baseOffset + peekOffset.y - 125; // -125 to account for half height (250/2)
            const tiltAmount = isHovering ? (index < 2 ? -8 : 8) : 0;
            targetRotate = index * 1.5 + tiltAmount;
          }
          
          return (
            <motion.div
              key={image.id}
              layout
              className={`absolute rounded-xl overflow-hidden shadow-2xl border-[6px] border-white`}
              style={{
                width: 'min(200px, 40vw)',
                height: 'min(250px, 50vw)',
                left: '50%',
                top: '50%',
                zIndex: exploded ? index : images.length - index,
              }}
              onClick={!exploded ? handleClick : undefined}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: isHovering && !exploded && index === 0 ? 1.03 : 1,
                x: targetX,
                y: targetY,
                rotate: targetRotate,
              }}
              transition={exploded ? {
                layout: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12, // Lower damping = more bounce
                },
                x: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12, // Lower damping = more bounce
                  mass: 0.6,
                },
                y: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12, // Lower damping = more bounce
                  mass: 0.6,
                },
                rotate: {
                  type: 'spring',
                  stiffness: 150,
                  damping: 10, // Lower damping = more bounce
                },
                delay: index * 0.04,
              } : {
                delay: index * 0.08,
                duration: 0.5,
                ease: 'easeOut',
                x: { 
                  type: 'spring',
                  stiffness: 180,
                  damping: 12, // Lower damping for bouncy close
                  mass: 0.6
                },
                y: { 
                  type: 'spring',
                  stiffness: 180,
                  damping: 12, // Lower damping for bouncy close
                  mass: 0.6
                },
                scale: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 15 // Lower damping for bouncy scale
                },
                rotate: {
                  type: 'spring',
                  stiffness: 150,
                  damping: 10 // Lower damping for bouncy rotation
                }
              }}
              whileHover={isFrontImage && !exploded ? { 
                scale: 1.05,
                transition: { 
                  type: 'spring',
                  stiffness: 400,
                  damping: 15
                }
              } : undefined}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes={exploded ? "(max-width: 768px) 35vw, 140px" : "(max-width: 768px) 40vw, 200px"}
                onError={(e) => {
                  console.warn(`Failed to load image: ${image.src}`);
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

