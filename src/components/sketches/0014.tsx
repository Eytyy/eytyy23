import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props = {};

type OP = {
  op: 'check' | 'next' | 'swap' | 'final' | 'restart';
  cells?: number[];
};

const nums = [20, 10, 1, 30];
const w = 600;
const h = 600;

export default function Sketch14({}: Props) {
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const raF = useRef<number | null>(null);

  const viz = useCallback(
    (steps: OP[]) => {
      function swap(step: OP) {
        const [c1, c2] = step.cells as [number, number];
        const c1_dest = c2 * 40;
        const c2_dest = c1 * 40;
        console.log(nums);
        console.log(nums[c1], nums[c2]);

        let c1_current = c1 * 40;
        let c2_current = c2 * 40;
        let done = false;

        function clear() {
          if (!context) return;

          context.save();
          context.beginPath();
          context.rect(0, 0, w, h);
          context.fillStyle = '#ddd';
          context.fill();
          context.restore();
        }

        function paint(cx: number, ch: number, color: string) {
          if (!context) return;
          context.save();
          context.beginPath();
          context.rect(cx, 20, 40, ch);
          context.fillStyle = color;
          context.fill();
          context.restore();
        }

        function cb() {
          done = c1_current === c1_dest && c2_current === c2_dest;
          nums.forEach((num, index) => {
            let x = index * 40;
            let ch = num + 5;

            if (index === c1) {
              if (c1_current !== c1_dest) c1_current += 1;
              paint(c1_current, nums[c1] + 5, 'green');
            }
            if (index === c2) {
              if (c2_current !== c2_dest) c2_current -= 1;
              paint(c2_current, nums[c2] + 5, 'blue');
            } else {
              paint(x, ch + 5, 'red');
            }
          });

          if (!done) {
            requestAnimationFrame(cb);
          }
        }
        if (step.op === 'swap') requestAnimationFrame(cb);
      }

      steps.forEach((step, index) => {
        if (step.op === 'swap') swap(step);
      });
    },
    [context]
  );

  function generator() {
    const ops: OP[] = [];
    return {
      add: (op: OP) => {
        ops.push(op);
      },
      ops,
    };
  }

  const sort = useCallback(
    async (nums: number[]) => {
      const g = generator();
      const l = [...nums];
      let swapped = false;
      do {
        swapped = false;
        for (let i = 0; i < l.length; i++) {
          if (i !== l.length - 1)
            g.add({ op: 'check', cells: [i, i + 1] });
          if (l[i] > l[i + 1]) {
            g.add({ op: 'swap', cells: [i, i + 1] });
            const temp = l[i];
            l[i] = l[i + 1];
            l[i + 1] = temp;
            swapped = true;
          } else {
            g.add({ op: 'next' });
          }
        }
        g.add({ op: 'restart' });
      } while (swapped);
      g.add({ op: 'final', cells: l });
      viz(g.ops);
    },
    [viz]
  );

  // first paint
  useEffect(() => {
    const init = () => {
      if (!context) return;
      context.save();
      context.beginPath();
      context.rect(0, 0, w, h);
      context.fillStyle = '#ddd';
      context.fill();
      context.restore();
      nums.forEach((num, index) => {
        context.save();
        context.beginPath();
        context.rect(index * 40, 20, 40, 5 + num);
        context.fillStyle = 'red';
        context.fill();
        context.restore();
      });
    };

    if (context) init();
  }, [context]);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 flex h-screen w-screen place-content-center place-items-center bg-black">
        <canvas
          ref={(c) => c && setContext(c.getContext('2d'))}
          width={w}
          height={h}
        />
        <button
          onClick={() => sort(nums)}
          className="fixed bottom-10 left-10 cursor-pointer text-6xl text-white"
        >
          sort
        </button>
      </div>
    </div>
  );
}
