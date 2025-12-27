import AnimatedPage from '@/components/AnimatedPage';

export const photoboomMetadata = {
  id: 'photoboom',
  title: 'Photo boom',
  date: 'March 23, 2025',
  cardDate: 'Mar 2025',
  cardDescription: 'An exploding image gallery interaction.',
  href: '/photoboom',
  shareTitle: 'Photo boom — Ramin — Design Engineer',
  shareText: 'An exploding image gallery interaction exploring motion as feedback.',
};

export default function Home() {
  return (
    <AnimatedPage variant="dramatic">
      <div className="min-h-screen" style={{ backgroundColor: '#E2DEDB' }}>
        <main className="relative px-5 sm:px-6 pt-24 sm:pt-32 pb-28 sm:pb-32 min-h-screen flex items-center justify-center">
          <div className="max-w-[680px] mx-auto w-full">
            <div className="max-w-[560px] mx-auto">
              <h2 className="text-[16px] font-medium text-black mb-3 sm:mb-4">
                My name is Ramin (rah-MEEN) a designer who codes.
              </h2>
              <div className="text-[16px] sm:text-[17px] text-gray-700 leading-relaxed">
                <p>
                  I solve problems by telling stories. Whether it&apos;s through product, film, or something you can hold in your hands—design is how I make sense of the world and connect people to what matters.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}
