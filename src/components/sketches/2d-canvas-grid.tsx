import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import { lerp, mapRange } from 'canvas-sketch-util/math';
// @ts-ignore
import random from 'canvas-sketch-util/random';

const createGrid = (count: number) => {
  const points = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count < 1 ? 0.5 : x / (count - 1);
      const v = count < 1 ? 0.5 : y / (count - 1);
      points.push([u, v]);
    }
  }
  return points;
};

type Props = {
  width: number;
  height: number;
};

const margin = 20;
const count = 25;

export default function Canvas2dGrid({ width, height }: Props) {
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
      const ch = (height - margin * 2) / count;

      // you can remove the filter here to smooth the rough texture
      const points = createGrid(count);

      const drawLine = (scale: number) => {
        context.lineWidth = scale;
        context.moveTo(cw * -0.5, 0);
        context.lineTo(cw * 0.5, 0);
        context.stroke();
        context.restore();
      };

      const drawCenterPoint = (x: number, y: number) => {
        context.save();
        context.fillStyle = 'red';
        context.beginPath();
        context.translate(x, y);
        context.arc(0, 0, 4, 0, Math.PI * 2, false);
        context.fill();
        context.restore();
      };

      const drawCircle = (x: number, y: number) => {
        context.save();
        context.beginPath();
        context.arc(x, y, cw / 2, 0, Math.PI * 2, false);
        context.stroke();
        context.restore();
      };

      const drawRect = (x: number, y: number) => {
        context.save();
        context.globalAlpha = 0.5;
        context.fillStyle = random.pick(['yellow', 'orange']);
        context.beginPath();
        context.translate(x, y);
        context.rect(cw * -0.5, ch * -0.5, cw, ch);
        context.fill();
        context.restore();
      };

      const render = (time: number) => {
        clearCanvas();

        points.forEach(([u, v]) => {
          const x = lerp(margin, width - margin, u);
          const y = lerp(margin, height - margin, v);
          context.strokeStyle = 'white';

          const n = random.noise2D(x + time * 40, y, 0.001);
          const angle = n * Math.PI * 2;
          const scale = mapRange(n, -1, 1, 1, 3);

          context.save();
          context.beginPath();
          context.translate(x, y);
          context.rotate(angle);

          drawLine(scale);
          drawCenterPoint(x, y);
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
