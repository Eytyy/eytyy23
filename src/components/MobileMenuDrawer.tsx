import React from 'react';
import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  direction: 'top' | 'bottom';
};

const wrapper: Variants = {
  visible: {
    translateY: '0vh',
    transition: { duration: 0.4 },
  },
  hidden: {
    translateY: '-100vh',
    transition: {
      when: 'afterChildren',
    },
  },
};
const inner: Variants = {
  visible: { opacity: 1, transition: { delay: 0.3 } },
  hidden: { opacity: 0 },
};

export default function MobileMenuDrawer({
  children,
  visible,
  direction,
}: Props) {
  return (
    <motion.div
      className={clsx(
        'fixed left-0 top-0 z-10 flex h-full w-full px-8 pt-24 pb-16 text-xl md:hidden',
        visible ? 'z-20' : 'z-10'
      )}
      initial="hidden"
      variants={wrapper}
      animate={visible ? 'visible' : 'hidden'}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-pageBG opacity-90" />
      <motion.div
        className="relative flex h-full w-full flex-col gap-10 font-light"
        variants={inner}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
