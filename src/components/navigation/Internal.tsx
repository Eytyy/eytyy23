import React from 'react';
import Link from 'next/link';
import { getInternalLink } from '@/lib/helpers';
import clsx from 'clsx';

export default function InternalLink({
  title,
  slug,
  _type,
  className,
  children,
}: {
  title: string;
  slug: string;
  _type?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const l = getInternalLink(_type || '', slug);
  return (
    <Link
      className={clsx(className)}
      href={slug === 'home' ? '/' : l}
    >
      {children}
      {title}
    </Link>
  );
}
