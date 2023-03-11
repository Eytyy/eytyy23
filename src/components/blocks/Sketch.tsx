import dynamic from 'next/dynamic';
import React from 'react';

const Brill2D = dynamic(
  () => import('@/components/sketches/2d-brill'),
  { loading: () => <div></div> }
);
const Blob = dynamic(() => import('@/components/sketches/3d-blob'), {
  loading: () => <div></div>,
});
const Canvas2dGrid = dynamic(
  () => import('@/components/sketches/2d-canvas-grid'),
  { loading: () => <div></div> }
);
const Curtain = dynamic(
  () => import('@/components/sketches/2d-curtain'),
  { loading: () => <div></div> }
);
const SpikedSphere = dynamic(
  () => import('@/components/sketches/3d-spiked-sphere'),
  { loading: () => <div></div> }
);
const AnimatedSynesthesia = dynamic(
  () => import('@/components/sketches/2d-animated-synestheia'),
  { loading: () => <div></div> }
);

export type Props = {
  _id: string;
  slug: string;
  title: string;
};

const SketchBlock = React.memo(function SketchBlock({
  slug,
  width,
  height,
}: { width: number; height: number } & Props) {
  switch (slug) {
    case 'synesthesia':
      return <AnimatedSynesthesia width={width} height={height} />;
    case 'blob':
      return <Blob width={width} height={width} />;
    case 'spiked-sphere':
      return <SpikedSphere width={width} height={width} />;
    case 'brill-2d':
      return <Brill2D width={width} height={width} />;
    case 'curtain':
      return <Curtain width={width} height={width} />;
    case '2d-grid':
    default:
      return <Canvas2dGrid width={width} height={width} />;
  }
});

export default SketchBlock;
