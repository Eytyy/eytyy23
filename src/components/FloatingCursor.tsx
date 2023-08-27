import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { HiArrowNarrowUp } from 'react-icons/hi';

export default function FloatingCursor({
  grabbing,
  initialX,
  initialY,
  container_left,
  paginate,
}: {
  grabbing: boolean;
  initialX: number;
  initialY: number;
  container_left: number;
  paginate: (direction: 'left' | 'right') => void;
}) {
  const [state, setState] = useState({
    x: initialX,
    y: initialY,
    nearLeft: false,
    nearRight: false,
  });

  const { nearLeft, nearRight, x, y } = state;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setState((c) => ({
        ...c,
        x: e.clientX,
        y: e.clientY,
        nearLeft: e.clientX < container_left + 100,
        nearRight: e.clientX > window.innerWidth - 100,
      }));
    },
    [container_left]
  );

  const handleOnClick = useCallback(
    (e: MouseEvent) => {
      if (state.nearLeft) {
        paginate('left');
      } else if (state.nearRight) {
        paginate('right');
      } else {
        return void 0;
      }
    },
    [state.nearLeft, state.nearRight, paginate]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleOnClick);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleOnClick);
    };
  }, [handleMouseMove, handleOnClick]);

  const nearEdges = nearLeft || nearRight;

  return (
    <motion.div
      className={clsx(
        'rounded-full bg-blue text-2xl text-white',
        'pointer-events-none fixed z-50 flex h-20 w-20 flex-col items-center justify-center'
      )}
      style={{
        top: y - 40,
        left: x - 40,
      }}
      animate={{
        scale: grabbing ? 0.3 : 1,
      }}
    >
      <motion.div
        animate={{
          rotate: nearLeft ? -90 : nearRight ? 90 : 0,
          opacity: nearEdges ? 1 : 0,
          transition: {
            rotate: {
              delay: 0.2,
            },
          },
        }}
      >
        <HiArrowNarrowUp />
      </motion.div>
    </motion.div>
  );
}
