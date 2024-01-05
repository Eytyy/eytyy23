import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HiArrowNarrowDown } from 'react-icons/hi';
import useMeasure from 'react-use-measure';

import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';

import { cn } from '@/lib/utils';

import AnimatedTitle from '@/components/AnimatedTitle';
import { HeaderMenu, MainMenu } from '@/components/navigation';
import Logos from './Logos';
import type { MenuType } from './navigation/types';
import { useApp } from '@/context/app';

type Props = {
  title: string;
  menus: MenuType;
};

export default function Header({ title, menus }: Props) {
  const router = useRouter();
  const { footerVisible } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ref, { height }] = useMeasure();
  const menuItems = menus.items.filter(
    (item) =>
      (item._type === 'navPage' && item.slug !== router.asPath) ||
      item._type === 'navLink'
  );

  const showHeader = visible && !footerVisible;

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, height], [0, -height - 20]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    setVisible(latest < prev);
  });

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${height}px`
    );
  }, [height]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  const toggleMenu = useCallback(
    (visible: boolean) => setIsMenuOpen(visible),
    []
  );

  useEffect(() => {
    const handleRouteChange = () => toggleMenu(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, toggleMenu]);

  return (
    <motion.header
      ref={ref}
      className={cn(
        'fixed top-0 left-0 z-50 w-full',
        showHeader &&
          'duration-350 bg-pageBG text-pageText transition-transform ease-in'
      )}
      style={{ y: showHeader ? 0 : y }}
    >
      <div className="mx-auto max-w-[1920px] p-10 pb-0 lg:p-16 lg:pb-0 2xl:px-24">
        <div className="flex items-start justify-between">
          <button
            onClick={() => toggleMenu(!isMenuOpen)}
            className="flex items-end"
          >
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}>
              <HiArrowNarrowDown className="text-[max(3.125rem,8vw)] 2xl:text-[max(3.125rem,7vw)]" />
            </motion.div>
            <div className="flex flex-col gap-4">
              <MainMenu visible={isMenuOpen} />
              <AnimatedTitle
                title={title}
                className={cn(isMenuOpen && 'line-through')}
              />
            </div>
          </button>
          <HeaderMenu isVisible={isMenuOpen} items={menuItems} />
          <Logos />
        </div>
      </div>
    </motion.header>
  );
}
