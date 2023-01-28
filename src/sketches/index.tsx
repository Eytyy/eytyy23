import Link from 'next/link';
import React from 'react';

type Props = {};

const links = [{ href: '/sketches/01', label: '01', key: '01' }];
export default function Shaders({}: Props) {
  return (
    <div className="p-10 font-mono">
      {links.map(({ href, label, key }) => (
        <Link key={key} className="text-3xl text-[#00F]" href={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}
