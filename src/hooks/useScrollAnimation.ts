import { useInView, useScroll, useTransform } from 'framer-motion';
import React from 'react';

export function useScrollAnimation(
  ref: React.RefObject<HTMLDivElement>,
  scrollCb: () => void,
  amount: number = 0.1
) {
  const [isLeaving, setIsLeaving] = React.useState(false);
  const inView = useInView(ref, { amount });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scaleOut = useTransform(scrollYProgress, [0.6, 0.7], [1, 0]);

  React.useEffect(() => {
    let unsub = scrollYProgress.on('change', (v) =>
      v > 0.5 ? setIsLeaving(true) : setIsLeaving(false)
    );
    return () => unsub();
  }, [scrollYProgress]);

  React.useEffect(() => {
    if (inView) {
      scrollCb();
    }
  }, [inView, scrollCb]);

  return { isLeaving, scale, scaleOut, inView };
}
