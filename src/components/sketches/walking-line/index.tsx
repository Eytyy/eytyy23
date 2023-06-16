// @ts-ignore
import random from 'canvas-sketch-util/random';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const width = 800;
const height = 800;
export default function WalkingLine() {
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const raF = useRef<number | null>(null);

  // storing these in callback won't have the desired effect
  let lastTime = useRef(0);
  let interval = useRef(1000 / 60);
  let timer = useRef(0);

  const points = useMemo(() => {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    const r = 20;

    class Point {
      x;
      y;
      vx;
      vy;
      idx;
      circle;
      constructor(
        x: number,
        y: number,
        vx: number,
        vy: number,
        idx: number
      ) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.idx = idx;
        this.circle = false;
      }
      move() {
        this.checkEdges();
        this.x += this.vx;
        this.y += this.vy;
      }
      checkEdges() {
        if (this.x >= width - r || this.x < r) {
          this.vx *= -1;
          this.changeColor(
            random.pick([
              '#000',
              '#222',
              '#000',
              '#ddd',
              '#000',
              '#000',
              '#001',
              '#100',
            ])
          );
        }
        if (this.y >= height || this.y < r) {
          this.vy *= -1;
          this.changeColor(
            random.pick(['#000', '#300', '#fff', '#000', '#003'])
          );
        }
      }
      changeColor(color: string) {
        if (context) {
          context.fillStyle = color;
        }
      }
      draw() {
        if (context) {
          context.beginPath();
          context.lineWidth = 2;

          if (this.circle) {
            context.arc(
              this.x,
              this.y,
              Math.abs(
                random.rangeFloor(10, 20) *
                  random.noise2D(this.x, this.y, 1, 1)
              ),
              0,
              Math.PI * 2
            );
          } else {
            const s =
              random.rangeFloor(0, 20) *
              random.noise2D(this.x, this.y, 2, 1);
            context.rect(this.x, this.y, s, s);
          }

          context.fill();
        }
      }
    }

    const balls: Point[] = [];
    for (let x = 1; x <= 2; x++) {
      for (let i = 1; i <= 2; i++) {
        balls.push(
          new Point(
            x % 2 ? r : width - r,
            i % 2 ? r : height - r,
            getRandomInt(2, 10),
            getRandomInt(2, 4),
            x
          )
        );
      }
    }
    return balls;
  }, [context]);

  const sketch = useCallback(
    (context: CanvasRenderingContext2D) => {
      const animate = (ts: number) => {
        const delta = ts - lastTime.current;
        lastTime.current = ts;

        if (timer.current > interval.current) {
          timer.current = 0;
        } else {
          timer.current += delta;
        }

        // context.clearRect(0, 0, width, height);

        points.forEach((point) => {
          point.draw();
          point.move();
        });

        raF.current = requestAnimationFrame(animate);
      };

      raF.current = requestAnimationFrame(animate);
    },
    [points]
  );

  useEffect(() => {
    if (context) {
      context.globalAlpha = 0.5;
      sketch(context);
    }

    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
    };
  }, [context, sketch]);

  return (
    <div className="bg-[black] transition-colors duration-300 ease-linear">
      <div className="grid min-h-app grid-cols-8 gap-11 text-pageText">
        <main className="col-span-full col-start-1 row-start-1 flex h-full place-content-center place-items-center">
          <canvas
            width={width}
            height={height}
            ref={(n) => n && setContext(n.getContext('2d'))}
          />
        </main>
      </div>
    </div>
  );
}
