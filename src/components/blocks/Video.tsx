import { type VideoBlock as VideoBlockProps } from '@/types';
import clsx from 'clsx';
import React from 'react';

type Props = {};

export default function VideoBlock({
  url,
  ...props
}: VideoBlockProps) {
  return (
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={url}
        className={clsx(
          'h-auto w-full',
          props.cropTop && '-mt-[4.2%]'
        )}
        autoPlay={props.autoPlay}
        muted={props.autoPlay}
        loop={props.autoPlay}
      />
    </div>
  );
}
