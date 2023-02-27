import Link from 'next/link';
import React from 'react';

type Props = {};

export default function PreviewStatus({}: Props) {
  return (
    <div className="fixed top-0 left-[50%] translate-x[50%] text-center p-2 mt-2 bg-slate-200 text-black rounded-md z-10">
      <div>Preview Mode</div>
      <Link href={'/api/exit-preview'}>exit preview</Link>
    </div>
  );
}
