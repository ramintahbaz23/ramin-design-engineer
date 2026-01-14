import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedPage from '@/components/AnimatedPage';
import GearCard from '@/components/GearCard';
import ProjectPageShell from '@/components/ProjectPageShell';
import {
  getGearBySlug,
  getRelatedGear,
  formatDate,
} from '@/lib/gear-data';

type GearDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GearDetailPage({ params }: GearDetailPageProps) {
  const { slug } = await params;
  const item = getGearBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedGear = getRelatedGear(slug, 4);
  const images = item.images || [item.image];

  const description = (
    <>
      <div className="mb-4">
        <Link
          href={`/gear/filter/${item.category.toLowerCase()}`}
          className="inline-block px-4 py-2 rounded-full bg-white border border-[#D0CECA] hover:bg-[#E0DCD7] hover:border-[#C0BCB7] text-[14px] sm:text-[15px] font-medium text-gray-900 transition-all duration-200"
        >
          {item.category}
        </Link>
      </div>
      
      {/* Images */}
      <div className="space-y-4 mb-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100"
          >
            <Image
              src={image}
              alt={`${item.title} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Body Text */}
      <div className="text-[16px] sm:text-[17px] text-gray-700 leading-relaxed whitespace-pre-line">
        {item.bodyText}
      </div>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={item.title}
        date={formatDate(item.addedDate)}
        description={description}
        backHref="/gear"
        backLabel="Gear"
        shareConfig={{
          title: `${item.title} — Ramin — Designer`,
          text: item.bodyText.substring(0, 100) + '...',
        }}
      >
        {/* More From This Category */}
        {relatedGear.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-baseline justify-between mb-6 px-3.5 sm:px-4">
              <h2 className="text-[16px] font-medium text-black">
                More from {item.category}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 px-3.5 sm:px-4">
              {relatedGear.map((relatedItem) => (
                <GearCard key={relatedItem.id} item={relatedItem} />
              ))}
            </div>
          </div>
        )}
      </ProjectPageShell>
    </AnimatedPage>
  );
}

