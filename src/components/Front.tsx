import React from 'react';
import MainBlock from '@/blocks/Main';
import { Block } from '@/types';

type Props = {
  page: any;
  site: any;
};

export default function Home({ page }: Props) {
  const { main } = page;

  return (
    <>
      {main?.map((block: Block) => (
        <MainBlock key={block._key} block={block} />
      ))}
    </>
  );
}
