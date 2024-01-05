import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function InternalLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      className={cn(className)}
      href={slug === 'home' ? '/' : slug}
    >
      {children}
    </Link>
  );
}
