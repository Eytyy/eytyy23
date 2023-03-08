import React from 'react';

export type SketchProps = {
  _id: string;
  slug: string;
  title: string;
  theme: string;
};

export default function Sketch({ slug }: SketchProps) {
  return <div>Sketch</div>;
}
