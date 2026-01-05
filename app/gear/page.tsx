'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedPage from '@/components/AnimatedPage';
import GearRow from '@/components/GearRow';
import {
  gearItems,
  getRecentGear,
  getLastUpdatedDate,
  formatDate,
  getGearByCategory,
  GearCategory,
} from '@/lib/gear-data';

const categories: GearCategory[] = ['Workspace', 'EDC', 'Home', 'Bags', 'Analog', 'Wanted'];

const sectionVariants = {
  hidden: { opacity: 0, filter: 'blur(28px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
};

export default function GearPage() {
  const recentGear = getRecentGear(8);
  const lastUpdated = formatDate(getLastUpdatedDate());
  
  // Get items for two categorized rows (you can customize which categories)
  const workspaceGear = getGearByCategory('Workspace').slice(0, 8);
  const edcGear = getGearByCategory('EDC').slice(0, 8);

  return (
    <AnimatedPage>
      <div className="min-h-screen" style={{ backgroundColor: '#E2DEDB' }}>
        <main className="relative px-5 sm:px-6 pt-24 sm:pt-32 pb-28 sm:pb-32">
          <div className="max-w-[680px] mx-auto">
            {/* Category Pills */}
            <motion.section
              className="mb-10 sm:mb-14 px-3.5 sm:px-4"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{
                opacity: {
                  type: 'tween',
                  duration: 1.1,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                },
                filter: {
                  type: 'tween',
                  duration: 1.6,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/gear/filter/${category.toLowerCase()}`}
                    className="px-4 py-2 rounded-full bg-white border border-[#D0CECA] hover:bg-[#E0DCD7] hover:border-[#C0BCB7] text-[14px] sm:text-[15px] font-medium text-gray-900 transition-all duration-200"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* Most Recently Added */}
            <motion.section
              className="mb-10 sm:mb-12"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{
                opacity: {
                  type: 'tween',
                  duration: 1.1,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
                filter: {
                  type: 'tween',
                  duration: 1.6,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <div className="flex items-baseline justify-between mb-6 px-3.5 sm:px-4">
                <h2 className="text-[16px] font-medium text-black">
                  Most recently added
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-500">
                  Last updated {lastUpdated}
                </p>
              </div>
              <GearRow items={recentGear} />
            </motion.section>

            {/* Workspace Row */}
            <motion.section
              className="mb-10 sm:mb-12"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{
                opacity: {
                  type: 'tween',
                  duration: 1.1,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                },
                filter: {
                  type: 'tween',
                  duration: 1.6,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <GearRow items={workspaceGear} title="Workspace" />
            </motion.section>

            {/* EDC Row */}
            <motion.section
              className="mb-10 sm:mb-12"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{
                opacity: {
                  type: 'tween',
                  duration: 1.1,
                  delay: 0.34,
                  ease: [0.22, 1, 0.36, 1],
                },
                filter: {
                  type: 'tween',
                  duration: 1.6,
                  delay: 0.34,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              <GearRow items={edcGear} title="EDC" />
            </motion.section>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}







