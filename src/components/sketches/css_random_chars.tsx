import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import random from 'canvas-sketch-util/random';

import { specialCharacters } from '@/util/chars';

type Props = {
  width: number;
  height: number;
};

export default function CSSRandomChars({ width, height }: Props) {
  const [chars, setChars] = useState<string[]>([]);
  const [charSize, setCharSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  const raF = useRef<NodeJS.Timer | null>(null);

  const mref = useCallback((n: HTMLSpanElement) => {
    if (n) {
      const { height, width } = n.getBoundingClientRect();
      setCharSize({ w: width, h: height });
    }
  }, []);

  const generateSet = useCallback(() => {
    const count = grid.cols * grid.rows;

    const randomChars = new Array(count)
      .fill(0)
      .map(() => random.pick(specialCharacters));
    setChars(randomChars);
  }, [grid.cols, grid.rows]);

  useLayoutEffect(() => {
    if (charSize) {
      const w = width || 400;
      const h = height || 400;
      const cols = Math.floor(w / charSize.w) || 3;
      const rows = Math.floor(h / charSize.h) || 3;
      setGrid({ cols, rows });
    }
    generateSet();

    return () => {
      raF.current = null;
    };
  }, [generateSet, width, , height, charSize]);

  return (
    <div className="font-mono text-xl text-white">
      <span className="absolute left-[-100%] opacity-0" ref={mref}>
        {specialCharacters[0]}
      </span>
      {chars.length > 0 && (
        <div
          className="relative z-30 grid"
          style={{
            gridTemplateColumns: `repeat(${grid.cols || 3}, ${
              charSize ? `${charSize.w}px` : `1fr`
            })`,
          }}
        >
          {chars.map((c, i) => (
            <span
              style={{
                backgroundColor: c !== ' ' ? '#FF0' : 'transparent',
                color: '#FF0',
              }}
              key={i}
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
