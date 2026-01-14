'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const carouselMetadata = {
  id: 'carousel',
  title: 'Netflix film scroll',
  date: 'November 2024',
  cardDate: 'Nov 2024',
  cardDescription: 'Horizontal scroll animation.',
  href: '/interactions/carousel',
  shareTitle: 'Netflix film scroll — Ramin — Designer',
  shareText: 'A Netflix-style horizontal scroll animation featuring some of my favorite movies and shows.',
};

const carouselImages = [
  { id: '1', src: '/images/carousel/dark_knight.jpg', alt: 'The Dark Knight', label: 'The Dark Knight' },
  { id: '2', src: '/images/carousel/interstellar.jpg', alt: 'Interstellar', label: 'Interstellar' },
  { id: '3', src: '/images/carousel/stranger_things.jpg', alt: 'Stranger Things', label: 'Stranger Things' },
  { id: '4', src: '/images/carousel/the_prestige.jpg', alt: 'The Prestige', label: 'The Prestige' },
];

export default function CarouselPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardWidth, setCardWidth] = useState(240);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  // Responsive card sizing
  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      setCardWidth(width >= 640 ? 240 : 180);
      setIsMobile(width < 640);
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // On mobile, ensure first card is in focus on load
  useEffect(() => {
    if (isMobile && scrollLeft === 0) {
      // First card should be in focus position (centered)
      // No need to change scrollLeft, it's already at 0 which centers the first card
    }
  }, [isMobile, scrollLeft]);


  const cardGap = 12;

  // Calculate card styles based on scroll position
  const getCardStyles = (index: number) => {
    const scrollWrapper = scrollWrapperRef.current;
    if (!scrollWrapper) return { scale: 1, x: 0, isInFocus: false };

    // Account for initial transform offset (120px padding)
    const transformOffset = 120;
    const cardLeft = index * (cardWidth + cardGap) + transformOffset;
    const viewportCenter = scrollWrapper.clientWidth / 2;
    const cardCenter = cardLeft - scrollLeft + cardWidth / 2;
    const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
    const maxDistance = scrollWrapper.clientWidth / 2 + cardWidth;

    // On mobile, first card should be in focus when scrollLeft is 0
    const isInFocus = isMobile && ((index === 0 && scrollLeft === 0) || (distanceFromCenter < cardWidth * 0.6));
    
    // Smoother parallax with easing
    const parallaxOffset = (cardCenter - viewportCenter) * 0.03;
    
    // Smoother scale transition with wider focus zone
    const focusZone = cardWidth * 0.8;
    const scaleProgress = isMobile 
      ? Math.max(0, Math.min(1, 1 - (distanceFromCenter / focusZone)))
      : 0;
    const baseScale = isMobile 
      ? (isInFocus ? 1.1 : 0.9 + (scaleProgress * 0.2))
      : 1;

    return { x: parallaxOffset, scale: baseScale, isInFocus };
  };

  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A Netflix-style horizontal scroll animation featuring some of my favorite movies and shows.
      </p>
      <p className="mb-2 sm:mb-3">
        Built using Next.js, Framer Motion, and Tailwind CSS.
      </p>
    </>
  );

  // Prevent horizontal page scrolling
  useEffect(() => {
    const preventHorizontalScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        const target = e.target as HTMLElement;
        const scrollWrapper = scrollWrapperRef.current;
        
        if (scrollWrapper && scrollWrapper.contains(target)) {
          return;
        }
        
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventHorizontalScroll, { passive: false });
    return () => window.removeEventListener('wheel', preventHorizontalScroll);
  }, []);

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={carouselMetadata.title}
        date={carouselMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: carouselMetadata.shareTitle,
          text: carouselMetadata.shareText,
        }}
      >
        <div 
          className="w-full max-w-[680px] mx-auto relative px-4 sm:px-0"
          style={{ overflow: 'visible' }}
        >
          {/* Scroll wrapper - NO overflow constraints, allows cards to overflow */}
          <div
            ref={scrollWrapperRef}
            style={{
              width: '100%',
              overflow: 'visible',
              position: 'relative',
              paddingTop: '60px',
              paddingBottom: '60px',
              paddingLeft: '120px',
              marginLeft: '-120px',
              paddingRight: '120px',
              marginRight: '-120px',
              touchAction: isMobile ? 'pan-x pan-y' : 'auto', // Allow both horizontal and vertical scrolling on mobile
            }}
            onWheel={(e) => {
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
                e.preventDefault();
                const containerWidth = scrollContainerRef.current?.scrollWidth || 0;
                const wrapperWidth = scrollWrapperRef.current?.clientWidth || 0;
                const maxScroll = Math.max(0, containerWidth - wrapperWidth + 240);
                const newScroll = Math.max(0, Math.min(maxScroll, scrollLeft + (e.deltaX || e.deltaY)));
                setScrollLeft(newScroll);
              }
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const startX = touch.clientX;
              const startY = touch.clientY;
              const startScrollLeft = scrollLeft;
              let isHorizontalScroll = false;
              let hasMoved = false;
              
              const handleTouchMove = (moveEvent: TouchEvent) => {
                const moveTouch = moveEvent.touches[0];
                const deltaX = moveTouch.clientX - startX;
                const deltaY = moveTouch.clientY - startY;
                const absDeltaX = Math.abs(deltaX);
                const absDeltaY = Math.abs(deltaY);
                
                // Only proceed if there's been some movement
                if (absDeltaX < 5 && absDeltaY < 5) {
                  return;
                }
                
                hasMoved = true;
                
                // Determine if this is primarily a horizontal scroll
                // Require horizontal movement to be at least 1.5x greater than vertical movement
                // and at least 15px to avoid accidental triggers
                if (!isHorizontalScroll && absDeltaX > absDeltaY * 1.5 && absDeltaX > 15) {
                  isHorizontalScroll = true;
                }
                
                // Only trigger horizontal scroll if it's clearly a horizontal gesture
                // If vertical movement is dominant, don't interfere with page scrolling
                if (isHorizontalScroll) {
                  moveEvent.preventDefault();
                  const containerWidth = scrollContainerRef.current?.scrollWidth || 0;
                  const wrapperWidth = scrollWrapperRef.current?.clientWidth || 0;
                  const maxScroll = Math.max(0, containerWidth - wrapperWidth + 240);
                  const newScroll = Math.max(0, Math.min(maxScroll, startScrollLeft - deltaX));
                  setScrollLeft(newScroll);
                } else if (absDeltaY > absDeltaX * 1.5 && absDeltaY > 15) {
                  // This is clearly a vertical scroll - don't prevent default, let page scroll
                  return;
                }
              };
              
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              
              document.addEventListener('touchmove', handleTouchMove, { passive: false });
              document.addEventListener('touchend', handleTouchEnd);
            }}
          >
            {/* Cards container - uses transform for scrolling, no overflow constraints */}
            <div
              ref={scrollContainerRef}
              className="flex relative"
              style={{
                width: `${carouselImages.length * (cardWidth + cardGap)}px`,
                minWidth: '100%',
                transform: `translateX(${120 - scrollLeft}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {carouselImages.map((card, index) => {
                const isHovered = hoveredIndex === index;
                const scrollStyles = getCardStyles(index);
                const isInFocus = scrollStyles.isInFocus;
                
                return (
                  <motion.div
                    key={card.id}
                    className="flex-shrink-0 cursor-pointer"
                    style={{
                      width: `${cardWidth}px`,
                      marginRight: `${cardGap}px`,
                      position: 'relative',
                      zIndex: isHovered ? 50 : isInFocus ? 10 : 1,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                      scale: isHovered ? 1.15 : scrollStyles.scale,
                      y: isHovered ? -20 : (isInFocus && isMobile) ? -15 : 0,
                      x: isHovered ? 0 : scrollStyles.x,
                    }}
                    transition={{
                      type: isMobile ? 'tween' : 'spring',
                      duration: isMobile ? 0.4 : undefined,
                      ease: isMobile ? [0.25, 0.1, 0.25, 1] : undefined,
                      stiffness: isMobile ? undefined : 300,
                      damping: isMobile ? undefined : 30,
                      mass: isMobile ? undefined : 0.8,
                    }}
                  >
                    <motion.div 
                      className="w-full rounded-lg overflow-hidden bg-gray-200 shadow-lg" 
                      style={{ 
                        height: 'clamp(240px, 45vw, 360px)',
                        width: '100%',
                      }}
                      animate={{
                        boxShadow: isHovered 
                          ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                          : (isInFocus && isMobile)
                          ? '0 15px 30px rgba(0, 0, 0, 0.25)' 
                          : '0 4px 8px rgba(0, 0, 0, 0.1)',
                      }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="w-full h-full object-cover"
                        draggable={false}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}
