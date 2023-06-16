import type {
  MediaBlock as MediaBlockProps,
  PortfolioProps,
} from '@/types';
import React, { useRef } from 'react';
import ImageBlock from './blocks/Image';
import VideoBlock from './blocks/Video';
import { useRouter } from 'next/router';

type Props = PortfolioProps['sections'][0];

export default function PortfolioSection(section: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // scroll to section if section.anchor matches hash
  React.useEffect(() => {
    if (router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      if (id === section.anchor && ref.current)
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.asPath, section.anchor]);

  return (
    <div className="relative" ref={ref}>
      <h2 className="absolute top-4 left-4 z-20 rounded-lg bg-white p-2">
        {section.title}
      </h2>
      {section.mainBlocks &&
        section.mainBlocks.map((block) => (
          <MediaBlock key={block._key} {...block} />
        ))}
    </div>
  );
}

function MediaBlock(block: MediaBlockProps) {
  return (
    <div>
      {block.media?.map((media) => (
        <div key={media._key}>
          {media._type === 'imageBlock' && <ImageBlock {...media} />}
          {media._type === 'videoBlock' && <VideoBlock {...media} />}
        </div>
      ))}
    </div>
  );
}
