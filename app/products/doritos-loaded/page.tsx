'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const doritosLoadedMetadata = {
  id: 'doritos-loaded',
  title: 'Doritos Loaded',
  date: '2023',
  cardDate: 'June 2023',
  cardDescription: 'Product description',
  href: '/products/doritos-loaded',
  shareTitle: 'Doritos Loaded — Ramin — Design Engineer',
  shareText: 'Product description',
};

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
};

export default function DoritosLoadedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        Product description goes here.
      </p>
    </>
  );

  // Media items - replace with actual images/videos
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      src: '/images/image1.jpeg',
      alt: 'Doritos Loaded',
    },
    {
      id: '2',
      type: 'image',
      src: '/images/image2.jpeg',
      alt: 'Doritos Loaded',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
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
        {/* Carousel */}
        <div className="mt-2 sm:mt-4 w-full max-w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0"
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
                    alt={mediaItems[currentIndex].alt || 'Doritos Loaded'}
                    fill
                    className="object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 z-10"
                  aria-label="Previous"
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
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 z-10"
                  aria-label="Next"
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
              </>
            )}

            {/* Dots indicator */}
            {mediaItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-white w-6'
                        : 'bg-white/40 hover:bg-white/60 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

