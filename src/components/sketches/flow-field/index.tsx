import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import FlowFieldEffect from './flow-field-effect';

export default function FlowField() {
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const raF = useRef<number | null>(null);

  // setup canvas wrapper dimensions
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const measuredRef = useCallback((node: HTMLElement) => {
    if (node !== null) setNode(node);
  }, []);

  // updae size on window resize
  useEffect(() => {
    if (node) {
      const onResize = () => {
        const bounds = node.getBoundingClientRect();
        setSize({
          width: bounds.width,
          height: bounds.height,
        });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  const { width, height } = size;
  let mousePos = useRef({ x: 0, y: 0 });

  const [fieldProps, setFieldProps] = useState({
    radius: 0,
    cellSize: 15,
    spirals: 1,
    length: 0.1,
  });

  function updateProp(e: React.ChangeEvent<HTMLInputElement>) {
    setFieldProps((props) => ({
      ...props,
      [e.target.name]: parseFloat(e.target.value),
    }));
  }

  // storing these in callback won't have the desired effect
  let lastTime = useRef(0);
  let interval = useRef(1000 / 60);
  let timer = useRef(0);

  const flowField = useRef<FlowFieldEffect | null>(null);

  const sketch = useCallback((context: CanvasRenderingContext2D) => {
    const animate = (ts: number) => {
      if (!flowField.current) return void 0;
      const delta = ts - lastTime.current;
      lastTime.current = ts;

      if (timer.current > interval.current) {
        flowField.current.animate();
        timer.current = 0;
      } else {
        timer.current += delta;
      }

      raF.current = requestAnimationFrame(animate);
    };

    raF.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (context) {
      sketch(context);
      flowField.current = new FlowFieldEffect(
        context,
        width,
        height,
        fieldProps.radius,
        fieldProps.cellSize,
        fieldProps.spirals,
        fieldProps.length
      );
    }

    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
    };
  }, [context, sketch, width, height, fieldProps]);

  function onMouseMove(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    mousePos.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  return (
    <div className="bg-[black] transition-colors duration-300 ease-linear">
      <div className="grid min-h-app grid-cols-8 gap-11 text-pageText">
        <main
          ref={measuredRef}
          className="col-span-full col-start-1 row-start-1 h-full"
        >
          <canvas
            onMouseMove={onMouseMove}
            width={width}
            height={height}
            ref={(n) => n && setContext(n.getContext('2d'))}
          />
        </main>
        <div className="relative z-20 col-span-2 col-start-6 row-start-1 space-y-4 pt-10">
          <div>
            <input
              value={fieldProps.radius}
              onChange={updateProp}
              name="radius"
              type="range"
              min={0}
              max={10}
              step={1}
            />
            <label htmlFor="radius">{fieldProps.radius}</label>
          </div>
          <div>
            <input
              value={fieldProps.spirals}
              onChange={updateProp}
              name="spirals"
              type="range"
              min={fieldProps.radius}
              max={10}
              step={1}
            />
            <label htmlFor="spirals">{fieldProps.spirals}</label>
          </div>
          <div>
            <input
              value={fieldProps.cellSize}
              onChange={updateProp}
              name="cellSize"
              type="range"
              min={3}
              max={20}
              step={1}
            />
            <label htmlFor="cellSize">{fieldProps.cellSize}</label>
          </div>
          <div>
            <input
              value={fieldProps.length}
              onChange={updateProp}
              name="length"
              type="range"
              min={0.01}
              max={0.2}
              step={0.01}
            />
            <label htmlFor="length">{fieldProps.length}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
