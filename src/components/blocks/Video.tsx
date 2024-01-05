import { cn } from '@/lib/utils';
import { type VideoBlockProps as VideoBlockProps } from '@/types';
import React from 'react';

export default function VideoBlock({
  url,
  autoPlay,
  inView = false,
  background = false,
}: VideoBlockProps) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (autoPlay && ref.current && ref.current.paused && inView) {
      ref.current.play();
    } else if (
      autoPlay &&
      ref.current &&
      !ref.current.paused &&
      !inView
    ) {
      ref.current.pause();
    }
  }, [autoPlay, inView]);

  return (
    <>
      <div
        className={cn(
          background
            ? 'absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
            : 'relative overflow-hidden'
        )}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={ref}
          src={url}
          className={cn(
            background
              ? 'h-auto min-h-full w-auto min-w-full max-w-none'
              : 'h-auto w-full'
          )}
          autoPlay={autoPlay && inView}
          muted={autoPlay}
          loop={autoPlay}
          playsInline
        />
      </div>
    </>
  );
}
