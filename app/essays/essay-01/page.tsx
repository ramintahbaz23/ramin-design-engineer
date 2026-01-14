import ProjectPageShell from '@/components/ProjectPageShell';
import AnimatedPage from '@/components/AnimatedPage';

export const essay01Metadata = {
  id: 'essay-01',
  title: "We've been here before",
  date: 'December 2024',
  cardDate: 'Dec 2024',
  cardDescription: 'Every new form of compute triggers the same fears.',
  href: '/essays/essay-01',
};

export default function Essay01() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        In 1961, IBM installed one of its first commercial computers inside an American office.
        For the people who worked there, it was not introduced as a helpful tool. It arrived as a signal. A machine that could calculate faster than any human raised immediate questions about replacement, relevance, and control. Entire job categories were suddenly uncertain. And in many cases, they disappeared.
      </p>
      <p className="mb-2 sm:mb-3">
        Every major technological shift begins the same way: with excitement from the people building it, and anxiety from the people living alongside it.
      </p>
      <p className="mb-2 sm:mb-3">
        To the workers of 1961, this moment felt unprecedented. Computers were genuinely new. There was no playbook, no established pattern for how to integrate machines that could perform cognitive work. The complexity was real, both technical and social. The fear was rational.
      </p>
      <p className="mb-2 sm:mb-3">
        And yet, looking back, we can see it wasn't the first time. The industrial revolution introduced machines that replaced physical labor. The telegraph compressed time and distance in ways that felt destabilizing. Each wave of automation sparked the same questions: What happens to human work? What gets lost? Who controls these new systems?
      </p>
      <p className="mb-2 sm:mb-3">
        The pattern repeats because the pattern is structural.
      </p>
      <p className="mb-2 sm:mb-3">
        New forms of compute arrive. They perform tasks that were previously human. They operate at speeds and scales that feel overwhelming. The people building them see possibility. The people living alongside them see uncertainty. And for a period, sometimes brief, sometimes generational, there is friction.
      </p>
      <p className="mb-2 sm:mb-3">
        Eventually, the technology becomes normalized. Not because the anxiety was irrational, but because society adapts. New roles emerge. Systems become more predictable. The thing that once felt incomprehensible becomes mundane.
      </p>
      <p className="mb-2 sm:mb-3">
        Today, we are at the beginning of another cycle.
      </p>
      <p className="mb-2 sm:mb-3">
        Artificial intelligence and robotics are no longer confined to labs or industrial settings. They are moving into homes, workplaces, and public spaces. And once again, the dominant conversation is about displacement. Will machines replace workers? Will they remove agency? Will they make human roles obsolete?
      </p>
      <p className="mb-2 sm:mb-3">
        These questions echo almost perfectly those asked sixty years ago.
      </p>
      <p className="mb-2 sm:mb-3">
        To anyone living through this moment, it feels uniquely complex. And it is. AI operates differently than previous forms of compute. It learns, adapts, and makes decisions in ways that are less predictable than deterministic code. The opacity is real. The uncertainty is real.
      </p>
      <p className="mb-2 sm:mb-3">
        But the shape of the moment is familiar.
      </p>
      <p className="mb-2 sm:mb-3">
        What we're experiencing is not a rupture. It's a repetition. The technology is new. The human response is not.
      </p>
      <p className="mb-2 sm:mb-3">
        History suggests that this friction is temporary, not because the concerns are unfounded, but because they always resolve, one way or another. Society adjusts. Systems evolve. The boundaries between human work and machine work shift, as they always have.
      </p>
      <p>
        We've been here before.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={essay01Metadata.title}
        date={essay01Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: `${essay01Metadata.title} — Ramin — Designer`,
          text: essay01Metadata.cardDescription,
        }}
      />
    </AnimatedPage>
  );
}










