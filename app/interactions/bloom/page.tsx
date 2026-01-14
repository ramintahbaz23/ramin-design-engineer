'use client';

import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';
import Bloom from '@/components/Bloom';

export const bloomMetadata = {
  id: 'bloom',
  title: 'Bloom',
  date: 'January 2026',
  cardDate: 'Jan 2026',
  cardDescription: 'iOS-inspired pull down menu.',
  href: '/interactions/bloom',
  shareTitle: 'Bloom — Ramin — Designer',
  shareText: 'An iOS-inspired pull down menu for the web.',
};

export default function BloomPage() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        An iOS-inspired pull-down menu I reverse-engineered after seeing it first posted by @joshpuckett on X.
      </p>
      <p className="mb-2 sm:mb-3">
        Built with React using useState for state management and hooks to control menu behavior, styled with Geist typography and iconography for a clean, native feel.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={bloomMetadata.title}
        date={bloomMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: bloomMetadata.shareTitle,
          text: bloomMetadata.shareText,
        }}
        extraSpacing={-16}
      >
        <div className="w-full max-w-[680px] mx-auto relative px-4 sm:px-0">
          <Bloom />
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

