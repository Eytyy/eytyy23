import { ImageBlockProps, VideoBlockProps } from '@/types';
import ImageBlock from './Image';
import VideoBlock from './Video';
import React from 'react';
import { useInView } from 'framer-motion';
import { MediaConfigType } from '../modules/MediaModule';

type Props = (ImageBlockProps | VideoBlockProps) & {
  config?: MediaConfigType;
};
export default function MediaBlock(props: Props) {
  const { _type } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 'all',
  });

  return (
    <div ref={ref}>
      {_type === 'imageBlock' ? (
        <ImageBlock {...props} />
      ) : (
        <VideoBlock {...props} inView={inView} />
      )}
    </div>
  );
}
