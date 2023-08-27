import { formatDate } from '@/lib/helpers';
import Link from 'next/link';
import React from 'react';
import ContentBlock from '../blocks/Content';
import { BlogPost } from './Post';
import { useInView, motion } from 'framer-motion';

export default function BlogPostCard({
  title,
  _createdAt,
  slug,
  summary,
}: BlogPost) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 'all',
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: inView ? 1 : 0.5,
      }}
    >
      <div className="mb-1 text-xs md:text-base">
        {formatDate(_createdAt)}
      </div>
      <Link href={slug}>
        <h2 className="mb-2 text-2xl font-bold md:text-5xl md:font-bold md:leading-tight">
          {title}
        </h2>
      </Link>
      {summary && (
        <ContentBlock className="text-sm md:text-lg" body={summary} />
      )}
    </motion.div>
  );
}
