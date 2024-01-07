import React, { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useHasMounted } from '@/hooks/useHasMounted';
import { cn } from '@/lib/utils';

import Wrapper from '../ui/Wrapper';
import { menuVariant } from './animation';

type Props = {
  className?: string;
};

export default function HeaderMenu({
  children,
  className,
}: PropsWithChildren<Props>) {
  const hasMounted = useHasMounted();

  return (
    <>
      {hasMounted &&
        createPortal(
          <AnimatePresence mode="wait">
            <motion.div
              className={cn(
                "fixed left-0 top-[var(--header-height)] bottom-0 z-[50] w-full overflow-y-auto bg-pageBG text-pageText",
                className
              )}
              variants={menuVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Wrapper>
                {children}
              </Wrapper>
            </motion.div>
          </AnimatePresence>,
          document.getElementById('portal')!
        )}
    </>
  );
}
