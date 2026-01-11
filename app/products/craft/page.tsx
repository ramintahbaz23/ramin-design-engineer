'use client';

import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';

export const craftMetadata = {
  id: 'craft',
  title: 'Craft',
  date: 'December 2025',
  cardDate: 'Dec 2025',
  cardDescription: 'Product description',
  href: '/products/craft',
  shareTitle: 'Craft — Ramin — Design Engineer',
  shareText: 'Product description',
};

export default function CraftPage() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        A concept exploring the space between AI-generated code and design intent. Live previews and interactive controls transform raw output into refinable components, letting you adjust properties with immediate visual feedback, whether you're a design engineer fine-tuning details or building your first interface.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={craftMetadata.title}
        date={craftMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: craftMetadata.shareTitle,
          text: craftMetadata.shareText,
        }}
        extraSpacing={{ mobile: -16, desktop: 0 }}
      >
        {/* Single Image */}
        <div className="mt-0 sm:mt-16 w-full max-w-full">
          <div className="relative w-full rounded-lg overflow-hidden" style={{ maxHeight: 'calc(100vh - 200px)', minHeight: '800px', backgroundColor: '#E2DEDB' }}>
            <Image
              src="/images/craft/Craft_new.png"
              alt="Craft"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </ProjectPageShell>
    </AnimatedPage>
  );
}

