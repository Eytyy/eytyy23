import React, { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import { motion } from 'framer-motion';

// @ts-ignore
import frag from '@/shaders/sketch01.frag.glsl';
// @ts-ignore
import createShader from 'canvas-sketch-util/shader';

const settings = {
  context: 'webgl',
  animate: true,
};

interface Props {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  playhead: number;
  gl: WebGLRenderingContext;
}

const sketch = ({ gl }: Props) => {
  return createShader({
    clearColor: false,
    gl,
    frag,
    uniforms: {
      time: ({ time }: any) => time,
      aspect: ({
        width: w,
        height: h,
      }: {
        width: number;
        height: number;
      }) => w / h,
    },
  });
};

const text = `People with various interests and who are instinctively
curious and creatively driven often face a life of struggle
and constant tension. It can feel like an endless loop, where
your brain is constantly context-shifting, trying to settle on
what you want to do with your life and what you value the
most. I have always felt like I had different characters or
personas because of this: one that seeks freedom, purpose, and
beauty, and the other that seeks status, financial stability,
and recognition. I chose the former.`;

export default function Sketch01() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (ref.current) {
      setVis(true);
      if (!rendered.current) {
        canvasSketch(sketch, { ...settings, canvas: ref.current });
        rendered.current = true;
      }
    }
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-screen ">
        <canvas className="mx-auto shadow-md" ref={ref} />
        <motion.div
          className="absolute top-0 left-0 flex max-h-full flex-wrap items-start justify-between overflow-y-scroll text-5xl font-bold uppercase text-[#FFF] opacity-0 mix-blend-exclusion selection:text-black md:text-9xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text.split('').map((c, index) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: index * 0.05 }}
              key={`${c}-${index}`}
            >
              {c}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
