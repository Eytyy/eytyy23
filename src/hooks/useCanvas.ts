import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  context: CanvasRenderingContext2D | WebGL2RenderingContext;
};

const default_options = {
  webgl: false,
  animate: false,
  dimensions: [
    typeof window !== 'undefined' ? window.innerWidth : 800,
    typeof window !== 'undefined' ? window.innerHeight : 800,
  ],
};

type Options = {
  webgl?: boolean;
  animate?: boolean;
  dimensions?: number[];
};

type CanvasContext =
  | CanvasRenderingContext2D
  | WebGL2RenderingContext;

export default function useCanvas(
  sketch: ({ context }: Props) => void,
  { animate = false, webgl = false }: Options = default_options
) {
  const [ref, setRef] = useState<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasContext | null>(null);
  const raf = useRef<number | null>(null);

  // initialize
  const animateSketch = useCallback(
    (context: any) => {
      sketch({ context });
      raf.current = requestAnimationFrame(() =>
        animateSketch(context)
      );
    },
    [sketch]
  );

  useEffect(() => {
    // set context
    if (ref) {
      context.current = webgl
        ? ref.getContext('webgl2')
        : ref.getContext('2d');
    }

    // execute callback
    if (context.current) {
      const ctx = context.current;
      if (animate) {
        raf.current = requestAnimationFrame(() => animateSketch(ctx));
      } else {
        sketch({ context: ctx });
      }
    }

    return () => {
      console.log('cleanup');
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
        context.current = null;
      }
    };
  }, [animate, sketch, animateSketch, ref, webgl]);

  return { ref: setRef };
}
