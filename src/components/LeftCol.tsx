import { Block } from '@/types';
import React from 'react';
import ColumnBlock from '@/blocks/Column';

type Props = {
  blocks: {
    top: Block | null;
    center: Block | null;
    bottom: Block | null;
  };
};

export default function LeftCol({ blocks }: Props) {
  const { top, center, bottom } = blocks;

  return (
    <>
      {top && (
        <div className="sticky top-14">
          <ColumnBlock block={top} />
        </div>
      )}
      {center && (
        <div className="">
          <ColumnBlock block={center} />
        </div>
      )}
      {bottom && (
        <div className="sticky bottom-14">
          <ColumnBlock block={bottom} />
        </div>
      )}
    </>
  );
}
