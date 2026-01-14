'use client';

import AnimatedPage from '@/components/AnimatedPage';
import ProjectPageShell from '@/components/ProjectPageShell';
import ElectricBorder from '@/components/ElectricBorder';
import styles from './electric-border.module.css';

export const electricBorderMetadata = {
  id: 'electric-border',
  title: 'Electric border',
  date: 'December 2024',
  cardDate: 'Dec 2024',
  cardDescription: 'Animated border effect.',
  href: '/interactions/electric-border',
  shareTitle: 'Electric border — Ramin — Designer',
  shareText: 'An animated border effect with turbulent displacement.',
};

export default function ElectricBorderPage() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        An animated border effect with turbulent displacement using SVG filters. The border distorts and glows dynamically, with interactive controls to adjust the animation speed, distortion intensity, and color.
      </p>
      <p className="mb-2 sm:mb-3">
        Built using SVG filters, CSS, and JavaScript. Note: This animation is resource-intensive and may perform slower on mobile devices.
      </p>
    </>
  );

  return (
    <div className={styles.pageWrapper}>
      <AnimatedPage variant="dramatic">
        <ProjectPageShell
          title={electricBorderMetadata.title}
          date={electricBorderMetadata.date}
          description={description}
          backHref="/craft"
          backLabel="Craft"
          shareConfig={{
            title: electricBorderMetadata.shareTitle,
            text: electricBorderMetadata.shareText,
          }}
          extraSpacing={{ mobile: -16, desktop: 0 }}
        >
          <div className="w-full max-w-[680px] mx-auto relative px-4 sm:px-0">
            <ElectricBorder />
          </div>
        </ProjectPageShell>
      </AnimatedPage>
    </div>
  );
}

