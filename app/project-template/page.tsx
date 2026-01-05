import ProjectPageShell from '@/components/ProjectPageShell';
import AnimatedPage from '@/components/AnimatedPage';

export default function ProjectTemplate() {
  const description = (
    <>
      <p className="mb-2 sm:mb-3">
        This is a template project page. Replace this text with a short description of the project, what it explores, or why it exists.
      </p>
      <p className="mb-2 sm:mb-3">
        You can add more detail here about the tools, process, or constraints behind the work.
      </p>
    </>
  );

  return (
    <AnimatedPage variant="dramatic">
      <ProjectPageShell
        title="Project Title"
        date="Month DD, YYYY"
        description={description}
        backHref="/craft"
        backLabel="Craft"
        shareConfig={{
          title: 'Project Title',
          text: 'Short summary of what this project is about.',
        }}
      />
    </AnimatedPage>
  );
}










