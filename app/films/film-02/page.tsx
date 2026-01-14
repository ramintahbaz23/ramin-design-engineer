'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const film02Metadata = {
  id: 'film-02',
  title: 'FedCaddy Commercial',
  date: 'November 2016',
  cardDate: 'Nov 2016',
  cardDescription: 'An app that helps constituents track their government.',
  href: '/films/film-02',
  shareTitle: 'FedCaddy Commercial — Ramin — Designer',
  shareText: 'A commercial for FedCaddy, an app that helps constituents track their government representatives and make their voices heard. I directed the production from development through post, handling story development, storyboarding, and editing.',
};

export default function Film02Page() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A commercial for FedCaddy, an app that helps constituents track their government representatives and make their voices heard.
      </p>
      <p className="mb-2 sm:mb-3">
        I directed the production from development through post, handling story development, storyboarding, and editing.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={film02Metadata.title}
        date={film02Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: film02Metadata.shareTitle,
          text: film02Metadata.shareText,
        }}
      >
        <div className="mt-2 sm:mt-4 w-full max-w-full">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src="https://www.youtube.com/embed/NuDO8lSTBm0"
              title="FedCaddy Commercial"
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

