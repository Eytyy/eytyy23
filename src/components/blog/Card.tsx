import { formatDate } from '@/lib/helpers';
import Link from 'next/link';
import React from 'react';
import { BlogPost } from './Post';

export default function BlogPostCard({
  title,
  _createdAt,
  slug,
}: BlogPost) {
  return (
    <div>
      <div>{formatDate(_createdAt)}</div>
      <Link href={slug}>
        <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>
      </Link>
    </div>
  );
}
