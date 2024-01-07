import React from 'react';
import MainBlock from '@/components/blocks/Main';

import type { FullProjectSectionProps } from '@/types';
import Wrapper from '../ui/Wrapper';

export default function ProjectSectionFull(
  props: FullProjectSectionProps
) {
  return (
    <Wrapper className="relative md:text-xl3xl:text-base">
      <div className="space-y-14">
        {props.content.map((block) => (
          <MainBlock key={block._key} block={block} />
        ))}
      </div>
    </Wrapper>
  );
}
