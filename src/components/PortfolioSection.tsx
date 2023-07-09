import type {
  Block,
  MainBlocks,
  MediaBlock,
  PortfolioProps,
} from '@/types';
import React, { useCallback, useEffect, useRef } from 'react';
import ImageBlock from './blocks/Image';
import VideoBlock from './blocks/Video';
import {
  useMotionValue,
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from 'framer-motion';
import ContentBlock from './blocks/Content';
import Link from 'next/link';
import { IoMdGlobe } from 'react-icons/io';

type Props = {
  section: PortfolioProps['sections'][0];
  textVisible: boolean;
  onEnd: () => void;
};

export default function PortfolioSection({
  section,
  onEnd,
  textVisible,
}: Props) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const active = section.mainBlocks[activeIdx];

  const ref = useRef<null | HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const value = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const translateY = useMotionValue(`-50%`);
  const lastBlock = section.mainBlocks.length - 1;
  const LoadNext = useCallback(() => {
    if (textVisible) {
      onEnd();
    } else if (activeIdx !== lastBlock) {
      setActiveIdx((prev) => prev + 1);
      if (ref.current) {
        ref.current.scrollTo(0, 0);
      }
    } else {
      onEnd();
    }
  }, [setActiveIdx, activeIdx, onEnd, textVisible, lastBlock]);

  useEffect(() => {
    const trackValue = (v: number) => {
      if (v <= 0.55 && ref.current) {
        LoadNext();
      }
    };
    const unsubscribe = value.on('change', trackValue);
    return () => {
      unsubscribe();
    };
  }, [value, LoadNext]);

  return (
    <div className="section relative h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <div
          ref={ref}
          className="relative -mr-10 h-full overflow-y-scroll"
        >
          <motion.div
            className="sticky top-[50%] -translate-y-[50%] pr-10"
            style={{
              scale: value,
              translateY,
            }}
          >
            {textVisible ? (
              <div className="text-xl">
                <ContentBlock body={section.description} />
              </div>
            ) : (
              <div>
                <Block block={active} />
                {activeIdx === lastBlock && section.link && (
                  <Link
                    href={`${section.link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 text-2xl"
                  >
                    <IoMdGlobe />
                  </Link>
                )}
              </div>
            )}
          </motion.div>
          <div className="h-[200%]" />
        </div>
      </AnimatePresence>
    </div>
  );
}

function Block({ block }: { block: MainBlocks }) {
  switch (block._type) {
    case 'mediaModule':
      return <MediaModule {...block} />;
    case 'imageBlock':
      return <ImageBlock {...block} />;
    case 'videoBlock':
      return <VideoBlock {...block} />;
    case 'contentModule':
      return <ContentBlock {...block} />;
    default:
      return null;
  }
}

function MediaModule(block: MediaBlock) {
  const [activeModuleIdx, setActiveModuleIdx] = React.useState(0);
  const active = block.media[activeModuleIdx];

  return (
    <div>
      <div key={active._key}>
        {active._type === 'imageBlock' && <ImageBlock {...active} />}
        {active._type === 'videoBlock' && <VideoBlock {...active} />}
      </div>
    </div>
  );
}
