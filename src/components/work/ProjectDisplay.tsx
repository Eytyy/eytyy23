import ProjectSection from './ProjectSection';
import { useProject } from '@/context/project';
import ProjectHeader from './ProjectHeader';
import NextProjects from './NextProjects';

export default function ProjectDisplay() {
  const { project, activeIdx } = useProject();
  if (!project.sections || !project.sections[activeIdx]) return null;
  const sectionTitle = project.sections[activeIdx].title;

  return (
    <>
      <div className="bg-pageBG text-pageText transition-all duration-500 ease-linear">
        <ProjectHeader title={sectionTitle} />
        {project.sections.map((section, idx) => (
          <ProjectSection
            key={section._key}
            section={section}
            index={idx}
          />
        ))}
      </div>
      <NextProjects />
    </>
  );
}
