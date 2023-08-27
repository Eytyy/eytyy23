// @ts-nocheck
import type { MediaModule } from '@/types';
import React from 'react';
import ImageBlock from '../blocks/Image';
import VideoBlock from '../blocks/Video';

type Props = MediaModule;

export default function MediaModule({ media }: Props) {
  return (
    <>
      {media.map((block) => (
        <MediaBlock key={block._key} {...block} />
      ))}
    </>
  );
}

const MediaBlock = (block: MediaModule['media'][0]) => {
  switch (block._type) {
    case 'imageBlock':
      return <ImageBlock {...block} />;
    case 'videoBlock':
      return <VideoBlock {...block} />;
    default:
      return <div>I do not know what to do with this</div>;
  }
};
