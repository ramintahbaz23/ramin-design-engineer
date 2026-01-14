'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const sunsetMetadata = {
  id: 'sunset',
  title: 'Sunset Chaser',
  date: 'December 2025',
  cardDate: 'Dec 2025',
  cardDescription: 'A location-aware concept that notifies users before sunset.',
  href: '/products/sunset',
  shareTitle: 'Sunset Chaser — Ramin — Designer',
  shareText: 'A location-aware concept that notifies users before sunset.',
};

export default function SunsetPage() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        My better half is always chasing the perfect sunset. I built a location-aware concept that alerts her right before golden hour hits, so she can always catch it in time.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={sunsetMetadata.title}
        date={sunsetMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: sunsetMetadata.shareTitle,
          text: sunsetMetadata.shareText,
        }}
      >
        {/* Single Image */}
        <div className="mt-12 sm:mt-16 w-full max-w-full">
          <div className="relative w-full rounded-lg overflow-hidden" style={{ maxHeight: 'calc(100vh - 200px)', minHeight: '800px' }}>
            <Image
              src="/images/sunset_chaser.png"
              alt="Sunset Chaser"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

