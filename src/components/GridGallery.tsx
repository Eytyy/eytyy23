import React from 'react';
import {
  MediaConfigType,
  MediaModuleType,
} from './modules/MediaModule';
import { motion } from 'framer-motion';
import { MediaBlock } from './blocks';
import { cn } from '@/lib/utils';
type Props = MediaModuleType;

export default function GridGallery({ media }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {media.map((item) => {
        return (
          <motion.div
            key={item._key}
            className={cn(
              'relative [&>img]:pointer-events-none',
              item.size === 'full' && 'col-span-full'
            )}
          >
            <MediaBlock
              key={item._key}
              {...item}
              config={{
                format: 'square',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
