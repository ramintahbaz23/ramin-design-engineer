'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const thisTrackisCrackMetadata = {
  id: 'thistrackiscrack',
  title: 'this track is crack (acquired)',
  date: 'March 2008',
  cardDate: 'Mar 2008',
  cardDescription: 'Music discovery site',
  href: '/products/thistrackiscrack',
  shareTitle: 'this track is crack (acquired) — Ramin — Design Engineer',
  shareText: 'Music discovery site',
};

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  aspectRatio?: 'square' | 'wide' | 'tall' | 'video';
};

export default function ThisTrackisCrackPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        In 2008, I launched a music discovery site while still in high school, sharing emerging EDM and hip hop artists. The site went viral and became a destination for discovering new talent, featuring early work from Krewella, Skrillex, Diplo, Kid Cudi, and Wiz Khalifa before they hit the mainstream. It was later acquired.
      </p>
    </>
  );

  // Media items - ThisTrackisCrack images
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      src: '/images/thistrackiscrack/IMG_1522.JPG',
      alt: 'ThisTrackisCrack',
    },
    {
      id: '2',
      type: 'image',
      src: '/images/thistrackiscrack/IMG_1509.JPG',
      alt: 'ThisTrackisCrack',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const midpoint = width / 2;
    
    if (x < midpoint) {
      setHoverSide('left');
    } else {
      setHoverSide('right');
    }
  };

  const handleMouseLeave = () => {
    setHoverSide(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioning) return;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const midpoint = width / 2;
    
    setIsTransitioning(true);
    
    if (x < midpoint) {
      // Clicked left half - go to previous (loop to last if on first)
      setCurrentIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : mediaItems.length - 1;
        return newIndex;
      });
    } else {
      // Clicked right half - go to next (loop to first if on last)
      setCurrentIndex((prev) => {
        const newIndex = prev < mediaItems.length - 1 ? prev + 1 : 0;
        return newIndex;
      });
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTransitioning) return;
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const width = rect.width;
    const midpoint = width / 2;
    
    setIsTransitioning(true);
    
    if (x < midpoint) {
      // Tapped left half - go to previous (loop to last if on first)
      setCurrentIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : mediaItems.length - 1;
        return newIndex;
      });
    } else {
      // Tapped right half - go to next (loop to first if on last)
      setCurrentIndex((prev) => {
        const newIndex = prev < mediaItems.length - 1 ? prev + 1 : 0;
        return newIndex;
      });
    }
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getCursorClass = () => {
    if (isMobile) return '';
    if (hoverSide === 'left') {
      return 'cursor-chevron-left';
    }
    if (hoverSide === 'right') {
      return 'cursor-chevron-right';
    }
    return '';
  };

  const getCursorStyle = () => {
    if (isMobile) return {};
    if (hoverSide === 'left') {
      return {
        cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M15 18l-6-6 6-6\'/%3E%3C/svg%3E") 12 12, auto',
      };
    }
    if (hoverSide === 'right') {
      return {
        cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M9 18l6-6-6-6\'/%3E%3C/svg%3E") 12 12, auto',
      };
    }
    return {};
  };

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={thisTrackisCrackMetadata.title}
        date={thisTrackisCrackMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: thisTrackisCrackMetadata.shareTitle,
          text: thisTrackisCrackMetadata.shareText,
        }}
      >
        <div className="w-full max-w-[680px] mx-auto relative px-4 sm:px-0">
          {/* Image container */}
          <div
            ref={imageContainerRef}
            className={`relative w-full rounded-lg overflow-hidden mt-8 sm:mt-12 ${getCursorClass()}`}
            style={{
              width: '100%',
              height: '600px',
              maxHeight: '90vh',
              ...getCursorStyle(),
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`media-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full"
              >
                {mediaItems[currentIndex].type === 'video' ? (
                  <video
                    src={mediaItems[currentIndex].src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <Image
                    src={mediaItems[currentIndex].src}
                    alt={mediaItems[currentIndex].alt || 'ThisTrackisCrack'}
                    fill
                    className={
                      mediaItems[currentIndex].id === '1' || mediaItems[currentIndex].id === '2'
                        ? 'object-contain'
                        : 'object-cover'
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots - positioned over image */}
            <div 
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2"
              style={{ zIndex: 30 }}
            >
              {mediaItems.map((item, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={`dot-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`transition-all duration-300 rounded-full flex-shrink-0 ${
                      isActive
                        ? 'w-2 h-2 bg-white'
                        : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    style={{
                      minWidth: '8px',
                      minHeight: '8px',
                      position: 'relative',
                      zIndex: 30,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

