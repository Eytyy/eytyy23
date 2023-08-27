import React from 'react';
import MainBlock from '@/components/blocks/Main';
import type { MainBlocks } from '@/types';

type Props = {
  page: any;
  site: any;
};

export default function Home({ page }: Props) {
  const { main } = page;

  return (
    <>
      {main?.map((block: MainBlocks) => (
        <MainBlock key={block._key} block={block} />
      ))}
    </>
  );
}
