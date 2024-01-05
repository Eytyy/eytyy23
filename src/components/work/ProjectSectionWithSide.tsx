import React from 'react';

import MainBlock from '@/components/blocks/Main';

import type { TwoColsProjectSectionProps } from '@/types';
import { ContentBlock } from '../blocks';

export default function ProjectSectionWithSide(
  props: TwoColsProjectSectionProps
) {
  return (
    <section className="relative mx-auto max-w-[1920px] space-y-8 px-10 text-3xl font-light leading-snug lg:space-y-14 lg:px-16 2xl:px-24">
      <div className="ml-20 md:ml-auto md:w-1/2">
        <ContentBlock
          body={props.sideContent}
          className="content text-[max(1rem,1.75vw)]"
        />
      </div>
      <div className="col-span-3">
        {props.content?.map((block) => (
          <MainBlock block={block} key={block._key} />
        ))}
      </div>
    </section>
  );
}
