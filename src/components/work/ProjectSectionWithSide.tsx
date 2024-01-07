import React from 'react';

import MainBlock from '@/components/blocks/Main';

import type { TwoColsProjectSectionProps } from '@/types';
import { ContentBlock } from '../blocks';
import Wrapper from '../ui/Wrapper';

export default function ProjectSectionWithSide(
  props: TwoColsProjectSectionProps
) {
  return (
    <Wrapper className="relative space-y-8 text-3xl font-light leading-snug lg:space-y-14">
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
    </Wrapper>
  );
}
