'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GearItem } from '@/lib/gear-data';

type GearCardProps = {
  item: GearItem;
  size?: 'default' | 'large';
};

export default function GearCard({ item, size = 'default' }: GearCardProps) {
  const cardSize = size === 'large' ? 'w-64 sm:w-72' : 'w-48 sm:w-56';
  
  return (
    <Link
      href={`/gear/${item.slug}`}
      className={`${cardSize} flex-shrink-0 group`}
    >
      <div className="rounded-lg overflow-hidden bg-white border border-transparent hover:border-[#D0CECA] shadow-none hover:shadow-sm transition-all duration-200">
        {/* Image - Square aspect ratio */}
        <div className={`${cardSize} aspect-square relative bg-gray-100`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        {/* Label */}
        <div className="p-3 sm:p-4">
          <p className="text-[14px] sm:text-[15px] font-medium text-gray-900">
            {item.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

