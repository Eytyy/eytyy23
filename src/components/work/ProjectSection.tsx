import React from 'react';
import clsx from 'clsx';

import { useInView } from '@/hooks/useInView';
import { useProject } from '@/context/project';

import { ProjectGrid } from './ProjectUI';
import { ProjectSectionBlock } from './ProjectSectionBlock';
import ProjectSectionSide from './ProjectSectionSide';

import { ProjectSectionType } from '@/types';

type Props = {
  section: ProjectSectionType;
  index: number;
};

export default function ProjectSection({ section, index }: Props) {
  const { setActiveSection, activeIdx } = useProject();
  const ref = React.useRef<HTMLDivElement>(null);

  const scrollCb = React.useCallback(() => {
    setActiveSection(index);
  }, [index, setActiveSection]);

  useInView(ref, 'all', scrollCb);
  const visible = activeIdx === index;

  const { content, sideContent, showSideFirst } = section;

  return (
    <section id={section._key} className="relative py-10 lg:py-0">
      <div
        ref={ref}
        className="absolute top-1/2"
        style={{
          gridTemplateRows: `repeat(${content.length}, min-content)`,
        }}
      />
      <h2 className="mb-6 flex items-center gap-2 px-10 text-base font-bold md:hidden">
        <span
          className={clsx(
            'h-5 w-5 bg-[blue]',
            showSideFirst && 'rounded-full'
          )}
        ></span>{' '}
        {section.title}
      </h2>
      <ProjectGrid
        style={{
          gridTemplateRows: `repeat(${content.length}, min-content)`,
        }}
      >
        {content.map((block, index) => (
          <ProjectSectionBlock
            key={block._key}
            {...block}
            last={index === content.length - 1}
          />
        ))}
        <ProjectSectionSide
          content={sideContent}
          visible={visible}
          showFirst={showSideFirst}
        />
      </ProjectGrid>
    </section>
  );
}
