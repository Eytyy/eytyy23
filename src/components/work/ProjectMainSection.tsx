import React from 'react';

import type { ProjectMainSectionProps } from '@/types';
import { ContentBlock } from '../blocks';
import MediaModule from '../modules/MediaModule';
import ProjectInfo from './ProjectInfo';
import Wrapper from '../ui/Wrapper';

export default function ProjectMainSection(
  props: ProjectMainSectionProps
) {
  return (
    <Wrapper className="relative space-y-8 text-3xl font-light leading-snug lg:space-y-14">
      <div className="grid gap-14 md:grid-cols-2">
        <ProjectInfo {...props.projectInfo} />
        <ContentBlock
          body={props.content}
          className="content text-[max(1rem,1.75vw)]"
        />
      </div>
      <div className="col-span-3">
        {props.media.media && <MediaModule {...props.media} />}
      </div>
    </Wrapper>
  );
}
