// Shaders Basics
import React, { useEffect, useRef } from 'react';
import canvasSketch from 'canvas-sketch';
// @ts-ignore
import { lerp, mapRange } from 'canvas-sketch-util/math';
// @ts-ignore
import random from 'canvas-sketch-util/random';

const settings = {
  animate: true,
  dimensions: [1020, 1020],
};

interface Props {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  frame: number;
  playhead: number;
  gl: WebGLRenderingContext;
}

// trippy 5arabeesh el jaj
const kharabeesh = () => {
  const createGrid = () => {
    const points = [];
    const count = 60;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count < 1 ? 0.5 : x / (count - 1);
        const v = count < 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v],
          // radius: random.value() * 0.01,
          radius: random.value(),
          thickness: random.range(1, 2),
        });
      }
    }
    return points;
  };

  const margin = 100;

  return ({ context, width, height }: Props) => {
    const points = createGrid().filter(() => random.value() > 0.5);
    context.fillStyle = 'pink';
    context.fillRect(0, 0, width, height);
    points.forEach(({ position, radius, thickness }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      // context.lineWidth = 1;
      context.lineWidth = thickness;
      context.fillStyle = 'black';
      // context.fill();
      context.stroke();
    });
  };
};

const brill = () => {
  const createGrid = () => {
    const points = [];
    const count = 60;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count < 1 ? 0.5 : x / (count - 1);
        const v = count < 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v],
          // radius: random.value() * 0.005,
          radius: 3,
        });
      }
    }
    return points;
  };

  const margin = 100;

  return ({ context, width, height }: Props) => {
    const points = createGrid().filter(() => random.value() > 0.5);
    context.fillStyle = 'salmon';
    context.fillRect(0, 0, width, height);
    points.forEach(({ position, radius }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fillStyle = 'white';
      context.fill();
    });
  };
};

const splatterink = () => {
  const createGrid = () => {
    const points = [];
    const count = 400;
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

  const margin = 20;

  return ({ context, width, height }: Props) => {
    const points = createGrid().filter(() => random.value() > 0.555);
    context.fillStyle = 'salmon';
    context.fillRect(0, 0, width, height);
    points.forEach(({ position, radius }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fillStyle = random.pick(['#00F']);
      context.fill();
    });
  };
};

const highpile = () => {
  const createGrid = () => {
    const points = [];
    const count = 1200;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count < 1 ? 0.5 : x / (count - 1);
        const v = count < 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v],
          radius: Math.abs(random.gaussian() * 0.002),
        });
      }
    }
    return points;
  };

  const margin = 150;

  return ({ context, width, height }: Props) => {
    const points = createGrid().filter(() => random.gaussian() > 1);
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);
    points.forEach(({ position, radius }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);

      const val = random.noise2D(x, y);
      const n = val * 0.5 + 0.5;
      const L = Math.floor(n * 100);

      context.fillStyle = `hsl(0 ${L}% ${L}%)`;
      context.fill();
    });
  };
};

// zoomed in texture
const trippyBugEyes = () => {
  const createGrid = () => {
    const points = [];
    const count = 600;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count < 1 ? 0.5 : x / (count - 1);
        const v = count < 1 ? 0.5 : y / (count - 1);
        const n = Math.abs(random.noise2D(u, v));
        const color = `hsl(${n * 620} ${n * 100}% ${n * 100}%)`;
        const radius = n * 0.2;
        // you can adjust the light by multiplying with something less than 100 to reduce the harsh whites
        points.push({
          position: [u, v],
          radius,
          color,
        });
      }
    }
    return points;
  };

  // you can use a positive value here for the render to look like floating blobs
  const margin = -100;

  return ({ context, width, height }: Props) => {
    // you can remove the filter here to smooth the rough texture
    const points = createGrid().filter(() => random.gaussian() > 1);
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    points.forEach(({ position, radius, color }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);

      // you can use strokes here to show glass effect
      context.fillStyle = color;
      context.fill();
    });
  };
};

const animatedGridLines = ({ width, height }: Props) => {
  const margin = 100;
  const count = 20;

  const createGrid = () => {
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

  const cw = (width - margin * 2) / count;
  const ch = (height - margin * 2) / count;

  return ({ context, width, height, frame, time }: Props) => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);
    const points = createGrid();
    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.strokeStyle = 'white';

      const n = random.noise2D(x + frame * 2, y, 0.001);
      const angle = n * Math.PI * 2;
      // const scale = (n * 0.5 + 0.5) * 10;
      const scale = mapRange(n, -1, 1, 1, 10);

      context.save();
      context.beginPath();
      context.translate(x, y);
      context.rotate(angle);

      context.lineWidth = scale;
      context.moveTo(cw * -0.5, 0);
      context.lineTo(cw * 0.5, 0);
      context.stroke();
      context.restore();

      // context.save();
      // context.beginPath();
      // context.arc(x, y, cw / 2, 0, Math.PI * 2, false);
      // context.stroke();
      // context.restore();
      context.save();
      context.fillStyle = 'red';
      context.beginPath();
      context.translate(x, y);
      context.arc(0, 0, 4, 0, Math.PI * 2, false);
      context.fill();
      context.restore();

      // context.save();
      // context.globalAlpha = 0.5;
      // context.fillStyle = random.pick(['yellow', 'orange']);
      // context.beginPath();
      // context.translate(x, y);
      // context.rect(cw * -0.5, ch * -0.5, cw, ch);
      // context.fill();
      // context.restore();
    });
  };
};

const sketch = ({ width, height }: Props) => {
  const margin = 100;
  const count = 50;

  const createGrid = () => {
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

  const cw = (width - margin * 2) / count;
  const ch = (height - margin * 2) / count;

  const points = createGrid();

  return ({ context, width, height, frame, time }: Props) => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    points.forEach(({ position, color }) => {
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      const n = random.noise2D(
        random.noise2D(0, -x) * x - frame * 1.5,
        y,
        0.001
      );
      const angle = n * Math.PI * 2;
      const scale = (n * 0.5 + 0.5) * 3;
      // const scale = 2;

      context.save();
      context.beginPath();
      context.fillStyle = '#000';
      context.lineWidth = 3;
      context.arc(x, y, cw / 2, 0, Math.PI * 2, false);
      context.fill();
      context.restore();

      context.lineWidth = scale;
      context.save();
      context.beginPath();
      context.translate(x, y);
      context.rotate(angle);
      context.moveTo(cw * -0.5, 0);
      context.lineTo(cw * 0.5, 0);
      context.strokeStyle = 'red';

      context.stroke();
      context.restore();

      context.save();
      context.fillStyle = `hsl(${10 + n * 50 * 0.2} 100% 50%)`;
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

      // context.save();
      // context.beginPath();
      // context.translate(x, y);
      // // context.rotate(angle);
      // context.rect(cw * -0.5, ch * -0.5, cw, ch);
      // context.fillStyle = rectcol;
      // context.fill();
      // context.restore();
    });
  };
};

export default function Sketch12() {
  const ref = useRef(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (ref.current) {
      canvasSketch(sketch, {
        ...settings,
        canvas: ref.current,
      });
      rendered.current = true;
    }
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 flex h-screen w-screen place-content-center place-items-center bg-black">
        <canvas className="mx-auto" ref={ref} />
      </div>
    </div>
  );
}
