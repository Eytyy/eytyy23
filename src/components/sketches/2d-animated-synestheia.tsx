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

const createGrid = () => {
  const points = [];
  const count = 130;
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count < 1 ? 0.5 : x / (count - 1);
      const v = count < 1 ? 0.5 : y / (count - 1);

      points.push({ position: [u, v] });
    }
  }
  return points;
};

type Props = {
  width: number;
  height: number;
};

export default function AnimatedSynesthesia({
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
    context.fillStyle = 'blue';
    context.fill();
    context.restore();
  }, [context, width, height]);

  const sketch = useCallback(() => {
    const duration = random.rangeFloor(5, 20);
    const margin = width * 0.3;
    const points = createGrid();

    let prevTime: number;
    let time = 0;
    const timeScale = 1;

    const render = (time: number) => {
      if (!context) return;
      clearCanvas();
      points.forEach(({ position }) => {
        const [u, v] = position;
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);

        const n = Math.abs(random.noise2D(u * ((time * 0.1) % 3), v));
        const radius =
          n * 0.15 +
          Math.abs(
            Math.sin(n * Math.sin(((time * 0.1) % 20) * Math.PI * 2))
          ) *
            0.1;
        const color = `hsl(${n * 620} ${n * 100}% ${n * 100}%)`;

        context.beginPath();
        context.arc(x, y, radius * width, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
      });
    };

    const animate = (now: number) => {
      if (time >= duration && raF.current) {
        cancelAnimationFrame(raF.current);
        return void 0;
      }
      if (prevTime === undefined) {
        prevTime = now;
      }
      let deltaTimeMS = now - prevTime;
      const deltaTime = deltaTimeMS / 1000;
      time = time + deltaTime * timeScale;
      prevTime = now;

      render(time);
      raF.current = requestAnimationFrame(animate);
    };
    raF.current = requestAnimationFrame(animate);
  }, [width, height, clearCanvas, context]);

  useEffect(() => {
    if (context) sketch();
    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
        raF.current = null;
      }
    };
  }, [context, sketch, width, height]);

  return (
    <>
      <canvas
        width={width}
        height={height}
        ref={(n) => n && setContext(n.getContext('2d'))}
      />
    </>
  );
}
