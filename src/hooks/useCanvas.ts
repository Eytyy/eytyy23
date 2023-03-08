import { useCallback, useEffect, useRef, useState } from 'react';

type SketchProps = {
  context: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
};

type SketchReturn = ({ context, canvas }: SketchProps) => void;
type Sketch = ({ context, canvas }: SketchProps) => SketchReturn;

type Settings = {
  gl: boolean;
  animate: boolean;
};

type Dispose = () => void;

type State = {
  canvas: HTMLCanvasElement | null;
  context: WebGL2RenderingContext | null;
};

const initialState = {
  canvas: null,
  context: null,
};

const defaults = {
  gl: false,
  animate: false,
};

const useCanvas = (sketch: Sketch, settings: Settings = defaults) => {
  const [state, setState] = useState<State>(initialState);
  const { context, canvas } = state;

  const raF = useRef<number | null>(null);

  const render = useCallback(() => {
    if (context === null || canvas === null) return;

    const cb = sketch({ context, canvas });

    if (settings.animate) {
      raF.current = requestAnimationFrame(render);
    }
  }, [canvas, context, sketch, settings]);

  const measuredRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      setState({
        context: node.getContext('webgl2'),
        canvas: node,
      });
    }
  }, []);

  useEffect(() => {
    raF.current = requestAnimationFrame(render);

    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
    };
  }, [render, canvas, context]);

  return {
    ref: measuredRef,
  };
};

export default useCanvas;
