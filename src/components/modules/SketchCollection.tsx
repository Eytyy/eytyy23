import { SketchCollection } from '@/types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { CgInfinity } from 'react-icons/cg';

import useThemeSwitch, { themes_names } from '@/hooks/useThemeSwitch';
import SketchBlock from '@/components/blocks/Sketch';
import { useRouter } from 'next/router';
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
  const [navVisible, setNavVisible] = useState(false);

  const selectedIdx = sketches.findIndex(
    (sketch) => sketch._id === active
  );
  const selected = sketches[selectedIdx];

  useEffect(() => {
    if (theme) theme.setTheme(selected.theme as keyof Themes);
  }, [theme, selected.theme]);

  function toggleNav() {
    setNavVisible((v) => !v);
  }

  function setActiveSketch(id: string) {
    if (theme) {
      const sketch_theme: Themes = sketches.find((s) => s._id === id)
        ?.theme as Themes;
      theme.setTheme(sketch_theme ? sketch_theme : 'black');
    }
    setActive(id);
    setNavVisible(false);
  }

  const sketch_wrapper = clsx(
    navVisible ? 'opacity-20' : 'opacity-100',
    'row-start-1 self-center md:row-start-2 transition-opacity duration-100 ease-linear'
  );

  return (
    <div className="relative grid h-full grid-rows-sketch gap-4 md:grid-rows-sketch-m">
      <CollectionInlineNavigation
        sketches={sketches}
        selected={selected}
        selectedIdx={selectedIdx}
        setActiveSketch={setActiveSketch}
        toggleNav={toggleNav}
        visible={navVisible}
      />
      <div className={sketch_wrapper}>
        {selected && size.width > 0 && (
          <SketchBlock {...selected} {...size} />
        )}
      </div>
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

function CollectionInlineNavigation({
  selected,
  sketches,
  setActiveSketch,
  toggleNav,
  visible,
}: {
  visible: boolean;
  toggleNav: () => void;
  selectedIdx: number;
  selected: {
    _id: string;
    slug: string;
    title: string;
  };
  sketches: {
    _id: string;
    slug: string;
    title: string;
  }[];
  setActiveSketch: (id: string) => void;
}) {
  const router = useRouter();

  const onClick = useCallback(
    (id: string) => {
      setActiveSketch(id);
    },
    [setActiveSketch]
  );

  const nav = clsx(
    'absolute md:top-5 bottom-5 md:bottom-auto z-10 mb-8 md:mb-0 mt-4 grid gap-1 left-3 right-0',
    visible ? 'visible' : 'hidden'
  );

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-20 row-start-2 flex flex-col md:row-start-1"
    >
      <div className="flex justify-between">
        <button
          className="hidden gap-2 text-3xl md:flex"
          onClick={toggleNav}
        >
          {visible ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        <button
          className="flex gap-2 text-4xl md:hidden"
          onClick={toggleNav}
        >
          {visible ? <span>&darr;</span> : <span>&uarr;</span>}
        </button>
        {/* <button
          onClick={() => router.reload()}
          className="flex gap-2 text-4xl md:text-3xl"
        >
          <CgInfinity />
        </button> */}
      </div>

      <motion.nav className={nav}>
        {sketches.map((s) => (
          <SketchLink
            selectedID={selected._id}
            sketch={s}
            onClick={() => onClick(s._id)}
            key={s._id}
          />
        ))}
      </motion.nav>
    </motion.header>
  );
}

function SketchLink({
  sketch,
  selectedID,
  onClick,
}: {
  sketch: {
    _id: string;
    slug: string;
    title: string;
  };
  selectedID: string;
  onClick: (id: string) => void;
}) {
  const { _id } = sketch;
  const isActive = _id === selectedID;
  const cn = clsx(
    isActive ? 'bg-pageText' : 'border-2',
    'rounded-full h-3 w-3'
  );
  return (
    <button
      className="flex w-full items-center gap-2 text-left"
      onClick={() => onClick(_id)}
    >
      <span className={cn}></span>
      {_id}
    </button>
  );
}
