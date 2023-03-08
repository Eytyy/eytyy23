import Link from 'next/link';
import React from 'react';
import { BlogPost } from './Post';

export default function BlogPostCard({
  title,
  _createdAt,
  slug,
}: BlogPost) {
  const date = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(_createdAt));
  return (
    <div>
      <div>{date}</div>
      <Link href={slug}>
        <h2 className="text-4xl">{title}</h2>
      </Link>
    </div>
  );
}
