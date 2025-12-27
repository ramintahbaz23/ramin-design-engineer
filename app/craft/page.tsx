'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedPage from '@/components/AnimatedPage';
import { photoboomMetadata } from '@/app/page';
import { essay01Metadata } from '@/app/essays/essay-01/page';
import { paymentStatusMetadata } from '@/app/paymentstatus/page';

type WorkItem = {
  id: string;
  date?: string;
  title: string;
  description: string;
  badge?: string;
  href?: string;
};

const fragments: WorkItem[] = [
  {
    id: photoboomMetadata.id,
    date: photoboomMetadata.cardDate,
    title: photoboomMetadata.title,
    description: photoboomMetadata.cardDescription,
    href: photoboomMetadata.href,
  },
  {
    id: paymentStatusMetadata.id,
    date: paymentStatusMetadata.cardDate,
    title: paymentStatusMetadata.title,
    description: paymentStatusMetadata.cardDescription,
    href: paymentStatusMetadata.href,
  },
];

const essays: WorkItem[] = [
  {
    id: essay01Metadata.id,
    date: essay01Metadata.cardDate,
    title: essay01Metadata.title,
    description: essay01Metadata.cardDescription,
    href: essay01Metadata.href,
  },
];

const caseStudies: WorkItem[] = [
  {
    id: 'selected-case-studies',
    title: 'Selected case studies',
    description:
      "Deep dives into specific products, problems, and outcomes. Reach out if you'd like to see examples tailored to your interests.",
    badge: 'By request',
  },
];
const sectionVariants = {
  hidden: { opacity: 0, filter: 'blur(28px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
};

const rowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function CraftPage() {
  return (
    <AnimatedPage>
      <div className="min-h-screen" style={{ backgroundColor: '#E2DEDB' }}>
        <main className="relative px-5 sm:px-6 pt-24 sm:pt-32 pb-28 sm:pb-32">
          <div className="max-w-[680px] mx-auto">
          {/* Intro copy (no explicit page title text) */}
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
            <div className="text-[16px] sm:text-[17px] text-gray-700 leading-relaxed max-w-[576px] space-y-3 sm:space-y-4">
              <p>
                I tell stories through product, film, objects, and writing. Each form offers a different way to connect.
              </p>
              <p>
                What ties them together is design. It lives in how I see the world, a lens shaped by years of learning by doing.
              </p>
              <p>
                This curated collection showcases the projects I&apos;m proud to share.
              </p>
            </div>
          </motion.section>

          {/* Interactions */}
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
            <div
              className="flex items-baseline justify-between mb-8 px-3.5 sm:px-4"
            >
              <h2 className="text-[16px] font-medium text-black">
                Interactions
              </h2>
            </div>

            <div className="space-y-1.5 sm:space-y-2 max-w-[576px]">
              {fragments.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    type: 'tween',
                    duration: 1.2,
                    delay: 0.28 + index * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 cursor-pointer bg-transparent hover:bg-[#E0DCD7] border border-transparent hover:border-[#D0CECA] shadow-none hover:shadow-sm transition-all duration-200"
                >
                  <Link
                    href={item.href ?? '#'}
                    className="flex items-start gap-6 w-full"
                    aria-label={item.title}
                  >
                    {item.date && (
                      <p className="text-[13px] sm:text-[14px] text-gray-500 min-w-[72px]">
                        {item.date}
                      </p>
                    )}
                    <div className="flex-1">
                      <p className="text-[16px] font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-[14px] sm:text-[15px] text-gray-600 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Essays */}
          <motion.section
            className="mb-10 sm:mb-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{
              opacity: {
                type: 'tween',
                duration: 1.1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
              filter: {
                type: 'tween',
                duration: 1.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <div className="flex items-baseline justify-between mb-8 px-3.5 sm:px-4">
              <h2 className="text-[16px] font-medium text-black">
                Essays
              </h2>
            </div>

            <div className="space-y-1.5 sm:space-y-2 max-w-[576px]">
              {essays.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    type: 'tween',
                    duration: 1.2,
                    delay: 0.42 + index * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 cursor-pointer bg-transparent hover:bg-[#E0DCD7] border border-transparent hover:border-[#D0CECA] shadow-none hover:shadow-sm transition-all duration-200"
                >
                  <Link
                    href={item.href ?? '#'}
                    className="flex items-start gap-6 w-full"
                    aria-label={item.title}
                  >
                    {item.date && (
                      <p className="text-[13px] sm:text-[14px] text-gray-500 min-w-[72px]">
                        {item.date}
                      </p>
                    )}
                    <div className="flex-1">
                      <p className="text-[16px] font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-[14px] sm:text-[15px] text-gray-600 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Case studies */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{
              opacity: {
                type: 'tween',
                duration: 1.1,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
              filter: {
                type: 'tween',
                duration: 1.6,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <div className="flex items-baseline justify-between mb-4 px-3.5 sm:px-4">
              <h2 className="text-[16px] font-medium text-black">
                Case studies
              </h2>
            </div>

            <div className="px-3.5 sm:px-4 space-y-3 sm:space-y-4 text-[15px] sm:text-[16px] text-gray-700 leading-relaxed max-w-[576px]">
              <p>
                If you're interested in exploring specific examples of my work, design process, or problem-solving approaches, please{' '}
                <Link
                  href="/elsewhere"
                  className="underline-offset-2 hover:underline"
                >
                  connect
                </Link>
                .
              </p>
              <p>
                I believe in sharing the right context and depth for each project, and would be happy to discuss selected case studies that align with your interests or requirements.
              </p>
            </div>
          </motion.section>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}



