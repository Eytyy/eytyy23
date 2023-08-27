import React, { useCallback, useEffect, useState } from 'react';
import FlowField from '../sketches/flow-field';
import WalkingLine from '../sketches/walking-line';
import Synesthesia from '../sketches/2d-synesthesia';
import AnimatedSynesthesia from '../sketches/2d-animated-synestheia';
import { ImageProps } from '@/types';

export type SketchProps = {
  _id: string;
  slug: string;
  title: string;
  theme: string;
  image: ImageProps;
};

export default function Sketch(sketch: SketchProps) {
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
        setSize({ width: bounds.width, height: bounds.height });
      };
      onResize();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [node]);

  return (
    <section
      ref={measuredRef}
      className="h-screen bg-black text-white"
    >
      {size.width * size.height > 0 &&
        renderSketch(sketch.slug, size)}
    </section>
  );
}

function renderSketch(
  slug: string,
  size: { width: number; height: number }
) {
  switch (slug) {
    case 'synesthesia':
      return (
        <AnimatedSynesthesia
          width={size.width}
          height={size.height}
        />
      );
    case 'flow-field':
      return <FlowField />;
    case 'walking-line':
      return <WalkingLine />;
    default:
      return <div>no sketch found</div>;
  }
}
