import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useMeasure from 'react-use-measure';

import {
  useTransform,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';


import { useApp } from '@/context/app';


export default function useHeader() {
  const { events } = useRouter();
  const { footerVisible, isMenuOpen, toggleMenu } = useApp();
  const [visible, setVisible] = useState(true);
  const [ref, { height }] = useMeasure();

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

  useEffect(() => {
    const handleRouteChange = () => toggleMenu(false);
    events.on('routeChangeStart', handleRouteChange);
    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, [events, toggleMenu]);

  return {
    ref,
    y,
    height,
    visible,
    footerVisible,
    showHeader,
    isMenuOpen,
    toggleMenu,
  }
}
