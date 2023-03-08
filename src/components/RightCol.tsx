import { Block } from '@/types';
import Link from 'next/link';
import React from 'react';
import ColumnBlock from '@/blocks/Column';
import Logo from './Logo';

type Props = {
  rightCol: Block | null;
};

export default function RightCol({ rightCol }: Props) {
  return (
    <>
      <Link className="sticky top-14" href="/">
        <Logo />
      </Link>
      {rightCol && <ColumnBlock block={rightCol} />}
    </>
  );
}
