import React, { useEffect, useRef } from 'react';
import canvasSketch from 'canvas-sketch';

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
    clearColor: '#000',
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

export default function Sketch01() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      canvasSketch(sketch, { ...settings, canvas: ref.current });
    }
  }, []);

  return <canvas className="shadow-md mx-auto" ref={ref} />;
}
