import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import Slider from '@/components/Slider';
import {
  ImageBlock,
  MediaBlock,
  VideoBlock,
} from '@/components/blocks';

import type { ProjectBlockType } from '@/types';

export function ProjectBlock(props: ProjectBlockType) {
  switch (props._type) {
    case 'imageBlock': {
      const size = props.size || 'full';
      const sizes = getImageBlockSizes(size);
      return (
        <ProjectMediaBlockWrapper size={size}>
          <MediaBlock
            {...props}
            config={{
              sizes,
              background: true,
              objectFit: 'contain',
            }}
          />
        </ProjectMediaBlockWrapper>
      );
    }

    case 'videoBlock': {
      const size = props.size || 'full';
      return (
        <ProjectMediaBlockWrapper size={size}>
          <MediaBlock {...props} />
        </ProjectMediaBlockWrapper>
      );
    }
    case 'mediaModule':
      return (
        <Slider
          content={props.media}
          config={{ format: 'landscape', objectFit: 'cover' }}
        />
      );
    default:
      return null;
  }
}

function getImageBlockSizes(size: 'full' | 'small' | 'medium') {
  switch (size) {
    case 'full':
      return '100vw';
    case 'small':
      return '(max-width: 480px) 100vw, 50vw';
    case 'medium':
      return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw';
  }
}

function ProjectMediaBlockWrapper({
  children,
  size = 'full',
}: PropsWithChildren<{
  size?: 'full' | 'small' | 'medium';
}>) {
  return (
    <div
      className={cn(
        size === 'small' && 'w-full md:w-1/2',
        size === 'medium' && 'md:w-3/4',
        (size === 'small' || size === 'medium') && 'mx-auto'
      )}
    >
      {children}
    </div>
  );
}
