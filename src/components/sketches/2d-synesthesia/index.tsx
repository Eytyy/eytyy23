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
  const count = 300;
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count < 1 ? 0.5 : x / (count - 1);
      const v = count < 1 ? 0.5 : y / (count - 1);

      // you can adjust the light by multiplying with something less than 100 to reduce the harsh whites
      points.push({
        position: [u, v],
      });
    }
  }
  return points;
};

const margin = 400;

type Props = {
  width: number;
  height: number;
};

export default function Synesthesia({ width, height }: Props) {
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

  useEffect(() => {
    const points = createGrid().filter(() => random.gaussian() > 1);

    const render = (time: number) => {
      if (!context) return;
      clearCanvas();
      points.forEach(({ position }) => {
        const [u, v] = position;
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);

        const n = Math.abs(random.noise2D(u, v));
        const radius = n * 0.2;

        const color = `hsl(${n * 620} ${n * 100}% ${n * 100}%)`;

        context.beginPath();
        context.arc(x, y, radius * width, 0, Math.PI * 2, false);
        // you can use strokes here to show glass effect
        context.fillStyle = color;
        context.fill();
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
      // raF.current = requestAnimationFrame(animate);
    };
    raF.current = requestAnimationFrame(animate);

    // you can remove the filter here to smooth the rough texture

    if (context) raF.current = requestAnimationFrame(animate);
    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
    };
  }, [context, clearCanvas, width, height]);

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
