import React from 'react';
import FlowField from '../sketches/flow-field';

export type SketchProps = {
  _id: string;
  slug: string;
  title: string;
  theme: string;
};

export default function Sketch(sketch: SketchProps) {
  switch (sketch._id) {
    default:
      return <FlowField />;
  }
}
