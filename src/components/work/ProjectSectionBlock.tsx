// @ts-nocheck

import { ProjectSectionType } from '@/types';
import { ProjectGridMain } from './ProjectUI';
import MediaBlock from '../blocks/MediaBlock';
import ProjectSlider from './ProjectSlider';
import ContentBlock from '../blocks/Content';
import clsx from 'clsx';

export function ProjectSectionBlock(
  props: ProjectSectionType['content'][number] & {
    last?: boolean;
  }
) {
  switch (props._type) {
    case 'imageBlock':
    case 'videoBlock':
      return (
        <ProjectGridMain
          className={clsx('lg:pt-14', props.last && 'lg:pb-14')}
        >
          <MediaBlock {...props} />
        </ProjectGridMain>
      );
    case 'mediaModule':
      return (
        <ProjectGridMain
          className={clsx(props.last && 'lg:pb-14', 'lg:pt-14')}
          bleed
        >
          <ProjectSlider
            content={props.media}
            config={{
              format: 'landscape',
              objectFit: 'cover',
            }}
          />
        </ProjectGridMain>
      );
    case 'advancedContentModule':
    case 'contentModule':
      return (
        <ProjectGridMain
          className={clsx(
            'px-10 text-xl md:pt-14 lg:px-0 lg:text-2xl xl:text-3xl',
            props.last && 'lg:pb-14'
          )}
        >
          <ContentBlock {...props} />
        </ProjectGridMain>
      );
    default:
      return null;
  }
}
