import { SketchCollection } from '@/types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import useThemeSwitch, { themes_names } from '@/hooks/useThemeSwitch';
import SketchBlock from '@/blocks/Sketch';

type Themes = (typeof themes_names)[number] | undefined;

export default function SketchCollectionModule({
  sketches,
  active: activeID,
}: SketchCollection) {
  const theme = useThemeSwitch();
  const [active, setActive] = useState(activeID || sketches[0]._id);

  const [node, setNode] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const selectedIdx = sketches.findIndex(
    (sketch) => sketch._id === active
  );
  const selected = sketches[selectedIdx];

  function setActiveSketch(id: string) {
    if (theme) {
      const sketch_theme: Themes = sketches.find((s) => s._id === id)
        ?.theme as Themes;
      theme.setTheme(sketch_theme ? sketch_theme : 'black');
    }
    setActive(id);
  }

  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      theme.setTheme(selected.theme as keyof Themes);
    }
  }, [theme, selected.theme]);

  useLayoutEffect(() => {
    if (node) {
      const onResize = () => {
        const bounds = node.getBoundingClientRect();
        setSize({
          width: bounds.width,
          height: bounds.height - 100,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  if (
    !theme ||
    (selected.theme && theme.theme.name !== selected.theme)
  ) {
    return <div>...</div>;
  }

  return (
    <section
      className="relative grid h-full grid-rows-sketch"
      ref={measuredRef}
    >
      <CollectionInlineNavigation
        sketches={sketches}
        selected={selected}
        selectedIdx={selectedIdx}
        setActiveSketch={setActiveSketch}
      />
      <div className="self-center">
        {selected && size.width > 0 && (
          <SketchBlock {...selected} {...size} />
        )}
      </div>
    </section>
  );
}

function CollectionInlineNavigation({
  selectedIdx,
  selected,
  sketches,
  setActiveSketch,
}: {
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
  const [visible, setVisible] = useState(false);
  const toggleNav = useCallback(() => setVisible((v) => !v), []);

  const onClick = useCallback(
    (id: string) => {
      setActiveSketch(id);
      setVisible(false);
    },
    [setActiveSketch]
  );

  const cn = clsx(
    visible ? 'visible' : 'hidden',
    'absolute grid z-10 top-5 pt-1 mix-blend-difference text-[#FF0]'
  );

  return (
    <header className="flex flex-col ">
      <button className="flex gap-2" onClick={toggleNav}>
        {visible ? <span>&uarr;</span> : <span>&darr;</span>}
        {'# '}
        {`${selectedIdx}`.padStart(4, '0')}
      </button>
      <motion.nav className={cn}>
        {sketches.map((s, index) => (
          <button
            className={`${s._id === selected._id ? 'underline' : ''}`}
            onClick={() => onClick(s._id)}
            key={s._id}
          >
            {'# '}
            {`${index}`.padStart(4, '0')}
          </button>
        ))}
      </motion.nav>
    </header>
  );
}
