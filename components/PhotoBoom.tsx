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
  const [isMobile, setIsMobile] = useState(false);
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
    // If images are exploded, return them to stacked state when mouse leaves (desktop only)
    // On mobile, user must tap again to return images to starting position
    if (exploded && !isMobile) {
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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    explosionOriginRef.current = { x, y };
    setMousePosition({ x, y });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Prevent click event from firing on mobile
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    explosionOriginRef.current = { x, y };
    setMousePosition({ x, y });
    // Toggle exploded state on mobile - tap to explode, tap again to return
    setExploded(!exploded);
  };

  const getExplodedPosition = (index: number, total: number, imageWidth: number) => {
    if (isMobile) {
      // Mobile: use fixed pixel offsets that work reliably across devices
      // Images are positioned at 50%, 50% (center), so transforms are relative to center
      const offsetX = 60; // Horizontal spread (reduced from 80 to keep on screen)
      const offsetY = 60; // Vertical spread (reduced from 80 to keep on screen)
      const leftShift = -70; // Shift entire group left to center better on screen (reduced from -90)
      
      // Corner positions: top-left, top-right, bottom-left, bottom-right
      // Add leftShift to all X positions to move the group left
      const corners = [
        { 
          x: -offsetX + leftShift, 
          y: -offsetY,
          rotation: -10
        },
        { 
          x: offsetX + leftShift, 
          y: -offsetY,
          rotation: 10
        },
        { 
          x: -offsetX + leftShift, 
          y: offsetY,
          rotation: -10
        },
        { 
          x: offsetX + leftShift, 
          y: offsetY,
          rotation: 10
        },
      ];
      
      return corners[index] || { x: 0, y: 0, rotation: 0 };
    }
    
    // Desktop: spread images out a bit more when exploded so each card is clearly visible
    // Reduce overlap so cards separate more in the fanned-out state
    const overlap = 40; // Amount of overlap between images (was 60)
    const spacing = imageWidth - overlap; // Spacing between image centers
    const totalWidth = (total - 1) * spacing; // Total width of the group
    const startX = -totalWidth / 2; // Start position to center the group
    
    // Add slight vertical variation for natural scattered look (a touch stronger when exploded)
    const verticalVariation = [-22, 14, -12, 20, -18];
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
    // On mobile, always show peek effect when not exploded (like desktop hover)
    // On desktop, only show when hovering
    if (exploded) return { x: 0, y: 0 };
    if (!isMobile && !isHovering) return { x: 0, y: 0 };
    
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
    
    // Reduced movement for a more "put together" starting state
    const peekAmount = 10; // Reduced from 18 for tighter grouping
    
    return {
      x: direction.x * peekAmount,
      y: direction.y * peekAmount,
    };
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      className="relative w-full h-[70vh] sm:h-[60vh] flex items-center justify-center"
      style={{ overflow: 'visible', overflowX: 'visible', overflowY: 'visible', minHeight: isMobile ? '500px' : 'auto' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className={exploded ? "relative w-full h-full flex items-center justify-center cursor-pointer" : "relative cursor-pointer"}
        style={!exploded ? { width: 'min(200px, 40vw)', height: 'min(250px, 50vw)' } : { minHeight: '100%', padding: '0px' }}
        onMouseMove={!exploded && !isMobile ? handleMouseMove : undefined}
        onMouseEnter={!exploded && !isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        onClick={!isMobile ? handleClick : undefined}
      >
        {images.map((image, index) => {
          const imageWidth = 200;
          // Tighter stacking for more "put together" starting state
          const baseOffset = index * -3;
          const peekOffset = getPeekOffset(index, images.length);
          const isFrontImage = index === 0;
          
          // Calculate positions based on state
          let targetX, targetY, targetRotate;
          
          if (exploded) {
            const { x, y, rotation } = getExplodedPosition(index, images.length, imageWidth);
            // For mobile, getExplodedPosition returns full positions relative to center
            // For desktop, it returns variations that need to be added to the center position
            if (isMobile) {
              targetX = x;
              targetY = y;
            } else {
              // Desktop: y is just a variation, add to center position
              targetX = x;
              targetY = -125 + y; // Maintain vertical center (-125), add small variation
            }
            targetRotate = rotation;
          } else {
            // When stacked, images are centered, transform relative to center
            // baseOffset creates the stacked effect (negative values move up/left)
            // The -125 centers them vertically (half of 250px height)
            targetX = baseOffset + peekOffset.x - 100; // -100 to account for half width (200/2)
            targetY = baseOffset + peekOffset.y - 125; // -125 to account for half height (250/2)
            // On mobile, always show tilt (like desktop hover). On desktop, only when hovering
            const shouldShowTilt = isMobile || isHovering;
            const tiltAmount = shouldShowTilt ? (index < 2 ? -8 : 8) : 0;
            targetRotate = index * 1.5 + tiltAmount;
          }

          // Slightly enlarge images when exploded, and let the front image breathe a bit on hover
          const targetScale = exploded
            ? 1.12
            : isFrontImage && isHovering && !exploded
              ? 1.03
              : 1;

          return (
            <motion.div
              key={image.id}
              layout
              className="absolute rounded-xl overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-[#D0CECA]"
              style={{
                width: 'min(200px, 40vw)',
                height: 'min(250px, 50vw)',
                left: '50%',
                top: '50%',
                zIndex: exploded ? index : images.length - index,
              }}
              onClick={!exploded && !isMobile ? handleClick : undefined}
              initial={{
                opacity: 0,
                scale: 0.98,
                x: targetX,
                y: targetY,
                rotate: targetRotate,
              }}
              animate={{
                opacity: 1,
                scale: targetScale,
                x: targetX,
                y: targetY,
                rotate: targetRotate,
              }}
              transition={exploded ? {
                layout: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12, // snappy but playful when expanding
                },
                x: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                  mass: 0.6,
                },
                y: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                  mass: 0.6,
                },
                scale: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                },
                rotate: {
                  type: 'spring',
                  stiffness: 150,
                  damping: 10,
                },
                delay: index * 0.04,
              } : {
                delay: 0.08,
                duration: 0.5,
                ease: 'easeOut',
                x: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                  mass: 0.6,
                },
                y: {
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                  mass: 0.6,
                },
                scale: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                },
                rotate: {
                  type: 'spring',
                  stiffness: 150,
                  damping: 10,
                },
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

