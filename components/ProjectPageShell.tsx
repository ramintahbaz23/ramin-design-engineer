'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';

type ShareConfig = {
  title: string;
  text: string;
  url?: string;
};

type ProjectPageShellProps = {
  title: string;
  date: string;
  description: ReactNode;
  backHref?: string;
  backLabel?: string;
  shareConfig?: ShareConfig;
  children?: ReactNode;
};

export default function ProjectPageShell({
  title,
  date,
  description,
  backHref = '/craft',
  backLabel = 'Craft',
  shareConfig,
  children,
}: ProjectPageShellProps) {
  const handleShare = async () => {
    if (!shareConfig) return;

    const url = shareConfig.url ?? window.location.href;
    const { title: shareTitle, text } = shareConfig;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred
        // eslint-disable-next-line no-console
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // eslint-disable-next-line no-alert
        alert('Link copied to clipboard!');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  const showShare = Boolean(shareConfig);
  const hasChildren = Boolean(children);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E2DEDB' }}>
      {/* Header + content wrapper */}
      <main className={`relative z-10 px-5 sm:px-6 pt-24 sm:pt-32 flex flex-col ${hasChildren ? 'min-h-[1064px]' : ''} ${hasChildren ? '' : 'pb-28 sm:pb-32'}`}>
        <div className={`max-w-[680px] mx-auto w-full flex flex-col ${hasChildren ? '' : ''}`}>
          {/* Text content section */}
          <div className={`flex flex-col ${hasChildren ? 'pb-7 sm:pb-10' : ''}`}>
            <div className="flex items-start gap-2 sm:gap-3">
              {/* Back button – desktop only */}
              <Link
                href={backHref}
                className="hidden sm:inline-flex items-center gap-1.5 -translate-x-10 sm:-translate-x-12 translate-y-[2px] sm:translate-y-[4px] text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                aria-label="Back"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{backLabel}</span>
              </Link>

              {/* Content column with title, date, and body */}
              <div className="max-w-[560px] flex-1">
                <div className="mb-0.5">
                  <h1 className="text-[18px] font-bold text-gray-900">
                    {title}
                  </h1>
                </div>

                <p className="text-[16px] text-gray-600 mb-4 sm:mb-6">
                  {date}
                </p>

                <div className="space-y-4 sm:space-y-6 text-[18px] text-gray-800 leading-[1.65] sm:leading-[1.5] w-full">
                  {description}
                </div>
              </div>
            </div>
          </div>

          {/* Optional children section for animation/interactive content */}
          {children && (
            <div className="flex items-start justify-center pt-7 sm:pt-10 pb-28 sm:pb-32 w-full">
              {children}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}




