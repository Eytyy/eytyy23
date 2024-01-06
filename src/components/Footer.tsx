import React from 'react';
import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';

import AnimatedTitle from '@/components/AnimatedTitle';
import { MainMenu } from '@/components/navigation';
import type { MenuType } from './navigation/types';
import { Variants, motion, useInView } from 'framer-motion';
import CustomLink from './navigation/link';
import { useApp } from '@/context/app';
import Logos from './Logos';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  menus: MenuType;
};

export default function Footer({ title, menus }: Props) {
  const { footerVisible, setFooterVisible } = useApp();
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const router = useRouter();
  const menuItems = menus.items.filter(
    (item) =>
      (item._type === 'navPage' && item.slug !== router.asPath) ||
      item._type === 'navLink'
  );

  const scrollToTop = () => {
    if (!window) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (inView && !footerVisible) {
      setFooterVisible(true);
    } else if (!inView && footerVisible) {
      setFooterVisible(false);
    }
  }, [inView, footerVisible, setFooterVisible]);

  return (
    <footer className="min-h-[var(--app-height)] w-full" ref={ref}>
      <div className="mx-auto max-w-[1920px] p-10 lg:p-16 2xl:px-24">
        <div className="sticky top-0 z-10 flex items-start justify-between bg-[#fff] pt-10 lg:pt-16">
          <button onClick={scrollToTop} className="flex items-end">
            <HiArrowNarrowUp className="text-[max(3.125rem,8vw)] 2xl:text-[max(3.125rem,7vw)]" />
            <div className="flex flex-col gap-4">
              <MainMenu visible={true} />
              <AnimatedTitle title={title} className="line-through" />
            </div>
          </button>
          <Logos />
        </div>
        {menuItems.map((item) => (
          <MenuItem item={item} key={item._id} />
        ))}
      </div>
    </footer>
  );
}

const itemVariant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35 },
  },
  hidden: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.35 },
  },
};

export function MenuItem({ item }: { item: any }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const [complete, setComplete] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      variants={itemVariant}
      animate={inView ? 'visible' : 'hidden'}
      key={item._id}
      onAnimationComplete={() => setComplete(true)}
    >
      <CustomLink {...item} className="flex">
        <HiArrowNarrowUp className="text-[max(3.125rem,8vw)] 2xl:text-[max(3.125rem,7vw)] opacity-0" />
        <AnimatedTitle
          title={item.title}
          animate={inView && complete}
        />
      </CustomLink>
    </motion.div>
  );
}
