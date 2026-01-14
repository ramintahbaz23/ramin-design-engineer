'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const film03Metadata = {
  id: 'film-03',
  title: 'm8 Commercial',
  date: 'November 2013',
  cardDate: 'Nov 2013',
  cardDescription: 'A proximity-based dating app that breaks the ice.',
  href: '/films/film-03',
  shareTitle: 'm8 Commercial — Ramin — Designer',
  shareText: 'A commercial for m8, a proximity-based dating app that connects people in the same space to break the ice. I directed the production from development through post, handling story development, storyboarding, and editing.',
};

export default function Film03Page() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A commercial for m8, a proximity-based dating app that connects people in the same space to break the ice.
      </p>
      <p className="mb-2 sm:mb-3">
        I directed the production from development through post, handling story development, storyboarding, and editing.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={film03Metadata.title}
        date={film03Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: film03Metadata.shareTitle,
          text: film03Metadata.shareText,
        }}
      >
        <div className="mt-2 sm:mt-4 w-full max-w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src="https://www.youtube.com/embed/NGgevfz9RAs"
              title="m8 Commercial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

