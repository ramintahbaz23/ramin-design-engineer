'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const film01Metadata = {
  id: 'film-01',
  title: 'Engineering at Promise',
  date: 'July 2025',
  cardDate: 'July 2025',
  cardDescription: "Recruiting video for Promise's engineering team.",
  href: '/films/film-01',
  shareTitle: 'Engineering at Promise — Ramin — Designer',
  shareText: 'A recruiting video showcasing the engineering team and culture at Promise. I directed the production from development through post, handling story development, storyboarding, and editing.',
};

export default function Film01Page() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A recruiting video showcasing the engineering team and culture at Promise.
      </p>
      <p className="mb-2 sm:mb-3">
        I directed the production from development through post, handling story development, storyboarding, and editing.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={film01Metadata.title}
        date={film01Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: film01Metadata.shareTitle,
          text: film01Metadata.shareText,
        }}
      >
        <div className="mt-2 sm:mt-4 w-full max-w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src="https://www.youtube.com/embed/_Z3JNDgOLn0"
              title="Engineering at Promise"
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

