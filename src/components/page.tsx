import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';

// @ts-ignore
import random from 'canvas-sketch-util/random';
import { specialCharacters } from '@/util/chars';
import PageBlock, { Props as Block } from './page-block';

type Props = {
  page: {
    blocks: Block[];
  };
  site: any;
};

const set = specialCharacters;

export default function Page({ page, site }: Props) {
  const [chars, setChars] = useState<(string | Block)[]>([]);
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
    const blocksCharCount = page.blocks.reduce(
      (count, block) => block.title.length + count,
      0
    );
    const count =
      grid.cols === 0
        ? blocksCharCount
        : grid.cols * grid.rows - blocksCharCount;

    const randomChars = new Array(count)
      .fill(0)
      .map(() => random.pick(set));
    const all = [...randomChars, ...page.blocks];
    setChars(random.shuffle(all));
  }, [grid.cols, grid.rows, page.blocks]);

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
              <PageBlock key={c._key} {...c} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function Char({ c }: { c: string }) {
  const [visible, setVisible] = useState(false);
  const to = useRef<NodeJS.Timeout | null>(null);
  const raF = useRef<number | null>(null);
  const [rendered, setRenderd] = useState(false);

  useEffect(() => {
    if (!rendered) {
      to.current = setTimeout(() => {
        setVisible(true);
        setRenderd(true);
      }, random.range(100, 1000));
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
