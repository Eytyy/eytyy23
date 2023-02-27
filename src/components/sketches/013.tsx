import { useCallback, useEffect, useRef, useState } from 'react';
// @ts-ignore
import { lerp } from 'canvas-sketch-util/math';

const colors = [
  '#E10000',
  '#E15100',
  '#E1A200',
  '#A7E100',
  '#00E1B8',
  '#0090E1',
  '#0017E1',
  '#7100E1',
  '#B400E1',
  '#E10094',
];
// const colorsMap = new Map(
//   nums.map((num, index) => [num, colors[index]])
// );
const margin = 50;
const w = 800;
const h = 800;

// export default function Sketch12() {
//   const sorted = useRef(false);
//   const nums = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
//   const raf = useRef<number | null>(null);

//   const animate = useCallback(async () => {
//     return new Promise((resolve) => {
//       let x = 0;
//       let start: number, prevTS: number;
//       let done = false;

//       function tween(ts: number) {
//         if (typeof start === 'undefined') start = ts;
//         const frame = ts - start;
//         x = Math.min(x + 0.01 * frame, 10);
//         console.log(x);

//         if (x == 10) {
//           done = true;
//           resolve(true);
//           cancelAnimationFrame(raf.current as number);
//           raf.current = null;
//         } else {
//           raf.current = requestAnimationFrame(tween);
//         }
//       }

//       raf.current = requestAnimationFrame(tween);
//     });
//   }, []);

//   const sort = useCallback(
//     async (nums: number[]) => {
//       let swapped = false;
//       do {
//         swapped = false;
//         for (let i = 0; i < nums.length; i++) {
//           if (nums[i] > nums[i + 1]) {
//             const temp = nums[i];
//             nums[i] = nums[i + 1];
//             nums[i + 1] = temp;
//             swapped = true;
//             await animate();
//           }
//         }
//       } while (swapped);
//       sorted.current = true;
//     },
//     [animate]
//   );

//   sort(nums);

//   return (
//     <div className="relative">
//       <div className="fixed top-0 left-0 flex h-screen w-screen place-content-center place-items-center bg-black"></div>
//     </div>
//   );
// }

const pts = [
  { value: 10, x: 0, y: 0 },
  { value: 20, x: 40, y: 0 },
  { value: 2, x: 80, y: 0 },
];

export default function Sketch12() {
  const sorted = useRef(false);
  const raf = useRef<number | null>(null);
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);

  // const animate = useCallback(async () => {
  //   return new Promise((resolve) => {
  //     let x = 0;
  //     let start: number, prevTS: number;
  //     let done = false;

  //     function tween(ts: number) {
  //       if (typeof start === 'undefined') start = ts;
  //       const frame = ts - start;
  //       x = Math.min(x + 0.01 * frame, 10);
  //       console.log(x);

  //       if (x == 10) {
  //         done = true;
  //         resolve(true);
  //         cancelAnimationFrame(raf.current as number);
  //         raf.current = null;
  //       } else {
  //         raf.current = requestAnimationFrame(tween);
  //       }
  //     }

  //     raf.current = requestAnimationFrame(tween);
  //   });
  // }, []);

  const draw = useCallback(
    (time: number) => {
      if (!context) return;

      context.save();
      context.beginPath();
      context.rect(20 + time, 0, 20, 20);
      context.fillStyle = 'red';
      context.fill();
      context.restore();
    },
    [context]
  );

  const animate = useCallback(() => {
    let start: number;
    let count = 0;

    function animate(ts: number) {
      if (typeof start === 'undefined') start = ts;
      const elapsed = ts - start;
      if (elapsed >= 2000) {
        cancelAnimationFrame(raf.current as number);
        raf.current = null;
        return;
      }
      draw(count++);
      raf.current = requestAnimationFrame(animate);
    }

    if (context) raf.current = requestAnimationFrame(animate);
  }, [draw, context]);

  // init + first paint
  useEffect(() => {
    function init() {
      if (!context) return;

      context.beginPath();
      context.rect(0, 0, w, h);
      context.fillStyle = '#333';
      context.fill();

      pts.forEach((pt) => {
        context.save();
        context.beginPath();
        context.rect(pt.x, 0, 40, pt.value * 2);
        context.fillStyle = 'red';
        context.fill();
        context.restore();
      });
    }

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
          onClick={animate}
          className="fixed bottom-10 left-10 cursor-pointer text-6xl text-white"
        >
          sort
        </button>
      </div>
    </div>
  );
}
