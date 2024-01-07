import React, { useEffect, useState } from 'react';

import MediaModule from '@/components/modules/MediaModule';
import { BlogPostCards } from '@/components/blog';
import { ContentBlock, MediaBlock, SketchBlock,  } from '.';

import type { MainBlocks } from '@/types';

type Props = {
  block: MainBlocks;
};

export default function MainBlock({ block }: Props) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  switch (block._type) {
    case 'contentModule':
    case 'advancedContentModule':
      return (
        <ContentBlock body={block.body} className="max-w-[90ch]" />
      );
    case 'sketchBlock':
      if (!showChild) {
        return null;
      }
      return <SketchBlock {...block.sketch} />;
    case 'mediaModule':
      return <MediaModule {...block} />;
    case 'imageBlock':
    case 'videoBlock':
      return <MediaBlock {...block} />;
    case 'blogPostsModule':
      return <BlogPostCards {...block} />;
    default:
      return <div>I do not know what to do with this</div>;
  }
}
