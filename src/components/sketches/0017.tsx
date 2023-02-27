import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import random from 'canvas-sketch-util/random';
import { specialCharacters } from '@/util/chars';
import Link from 'next/link';
type Props = {};
const set = specialCharacters;
import { motion } from 'framer-motion';
type Project = {
  _id: string;
  name: string;
  slug: string;
};
const projects: Project[] = [
  {
    _id: 'home',
    name: 'eytyy',
    slug: '/',
  },
  {
    _id: 'contact',
    name: 'contact',
    slug: '/contact',
  },
  {
    _id: 'work',
    name: 'work',
    slug: '/work',
  },
  {
    _id: 'lab',
    name: 'lab',
    slug: '/lab',
  },
  {
    _id: 'shop',
    name: 'shop',
    slug: '/shop',
  },
];

export default function Sketch17({}: Props) {
  const [chars, setChars] = useState<(string | Project)[]>([]);
  const [charSize, setCharSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const [grid, setGrid] = useState({
    cols: 0,
    rows: 0,
  });

  const mref = useCallback((n: HTMLSpanElement) => {
    if (n) {
      const { height, width } = n.getBoundingClientRect();
      setCharSize({ w: width, h: height });
    }
  }, []);

  useLayoutEffect(() => {
    if (charSize) {
      const w = window ? window.innerWidth : 400;
      const h = window ? window.innerHeight : 400;
      const cols = Math.floor(w / charSize.w) || 3;
      const rows = Math.floor(h / charSize.h) || 3;
      setGrid({ cols, rows });
    }
  }, [charSize]);

  const generateSet = useCallback(() => {
    const projectsCharCount = projects.reduce(
      (total, project) => total + project.name.length,
      0
    );

    const count =
      grid.cols === 0
        ? projectsCharCount
        : grid.cols * grid.rows - projectsCharCount;

    const randomChars = new Array(count)
      .fill(0)
      .map(() => random.pick(set));
    const all = [...randomChars, ...projects];
    setChars(random.shuffle(all));
  }, [grid.cols, grid.rows]);

  useEffect(() => {
    function onResize() {
      if (charSize) {
        const w = window ? window.innerWidth : 400;
        const h = window ? window.innerHeight : 400;
        const cols = Math.floor(w / charSize.w) || 3;
        const rows = Math.floor(h / charSize.h) || 3;
        setGrid({ cols, rows });
      }
      generateSet();
    }
    generateSet();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [generateSet, charSize]);

  return (
    <div className="font-mono text-xl text-white">
      <span className="absolute left-[-100%] opacity-0" ref={mref}>
        {set[0]}
      </span>
      {chars.length > 0 && (
        <div
          className="relative z-30 grid h-screen bg-black"
          style={{
            gridTemplateColumns: `repeat(${grid.cols || 3}, ${
              charSize ? `${charSize.w}px` : `1fr`
            })`,
          }}
        >
          {chars.map((c, i) =>
            typeof c === 'string' ? (
              <Char key={i} c={c} />
            ) : (
              <Project key={c._id} {...c} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function Project({
  name,
  slug,
  _id,
}: {
  _id: string;
  name: string;
  slug: string;
}) {
  return (
    <motion.span
      whileTap={{ scale: 10 }}
      whileHover={{ scale: 1.2 }}
      style={{
        gridColumn: `span ${name.length} / span ${name.length}`,
      }}
    >
      <Link className="bg-white font-bold text-[black]" href={slug}>
        {name.split('').map((c, i) => (
          <PC key={`${_id}-${c}-${i}`} c={c} />
        ))}
      </Link>
    </motion.span>
  );
}

function PC({ c }: { c: string }) {
  const [visible, setVisible] = useState(false);
  const to = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    to.current = setTimeout(
      () => setVisible(true),
      random.range(200, 2000)
    );
    return () => {
      if (to.current) clearTimeout(to.current);
    };
  }, []);

  return <span style={{ opacity: visible ? 1 : 0 }}>{c}</span>;
}

function Char({ c }: { c: string }) {
  // const [char, setChar] = useState(c);
  const [visible, setVisible] = useState(false);
  const to = useRef<NodeJS.Timeout | null>(null);
  const raF = useRef<number | null>(null);
  const [rendered, setRenderd] = useState(false);

  // useEffect(() => {
  //   function shuffleChar() {
  //     if (!rendered) return void 0;
  //     setChar(random.pick(set));
  //     raF.current = requestAnimationFrame(shuffleChar);
  //   }
  //   raF.current = requestAnimationFrame(shuffleChar);

  //   return () => {
  //     if (raF.current) {
  //       cancelAnimationFrame(raF.current);
  //     }
  //   };
  // }, [rendered]);

  useEffect(() => {
    if (!rendered) {
      to.current = setTimeout(() => {
        setVisible(true);
        setRenderd(true);
      }, random.range(200, 2000));
    }

    return () => {
      if (to.current) clearTimeout(to.current);
    };
  }, [rendered]);

  return (
    <motion.span style={{ opacity: visible ? 1 : 0 }}>
      {c}
    </motion.span>
  );
}
