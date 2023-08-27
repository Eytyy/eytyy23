import { ProjectSectionType } from '@/types';
import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import React from 'react';
import SimpleContentBlock from '../blocks/SimpleContent';
import { ProjectGridLeftCol } from './ProjectUI';
import useMediaQuery from '@/hooks/useMediaQuery';

const SideVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type SectionSideProps = {
  content: ProjectSectionType['sideContent'];
  visible: boolean;
  showFirst?: boolean;
};

export default function ProjectSectionSide({
  content,
  visible,
  showFirst,
}: SectionSideProps) {
  const isCompact = useMediaQuery('(max-width: 1023px)');
  const variants = isCompact ? {} : SideVariants;

  if (!content) return null;

  return (
    <ProjectGridLeftCol
      className={clsx(
        showFirst && 'row-start-1 lg:row-start-auto',
        'relative px-10',
        'lg:row-span-full lg:row-start-1 lg:border-r-[1px] lg:px-0 lg:pt-14 lg:pr-11 lg:pb-14'
      )}
    >
      <motion.div
        className="space-y-6 md:sticky md:top-[calc(var(--project-header-height)+3.5rem)] md:space-y-14"
        variants={variants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        animate={visible ? 'visible' : 'hidden'}
      >
        {content.map((block) => (
          <aside
            key={block._key}
            className={clsx('xl:flex xl:flex-col xl:justify-center')}
          >
            <div>
              <h3 className="mb-1 font-bold xl:mb-2">
                {block.title}
              </h3>
              <SimpleContentBlock body={block.content} />
            </div>
          </aside>
        ))}
      </motion.div>
    </ProjectGridLeftCol>
  );
}
