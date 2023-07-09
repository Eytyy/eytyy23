import { DetailedProjectProps } from '@/types';
import React, { useCallback, useEffect, useRef } from 'react';
import MainBlock from '../blocks/Main';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProjectInner({
  page,
}: {
  page: DetailedProjectProps;
}) {
  const { blocks } = page;
  const [activeBlockIdx, setActiveBlockIdx] = React.useState(0);
  const [activeBlock, setActiveBlock] = React.useState(blocks[0]);
  const ref = useRef<null | HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: ref });
  const value = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const LoadNext = useCallback(() => {
    if (activeBlockIdx !== blocks.length - 1) {
      setActiveBlock(blocks[activeBlockIdx + 1]);
    } else {
      setActiveBlock(blocks[0]);
    }
  }, [setActiveBlock, activeBlockIdx, blocks]);

  useEffect(() => {
    const trackValue = (v: number) => {
      if (v === 0.5) {
        LoadNext();
        if (ref.current) {
          ref.current.scrollTo(0, 0);
        }
      }
    };
    value.on('change', trackValue);
  }, [value, LoadNext]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="absolute top-0 left-0 z-10 h-[100%] w-full overflow-hidden">
        <div
          ref={ref}
          className="pointer-events-none h-[100%] w-[120%] overflow-y-scroll"
        >
          <div className="h-[200%]" />
        </div>
      </div>
      <motion.div style={{ scale: value }}>
        <MainBlock key={activeBlock._key} block={activeBlock} />
      </motion.div>
    </div>
  );
}
