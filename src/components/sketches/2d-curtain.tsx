// Shaders Basics
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

type Props = {
  width: number;
  height: number;
};

const createGrid = (count: number) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count < 1 ? 0.5 : x / (count - 1);
      const v = count < 1 ? 0.5 : y / (count - 1);
      points.push({
        position: [u, v],
        color: random.pick(['white']),
      });
    }
  }
  return points;
};

export default function Curtain({ width, height }: Props) {
  const margin = 20;
  const count = Math.ceil(width * 0.038);

  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const raF = useRef<number | null>(null);

  const clearCanvas = useCallback(() => {
    if (!context) return void 0;
    context.save();
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = 'black';
    context.fill();
    context.restore();
  }, [context, width, height]);

  const sketch = useCallback(
    (context: CanvasRenderingContext2D) => {
      const cw = (width - margin * 2) / count;

      const points = createGrid(count);

      const drawLine = (
        x: number,
        y: number,
        angle: number,
        scale: number,
        color: string
      ) => {
        context.lineWidth = scale;
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.rotate(angle);
        context.moveTo(cw * -0.5, 0);
        context.lineTo(cw * 0.5, 0);
        context.strokeStyle = color;
        context.stroke();
        context.restore();
      };

      const drawCircle = (
        x: number,
        y: number,
        scale: number,
        color: string
      ) => {
        context.save();
        context.globalAlpha = 0.2;
        context.beginPath();
        context.fillStyle = color;
        context.lineWidth = scale;
        context.arc(
          x,
          y,
          (cw / 2) * Math.abs(scale),
          0,
          Math.PI * 2,
          false
        );
        context.fill();
        context.restore();
      };

      const drawPoints = (
        x: number,
        y: number,
        angle: number,
        n: number,
        color: string
      ) => {
        context.save();
        context.fillStyle = color;
        context.beginPath();
        context.translate(x, y);
        context.rotate(angle);
        context.arc(
          cw / 2,
          0,
          2 + (n * 0.5 + 0.5),
          0,
          Math.PI * 2,
          false
        );
        context.arc(
          cw / -2,
          0,
          2 + (n * 0.5 + 0.5),
          0,
          Math.PI * 2,
          false
        );
        context.fill();
        context.restore();
      };

      const render = (time: number) => {
        clearCanvas(); // you can comment this for interesting stuf

        points.forEach(({ position, color }) => {
          const [u, v] = position;
          const x = lerp(margin, width - margin, u);
          const y = lerp(margin, height - margin, v);

          const n = random.noise2D(
            random.noise2D(0, -x) * x - time * 20 * 1.5,
            y,
            0.001
          );
          const angle = n * Math.PI * 2;
          const scale = Math.sin(n * 0.5 * 4);

          const n2 = random.noise2D(
            random.noise2D(x, y) * x - time * 20,
            y,
            0.001
          );
          const cscale = Math.sin(0 + n2 * 10);

          drawLine(x, y, angle, scale, 'white');
          drawPoints(
            x,
            y,
            angle,
            n,
            `hsl(${10 + n * 50 * 0.2} 100% 100%)`
          );
          drawCircle(x, y, cscale, 'black');
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
        raF.current = requestAnimationFrame(animate);
      };
      raF.current = requestAnimationFrame(animate);
    },
    [height, width, clearCanvas, count]
  );

  useEffect(() => {
    if (context) sketch(context);

    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
    };
  }, [sketch, context]);

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
