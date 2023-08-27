import { useInView as useFramerInView } from 'framer-motion';
import React from 'react';

/**
 * Framer motion useInView with a callback
 * @returns boolean
 */
export function useInView(
  ref: React.RefObject<HTMLElement>,
  amount?: 'all' | 'some' | number,
  cb?: () => void
) {
  const inView = useFramerInView(ref, {
    amount: amount ?? 0,
  });

  React.useEffect(() => {
    if (inView && cb) {
      cb();
    }
  }, [inView, cb]);

  return inView;
}
