import ProjectPageShell from '@/components/ProjectPageShell';
import AnimatedPage from '@/components/AnimatedPage';

export const essay02Metadata = {
  id: 'essay-02',
  title: "Amara's Law",
  date: 'January 15, 2025',
  cardDate: 'Jan 2025',
  cardDescription: 'AI hype, disappointment, and inevitable transformation ahead.',
  href: '/essays/essay-02',
};

export default function Essay02() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        In the mid-2010s, artificial intelligence was everywhere.
      </p>
      <p className="mb-2 sm:mb-3">
        DeepMind&apos;s AlphaGo defeated the world champion at Go, a game previously thought to be beyond machine capability. Self-driving cars were being tested on public roads. Every major technology company announced AI research divisions. Venture capital poured into machine learning startups. The consensus was clear: AI was about to change everything, and it was about to happen fast.
      </p>
      <p className="mb-2 sm:mb-3">
        By 2017, predictions were circulating that truck drivers would be obsolete within five years. Radiologists would be replaced by image recognition systems. Customer service would be entirely automated. The transformation was imminent.
      </p>
      <p className="mb-2 sm:mb-3">
        We are now past that five-year mark.
      </p>
      <p className="mb-2 sm:mb-3">
        Truck drivers are still employed. Radiologists still read scans. Customer service still involves humans. The revolution that seemed inevitable has not arrived on the predicted timeline. And predictably, a new narrative has emerged: maybe AI was overhyped. Maybe the limitations are more fundamental than we thought. Maybe this will take much longer than anyone expected.
      </p>
      <p className="mb-2 sm:mb-3">
        This is exactly where we should be.
      </p>
      <p className="mb-2 sm:mb-3">
        In the 1960s, a computer scientist named Roy Amara observed a pattern in how people respond to new technology. We overestimate its impact in the short term, he said, but underestimate it in the long term. The pattern is so consistent it became known as Amara&apos;s Law.
      </p>
      <p className="mb-2 sm:mb-3">
        Every major technological shift follows this curve. Initial excitement leads to inflated expectations. When those expectations aren&apos;t met quickly, disappointment sets in. The technology gets written off as hype. And then, quietly, it becomes ubiquitous.
      </p>
      <p className="mb-2 sm:mb-3">
        Electricity followed this pattern. The light bulb was perfected in the 1880s, but factories didn&apos;t fundamentally reorganize around electric power until the 1920s. The delay wasn&apos;t technical. It was social, organizational, and infrastructural.
      </p>
      <p className="mb-2 sm:mb-3">
        Personal computers followed the same curve. By the 1970s, computing had been around for decades, but the machines were still basement-dwelling mainframes that most people never interacted with. &quot;There is no reason anyone would want a computer in their home,&quot; said the CEO of Digital Equipment Corporation in 1977. Within fifteen years, personal computers were standard.
      </p>
      <p className="mb-2 sm:mb-3">
        The internet followed it too. In 1998, an economist wrote that the internet&apos;s economic impact would be no greater than the fax machine&apos;s. By 2005, he predicted, the phrase &quot;information economy&quot; would sound silly. That was written just as the internet was beginning to reshape nearly every sector of the economy.
      </p>
      <p className="mb-2 sm:mb-3">
        The pattern repeats because the gap between technical capability and social integration is real.
      </p>
      <p className="mb-2 sm:mb-3">
        A technology can work in a lab, or even in controlled deployment, and still take years to become embedded in daily life. Systems need to be built around it. Regulations need to adapt. People need to learn new behaviors. Industries need to reorganize. All of this takes time. More time than the initial excitement accounts for.
      </p>
      <p className="mb-2 sm:mb-3">
        AI is currently in the trough.
      </p>
      <p className="mb-2 sm:mb-3">
        The capabilities demonstrated in the mid-2010s were real. AlphaGo did win. Image recognition did improve dramatically. Natural language processing did advance. But translating those capabilities into widespread, reliable, economically transformative applications has been slower than predicted.
      </p>
      <p className="mb-2 sm:mb-3">
        This doesn&apos;t mean the technology failed. It means we&apos;re in the part of the cycle where the gap between what&apos;s technically possible and what&apos;s practically deployed becomes visible.
      </p>
      <p className="mb-2 sm:mb-3">
        The question is not whether AI will become ubiquitous. The question is what happens during the years it takes to get there.
      </p>
      <p className="mb-2 sm:mb-3">
        If Amara&apos;s Law holds, and history suggests it does, we are likely underestimating what AI will look like in 2035. Not because the technology will suddenly leap forward, but because the slow work of integration will compound in ways that are hard to see from inside the trough.
      </p>
      <p>
        The hype was premature. The disappointment is predictable. And the transformation is still coming.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title={essay02Metadata.title}
        date={essay02Metadata.date}
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: `${essay02Metadata.title} — Ramin — Designer`,
          text: essay02Metadata.cardDescription,
        }}
      />
    </AnimatedPage>
  );
}

