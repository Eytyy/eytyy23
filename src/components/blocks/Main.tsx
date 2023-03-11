import { Block } from '@/types';
import React, { useEffect, useState } from 'react';
import ContentBlock from './Content';
import { BlogPostCards } from '@/components/blog';
import SketchCollectionModule from '@/components/modules/SketchCollection';
import Menu from '@/components/navigation/Menu';

export default function MainBlock({ block }: { block: Block }) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);
  switch (block._type) {
    case 'menuBlock':
      return <Menu {...block} />;
    case 'contentModule':
    case 'advancedContentModule':
      return <ContentBlock body={block.body} />;
    case 'sketchCollectionModule':
      if (!showChild) {
        return null;
      }
      return <SketchCollectionModule {...block} />;
    case 'blogPostsModule':
      return <BlogPostCards {...block} />;
    default:
      return <div>Main Block</div>;
  }
}
