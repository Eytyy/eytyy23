import { Block } from '@/types';
import React from 'react';
import ContentBlock from './Content';
import CustomLink from '@/components/navigation/link';
import Menu from '@/components/navigation/Menu';
import MegaMenu from '@/components/navigation/MegaMenu';

export default function ColumnBlock({ block }: { block: Block }) {
  switch (block._type) {
    case 'menuBlock':
      return <Menu {...block} />;
    case 'megaMenuBlock':
      return <MegaMenu {...block} />;
    case 'contentModule':
      return (
        <div>
          <div>&darr; {block.title}</div>
          <ContentBlock body={block.body} />
        </div>
      );
    case 'navPage':
    case 'navLink':
      return <CustomLink {...block} />;
    default:
      return <div>ColumnBlock</div>;
  }
}