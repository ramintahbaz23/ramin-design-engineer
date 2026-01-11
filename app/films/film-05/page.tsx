'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const film05Metadata = {
  id: 'film-05',
  title: 'The Zeke Sanders Story',
  date: 'June 2021',
  cardDate: 'Jun 2021',
  cardDescription: "The peaks and valleys of a young man's journey to make his first film.",
  href: '/films/film-05',
  shareTitle: 'The Zeke Sanders Story — Ramin — Design Engineer',
  shareText: 'An abstract exploration of light, shadow, and the passage of time.',
};

export default function Film05Page() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A short film following the peaks and valleys of a young filmmaker's journey to make his first film. I served as associate producer.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={film05Metadata.title}
        date={film05Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: film05Metadata.shareTitle,
          text: film05Metadata.shareText,
        }}
      >
        <div className="mt-2 sm:mt-4 w-full max-w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src="https://player.vimeo.com/video/712222470"
              title="The Zeke Sanders Story"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

