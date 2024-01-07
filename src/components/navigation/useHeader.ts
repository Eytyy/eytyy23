import {  useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';

import {
  useTransform,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';


import { useApp } from '@/context/app';


export default function useHeader() {
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
