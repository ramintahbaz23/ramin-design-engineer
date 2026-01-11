import Music from '@/components/Music';
import ProjectPageShell from '@/components/ProjectPageShell';
import AnimatedPage from '@/components/AnimatedPage';

export const paymentStatusMetadata = {
  id: 'paymentstatus',
  title: 'Payment status',
  date: 'February 8, 2025',
  cardDate: 'Feb 2025',
  cardDescription: 'Clear visual feedback for payment processing.',
  href: '/paymentstatus',
  shareTitle: 'Payment status — Ramin — Design Engineer',
  shareText: 'A lifelike 2D player interaction exploring depth and motion.',
};

export default function PaymentStatusPage() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        In fintech, clarity matters at every step. Animations should guide users through critical moments, making the system's status clear. When it's someone's money, they need to know exactly what's happening.
      </p>
      <p className="mb-2 sm:mb-3">
        Built using Next.js, Framer Motion, and Tailwind CSS.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={paymentStatusMetadata.title}
        date={paymentStatusMetadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: paymentStatusMetadata.shareTitle,
          text: paymentStatusMetadata.shareText,
        }}
        extraSpacing={{ mobile: 0, desktop: 160 }}
      >
        <Music />
      </ProjectPageShell>
    </AnimatedPage>
  );
}









