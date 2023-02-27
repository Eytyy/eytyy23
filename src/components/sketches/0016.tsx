import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
type Props = {};

const w = 600;
const h = 600;

const list = [0, 0, 0, 0];

export default function Sketch16({}: Props) {
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const timers = list.map(() => null);
  const raf = useRef<(null | number)[]>(timers);

  const clearCanvas = useCallback(() => {
    if (!context) return void 0;
    context.save();
    context.beginPath();
    context.rect(0, 0, w, h);
    context.fillStyle = 'black';
    context.fill();
    context.restore();
  }, [context]);

  const moveRect = useCallback(
    (i: number, index: number, x: number) => {
      if (!context) return void 0;

      context.save();
      context.beginPath();
      if (typeof x === 'number' && i === index) {
        context.rect(x, 103 * i, 80, 80);
      } else {
        context.rect(0, 103 * i, 80, 80);
      }
      context.fillStyle = 'grey';
      context.fill();
      context.restore();
    },
    [context]
  );

  const animate = useCallback(
    async (index: number) => {
      let count = 0;
      return new Promise((resolve, reject) => {
        if (!context) reject('no canvas context found!');

        function cb() {
          if (count < 500) {
            console.log('uh');
            count += 10;
            raf.current[index] = requestAnimationFrame(cb);
            clearCanvas();
            for (let i = 0; i < list.length; i++) {
              moveRect(i, index, count);
            }
          } else if (raf.current) {
            cancelAnimationFrame(raf.current[index] as number);
            resolve('done');
          }
        }

        raf.current[index] = requestAnimationFrame(cb);
      });
    },
    [context, moveRect, clearCanvas]
  );

  // first paint
  useEffect(() => {
    if (context) {
      clearCanvas();
      for (let i = 0; i < list.length; i++) {
        context.save();
        context.beginPath();
        context.rect(0, 103 * i, 80, 80);
        context.fillStyle = 'grey';
        context.fill();
        context.restore();
      }
    }
  }, [context, clearCanvas]);

  useEffect(() => {
    const timers = raf.current;
    async function go() {
      for (let i = 0; i < list.length; i++) {
        await animate(i);
      }
    }

    if (context) go();
    return () => {
      timers.forEach((timer) => timer && cancelAnimationFrame(timer));
    };
  }, [animate, context]);

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 flex h-screen w-screen  place-content-center place-items-center bg-black font-mono text-white`}
      >
        <canvas
          ref={(c) => c && setContext(c.getContext('2d'))}
          width={w}
          height={h}
        />
      </div>
    </div>
  );
}

function Number({ val }: { val: number }) {
  return <div className="relative z-10 w-20 text-6xl">{val}</div>;
}
