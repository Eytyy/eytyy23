import Link from 'next/link';
import React from 'react';

type Props = {};

export default function Shaders({}: Props) {
  return (
    <div className="p-10 font-mono">
      <Link className="font-bold text-9xl" href="/sketches/01">
        01
      </Link>
    </div>
  );
}
