export type GearCategory = 'Workspace' | 'EDC' | 'Home' | 'Bags' | 'Analog' | 'Wanted';

export type GearItem = {
  id: string;
  title: string;
  category: GearCategory;
  slug: string;
  image: string;
  images?: string[]; // For detail page
  bodyText: string;
  addedDate: string; // ISO date string
};

export const gearItems: GearItem[] = [
  {
    id: '1',
    title: 'MacBook Pro 16"',
    category: 'Workspace',
    slug: 'macbook-pro-16',
    image: '/images/image1.jpeg',
    images: ['/images/image1.jpeg', '/images/image2.jpeg'],
    bodyText: 'My primary development machine. The M3 Max chip handles everything I throw at it, from running multiple design tools to compiling large Next.js projects. The 16-inch display is perfect for split-screen coding and design work.',
    addedDate: '2025-01-15',
  },
  {
    id: '2',
    title: 'Keychron Q1',
    category: 'Workspace',
    slug: 'keychron-q1',
    image: '/images/image2.jpeg',
    images: ['/images/image2.jpeg'],
    bodyText: 'A custom mechanical keyboard that I use for all my coding and writing. The tactile switches provide great feedback, and the build quality is exceptional.',
    addedDate: '2025-01-10',
  },
  {
    id: '3',
    title: 'AirPods Pro',
    category: 'EDC',
    slug: 'airpods-pro',
    image: '/images/image3.jpeg',
    images: ['/images/image3.jpeg'],
    bodyText: 'Essential for focus work and calls. The noise cancellation helps me stay in the zone when coding or designing.',
    addedDate: '2025-01-08',
  },
  {
    id: '4',
    title: 'Peak Design Everyday Backpack',
    category: 'Bags',
    slug: 'peak-design-backpack',
    image: '/images/image4.jpeg',
    images: ['/images/image4.jpeg'],
    bodyText: 'The perfect bag for carrying my laptop, camera, and daily essentials. The organization system is thoughtful and the build quality is outstanding.',
    addedDate: '2025-01-05',
  },
  {
    id: '5',
    title: 'Herman Miller Aeron',
    category: 'Workspace',
    slug: 'herman-miller-aeron',
    image: '/images/image1.jpeg',
    images: ['/images/image1.jpeg'],
    bodyText: 'A classic ergonomic chair that supports long coding sessions. The mesh back keeps me cool and the adjustability is perfect for my setup.',
    addedDate: '2024-12-20',
  },
  {
    id: '6',
    title: 'Leica M6',
    category: 'Analog',
    slug: 'leica-m6',
    image: '/images/image2.jpeg',
    images: ['/images/image2.jpeg'],
    bodyText: 'My favorite film camera. The rangefinder experience is meditative and forces me to slow down and think about each frame.',
    addedDate: '2024-12-15',
  },
  {
    id: '7',
    title: 'Muji Pen Set',
    category: 'EDC',
    slug: 'muji-pen-set',
    image: '/images/image3.jpeg',
    images: ['/images/image3.jpeg'],
    bodyText: 'Simple, reliable pens that I always have with me. Great for sketching ideas and taking notes.',
    addedDate: '2024-12-10',
  },
  {
    id: '8',
    title: 'Sonos Beam',
    category: 'Home',
    slug: 'sonos-beam',
    image: '/images/image4.jpeg',
    images: ['/images/image4.jpeg'],
    bodyText: 'Compact soundbar that delivers great audio for my home office. Perfect for music while working.',
    addedDate: '2024-12-05',
  },
  {
    id: '9',
    title: 'iPad Pro 12.9"',
    category: 'Workspace',
    slug: 'ipad-pro',
    image: '/images/image1.jpeg',
    images: ['/images/image1.jpeg'],
    bodyText: 'Used for sketching, note-taking, and reviewing designs. The Apple Pencil integration is seamless.',
    addedDate: '2024-11-28',
  },
  {
    id: '10',
    title: 'Fujifilm X100V',
    category: 'Analog',
    slug: 'fujifilm-x100v',
    image: '/images/image2.jpeg',
    images: ['/images/image2.jpeg'],
    bodyText: 'A digital camera with film-like qualities. The colors and ergonomics make it a joy to use.',
    addedDate: '2024-11-20',
  },
  {
    id: '11',
    title: 'Bellroy Tech Kit',
    category: 'Bags',
    slug: 'bellroy-tech-kit',
    image: '/images/image3.jpeg',
    images: ['/images/image3.jpeg'],
    bodyText: 'Keeps all my cables and adapters organized. The design is minimal and functional.',
    addedDate: '2024-11-15',
  },
  {
    id: '12',
    title: 'Studio Display',
    category: 'Workspace',
    slug: 'studio-display',
    image: '/images/image4.jpeg',
    images: ['/images/image4.jpeg'],
    bodyText: 'The 5K display is stunning for design work. The color accuracy and brightness are perfect.',
    addedDate: '2024-11-10',
  },
  {
    id: '13',
    title: 'Aeropress',
    category: 'Home',
    slug: 'aeropress',
    image: '/images/image1.jpeg',
    images: ['/images/image1.jpeg'],
    bodyText: 'My daily coffee maker. Simple, consistent, and makes great coffee every time.',
    addedDate: '2024-11-05',
  },
  {
    id: '14',
    title: 'Rollei 35',
    category: 'Wanted',
    slug: 'rollei-35',
    image: '/images/image2.jpeg',
    images: ['/images/image2.jpeg'],
    bodyText: 'A compact 35mm film camera I\'ve been eyeing. The size and quality make it perfect for travel.',
    addedDate: '2024-10-30',
  },
];

// Get most recently added items (sorted by addedDate, newest first)
export function getRecentGear(limit: number = 4): GearItem[] {
  return [...gearItems]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, limit);
}

// Get last updated date
export function getLastUpdatedDate(): string {
  const dates = gearItems.map(item => new Date(item.addedDate));
  const latest = new Date(Math.max(...dates.map(d => d.getTime())));
  return latest.toISOString().split('T')[0];
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Get gear by category
export function getGearByCategory(category: GearCategory): GearItem[] {
  return gearItems.filter(item => item.category === category);
}

// Get gear by slug
export function getGearBySlug(slug: string): GearItem | undefined {
  return gearItems.find(item => item.slug === slug);
}

// Get related gear (same category, excluding current item)
export function getRelatedGear(currentSlug: string, limit: number = 4): GearItem[] {
  const currentItem = getGearBySlug(currentSlug);
  if (!currentItem) return [];
  
  return getGearByCategory(currentItem.category)
    .filter(item => item.slug !== currentSlug)
    .slice(0, limit);
}

