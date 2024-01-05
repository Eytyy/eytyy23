import React, { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { HiArrowNarrowDown } from 'react-icons/hi';

import { useHasMounted } from '@/hooks/useHasMounted';
import { cn } from '@/lib/utils';

import AnimatedTitle from '@/components/AnimatedTitle';
import CustomLink from './link';
import type { MenuType } from './types';

type Props = {
  className?: string;
  isVisible: boolean;
  items: MenuType['items'];
};

const variant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
      staggerChildren: 0.2,
    },
  },
  hidden: {
    y: '-100%',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export default function HeaderMenu({
  className,
  items,
  isVisible,
}: PropsWithChildren<Props>) {
  const hasMounted = useHasMounted();

  return (
    <div
      className={cn(
        'fixed top-10 left-10 z-50 lg:left-16 lg:top-14',
        className
      )}
    >
      {hasMounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                className="fixed left-0 top-[var(--header-height)] bottom-0 z-[50] w-full overflow-y-auto bg-pageBG text-pageText"
                variants={variant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className={cn('px-10 lg:px-16', className)}>
                  {items.map((item) => (
                    <MenuItem item={item} key={item._id} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.getElementById('portal')!
        )}
    </div>
  );
}

const itemVariant: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  hidden: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export function MenuItem({ item }: { item: any }) {
  const [animationComplete, setAnimationComplete] =
    React.useState(false);

  return (
    <motion.div
      variants={itemVariant}
      key={item._id}
      onAnimationComplete={() => setAnimationComplete(true)}
    >
      <CustomLink {...item} className="flex">
        <HiArrowNarrowDown className="text-[max(3.125rem,8vw)] opacity-0" />
        <AnimatedTitle
          title={item.title}
          animate={animationComplete}
        />
      </CustomLink>
    </motion.div>
  );
}
