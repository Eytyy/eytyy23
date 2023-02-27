import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
type Props = {};

export default function Sketch15({}: Props) {
  const [list, setList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [flash, setFlash] = useState(false);
  const timers = list.map(() => null);
  const raf = useRef<(null | number)[]>(timers);
  const to = useRef<null | NodeJS.Timeout>(null);

  const animate = useCallback(
    async (index: number) => {
      return new Promise((resolve) => {
        function cb() {
          if (list[index] < 10) {
            let val = list[index] + 0.1;
            setList((list) => [
              ...list.slice(0, index),
              parseFloat(val.toFixed(2)),
              ...list.slice(index + 1),
            ]);
            raf.current[index] = requestAnimationFrame(cb);
          } else if (raf.current) {
            cancelAnimationFrame(raf.current[index] as number);
            resolve('done');
          }
        }
        raf.current[index] = requestAnimationFrame(cb);
      });
    },
    [list]
  );

  const flashIt = useCallback(() => {
    console.log('red');
    to.current = setTimeout(() => {
      console.log('black');
    }, 200);
  }, []);

  useEffect(() => {
    const timers = raf.current;
    async function go() {
      for (let i = 0; i < list.length; i++) {
        await animate(i).then(() => flashIt());
      }
    }
    go();
    return () => {
      timers.forEach((timer) => timer && cancelAnimationFrame(timer));
      if (to.current) clearTimeout(to.current);
    };
  }, [list, animate, flashIt]);

  const cols = `grid-cols-${list.length}`;
  const backgroundColor = flash ? '#fda5a5' : '#000';
  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 grid h-screen w-screen grid-cols-4 place-content-center place-items-center gap-4 bg-black font-mono text-white`}
      >
        <div
          style={{
            backgroundColor,
          }}
          className="absolute left-0 top-0 h-screen w-screen"
        />
        {list.map((val, index) => (
          <Number key={index} val={val} />
        ))}
      </div>
    </div>
  );
}

function Number({ val }: { val: number }) {
  return <div className="relative z-10 w-20 text-6xl">{val}</div>;
}
