'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const doritosLoadedMetadata = {
  id: 'doritos-loaded',
  title: 'Doritos Loaded',
  date: 'June 2023',
  cardDate: 'June 2023',
  cardDescription: 'End-to-end brand activation for Coachella.',
  href: '/products/doritos-loaded',
  shareTitle: 'Doritos Loaded — Ramin — Design Engineer',
  shareText: 'A full-scale brand activation for Doritos at Coachella, designing the end-to-end experience across digital and physical touchpoints.',
};

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  aspectRatio?: 'square' | 'wide' | 'tall' | 'video';
};

export default function DoritosLoadedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

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
        A full-scale brand activation for Doritos at Coachella, designing the end-to-end experience across digital and physical touchpoints. Created the in-app ordering flow, physical booth environment, and captured the event through photography and videography to complete the experience.
      </p>
    </>
  );

  // Shuffle function for randomizing array order
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Helper function to get aspect ratio from filename or type
  // Lower aspect ratio = taller image (portrait)
  // Higher aspect ratio = wider image (landscape)
  const getAspectRatio = (item: MediaItem): Promise<number> => {
    return new Promise((resolve) => {
      if (item.type === 'video') {
        // Videos are 1x1 (square) - aspect ratio 1.0
        resolve(1.0);
        return;
      }
      
      // For images, load them to get actual dimensions
      const img = new window.Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        resolve(aspectRatio);
      };
      img.onerror = () => {
        // Fallback: estimate from filename
        const src = item.src.toLowerCase();
        if (src.includes('4x5')) {
          resolve(0.8); // 4:5 portrait
        } else if (src.includes('.png') || src.includes('.jpg')) {
          resolve(0.9); // Assume portrait
        } else {
          resolve(1.5); // Default landscape
        }
      };
      img.src = item.src;
    });
  };

  // Media items - Doritos Loaded images and videos (taller items first, Page_1 always first)
  useEffect(() => {
    const loadAndSortItems = async () => {
      const items: MediaItem[] = [
        {
          id: '1',
          type: 'video',
          src: '/images/doritos/231215_The-Garage_Doritos_S01_1x1_H264.mp4',
        },
        {
          id: '2',
          type: 'video',
          src: '/images/doritos/231215_The-Garage_Doritos_S03_1x1_H264.mp4',
        },
        {
          id: '3',
          type: 'image',
          src: '/images/doritos/DOR001_PBD_Shot_33_V2_4x5.jpg',
          alt: 'Doritos Loaded product',
        },
        {
          id: '4',
          type: 'image',
          src: '/images/doritos/Doritos_Loaded_VIS_FINAL copy_Page_1.png',
          alt: 'Doritos Loaded visual',
        },
        {
          id: '5',
          type: 'image',
          src: '/images/doritos/Doritos_Loaded_VIS_FINAL copy_Page_2.png',
          alt: 'Doritos Loaded visual',
        },
        {
          id: '6',
          type: 'image',
          src: '/images/doritos/Menu.jpg',
          alt: 'Doritos Loaded menu',
        },
        {
          id: '7',
          type: 'image',
          src: '/images/doritos/Type=Base.png',
          alt: 'Doritos Loaded base type',
        },
        {
          id: '8',
          type: 'image',
          src: '/images/doritos/Type=Protein.png',
          alt: 'Doritos Loaded protein type',
        },
        {
          id: '9',
          type: 'image',
          src: '/images/doritos/SPLASH.jpg',
          alt: 'Doritos Loaded splash',
        },
      ];
      
      // Find the first image (SPLASH) and second image (Page_1) and separate them
      const firstImage = items.find(item => item.src.includes('SPLASH.jpg'));
      const secondImage = items.find(item => item.src.includes('Doritos_Loaded_VIS_FINAL copy_Page_1.png'));
      const restOfItems = items.filter(
        item => !item.src.includes('SPLASH.jpg') && !item.src.includes('Doritos_Loaded_VIS_FINAL copy_Page_1.png')
      );
      
      // Get aspect ratios for all items
      const itemsWithRatios = await Promise.all(
        restOfItems.map(async (item) => ({
          item,
          aspectRatio: await getAspectRatio(item),
        }))
      );
      
      // Sort by aspect ratio (taller items first - lower aspect ratio means taller)
      itemsWithRatios.sort((a, b) => a.aspectRatio - b.aspectRatio);
      
      // Put first image (SPLASH) at the beginning, second image (Page_1) in 2nd position, then sorted rest
      const sortedItems = [
        ...(firstImage ? [firstImage] : []),
        ...(secondImage ? [secondImage] : []),
        ...itemsWithRatios.map(({ item }) => item),
      ];
      
      setMediaItems(sortedItems);
    };
    
    loadAndSortItems();
  }, []);

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
        title={doritosLoadedMetadata.title}
        date={doritosLoadedMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: doritosLoadedMetadata.shareTitle,
          text: doritosLoadedMetadata.shareText,
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
            {mediaItems.length > 0 && (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`media-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    currentIndex === 2 || currentIndex === 3 || currentIndex === 4
                      ? "absolute inset-0 flex items-center justify-center"
                      : "absolute inset-0"
                  }
                >
                  {mediaItems[currentIndex].type === 'video' ? (
                    currentIndex === 2 || currentIndex === 3 || currentIndex === 4 ? (
                      <div className="absolute inset-0 rounded-lg overflow-hidden bg-transparent">
                        <video
                          src={mediaItems[currentIndex].src}
                          className="w-full h-full object-contain"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      </div>
                    ) : (
                      <video
                        src={mediaItems[currentIndex].src}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                    )
                  ) : (
                    currentIndex === 2 || currentIndex === 3 || currentIndex === 4 ? (
                      <div className="absolute inset-0 rounded-lg overflow-hidden bg-transparent">
                        <Image
                          src={mediaItems[currentIndex].src}
                          alt={mediaItems[currentIndex].alt || 'Doritos Loaded'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <Image
                        src={mediaItems[currentIndex].src}
                        alt={mediaItems[currentIndex].alt || 'Doritos Loaded'}
                        fill
                        className="object-cover"
                      />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination dots - positioned over image */}
            {mediaItems.length > 0 && (
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
            )}
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}
