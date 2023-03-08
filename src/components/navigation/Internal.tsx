import React from 'react';
import Link from 'next/link';
import { getInternalLink } from '@/lib/helpers';

export default function InternalLink({
  title,
  slug,
  _type,
}: {
  title: string;
  slug: string;
  _type?: string;
}) {
  const l = getInternalLink(_type || '', slug);
  return <Link href={slug === 'home' ? '/' : l}>{title}</Link>;
}
