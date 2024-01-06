import React from 'react';

import type { ProjectMainSectionProps } from '@/types';
import { ContentBlock } from '../blocks';
import MediaModule from '../modules/MediaModule';
import ProjectInfo from './ProjectInfo';

export default function ProjectMainSection(
  props: ProjectMainSectionProps
) {
  return (
    <section className="relative mx-auto max-w-[1920px] space-y-8 px-10 text-3xl font-light leading-snug lg:space-y-14 lg:px-16 2xl:px-24">
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
    </section>
  );
}
