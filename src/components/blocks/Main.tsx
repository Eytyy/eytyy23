import React, { useEffect, useState } from 'react';
import ContentBlock from './Content';
import SketchCollectionModule from '@/components/modules/SketchCollection';
import ImageBlock from './Image';
import MediaModule from '../modules/MediaModule';
import VideoBlock from './Video';

import type { MainBlocks } from '@/types';
import { BlogPostCards } from '../blog';

export default function MainBlock({ block }: { block: MainBlocks }) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);
  switch (block._type) {
    case 'contentModule':
    case 'advancedContentModule':
      return <ContentBlock body={block.body} />;
    case 'sketchCollectionModule':
      if (!showChild) {
        return null;
      }
      return <SketchCollectionModule {...block} />;
    case 'mediaModule':
      return <MediaModule {...block} />;
    case 'imageBlock':
      return <ImageBlock {...block} />;
    case 'videoBlock':
      return <VideoBlock {...block} />;
    case 'blogPostsModule':
      return <BlogPostCards {...block} />;
    default:
      return <div>I do not know what to do with this</div>;
  }
}
