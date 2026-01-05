'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const keycadetsMetadata = {
  id: 'keycadets',
  title: 'keycadets (acquired)',
  date: '2019',
  cardDate: 'Jan 2019',
  cardDescription: 'Premium keyboard hardware company.',
  href: '/products/keycadets',
  shareTitle: 'keycadets (acquired) — Ramin — Design Engineer',
  shareText: 'A premium mechanical keyboard peripheral company.',
};

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  aspectRatio?: 'square' | 'wide' | 'tall' | 'video';
};

export default function KeycadetsPage() {
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
        I founded and bootstrapped keycadets, a premium mechanical keyboard brand. I designed the full product line (deskmats, keyboards, metal trays, artisan keycap cases), sourced manufacturing, and built the business from the ground up. The company scaled to national retail placement before being acquired.
      </p>
    </>
  );

  // Media items - Keycadets product images and videos
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'video',
      src: '/images/keycadets/248285912_4711445322210021_8637902604872814185_n.MOV',
    },
    {
      id: '2',
      type: 'video',
      src: '/images/keycadets/temp_301828800_373985454883575_7475533863697429798_n.MP4',
    },
    {
      id: '3',
      type: 'image',
      src: '/images/keycadets/Screenshot 2024-03-16 at 7.30.15 PM.png',
      alt: 'Keycadets product',
    },
    {
      id: '4',
      type: 'image',
      src: '/images/keycadets/1m802.png',
      alt: 'Keycadets product',
    },
    {
      id: '5',
      type: 'video',
      src: '/images/keycadets/video.MP4',
    },
    {
      id: '6',
      type: 'video',
      src: '/images/keycadets/Final.MP4',
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
        title={keycadetsMetadata.title}
        date={keycadetsMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: keycadetsMetadata.shareTitle,
          text: keycadetsMetadata.shareText,
        }}
      >
        <div className="w-full max-w-[680px] mx-auto relative px-4 sm:px-0">
          {/* Image container */}
          <div
            ref={imageContainerRef}
            className={`relative w-full rounded-lg overflow-hidden mt-8 sm:mt-12 ${getCursorClass()}`}
            style={{
              aspectRatio: '4/5',
              width: '100%',
              minHeight: '500px',
              maxHeight: '90vh',
              backgroundColor: '#E2DEDB',
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
                className="absolute inset-0"
              >
                {mediaItems[currentIndex].type === 'video' ? (
                  <video
                    src={mediaItems[currentIndex].src}
                    className="w-full h-full object-contain"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <Image
                    src={mediaItems[currentIndex].src}
                    alt={mediaItems[currentIndex].alt || 'Keycadets'}
                    fill
                    className="object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots - positioned over image */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10">
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

