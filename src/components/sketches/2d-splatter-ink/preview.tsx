import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import { lerp } from 'canvas-sketch-util/math';
// @ts-ignore
import random from 'canvas-sketch-util/random';

const createGrid = (count: number) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count < 1 ? 0.5 : x / (count - 1);
      const v = count < 1 ? 0.5 : y / (count - 1);
      points.push({
        position: [u, v],
        // radius: Math.abs(random.gaussian() * 0.0015),
        radius: Math.abs(random.gaussian() * 0.00125),
        // radius: 3,
      });
    }
  }
  return points;
};

type Props = {
  width: number;
  height: number;
};

const margin = 20;
const count = 400;

export default function SplatterInk2dPreview({
  width,
  height,
}: Props) {
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const raF = useRef<number | null>(null);

  const clearCanvas = useCallback(() => {
    if (!context) return void 0;
    context.save();
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = 'salmon';
    context.fill();
    context.restore();
  }, [context, width, height]);

  const sketch = useCallback(
    (context: CanvasRenderingContext2D) => {
      const cw = (width - margin * 2) / count;
      const ch = (height - margin * 2) / count;

      // you can remove the filter here to smooth the rough texture
      const points = createGrid(count);

      const drawCircle = (x: number, y: number, radius: number) => {
        context.beginPath();
        context.arc(x, y, radius * width, 0, Math.PI * 2, false);
        // context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fillStyle = random.pick(['#00F']);
        context.fill();
      };

      const render = (time: number) => {
        clearCanvas();

        points.forEach(({ position, radius }) => {
          const [u, v] = position;
          const x = lerp(margin, width - margin, u);
          const y = lerp(margin, height - margin, v);
          drawCircle(x, y, radius);
        });
      };

      let prevTime: number;
      let time = 0;
      const timeScale = 1;

      const animate = (now: number) => {
        if (prevTime === undefined) prevTime = now;
        let deltaTimeMS = now - prevTime;
        const deltaTime = deltaTimeMS / 1000;
        time = time + deltaTime * timeScale;
        prevTime = now;

        render(time);
      };
      raF.current = requestAnimationFrame(animate);
    },
    [width, height, clearCanvas]
  );

  useEffect(() => {
    if (context) sketch(context);

    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
    };
  }, [context, sketch, width, height]);

  return (
    <div className="relative">
      <canvas
        width={width}
        height={height}
        ref={(n) => n && setContext(n.getContext('2d'))}
      />
    </div>
  );
}
