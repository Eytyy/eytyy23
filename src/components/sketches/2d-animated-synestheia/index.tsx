// Shaders Basics
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// @ts-ignore
import { lerp } from 'canvas-sketch-util/math';
// @ts-ignore
import random from 'canvas-sketch-util/random';
import Wrapper from '@/components/ui/Wrapper';
import { FaWaveSquare } from 'react-icons/fa';
import { PiCirclesThreeFill } from 'react-icons/pi';

const createGrid = (count: number) => {
  const points = [];
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

const params = [
  'count',
  'duration',
  'timeScale',
  'width',
  'height',
] as const;
type Params = (typeof params)[number];

type PramasProps = {
  value: number;
  min: number;
  max: number;
  label?: string;
};

type State = {
  count: PramasProps;
  duration: PramasProps;
  timeScale: PramasProps;
  width: PramasProps;
  height: PramasProps;
};

const initializeState = () => {
  const state: State = {
    count: {
      value: random.rangeFloor(10, 130),
      min: 2,
      max: 130,
      label: 'points',
    },
    duration: {
      value: random.rangeFloor(4, 10),
      min: 1,
      max: 30,
      label: 'duration',
    },
    timeScale: {
      value: random.rangeFloor(1, 5),
      min: 1,
      max: 5,
      label: 'frequency',
    },
    width: {
      value: 30,
      min: 10,
      max: 100,
      label: 'x',
    },
    height: {
      value: 35,
      min: 10,
      max: 100,
      label: 'y',
    },
  };
  return state;
}


export default function AnimatedSynesthesia({
  width: ww,
  height: wh,
}: Props) {
  const [context, setContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [state, setState] = useState<State>(initializeState);

  const raF = useRef<number | null>(null);

  const clearCanvas = useCallback(() => {
    if (!context) return void 0;
    context.save();
    context.beginPath();
    context.rect(0, 0, ww, wh);
    context.fillStyle = 'blue';
    context.fill();
    context.restore();
  }, [context, ww, wh]);

  const { timeScale, count, duration, width, height } = state;

  const points = useMemo(() => createGrid(count.value), [count]);

  const sketchLayout = useMemo(() => {
    return {
      width: ww * (width.value / 100),
      height: wh * (height.value / 100),
      translateX: (ww - ww * (width.value / 100)) / 2,
      translateY: (wh - wh * (height.value / 100)) / 2,
    };
  }, [ww, wh, width, height]);

  const sketch = useCallback(() => {
    const margin = sketchLayout.width * 0;

    let prevTime: number;
    let time = 0;

    const render = (time: number) => {
      if (!context) return;
      clearCanvas();
      const {
        translateX,
        translateY,
        width: w,
        height: h,
      } = sketchLayout;

      context.save();
      context.translate(translateX, translateY);
      points.forEach(({ position }) => {
        const [u, v] = position;
        const x = lerp(margin, w - margin, u);
        const y = lerp(margin, h - margin, v);

        const n = Math.abs(
          random.noise2D(u * (time * 0.1) * timeScale.value, v)
        );
        const radius = n * 0.15 + n * 0.1;
        const color = `hsl(${n * 620} ${n * 100}% ${n * 100}%)`;

        context.beginPath();
        context.arc(x, y, radius * w, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
      });
      context.restore();
    };

    const animate = (now: number) => {
      if (time >= duration.value && raF.current) {
        cancelAnimationFrame(raF.current);
        return void 0;
      }
      if (prevTime === undefined) {
        prevTime = now;
      }
      let deltaTimeMS = now - prevTime;
      const deltaTime = deltaTimeMS / 1000;
      time = time + deltaTime;
      prevTime = now;

      render(time);
      raF.current = requestAnimationFrame(animate);
    };
    raF.current = requestAnimationFrame(animate);
  }, [
    sketchLayout,
    clearCanvas,
    context,
    points,
    duration,
    timeScale,
  ]);

  const onChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((s) => ({
        ...s,
        [e.target.name]: {
          ...s[e.target.name as Params],
          value: Number(e.target.value),
        },
      }));
    },
    []
  );

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
      <Controls>
        {Object.entries(state).map(([key, value]) => (
          <Slider
            key={key}
            label={value.label || key}
            name={key}
            min={value.min}
            max={value.max}
            value={value.value}
            onChange={onChangeValue}
          />
        ))}
      </Controls>
      <canvas
        width={ww}
        height={wh}
        ref={(n) => n && setContext(n.getContext('2d'))}
      />
    </>
  );
}

function Controls({ children }: PropsWithChildren) {
  return (
    <div className="fixed left-0 right-0 bottom-16">
      <Wrapper className='flex gap-10 flex-wrap justify-between'>
         {children}
      </Wrapper>
    </div>
  );
}

function Slider({
  label,
  name,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) {
  if (['duration'].includes(name)) return null;
  return (
    <div className="flex gap-4">
      {label === 'frequency' && <FaWaveSquare className='text-2xl' />}
      {label === 'points' && <PiCirclesThreeFill className='text-2xl' />}
      {label === 'x' && <div className='w-6 flex justify-center text-xl font-bold'>W</div>}
      {label === 'y' && <div className='w-6 flex justify-center text-xl font-bold'>H</div>}

      <div className='flex gap-1 items-center'>
        <input
          id={name}
          name={name}
          type="range"
          min={min}
          max={max}
          onChange={onChange}
          value={value}
        />
        {value}
      </div>
    </div>
  );
}
