import { SketchCollection } from '@/types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import clsx from 'clsx';

import useThemeSwitch, { themes_names } from '@/hooks/useThemeSwitch';
import SketchBlock from '@/components/blocks/Sketch';
import { SketchProps } from '@/components/Sketch';

type Themes = (typeof themes_names)[number] | undefined;

export default function SketchCollectionModule({
  sketches,
  active: activeID,
}: SketchCollection) {
  const theme = useThemeSwitch();

  const [node, setNode] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const onResize = () => {
        const bounds = node.getBoundingClientRect();
        setSize({
          width: bounds.width,
          height: bounds.height - 130,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  return (
    <section className="h-full" ref={measuredRef}>
      <AnimatePresence mode="wait">
        {theme ? (
          <Main
            key={'main'}
            sketches={sketches}
            activeID={activeID}
            size={size}
            theme={theme}
          />
        ) : (
          <Loading key="loader" />
        )}
      </AnimatePresence>
    </section>
  );
}

function Main({
  sketches,
  theme,
  activeID,
  size,
}: {
  activeID?: string;
  theme: {
    theme: {
      title: string;
      name: string;
      color: {
        hex: string;
      };
    };
    setTheme: (name: 'black' | 'blue' | 'white') => any;
  };
  size: {
    width: number;
    height: number;
  };
  sketches: SketchProps[];
}) {
  const [active, setActive] = useState(activeID || sketches[0]._id);

  const selectedIdx = sketches.findIndex(
    (sketch) => sketch._id === active
  );
  const selected = sketches[selectedIdx];

  useEffect(() => {
    if (theme) theme.setTheme(selected.theme as keyof Themes);
  }, [theme, selected.theme]);

  const setActiveSketch = useCallback(
    (id: string) => {
      if (theme) {
        const sketch_theme: Themes = sketches.find(
          (s) => s._id === id
        )?.theme as Themes;
        theme.setTheme(sketch_theme ? sketch_theme : 'black');
      }
      setActive(id);
    },
    [sketches, theme]
  );

  const LoadNextSketch = useCallback(() => {
    if (selectedIdx !== sketches.length - 1) {
      setActiveSketch(sketches[selectedIdx + 1]._id);
    } else {
      setActiveSketch(sketches[0]._id);
    }
  }, [setActiveSketch, selectedIdx, sketches]);

  const sketch_wrapper = clsx(
    'row-start-1 self-center md:row-start-2 transition-opacity duration-100 ease-linear'
  );
  const ref = useRef<null | HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: ref });
  const value = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const trackValue = (v: number) => {
      if (v === 0) {
        LoadNextSketch();
        if (ref.current) {
          ref.current.scrollTo(0, 0);
        }
      }
    };
    value.on('change', trackValue);
  }, [value, LoadNextSketch]);

  return (
    <div className="relative grid h-full grid-rows-sketch gap-4 md:grid-rows-sketch-m">
      <div className="absolute top-0 left-0 z-10 h-[100%] w-full overflow-hidden">
        <div
          ref={ref}
          className=" h-[100%] w-[120%] overflow-y-scroll"
        >
          <div className="h-[200%] opacity-10" />
        </div>
      </div>
      <motion.div className={sketch_wrapper} style={{ scale: value }}>
        {selected && size.width > 0 && (
          <SketchBlock {...selected} {...size} />
        )}
      </motion.div>
    </div>
  );
}

function Loading() {
  return (
    <motion.div
      className="h-full text-8xl font-black"
      exit={{
        opacity: 0,
      }}
    ></motion.div>
  );
}
