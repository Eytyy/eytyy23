import clsx from 'clsx';
import {
  useMotionValue,
  useScroll,
  useTransform,
  motion,
} from 'framer-motion';
import React, { ReactNode } from 'react';

const BoxScrollContext = React.createContext<{
  active: any;
  canLoadNext: boolean;
  setCanLoadNext: (canLoad: boolean) => void;
}>({
  active: null,
  canLoadNext: false,
  setCanLoadNext: (canLoad: boolean) => {},
});

export const BoxScrollNavWrapper = ({
  children,
  sections,
}: {
  sections: any[];
  children: ReactNode;
}) => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [canLoadNext, setCanLoadNext] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const translateYValue = useMotionValue(`-50%`);

  const LoadNext = React.useCallback(() => {
    if (activeIdx !== sections.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      setActiveIdx(0);
    }
    ref.current?.scrollTo(0, 0);
  }, [setActiveIdx, activeIdx, sections]);

  React.useEffect(() => {
    const trackValue = (v: number) => {
      if (v <= 0.55) {
        LoadNext();
        if (ref.current) {
          ref.current.scrollTo(0, 0);
        }
      }
    };
    scaleValue.on('change', trackValue);
  }, [scaleValue, LoadNext]);

  return (
    <BoxScrollContext.Provider
      value={{
        active: sections[activeIdx],
        canLoadNext,
        setCanLoadNext,
      }}
    >
      <div
        ref={ref}
        className={clsx(
          `relative  h-full`,
          canLoadNext ? 'overflow-y-scroll' : 'overflow-hidden'
        )}
      >
        <motion.div
          className="sticky top-[50%] -translate-y-[50%] "
          style={{
            scale: scaleValue,
            translateY: translateYValue,
          }}
        >
          {children}
        </motion.div>
        <div className="h-[200%]" />
      </div>
    </BoxScrollContext.Provider>
  );
};

export const useBoxScrollNav = () => {
  const context = React.useContext(BoxScrollContext);
  if (context === undefined) {
    throw new Error(
      'useBoxScrollNav must be used within a BoxScrollNavWrapper'
    );
  }
  return context;
};
