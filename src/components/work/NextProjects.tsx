// @ts-nocheck

import React from 'react';
import { MediaModule, SiteProps } from '@/types';
import ImageBlock from '../blocks/Image';
import VideoBlock from '../blocks/Video';
import Link from 'next/link';
import { useProject } from '@/context/project';
import { Variants, motion, useInView } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { HiArrowNarrowRight } from 'react-icons/hi';
import {
  EpicGrid,
  EpicGridTopRight,
  EpicGridTopLeft,
  EpicGridBottomLeft,
  EpicGridMain,
  EpicGridBottomRight,
} from '../UI';
import OtherNav from '../navigation/OtherNav';
import MainMenu from '../navigation/MainMenu';
import FooterMenu from '../navigation/FooterMenu';
import clsx from 'clsx';
import Logos from '../Logos';
import useMainNav from '@/hooks/useMainNav';
import { useApp } from '@/context/app';

export default function NextProjects() {
  const { settings } = useApp();
  const { mainMenu, footerMenu, secondaryMenu } = settings;
  const { nextPage, other } = useMainNav(mainMenu);
  const { setReachedEnd } = useProject();
  const ref = React.useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.99,
  });

  React.useEffect(() => {
    setReachedEnd(inView);
  }, [inView, setReachedEnd]);

  if (!nextPage) return null;

  return (
    <EpicGrid
      ref={ref}
      className={clsx(
        'bg-pageBG text-pageText',
        'h-screen border-t-[1px]',
        !inView ? 'border-t-pageText' : 'border-t-pageBG'
      )}
    >
      <EpicGridTopLeft>
        {other && (
          <AnimatedBlock visible={inView}>
            <MainMenu
              menu={{
                ...mainMenu,
                items: other,
              }}
            />
          </AnimatedBlock>
        )}
      </EpicGridTopLeft>

      <EpicGridBottomLeft>
        <AnimatedBlock
          visible={inView}
          className="grid h-full grid-rows-2"
        >
          <OtherNav menu={secondaryMenu} />
        </AnimatedBlock>
      </EpicGridBottomLeft>
      <EpicGridMain>
        {nextPage.page?.preview && (
          <ProjectPreview {...nextPage.page} title={nextPage.title} />
        )}
      </EpicGridMain>
      <EpicGridTopRight>
        <AnimatedBlock
          className="flex h-full flex-col items-end justify-between"
          visible={inView}
        >
          <Logos />
          <div className="lg:hidden">
            <OtherNav top menu={secondaryMenu} />
          </div>
        </AnimatedBlock>
      </EpicGridTopRight>
      <EpicGridBottomRight>
        <AnimatedBlock visible={inView}>
          <FooterMenu menu={footerMenu} />
        </AnimatedBlock>
      </EpicGridBottomRight>
    </EpicGrid>
  );
}

const animation_variants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function AnimatedBlock({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
  visible: boolean;
}) {
  return (
    <motion.div
      variants={animation_variants}
      initial="initial"
      animate={visible ? 'visible' : 'hidden'}
      className={twMerge('relative z-10', className)}
    >
      {children}
    </motion.div>
  );
}

function ProjectPreview(props: {
  title: string;
  slug: string;
  _type: string;
  preview?: MediaModule;
}) {
  const { preview, slug, title } = props;
  if (!preview || !preview.media) return null;

  const { _type } = preview.media[0];

  return (
    <Link href={`/projects/${slug}`} className="block w-full">
      {_type === 'videoBlock' ? (
        <VideoBlock {...preview.media[0]} />
      ) : (
        <ImageBlock {...preview.media[0]} />
      )}
      <div className="mt-2 flex items-center gap-2 text-accent">
        <HiArrowNarrowRight className="text-xl" />
        <h3 className="font-bold">{title}</h3>
      </div>
    </Link>
  );
}
