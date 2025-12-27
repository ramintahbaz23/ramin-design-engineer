import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/AnimatedPage';
import GearCard from '@/components/GearCard';
import {
  getGearByCategory,
  GearCategory,
} from '@/lib/gear-data';

type FilterPageProps = {
  params: Promise<{ category: string }>;
};

const categoryMap: Record<string, GearCategory> = {
  workspace: 'Workspace',
  edc: 'EDC',
  home: 'Home',
  bags: 'Bags',
  analog: 'Analog',
  wanted: 'Wanted',
};

const sectionVariants = {
  hidden: { opacity: 0, filter: 'blur(28px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
};

export default async function FilterPage({ params }: FilterPageProps) {
  const { category } = await params;
  const categoryKey = category.toLowerCase();
  const gearCategory = categoryMap[categoryKey];

  if (!gearCategory) {
    notFound();
  }

  const items = getGearByCategory(gearCategory);

  return (
    <AnimatedPage>
      <div className="min-h-screen" style={{ backgroundColor: '#E2DEDB' }}>
        <main className="relative px-5 sm:px-6 pt-24 sm:pt-32 pb-28 sm:pb-32">
          <div className="max-w-[680px] mx-auto">
            {/* Category Header */}
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
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-[16px] font-medium text-black">
                  {gearCategory}
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-500">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </motion.section>

            {/* 2-Column Grid */}
            <motion.section
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
              <div className="grid grid-cols-2 gap-3 sm:gap-4 px-3.5 sm:px-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'tween',
                      duration: 0.6,
                      delay: 0.28 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <GearCard item={item} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}

