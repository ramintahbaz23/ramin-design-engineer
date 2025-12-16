'use client';

import PhotoBoom from '@/components/PhotoBoom';

// Customize these images with your own!
// Place your images in the public/images folder and update the paths below
const images = [
  {
    id: '1',
    src: '/images/image1.jpg',
    alt: 'Your first image',
  },
  {
    id: '2',
    src: '/images/image2.jpeg',
    alt: 'Your second image',
  },
  {
    id: '3',
    src: '/images/image3.jpeg',
    alt: 'Your third image',
  },
  {
    id: '4',
    src: '/images/image4.jpeg',
    alt: 'Your fourth image',
  },
];

export default function Home() {
  const handleShare = async () => {
    const url = window.location.href;
    const title = 'PhotoBoom';
    const text = 'A lightweight interaction exploring motion as feedback.';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Section with Title and Icons */}
      <div className="relative z-10 px-5 sm:px-6">
        <div className="max-w-[680px] mx-auto">
          <div className="mt-8 sm:mt-10">
            {/* H1 with Icons on same row */}
            <div className="flex items-center justify-between mb-0.5">
              <h1 className="text-[18px] font-bold text-gray-900">
                PhotoBoom
              </h1>
              
              {/* Icons - Right justified, aligned with text edge */}
              <div className="flex gap-2 items-center" style={{ transform: 'translateX(-34px)' }}>
                {/* GitHub Icon */}
                <a 
                  href="https://github.com/ramintahbaz23/photoboom.git" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-gray-700" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <defs>
                      <clipPath id="clip0_872_3147">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#clip0_872_3147)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z" />
                    </g>
                  </svg>
                </a>
                
                {/* Share Icon */}
                <button 
                  onClick={handleShare}
                  className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-gray-700" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M7.29289 1.39644C7.68342 1.00592 8.31658 1.00592 8.70711 1.39644L11.7803 4.46966L12.3107 4.99999L11.25 6.06065L10.7197 5.53032L8.75 3.56065V10.25V11H7.25V10.25V3.56065L5.28033 5.53032L4.75 6.06065L3.68934 4.99999L4.21967 4.46966L7.29289 1.39644ZM13.5 9.24999V13.5H2.5V9.24999V8.49999H1V9.24999V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.24999V8.49999H13.5V9.24999Z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="text-[14px] text-gray-600 mb-4 sm:mb-6">
              December 15, 2025
            </p>
            
            <div className="space-y-4 sm:space-y-6 text-base text-gray-800 leading-[1.5]">
              <p className="mb-2 sm:mb-3">
                A lightweight interaction exploring motion as feedback. Designed to respond instantly to touch and intent rather than clicks alone.
              </p>
              <p className="mb-2 sm:mb-3">
                This was built with Next.js, Framer Motion, Tailwind CSS and developed in Cursor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PhotoBoom Section - Centered in lower half */}
      <div className="relative min-h-[60vh] flex items-center justify-center">
        <PhotoBoom images={images} />
      </div>
    </div>
  );
}
