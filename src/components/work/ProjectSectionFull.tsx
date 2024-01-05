import React from 'react';
import MainBlock from '@/components/blocks/Main';

import type { FullProjectSectionProps } from '@/types';

export default function ProjectSectionFull(
  props: FullProjectSectionProps
) {
  return (
    <section className="relative mx-auto max-w-[192px] px-10 md:text-xl lg:px-16 2xl:px-24 3xl:text-base">
      <div className="space-y-14">
        {props.content.map((block) => (
          <MainBlock key={block._key} block={block} />
        ))}
      </div>
    </section>
  );
}
