'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const film04Metadata = {
  id: 'film-04',
  title: 'Zeke Sanders: Slice of Pie',
  date: 'June 2023',
  cardDate: 'Jun 2023',
  cardDescription: 'Zeke travels west to cast a coveted actress, but his plans unravel along the way.',
  href: '/films/film-04',
  shareTitle: 'Zeke Sanders: Slice of Pie — Ramin — Designer',
  shareText: 'A visual essay on movement, rhythm, and the spaces between moments.',
};

export default function Film04Page() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A short film following Zeke Sanders as he travels west to cast a coveted actress, only for his plans to unravel along the way. I served as associate producer.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={film04Metadata.title}
        date={film04Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: film04Metadata.shareTitle,
          text: film04Metadata.shareText,
        }}
      >
        <div className="mt-2 sm:mt-4 w-full max-w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src="https://player.vimeo.com/video/819241296"
              title="Zeke Sanders: Slice of Pie"
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

